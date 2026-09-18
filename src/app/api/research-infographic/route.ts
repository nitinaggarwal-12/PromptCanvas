import { NextResponse } from 'next/server';
import { researchAndCompileDomainInfographic } from '@/lib/research/deepDomainResearcher';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required for 6-Dimension Domain Research.' },
                { status: 400 }
            );
        }

        const result = await researchAndCompileDomainInfographic(prompt);

        return NextResponse.json({
            xml: result.xml,
            spec: result.spec,
            dossier: result.dossier,
            researchBriefMarkdown: result.researchBriefMarkdown,
            modelUsed: result.modelUsed,
            isLiveResearched: result.isLiveResearched,
        });
    } catch (error: any) {
        console.error('[api/research-infographic] Error:', error);
        return NextResponse.json(
            {
                error: error?.message || 'Failed to execute 6-Dimension Domain Research.',
            },
            { status: 500 }
        );
    }
}
