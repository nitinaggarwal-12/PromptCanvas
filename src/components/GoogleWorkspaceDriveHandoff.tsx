'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Eye,
  KeyRound,
  LayoutTemplate,
  Loader2,
  RefreshCw,
  UserRound,
} from 'lucide-react';
import {
  CachedDriveToken,
  DriveTokenClient,
  GOOGLE_WORKSPACE_MIME,
  GoogleDriveDirectOpenError,
  GoogleWorkspaceKind,
  clearCachedDriveToken,
  createGoogleWorkspaceFileFromBlob,
  getCachedDriveToken,
  getGoogleOAuthSetupOrigins,
  isValidGoogleOAuthClientId,
  prepareDriveTokenClient,
  resolveGoogleOAuthClientId,
  saveLocalGoogleOAuthClientIdOverride,
} from '@/lib/googleDriveDirectOpen';

type HandoffPhase =
  | 'booting'
  | 'needs-client-id'
  | 'needs-signin'
  | 'signing-in'
  | 'compiling'
  | 'creating'
  | 'redirecting'
  | 'error';

export interface GoogleWorkspaceDriveHandoffProps {
  kind: GoogleWorkspaceKind;
  title: string;
  blueprintId: string;
  /** True once the diagram XML is loaded and `compileBlob` can produce the real deck. */
  isReady: boolean;
  /** Compiles the in-memory .pptx / .docx (never downloads). */
  compileBlob: () => Promise<Blob>;
  /** Called when the user chooses an in-app fallback instead of the Google editor. */
  onFallback: (target: 'workspace' | 'cloud-viewer') => void;
}

const STEP_LABELS = ['Compile deck', 'Google sign-in', 'Create in Drive', 'Open editor'] as const;

function stepIndexForPhase(phase: HandoffPhase): number {
  switch (phase) {
    case 'booting':
    case 'needs-client-id':
      return 0;
    case 'needs-signin':
    case 'signing-in':
      return 1;
    case 'compiling':
    case 'creating':
      return 2;
    case 'redirecting':
      return 3;
    default:
      return 1;
  }
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function ProductIcon({ kind, size = 'md' }: { kind: GoogleWorkspaceKind; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-16 h-16 rounded-2xl' : 'w-9 h-9 rounded-lg';
  const bar = size === 'lg' ? 'w-8 h-1.5' : 'w-4 h-1';
  return (
    <span
      className={`${dim} ${kind === 'slides' ? 'bg-[#F4B400]' : 'bg-[#4285F4]'} flex flex-col items-center justify-center gap-1 shadow-sm shrink-0`}
      aria-hidden="true"
    >
      {kind === 'slides' ? (
        <span className={`${size === 'lg' ? 'w-9 h-6 rounded-[3px] border-[3px]' : 'w-5 h-3.5 rounded-[2px] border-2'} border-white`} />
      ) : (
        <>
          <span className={`${bar} bg-white rounded-full`} />
          <span className={`${bar} bg-white rounded-full`} />
          <span className={`${size === 'lg' ? 'w-5 h-1.5' : 'w-2.5 h-1'} bg-white rounded-full self-start ${size === 'lg' ? 'ml-4' : 'ml-2.5'}`} />
        </>
      )}
    </span>
  );
}

export default function GoogleWorkspaceDriveHandoff({
  kind,
  title,
  blueprintId,
  isReady,
  compileBlob,
  onFallback,
}: GoogleWorkspaceDriveHandoffProps) {
  const productLabel = GOOGLE_WORKSPACE_MIME[kind].label;
  const [phase, setPhase] = useState<HandoffPhase>('booting');
  const [error, setError] = useState<GoogleDriveDirectOpenError | null>(null);
  const [clientId, setClientId] = useState<string>('');
  const [clientIdDraft, setClientIdDraft] = useState<string>('');
  const [clientIdDraftError, setClientIdDraftError] = useState<string>('');
  const [accountEmail, setAccountEmail] = useState<string | undefined>(undefined);
  const [resultUrl, setResultUrl] = useState<string>('');

  const tokenClientRef = useRef<DriveTokenClient | null>(null);
  const blobPromiseRef = useRef<Promise<Blob> | null>(null);
  const compileRef = useRef(compileBlob);
  const bootedRef = useRef(false);

  useEffect(() => {
    compileRef.current = compileBlob;
  }, [compileBlob]);

  // Resolves once the diagram payload is loaded, so we never compile an empty deck.
  const readyGate = useMemo(() => {
    let resolve: () => void = () => {};
    const promise = new Promise<void>((r) => {
      resolve = r;
    });
    return { promise, resolve };
  }, []);

  useEffect(() => {
    if (isReady) readyGate.resolve();
  }, [isReady, readyGate]);

  const ensureBlob = useCallback((): Promise<Blob> => {
    if (!blobPromiseRef.current) {
      blobPromiseRef.current = readyGate.promise
        .then(() => compileRef.current())
        .catch((err) => {
          blobPromiseRef.current = null;
          throw err;
        });
    }
    return blobPromiseRef.current;
  }, [readyGate]);

  // Pre-compile the deck in the background so the Drive upload starts instantly after sign-in.
  useEffect(() => {
    if (isReady) {
      ensureBlob().catch(() => {});
    }
  }, [isReady, ensureBlob]);

  const toHandoffError = (err: unknown): GoogleDriveDirectOpenError =>
    err instanceof GoogleDriveDirectOpenError
      ? err
      : new GoogleDriveDirectOpenError('unknown', (err as Error)?.message || 'Unexpected error while opening Google Drive.');

  const createAndRedirect = useCallback(
    async (token: CachedDriveToken) => {
      try {
        setError(null);
        setAccountEmail(token.email);
        setPhase('compiling');
        const blob = await ensureBlob();
        setPhase('creating');
        const result = await createGoogleWorkspaceFileFromBlob(token.accessToken, blob, {
          name: `${title} (${blueprintId})`,
          kind,
          email: token.email,
        });
        setResultUrl(result.url);
        setPhase('redirecting');
        window.location.replace(result.url);
      } catch (err) {
        const handoffError = toHandoffError(err);
        if (handoffError.code === 'token_expired') clearCachedDriveToken();
        setError(handoffError);
        setPhase('error');
      }
    },
    [ensureBlob, title, blueprintId, kind]
  );

  const createRef = useRef(createAndRedirect);
  useEffect(() => {
    createRef.current = createAndRedirect;
  }, [createAndRedirect]);

  const bootWithClientId = useCallback(async (id: string) => {
    setClientId(id);
    try {
      tokenClientRef.current = await prepareDriveTokenClient(id);
    } catch (err) {
      setError(toHandoffError(err));
      setPhase('error');
      return;
    }
    const cached = getCachedDriveToken(id);
    if (cached) {
      void createRef.current(cached);
    } else {
      setPhase('needs-signin');
    }
  }, []);

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    (async () => {
      const id = await resolveGoogleOAuthClientId();
      if (!id) {
        setPhase('needs-client-id');
        return;
      }
      await bootWithClientId(id);
    })();
  }, [bootWithClientId]);

  /** Must stay synchronous up to `requestToken` — Google opens a popup that needs the click gesture. */
  const handleContinue = (prompt: '' | 'select_account' = '') => {
    const tokenClient = tokenClientRef.current;
    if (!tokenClient) return;
    setError(null);
    setPhase('signing-in');
    tokenClient
      .requestToken({ prompt })
      .then((token) => createRef.current(token))
      .catch((err) => {
        const handoffError = toHandoffError(err);
        setError(handoffError);
        setPhase(handoffError.code === 'popup_closed' ? 'needs-signin' : 'error');
      });
  };

  const handleRetry = () => {
    const cached = clientId ? getCachedDriveToken(clientId) : null;
    if (cached && error?.code !== 'token_expired' && error?.code !== 'access_denied') {
      void createRef.current(cached);
    } else {
      handleContinue('');
    }
  };

  const handleSaveClientId = async () => {
    const candidate = clientIdDraft.trim();
    if (!isValidGoogleOAuthClientId(candidate)) {
      setClientIdDraftError('That does not look like a Web OAuth Client ID (expected ….apps.googleusercontent.com).');
      return;
    }
    setClientIdDraftError('');
    saveLocalGoogleOAuthClientIdOverride(candidate);
    setPhase('booting');
    await bootWithClientId(candidate);
  };

  const activeStep = stepIndexForPhase(phase);
  const origins = getGoogleOAuthSetupOrigins();

  return (
    <div
      data-testid="drive-handoff-root"
      data-phase={phase}
      className="w-screen h-screen overflow-auto bg-white text-[#1F1F1F] flex flex-col"
      style={{ fontFamily: '"Google Sans", Roboto, system-ui, -apple-system, sans-serif' }}
    >
      {/* Google-style top bar */}
      <header className="h-16 px-4 md:px-6 border-b border-[#DADCE0] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <ProductIcon kind={kind} />
          <div className="min-w-0">
            <h1 className="text-[17px] font-medium truncate max-w-[60vw]">{title}</h1>
            <p className="text-[12px] text-[#5F6368] truncate">
              {productLabel} · Google Drive · {blueprintId}
            </p>
          </div>
        </div>
        {accountEmail && (
          <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#3C4043] bg-[#F1F3F4] px-3 py-1.5 rounded-full">
            <UserRound className="w-3.5 h-3.5" />
            {accountEmail}
          </span>
        )}
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <section className="w-full max-w-[560px] rounded-3xl border border-[#DADCE0] shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] p-8 md:p-10 flex flex-col items-center text-center gap-6">
          <ProductIcon kind={kind} size="lg" />

          {/* Stepper */}
          <ol className="w-full flex items-center justify-between gap-2" aria-label="Handoff progress">
            {STEP_LABELS.map((label, idx) => {
              const done = idx < activeStep || phase === 'redirecting';
              const current = idx === activeStep && phase !== 'redirecting';
              return (
                <li key={label} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border ${
                      done
                        ? 'bg-[#1E8E3E] border-[#1E8E3E] text-white'
                        : current
                        ? 'bg-[#0B57D0] border-[#0B57D0] text-white'
                        : 'bg-white border-[#DADCE0] text-[#80868B]'
                    }`}
                  >
                    {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </span>
                  <span className={`text-[11px] leading-tight truncate w-full ${current ? 'text-[#0B57D0] font-semibold' : 'text-[#5F6368]'}`}>
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>

          {phase === 'booting' && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-[#0B57D0]" />
              <p className="text-[15px] font-medium">Preparing {productLabel} handoff…</p>
              <p className="text-[13px] text-[#5F6368]">Compiling the widescreen deck in memory. Nothing is downloaded.</p>
            </div>
          )}

          {phase === 'needs-signin' && (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="space-y-1.5">
                <p className="text-[20px] font-medium">Open with {productLabel}</p>
                <p className="text-[13.5px] text-[#5F6368] leading-relaxed">
                  Sign in with your Google account to create an editable copy of <strong className="text-[#1F1F1F]">{title}</strong> in
                  your Google Drive. It opens directly at <span className="font-mono text-[12px]">docs.google.com</span> — no file download.
                </p>
              </div>
              {error?.code === 'popup_closed' && (
                <p className="text-[12.5px] text-[#B3261E]">Google sign-in was closed before finishing. Try again.</p>
              )}
              <button
                type="button"
                data-testid="drive-handoff-continue-btn"
                onClick={() => handleContinue('')}
                className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-[#747775] bg-white hover:bg-[#F8FAFD] text-[14px] font-medium text-[#1F1F1F] shadow-xs transition cursor-pointer"
              >
                <GoogleGlyph />
                Continue with Google
              </button>
              <p className="text-[11.5px] text-[#80868B]">
                Permission requested: <span className="font-mono">drive.file</span> — only files created by PromptCanvas.
              </p>
            </div>
          )}

          {phase === 'signing-in' && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-[#0B57D0]" />
              <p className="text-[15px] font-medium">Waiting for Google sign-in…</p>
              <p className="text-[13px] text-[#5F6368]">Finish choosing your account in the Google popup.</p>
              <button
                type="button"
                onClick={() => handleContinue('')}
                className="text-[12.5px] text-[#0B57D0] hover:underline cursor-pointer"
              >
                Popup didn&apos;t appear? Open it again
              </button>
            </div>
          )}

          {(phase === 'compiling' || phase === 'creating') && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-7 h-7 animate-spin text-[#0B57D0]" />
              <p className="text-[15px] font-medium">
                {phase === 'compiling'
                  ? `Compiling ${kind === 'slides' ? '3-slide widescreen presentation' : 'specification document'}…`
                  : `Creating your ${productLabel} file in Google Drive…`}
              </p>
              <p className="text-[13px] text-[#5F6368]">
                {phase === 'compiling'
                  ? '1:1 master slide, editable vector shapes and the component matrix.'
                  : `Google is converting the ${kind === 'slides' ? '.pptx' : '.docx'} into a native, fully editable ${productLabel} file.`}
              </p>
            </div>
          )}

          {phase === 'redirecting' && (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-[#1E8E3E]" />
              <p className="text-[15px] font-medium">Opening {productLabel}…</p>
              <a
                href={resultUrl}
                className="inline-flex items-center gap-1.5 text-[13px] text-[#0B57D0] hover:underline"
                data-testid="drive-handoff-result-link"
              >
                If nothing happens, open it here
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {phase === 'error' && error && (
            <div className="flex flex-col items-center gap-4 w-full">
              <AlertTriangle className="w-8 h-8 text-[#B3261E]" />
              <div className="space-y-1.5">
                <p className="text-[16px] font-medium">Couldn&apos;t open in {productLabel}</p>
                <p className="text-[13px] text-[#5F6368] leading-relaxed break-words">{error.message}</p>
                {error.code === 'drive_api_disabled' && (
                  <p className="text-[12px] text-[#5F6368]">
                    Enable <span className="font-mono">drive.googleapis.com</span> for the project that owns the OAuth client, then retry.
                  </p>
                )}
                {error.code === 'popup_blocked' && (
                  <p className="text-[12px] text-[#5F6368]">Allow popups for this site in the address bar, then click Try again.</p>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white text-[13px] font-medium cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try again
                </button>
                <button
                  type="button"
                  onClick={() => handleContinue('select_account')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#747775] bg-white hover:bg-[#F8FAFD] text-[13px] font-medium cursor-pointer"
                >
                  <GoogleGlyph />
                  Use a different account
                </button>
              </div>
            </div>
          )}

          {phase === 'needs-client-id' && (
            <div className="flex flex-col items-start gap-4 w-full text-left">
              <div className="flex items-center gap-2 self-center">
                <KeyRound className="w-5 h-5 text-[#E37400]" />
                <p className="text-[16px] font-medium">One-time setup: Google OAuth Client ID</p>
              </div>
              <p className="text-[13px] text-[#5F6368] leading-relaxed">
                Creating a real {productLabel} file in your Drive requires a Google OAuth <strong>Web application</strong>{' '}client.
                In Google Cloud → APIs &amp; Services → Credentials, create one with these Authorized JavaScript origins:
              </p>
              <ul className="w-full rounded-xl bg-[#F8F9FA] border border-[#DADCE0] px-4 py-3 space-y-1 font-mono text-[12px] text-[#1F1F1F]">
                {origins.map((origin) => (
                  <li key={origin}>{origin}</li>
                ))}
              </ul>
              <p className="text-[12.5px] text-[#5F6368] leading-relaxed">
                Then set <span className="font-mono">GOOGLE_OAUTH_CLIENT_ID</span> on the Cloud Run service (applies to everyone), or paste
                it below for this browser only.
              </p>
              <div className="w-full flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={clientIdDraft}
                  onChange={(e) => setClientIdDraft(e.target.value)}
                  placeholder="1234567890-abc123.apps.googleusercontent.com"
                  data-testid="drive-handoff-client-id-input"
                  className="flex-1 px-3 py-2 rounded-lg border border-[#DADCE0] focus:border-[#0B57D0] focus:outline-none text-[13px] font-mono"
                />
                <button
                  type="button"
                  onClick={handleSaveClientId}
                  data-testid="drive-handoff-client-id-save-btn"
                  className="px-4 py-2 rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white text-[13px] font-medium cursor-pointer whitespace-nowrap"
                >
                  Save &amp; continue
                </button>
              </div>
              {clientIdDraftError && <p className="text-[12px] text-[#B3261E]">{clientIdDraftError}</p>}
            </div>
          )}

          {/* In-app fallbacks (never a file download) */}
          {phase !== 'redirecting' && phase !== 'compiling' && phase !== 'creating' && (
            <div className="w-full pt-4 border-t border-[#E8EAED] flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px]">
              <button
                type="button"
                data-testid="drive-handoff-fallback-workspace-btn"
                onClick={() => onFallback('workspace')}
                className="inline-flex items-center gap-1.5 text-[#0B57D0] hover:underline cursor-pointer"
              >
                <LayoutTemplate className="w-3.5 h-3.5" />
                Preview in interactive workspace
              </button>
              <button
                type="button"
                data-testid="drive-handoff-fallback-cloud-viewer-btn"
                onClick={() => onFallback('cloud-viewer')}
                className="inline-flex items-center gap-1.5 text-[#5F6368] hover:underline cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Read-only Google Cloud Viewer
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
