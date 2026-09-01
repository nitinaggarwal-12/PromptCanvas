---
name: puppeteer-pair-programming
description: Comprehensive architecture, cheatsheet, and patterns for building robust end-to-end (E2E) Puppeteer automation suites that run asynchronously in the background during pair programming with interactive setup modes, clean profile management, DOM verification, and screenshot review galleries.
---

# Puppeteer Pair Programming & Autonomous E2E Testing Suite

This skill provides the architectural foundation and reusable patterns for writing Puppeteer test suites designed specifically for **autonomous pair programming** where the agent runs background verification tasks, asserts live DOM states, and captures review screenshots after every code change across all projects.

## 1. Headless Background Chrome Setup & Profile Management

When running E2E scripts during pair programming, always launch Chrome in **headless background mode (`headless: 'new'`)** using the installed Google Chrome binary.

```javascript
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function launchPairProgrammingBrowser(customProfileDir = '.gemini/chrome_profile_e2e') {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const userDataDir = path.join(process.env.HOME || '/Users/nitinagga', customProfileDir);
  
  // Clean profile lock to avoid SingletonLock issues
  const lockFile = path.join(userDataDir, 'SingletonLock');
  if (fs.existsSync(lockFile)) {
    try { fs.unlinkSync(lockFile); } catch (e) {}
  }

  return await puppeteer.launch({
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    userDataDir: userDataDir,
    args: [
      '--headless=new',
      '--window-size=1440,900',
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-blink-features=AutomationControlled'
    ]
  });
}
```

## 2. Mandatory Screenshot Capture & Storage Protocol

Always store visual artifacts in a dedicated task folder within the project workspace, purging old files first:

```javascript
const screenshotDir = path.join(process.cwd(), 'scratch', `screenshots_${taskId}`);
if (fs.existsSync(screenshotDir)) {
  fs.rmSync(screenshotDir, { recursive: true, force: true });
}
fs.mkdirSync(screenshotDir, { recursive: true });

// Capture state
await page.screenshot({ path: path.join(screenshotDir, '01_initial_load.png'), fullPage: false });
```

## 3. Mandatory 800ms Settling Delays for Animations & React State

Always inject an 800ms delay after UI actions to allow React state updates and CSS transitions to settle:

```javascript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await page.click('button[type="submit"]');
await sleep(800);
await page.screenshot({ path: path.join(screenshotDir, '02_after_submit.png') });
```

## 4. Framework-Safe DOM Verification & Interaction

```javascript
// Direct DOM Click (avoids overlay interception)
await page.$eval(selector, el => el.click());

// Verify DOM String Literal
const exists = await page.evaluate((text) => {
  return document.body.innerText.includes(text);
}, 'Expected Text Literal');
```

## 5. Visual Review Delivery

Present captured screenshots as clickable `file://` Markdown links in the response:
- `[01_initial_load.png](file:///path/to/scratch/screenshots_<task_id>/01_initial_load.png)`
- `[02_after_submit.png](file:///path/to/scratch/screenshots_<task_id>/02_after_submit.png)`
