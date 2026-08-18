export function buildGenomicsClinicalXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="pharma_genomics_pipeline" name="Refactored Google Native Pharma-Specific Genomics &amp; Drug Discovery Pipeline with Agentic AI and Gemini Enterprise">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🧬 🔬&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;PHARMA GENOMICS &amp;amp; DRUG DISCOVERY PIPELINE WITH AGENTIC AI (P5-BIO-L-01)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;AlphaFold Pro Protein Design • GKE Spot Variant Calling • Clinico-Genomic Gemini Optimization &amp;amp; BigQuery Omics Lakehouse&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini Bio-Core&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Drug Discovery Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: ON-PREM OMICS & FASTQ INGRESS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;🏢 ON-PREMISES OMICS &amp;amp; FASTQ INGRESS&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_seq_analyzers" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;🧬&lt;/td&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Illumina NovaSeq X Analyzers&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;WGS / WES Raw Optical Fluorescent Feeds (Terabyte/hr)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="card_fastq" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;width:40px;text-align:center;&quot;&gt;📄&lt;/td&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;FASTQ Raw Reads Repository&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:normal;&quot;&gt;Base Quality Scores &amp;amp; Segment Archives (gzip)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="235" width="340" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="box_gemini_dataprep" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;✨ Gemini Pre-Processing &amp;amp; QC Validator&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Automated FastQC error validation &amp;amp; adapter trimming&lt;br&gt;• Synthetic sequence contamination detection&lt;br&gt;• High-throughput batch streaming to Cloud Storage (GCS)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="345" width="340" height="120" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: GKE SPOT TPU & VARIANT CALLING ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:12px;color:#1E3A8A;&quot;&gt;☸️ GKE SPOT TPU &amp;amp; VARIANT PIPELINE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="box_gke_cluster" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;&quot;&gt;☸️ GKE Spot Compute Cluster (GATK Variant Calling)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Elastic autoscaling across 10,000+ spot CPU/TPU nodes&lt;br&gt;• GATK Germline &amp;amp; Somatic variant calling (DeepVariant)&lt;br&gt;• 80% cost savings on large multi-thousand cohort studies&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_protein_design" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;&quot;&gt;🧬 AlphaFold Pro &amp;amp; Protein Design Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• De-novo 3D protein structure prediction &amp;amp; folding dynamics&lt;br&gt;• Cloud TPU v5e accelerated structural energy minimization&lt;br&gt;• Small-molecule binding affinity &amp;amp; antibody docking&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="265" width="360" height="125" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: CLINICO-GENOMIC LAKEHOUSE & GEMINI BIO ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:12px;color:#166534;&quot;&gt;🔍 CLINICO-GENOMIC LAKEHOUSE &amp;amp; BIO AI&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_clinico_genomic" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;&quot;&gt;🔍 BigQuery Clinico-Genomic Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Unified VCF variant store with billion-row clinical EHR linkages&lt;br&gt;• Real-time cohort selection for multi-center clinical trials&lt;br&gt;• CMEK encryption with HIPAA &amp;amp; GxP 21 CFR Part 11 compliance&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_gemini_models" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#166534;&quot;&gt;✨ Gemini Bio Foundation Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Target validation against ClinVar, Ensembl &amp;amp; PubMed corpus&lt;br&gt;• In-silico ADMET toxicity &amp;amp; pharmacokinetics scoring&lt;br&gt;• Multi-agent synthesis for lead optimization pipelines&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="265" width="370" height="125" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: DISCOVERY COCKPIT & WET-LAB TRIAGE ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;💊 DRUG DISCOVERY &amp;amp; WET-LAB TRIAGE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_drug_binding" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;High-Throughput Drug Binding Optimizer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Molecular docking simulations across millions of candidates&lt;br&gt;• Binding affinity ranking &amp;amp; selectivity scoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="card_looker_genomics" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;Looker Clinical Trials &amp;amp; Omics Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Interactive Variant Frequency Visualizer&lt;br&gt;• Automated FDA 21 CFR Part 11 Audit Trail&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="265" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. Stream FASTQ" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_seq_analyzers" target="box_gemini_dataprep">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. Cloud Upload" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_gemini_dataprep" target="box_gke_cluster">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Fold Protein" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_gke_cluster" target="box_protein_design">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Store Variants" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_gke_cluster" target="node_clinico_genomic">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. Target Validation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_clinico_genomic" target="box_gemini_models">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Dock Candidates" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_gemini_models" target="node_drug_binding">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e7" value="7. Cockpit Insights" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_clinico_genomic" target="card_looker_genomics">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
