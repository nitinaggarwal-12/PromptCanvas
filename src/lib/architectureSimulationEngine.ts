export type SimulationType = 'TRAFFIC_SURGE' | 'DISASTER_RECOVERY_FAILOVER' | 'SECURITY_ZERO_TRUST_AUDIT';

export interface SimulationResult {
  simulatedXml: string;
  simulationType: SimulationType;
  metrics: {
    peakRequestsPerSec: number;
    p99LatencyMs: number;
    activeFailoverNode?: string;
    systemHealthScore: number;
    alertsTriggered: string[];
  };
  stepLog: Array<{ step: number; title: string; detail: string; status: 'OK' | 'WARN' | 'FAILOVER' }>;
}

export function executeArchitectureSimulation(
  xml: string,
  type: SimulationType = 'TRAFFIC_SURGE'
): SimulationResult {
  let simulatedXml = xml;

  if (type === 'TRAFFIC_SURGE') {
    // Inject dynamic high-throughput traffic throughput onto edges
    simulatedXml = simulatedXml
      .replace(
        /main_title_bar_uv" value="([^"]+)"/g,
        (match, innerValue) => {
          const updated = innerValue.replace(
            /🟢 Production Approved/g,
            '⚡ Genie 3 Live Simulation: 125,000 req/s Load'
          );
          return `main_title_bar_uv" value="${updated}"`;
        }
      )
      // Highlight edge values with real-time throughput metrics
      .replace(/value="Incoming traffic"/g, 'value="⚡ 125,000 req/sec (Peak Load)"')
      .replace(/value="HTTPS Traffic"/g, 'value="⚡ 125,000 req/sec (WAF Protected)"')
      .replace(/value="API Requests"/g, 'value="⚡ 84,200 req/sec | p99: 12ms"')
      .replace(/value="Queries &amp; Writes"/g, 'value="⚡ Read-Replica Auto-Scaled (3x Nodes)"');

    return {
      simulatedXml,
      simulationType: 'TRAFFIC_SURGE',
      metrics: {
        peakRequestsPerSec: 125000,
        p99LatencyMs: 14.2,
        systemHealthScore: 99.4,
        alertsTriggered: [
          'Read-Replica Auto-Scaler triggered at 80% CPU threshold',
          'Cloud Armor WAF mitigated 4,200 malicious volumetric probes/sec'
        ]
      },
      stepLog: [
        { step: 1, title: 'Volumetric Load Injection', detail: 'Simulated 125,000 req/sec ingress on Cloud Armor WAF', status: 'OK' },
        { step: 2, title: 'Horizontal Pod Auto-Scaling (HPA)', detail: 'GKE Autopilot scaled application pods from 6 -> 24 nodes in 18s', status: 'OK' },
        { step: 3, title: 'Read-Replica Query Offloading', detail: 'Cloud SQL read-replicas absorbed 78% of read queries', status: 'OK' }
      ]
    };
  } else if (type === 'DISASTER_RECOVERY_FAILOVER') {
    simulatedXml = simulatedXml
      .replace(
        /main_title_bar_uv" value="([^"]+)"/g,
        (match, innerValue) => {
          const updated = innerValue.replace(
            /🟢 Production Approved/g,
            '🔴 DR Failover Active — Primary Region Down'
          );
          return `main_title_bar_uv" value="${updated}"`;
        }
      )
      .replace(/fillColor=#12385B/g, 'fillColor=#7F1D1D') // Dark Red Governance Header during DR
      .replace(/value="Primary Governed VPC Network"/g, 'value="⚠️ PRIMARY REGION OFFLINE (Disaster Declared)"')
      .replace(/value="Failover DR VPC Network"/g, 'value="🟢 STANDBY DR REGION PROMOTED TO ACTIVE"');

    return {
      simulatedXml,
      simulationType: 'DISASTER_RECOVERY_FAILOVER',
      metrics: {
        peakRequestsPerSec: 92000,
        p99LatencyMs: 28.5,
        activeFailoverNode: 'Standby DR Region (us-east4)',
        systemHealthScore: 98.1,
        alertsTriggered: [
          'Primary Cloud SQL Master disconnected — Standby promoted to Master in 4.2s',
          'Global HTTPS LB rerouted 100% of ingress traffic to DR GKE Cluster'
        ]
      },
      stepLog: [
        { step: 1, title: 'Primary Zone Failure Detected', detail: 'Health Probe heartbeat timeout on us-central1 primary cluster', status: 'FAILOVER' },
        { step: 2, title: 'Automated DNS & Load Balancer Switch', detail: 'Global Load Balancer updated backend pools to DR Region in 1.8s', status: 'OK' },
        { step: 3, title: 'Point-in-Time Database Consistency', detail: 'RPO confirmed at 0.00 seconds with zero transaction loss', status: 'OK' }
      ]
    };
  }

  return {
    simulatedXml,
    simulationType: 'SECURITY_ZERO_TRUST_AUDIT',
    metrics: {
      peakRequestsPerSec: 10000,
      p99LatencyMs: 8.1,
      systemHealthScore: 100,
      alertsTriggered: []
    },
    stepLog: []
  };
}
