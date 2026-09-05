import fs from 'fs';
import path from 'path';

interface SpecDefinition {
  version: string;
  filename: string;
  title: string;
  subtitle: string;
  milestoneName: string;
  maturityLevel: string;
  targetSla: string;
  compliance: string;
  prompt: string;
  overview: string;
  zones: {
    name: string;
    description: string;
    services: { name: string; type: string; role: string; specs: string }[];
  }[];
  schemasAndProtocols: {
    name: string;
    protocol: string;
    schemaOrCode: string;
  }[];
  sequenceFlow: string[];
  failureModesAndHealing: {
    failureScenario: string;
    detectionMechanism: string;
    automatedRemediation: string;
    failoverLatency: string;
  }[];
  securityAndGovernance: {
    control: string;
    standard: string;
    implementation: string;
  }[];
}

const SPECS: SpecDefinition[] = [
  {
    version: 'v1.0',
    filename: '01_v1_0_classical_cloud_baseline_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v1.0 Baseline Architecture: Hybrid Satellite Ingress, Stream Processing & Classical ML Anomaly Detection',
    milestoneName: 'Classical Cloud & ML Infrastructure Baseline',
    maturityLevel: 'Level 1: Telemetric Monitoring & Passive ML Inference',
    targetSla: '99.99% Cloud Ingestion Availability • <2.5s Processing Latency',
    compliance: 'ISO 27001, IMO Autonomous Vessel Safety Level 1, OGC Sensor Web Enablement',
    prompt: `Design an enterprise-grade cloud architecture for 50 autonomous deep-sea robotic submersibles (HUGIN Superior AUVs) conducting hydrothermal vent mapping at 4,000m depth. Focus strictly on classical infrastructure, platform, networking, databases, data warehouse, streaming analytics, and classical machine learning. Ingress must traverse subsea acoustic modems (12kHz, 10 kbps) to solar-powered surface relay buoys with Starlink/LEO satellite links. In Google Cloud, route through Cloud Armor WAF and Global HTTPS Load Balancer into a Shielded VPC (10.128.0.0/16) with VPC Service Controls. Ingest telemetry into Google Cloud Pub/Sub Lite (200k ev/s), process with Cloud Dataflow (Apache Beam 10s sliding windows), and dual-write to Cloud Spanner (nam3 multi-region) for ACID vehicle state and BigQuery Geospatial for 4D bathymetric point-clouds. Machine learning must be classical: an XGBoost/Scikit-learn model deployed on Vertex AI Custom Prediction for passive anomaly detection with Explainable AI (XAI) Shapley value attribution. SRE observability must feature Cloud Monitoring, Cloud Logging, and a shore base tactical console with human marine pilots in the loop.`,
    overview: `The v1.0 architecture establishes the foundational data capture, perimeter security, streaming pipeline, transactional persistence, spatial warehousing, and classical supervised predictive modeling for a fleet of 50 autonomous underwater vehicles (AUVs) surveying abyssal hydrothermal ecosystems. All operational commands originate from human pilots at shore tactical consoles.`,
    zones: [
      {
        name: 'Zone 1: Subsea & Satellite Ingress',
        description: 'Physical oceanographic sensing layer spanning 4,000m depth to surface buoys.',
        services: [
          { name: '50x HUGIN Superior AUV Swarm', type: 'Physical Marine Robotics', role: 'Abyssal exploration vehicles with dual submersibles, HISAS 1032 synthetic aperture sonar, CTD probes, and Doppler velocity logs.', specs: 'Depth: 6,000m • Endurance: 72h • Lithium-Polymer 45kWh' },
          { name: 'Subsea Acoustic Modems', type: 'Physical Layer Acoustic Telemetry', role: 'Physical acoustic modulation between submersibles and surface platforms.', specs: 'Frequency: 12kHz • Modulation: FSK/PSK • Throughput: 10 kbps' },
          { name: 'Autonomous Surface Relay Buoys', type: 'Edge Communications Platform', role: 'Solar-powered surface wave-glider buoys acting as acoustic-to-satellite relays.', specs: 'Uplink: Starlink Marine / Kymeta LEO • Fallback: 5G Coastal' },
          { name: 'Protected Hydrothermal Vent Biome', type: 'Environmental Boundary', role: 'Delicate chemotrophic biological habitat requiring strict collision avoidance.', specs: 'Temp: 350°C • pH: 2.8 • Mineral chimney structures' },
          { name: 'Benthic Oceanographic Sensor Grid', type: 'Fixed Mooring Grid', role: 'Seafloor CTD profilers and acoustic Doppler current profilers (ADCP).', specs: 'RS-485 to acoustic transponder • Sample Rate: 1Hz' }
        ]
      },
      {
        name: 'Zone 2: VPC Network & Edge Perimeter',
        description: 'Hardened cloud entry perimeter and cryptographic isolation per Google Cloud landing zone standards.',
        services: [
          { name: 'Cloud Armor & WAF Shield', type: 'Network Security', role: 'DDoS mitigation, IP rate limiting, and Layer 7 inspection on satellite endpoints.', specs: 'Rule: 500k req/min adaptive limit • OWASP ModSecurity Core' },
          { name: 'Global External HTTP(S) Load Balancer', type: 'Network Routing', role: 'Anycast IPv4/IPv6 edge termination with low-latency SSL offloading.', specs: 'BGP Anycast VIP • TLS 1.3 Strict • HTTP/2 over QUIC' },
          { name: 'Shielded VPC (10.128.0.0/16)', type: 'Software Defined Network', role: 'Isolated production network with Private Google Access and Cloud NAT.', specs: 'Subnets: Ingress (10.128.1.0/24), Data (10.128.2.0/24), ML (10.128.3.0/24)' },
          { name: 'Cloud KMS (CMEK HSM)', type: 'Key Management', role: 'FIPS 140-3 Level 3 HSM hardware envelope encryption for all sonar assets.', specs: 'Algorithm: AES-256-GCM • Key Rotation: 90 Days' },
          { name: 'Security Command Center (SCC)', type: 'Security Monitoring', role: 'Continuous threat detection, misconfiguration audits, and compliance validation.', specs: 'Tier: Premium • Real-time Event Threat Detection' }
        ]
      },
      {
        name: 'Zone 3: Stream & Feature Pipeline',
        description: 'High-throughput stream demultiplexing, windowed calibration, and real-time event routing.',
        services: [
          { name: 'Google Cloud Pub/Sub Lite', type: 'Message Broker', role: 'Zonal partitioned streaming message ingest for continuous sonar and CTD telemetry.', specs: 'Partitions: 32 • Ingestion Capacity: 200,000 msgs/s • Retention: 7 Days' },
          { name: 'Cloud Dataflow (Apache Beam)', type: 'Stream Compute Engine', role: '10s sliding window aggregation, sensor coordinate conversion, and bathymetric calibration.', specs: 'Worker: n2-standard-4 • Streaming Engine: V2 • Autoscaling: 5-50 workers' },
          { name: 'Batch Acoustic Replay Job', type: 'Batch Processing', role: 'Nightly raw sonar demuxing and cold archive ETL into lakehouse formats.', specs: 'Trigger: Cloud Scheduler • Execution: Cloud Run Jobs' },
          { name: 'Telemetry Ingestion Buffer', type: 'Resiliency Queue', role: 'Dead letter queue and backpressure absorption store during satellite network bursts.', specs: 'DLQ Max Delivery Attempts: 5 • Overflow Spool: Cloud Storage' },
          { name: 'Dataflow Pipeline Telemetry', type: 'Pipeline Observability', role: 'Watermark tracking, system lag metrics, and metric export to Cloud Monitoring.', specs: 'Metric Interval: 10s • Latency Alert Threshold: >15s' }
        ]
      },
      {
        name: 'Zone 4: Storage & State Engine',
        description: 'Multi-region transactional database, 4D spatial warehouse, and raw lakehouse store.',
        services: [
          { name: 'Cloud Spanner (nam3 Multi-Region)', type: 'Relational Database', role: 'ACID transactional state for fleet positions, mission manifests, and battery states.', specs: 'SLA: 99.999% • Nodes: 6 • Multi-Region: nam3 (Iowa, S. Carolina, N. Virginia)' },
          { name: 'BigQuery Geospatial', type: 'Analytics Warehouse', role: '4D bathymetric coordinate mesh and spatial clustering for dive point clouds.', specs: 'Partitioning: Daily by dive_timestamp • Clustering: geohash, vehicle_id' },
          { name: 'Cloud Storage (Curated Lake)', type: 'Object Storage', role: 'Raw multibeam sonar (.ALL files) and uncompressed 4K benthic video footage.', specs: 'Storage Class: Dual-Region (us-central1/us-east1) • Retention: WORM 7 Years' },
          { name: 'Dataplex Universal Catalog', type: 'Data Governance', role: 'Lakehouse governance, schema enforcement, and automated bathymetry lineage tracking.', specs: 'Discovered Assets: 15 Lakes • Auto Data Quality Rules: 42' },
          { name: 'BigLake Iceberg Metastore', type: 'Open Table Lakehouse', role: 'Open Apache Iceberg table management for cross-engine acoustic analytics.', specs: 'Engine: BigLake Managed Metastore • Format: Apache Iceberg v2' }
        ]
      },
      {
        name: 'Zone 5: Classical ML Prediction',
        description: 'Supervised predictive modeling for vehicle sensor drift and hydrodynamic anomaly detection.',
        services: [
          { name: 'Vertex AI Custom Prediction', type: 'ML Inference Endpoint', role: 'XGBoost / Scikit-learn model endpoint for real-time sensor anomaly scoring.', specs: 'Machine: n1-standard-4 • Accelerator: None • Latency: p99 < 85ms' },
          { name: 'Vertex AI Model Evaluation', type: 'ML Governance', role: 'Precision/Recall and data drift scoring against offline ground truth bathymetry.', specs: 'Metrics: Precision 0.94, Recall 0.91, ROC-AUC 0.96' },
          { name: 'Vertex AI Model Registry', type: 'MLOps Lineage', role: 'Model artifact lineage, semantic versioning, and staging-to-production promotion gates.', specs: 'Version Format: SemVer • Artifact Storage: GCS gs://deepsea-models/' },
          { name: 'Explainable AI (XAI) Attribution', type: 'Model Interpretability', role: 'Shapley value calculation explaining sensor contribution to hydrodynamic drift alerts.', specs: 'Method: Tree SHAP • Top Features: salinity_gradient, motor_current, pitch_angle' },
          { name: 'Vertex AI Pipelines (Kubeflow)', type: 'ML Automation', role: 'Automated retraining DAGs scheduled weekly based on cumulative drift metrics.', specs: 'Orchestrator: Kubeflow Pipelines v2 • Trigger: Pub/Sub drift alert' }
        ]
      },
      {
        name: 'Zone 6: Observability & SRE',
        description: 'Shore base operations center and tactical piloting console for human operators.',
        services: [
          { name: 'Cloud Monitoring & Telemetry', type: 'Infrastructure Monitoring', role: 'AUV battery gauge dashboards, satellite SNR graphs, and system telemetry.', specs: 'Dashboards: 12 • Metric Retention: 24 Months • Alert Channels: PagerDuty' },
          { name: 'Cloud Logging & Audit Trail', type: 'Compliance Logging', role: 'Immutable mission logs retained for marine environmental regulatory audits.', specs: 'Retention: 10 Years • Log Router: GCS Sink & BigQuery Analytics' },
          { name: 'Shore Base Tactical Console', type: 'Human Interface', role: 'Manual joystick control, waypoint dispatch, and human marine pilot oversight.', specs: 'Frontend: React / WebGL 3D Bathymetry • Latency: Satcom ~1.8s roundtrip' },
          { name: 'Vessel Traffic Service (VTS)', type: 'Maritime Telecommunications', role: 'AIS transceiver interface and surface collision avoidance broadcast.', specs: 'Protocol: NMEA 0183 / AIS VHF 161.975MHz' },
          { name: 'Marine Incident Escalation', type: 'Incident Management', role: 'Automated satellite paging and war room dispatch when vehicle fails heartbeat.', specs: 'Escalation SLA: <60s • Emergency Channel: Coast Guard GMDSS' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'Acoustic Telemetry Packet Schema',
        protocol: '12kHz Acoustic FSK (10 kbps)',
        schemaOrCode: `// Binary packed struct (32 bytes per frame)
struct AcousticTelemetryFrame {
  uint32_t timestamp_epoch;    // UTC seconds
  uint16_t vehicle_id;         // 1..50
  int32_t  latitude_e7;        // Degrees * 1e7
  int32_t  longitude_e7;       // Degrees * 1e7
  uint16_t depth_meters;       // 0..6000m
  int16_t  salinity_e2;        // PSU * 100
  int16_t  temperature_e2;     // Deg C * 100
  uint8_t  battery_percent;    // 0..100%
  uint8_t  status_flags;       // Leak, Motor, Comms bitmask
  uint16_t crc16_ccitt;        // Integrity check
};`
      },
      {
        name: 'Cloud Spanner DDL Schema',
        protocol: 'Google Cloud Spanner SQL',
        schemaOrCode: `CREATE TABLE auv_fleet_state (
  vehicle_id INT64 NOT NULL,
  last_ping_timestamp TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp = true),
  latitude FLOAT64 NOT NULL,
  longitude FLOAT64 NOT NULL,
  depth_meters FLOAT64 NOT NULL,
  battery_level_percent NUMERIC NOT NULL,
  operational_status STRING(32) NOT NULL,
  anomaly_score FLOAT64,
  active_mission_id STRING(64) NOT NULL
) PRIMARY KEY (vehicle_id);

CREATE INDEX idx_auv_status ON auv_fleet_state (operational_status, last_ping_timestamp DESC);`
      }
    ],
    sequenceFlow: [
      '1. Subsea AUV measures multibeam sonar, salinity, temperature, and vehicle kinematics at 1Hz.',
      '2. Telemetry is serialized into compact 32-byte binary frames and transmitted via 12kHz acoustic transducer.',
      '3. Surface Relay Buoy receives acoustic frame, decodes CRC16, and uplinks via Starlink Marine satellite to Cloud Armor.',
      '4. Global HTTPS Load Balancer decrypts TLS 1.3 and publishes payload to Pub/Sub Lite topic sonar-raw.',
      '5. Cloud Dataflow windowing job performs 10s sliding average, converts coordinates, and checks schema contracts.',
      '6. Dataflow executes dual write: ACID vehicle state to Cloud Spanner and 4D spatial coordinate records to BigQuery Geospatial.',
      '7. Vertex AI Custom Prediction endpoint evaluates incoming feature vector against trained XGBoost anomaly model.',
      '8. If anomaly score exceeds 0.75, an alert is published to Shore Base Tactical Console for human pilot intervention.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'Acoustic Thermocline Blackout (AUV descends into high-salinity inversion layer)',
        detectionMechanism: 'Loss of 3 consecutive acoustic pings (>45s) on Surface Relay Buoy.',
        automatedRemediation: 'AUV triggers autonomous acoustic repeater buoy drop; Cloud Dataflow flags vehicle as ACOUSTIC_SIGNAL_DEGRADED in Cloud Spanner.',
        failoverLatency: '45 seconds'
      },
      {
        failureScenario: 'Dataflow Worker OOM on Massive Multibeam Sonar Burst',
        detectionMechanism: 'Dataflow backlog watermark spikes >30s; Cloud Monitoring alert fires.',
        automatedRemediation: 'Autoscaler dynamically spins up 15 additional n2-standard-4 workers; Pub/Sub Lite buffers up to 7 days of raw stream.',
        failoverLatency: '<90 seconds'
      }
    ],
    securityAndGovernance: [
      { control: 'CMEK Hardware Cryptography', standard: 'FIPS 140-3 Level 3', implementation: 'Cloud KMS HSM protects all BigQuery datasets and Cloud Storage buckets.' },
      { control: 'Network Perimeter Defense', standard: 'Zero Trust / BeyondCorp', implementation: 'VPC Service Controls perimeter prevents data exfiltration from BigQuery and Spanner to external networks.' },
      { control: 'Maritime Regulatory Audit', standard: 'IMO Autonomous Safety Level 1', implementation: 'All piloting commands and joystick telemetry are immutably archived in Cloud Logging with 10-year retention.' }
    ]
  },
  {
    version: 'v2.0',
    filename: '02_v2_0_realtime_feature_store_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v2.0 Real-Time Context: Low-Latency Feature Store & In-Memory Redis Cluster',
    milestoneName: 'Low-Latency Feature Store & In-Memory Serving',
    maturityLevel: 'Level 2: Sub-5ms Feature Retrieval & Streaming Feature Engineering',
    targetSla: '99.99% Availability • <5ms Feature Serving Latency',
    compliance: 'ISO 27001, OGC Oceanographic Data Standards, WMO Ocean Feature Specification',
    prompt: `Modify the v1.0 architecture to address analytical latency bottlenecks. Querying BigQuery Geospatial takes 1.5 to 3.5 seconds, which is too slow for evaluating hydrodynamic currents, tidal drift vectors, and motor cavitation warnings. Introduce an in-memory caching tier and a managed real-time feature store into Zone 3 and Zone 4. Specifically: add a Google Cloud Memorystore Redis Cluster for sub-5ms low-latency caching of vehicle Doppler velocity log vectors. Introduce Vertex AI Feature Store with online low-latency serving for pre-aggregated hydrodynamic features (salinity gradient, thermal flux, localized pressure gradient). Configure Datastream CDC Sync Engine for serverless real-time replication between Cloud Spanner and Feature Store. Fork the Cloud Dataflow pipeline so that real-time features are synchronized into Vertex AI Feature Store without impacting BigQuery batch ingestion. Route the telemetry inference channel from Vertex AI Feature Store through the open horizontal corridor at y=500 between Cloud Storage and Dataplex into Vertex AI Custom Prediction to guarantee zero line-slicing across BigQuery.`,
    overview: `v2.0 introduces real-time feature engineering and low-latency feature serving. By eliminating BigQuery roundtrip queries for transient operational features, statistical ML prediction latency drops from seconds to sub-5ms, enabling near real-time detection of hydrodynamic shear currents around submarine volcanic peaks.`,
    zones: [
      {
        name: 'Zone 3: Stream & Feature Pipeline (Mutated)',
        description: 'Upgraded with Vertex AI Feature Store and Memorystore Redis for online feature serving.',
        services: [
          { name: 'Google Cloud Pub/Sub Lite', type: 'Message Broker', role: 'High-throughput stream ingestion.', specs: '200k ev/s • 32 Partitions' },
          { name: 'Cloud Dataflow (Apache Beam)', type: 'Stream Compute Engine', role: 'Real-time feature calculation: 10s sliding salinity variance, thermal derivative (dT/dt), and velocity divergence.', specs: 'Direct stream push to Vertex Feature Store Online Endpoint' },
          { name: 'Vertex AI Feature Store', type: 'Feature Store Platform', role: 'Low-latency online feature serving for real-time inference and training consistency.', specs: 'Serving Latency: p99 < 3.2ms • Feature Views: auv_hydrodynamic_features, vent_proximity_metrics' },
          { name: 'Memorystore Redis Cluster', type: 'In-Memory Cache', role: 'Sub-5ms cache for high-frequency Doppler Velocity Log (DVL) kinematic vectors.', specs: 'Memory: 32 GB • High Availability: Multi-Zone Replication • Throughput: 100k ops/sec' },
          { name: 'Datastream CDC Sync Engine', type: 'Change Data Capture', role: 'Bi-directional serverless replication keeping Feature Store and Spanner synchronized.', specs: 'Latency: <1.5s • Zero agent overhead on Spanner' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'Vertex AI Feature Store Entity & Feature Specification',
        protocol: 'Vertex AI Feature Store API v1',
        schemaOrCode: `entityType: auv_vehicle
features:
  - name: salinity_gradient_10s
    valueType: DOUBLE
    description: "Rate of salinity change across last 10 seconds (PSU/s)"
  - name: thermal_flux_derivative
    valueType: DOUBLE
    description: "First derivative of water temperature indicating hydrothermal plume contact"
  - name: dvl_drift_divergence
    valueType: DOUBLE
    description: "Discrepancy between inertial dead-reckoning and acoustic Doppler velocity log"
  - name: motor_power_efficiency_ratio
    valueType: DOUBLE
    description: "Thruster electrical draw divided by forward kinematic displacement"`
      }
    ],
    sequenceFlow: [
      '1. Telemetry frames arrive via satellite at Global HTTPS Load Balancer and Pub/Sub Lite.',
      '2. Cloud Dataflow computes 10s sliding window aggregations for thermal flux and hydrodynamic shear.',
      '3. Dataflow writes raw features directly to Vertex AI Feature Store Online Serving store.',
      '4. Vehicle kinematic velocity vectors are cached in Memorystore Redis Cluster with 60s TTL.',
      '5. Datastream CDC captures Spanner transactional updates and synchronizes entity attributes into Feature Store.',
      '6. Vertex AI Custom Prediction queries Feature Store via low-latency gRPC (:443), retrieving feature vector in 2.8ms.',
      '7. Prediction endpoint evaluates model and routes inference telemetry through the open corridor at y=500, with zero line collision.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'Memorystore Redis Master Node Failover',
        detectionMechanism: 'TCP health check timeout >500ms; Cloud Monitoring alert fires.',
        automatedRemediation: 'Automated failover promotes read-replica to master in <4 seconds; clients fallback to Feature Store direct serving.',
        failoverLatency: '3.8 seconds'
      }
    ],
    securityAndGovernance: [
      { control: 'In-Transit Encryption for Feature Serving', standard: 'TLS 1.3 / mTLS', implementation: 'All Redis and Feature Store gRPC connections enforce mutual TLS within VPC perimeter.' }
    ]
  },
  {
    version: 'v3.0',
    filename: '03_v3_0_multimodal_vector_search_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v3.0 Multimodal Perception: Acoustic Sonar Embeddings & ScaNN Vector Search',
    milestoneName: 'Multimodal Sonar & Optical High-Dimensional Vector Search',
    maturityLevel: 'Level 3: Vector Semantic Retrieval & Multimodal Geological Pattern Matching',
    targetSla: '99.99% Availability • <12ms Vector Retrieval p99',
    compliance: 'ISO 27001, Seabed 2030 Bathymetric Standards, UNESCO Ocean Data Policy',
    prompt: `Mutate the v2.0 architecture to support multimodal acoustic and optical perception. The submersibles now capture side-scan multibeam sonar acoustic spectrograms and 4K optical images of hydrothermal vents, generating high-dimensional unstructured representations. Replace the static Model Registry in Zone 5 with Vertex Vector Search (ScaNN index) operating on 1408-dimensional embeddings. Route multibeam sonar acoustic files from Cloud Dataflow across Zone 4 through the open horizontal corridor at y=380 (between BigQuery and Cloud Storage) directly to Vertex Vector Search. Keep the v2.0 telemetry inference edge routing through the open corridor at y=500, guaranteeing zero line overlap and zero card collision. Enable the system to perform sub-12ms nearest-neighbor retrieval against 10 million historical benthic formations stored in BigLake Iceberg metastore.`,
    overview: `v3.0 elevates the system from structured scalar sensor monitoring to high-dimensional multimodal perception. By embedding acoustic spectrograms into 1408-dimensional vector spaces and indexing them with Vertex Vector Search (ScaNN), submersibles can instantly identify known hydrothermal chimneys, volcanic lava tubes, and methane seeps.`,
    zones: [
      {
        name: 'Zone 5: Multimodal Vector Perception (Mutated)',
        description: 'Upgraded with Vertex Vector Search running Google ScaNN index.',
        services: [
          { name: 'Vertex Vector Search (ScaNN)', type: 'Vector Database', role: 'High-dimensional vector index for acoustic sonar spectrograms and benthic vent optical embeddings.', specs: 'Dimensions: 1408 • Distance Metric: Cosine / Dot Product • Index: ScaNN (Anisotropic Vector Quantization) • Latency: p99 < 12ms' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'Acoustic Vector Ingestion Schema',
        protocol: 'gRPC Vector Search Ingestion Protocol',
        schemaOrCode: `message AcousticSonarEmbedding {
  string vector_id = 1;              // "auv-04-dive-382-chunk-9182"
  repeated float values = 2;          // 1408-dimensional float array
  map<string, string> metadata = 3;   // { "depth_m": "3840", "formation": "black_smoker", "temp_c": "342.1" }
  google.protobuf.Timestamp captured_at = 4;
}`
      }
    ],
    sequenceFlow: [
      '1. Side-scan sonar acoustic spectrograms and optical frames are compressed into 1408-dim embeddings on Dataflow.',
      '2. Dataflow streams vector embeddings across Zone 4 through the open corridor at y=380 into Vertex Vector Search.',
      '3. ScaNN index executes anisotropic vector quantization, retrieving top-5 nearest-neighbor vent structures in 9.4ms.',
      '4. Matched historical formation metadata is joined with live telemetry features retrieved via the y=500 corridor.',
      '5. Statistical models in Vertex AI correlate live sonar acoustic returns with past volcanic eruption signatures.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'ScaNN Index Shard Unavailability during Zone Maintenance',
        detectionMechanism: 'gRPC status code UNAVAILABLE returned on vector query.',
        automatedRemediation: 'Vector client automatically retries across redundant replica shards in secondary zone; fallback to cached historical centroids in Redis.',
        failoverLatency: '80 milliseconds'
      }
    ],
    securityAndGovernance: [
      { control: 'Vector Embedding Integrity', standard: 'ISO 27001', implementation: 'Vector embeddings are signed with Cloud KMS HMAC keys to prevent spoofed sonar injection.' }
    ]
  },
  {
    version: 'v4.0',
    filename: '04_v4_0_gemini_mcp_tool_gateway_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v4.0 Active Tool Reasoning: Google Gemini 3.1 Pro & Cloud Run MCP Gateway',
    milestoneName: 'Model Context Protocol (MCP) & Foundation Cognitive Reasoner',
    maturityLevel: 'Level 4: Autonomous Tool Calling & Multimodal Foundation Reasoning',
    targetSla: '99.99% Availability • <450ms End-to-End Tool Invocation',
    compliance: 'ISO 27001, Anthropic Model Context Protocol Spec 2024-11-05, Google AI Principles',
    prompt: `Transform the v3.0 predictive ML architecture into an active cognitive reasoning system. Completely remove the passive XGBoost classifier from Zone 5. Insert Google Gemini 3.1 Pro Reasoner equipped with the official 4-point gradient Gemini vector icon. Deploy a Model Context Protocol (MCP) Gateway on Cloud Run that exposes typed JSON-RPC tools: call_spanner_query(), query_vector_search(), and get_bathymetry_bounds(). Add an MCP Tool Schema Registry and an MCP Execution Interceptor for rate limiting and policy enforcement. Route tool invocation edges cleanly through the inter-zone channel at x=1165 back into Cloud Spanner and BigQuery Geospatial. The architecture must transition from passive curve-fitting to active, dynamic tool invocation.`,
    overview: `v4.0 replaces passive machine learning curve-fitting with Google Gemini 3.1 Pro as an autonomous cognitive reasoner. Through the Model Context Protocol (MCP), Gemini dynamically synthesizes sensor context, decides which operational tools to invoke, and queries Spanner and BigQuery via typed JSON-RPC interfaces.`,
    zones: [
      {
        name: 'Zone 5: Agentic Reasoning Core (Mutated)',
        description: 'Foundation model garden and serverless Model Context Protocol (MCP) gateway.',
        services: [
          { name: 'Google Gemini 3.1 Pro Reasoner', type: 'Foundation LLM', role: 'Multimodal cognitive reasoner evaluating acoustic sonar images, vehicle kinematics, and mission parameters.', specs: 'Context: 2M tokens • Modalities: Text, Audio Spectrogram, Image, Vector • Reasoning: Native Function Calling' },
          { name: 'Model Context Protocol (MCP) Gateway', type: 'Cloud Run Microservice', role: 'Serverless microservice exposing typed tools over JSON-RPC 2.0 with mutual TLS.', specs: 'Runtime: Node.js 22 / Go • Concurrency: 80 • Autoscaling: 2-30 instances' },
          { name: 'MCP Tool Schema Registry', type: 'Schema Cache', role: 'Maintains JSON-RPC tool declarations and parameter validation schemas.', specs: 'Protocol: MCP 2024-11-05 • Schema Validator: Ajv JSON Schema' },
          { name: 'MCP Execution Interceptor', type: 'Policy Guardrail', role: 'Tool latency monitoring, rate limiting, and parameter sandboxing.', specs: 'Max Execution Time: 2500ms • Rate Limit: 100 tool calls/min per vehicle' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'MCP Tool Manifest (JSON-RPC 2.0)',
        protocol: 'Model Context Protocol (MCP)',
        schemaOrCode: `{
  "tools": [
    {
      "name": "call_spanner_query",
      "description": "Executes parameterized read query on AUV vehicle state database",
      "inputSchema": {
        "type": "object",
        "properties": {
          "vehicle_id": { "type": "integer" },
          "query_type": { "type": "string", "enum": ["BATTERY_PROJECTION", "KINEMATIC_LIMITS", "FAULT_HISTORY"] }
        },
        "required": ["vehicle_id", "query_type"]
      }
    },
    {
      "name": "get_bathymetry_bounds",
      "description": "Retrieves 4D bounding box for underwater terrain obstacles and thermal plumes",
      "inputSchema": {
        "type": "object",
        "properties": {
          "min_depth": { "type": "number" },
          "max_depth": { "type": "number" },
          "geohash": { "type": "string" }
        },
        "required": ["min_depth", "max_depth", "geohash"]
      }
    }
  ]
}`
      }
    ],
    sequenceFlow: [
      '1. Live telemetry and acoustic anomaly markers are formatted into a multimodal prompt for Gemini 3.1 Pro.',
      '2. Gemini identifies potential hydrothermal vent contact and emits structured tool-call request: call_spanner_query and get_bathymetry_bounds.',
      '3. Cloud Run MCP Gateway receives JSON-RPC request and validates schema parameters via MCP Tool Schema Registry.',
      '4. MCP Gateway routes query across channel x=1165 to Spanner (state) and BigQuery (bathymetry).',
      '5. Results are returned to Gemini, which synthesizes actionable subsea navigation advice in plain language and structured JSON.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'MCP Tool Gateway Latency Timeout (>2.5s)',
        detectionMechanism: 'Execution interceptor circuit breaker triggers.',
        automatedRemediation: 'Gateway falls back to cached vehicle trajectory heuristic; notifies Gemini with structured error frame for fallback reasoning.',
        failoverLatency: '250 milliseconds'
      }
    ],
    securityAndGovernance: [
      { control: 'MCP Parameter Sandboxing', standard: 'OWASP LLM07 (Insecure Plugin Design)', implementation: 'MCP gateway enforces parameterized SQL only; raw DDL/DML string execution is strictly blocked.' }
    ]
  },
  {
    version: 'v5.0',
    filename: '05_v5_0_autonomous_mission_planner_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v5.0 Cyclic Agency: LangGraph ReAct Planner on GKE Autopilot & State Checkpointer',
    milestoneName: 'Autonomous ReAct Agent & Cyclic Mission Planning',
    maturityLevel: 'Level 5: Closed Cyclic Agency & Working Memory State Persistence',
    targetSla: '99.99% Availability • Autonomous Mission Recovery <1.5s',
    compliance: 'ISO 27001, IEEE 7000-2021 Autonomous Systems Ethics, IMO Level 2',
    prompt: `Evolve the single-turn MCP architecture in v4.0 into a continuous cyclic autonomous mission planner. Deploy an Autonomous Mission Planner Agent orchestrated with LangGraph on GKE Autopilot. Implement an explicit cyclic ReAct state-machine loop: Thought → Action → Observation. Integrate LangGraph State Checkpointer on Cloud Spanner for episodic working memory and rollback state persistence. Add an Agent Trajectory Evaluator to continuously score mission progress against hazard proximity and battery SLA budgets. Ensure cyclic execution handles dynamic waypoint replanning around subsea volcanic plumes without requiring human intervention.`,
    overview: `v5.0 transitions the system from single-turn tool invocation to continuous multi-turn cyclic agency. Running LangGraph on GKE Autopilot, the Autonomous Mission Planner Agent executes iterative Thought-Action-Observation loops, maintaining persistent episodic memory in Cloud Spanner to backtrack out of dead-end oceanic trenches.`,
    zones: [
      {
        name: 'Zone 5: Cyclic Agentic Reasoning (Mutated)',
        description: 'LangGraph autonomous agent running on GKE Autopilot with state checkpointing.',
        services: [
          { name: 'Autonomous Mission Planner Agent', type: 'GKE Autopilot Container', role: 'Orchestrates multi-step mission workflows using LangGraph ReAct loops.', specs: 'Pod Spec: 4 vCPU, 16 GB RAM • Framework: LangGraph Python • Scaling: 1 pod per active fleet sector' },
          { name: 'Gemini 3.1 Pro Core Reasoner', type: 'Cognitive LLM Backend', role: 'Provides underlying reasoning tokens for planning iterations.', specs: 'Model: gemini-3.1-pro • Temperature: 0.1 (Deterministic Planning)' },
          { name: 'LangGraph State Checkpointer', type: 'State Machine Persistence', role: 'Persists execution graph state after every step to Cloud Spanner for instant recovery.', specs: 'Backend: Spanner Checkpointer • Compression: zstd • Checkpoint Interval: Every step' },
          { name: 'Agent Trajectory Evaluator', type: 'Evaluation Service', role: 'Continuously monitors agent plan quality, battery budgets, and hazard clearances.', specs: 'Eval Metric: Goal Completion Rate (GCR) • Safety Margin Threshold: >= 50m' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'LangGraph Mission State Machine Definition',
        protocol: 'LangGraph State Graph',
        schemaOrCode: `from typing import TypedDict, List
from langgraph.graph import StateGraph, END

class SubseaMissionState(TypedDict):
    vehicle_id: int
    current_depth_m: float
    battery_kwh_remaining: float
    active_thermal_plumes: List[dict]
    planned_waypoints: List[tuple]
    trajectory_approved: bool
    evaluation_score: float

workflow = StateGraph(SubseaMissionState)
workflow.add_node("evaluate_sensor_context", node_evaluate_sensors)
workflow.add_node("plan_hydrodynamic_course", node_plan_course)
workflow.add_node("verify_biome_safety", node_verify_safety)
workflow.add_node("dispatch_acoustic_waypoints", node_dispatch)

workflow.set_entry_point("evaluate_sensor_context")
workflow.add_edge("evaluate_sensor_context", "plan_hydrodynamic_course")
workflow.add_edge("plan_hydrodynamic_course", "verify_biome_safety")
workflow.add_conditional_edges(
    "verify_biome_safety",
    lambda state: "dispatch" if state["trajectory_approved"] else "plan_course",
    {"dispatch": "dispatch_acoustic_waypoints", "plan_course": "plan_hydrodynamic_course"}
)`
      }
    ],
    sequenceFlow: [
      '1. Telemetry ingest triggers LangGraph agent step on GKE Autopilot.',
      '2. Agent executes Thought phase: evaluates battery reserve, ocean current velocity, and vent heat flux.',
      '3. Action phase: Agent queries Spanner for bathymetric contours and computes 3D collision-free spline waypoints.',
      '4. Observation phase: Checkpointer saves state to Spanner; Trajectory Evaluator verifies plan against safety criteria.',
      '5. If approved, waypoints advance to dispatch; if unsafe, agent cycles back to replan with revised constraints.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'GKE Autopilot Pod Eviction During Mission Planning',
        detectionMechanism: 'Kubernetes node preemption event received.',
        automatedRemediation: 'LangGraph Checkpointer instantly restores state on newly scheduled pod from Cloud Spanner in <1.2s.',
        failoverLatency: '1.2 seconds'
      }
    ],
    securityAndGovernance: [
      { control: 'Agent Step Bounding', standard: 'IEEE 7000', implementation: 'Max iterations capped at 15 steps per ReAct cycle to prevent infinite reasoning loops.' }
    ]
  },
  {
    version: 'v6.0',
    filename: '06_v6_0_multi_agent_crew_a2a_mesh_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v6.0 Decentralized Crew: 4-Agent Specialized Matrix & Pub/Sub A2A Arbitration Bus',
    milestoneName: 'Multi-Agent Specialized Crew & Agent-to-Agent (A2A) Mesh',
    maturityLevel: 'Level 6: Multi-Agent Specialization, Peer Negotiation & Consensus Arbitration',
    targetSla: '99.999% Availability • Consensus Convergence <800ms',
    compliance: 'ISO 27001, Multi-Agent Collaboration Standards, IEEE 2999-2024 Swarm Protocols',
    prompt: `Decompose the monolithic agent in v5.0 into a decentralized multi-agent crew. Replace the single agent with a 4-Agent Specialized Matrix housed inside an enclave container in Zone 5: 1) Lead Expedition Director Agent (high-level objectives and SLA commitments), 2) Benthic Biome Sentinel Agent (ecological preservation and thermal plume boundaries), 3) Kinematics & Battery SRE Agent (thruster motor RPM and energy conservation), and 4) Spatial Cartographer Agent (3D bathymetric mesh reconstruction and ScaNN vector alignment). Connect these agents via an Agent-to-Agent (A2A) Event Bus on Cloud Pub/Sub using JSON-RPC 2.0 peer arbitration protocols. Add a Multi-Agent Consensus Verifier to resolve inter-agent deadlocks (e.g. SRE energy saving vs Expedition discovery speed) with Byzantine fault tolerance.`,
    overview: `v6.0 eliminates single-agent cognitive overload by establishing a multi-agent specialized crew. Distinct agents with conflicting domain priorities (e.g., exploration speed vs. battery conservation vs. ecological protection) negotiate over a dedicated A2A Pub/Sub bus to reach mathematically balanced operational consensus.`,
    zones: [
      {
        name: 'Zone 5: Multi-Agent Reasoning Mesh (Mutated)',
        description: 'Enclave containing 4 specialized agent pods and inter-agent arbitration bus.',
        services: [
          { name: '1. Expedition Director Agent', type: 'GKE Agent Pod', role: 'Maintains mission goals, scientific milestones, and customer SLA timelines.', specs: 'Persona: Strategic & Goal-Driven • Model: Gemini 3.1 Pro' },
          { name: '2. Benthic Biome Sentinel Agent', type: 'GKE Agent Pod', role: 'Enforces environmental guardrails, biological chimney safety buffers, and non-invasive scanning.', specs: 'Persona: Ultra-Conservative & Safe • Rule: Zero contact <350°C' },
          { name: '3. Kinematics & Battery SRE Agent', type: 'GKE Agent Pod', role: 'Monitors battery discharge curves, motor cavitation, and emergency buoyancy reserves.', specs: 'Persona: Mechanical & Energy-Frugal • Rule: Reserve >= 20%' },
          { name: '4. Spatial Cartographer Agent', type: 'GKE Agent Pod', role: 'Aligns multibeam acoustic point clouds with ScaNN vector embeddings and Spanner bathymetry.', specs: 'Persona: Spatial & Analytical • Resolution: 0.1m 3D mesh' },
          { name: 'A2A Event Bus (Pub/Sub JSON-RPC)', type: 'Inter-Agent Bus', role: 'High-speed event broker for agent contracts, counter-proposals, and consensus voting.', specs: 'Protocol: JSON-RPC 2.0 • Latency: p99 < 15ms • Topics: a2a-proposals, a2a-consensus' },
          { name: 'Multi-Agent Consensus Verifier', type: 'Arbitration Engine', role: 'Resolves agent deadlock using weighted multi-criteria decision analysis (MCDA).', specs: 'Weights: Safety 0.45, Energy 0.30, Mission Speed 0.25' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'A2A Negotiation Frame Schema',
        protocol: 'A2A Protocol over Pub/Sub',
        schemaOrCode: `{
  "jsonrpc": "2.0",
  "method": "propose_trajectory_contract",
  "params": {
    "proposal_id": "prop-8192-auv12",
    "proposer": "ExpeditionDirectorAgent",
    "proposed_waypoints": [[-12.819, 45.192, -3850], [-12.825, 45.198, -3890]],
    "estimated_scientific_yield": 0.88,
    "votes": {
      "BenthicBiomeSentinel": { "approved": true, "conditions": ["speed_max_2kts"] },
      "KinematicsSreAgent": { "approved": false, "reason": "battery_depletion_exceeds_budget" }
    }
  },
  "id": "msg-99120"
}`
      }
    ],
    sequenceFlow: [
      '1. Expedition Director Agent initiates Step 1: Proposes new vent exploration trajectory contract.',
      '2. Step 2: Benthic Biome Sentinel evaluates ecological boundaries (<350°C plumes) and attaches speed constraints.',
      '3. Step 3: Kinematics & Battery SRE checks thruster RPM and power budget, negotiating waypoint spacing.',
      '4. Step 4: Spatial Cartographer computes spatial consensus and aligns trajectory with ScaNN geological embeddings.',
      '5. Step 5: A2A Event Bus aggregates votes; Consensus Verifier certifies Byzantine consensus in <650ms.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'Agent Deadlock (SRE rejects course due to battery; Director demands compliance)',
        detectionMechanism: 'Consensus bus timer exceeds 3 rounds (>600ms).',
        automatedRemediation: 'Consensus Verifier invokes automated MCDA arbitration, enforcing safety/energy priority to select balanced alternative path.',
        failoverLatency: '600 milliseconds'
      }
    ],
    securityAndGovernance: [
      { control: 'A2A Cryptographic Nonces', standard: 'ISO 27001', implementation: 'Every A2A message includes an Ed25519 cryptographic signature preventing agent impersonation.' }
    ]
  },
  {
    version: 'v7.0',
    filename: '07_v7_0_hitl_safety_sandbox_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v7.0 Isolated Execution: gVisor Physics Sandbox & Maritime Admiral Decision Gate',
    milestoneName: 'Pre-Execution Code Sandboxing & Human-in-the-Loop (HITL) Gate',
    maturityLevel: 'Level 7: Pre-Flight Physics Simulation & Cryptographic Human Approval Gate',
    targetSla: '99.999% Safety Containment • HITL Escalation <30s',
    compliance: 'IMO Full Autonomous Vessel Level 3, UNCLOS Environmental Protection, ISO 27001',
    prompt: `Augment the v6.0 multi-agent architecture with a safety-first isolated sandbox and a Human-In-The-Loop (HITL) gate. In Zone 6, insert a gVisor Ephemeral Code Sandbox on Cloud Run to pre-simulate 3D hydrodynamic thruster commands before transmitting them to the subsea vehicles. Add a Maritime Admiral HITL Approval Gate represented as a decision rhombus with two conditional branches: if trajectory is safe (>=50m from thermal vents), approve automatically and route via the outer corridor at x=1790 to Acoustic Actuator Dispatcher; if hazardous (<50m proximity alert), halt actuation and escalate via secure satellite webhook to Research Vessel Bridge Console for manual Admiral cryptographic sign-off. Ensure edge routing never collides with adjacent card borders.`,
    overview: `v7.0 enforces pre-flight verification before physical actuation. Candidate thruster commands are executed inside an isolated gVisor Linux sandbox simulating 3D fluid mechanics; high-risk paths near volatile hydrothermal vents require cryptographic Admiral human approval, preventing autonomous collisions.`,
    zones: [
      {
        name: 'Zone 6: HITL Safety & Actuation (Mutated)',
        description: 'Isolated physics sandbox, conditional approval gate, and research ship console.',
        services: [
          { name: 'gVisor Ephemeral Code Sandbox', type: 'Cloud Run Sandbox', role: 'Executes candidate thruster trajectories in isolated user-space kernel container simulating 3D ocean hydrodynamics.', specs: 'Sandbox: gVisor (runsc) • Memory: 4 GB • Simulation Duration: 150ms per trajectory' },
          { name: 'HITL Approval Gate', type: 'Decision Rhombus', role: 'Evaluates simulated proximity to sensitive biomes and triggers automated or human approval.', specs: 'Rule: >= 50m Auto-Approved | < 50m Maritime Admiral Escalation' },
          { name: 'Research Vessel Bridge Console', type: 'Maritime Tactical Screen', role: 'High-priority command console aboard the research vessel for Admiral manual review and sign-off.', specs: 'Uplink: Low-Latency Starlink • Security: FIDO2 Hardware Key Sign-Off' },
          { name: 'Acoustic Actuator Dispatcher', type: 'Cloud Run Service', role: 'Packages verified, signed thruster command packets for acoustic downlink.', specs: 'Packet Format: AES-256-GCM Encrypted Command Blocks' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'HITL Approval Webhook Payload',
        protocol: 'HTTPS Webhook over Satellite',
        schemaOrCode: `{
  "alert_id": "hitl-alert-4401",
  "vehicle_id": 12,
  "hazard_type": "PROXIMITY_VENT_CHIMNEY",
  "closest_point_of_approach_m": 38.4,
  "simulated_trajectory_svg": "data:image/svg+xml,...",
  "recommended_override_waypoint": [-12.821, 45.195, -3845],
  "requires_role": "MARITIME_ADMIRAL",
  "timeout_seconds": 60
}`
      }
    ],
    sequenceFlow: [
      '1. Multi-Agent Crew emits candidate 3D mission trajectory.',
      '2. Candidate trajectory enters gVisor Ephemeral Code Sandbox on Cloud Run; 3D physics simulator checks buoyancy and drift.',
      '3. Simulation output arrives at HITL Approval Gate.',
      '4. Branch A (Safe >=50m): Path bypasses manual review via corridor x=1790 to Acoustic Actuator Dispatcher.',
      '5. Branch B (Hazard <50m): Actuation halts; satellite webhook alerts Research Vessel Bridge Console.',
      '6. Maritime Admiral inspects 3D trajectory and signs off with FIDO2 key, releasing approved command to downlinker.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'Satellite Blackout during Admiral Sign-Off Escalation',
        detectionMechanism: 'Webhook acknowledgement timeout >60s.',
        automatedRemediation: 'HITL Gate defaults to absolute fail-safe: aborts approach and commands AUV to ascend 200m into open water column.',
        failoverLatency: '60 seconds'
      }
    ],
    securityAndGovernance: [
      { control: 'Cryptographic Dual-Key Sign-Off', standard: 'IMO Level 3 Autonomous Vessel', implementation: 'Safety overrides require dual cryptographic signatures from Mission Director and Maritime Admiral.' }
    ]
  },
  {
    version: 'v8.0',
    filename: '08_v8_0_subsea_edge_slm_swarm_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v8.0 Edge Intelligence: Google Edge TPU Quantized Gemma 2B & Acoustic Swarm Mesh',
    milestoneName: 'Subsea Edge SLMs & Decentralized Acoustic Swarm Mesh',
    maturityLevel: 'Level 8: Fully Disconnected Subsea Edge Intelligence & Swarm Autonomy',
    targetSla: '99.999% Swarm Survivability • Disconnected Autonomy 72h',
    compliance: 'ISO 27001 Edge Security, IMO Level 3 Autonomous Marine Swarm, Seabed 2030',
    prompt: `Transform the ingress layer in Zone 1 from passive sensors into an autonomous edge computing swarm. Equip all 50 AUV submersibles with on-board Google Edge TPUs running quantized Gemma 2B Small Language Models (SLMs). Replace passive acoustic modems with a peer-to-peer 12kHz Subsea Acoustic Swarm Mesh enabling underwater autonomous formation control and collision avoidance without cloud roundtrips. Upgrade the Surface Relay Buoys with an Asymmetric Store-and-Forward Sync Gateway to reconcile edge swarm decisions with cloud state when satellite uplinks become available.`,
    overview: `v8.0 equips each submersible with on-board Google Edge TPUs running quantized Gemma 2B SLMs. When operating beneath 4,000m of water during satellite blackouts, submersibles execute localized semantic reasoning and negotiate peer-to-peer acoustic formation maneuvers over an underwater 12kHz mesh.`,
    zones: [
      {
        name: 'Zone 1: Subsea Edge SLM Swarm (Mutated)',
        description: 'On-board Edge TPU intelligence and decentralized underwater acoustic swarm mesh.',
        services: [
          { name: '50x Autonomous Subsea AUVs (Edge TPU)', type: 'Intelligent Robotics', role: 'Submersibles running on-board quantized Gemma 2B on dual Google Edge TPUs for instant obstacle reasoning.', specs: 'Model: Gemma 2B INT4 • Inference Latency: 42ms • Power Draw: <5W' },
          { name: '12kHz Subsea Acoustic Swarm Mesh', type: 'Underwater P2P Mesh', role: 'Decentralized peer-to-peer acoustic protocol for inter-vehicle collision avoidance and formation steering.', specs: 'Bandwidth: 12kHz • Mesh Protocol: Slotted Aloha / TDMA • Range: 3,000m' },
          { name: 'Autonomous Surface Relay Buoys (Sync Gateway)', type: 'Edge Cloud Gateway', role: 'Asymmetric store-and-forward sync gateway reconciling offline subsea actions with cloud state.', specs: 'Local Storage: 512 GB SSD • Protocol: Delta CRDT Sync over Starlink' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'Edge Swarm P2P Acoustic Broadcast Protocol',
        protocol: 'Acoustic Swarm P2P Packet',
        schemaOrCode: `// 16-byte ultra-compact acoustic P2P broadcast frame
struct AcousticSwarmP2PFrame {
  uint8_t  sender_auv_id;       // 1..50
  uint8_t  swarm_formation_id;  // Echelon, Diamond, Linear
  int16_t  rel_x_offset_m;      // Relative X to cluster leader
  int16_t  rel_y_offset_m;      // Relative Y to cluster leader
  int16_t  rel_z_offset_m;      // Relative Z to cluster leader
  uint8_t  gemma_intent_code;   // 0x01: HOLD, 0x02: EVADE, 0x03: DOCK
  uint8_t  battery_reserve;     // 0..100%
  uint32_t vector_hash_crc;     // Compressed visual feature hash
};`
      }
    ],
    sequenceFlow: [
      '1. Submersible optical camera detects unexpected hydrothermal fissure; satellite link is absent.',
      '2. On-board Google Edge TPU runs quantized Gemma 2B, classifying fissure as active thermal blowout.',
      '3. Gemma 2B generates emergency evasion vector in 42ms and broadcasts P2P frame across 12kHz acoustic mesh.',
      '4. Surrounding AUVs receive frame, synchronize formations, and execute synchronized lateral evasions.',
      '5. Surface buoy captures acoustic log; upon satellite reconnection, Asymmetric Sync Gateway reconciles CRDT state with Cloud Spanner.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'Severe Acoustic Channel Multipath Reflections from Steep Trench Walls',
        detectionMechanism: 'Packet error rate exceeds 35% on acoustic modem.',
        automatedRemediation: 'Gemma 2B switches acoustic mesh to adaptive frequency hopping (9kHz - 14kHz) and increases packet redundancy.',
        failoverLatency: '200 milliseconds'
      }
    ],
    securityAndGovernance: [
      { control: 'Hardware-Rooted Edge Authentication', standard: 'FIPS 140-3', implementation: 'Edge TPU firmware verified with cryptographic boot signatures to prevent firmware tampering.' }
    ]
  },
  {
    version: 'v9.0',
    filename: '09_v9_0_spanner_graph_reflection_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v9.0 Episodic Memory: Cloud Spanner Graph & Self-Reflective Telemetry Critique Loop',
    milestoneName: 'Episodic Knowledge Graph & Continuous Cognitive Reflection',
    maturityLevel: 'Level 9: Self-Reflective Learning & Long-Term Graph Memory Synthesis',
    targetSla: '99.999% Availability • Cognitive Memory Reflection <2s',
    compliance: 'ISO/IEC 42001 AI Management System, UNESCO Ocean Decade Registry',
    prompt: `Enhance the cloud storage and reasoning layers with episodic memory and continuous self-critique. In Zone 4, upgrade Cloud Spanner with Google Cloud Spanner Graph to store interconnected oceanographic discoveries, hydrothermal chimney ontologies, and dive histories across 500+ missions using ISO GQL. In Zone 5, deploy a Reflection & Self-Critique Agent that analyzes post-dive telemetry deltas, extracts near-miss patterns, and tunes agent prompt policies stored in an Autonomous Policy Store. Connect Spanner to the Reflection Agent and Spanner Graph via the open channel at x=1165, ensuring all label pills maintain clear margins from card boundaries.`,
    overview: `v9.0 introduces lifelong episodic memory and self-critique. Using Google Cloud Spanner Graph, the platform links geological discoveries across 500+ dives into a unified ISO GQL property graph; an automated Reflection Agent critiques past near-misses and tunes agent navigation heuristics for future expeditions.`,
    zones: [
      {
        name: 'Zone 4: Storage & Graph Memory (Mutated)',
        description: 'Cloud Spanner Graph knowledge base with episodic mission memory.',
        services: [
          { name: 'Google Cloud Spanner Graph', type: 'Property Graph Database', role: 'Stores geological ontologies, vent relationships, and dive lineages queryable via ISO GQL.', specs: 'Graph Nodes: 5M+ • Edges: 18M+ • Query Language: ISO/IEC 39075 GQL' }
        ]
      },
      {
        name: 'Zone 5: Cognitive Reflection Engine (Mutated)',
        description: 'Reflection agent and autonomous prompt policy repository.',
        services: [
          { name: 'Reflection & Self-Critique Agent', type: 'Evaluation Agent', role: 'Conducts automated post-mission retrospectives, extracting navigational anomalies and near-misses.', specs: 'Trigger: End of Dive Mission • Output: Prompt Weight Deltas' },
          { name: 'Autonomous Policy Store', type: 'Policy Database', role: 'Stores tuned heuristic weights, guardrail thresholds, and prompt templates for fleet-wide synchronization.', specs: 'Format: Versioned JSON Policies in Cloud Storage' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'Spanner Graph Property Schema (ISO GQL)',
        protocol: 'Google Cloud Spanner Graph DDL',
        schemaOrCode: `CREATE PROPERTY GRAPH OceanographicEpisodicGraph
  VERTEX TABLES (
    auv_vehicles PROPERTIES (vehicle_id, model_name, commission_date),
    hydrothermal_vents PROPERTIES (vent_id, vent_name, max_temperature_c, depth_m),
    dive_missions PROPERTIES (mission_id, start_time, end_time, total_distance_km)
  )
  EDGE TABLES (
    dive_traversed_near_vent
      SOURCE KEY (mission_id) REFERENCES dive_missions (mission_id)
      DESTINATION KEY (vent_id) REFERENCES hydrothermal_vents (vent_id)
      PROPERTIES (closest_approach_m, plume_encountered_bool),
    auv_executed_mission
      SOURCE KEY (vehicle_id) REFERENCES auv_vehicles (vehicle_id)
      DESTINATION KEY (mission_id) REFERENCES dive_missions (mission_id)
  );`
      }
    ],
    sequenceFlow: [
      '1. Submersible completes dive; complete telemetry delta is committed to Cloud Spanner.',
      '2. Post-dive telemetry triggers Reflection & Self-Critique Agent via channel x=1165.',
      '3. Reflection Agent queries Spanner Graph via GQL, finding past dives that encountered similar volcanic plumes.',
      '4. Agent extracts near-miss insights and formulates updated heuristic weights for the Benthic Biome Sentinel.',
      '5. Updated policies are committed to Autonomous Policy Store and synchronized to subsea vehicles prior to next dive.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'Spanner Graph GQL Query Timeout on High-Depth Recursive Traversal',
        detectionMechanism: 'Query execution exceeds 2000ms threshold.',
        automatedRemediation: 'Reflection Agent automatically restricts traversal depth to 2 hops and falls back to pre-indexed topological clusters.',
        failoverLatency: '200 milliseconds'
      }
    ],
    securityAndGovernance: [
      { control: 'AI Reflection Traceability', standard: 'ISO/IEC 42001 (AI Management)', implementation: 'All prompt policy updates are signed and stored with full before/after diffs in Cloud Logging.' }
    ]
  },
  {
    version: 'v10.0',
    filename: '10_v10_0_closed_loop_self_healing_mesh_spec',
    title: 'Autonomous Deep-Sea Robotic Fleet & Oceanographic Sentinel',
    subtitle: 'v10.0 Closed-Loop Agentic Mesh: Seafloor Inductive Recharging & Self-Healing Orchestration',
    milestoneName: '100% Closed-Loop Cyber-Physical Agentic Operating System',
    maturityLevel: 'Level 10: Fully Autonomous Closed-Loop Self-Healing Cyber-Physical Mesh',
    targetSla: '99.999% Autonomous Continuity • 100% Closed-Loop Actuation',
    compliance: 'IMO Full Autonomous Vessel Level 4, UNEP Global Benthic Treaty, ISO 27001',
    prompt: `Finalize the architectural transformation into a fully closed-loop agentic cyber-physical operating system. In Zone 1, add Seafloor Inductive Recharging Grid stations at 4,000m with automated AUV docking scheduling. In Zone 6, insert an Automated Self-Healing Orchestrator on GKE Autopilot to handle dynamic pod self-repair and acoustic channel compensation. Construct a complete, uninterrupted closed feedback loop: route a dashed green highway (strokeWidth=2.5) from Acoustic Actuator Dispatcher and Self-Healing Orchestrator via the right margin at x=1790, across the bottom corridor at y=880 (strictly outside all zone containers), terminating at the Seafloor Inductive Recharging Grid. Add an edge from the Recharging Grid via the left margin at x=25 back into the AUV Swarm vehicles. The entire lifecycle—from sensor intake to edge SLM, cloud reasoning, sandbox evaluation, acoustic actuation, docking, and re-deployment—is 100% closed with zero human intervention required.`,
    overview: `v10.0 completes the transformation into a fully autonomous closed-loop cyber-physical operating system. Submersibles explore, reason, avoid hazards, execute missions, dock at seafloor inductive recharging cradles, recharge contactless, and re-deploy indefinitely without surface ship intervention. The system continuously self-heals compute pods and re-routes acoustic networks autonomously.`,
    zones: [
      {
        name: 'Zone 1: Closed-Loop Subsea Swarm (Final)',
        description: 'Includes seafloor inductive recharging stations completing the energy loop.',
        services: [
          { name: '50x Autonomous Subsea AUVs', type: 'Robotic Swarm', role: 'Edge TPU powered submersibles carrying out perpetual survey missions.', specs: 'Continuous Autonomous Deployment' },
          { name: 'Seafloor Inductive Recharging Grid', type: 'Power Infrastructure', role: 'Deep-sea contactless electromagnetic induction charging cradles at 4,000m depth.', specs: 'Power: 15 kW Inductive Coupling • Stations: 8 Grid Hubs • Efficiency: 91%' }
        ]
      },
      {
        name: 'Zone 6: Closed-Loop Actuation & Self-Healing (Final)',
        description: 'Actuator dispatcher and automated Kubernetes/acoustic self-healing orchestrator.',
        services: [
          { name: 'Acoustic Actuator Dispatcher', type: 'Downlink Dispatcher', role: 'Downlinks verified thruster commands and dock reservation tokens via satellite to buoys.', specs: 'Encryption: AES-256-GCM • Downlink Latency: <1.8s' },
          { name: 'Automated Self-Healing Orchestrator', type: 'GKE Autopilot Controller', role: 'Monitors GKE agent pods, heals degraded microservices, and commands acoustic channel frequency hopping.', specs: 'Self-Healing SLA: <15s pod recovery • Acoustic Reroute: <500ms' },
          { name: 'Subsea Mission Blackbox', type: 'Compliance Vault', role: 'Cryptographic WORM flight recorder for UNCLOS legal liability archive.', specs: 'Storage: Immutable Object Lock • Retention: 20 Years' }
        ]
      }
    ],
    schemasAndProtocols: [
      {
        name: 'Inductive Docking & Energy Protocol',
        protocol: 'Acoustic Docking Beacon & Induction Protocol',
        schemaOrCode: `struct InductiveDockingCommand {
  uint16_t target_dock_id;         // 1..8
  uint16_t vehicle_id;             // 1..50
  uint32_t scheduled_arrival_utc;  // Epoch
  uint8_t  charge_target_kwh;      // Desired battery target
  uint8_t  docking_approach_slot;  // Vector corridor 1..4
  uint32_t cryptographic_auth_key; // Fleet authorization token
};`
      }
    ],
    sequenceFlow: [
      '1. Subsea AUVs monitor seabed, identify hydrothermal features, and reason with on-board Gemma 2B Edge SLMs.',
      '2. Telemetry and vector embeddings stream through satellite and VPC perimeter into Multi-Agent Crew reasoning mesh.',
      '3. Specialized agents negotiate trajectory contracts; gVisor sandbox pre-simulates hydrodynamic safety in 3D.',
      '4. Acoustic Actuator Dispatcher and Self-Healing Orchestrator verify command packets and monitor GKE health.',
      '5. Actuation highway routes commands via bottom corridor y=880 (outside container boxes) to Seafloor Inductive Recharging Grid.',
      '6. Seafloor charger re-seeds vehicle power via left margin x=25, re-launching submersibles for perpetual autonomous operation.'
    ],
    failureModesAndHealing: [
      {
        failureScenario: 'GKE Multi-Agent Pod Node Failure during Active Mission Actuation',
        detectionMechanism: 'Kubernetes node heartbeat failure (<5s).',
        automatedRemediation: 'Self-Healing Orchestrator immediately redeploys agent pod from Spanner checkpoint in <8s; acoustic actuator buffers last verified safe trajectory.',
        failoverLatency: '8 seconds'
      },
      {
        failureScenario: 'Physical Silt Accumulation on Seafloor Inductive Docking Cradle',
        detectionMechanism: 'Inductive coupling efficiency drops below 70%.',
        automatedRemediation: 'Docking station activates high-pressure acoustic purge pulse; re-routes approaching AUV to alternate docking cradle #3.',
        failoverLatency: '12 seconds'
      }
    ],
    securityAndGovernance: [
      { control: 'Full Cyber-Physical Authorization', standard: 'IMO Full Autonomous Vessel Level 4', implementation: 'All thruster downlinks and docking allocations require zero-trust cryptographic token verification.' },
      { control: 'UNCLOS Abyssal Habitat Compliance', standard: 'UNEP Global Benthic Treaty', implementation: 'Autonomous Biome Sentinel guarantees zero physical equipment abandoned on seafloor.' }
    ]
  }
];

function generateMarkdownSpec(spec: SpecDefinition): string {
  return `# 🏛️ System Architecture Specification: ${spec.title}
## ${spec.subtitle}

---

### Blueprint Metadata & Operational Baseline
- **Milestone Name**: ${spec.milestoneName}
- **Architectural Version**: \`${spec.version}\`
- **System Maturity Level**: ${spec.maturityLevel}
- **Target Availability & Latency SLA**: \`${spec.targetSla}\`
- **Regulatory & Maritime Compliance Standards**: \`${spec.compliance}\`

---

### 🎯 Actionable System Transformation Prompt
The following prompt was executed against the architecture compiler to synthesize this stage from first principles:

\`\`\`text
${spec.prompt}
\`\`\`

---

### Executive Architectural Overview
${spec.overview}

---

### 🗺️ Zone & Microservice Decomposition

${spec.zones.map(z => `#### ${z.name}
*${z.description}*

| Service / Node | Runtime & Architecture Type | Primary Responsibility | Technical Specifications |
| :--- | :--- | :--- | :--- |
${z.services.map(s => `| **${s.name}** | \`${s.type}\` | ${s.role} | ${s.specs} |`).join('\n')}
`).join('\n')}

---

### 🔌 Ingress Protocols, Interface Schemas & Tool Definitions

${spec.schemasAndProtocols.map(sp => `#### ${sp.name} (\`${sp.protocol}\`)
\`\`\`${sp.name.toLowerCase().includes('json') ? 'json' : sp.name.toLowerCase().includes('sql') ? 'sql' : 'typescript'}
${sp.schemaOrCode}
\`\`\`
`).join('\n')}

---

### 🔄 End-to-End Operational Sequence Flow

${spec.sequenceFlow.map((step, idx) => `**Step ${idx + 1}**: ${step}`).join('\n\n')}

---

### 🛡️ Failure Modes, Resiliency & Automated Self-Healing

| Failure Scenario | Automated Detection Mechanism | Closed-Loop Remediation | Failover SLA |
| :--- | :--- | :--- | :---: |
${spec.failureModesAndHealing.map(f => `| **${f.failureScenario}** | ${f.detectionMechanism} | ${f.automatedRemediation} | \`${f.failoverLatency}\` |`).join('\n')}

---

### 🔒 Security, Zero-Trust Perimeter & Regulatory Governance

| Security Control | Standard / Benchmark | Technical Implementation |
| :--- | :--- | :--- |
${spec.securityAndGovernance.map(sg => `| **${sg.control}** | \`${sg.standard}\` | ${sg.implementation} |`).join('\n')}

---

### 📸 Architectural Rendering Artifacts
- **High-Resolution Architecture Diagram**: [\`${spec.filename.replace('_spec', '')}.png\`](file:///Users/nitinagga/Documents/PromptCanvas/scratch/screenshots_agentic_evolution/${spec.filename.replace('_spec', '')}.png)
- **Draw.io Master XML Blueprint**: [\`${spec.filename.replace('_spec', '')}.drawio.xml\`](file:///Users/nitinagga/Documents/PromptCanvas/scratch/screenshots_agentic_evolution/${spec.filename.replace('_spec', '')}.drawio.xml)
`;
}

function main() {
  const scratchDocsDir = path.join(process.cwd(), 'scratch', 'docs');
  const brainDocsDir = '/Users/nitinagga/.gemini/jetski/brain/8d379ad2-8382-4c17-976c-6502e40a06cb/docs';

  if (!fs.existsSync(scratchDocsDir)) fs.mkdirSync(scratchDocsDir, { recursive: true });
  if (!fs.existsSync(brainDocsDir)) fs.mkdirSync(brainDocsDir, { recursive: true });

  console.log('📝 Generating 10 Comprehensive Living Architecture Specifications...\n');

  SPECS.forEach((spec, i) => {
    const md = generateMarkdownSpec(spec);
    const scratchPath = path.join(scratchDocsDir, `${spec.filename}.md`);
    const brainPath = path.join(brainDocsDir, `${spec.filename}.md`);

    fs.writeFileSync(scratchPath, md, 'utf-8');
    fs.writeFileSync(brainPath, md, 'utf-8');

    console.log(`✅ [${i + 1}/10] Created ${spec.version} Living Specification: ${spec.filename}.md`);
  });

  console.log('\n🎉 All 10 Living Architecture Specifications generated successfully!');
}

main();
