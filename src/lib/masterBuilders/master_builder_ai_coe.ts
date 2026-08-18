export function buildPristineAiCoeXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-08-08T17:52:00.000Z" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="ai_coe_operating_model" name="AI Center of Excellence (CoE) Operating Model">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🏛️ ✨&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_box_left" value="&lt;b style=&quot;font-size:18px;color:#0F172A;font-family:sans-serif;&quot;&gt;ENTERPRISE AI CENTER OF EXCELLENCE (CoE) OPERATING MODEL (P5-GOV-M-01)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Executive Governance &amp;amp; Strategy • Prompt Engineering Guild • GAMP 5 &amp;amp; EU AI Act Compliance • Continuous Value Capture&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;AI CoE Hub&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Enterprise Strategy&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: EXECUTIVE AI STRATEGY ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;👔 1. EXECUTIVE AI STRATEGY &amp;amp; INTAKE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_exec_strategy" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;👔 C-Suite AI Council &amp;amp; Vision&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Enterprise Generative AI Priorities &amp;amp; Budgeting&lt;br&gt;• Business Unit Use-Case Intake &amp;amp; ROI Scoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_business_plan" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;📑 Responsible AI &amp;amp; Ethical Charter&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Bias, Fairness &amp;amp; Transparency Guardrails&lt;br&gt;• Mandatory Human-in-the-Loop Signoff Thresholds&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.8;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="250" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: PROMPT GUILD & CURATION ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#FDE047;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:12px;color:#A16207;&quot;&gt;✨ 2. PROMPT GUILD &amp;amp; MODEL REGISTRY&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_prompt_curation" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#854D0E;&quot;&gt;✨ Vertex AI Model Garden &amp;amp; Prompt Hub&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#713F12;line-height:1.4;padding-top:4px;&quot;&gt;• Centralized Prompt Templates &amp;amp; System Messages&lt;br&gt;• AutoSxS Golden Benchmark Regression Testing&lt;br&gt;• Semantic Versioning (Prompt-as-Code GitOps)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF08A;strokeColor=#EAB308;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="125" as="geometry"/>
        </mxCell>

        <mxCell id="node_user_onboarding" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#854D0E;&quot;&gt;👥 Enterprise AI Academy &amp;amp; Sandbox&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#713F12;line-height:1.4;padding-top:4px;&quot;&gt;• Developer &amp;amp; Business User Onboarding Tracks&lt;br&gt;• Secure Colab Enterprise Interactive Workspaces&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EAB308;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="270" width="360" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: GAMP 5 & COMPLIANCE GUARDRAILS ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:12px;color:#B45309;&quot;&gt;🛡️ 3. GAMP 5, HIPAA &amp;amp; AUDIT CONTROLS&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_compliance_guard" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;GAMP 5 Category 5 AI Validation Framework&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#78350F;line-height:1.4;padding-top:4px;&quot;&gt;• Automated Traceability Matrix: Requirements to Tests&lt;br&gt;• 21 CFR Part 11 Electronic Records &amp;amp; Dual Signoffs&lt;br&gt;• Cloud KMS Hardware HSM Key Cryptography (CMEK)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="125" as="geometry"/>
        </mxCell>

        <mxCell id="node_drift_guard" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;Continuous Drift &amp;amp; Hallucination Sentinel&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#78350F;line-height:1.4;padding-top:4px;&quot;&gt;• Real-Time Output Grounding Verification Score&lt;br&gt;• Auto-Triggers Retraining Pipeline on Performance Drop&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="270" width="370" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: VALUE CAPTURE & FINOPS ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;📊 4. FINOPS &amp;amp; VALUE REALIZATION&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_finops_dashboard" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;Looker AI Value &amp;amp; FinOps Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-time Token Cost per Business Unit Attribution&lt;br&gt;• Measurable Productivity Uplift &amp;amp; Time Saved Metrics&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_feedback_sink" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;Continuous RLHF &amp;amp; Feedback Loop&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Human Feedback Ingestion for Distillation&lt;br&gt;• Executive Quarterly AI Impact Review Assembly&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="255" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. Strategic Directives" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_exec_strategy" target="node_prompt_curation">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. Onboard Teams" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_prompt_curation" target="node_user_onboarding">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Validate Compliance" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_prompt_curation" target="node_compliance_guard">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Monitor Drift" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_compliance_guard" target="node_drift_guard">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. Track ROI" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_compliance_guard" target="node_finops_dashboard">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Feed Back" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_finops_dashboard" target="node_feedback_sink">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
