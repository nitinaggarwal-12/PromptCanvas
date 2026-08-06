import { NextResponse } from 'next/server';
import { executeArchitectureSimulation, SimulationType } from '@/lib/architectureSimulationEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { xml, type } = body;

    if (!xml || typeof xml !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: "xml" is required' },
        { status: 400 }
      );
    }

    const simResult = executeArchitectureSimulation(xml, (type as SimulationType) || 'TRAFFIC_SURGE');

    return NextResponse.json(simResult);
  } catch (error: any) {
    console.error('[Architecture Simulation Error]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to execute architecture simulation' },
      { status: 500 }
    );
  }
}
