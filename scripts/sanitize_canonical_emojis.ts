import fs from "fs";
import path from "path";

const RAW_EMOJI_REGEX = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu;

const dir = "src/lib/canonical";
const files = fs.readdirSync(dir).filter(f => f.startsWith("template") && f.endsWith(".ts"));

let totalSanitized = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");
  const initialMatches = (content.match(RAW_EMOJI_REGEX) || []).length;
  if (initialMatches === 0) continue;

  // 1. Clean metadata banners & prefixes
  content = content.replace(/☁️\s*Environment:/g, "Environment:");
  content = content.replace(/📍\s*Region:/g, "Region:");
  content = content.replace(/📅\s*Last Updated:/g, "Last Updated:");
  content = content.replace(/🧬\s*NOVACURA/g, "NOVACURA");

  // Country flags to ISO text badges
  content = content.replace(/🇺🇸/g, "[US]");
  content = content.replace(/🇧🇷/g, "[BR]");
  content = content.replace(/🇪🇺/g, "[EU]");
  content = content.replace(/🇦🇪/g, "[AE]");
  content = content.replace(/🇸🇬/g, "[SG]");
  content = content.replace(/🇿🇦/g, "[ZA]");

  // 2. Remove emoji when followed by text/space, e.g. "👥  Patient Engagement" -> "Patient Engagement"
  content = content.replace(new RegExp(`(${RAW_EMOJI_REGEX.source})\\s+([A-Za-z0-9&])`, "gu"), "$2");
  content = content.replace(new RegExp(`([A-Za-z0-9&])\\s+(${RAW_EMOJI_REGEX.source})`, "gu"), "$1");

  // 3. When an emoji is inside quotes as an icon property, e.g. icon: "👥" or '👥', replace with ●
  content = content.replace(new RegExp(`(["'\`])(${RAW_EMOJI_REGEX.source})\\uFE0F?\\1`, "gu"), `$1●$1`);

  // 4. Remove any remaining raw emojis and variation selectors
  content = content.replace(RAW_EMOJI_REGEX, "");
  content = content.replace(/\uFE0F/g, "");

  fs.writeFileSync(filePath, content, "utf8");
  totalSanitized++;
  console.log(`[Sanitized] ${file} (cleared ${initialMatches} raw emojis)`);
}

console.log(`\n✅ Sanitized ${totalSanitized} canonical templates.`);
