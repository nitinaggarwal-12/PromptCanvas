export function buildMicroFrontendsXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="micro_frontends_ui" name="WBS 4.2.1: Micro-Frontend & Modular UI Presentation">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- TOP TITLE BANNER -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="620" height="64" as="geometry"/>
        </mxCell>
        <mxCell id="main_title_text" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;WBS 4.2.1: Micro-Frontend &amp;amp; Modular UI Presentation&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:13px;color:#334155;&quot;&gt;Module Federation, Client Event Bus, Real-Time WebSockets &amp;amp; Zero-Trust APIs&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="35" y="20" width="610" height="56" as="geometry"/>
        </mxCell>

        <!-- TOP RIGHT METADATA CARD -->
        <mxCell id="meta_table" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:9.5px;color:#0F172A;font-family:sans-serif;&quot;&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;width:34%;&quot;&gt;Diagram Name:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;Micro-Frontend &amp;amp; UI Presentation&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Architecture State:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;To-Be Cloud Native Target&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Core Tech Stack:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;Next.js Host, Webpack 5 MFE, WebSockets, Cloud CDN&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Blueprint ID:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;font-family:monospace;color:#0284C7;font-weight:bold;&quot;&gt;P3-APP-L-08_micro_frontend_architecture&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;" style="html=1;whiteSpace=wrap;rounded=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="1100" y="16" width="470" height="74" as="geometry"/>
        </mxCell>

        <!-- ================= LEFT: CLIENT ACTORS & STATIC CDN ================= -->
        <!-- End Users -->
        <mxCell id="actor_user" value="&lt;div style=&quot;font-size:28px;&quot;&gt;👤&lt;/div&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;End Users&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#64748B;&quot;&gt;Web &amp;amp; Mobile Browsers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="380" width="140" height="90" as="geometry"/>
        </mxCell>

        <!-- Cloud CDN Static Assets -->
        <mxCell id="box_cdn" value="&lt;div style=&quot;font-size:24px;&quot;&gt;☁️ 🌐&lt;/div&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Google Cloud CDN&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Edge Caching &amp;amp; SSL Offload&lt;br&gt;JS Bundles, CSS &amp;amp; Shared Assets&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="160" width="220" height="95" as="geometry"/>
        </mxCell>

        <!-- Real-Time WebSocket Server -->
        <mxCell id="box_ws" value="&lt;div style=&quot;font-size:24px;&quot;&gt;📡&lt;/div&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Real-Time WebSocket Gateway&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Cloud Run (WSS bidirectional)&lt;br&gt;Sub-20ms Real-Time Push&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="600" width="220" height="95" as="geometry"/>
        </mxCell>

        <!-- ================= CENTER: HOST APPLICATION SHELL ================= -->
        <mxCell id="box_host_shell" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="310" y="120" width="680" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="title_host_shell" value="&lt;b style=&quot;font-size:14px;color:#0F172A;&quot;&gt;Enterprise Host Application Shell (Next.js / React 19)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#475569;&quot;&gt;Dynamic Module Federation Runtime, Client Event Bus, Auth Boundary &amp;amp; Theme Provider&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="320" y="130" width="660" height="40" as="geometry"/>
        </mxCell>

        <!-- Sub-Module 1: Navigation & Global Header MFE -->
        <mxCell id="mfe_header" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Remote MFE 1: Global Navigation &amp;amp; App Switcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Federated Remote URL: /remotes/header.js (Webpack 5 Container)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="180" width="620" height="55" as="geometry"/>
        </mxCell>

        <!-- Sub-Module 2: Core Workspace / Canvas MFE -->
        <mxCell id="mfe_workspace" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Remote MFE 2: Architecture Canvas &amp;amp; Editor Studio&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Draw.io XML Viewport, Aspect Ratio Controls, Zoom/Pan &amp;amp; Multi-View Tabs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="255" width="620" height="75" as="geometry"/>
        </mxCell>

        <!-- Sub-Module 3: AI Assistant & Chat Widget MFE -->
        <mxCell id="mfe_chat" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Remote MFE 3: Gemini AI Copilot &amp;amp; Chat Widget&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Real-Time Streaming Tokens, MCP Tool Invocations, WebSocket State Sync&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="350" width="620" height="70" as="geometry"/>
        </mxCell>

        <!-- Sub-Module 4: Analytics & Metrics Dashboard MFE -->
        <mxCell id="mfe_analytics" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Remote MFE 4: FinOps &amp;amp; SRE Observability Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Looker Embedded Dashboards, Token Quota Gauges, Error Budget Tracking&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="440" width="620" height="70" as="geometry"/>
        </mxCell>

        <!-- Shared Client Bus & State Management -->
        <mxCell id="mfe_bus" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Unified Cross-MFE Client Event Bus &amp;amp; Shared Store&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;BroadcastChannel API, RxJS Subject Bus, Shared Tailwind Design Tokens &amp;amp; Auth JWT Vault&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="530" width="620" height="55" as="geometry"/>
        </mxCell>

        <!-- Runtime Orchestrator / Error Boundary -->
        <mxCell id="mfe_runtime" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dynamic Module Orchestrator &amp;amp; Resilient Error Boundary&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;Automatic Remote Fallback, Circuit Breaker on Load Failure, Sub-millisecond Mount Lifecycle&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="605" width="620" height="45" as="geometry"/>
        </mxCell>

        <!-- ================= RIGHT: BACKEND APIS & IDENTITY ================= -->
        <!-- Apigee API Gateway -->
        <mxCell id="box_apigee" value="&lt;div style=&quot;font-size:24px;&quot;&gt;🛡️ 🌐&lt;/div&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Apigee API Gateway&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;OAuth2 / JWT Token Validation&lt;br&gt;Rate Limiting &amp;amp; Route Dispatch&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="140" width="220" height="95" as="geometry"/>
        </mxCell>

        <!-- Backend Microservices -->
        <mxCell id="box_backend_apis" value="&lt;div style=&quot;font-size:24px;&quot;&gt;⚙️ 🚀&lt;/div&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Backend Microservices (Cloud Run)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;GraphQL &amp;amp; REST Domain APIs&lt;br&gt;Catalog, Orders, Diagrams &amp;amp; AI Agents&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="275" width="220" height="95" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Identity Platform -->
        <mxCell id="box_idp" value="&lt;div style=&quot;font-size:24px;&quot;&gt;🔒 🔑&lt;/div&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;GCP Identity Platform (IdP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;SAML 2.0 / OIDC Identity Federation&lt;br&gt;Multi-Factor Auth (MFA) &amp;amp; SSO&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="410" width="220" height="95" as="geometry"/>
        </mxCell>

        <!-- Cloud Logging & SRE Observability -->
        <mxCell id="box_obs" value="&lt;div style=&quot;font-size:24px;&quot;&gt;📊 📈&lt;/div&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Cloud Logging &amp;amp; Trace&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Client Error Telemetry, OpenTelemetry&lt;br&gt;Core Web Vitals (LCP, CLS, FID)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1050" y="545" width="220" height="95" as="geometry"/>
        </mxCell>

        <!-- Personas Right -->
        <mxCell id="persona_eng" value="&lt;div style=&quot;font-size:26px;&quot;&gt;👨‍💻 🔧&lt;/div&gt;&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Frontend &amp;amp; SRE Teams&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;CI/CD Deployment &amp;amp; Monitoring&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1330" y="340" width="220" height="90" as="geometry"/>
        </mxCell>

        <!-- ================= EXPLICIT SOLID CONNECTORS ================= -->
        <!-- 1. End User -> Host App -->
        <mxCell id="edge_user_host" value="1. HTTPS / WSS Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0F172A;strokeWidth=2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1" source="actor_user" target="box_host_shell">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 2. Host Shell <-> CDN -->
        <mxCell id="edge_host_cdn" value="2. Dynamic Bundle Fetch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;startArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=9.5;fontColor=#0284C7;" edge="1" parent="1" source="box_host_shell" target="box_cdn">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="310" y="208"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3. Host Shell <-> WebSocket Server -->
        <mxCell id="edge_host_ws" value="3. Bidirectional WSS Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;startArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=9.5;fontColor=#16A34A;" edge="1" parent="1" source="box_host_shell" target="box_ws">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="310" y="648"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 4. Host Shell -> Apigee -->
        <mxCell id="edge_host_apigee" value="4. REST/GraphQL Queries" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#2563EB;" edge="1" parent="1" source="box_host_shell" target="box_apigee">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1010" y="290"/>
              <mxPoint x="1010" y="188"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 5. Apigee -> Backend Microservices -->
        <mxCell id="edge_apigee_backend" value="5. Private Service Connect (PSC)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=1.8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=9.5;fontColor=#2563EB;" edge="1" parent="1" source="box_apigee" target="box_backend_apis">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 6. Host Shell <-> Identity Platform -->
        <mxCell id="edge_host_idp" value="6. OIDC / SAML Auth &amp; Token Refresh" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;startArrow=block;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=9.5;fontColor=#16A34A;" edge="1" parent="1" source="box_host_shell" target="box_idp">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1010" y="458"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 7. Host Shell -> Cloud Logging & Observability -->
        <mxCell id="edge_host_obs" value="7. Web Vitals &amp; Crash Logs" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=1.8;strokeDashArray=4 4;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=9.5;fontColor=#D97706;" edge="1" parent="1" source="box_host_shell" target="box_obs">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1010" y="593"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 8. Personas -> Backend & Observability -->
        <mxCell id="edge_eng_backend" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="persona_eng" target="box_backend_apis">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1300" y="385"/>
              <mxPoint x="1300" y="323"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_eng_obs" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="persona_eng" target="box_obs">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1300" y="385"/>
              <mxPoint x="1300" y="593"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- BOTTOM FOOTER LEGEND -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#334155;&quot;&gt;&lt;b&gt;Architecture Legend:&lt;/b&gt; 🔵 HTTPS/REST Flow &amp;nbsp;|&amp;nbsp; 🟢 WebSocket Stream &amp;nbsp;|&amp;nbsp; 🟣 Module Federation Remote &amp;nbsp;|&amp;nbsp; 🟠 Telemetry &amp;amp; Logging &amp;nbsp;|&amp;nbsp; 🔒 Zero-Trust Identity Boundary&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="830" width="1540" height="34" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`.trim();
}
