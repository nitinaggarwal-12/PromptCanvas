export function buildGenomicsClinicalXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="pharma_genomics_pipeline" name="Refactored Google Native Pharma-Specific Genomics &amp; Drug Discovery Pipeline with Agentic AI and Gemini Enterprise">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- 1. TOP MAIN HEADER BANNER -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title_banner" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Pharma Genomics &amp;amp; Drug Discovery Pipeline with Agentic AI (P5-BIO-L-01)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;AlphaFold Pro Protein Design • GKE Spot Variant Calling • Clinico-Genomic Gemini Optimization&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- 2. ZONE 1: ON-PREMISES OMICS LAKE (x = 30 .. 310) -->
        <mxCell id="box_onprem_container" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="280" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_onprem_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🏢 ON-PREMISES OMICS LAKE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="280" height="30" as="geometry"/>
        </mxCell>

        <!-- Analyzers & FASTQ -->
        <mxCell id="card_seq_analyzers" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧬 Illumina Sequencer Analyzers&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;WGS / WES Raw Optical Fluorescent Feeds&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="130" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="card_fastq" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📄 FASTQ Raw Reads Lake&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Base quality scores &amp;amp; read segment archives&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="220" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Gemini Data Prep & Validation -->
        <mxCell id="box_gemini_dataprep" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;✨ Gemini Pre-Processing &amp;amp; Validation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Automated FastQC error validation &amp;amp; adapter trimming&lt;br&gt;• Synthetic sequence contamination detection&lt;br&gt;• High-throughput batch streaming to Google Cloud&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="315" width="250" height="135" as="geometry"/>
        </mxCell>


        <!-- 3. ZONE 2: GOOGLE GENOMICS & AGENTIC AI (x = 330 .. 1040) -->
        <mxCell id="box_gcp_main_container" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#1E293B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="85" width="710" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gcp_genomics_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#FFFFFF;&quot;&gt;⚛️ GOOGLE GENOMICS &amp;amp; AGENTIC AI (PHARMA DATA LAKE &amp;amp; COMPUTE)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="330" y="85" width="710" height="30" as="geometry"/>
        </mxCell>

        <!-- AlphaFold Pro Container -->
        <mxCell id="box_protein_design" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;🧬 AlphaFold Pro &amp;amp; Differentiable Protein Design&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• De-novo 3D protein structure prediction and folding dynamics&lt;br&gt;• Differentiable design for antibody affinity &amp;amp; small molecule binding&lt;br&gt;• Cloud TPU v5e accelerated structural minimization&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="130" width="330" height="150" as="geometry"/>
        </mxCell>

        <!-- Gemini Drug Discovery Specific Models -->
        <mxCell id="box_gemini_models" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#166534;border-bottom:1px solid #BBF7D0;padding-bottom:2px;&quot;&gt;✨ Gemini Bio-Specific Foundation Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Target validation against ClinVar, Ensembl &amp;amp; PubMed corpus&lt;br&gt;• In-silico ADMET toxicity &amp;amp; pharmacokinetics scoring&lt;br&gt;• Multi-agent synthesis for lead optimization pipelines&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="695" y="130" width="330" height="150" as="geometry"/>
        </mxCell>

        <!-- GKE Spot TPU Compute Cluster -->
        <mxCell id="box_gke_cluster" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;☸️ GKE Spot &amp;amp; TPU Compute Cluster (GATK Variant Calling)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Elastic auto-scaling across 10,000+ spot CPU/TPU nodes&lt;br&gt;• GATK Germline &amp;amp; Somatic variant calling pipelines (BWA-MEM, DeepVariant)&lt;br&gt;• Cost-optimized spot provisioning saving up to 80% on large cohort studies&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="300" width="330" height="160" as="geometry"/>
        </mxCell>

        <!-- Clinico-Genomic Integration & BigQuery -->
        <mxCell id="node_clinico_genomic" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;border-bottom:1px solid #CBD5E1;padding-bottom:2px;&quot;&gt;🔍 BigQuery Clinico-Genomic Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Unified VCF variant store with billion-row clinical EHR linkages&lt;br&gt;• Real-time cohort selection for multi-center clinical trials&lt;br&gt;• CMEK encryption with HIPAA &amp;amp; GxP compliance guardrails&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="695" y="300" width="330" height="160" as="geometry"/>
        </mxCell>

        <!-- Drug Binding & Optimization -->
        <mxCell id="node_drug_binding" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#92400E;&quot;&gt;💊 High-Throughput Drug Binding Optimizer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Molecular docking simulations &amp;amp; binding affinity ranking across millions of chemical candidates&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#EAB308;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="480" width="680" height="65" as="geometry"/>
        </mxCell>

        <!-- Agentic Feedback Loop Bar -->
        <mxCell id="bar_agentic_loop" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#166534;&quot;&gt;🔄 Autonomous Agentic Feedback Loop: Closed-loop target optimization &amp;amp; wet-lab validation triage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="565" width="680" height="45" as="geometry"/>
        </mxCell>


        <!-- 4. ZONE 3: AGENTIC INTERFACE & PSC HUB (x = 1060 .. 1200) -->
        <mxCell id="card_agentic_interface" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;&quot;&gt;🤖 🔗&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#581C87;&quot;&gt;AGENTIC PSC&lt;br&gt;HUB&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;Private Service Connect Transitive Routing Mesh&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1060" y="85" width="140" height="740" as="geometry"/>
        </mxCell>


        <!-- 5. ZONE 4: GOOGLE CLOUD MANAGED SERVICES & LOOKER (x = 1220 .. 1560) -->
        <mxCell id="box_managed_services" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1220" y="85" width="340" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_managed_hdr" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;📊 GEMINI MANAGED PLATFORM &amp;amp; BI&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="85" width="340" height="30" as="geometry"/>
        </mxCell>

        <!-- Managed Services Cards -->
        <mxCell id="card_m1_foundation" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚛️ Gemini Bio Foundation Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Fine-tuned on genomic sequences &amp;amp; proteomic data&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1235" y="130" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="card_m2_bigquery" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Omics Analytics Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;High-performance SQL queries across billion variants&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1235" y="220" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="card_m3_vertex" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🕸️ Vertex AI Model Garden &amp;amp; Pipelines&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated CI/CD MLOps for clinical trial models&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1235" y="310" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="card_m5_looker" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;📈 Looker Studio Clinical Trials Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Interactive dashboards on patient response &amp;amp; drug efficacy&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1235" y="400" width="310" height="75" as="geometry"/>
        </mxCell>


        <!-- ==================== FLOW CONNECTORS ==================== -->
        <mxCell id="e_z1_z2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_onprem_container" target="box_gcp_main_container"/>
        <mxCell id="e_z2_z3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_gcp_main_container" target="card_agentic_interface"/>
        <mxCell id="e_z3_z4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="card_agentic_interface" target="box_managed_services"/>

        <!-- On-Prem Ingestion -->
        <mxCell id="e_seq_fastq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_seq_analyzers" target="card_fastq"/>
        <mxCell id="e_fastq_prep" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_fastq" target="box_gemini_dataprep"/>

        <!-- Data Prep to Workloads -->
        <mxCell id="e_prep_protein" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_gemini_dataprep" target="box_protein_design"/>
        <mxCell id="e_prep_gke" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_gemini_dataprep" target="box_gke_cluster"/>

        <!-- Modeling to Pipeline Execution -->
        <mxCell id="e_protein_gemini" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_protein_design" target="box_gemini_models"/>
        <mxCell id="e_gke_clinico" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_gke_cluster" target="node_clinico_genomic"/>
        <mxCell id="e_models_binding" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_gemini_models" target="node_drug_binding"/>
        <mxCell id="e_clinico_binding" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="node_clinico_genomic" target="node_drug_binding"/>

        <!-- Pipeline to Agentic Routing -->
        <mxCell id="e_binding_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="node_drug_binding" target="bar_agentic_loop"/>
        <mxCell id="e_loop_agent" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="bar_agentic_loop" target="card_agentic_interface"/>

        <!-- Agentic Interface to Managed Services -->
        <mxCell id="e_agent_m1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_agentic_interface" target="card_m1_foundation"/>
        <mxCell id="e_agent_m2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_agentic_interface" target="card_m2_bigquery"/>
        <mxCell id="e_agent_m3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_agentic_interface" target="card_m3_vertex"/>
        <mxCell id="e_m2_m5" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_m2_bigquery" target="card_m5_looker"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Pharma Pipeline Mesh:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🏢 &lt;b&gt;On-Premises Omics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🧬 &lt;b&gt;AlphaFold Protein Design&lt;/b&gt;&lt;/td&gt;&lt;td&gt;☸️ &lt;b&gt;GKE Spot TPU Clusters&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🤖 &lt;b&gt;Agentic PSC Routing&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📈 &lt;b&gt;Looker Clinical Cockpit&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Enterprise Pharma Standard&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="850" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
