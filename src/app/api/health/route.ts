import { NextResponse } from 'next/server';
import { checkDatabaseHealth, isPostgres, purgeExpiredGuestSessionsAndDiagrams } from '@/lib/db';
import { GEMINI_MODEL_ID, GEMINI_PRO_MODEL_ID, GEMINI_FLASH_MODEL_ID } from '@/lib/geminiConfig';

export const dynamic = 'force-dynamic';

let lastAutoMaintenance = 0;
const MAINTENANCE_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: Request) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  const triggerMaintenance = searchParams.get('maintenance') === 'true';

  let maintenanceStats = null;
  const now = Date.now();
  if (triggerMaintenance || (now - lastAutoMaintenance > MAINTENANCE_INTERVAL_MS)) {
    lastAutoMaintenance = now;
    maintenanceStats = await purgeExpiredGuestSessionsAndDiagrams();
  }

  const dbHealth = await checkDatabaseHealth();
  const dbMode = isPostgres() ? 'postgres' : 'sqlite';
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');

  const memoryUsage = process.memoryUsage();
  const memoryMb = {
    rss: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
    heapTotal: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
    heapUsed: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100
  };

  const isHealthy = dbHealth.ok;
  const status = isHealthy ? 'healthy' : 'unhealthy';
  const statusCode = isHealthy ? 200 : 503;

  return NextResponse.json(
    {
      status,
      service: 'PromptCanvas Enterprise AI',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      responseTimeMs: Date.now() - startTime,
      dbMode,
      layoutEngineV2: process.env.LAYOUT_ENGINE_V2 || 'true',
      database: {
        ...dbHealth,
        mode: dbMode,
      },
      maintenance: maintenanceStats || { status: 'idle', lastRun: new Date(lastAutoMaintenance).toISOString() },
      aiEngine: {
        configured: hasGeminiKey,
        defaultModel: GEMINI_MODEL_ID,
        proModel: GEMINI_PRO_MODEL_ID,
        flashModel: GEMINI_FLASH_MODEL_ID,
        byokSupported: true
      },
      system: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        memoryMb
      }
    },
    {
      status: statusCode,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Content-Type': 'application/json'
      }
    }
  );
}
