import { describe, it, expect } from 'vitest';
import { buildMcpContextGatewayXml } from '@/lib/masterBuilders/master_builder_mcp_gateway';
import {
  findFosterParentedTableCells,
  healFosterParentedHtmlInXml,
} from '@/lib/htmlTableSanitizer';
import { validateDrawioXml } from '@/lib/validate/validator';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

describe('Anti-Foster-Parenting HTML Table Sanitizer & Validator', () => {
  it('flags raw foster-parented <span> before </tr> as a hard error and xmlHealer repairs it cleanly', () => {
    const poisonedXml = buildMcpContextGatewayXml().replace(
      '&lt;/tr&gt;',
      '&lt;span style=&quot;background:#38bdf8;&quot;&gt;Managed Host&lt;/span&gt;&lt;/tr&gt;'
    );

    const badVal = validateDrawioXml(poisonedXml);
    expect(badVal.errors.some((e) => e.code === 'HTML_FOSTER_PARENTING_IN_TABLE')).toBe(true);
    expect(badVal.valid).toBe(false);

    const healed = validateAndHealDrawioXml(poisonedXml, 'mcp_context_gateway');
    expect(healed.isHealed).toBe(true);
    expect(findFosterParentedTableCells(healed.xml)).toEqual([]);
    expect(healed.xml).not.toContain('Managed Host');

    const directlyHealed = healFosterParentedHtmlInXml(poisonedXml);
    expect(findFosterParentedTableCells(directlyHealed.xml)).toEqual([]);
  });
});
