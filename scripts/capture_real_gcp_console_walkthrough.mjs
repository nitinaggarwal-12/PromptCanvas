import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/nitinagga/Documents/PromptCanvas/public/blogs-verification-screenshots';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.connect({
  browserURL: 'http://127.0.0.1:9423',
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 }
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });

async function capturePage(url, filename, waitMs = 12000, extraFn = null) {
  console.log(`Navigating to ${url} ...`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch((e) => console.log('goto warn:', e.message));
  await sleep(waitMs);
  if (extraFn) {
    try {
      await extraFn(page);
    } catch (e) {
      console.log(`extraFn warn on ${filename}:`, e.message);
    }
  }
  const fullPath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: fullPath, fullPage: false });
  console.log(`Saved ${fullPath} (title: ${await page.title()})`);
}

// 1. Cloud Run Source Editor showing main.py inside Cloud Console
await capturePage(
  'https://console.cloud.google.com/run/detail/us-central1/cymbal-multi-tenant-patterns/source?project=nitinagga-ge-2',
  'gcp_console_01_cloud_run_source_editor.png',
  14000
);

// 2. Cloud Run Revisions & Deployment details inside Cloud Console
await capturePage(
  'https://console.cloud.google.com/run/detail/us-central1/cymbal-multi-tenant-patterns/revisions?project=nitinagga-ge-2',
  'gcp_console_02_cloud_run_revisions_deploy.png',
  12000
);

// 3. BigQuery Studio: Pattern A Pooled RLS table + Preview tab
await capturePage(
  'https://console.cloud.google.com/bigquery?project=nitinagga-ge-2&ws=!1m5!1m4!4m3!1snitinagga-ge-2!2scymbal_agentic_finops_otel!3spattern_a_pooled_rls_entities',
  'gcp_console_03_bigquery_studio_pattern_a_rls.png',
  14000,
  async (p) => {
    // Click Preview tab if visible
    await p.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"], button, a'));
      const previewTab = tabs.find(el => (el.textContent || '').trim() === 'Preview');
      if (previewTab) previewTab.click();
    });
    await sleep(4000);
  }
);

// 4. BigQuery Studio: Pattern B Sovereign CMEK Vault table + Preview tab
await capturePage(
  'https://console.cloud.google.com/bigquery?project=nitinagga-ge-2&ws=!1m5!1m4!4m3!1snitinagga-ge-2!2scymbal_silo_finvault_usw1!3spattern_b_silo_finvault_cmek_vault',
  'gcp_console_04_bigquery_studio_pattern_b_cmek.png',
  12000,
  async (p) => {
    await p.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"], button, a'));
      const previewTab = tabs.find(el => (el.textContent || '').trim() === 'Preview');
      if (previewTab) previewTab.click();
    });
    await sleep(4000);
  }
);

// 5. Cloud KMS Keyring: cymbal-multi-tenant-kr (finvault-silo-cmek, retailstream-silo-cmek, adk-agent-signing-key)
await capturePage(
  'https://console.cloud.google.com/security/kms/keyring/manage/us-west1/cymbal-multi-tenant-kr/key?project=nitinagga-ge-2',
  'gcp_console_05_cloud_kms_keyring_live.png',
  12000
);

// 6. VPC Network: cymbal-pattern-c-hub-vpc & /28 PRIVATE_SERVICE_CONNECT NAT subnet
await capturePage(
  'https://console.cloud.google.com/networking/networks/details/cymbal-pattern-c-hub-vpc?project=nitinagga-ge-2&pageTab=SUBNETS',
  'gcp_console_06_vpc_psc_nat_subnet_live.png',
  12000
);

// 7. Cloud Logging (Logs Explorer): Live execution logs of cymbal-multi-tenant-patterns (E2E_MULTI_TENANT_PATTERNS_20_20_PASS)
await capturePage(
  'https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cymbal-multi-tenant-patterns%22?project=nitinagga-ge-2',
  'gcp_console_07_logs_explorer_20_20_pass.png',
  15000
);

// 8. Gemini Enterprise App / Vertex AI Search & Conversation Live Execution
await capturePage(
  'https://vertexaisearch.cloud.google.com/us/home/cid/e823f383-deba-4330-9270-ed6ac94cbbc6',
  'gcp_console_08_gemini_enterprise_app_live_exec.png',
  12000,
  async (p) => {
    // Also check if we can type a query in Gemini Enterprise
    await p.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('textarea, input[type="text"], [contenteditable="true"]'));
      if (inputs.length > 0) {
        inputs[0].focus();
      }
    });
    await sleep(2000);
  }
);

await page.close();
await browser.disconnect();
console.log('ALL 8 REAL GCP CONSOLE & GEMINI ENTERPRISE SCREENSHOTS CAPTURED!');
