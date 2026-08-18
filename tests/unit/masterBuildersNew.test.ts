import { describe, it, expect } from "vitest";
import {
  ARCHITECTURE_TYPES,
  getDefaultXmlForArchitecture,
  normalizeArchitectureId
} from "../../src/lib/architectureTypes";

describe("Complete 52 Master Enterprise Blueprint Catalog Integrity Suite", () => {
  it("should have exactly 40 registered enterprise architectures", () => {
    expect(ARCHITECTURE_TYPES.length).toBe(52);
  });

  ARCHITECTURE_TYPES.forEach((arch) => {
    describe(`Master Blueprint [` + arch.id + `]: ` + arch.name, () => {
      it("should normalize correctly", () => {
        const normalized = normalizeArchitectureId(arch.id);
        expect(normalized).toBe(arch.id);
      });

      it("should generate valid Draw.io XML with zero unescaped ampersands", () => {
        const xml = getDefaultXmlForArchitecture(arch.id) || "";
        expect(xml).toBeDefined();
        expect(xml.length).toBeGreaterThan(200);
        expect(xml).toContain("<mxfile");
        expect(xml).toContain("</mxfile>");
        expect(xml).toContain("<mxGraphModel");

        // Verify no unescaped ampersands in active XML tags/attributes (outside comments)
        const xmlWithoutComments = xml.replace(/<!--[\s\S]*?-->/g, "");
        const regex = /&(?!([a-zA-Z0-9]+|#\d+|#x[0-9a-fA-F]+);)/g;
        let m;
        const issues: string[] = [];
        while ((m = regex.exec(xmlWithoutComments)) !== null) {
          issues.push(xmlWithoutComments.substring(Math.max(0, m.index - 20), Math.min(xmlWithoutComments.length, m.index + 30)));
        }
        if (issues.length > 0) {
          console.log("Issues in " + arch.id + ":", issues);
        }
        expect(issues.length).toBe(0);
      });
    });
  });
});
