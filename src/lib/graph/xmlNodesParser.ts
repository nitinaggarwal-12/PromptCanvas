export interface DiagramNodeItem {
  id: string;
  label: string;
  isEdge: boolean;
  source?: string;
  target?: string;
  style?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export function cleanHtmlLabel(raw: string): string {
  if (!raw) return '';
  const decoded = raw
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
  const stripped = decoded.replace(/<[^>]+>/g, '');
  const clean = stripped.trim().replace(/\s+/g, ' ');
  return clean.replace(/\bITACS\b/g, 'Enterprise');
}

export function formatRelativeTime(dateStr: string): string {
  if (!dateStr) return 'Just now';
  const normalized = dateStr.replace(' ', 'T');
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return 'Just now';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function parseXmlNodesAndEdges(xml: string): DiagramNodeItem[] {
  if (!xml) return [];
  const items: DiagramNodeItem[] = [];
  const processedIds = new Set<string>();

  // 1. Match <UserObject ...>...</UserObject> and <object ...>...</object>
  const objectBlockRegex = /<(?:UserObject|object)\s+([^>]+)>([\s\S]*?)<\/(?:UserObject|object)>/gi;
  let objMatch;
  while ((objMatch = objectBlockRegex.exec(xml)) !== null) {
    const objAttrs = objMatch[1];
    const innerContent = objMatch[2];

    const objId = objAttrs.match(/id="([^"]*)"/)?.[1];
    const objLabel = objAttrs.match(/label="([^"]*)"/)?.[1] || objAttrs.match(/tooltip="([^"]*)"/)?.[1] || objAttrs.match(/name="([^"]*)"/)?.[1] || objAttrs.match(/value="([^"]*)"/)?.[1];

    const innerCellMatch = innerContent.match(/<mxCell\s+([^>]+)>/i);
    const innerAttrs = innerCellMatch ? innerCellMatch[1] : '';
    const isEdge = innerAttrs.includes('edge="1"') || objAttrs.includes('edge="1"');
    const source = innerAttrs.match(/source="([^"]*)"/)?.[1] || objAttrs.match(/source="([^"]*)"/)?.[1];
    const target = innerAttrs.match(/target="([^"]*)"/)?.[1] || objAttrs.match(/target="([^"]*)"/)?.[1];
    const style = innerAttrs.match(/style="([^"]*)"/)?.[1] || objAttrs.match(/style="([^"]*)"/)?.[1];
    const innerId = innerAttrs.match(/id="([^"]*)"/)?.[1];

    const geoMatch = innerContent.match(/<mxGeometry\s+([^>]+)>/i);
    const geoAttrs = geoMatch ? geoMatch[1] : '';
    const x = geoAttrs.match(/x="([\d.-]+)"/)?.[1];
    const y = geoAttrs.match(/y="([\d.-]+)"/)?.[1];
    const width = geoAttrs.match(/width="([\d.-]+)"/)?.[1];
    const height = geoAttrs.match(/height="([\d.-]+)"/)?.[1];

    const id = objId || innerId;
    if (id && id !== '0' && id !== '1' && !processedIds.has(id)) {
      processedIds.add(id);
      if (innerId) processedIds.add(innerId);

      const rawValue = objLabel || (isEdge ? 'Connection' : 'Unnamed Component');
      items.push({
        id,
        label: isEdge ? rawValue : cleanHtmlLabel(rawValue),
        isEdge,
        source,
        target,
        style,
        x: x ? parseFloat(x) : undefined,
        y: y ? parseFloat(y) : undefined,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
      });
    }
  }

  // 2. Match standard <mxCell ...>
  const cellRegex = /<mxCell\s+([^>]+?)(?:\/>|>([\s\S]*?)<\/mxCell>)/gi;
  let match;
  while ((match = cellRegex.exec(xml)) !== null) {
    const attrsStr = match[1];
    const innerContent = match[2] || '';
    const getId = attrsStr.match(/id="([^"]*)"/)?.[1];
    const getValue = attrsStr.match(/value="([^"]*)"/)?.[1];
    const isEdge = attrsStr.includes('edge="1"');
    const getSource = attrsStr.match(/source="([^"]*)"/)?.[1];
    const getTarget = attrsStr.match(/target="([^"]*)"/)?.[1];
    const getStyle = attrsStr.match(/style="([^"]*)"/)?.[1];

    const geoMatch = (attrsStr + innerContent).match(/<mxGeometry\s+([^>]+)>/i);
    const geoAttrs = geoMatch ? geoMatch[1] : '';
    const x = geoAttrs.match(/x="([\d.-]+)"/)?.[1];
    const y = geoAttrs.match(/y="([\d.-]+)"/)?.[1];
    const width = geoAttrs.match(/width="([\d.-]+)"/)?.[1];
    const height = geoAttrs.match(/height="([\d.-]+)"/)?.[1];

    if (getId && getId !== '0' && getId !== '1' && !processedIds.has(getId)) {
      processedIds.add(getId);
      const rawValue = getValue || (isEdge ? 'Connection' : 'Unnamed Component');
      items.push({
        id: getId,
        label: isEdge ? rawValue : cleanHtmlLabel(rawValue),
        isEdge,
        source: getSource,
        target: getTarget,
        style: getStyle,
        x: x ? parseFloat(x) : undefined,
        y: y ? parseFloat(y) : undefined,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
      });
    }
  }

  return items;
}
