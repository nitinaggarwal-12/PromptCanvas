import puppeteer from 'puppeteer';
import { rmSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/c3c45669-fafd-4030-bd6a-a7ce32ba43e8/screenshots_phase6';

// Helper to sleep/wait (Mandatory Settling Delays)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Advanced Helper: Wait for a specific console message to appear in the browser console
function waitForConsoleMessage(page: puppeteer.Page, text: string, timeout = 20000): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Timeout waiting for browser console message containing: "${text}"`));
    }, timeout);
    
    const listener = (msg: puppeteer.ConsoleMessage) => {
      const msgText = msg.text();
      if (msgText.includes(text)) {
        cleanup();
        resolve();
      }
    };
    
    const cleanup = () => {
      clearTimeout(timer);
      page.off('console', listener);
    };
    
    page.on('console', listener);
  });
}

async function runE2ETest() {
  console.log('🚀 Starting Puppeteer E2E Test Suite for Maestro Sketch...');
  
  // 1. Housekeeping: Purge the screenshot directory before running
  console.log('🧹 Cleaning screenshot directory to prevent stale files...');
  try {
    rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
  } catch (e) {}
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log('🎬 Launching browser (headless)...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Pipe browser console logs and errors to terminal for debugging
  page.on('console', msg => {
    const text = msg.text();
    // Ignore HMR and DevTools warnings to keep output clean
    if (!text.includes('[HMR]') && !text.includes('React DevTools')) {
      console.log(`[BROWSER CONSOLE] [${msg.type()}] ${text}`);
    }
  });
  page.on('pageerror', err => {
    console.error('[BROWSER PAGE ERROR]', err.message);
  });
  
  // Set viewport to a standard desktop size
  await page.setViewport({ width: 1440, height: 900 });

  try {
    // --- STEP 1: Empty State ---
    console.log('\n--- STEP 1: Empty State ---');
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Wait for the empty state button to render
    await page.waitForSelector('#new-diagram-btn', { timeout: 10000 });
    await sleep(1000); // 1000ms settling delay
    
    console.log('📸 Capturing: 01_empty_state.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '01_empty_state.png') });

    // --- STEP 2: Create Diagram ---
    console.log('\n--- STEP 2: Create Diagram ---');
    console.log('Opening "Create New Diagram" modal...');
    // Use DOM-level click for reliability
    await page.evaluate(() => {
      const btn = document.getElementById('new-diagram-btn');
      if (btn) (btn as HTMLButtonElement).click();
      else throw new Error('New Diagram button not found');
    });
    
    // Wait for modal input to appear
    await page.waitForSelector('input[placeholder="e.g., Google Cloud E-Commerce"]', { timeout: 5000 });
    await sleep(500);
    
    // Type name
    console.log('Typing diagram name...');
    await page.type('input[placeholder="e.g., Google Cloud E-Commerce"]', 'E2E Test Architecture');
    await sleep(500);
    
    // Click "Create Canvas" button (submit form)
    console.log('Submitting form...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitBtn = buttons.find(btn => btn.textContent?.includes('Create Canvas'));
      if (submitBtn) submitBtn.click();
      else throw new Error('Create Canvas button not found');
    });
    
    // Wait for diagram to load (the header title should update)
    console.log('Waiting for diagram to load in workspace...');
    await page.waitForFunction(
      () => {
        const header = document.querySelector('header h2');
        return header && header.textContent === 'E2E Test Architecture';
      },
      { timeout: 10000 }
    );
    await sleep(1500); // 1500ms settling delay for Draw.io static viewer to mount
    
    console.log('📸 Capturing: 02_diagram_loaded.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '02_diagram_loaded.png') });

    // --- STEP 3: AI Generation ---
    console.log('\n--- STEP 3: AI Generation ---');
    console.log('Sending AI generation prompt...');
    const promptText = 'Create a Google Cloud architecture with Cloud Run, Cloud SQL, and Apigee Gateway';
    
    // Type the prompt into the textarea
    await page.type('textarea[placeholder*="Apigee Gateway"]', promptText);
    await sleep(500);
    
    // Submit the prompt form by clicking the send button
    console.log('Submitting prompt to Gemini...');
    await page.evaluate(() => {
      const textarea = document.querySelector('textarea[placeholder*="Apigee Gateway"]');
      const form = textarea?.closest('form');
      if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) (submitBtn as HTMLButtonElement).click();
        else throw new Error('Prompt submit button not found');
      } else {
        throw new Error('Prompt form not found');
      }
    });
    
    // Wait for AI generation to complete (the timeline dot '2' should appear)
    console.log('Waiting for Gemini 2.5-flash response and Draw.io render (up to 35s)...');
    await page.waitForFunction(
      () => {
        const dots = Array.from(document.querySelectorAll('.rounded-full'));
        return dots.some(dot => dot.textContent?.trim() === '2');
      },
      { timeout: 40000 }
    );
    await sleep(2000); // 2000ms settling delay for the Draw.io vector engine to render the new XML
    
    console.log('📸 Capturing: 03_ai_generated.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '03_ai_generated.png') });

    // --- STEP 4: Inline Editor ---
    console.log('\n--- STEP 4: Inline Editor ---');
    console.log('Opening Draw.io Inline Editor (Iframe)...');
    // DOM-level click on "Edit Inline" button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const editBtn = buttons.find(btn => btn.textContent?.includes('Edit Inline'));
      if (editBtn) editBtn.click();
      else throw new Error('Edit Inline button not found');
    });
    
    // Wait for the iframe element to appear in the DOM
    console.log('Waiting for Draw.io editor iframe element...');
    await page.waitForSelector('iframe[src*="embed.diagrams.net"]', { timeout: 15000 });
    
    // SYNC POINT: Wait for the Draw.io iframe to complete its postMessage handshake (init event)
    console.log('⏳ Waiting for Draw.io editor to complete handshake (init)...');
    await waitForConsoleMessage(page, 'Received: init. Sending: load', 20000);
    console.log('✅ Editor handshake complete! Editor is ready.');
    await sleep(1500); // 1500ms settling delay
    
    console.log('📸 Capturing: 04_inline_editor.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '04_inline_editor.png') });

    // --- STEP 5: Save Manual Edit ---
    console.log('\n--- STEP 5: Save Manual Edit ---');
    console.log('Clicking "Save & Exit" in editor header...');
    // DOM-level click using the new unique ID (conforming to the E2E click rule)
    await page.$eval('#inline-save-exit-btn', el => (el as HTMLButtonElement).click());
    
    // SYNC POINT: Wait for the editor to compile the XML and post it back (export event)
    console.log('⏳ Waiting for editor to compile and return XML (export)...');
    await waitForConsoleMessage(page, 'Received: export. Opening Save Version modal', 20000);
    console.log('✅ XML received! Save modal is opening.');
    
    // Wait for the "Save New Version" modal textarea to be visible
    await page.waitForSelector('textarea[placeholder*="Connected Apigee"]', { timeout: 10000 });
    await sleep(800); // 800ms settling delay
    
    // Type comment
    console.log('Typing version comment...');
    await page.type('textarea[placeholder*="Connected Apigee"]', 'Manual edit via E2E test');
    await sleep(500);
    
    // Click "Save Version" via DOM-level click
    console.log('Submitting version save...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const saveBtn = buttons.find(btn => btn.textContent?.includes('Save Version'));
      if (saveBtn) saveBtn.click();
      else throw new Error('Save Version button not found');
    });
    
    // Wait for the modal to close and version v3 to appear in the timeline
    console.log('Waiting for version v3 to appear in history...');
    await page.waitForFunction(
      () => {
        const dots = Array.from(document.querySelectorAll('.rounded-full'));
        return dots.some(dot => dot.textContent?.trim() === '3');
      },
      { timeout: 10000 }
    );
    await sleep(1500); // 1500ms settling delay for workspace reload
    
    console.log('📸 Capturing: 05_manual_edit_saved.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '05_manual_edit_saved.png') });

    // --- STEP 6: Preview Past Version ---
    console.log('\n--- STEP 6: Preview Past Version ---');
    console.log('Clicking "Preview" on version v2...');
    // DOM-level click on the Preview button for v2
    await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.group'));
      const v2Card = cards.find(card => {
        const dot = card.querySelector('.rounded-full');
        return dot && dot.textContent?.trim() === '2';
      });
      if (v2Card) {
        const previewBtn = Array.from(v2Card.querySelectorAll('button')).find(btn => btn.textContent?.includes('Preview'));
        if (previewBtn) (previewBtn as HTMLButtonElement).click();
        else throw new Error('Preview button not found in v2 card');
      } else {
        throw new Error('v2 card not found');
      }
    });
    
    // Wait for the amber preview banner to appear
    console.log('Waiting for preview banner...');
    await page.waitForFunction(
      () => document.body.textContent?.includes('You are previewing a historical snapshot'),
      { timeout: 5000 }
    );
    await sleep(1000); // 1000ms settling delay
    
    console.log('📸 Capturing: 06_preview_v2.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '06_preview_v2.png') });

    // --- STEP 7: Back to Active Draft ---
    console.log('\n--- STEP 7: Back to Active Draft ---');
    console.log('Clicking "Back to Active Draft"...');
    // DOM-level click on the banner button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const backBtn = buttons.find(btn => btn.textContent?.includes('Back to Active Draft'));
      if (backBtn) backBtn.click();
      else throw new Error('Back to Active Draft button not found');
    });
    
    // Wait for the preview banner to disappear
    console.log('Waiting for preview banner to disappear...');
    await page.waitForFunction(
      () => !document.body.textContent?.includes('You are previewing a historical snapshot'),
      { timeout: 5000 }
    );
    await sleep(1000); // 1000ms settling delay
    
    console.log('📸 Capturing: 07_back_to_active.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '07_back_to_active.png') });

    // --- STEP 8: Security Audit ---
    console.log('\n--- STEP 8: Security Audit ---');
    console.log('Clicking "Audit Security" button...');
    await page.$eval('#audit-diagram-btn', el => (el as HTMLButtonElement).click());
    
    console.log('Waiting for AI Security Audit report to compile (up to 30s)...');
    await page.waitForFunction(
      () => document.body.textContent?.includes('Maestro Architecture Audit Report'),
      { timeout: 35000 }
    );
    await sleep(1500); // 1500ms settling delay
    
    console.log('📸 Capturing: 08_security_audit.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '08_security_audit.png') });
    
    console.log('Closing Audit Modal...');
    await page.$eval('#close-audit-modal-btn', el => (el as HTMLButtonElement).click());
    await sleep(800); // 800ms modal close transition settling delay
    
    console.log('📸 Capturing: 09_audit_modal_closed.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '09_audit_modal_closed.png') });

    console.log('\n🎉 E2E Test Suite Completed Successfully! All 9 screenshots captured! 🎉');

  } catch (error) {
    console.error('\n❌ E2E Test Suite Failed:', error);
    console.log('📸 Capturing error screenshot: error.png');
    try {
      await page.screenshot({ path: join(SCREENSHOT_DIR, 'error.png') });
    } catch (e) {
      console.error('Failed to capture error screenshot:', e);
    }
    await browser.close();
    process.exit(1);
  }

  await browser.close();
}

runE2ETest();
