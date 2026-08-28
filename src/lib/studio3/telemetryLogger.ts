export interface Studio3LogEntry {
  id: string;
  timestamp: string;
  stage: 'intent_parsing' | 'graph_synthesis' | 'layout_solving' | 'quality_gate' | 'error';
  status: 'calling' | 'success' | 'warning' | 'error';
  model?: string;
  latencyMs?: number;
  message: string;
  payload?: any;
}

export class Studio3ExecutionLogger {
  private logs: Studio3LogEntry[] = [];

  log(entry: Omit<Studio3LogEntry, 'id' | 'timestamp'>) {
    const logItem: Studio3LogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString().split('T')[1].slice(0, 12),
      ...entry
    };
    this.logs.push(logItem);
    console.log(`[Studio 3 ${entry.stage.toUpperCase()}] [${entry.status.toUpperCase()}] ${entry.message} ${entry.latencyMs ? `(${entry.latencyMs}ms)` : ''}`);
    return logItem;
  }

  getLogs(): Studio3LogEntry[] {
    return [...this.logs];
  }
}
