import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { researchAndCompileDomainInfographic } from '../src/lib/research/deepDomainResearcher';

async function main() {
    const outDir = path.resolve(process.cwd(), 'scratch/screenshots_deep_research_engine');
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir, { recursive: true });

    const testPrompt = 'Subsea Fiber Optic Cable Landing Station & DWDM Transoceanic Network Infographic';
    console.log(`[1/4] Executing Live Gemini 2.5 6-Dimension Domain Research for: "${testPrompt}"...`);

    const result = await researchAndCompileDomainInfographic(testPrompt);
    console.log(`[2/4] Model used: ${result.modelUsed} | isLiveResearched: ${result.isLiveResearched}`);
    console.log('\n--- 6-DIMENSION RESEARCH BRIEF ---');
    console.log(result.researchBriefMarkdown);
    console.log('----------------------------------\n');

    if (!result.isLiveResearched) {
        throw new Error('FAIL: Expected isLiveResearched === true from live Gemini 2.5 call!');
    }

    const xml = result.xml;
    const forbiddenGenericPhrases = ['Data Sources', 'Policy Harness', 'Knowledge Graph'];
    for (const phrase of forbiddenGenericPhrases) {
        if (xml.includes(phrase)) {
            throw new Error(`FAIL: Found forbidden generic placeholder phrase "${phrase}" in generated XML!`);
        }
    }

    fs.writeFileSync(path.join(outDir, 'subsea_dwdm_researched.drawio'), xml, 'utf-8');
    fs.writeFileSync(path.join(outDir, 'subsea_dwdm_research_brief.md'), result.researchBriefMarkdown, 'utf-8');

    console.log('[3/4] Launching headless Google Chrome to render and capture 2x Retina screenshot on /studio...');
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1080']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1080, deviceScaleFactor: 2 });

        await page.goto('http://localhost:3001/studio', { waitUntil: 'networkidle2', timeout: 60000 });
        await new Promise(r => setTimeout(r, 1500));

        // Submit the prompt through the Concierge input bar on /studio
        const inputSelector = 'input[placeholder*="Ask"], input[placeholder*="Describe"], textarea';
        await page.waitForSelector(inputSelector, { timeout: 15000 });
        await page.type(inputSelector, testPrompt);
        await page.keyboard.press('Enter');

        // Wait for live /api/research-infographic roundtrip to render in chat + Draw.io canvas settling delay
        await page.waitForFunction(
            () => document.body.innerText.includes('6-Dimension Deep Domain Research Complete'),
            { timeout: 35000 }
        );
        await new Promise(r => setTimeout(r, 2500));

        const screenshotPath = path.join(outDir, '01_subsea_dwdm_researched_infographic.png');
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`[4/4] Saved screenshot to ${screenshotPath}`);

        const artifactDir = '/Users/nitinagga/.gemini/jetski/brain/47340f3e-12ac-48d4-b926-e15f6d6db2f8';
        if (fs.existsSync(artifactDir)) {
            fs.copyFileSync(screenshotPath, path.join(artifactDir, '01_subsea_dwdm_researched_infographic.png'));
        }
    } finally {
        await browser.close();
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
