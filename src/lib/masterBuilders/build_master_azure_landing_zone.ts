import { AZURE_RAW_SVGS } from './azure_svg_icons';

/**
 * 100% 1:1 Visual Twin Master Builder for Microsoft Azure Application Landing Zone
 * Uses inline vector SVGs inside HTML cells so Draw.io renders crisp native SVG icons
 * without semicolon/base64 truncation.
 */
export function generateAzureLandingZoneArchitectureXml(): string {
  const cells: string[] = [];

  const esc = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // Helper to add a container/card vertex
  const addBox = (
    id: string,
    label: string,
    x: number,
    y: number,
    w: number,
    h: number,
    style: string
  ) => {
    cells.push(
      `      <mxCell id="${id}" value="${esc(label)}" style="${style}" vertex="1" parent="1">\n` +
        `        <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />\n` +
        `      </mxCell>`
    );
  };

  // Helper to add an authentic Azure vector inline SVG node with optional bottom label
  const addIcon = (
    id: string,
    label: string,
    x: number,
    y: number,
    w: number,
    h: number,
    rawSvg: string,
    extraStyle = ''
  ) => {
    const isBold = extraStyle.includes('fontStyle=1');
    const fontSizeMatch = extraStyle.match(/fontSize=([0-9.]+)/);
    const fontSize = fontSizeMatch ? fontSizeMatch[1] : '8.5';

    let htmlVal = '';
    if (label && label.trim().length > 0) {
      const formattedLabel = label.replace(/\n/g, '<br/>');
      htmlVal =
        `<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-start;width:100%;height:100%;box-sizing:border-box;">` +
        `<div style="width:${w}px;height:${h}px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">${rawSvg}</div>` +
        `<div style="font-family:Inter,Segoe UI,sans-serif;font-size:${fontSize}px;font-weight:${
          isBold ? '700' : '500'
        };color:#1F2937;line-height:1.15;text-align:center;margin-top:2px;white-space:nowrap;">${formattedLabel}</div>` +
        `</div>`;
    } else {
      htmlVal = `<div style="width:${w}px;height:${h}px;display:flex;align-items:center;justify-content:center;">${rawSvg}</div>`;
    }

    const totalH = label ? h + 24 : h;
    const totalW = label ? Math.max(w, 72) : w;
    const offsetX = label ? x - Math.round((totalW - w) / 2) : x;

    const style = `text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;overflow=visible;`;
    cells.push(
      `      <mxCell id="${id}" value="${esc(htmlVal)}" style="${style}" vertex="1" parent="1">\n` +
        `        <mxGeometry x="${offsetX}" y="${y}" width="${totalW}" height="${totalH}" as="geometry" />\n` +
        `      </mxCell>`
    );
  };

  // Helper to add a small NSG shield badge at bottom-right corner of a subnet
  const addNsgBadge = (id: string, subnetRightX: number, subnetBottomY: number) => {
    addIcon(id, '', subnetRightX - 18, subnetBottomY - 18, 18, 18, AZURE_RAW_SVGS.NSG);
  };

  // Helper for point-to-point coordinate edge
  const addCoordEdge = (
    id: string,
    label: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    style: string,
    waypoints: Array<{ x: number; y: number }> = []
  ) => {
    let ptsXml = '';
    if (waypoints.length > 0) {
      ptsXml =
        `          <Array as="points">\n` +
        waypoints.map((pt) => `            <mxPoint x="${pt.x}" y="${pt.y}" />`).join('\n') +
        `\n          </Array>\n`;
    }
    cells.push(
      `      <mxCell id="${id}" value="${esc(label)}" style="${style}" edge="1" parent="1">\n` +
        `        <mxGeometry relative="1" as="geometry">\n` +
        `          <mxPoint x="${x1}" y="${y1}" as="sourcePoint" />\n` +
        `          <mxPoint x="${x2}" y="${y2}" as="targetPoint" />\n` +
        ptsXml +
        `        </mxGeometry>\n` +
        `      </mxCell>`
    );
  };

  // ============================================================================
  // 1. TOP HEADER & LEGEND (y = 14..54)
  // ============================================================================
  addBox(
    'hdr_app_lz',
    'Application landing zone\nsubscription',
    115,
    14,
    205,
    40,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#3A6BBD;strokeColor=none;fontFamily=Inter,Segoe UI,sans-serif;fontSize=11.5;fontStyle=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;'
  );

  // Legend container box
  addBox(
    'legend_box',
    '',
    328,
    14,
    225,
    40,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#4A777A;strokeWidth=1;'
  );
  addCoordEdge(
    'leg_black_arrow',
    '',
    338,
    25,
    385,
    25,
    'edgeStyle=none;html=1;strokeColor=#000000;strokeWidth=2;endArrow=block;endFill=1;'
  );
  addBox(
    'leg_black_lbl',
    'Protected ingress',
    390,
    16,
    155,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10;fontColor=#2B4C7E;fontStyle=0;'
  );
  addCoordEdge(
    'leg_orange_arrow',
    '',
    338,
    43,
    385,
    43,
    'edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=2;dashed=1;dashPattern=4 3;endArrow=none;startArrow=block;startFill=1;'
  );
  addBox(
    'leg_orange_lbl',
    'Controlled egress',
    390,
    34,
    155,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10;fontColor=#2B4C7E;fontStyle=0;'
  );

  // ============================================================================
  // 2. OUTER BLUE APPLICATION LANDING ZONE FRAME (x = 115, y = 54, w = 1320, h = 700)
  // ============================================================================
  addBox(
    'app_lz_outer',
    '',
    115,
    54,
    1320,
    700,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#A4CBFB;strokeColor=#7CA9DF;strokeWidth=1.5;'
  );

  // ============================================================================
  // 3. EXTERNAL ACTOR: USERS (x = 22, y = 138)
  // ============================================================================
  addIcon('actor_users', 'Users', 22, 138, 44, 44, AZURE_RAW_SVGS.USERS, 'fontSize=10.5;');

  // ============================================================================
  // 4. WORKLOAD RESOURCES WHITE/GRAY CONTAINER (x = 132, y = 70, w = 1286, h = 555)
  // ============================================================================
  addBox(
    'workload_box',
    '',
    132,
    70,
    1286,
    555,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F8F8F8;strokeColor=#C5D9F1;strokeWidth=1.5;'
  );
  addBox(
    'workload_title',
    'Workload resources',
    142,
    76,
    200,
    24,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=13.5;fontStyle=1;fontColor=#111827;'
  );

  // Bottom-left Spoke VNet & NSG badge on Workload resources border
  addIcon('workload_vnet_badge', '', 370, 608, 22, 22, AZURE_RAW_SVGS.VNET);
  addIcon('workload_nsg_badge', '', 394, 608, 18, 18, AZURE_RAW_SVGS.NSG);

  // ============================================================================
  // 5. COLUMN 1: LEFT SUBNET STACK (x = 148, w = 185)
  // ============================================================================
  // 5.1 Application Gateway Subnet
  addBox(
    'sub_appgw',
    '',
    148,
    106,
    185,
    102,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_appgw_title',
    'Application Gateway Subnet',
    154,
    110,
    175,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon(
    'icon_appgw',
    'Application Gateway + Web\nApplication Firewall\nZone-Redundant',
    220,
    128,
    40,
    36,
    AZURE_RAW_SVGS.APP_GW_WAF,
    'fontSize=7.5;'
  );
  addNsgBadge('nsg_appgw', 333, 208);

  // Black solid arrow from Users -> Application Gateway Subnet
  addCoordEdge(
    'edge_users_appgw',
    '',
    74,
    162,
    148,
    162,
    'edgeStyle=none;html=1;strokeColor=#000000;strokeWidth=2;endArrow=block;endFill=1;'
  );

  // 5.2 Jumpbox Subnet
  addBox(
    'sub_jumpbox',
    '',
    148,
    218,
    185,
    82,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_jumpbox_title',
    'Jumpbox Subnet',
    154,
    222,
    160,
    16,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('icon_jumpbox', 'Jumpbox', 224, 238, 34, 30, AZURE_RAW_SVGS.VM, 'fontSize=8.5;');
  addNsgBadge('nsg_jumpbox', 333, 300);

  // 5.3 Build Agent Subnet
  addBox(
    'sub_build',
    '',
    148,
    310,
    185,
    82,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_build_title',
    'Build Agent Subnet',
    154,
    314,
    160,
    16,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('icon_build', 'Build Agent', 224, 330, 34, 30, AZURE_RAW_SVGS.VM, 'fontSize=8.5;');
  addNsgBadge('nsg_build', 333, 392);

  // 5.4 Networking Box
  addBox(
    'box_networking',
    '',
    148,
    402,
    185,
    88,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'box_net_title',
    'Networking',
    148,
    406,
    185,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('net_vnet', 'Virtual\nnetwork', 165, 428, 28, 26, AZURE_RAW_SVGS.VNET, 'fontSize=7.5;');
  addIcon('net_subnet', 'Subnets', 226, 428, 28, 26, AZURE_RAW_SVGS.SUBNET, 'fontSize=7.5;');
  addIcon('net_nsg', 'Network\nsecurity groups', 286, 428, 26, 26, AZURE_RAW_SVGS.NSG, 'fontSize=7.5;');

  // 5.5 Monitoring Box
  addBox(
    'box_monitoring',
    '',
    148,
    500,
    145,
    88,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'box_mon_title',
    'Monitoring',
    148,
    504,
    145,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('mon_law', 'Log Analytics\nWorkspace', 170, 526, 28, 26, AZURE_RAW_SVGS.LOG_ANALYTICS, 'fontSize=7.5;');
  addIcon('mon_appi', 'Application\nInsights', 236, 526, 26, 26, AZURE_RAW_SVGS.DIAGNOSTICS, 'fontSize=7.5;');

  // ============================================================================
  // 6. COLUMN 2: CENTER-LEFT INGRESS / APIM STACK (x = 385, w = 155)
  // ============================================================================
  // 6.1 API Management Subnet
  addBox(
    'sub_apim',
    '',
    385,
    328,
    155,
    92,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_apim_title',
    'API Management\nSubnet',
    391,
    332,
    140,
    24,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('icon_apim', 'Azure API\nManagement', 446, 356, 34, 30, AZURE_RAW_SVGS.APIM, 'fontSize=8;');
  addNsgBadge('nsg_apim', 540, 420);

  // UDR annotation text below APIM Subnet
  addBox(
    'udr_annotation',
    'User-Defined\nRoutes (UDR)\n(To Firewall)',
    470,
    424,
    105,
    36,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8;fontColor=#374151;fontStyle=2;'
  );

  // 6.2 App Service Ingress Subnet
  addBox(
    'sub_app_ingress',
    '',
    385,
    498,
    155,
    90,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_app_ing_title',
    'App Service Ingress\nSubnet',
    391,
    502,
    140,
    24,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon(
    'icon_app_ing_pe',
    'Azure App\nService',
    446,
    526,
    32,
    28,
    AZURE_RAW_SVGS.PRIVATE_ENDPOINT,
    'fontSize=8;'
  );
  addNsgBadge('nsg_app_ing', 540, 588);

  // Black Ingress Routing Lines from Application Gateway Subnet -> APIM & App Service Ingress
  addCoordEdge(
    'edge_appgw_to_apim',
    '',
    333,
    158,
    385,
    374,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#000000;strokeWidth=1.8;endArrow=block;endFill=1;',
    [
      { x: 360, y: 158 },
      { x: 360, y: 374 },
    ]
  );
  addCoordEdge(
    'edge_appgw_to_apping',
    '',
    360,
    374,
    385,
    544,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#000000;strokeWidth=1.8;endArrow=block;endFill=1;',
    [
      { x: 360, y: 544 },
    ]
  );

  // ============================================================================
  // 7. COLUMN 3: CENTER STACK (AGENTIC SUBNET + PRIVATE ENDPOINTS + SEARCH/INTEGRATION)
  // ============================================================================
  // 7.1 Agentic Subnet (x = 580, y = 106, w = 390, h = 222)
  addBox(
    'sub_agentic',
    '',
    580,
    106,
    390,
    222,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_agentic_title',
    'Agentic Subnet',
    588,
    110,
    150,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon(
    'icon_aca_env',
    'Container Apps\nEnvironment',
    908,
    112,
    34,
    30,
    AZURE_RAW_SVGS.CONTAINER_APPS_ENV,
    'fontSize=8;fontStyle=1;'
  );

  // Left sub-column inside Agentic Subnet: 4 agent cards
  const agents = [
    { id: 'ag_1', name: 'Agent 1', y: 136 },
    { id: 'ag_2', name: 'Agent 2', y: 182 },
    { id: 'ag_n', name: 'Agent N', y: 234 },
    { id: 'ag_shared', name: 'Shared\nAPIs', y: 280 },
  ];
  for (const ag of agents) {
    addBox(
      `${ag.id}_card`,
      '',
      595,
      ag.y,
      118,
      38,
      'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
    );
    addIcon(`${ag.id}_icon`, '', 602, ag.y + 6, 24, 24, AZURE_RAW_SVGS.CONTAINER_APP);
    addBox(
      `${ag.id}_lbl`,
      ag.name,
      634,
      ag.y + 4,
      75,
      30,
      'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9;fontColor=#1F2937;fontStyle=0;'
    );
  }
  // Vertical dots between Agent 2 and Agent N
  addBox(
    'ag_dots',
    '⋮',
    645,
    218,
    20,
    16,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=12;fontStyle=1;fontColor=#6B7280;'
  );

  // Right sub-column inside Agentic Subnet: Orchestrator, Agent Comm API, Semantic Kernel SDK
  addBox(
    'orch_card',
    '',
    740,
    172,
    132,
    40,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addIcon('orch_icon', '', 748, 178, 26, 26, AZURE_RAW_SVGS.CONTAINER_APP);
  addBox(
    'orch_lbl',
    'Orchestrator',
    782,
    176,
    85,
    32,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9;fontColor=#1F2937;'
  );

  addIcon('comm_api_icon', '', 748, 224, 26, 26, AZURE_RAW_SVGS.ORCHESTRATOR_API);
  addBox(
    'comm_api_lbl',
    'Agent Communication API\n(gRPC / Dapr / Service Bus)',
    782,
    220,
    140,
    34,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8;fontColor=#1F2937;'
  );

  addBox(
    'sk_card',
    '',
    740,
    272,
    132,
    40,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addIcon('sk_icon', '', 748, 278, 26, 26, AZURE_RAW_SVGS.CONTAINER_APP);
  addBox(
    'sk_lbl',
    'Semantic\nKernel SDK',
    782,
    276,
    85,
    32,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9;fontColor=#1F2937;'
  );

  // Managed Identity & NSG badges at bottom-right of Agentic Subnet
  addIcon('ag_mi_badge', '', 926, 292, 22, 22, AZURE_RAW_SVGS.MANAGED_IDENTITY);
  addNsgBadge('nsg_agentic', 970, 328);

  // 7.2 Private Endpoints Subnet (x = 580, y = 358, w = 438, h = 96)
  addBox(
    'sub_pe',
    '',
    580,
    358,
    438,
    96,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_pe_title',
    'Private Endpoints Subnet',
    588,
    362,
    180,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );

  const peItems = [
    { id: 'pe_sb', lbl: 'Azure\nService\nBus', x: 594 },
    { id: 'pe_eg', lbl: 'Event Grid\n/ Hubs', x: 646 },
    { id: 'pe_cosmos', lbl: 'Azure\nCosmos DB', x: 698 },
    { id: 'pe_aihub', lbl: 'Azure AI\nHub', x: 750 },
    { id: 'pe_search', lbl: 'Azure AI\nSearch', x: 802 },
    { id: 'pe_aisvc', lbl: 'Azure AI\nServices', x: 854 },
    { id: 'pe_kv', lbl: 'Azure Key\nVault', x: 906 },
    { id: 'pe_acr', lbl: 'Azure\nContainer\nRegistry', x: 958 },
  ];
  for (const pe of peItems) {
    addIcon(pe.id, pe.lbl, pe.x, 382, 26, 24, AZURE_RAW_SVGS.PRIVATE_ENDPOINT, 'fontSize=7;');
  }
  addNsgBadge('nsg_pe', 1018, 454);

  // 7.3 Azure Search Subnet (x = 595, y = 498, w = 138, h = 90)
  addBox(
    'sub_search',
    '',
    595,
    498,
    138,
    90,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_search_title',
    'Azure Search Subnet',
    601,
    502,
    130,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('icon_search_pe', 'Azure\nSearch', 648, 524, 30, 26, AZURE_RAW_SVGS.PRIVATE_ENDPOINT, 'fontSize=8;');
  addNsgBadge('nsg_search', 733, 588);

  // 7.4 App Service Integration Subnet (x = 770, y = 498, w = 155, h = 90)
  addBox(
    'sub_app_int',
    '',
    770,
    498,
    155,
    90,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_app_int_title',
    'App Service Integration\nSubnet',
    776,
    502,
    145,
    24,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('icon_app_int_diag', '', 818, 534, 26, 26, AZURE_RAW_SVGS.DIAGNOSTICS);
  addIcon('icon_app_int_mi', '', 850, 536, 24, 24, AZURE_RAW_SVGS.MANAGED_IDENTITY);
  addNsgBadge('nsg_app_int', 925, 588);

  // ============================================================================
  // 8. COLUMN 4: RIGHT STACK (AI FOUNDRY MANAGED VNET + AI SERVICES + STATE + ASE)
  // ============================================================================
  // 8.1 Managed Virtual Network Top Container (x = 1030, y = 98, w = 376, h = 148)
  addBox(
    'box_managed_vnet',
    '',
    1030,
    98,
    376,
    148,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#9CA3AF;strokeWidth=1;dashed=1;'
  );
  addIcon('mvnet_spoke_icon', 'Spoke\nVirtual\nNetwork', 1018, 82, 24, 22, AZURE_RAW_SVGS.VNET, 'fontSize=7;');
  addIcon('mvnet_managed_icon', 'Managed\nVirtual\nNetwork', 1382, 82, 24, 22, AZURE_RAW_SVGS.VNET, 'fontSize=7;');

  addIcon(
    'icon_moe',
    'Managed online\nendpoint',
    1055,
    110,
    28,
    26,
    AZURE_RAW_SVGS.PRIVATE_ENDPOINT,
    'fontSize=7;'
  );
  addIcon('icon_serverless_ep', 'Serverless\nEndpoints', 1118, 110, 28, 26, AZURE_RAW_SVGS.VM, 'fontSize=7;');
  addIcon('icon_compute_inst', 'Compute\nInstances', 1178, 110, 28, 26, AZURE_RAW_SVGS.VM, 'fontSize=7;');

  // Azure AI Hub White Card inside Managed VNet
  addBox(
    'card_ai_hub',
    '',
    1235,
    108,
    132,
    64,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addIcon('icon_ai_hub', 'Azure AI Hub', 1285, 112, 30, 28, AZURE_RAW_SVGS.AI_FOUNDRY_HUB, 'fontSize=8;fontStyle=1;');

  // Private Endpoints row inside Managed VNet
  addBox(
    'mvnet_pe_lbl',
    'Private\nEndpoints',
    1038,
    194,
    65,
    28,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8;fontColor=#374151;'
  );
  addIcon('mvnet_pe1', '', 1248, 198, 22, 22, AZURE_RAW_SVGS.PRIVATE_ENDPOINT);
  addIcon('mvnet_pe2', '', 1298, 198, 22, 22, AZURE_RAW_SVGS.PRIVATE_ENDPOINT);
  addIcon('mvnet_pe3', '', 1348, 198, 22, 22, AZURE_RAW_SVGS.PRIVATE_ENDPOINT);

  // Orange arrows from Compute Instances / Azure AI Hub -> Managed VNet Private Endpoints
  addCoordEdge(
    'edge_aihub_pe1',
    '',
    1260,
    172,
    1260,
    198,
    'edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=block;endFill=1;'
  );
  addCoordEdge(
    'edge_aihub_pe2',
    '',
    1310,
    172,
    1310,
    198,
    'edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=block;endFill=1;'
  );
  addCoordEdge(
    'edge_aihub_pe3',
    '',
    1360,
    172,
    1360,
    198,
    'edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=block;endFill=1;'
  );

  // 8.2 Six Individual Azure AI & Platform Resource Cards (y = 258, h = 82)
  const platformCards = [
    { id: 'plat_aisvc', lbl: 'Azure AI\nServices', icon: AZURE_RAW_SVGS.AI_SERVICES, x: 1030 },
    { id: 'plat_search', lbl: 'Azure AI\nSearch', icon: AZURE_RAW_SVGS.AI_SEARCH, x: 1093 },
    { id: 'plat_openai', lbl: 'Azure\nOpenAI\nService', icon: AZURE_RAW_SVGS.AZURE_OPENAI, x: 1156 },
    { id: 'plat_kv', lbl: 'Azure Key\nVault', icon: AZURE_RAW_SVGS.KEY_VAULT, x: 1219 },
    { id: 'plat_acr', lbl: 'Azure\nContainer\nRegistry', icon: AZURE_RAW_SVGS.ACR, x: 1282 },
    { id: 'plat_storage', lbl: 'Azure\nStorage', icon: AZURE_RAW_SVGS.STORAGE, x: 1345 },
  ];
  for (const pc of platformCards) {
    addBox(
      `${pc.id}_card`,
      '',
      pc.x,
      258,
      58,
      82,
      'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
    );
    addIcon(pc.id, pc.lbl, pc.x + 15, 264, 28, 26, pc.icon, 'fontSize=7;');
  }

  // 8.3 Three State & Messaging Cards (y = 356..456)
  const stateCards = [
    {
      id: 'st_search_cosmos',
      hdr: 'Search\nState',
      lbl: 'Azure\nCosmos\nDB',
      icon: AZURE_RAW_SVGS.COSMOS_DB,
      x: 1040,
      hdrX: 1030,
      hdrW: 86,
    },
    {
      id: 'st_agent_cosmos',
      hdr: 'Agent State\nand History',
      lbl: 'Azure\nCosmos\nDB',
      icon: AZURE_RAW_SVGS.STORAGE,
      x: 1145,
      hdrX: 1126,
      hdrW: 104,
    },
    {
      id: 'st_comm_sb',
      hdr: 'Agent Communication\n(All agents + Orchestrator)',
      lbl: 'Standard\nAzure\nService\nBus',
      icon: AZURE_RAW_SVGS.SERVICE_BUS,
      x: 1265,
      hdrX: 1232,
      hdrW: 146,
    },
  ];
  for (const sc of stateCards) {
    addBox(
      `${sc.id}_hdr`,
      sc.hdr,
      sc.hdrX,
      356,
      sc.hdrW,
      26,
      'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontFamily=Inter,Segoe UI,sans-serif;fontSize=7.5;fontColor=#374151;'
    );
    addBox(
      `${sc.id}_card`,
      '',
      sc.x,
      384,
      66,
      72,
      'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
    );
    addIcon(sc.id, sc.lbl, sc.x + 19, 388, 28, 26, sc.icon, 'fontSize=7;');
  }

  // 8.4 App Service Environment Box (x = 1050, y = 468, w = 255, h = 148)
  addBox(
    'box_ase',
    '',
    1050,
    468,
    255,
    148,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addIcon('ase_mi', 'Managed\nIdentity', 1062, 472, 24, 22, AZURE_RAW_SVGS.MANAGED_IDENTITY, 'fontSize=7;');
  addIcon('ase_hdr_icon', '', 1122, 474, 24, 24, AZURE_RAW_SVGS.APP_SERVICE);
  addBox(
    'ase_hdr_lbl',
    'App Service Environment',
    1150,
    474,
    145,
    24,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8.5;fontStyle=1;fontColor=#111827;'
  );

  const zones = [
    { id: 'ase_z1', zone: 'Zone 1', x: 1062 },
    { id: 'ase_z2', zone: 'Zone 2', x: 1142 },
    { id: 'ase_z3', zone: 'Zone 3', x: 1222 },
  ];
  for (const zn of zones) {
    addBox(
      `${zn.id}_card`,
      '',
      zn.x,
      518,
      70,
      94,
      'rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;'
    );
    addIcon(zn.id, 'App Service\nInstance', zn.x + 23, 522, 24, 22, AZURE_RAW_SVGS.APP_SERVICE, 'fontSize=6.5;');
    addBox(
      `${zn.id}_lbl`,
      zn.zone,
      zn.x,
      593,
      70,
      16,
      'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8;fontColor=#0078D4;fontStyle=1;'
    );
  }

  // ============================================================================
  // 9. MIDDLE BLUE BAND: SUBSCRIPTION VENDING PROVISIONED RESOURCES (y = 638..750)
  // ============================================================================
  // 9.1 Left White Container: Subscription vending provisioned resources
  addBox(
    'box_sub_vending',
    '',
    132,
    640,
    555,
    102,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_vending_title',
    'Subscription vending provisioned resources',
    140,
    644,
    300,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=11.5;fontStyle=1;fontColor=#111827;'
  );

  addIcon(
    'vend_mgmt_grp',
    'Management group\nplacement',
    158,
    668,
    30,
    26,
    AZURE_RAW_SVGS.MGMT_GROUP,
    'fontSize=7.5;'
  );
  addIcon(
    'vend_spoke_vnet',
    'Spoke virtual network\n(DNS provided by hub)',
    255,
    668,
    32,
    26,
    AZURE_RAW_SVGS.VNET,
    'fontSize=7.5;'
  );
  addIcon(
    'vend_udr',
    'User-defined route\n(to regional hub firewall)',
    360,
    668,
    30,
    26,
    AZURE_RAW_SVGS.MANAGED_IDENTITY,
    'fontSize=7.5;'
  );

  addBox(
    'vend_plus',
    '+',
    438,
    672,
    30,
    30,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=28;fontStyle=1;fontColor=#9CA3AF;'
  );

  // 4 Governance Icons in a single horizontal row at y=668 inside Subscription Vending
  addIcon('vend_cost', 'Cost\nmanagement', 470, 668, 24, 22, AZURE_RAW_SVGS.COST_MGMT, 'fontSize=7;');
  addIcon(
    'vend_defender',
    'Defender for\nCloud',
    524,
    668,
    24,
    22,
    AZURE_RAW_SVGS.DEFENDER,
    'fontSize=7;'
  );
  addIcon('vend_policy', 'Org policy\nassignments', 578, 668, 24, 22, AZURE_RAW_SVGS.POLICY, 'fontSize=7;');
  addIcon('vend_rbac', 'Role\nassignments', 632, 668, 24, 22, AZURE_RAW_SVGS.RBAC, 'fontSize=7;');

  // 9.2 Right White Container: Coding Assistant Tools Subnet (x = 815, y = 646, w = 365, h = 90)
  addBox(
    'sub_coding_tools',
    '',
    815,
    646,
    365,
    90,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addBox(
    'sub_coding_title',
    'Coding Assistant Tools Subnet',
    823,
    650,
    200,
    18,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=9.5;fontStyle=1;fontColor=#111827;'
  );
  addBox(
    'card_code_interp',
    '',
    830,
    674,
    165,
    46,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D1D5DB;strokeWidth=1;'
  );
  addIcon('icon_code_interp', '', 838, 683, 26, 26, AZURE_RAW_SVGS.CONTAINER_APP);
  addBox(
    'lbl_code_interp',
    'Code Interpreter Session\nPool',
    872,
    680,
    118,
    34,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8.5;fontColor=#1F2937;'
  );

  addIcon(
    'icon_coding_aca_env',
    'Container App\nEnvironment',
    1048,
    666,
    32,
    28,
    AZURE_RAW_SVGS.CONTAINER_APPS_ENV,
    'fontSize=8;'
  );
  addIcon(
    'coding_mvnet_badge',
    'Managed\nVirtual\nNetwork',
    1128,
    634,
    24,
    22,
    AZURE_RAW_SVGS.VNET,
    'fontSize=7;'
  );
  addNsgBadge('nsg_coding_tools', 1180, 736);

  // ============================================================================
  // 10. BOTTOM-LEFT YELLOW BOX: PLATFORM LANDING ZONE / CONNECTIVITY SUBSCRIPTION
  // ============================================================================
  // Top-right label & key icon
  addBox(
    'conn_sub_hdr',
    'Connectivity subscription',
    495,
    772,
    160,
    20,
    'text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10.5;fontStyle=1;fontColor=#111827;'
  );
  addIcon('conn_sub_key', '', 660, 766, 28, 28, AZURE_RAW_SVGS.SUB_KEY);

  // Main Yellow Box (x = 115, y = 795, w = 572, h = 220)
  addBox(
    'plat_lz_yellow_box',
    '',
    115,
    795,
    572,
    220,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF2CC;strokeColor=#F59E0B;strokeWidth=2.5;'
  );

  // Bottom-right dark gold tab
  addBox(
    'plat_lz_tab',
    'Platform landing zone\nsubscription',
    517,
    1015,
    170,
    32,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#F59E0B;strokeColor=none;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10.5;fontStyle=1;fontColor=#111827;align=center;verticalAlign=middle;'
  );

  // 3 Stacked Light-Blue Hub Virtual Network Layers
  addBox(
    'hub_vnet_layer3',
    '',
    135,
    810,
    220,
    46,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#D9F2FF;strokeColor=#9CC3E6;strokeWidth=1;'
  );
  addBox(
    'hub_vnet_layer2',
    '',
    145,
    818,
    220,
    46,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#D9F2FF;strokeColor=#9CC3E6;strokeWidth=1;'
  );
  addBox(
    'hub_vnet_layer1',
    '',
    155,
    826,
    220,
    48,
    'rounded=0;whiteSpace=wrap;html=1;fillColor=#D9F2FF;strokeColor=#5B9BD5;strokeWidth=1.5;'
  );
  addIcon('hub_vnet_icon', '', 165, 836, 30, 26, AZURE_RAW_SVGS.VNET);
  addBox(
    'hub_vnet_lbl',
    'Hub virtual network\nRegion n',
    205,
    832,
    160,
    36,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=11.5;fontStyle=1;fontColor=#111827;'
  );

  // Tree lines & Hub Network Services below Hub VNet
  addCoordEdge(
    'hub_tree_trunk',
    '',
    175,
    874,
    175,
    990,
    'edgeStyle=none;html=1;strokeColor=#4A777A;strokeWidth=1.5;endArrow=none;'
  );

  const hubServices = [
    { id: 'hub_fw', lbl: 'Azure Firewall', icon: AZURE_RAW_SVGS.FIREWALL, y: 890, bold: true },
    { id: 'hub_bastion', lbl: 'Azure Bastion', icon: AZURE_RAW_SVGS.BASTION, y: 920, bold: true },
    { id: 'hub_vpn', lbl: 'VPN Gateway', icon: AZURE_RAW_SVGS.VPN_GW, y: 950, bold: false },
    { id: 'hub_er', lbl: '- or - ExpressRoute', icon: AZURE_RAW_SVGS.EXPRESSROUTE, y: 978, bold: false },
  ];
  for (const hs of hubServices) {
    addCoordEdge(
      `${hs.id}_branch`,
      '',
      175,
      hs.y + 12,
      195,
      hs.y + 12,
      'edgeStyle=none;html=1;strokeColor=#4A777A;strokeWidth=1.5;endArrow=none;'
    );
    addBox(
      `${hs.id}_lbl`,
      hs.lbl,
      198,
      hs.y,
      115,
      24,
      `text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10.5;fontStyle=${
        hs.bold ? '1' : '0'
      };fontColor=${hs.bold ? '#111827' : '#4B5563'};`
    );
    addIcon(`${hs.id}_icon`, '', 315, hs.y - 2, 24, 24, hs.icon);
  }

  // Right column inside Yellow Connectivity Subscription Box
  addIcon('hub_dns_zone', '', 425, 812, 28, 28, AZURE_RAW_SVGS.DNS_ZONE);
  addBox(
    'hub_dns_zone_lbl',
    'Private DNS zones\nfor Private Link',
    465,
    810,
    160,
    34,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10;fontStyle=1;fontColor=#111827;'
  );

  addIcon('hub_dns_res', '', 425, 856, 28, 28, AZURE_RAW_SVGS.DNS_RESOLVER);
  addBox(
    'hub_dns_res_lbl',
    'Azure DNS\nPrivate Resolver\n(linked rulesets)',
    465,
    852,
    160,
    40,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10;fontStyle=1;fontColor=#111827;'
  );

  addIcon('hub_ddos', '', 425, 904, 26, 26, AZURE_RAW_SVGS.DDOS);
  addBox(
    'hub_ddos_lbl',
    'Azure\nDDoS Protection',
    465,
    902,
    150,
    32,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter,Segoe UI,sans-serif;fontSize=10;fontColor=#4B5563;'
  );

  // Bottom row of 4 governance icons inside yellow box
  addIcon('hub_rbac', 'Role\nassignments', 418, 934, 24, 22, AZURE_RAW_SVGS.RBAC, 'fontSize=7;');
  addIcon('hub_policy', 'Policy\nassignments', 482, 934, 24, 22, AZURE_RAW_SVGS.POLICY, 'fontSize=7;');
  addIcon('hub_nw', 'Network\nWatcher', 546, 934, 24, 22, AZURE_RAW_SVGS.NET_WATCHER, 'fontSize=7;');
  addIcon('hub_def', 'Defender\nfor Cloud', 610, 934, 24, 22, AZURE_RAW_SVGS.DEFENDER, 'fontSize=7;');

  // ============================================================================
  // 11. INTER-SUBNET & CROSS-TIER CONNECTORS (PEERING, PRIVATE LINK, EGRESS)
  // ============================================================================
  // 11.1 Blue Virtual Network Peering line between Spoke VNet and Hub VNet
  addCoordEdge(
    'edge_vnet_peering',
    'Virtual network peering',
    273,
    720,
    273,
    826,
    'edgeStyle=none;html=1;strokeColor=#3B6EBA;strokeWidth=1.5;endArrow=none;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8.5;fontStyle=2;fontColor=#1F2937;labelBackgroundColor=#FFFFFF;'
  );

  // 11.2 Orange Controlled Egress Line from Workload Subnets -> Hub Azure Firewall
  addCoordEdge(
    'edge_controlled_egress_main',
    'Egress and DNS requests',
    462,
    420,
    345,
    902,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#EA580C;strokeWidth=1.8;dashed=1;dashPattern=5 4;endArrow=block;endFill=1;fontFamily=Inter,Segoe UI,sans-serif;fontSize=8.5;fontStyle=2;fontColor=#1F2937;labelBackgroundColor=#FFFFFF;',
    [
      { x: 462, y: 768 },
      { x: 375, y: 768 },
      { x: 375, y: 902 },
    ]
  );

  // Orange branch from Agentic Subnet -> Egress Trunk
  addCoordEdge(
    'edge_agentic_egress',
    '',
    775,
    328,
    462,
    345,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=5 4;endArrow=none;',
    [
      { x: 775, y: 345 },
      { x: 462, y: 345 },
    ]
  );

  // Orange branch from Egress Trunk -> Coding Assistant Tools Subnet
  addCoordEdge(
    'edge_egress_to_coding',
    '',
    462,
    690,
    815,
    690,
    'edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=5 4;endArrow=block;endFill=1;'
  );

  // 11.3 Blue Private Link Connections from Private Endpoints Subnet -> Right-hand Services
  addCoordEdge(
    'edge_pe_to_services_bus',
    '',
    607,
    440,
    1298,
    456,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B6EBA;strokeWidth=1.2;endArrow=none;',
    [
      { x: 607, y: 463 },
      { x: 1298, y: 463 },
    ]
  );
  addCoordEdge(
    'edge_pe_to_cosmos',
    '',
    711,
    440,
    1073,
    456,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B6EBA;strokeWidth=1.2;endArrow=none;',
    [
      { x: 711, y: 460 },
      { x: 1073, y: 460 },
    ]
  );
  addCoordEdge(
    'edge_pe_to_aisvc',
    '',
    867,
    384,
    1059,
    340,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B6EBA;strokeWidth=1.2;endArrow=none;',
    [
      { x: 867, y: 343 },
      { x: 1059, y: 343 },
    ]
  );
  addCoordEdge(
    'edge_pe_to_search',
    '',
    815,
    384,
    1122,
    340,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B6EBA;strokeWidth=1.2;endArrow=none;',
    [
      { x: 815, y: 347 },
      { x: 1122, y: 347 },
    ]
  );
  addCoordEdge(
    'edge_pe_to_kv',
    '',
    919,
    384,
    1248,
    340,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B6EBA;strokeWidth=1.2;endArrow=none;',
    [
      { x: 919, y: 351 },
      { x: 1248, y: 351 },
    ]
  );

  // 11.4 Blue Connection from App Service Ingress & Integration -> App Service Environment
  addCoordEdge(
    'edge_apping_to_ase',
    '',
    540,
    544,
    1050,
    560,
    'edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B6EBA;strokeWidth=1.5;endArrow=block;endFill=1;',
    [
      { x: 565, y: 544 },
      { x: 565, y: 605 },
      { x: 1015, y: 605 },
      { x: 1015, y: 560 },
    ]
  );

  return `<mxfile host="embed.diagrams.net" agent="PromptCanvas Master Engine v6.1">
  <diagram id="azure_application_landing_zone" name="Azure Application Landing Zone (1:1 Twin)">
    <mxGraphModel dx="1460" dy="1060" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1460" pageHeight="1060" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
