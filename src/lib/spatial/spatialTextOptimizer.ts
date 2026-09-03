/**
 * Spatial Text Optimizer & Typographic Character-Budget Compressor
 * Dynamically budgets text length, abbreviates enterprise technical jargon,
 * and fits content into exact Draw.io pixel bounding boxes.
 */

// Enterprise Technical Abbreviation & Contraction Map
const TECH_ABBREVIATIONS: [RegExp, string][] = [
  [/\bMulti-Region Active-Active\b/gi, "Multi-Reg Active-Active"],
  [/\bMulti-Region\b/gi, "Multi-Reg"],
  [/\bGoogle Kubernetes Engine\b/gi, "GKE Autopilot"],
  [/\bDisaster Recovery\b/gi, "DR"],
  [/\bHigh Availability\b/gi, "HA"],
  [/\bApplication Programming Interface\b/gi, "API"],
  [/\bVirtual Private Cloud\b/gi, "VPC"],
  [/\bHardware Security Module\b/gi, "HSM"],
  [/\bKey Management Service\b/gi, "KMS"],
  [/\bSensitive Data Protection\b/gi, "DLP"],
  [/\bCustomer-Managed Encryption Keys\b/gi, "CMEK"],
  [/\bService Level Agreement\b/gi, "SLA"],
  [/\bRecovery Point Objective\b/gi, "RPO"],
  [/\bRecovery Time Objective\b/gi, "RTO"],
  [/\bZero Data Loss\b/gi, "0 Data Loss"],
  [/\bWorkload Identity Federation\b/gi, "Workload Identity"],
  [/\bAuthentication\b/gi, "Auth"],
  [/\bAuthorization\b/gi, "AuthZ"],
  [/\bMicroservices\b/gi, "Microservices"],
  [/\bOrchestration\b/gi, "Orchestration"],
  [/\bConfiguration\b/gi, "Config"],
  [/\bDatabase\b/gi, "DB"],
  [/\bReplication\b/gi, "Repl"],
  [/\bInfrastructure\b/gi, "Infra"],
  [/\bObservability\b/gi, "Observability"],
  [/\bStreaming\b/gi, "Stream"],
  [/\bContinuous Integration\b/gi, "CI"],
  [/\bContinuous Delivery\b/gi, "CD"],
];

/**
 * Calculates max characters that can fit into a given pixel width for a given font size.
 * Average proportional width for Apple System / Sans-Serif font is ~0.56 * fontSize.
 */
export function calculateMaxCharsForWidth(pixelWidth: number, fontSize = 8, isBold = false): number {
  const avgCharWidth = fontSize * (isBold ? 0.62 : 0.54);
  return Math.max(10, Math.floor(pixelWidth / avgCharWidth));
}

/**
 * Condenses verbose enterprise text to fit within target pixel width using domain heuristics.
 */
export function smartShortenText(text: string, maxPixelWidth: number, fontSize = 8, isBold = false): string {
  if (!text) return "";
  const maxChars = calculateMaxCharsForWidth(maxPixelWidth, fontSize, isBold);

  // If already fits, return trimmed
  if (text.length <= maxChars) {
    return text.trim();
  }

  // Pass 1: Apply technical abbreviations
  let shortened = text;
  for (const [pattern, replacement] of TECH_ABBREVIATIONS) {
    shortened = shortened.replace(pattern, replacement);
    if (shortened.length <= maxChars) {
      return shortened.trim();
    }
  }

  // Pass 2: Clean punctuation & parentheses filler
  shortened = shortened
    .replace(/\s*\(.*?\)\s*/g, " ") // remove parenthetical secondary info if tight
    .replace(/\s{2,}/g, " ")
    .trim();

  if (shortened.length <= maxChars) {
    return shortened;
  }

  // Pass 3: Word boundary clean truncation with ellipsis
  const words = shortened.split(" ");
  let result = "";
  for (const word of words) {
    if ((result + " " + word).trim().length + 1 > maxChars - 1) {
      break;
    }
    result = (result + " " + word).trim();
  }

  return result ? `${result}…` : shortened.substring(0, maxChars - 1) + "…";
}

/**
 * Determines optimal bullet count & compresses bullet strings based on card height & width.
 */
export function optimizeCardBullets(
  bullets: string[] | undefined,
  cardHeight: number,
  cardWidth: number,
  fontSize = 8
): string[] {
  if (!bullets || bullets.length === 0) return [];

  // Height-based bullet allocation budget
  let maxBullets = 1;
  if (cardHeight >= 180) {
    maxBullets = 4;
  } else if (cardHeight >= 130) {
    maxBullets = 3;
  } else if (cardHeight >= 85) {
    maxBullets = 2;
  } else {
    maxBullets = 1;
  }

  const selectedBullets = bullets.slice(0, maxBullets);
  const availableBulletWidth = Math.max(120, cardWidth - 45);

  return selectedBullets.map(b => smartShortenText(b, availableBulletWidth, fontSize, false));
}
