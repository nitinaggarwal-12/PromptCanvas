export interface RasterOptions {
  scale?: number;
  transparent?: boolean;
}

const EMBED_URL = 'https://embed.diagrams.net/?embed=1&proto=json&spin=0&ui=min&configure=0';
const EMBED_ORIGIN = 'https://embed.diagrams.net';
const TIMEOUT_MS = 20000;

let singletonIframe: HTMLIFrameElement | null = null;
let isIframeInitialized = false;
let exportQueuePromise: Promise<any> = Promise.resolve();

function getOrCreateIframe(): Promise<HTMLIFrameElement> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('Diagram rasterizer requires browser window/document environment'));
  }

  if (singletonIframe && document.body.contains(singletonIframe)) {
    return Promise.resolve(singletonIframe);
  }

  isIframeInitialized = false;
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-9999px';
  iframe.style.top = '-9999px';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.border = 'none';
  iframe.style.visibility = 'hidden';
  iframe.src = EMBED_URL;

  singletonIframe = iframe;
  document.body.appendChild(iframe);

  return Promise.resolve(iframe);
}

export function exportDiagramPng(
  xml: string,
  opts?: RasterOptions
): Promise<string> {
  return queueExport(() =>
    exportDiagramFormat(xml, 'png', {
      scale: opts?.scale ?? 2,
      transparent: opts?.transparent ?? false,
    })
  );
}

export function exportDiagramSvg(xml: string): Promise<string> {
  return queueExport(() => exportDiagramFormat(xml, 'xmlsvg', {}));
}

function queueExport(fn: () => Promise<string>): Promise<string> {
  const run = exportQueuePromise.then(
    () => fn(),
    () => fn()
  );
  exportQueuePromise = run.catch(() => {});
  return run;
}

function exportDiagramFormat(
  xml: string,
  format: 'png' | 'xmlsvg',
  extraActionProps: Record<string, any>
): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    if (!xml || !xml.trim()) {
      return reject(new Error('Cannot export diagram: XML content is empty'));
    }

    let timeoutTimer: ReturnType<typeof setTimeout> | null = null;
    let messageListener: ((event: MessageEvent) => void) | null = null;
    let step: 'awaiting_init' | 'awaiting_load' | 'awaiting_export' = isIframeInitialized
      ? 'awaiting_load'
      : 'awaiting_init';

    const cleanup = () => {
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
        timeoutTimer = null;
      }
      if (messageListener && typeof window !== 'undefined') {
        window.removeEventListener('message', messageListener);
        messageListener = null;
      }
    };

    timeoutTimer = setTimeout(() => {
      cleanup();
      // If timeout occurs, reset iframe initialization state to allow fresh recovery
      isIframeInitialized = false;
      reject(new Error('Export service unreachable'));
    }, TIMEOUT_MS);

    try {
      const iframe = await getOrCreateIframe();
      const contentWindow = iframe.contentWindow;

      if (!contentWindow) {
        cleanup();
        return reject(new Error('Export iframe window is unavailable'));
      }

      const sendLoadAction = () => {
        step = 'awaiting_load';
        contentWindow.postMessage(
          JSON.stringify({
            action: 'load',
            xml: xml,
            autosave: 0,
          }),
          EMBED_ORIGIN
        );
      };

      messageListener = (event: MessageEvent) => {
        // Strict origin check per security mandate
        if (event.origin !== EMBED_ORIGIN) {
          return;
        }

        let msg: any = event.data;
        if (typeof msg === 'string') {
          try {
            msg = JSON.parse(msg);
          } catch {
            return;
          }
        }

        if (!msg || typeof msg !== 'object') {
          return;
        }

        if (msg.event === 'init') {
          isIframeInitialized = true;
          if (step === 'awaiting_init') {
            sendLoadAction();
          }
        } else if (step === 'awaiting_load' && msg.event === 'load') {
          step = 'awaiting_export';
          // Mandate: wait 800ms for Draw.io fonts, multi-line text wrapping, and orthogonal edge waypoints to settle before rasterizing
          setTimeout(() => {
            if (!contentWindow) return;
            contentWindow.postMessage(
              JSON.stringify({
                action: 'export',
                format,
                spinKey: '',
                ...extraActionProps,
              }),
              EMBED_ORIGIN
            );
          }, 800);
        } else if (step === 'awaiting_export' && msg.event === 'export') {
          cleanup();
          const dataUrl = msg.data;
          if (typeof dataUrl === 'string' && dataUrl.length > 0) {
            resolve(dataUrl);
          } else {
            reject(new Error('Draw.io export returned invalid empty image data'));
          }
        } else if (msg.event === 'error') {
          cleanup();
          reject(new Error(msg.error || 'Draw.io export encountered an unexpected error'));
        }
      };

      window.addEventListener('message', messageListener);

      // If iframe was already initialized, dispatch load command immediately
      if (isIframeInitialized) {
        sendLoadAction();
      }
    } catch (err: any) {
      cleanup();
      reject(err instanceof Error ? err : new Error(String(err)));
    }
  });
}
