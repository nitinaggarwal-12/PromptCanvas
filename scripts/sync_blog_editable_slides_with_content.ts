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
} from '../src/lib/server/googleWorkspaceBridge';

async function syncAllBlogEditableSlidesWithContent() {
  console.log('🚀 Compiling & syncing 6-Slide Editable Diagram (#78) + Associated Blog Content decks to Google Slides...');

  const workstreamAliasByDocId: Record<string, string[]> = {
    'DOC-MT-01': ['WS1', 'BP-78'],
    'DOC-MT-02': ['WS2'],
    'DOC-MT-03': ['WS3'],
    'DOC-MT-04': ['WS4'],
    'DOC-MT-05': ['WS5'],
  };

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

    const entry = await uploadPptxBufferToGoogleSlides({
      pptxBuffer,
      title: `${doc.docId} — ${doc.title} (Editable Diagram #78 + Blog Guide)`,
      cacheKey: doc.docId,
      force: true,
    });
    console.log(`   ✅ Synced ${doc.docId} → Google Slides ID: ${entry.googleSlidesId}`);
    console.log(`      URL: ${entry.googleSlidesEditUrl}`);

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
