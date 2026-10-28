import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import {
  GOOGLE_CLOUD_DOCUMENTATION_SERIES,
  buildCanonicalDocMarkdown,
} from '../src/lib/blogs/googleCloudDocumentationSeries';
import {
  OFFICIAL_ARCH_CENTER_BLUEPRINTS,
  compileOfficialArchCenterDrawioXml,
} from '../src/lib/canonical/templateOfficialGcpArchCenterHubSpoke';
import { exportDrawioToEditablePptx } from '../src/lib/export/editablePptxCompiler';
import {
  uploadPptxBufferToGoogleSlides,
  loadCloudViewerManifest,
  saveCloudViewerManifest,
  getServerDriveAccessToken,
} from '../src/lib/server/googleWorkspaceBridge';

const LEGACY_PRESENTATION_IDS_BY_DOC: Record<string, string[]> = {
  'DOC-MT-01': [
    '1dwa5ER2-aWO_Qo1QhSR4TVtkRsuw9RL-Exf0YDUDrIg',
    '1RUkSWKaufU1PgLhI7-ufJ_Y7DPlZeLp8REHoXsHc-cI',
    '1rBHt-al8JDO9UZY6IIJpOdAR76zZQvvoNhPnX-ae9NY',
    '1fp-Q21VVhy3hnqWDHBmZu1GLpLD6ts2ylhFfMR7LXsg',
  ],
  'DOC-MT-02': [
    '1HfjCi035HDOb74CO-P6J6GS7VKHT3zSfuwQx_KH15wc',
    '1uro8CTfEKfRg03geNOTQ4Hmy1lk3r_ewfKPt0vNbZcs',
    '1bRva9gC6980Lbd33pC1x-6s5994E9rR0oT3nJ0rE_k8',
  ],
  'DOC-MT-03': [
    '1WYmj2wHnC9ofji_--4M_fnLtJ2B245umKmEdQwQCYE0',
    '1G42hI3r29R7b7_iF1R3B76xP2r40A4bK4P7v6D0v1eI',
  ],
  'DOC-MT-04': [
    '1Tm2bkJNUCXa-oLoOaL7x1ho6TBKY5YRwC4rjgxaGTXA',
    '1y_0vA3x10M7g5_nQ8V1W90cR7t21Z8jL2N5m9B4x8qP',
  ],
  'DOC-MT-05': [
    '1r_2oEeBC-XKkub16auZfLD8levx3ZORxEKBiBDlW5Gs',
  ],
  'DOC-MT-06': [
    '1wNzyaGuMdWhVlxNdWJw8fJda7aovAQ0pgE8mtZUTNUc',
    '1p_9cB2v40K1h6_mR5T3Y81zQ4w19X7fJ8L2n6V1c5wM',
  ],
  'DOC-REF-07': [
    '1WBXxlnExatYy_A1S3Lnv-TM1tt6MNq5RTp3JFGQb_u8',
  ],
  'DOC-REF-08': [
    '1sHSR73_osu8Z6UpklKtsa71Y9Z97JVCt_9g6TFlVUfI',
  ],
  'DOC-REF-09': [
    '1OPrnB1L0iZhVX3bD05vrnvsEEznsSLccdag6Wq_CEd8',
  ],
};

async function patchPresentationIdInPlace(fileId: string, pptxBuffer: Buffer, title: string, token: string) {
  const boundary = '----PromptCanvasCloudBridgePatch' + crypto.randomUUID().replace(/-/g, '');
  const metaJson = JSON.stringify({
    name: `${title} — Editable Google Slides`,
    mimeType: 'application/vnd.google-apps.presentation',
  });
  const multipartBody = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metaJson}\r\n--${boundary}\r\nContent-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation\r\n\r\n`,
      'utf-8'
    ),
    pptxBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8'),
  ]);
  const res = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart&supportsAllDrives=true&fields=id,name`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-goog-user-project': 'ramp-portal-dev',
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: new Uint8Array(multipartBody),
      signal: AbortSignal.timeout(60000),
    }
  );
  if (res.ok) {
    console.log(`      🔄 Patched legacy presentation ID in-place: ${fileId}`);
  }
}

async function syncAllBlogEditableSlidesWithContent() {
  console.log('🚀 Compiling & syncing 6-Slide 1:1 White DevSite <article> UI + Editable Diagram (#78) decks to Google Slides...');

  const workstreamAliasByDocId: Record<string, string[]> = {
    'DOC-MT-01': ['BP-78'],
  };

  const token = await getServerDriveAccessToken();

  for (const doc of GOOGLE_CLOUD_DOCUMENTATION_SERIES) {
    const bp =
      OFFICIAL_ARCH_CENTER_BLUEPRINTS.find((b) => b.id === doc.primaryBlueprintVariantId) ||
      OFFICIAL_ARCH_CENTER_BLUEPRINTS[0];
    const xml = compileOfficialArchCenterDrawioXml(bp);
    const md = buildCanonicalDocMarkdown(doc);
    const fullTitle = `${doc.docId}: ${doc.title}`;

    console.log(`\n📦 Compiling 6-slide .pptx for ${doc.docId} (${doc.title})...`);
    const b64 = (await exportDrawioToEditablePptx(xml, fullTitle, doc.docId, {
      returnBase64: true,
      includeArchCenterGuideSlides: true,
      markdownContent: md,
      docId: doc.docId,
    })) as string;
    const pptxBuffer = Buffer.from(b64, 'base64');
    console.log(`   ✓ Compiled ${pptxBuffer.length.toLocaleString()} bytes (6 slides: 1 Editable Diagram + 5 Blog Content slides)`);

    const localSlidesDir = '/Users/nitinagga/Documents/blogs/slides';
    if (fs.existsSync(localSlidesDir)) {
      const docPptxPath = path.join(localSlidesDir, `${doc.docId.toLowerCase()}-editable-slides.pptx`);
      fs.writeFileSync(docPptxPath, pptxBuffer);
    }

    const entry = await uploadPptxBufferToGoogleSlides({
      pptxBuffer,
      title: `${doc.docId} — ${doc.title} (Editable Diagram #78 + Blog Guide)`,
      cacheKey: doc.docId,
      force: true,
      accessTokenOverride: token,
    });
    console.log(`   ✅ Synced ${doc.docId} → Google Slides ID: ${entry.googleSlidesId}`);
    console.log(`      URL: ${entry.googleSlidesEditUrl}`);

    if (token) {
      const legacyIds = LEGACY_PRESENTATION_IDS_BY_DOC[doc.docId] || [];
      for (const legId of legacyIds) {
        if (legId !== entry.googleSlidesId) {
          await patchPresentationIdInPlace(
            legId,
            pptxBuffer,
            `${doc.docId} — ${doc.title} (Editable Diagram #78 + Blog Guide)`,
            token
          );
        }
      }
    }

    const aliases = workstreamAliasByDocId[doc.docId] || [];
    if (aliases.length > 0) {
      const manifest = loadCloudViewerManifest();
      for (const aliasKey of aliases) {
        manifest.slides[aliasKey] = {
          ...entry,
          key: aliasKey,
          title: `${aliasKey} — ${doc.title} (Editable Diagram #78 + Blog Guide)`,
        };
        console.log(`   🔗 Mapped alias ${aliasKey} → ${entry.googleSlidesId}`);
      }
      saveCloudViewerManifest(manifest);
    }
  }

  console.log('\n🎉 All 9 Blog Guides (DOC-MT-01..DOC-REF-09) + WS1..WS5 + BP-78 synced to Google Slides with 6-slide Editable Diagram + Blog Content!');
}

syncAllBlogEditableSlidesWithContent().catch((err) => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
