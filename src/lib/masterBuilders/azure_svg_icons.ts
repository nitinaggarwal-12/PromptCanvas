// Authentic Microsoft Azure Architecture Center Vector SVG Icons (Raw Inline SVGs)
// Engineered for 100% native vector rendering inside Draw.io HTML cells with zero semicolon/base64 truncation

function cleanSvg(svg: string): string {
  return svg.trim().replace(/\s+/g, ' ');
}

export const AZURE_RAW_SVGS = {
  USERS: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="uGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#32D4F5"/>
          <stop offset="100%" stop-color="#0078D4"/>
        </linearGradient>
      </defs>
      <circle cx="32" cy="20" r="12" fill="url(#uGrad)"/>
      <path d="M12 54 C12 38, 52 38, 52 54 Z" fill="url(#uGrad)"/>
      <path d="M26 38 L32 48 L38 38 Z" fill="#FFFFFF" opacity="0.85"/>
    </svg>
  `),

  APP_GW_WAF: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <polygon points="26,6 48,28 26,50 4,28" fill="#57A300" stroke="#3B6E00" stroke-width="1.5"/>
      <path d="M26 14 L26 42 M12 28 L40 28" stroke="#FFFFFF" stroke-width="2.5"/>
      <circle cx="26" cy="28" r="6" fill="#57A300" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="42" cy="18" r="11" fill="#0078D4" stroke="#FFFFFF" stroke-width="1.5"/>
      <ellipse cx="42" cy="18" rx="5" ry="11" fill="none" stroke="#FFFFFF" stroke-width="1.2"/>
      <line x1="31" y1="18" x2="53" y2="18" stroke="#FFFFFF" stroke-width="1.2"/>
      <rect x="34" y="34" width="26" height="18" rx="2" fill="#D13438" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="34" y1="40" x2="60" y2="40" stroke="#FFFFFF" stroke-width="1.2"/>
      <line x1="34" y1="46" x2="60" y2="46" stroke="#FFFFFF" stroke-width="1.2"/>
      <line x1="42" y1="34" x2="42" y2="40" stroke="#FFFFFF" stroke-width="1.2"/>
      <line x1="52" y1="34" x2="52" y2="40" stroke="#FFFFFF" stroke-width="1.2"/>
      <line x1="47" y1="40" x2="47" y2="46" stroke="#FFFFFF" stroke-width="1.2"/>
      <line x1="42" y1="46" x2="42" y2="52" stroke="#FFFFFF" stroke-width="1.2"/>
      <line x1="52" y1="46" x2="52" y2="52" stroke="#FFFFFF" stroke-width="1.2"/>
    </svg>
  `),

  VM: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="8" y="10" width="48" height="34" rx="3" fill="#0078D4"/>
      <rect x="11" y="13" width="42" height="28" rx="1" fill="#50E6FF"/>
      <polygon points="32,17 42,22 42,32 32,37 22,32 22,22" fill="#0078D4"/>
      <polygon points="32,17 42,22 32,27 22,22" fill="#9CEBFF"/>
      <polygon points="32,27 42,22 42,32 32,37" fill="#005A9E"/>
      <rect x="24" y="44" width="16" height="6" fill="#7A7574"/>
      <rect x="16" y="50" width="32" height="4" rx="1" fill="#A19F9D"/>
    </svg>
  `),

  VNET: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M20 14 L6 32 L20 50" fill="none" stroke="#0078D4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M44 14 L58 32 L44 50" fill="none" stroke="#0078D4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="22" cy="32" r="4.5" fill="#57A300"/>
      <circle cx="32" cy="32" r="4.5" fill="#57A300"/>
      <circle cx="42" cy="32" r="4.5" fill="#57A300"/>
    </svg>
  `),

  SUBNET: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M22 16 L8 32 L22 48" fill="none" stroke="#0078D4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 16 L56 32 L42 48" fill="none" stroke="#0078D4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="32" r="6" fill="#57A300"/>
    </svg>
  `),

  NSG: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M32 6 L54 14 L54 32 C54 46, 32 58, 32 58 C32 58, 10 46, 10 32 L10 14 Z" fill="#0078D4"/>
      <path d="M32 10 L50 17 L50 32 C50 43, 32 53, 32 53 L32 10 Z" fill="#50E6FF" opacity="0.5"/>
    </svg>
  `),

  LOG_ANALYTICS: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="8" y="24" width="32" height="32" rx="3" fill="#0078D4"/>
      <rect x="14" y="40" width="5" height="10" fill="#FFFFFF"/>
      <rect x="22" y="34" width="5" height="16" fill="#FFFFFF"/>
      <rect x="30" y="29" width="5" height="21" fill="#50E6FF"/>
      <circle cx="42" cy="22" r="14" fill="#50E6FF" stroke="#0078D4" stroke-width="2"/>
      <circle cx="38" cy="18" r="2.5" fill="#0078D4"/>
      <circle cx="46" cy="18" r="2.5" fill="#0078D4"/>
      <circle cx="38" cy="26" r="2.5" fill="#0078D4"/>
      <circle cx="46" cy="26" r="2.5" fill="#0078D4"/>
    </svg>
  `),

  DIAGNOSTICS: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="12" y="8" width="40" height="48" rx="3" fill="#57A300"/>
      <rect x="16" y="12" width="32" height="40" rx="1" fill="#7FBA00"/>
      <polyline points="18,34 25,34 29,22 35,44 39,34 46,34" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `),

  APIM: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M18 46 C10 46, 6 39, 8 31 C9 23, 17 18, 25 20 C29 12, 41 12, 46 20 C54 21, 58 29, 55 37 C53 43, 47 46, 40 46 Z" fill="#50E6FF" stroke="#0078D4" stroke-width="2"/>
      <circle cx="32" cy="34" r="9" fill="#0078D4"/>
      <circle cx="32" cy="34" r="4" fill="#FFFFFF"/>
      <path d="M32 19 L32 25 M32 43 L32 49 M17 34 L23 34 M41 34 L47 34" stroke="#0078D4" stroke-width="2.5"/>
    </svg>
  `),

  APP_SERVICE: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="32" cy="32" r="24" fill="#0078D4"/>
      <ellipse cx="32" cy="32" rx="11" ry="24" fill="none" stroke="#50E6FF" stroke-width="2.5"/>
      <ellipse cx="32" cy="32" rx="24" ry="11" fill="none" stroke="#50E6FF" stroke-width="2.5"/>
      <circle cx="21" cy="24" r="4" fill="#FFFFFF"/>
      <circle cx="43" cy="24" r="4" fill="#FFFFFF"/>
      <circle cx="32" cy="43" r="4" fill="#FFFFFF"/>
    </svg>
  `),

  CONTAINER_APPS_ENV: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="6" y="6" width="52" height="52" rx="6" fill="none" stroke="#773ADC" stroke-width="3" stroke-dasharray="6,4"/>
      <polygon points="32,14 50,24 50,44 32,54 14,44 14,24" fill="#773ADC"/>
      <polygon points="32,14 50,24 32,34 14,24" fill="#B4A0FF"/>
      <polygon points="32,34 50,24 50,44 32,54" fill="#5B21B6"/>
      <rect x="24" y="26" width="16" height="12" rx="1" fill="#FFFFFF" opacity="0.9"/>
    </svg>
  `),

  CONTAINER_APP: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" fill="#773ADC"/>
      <polygon points="32,8 54,20 32,32 10,20" fill="#B4A0FF"/>
      <polygon points="32,32 54,20 54,44 32,56" fill="#5B21B6"/>
      <rect x="21" y="23" width="8" height="16" rx="1" fill="#FFFFFF"/>
      <rect x="33" y="23" width="8" height="16" rx="1" fill="#50E6FF"/>
    </svg>
  `),

  ORCHESTRATOR_API: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="32" cy="16" r="8" fill="#5B21B6"/>
      <circle cx="16" cy="46" r="8" fill="#0078D4"/>
      <circle cx="48" cy="46" r="8" fill="#0078D4"/>
      <line x1="32" y1="24" x2="18" y2="40" stroke="#773ADC" stroke-width="3"/>
      <line x1="32" y1="24" x2="46" y2="40" stroke="#773ADC" stroke-width="3"/>
      <line x1="24" y1="46" x2="40" y2="46" stroke="#0078D4" stroke-width="3" stroke-dasharray="3,3"/>
    </svg>
  `),

  PRIVATE_ENDPOINT: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M22 18 L8 32 L22 46" fill="none" stroke="#0078D4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 18 L56 32 L42 46" fill="none" stroke="#0078D4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="20" r="4.5" fill="#50E6FF" stroke="#0078D4" stroke-width="2"/>
      <circle cx="32" cy="44" r="4.5" fill="#50E6FF" stroke="#0078D4" stroke-width="2"/>
      <line x1="32" y1="25" x2="32" y2="39" stroke="#57A300" stroke-width="3"/>
      <circle cx="32" cy="32" r="3.5" fill="#57A300"/>
    </svg>
  `),

  AI_FOUNDRY_HUB: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <defs>
        <linearGradient id="fGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0078D4"/>
          <stop offset="50%" stop-color="#773ADC"/>
          <stop offset="100%" stop-color="#E3008C"/>
        </linearGradient>
      </defs>
      <path d="M24 10 L42 10 L56 48 L38 48 Z" fill="url(#fGrad1)"/>
      <path d="M24 10 L10 48 L28 48 L36 28 Z" fill="#0078D4"/>
      <polygon points="28,48 56,48 48,56 20,56" fill="#50E6FF" opacity="0.8"/>
    </svg>
  `),

  AI_SERVICES: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M16 46 C8 46, 4 39, 6 31 C8 22, 16 17, 24 19 C28 11, 41 11, 46 19 C54 20, 58 28, 56 36 C54 43, 48 46, 40 46 Z" fill="#0078D4"/>
      <circle cx="24" cy="32" r="3.5" fill="#50E6FF"/>
      <circle cx="34" cy="24" r="3.5" fill="#FFFFFF"/>
      <circle cx="42" cy="34" r="3.5" fill="#50E6FF"/>
      <circle cx="32" cy="38" r="3.5" fill="#FFFFFF"/>
      <line x1="24" y1="32" x2="34" y2="24" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="34" y1="24" x2="42" y2="34" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="24" y1="32" x2="32" y2="38" stroke="#50E6FF" stroke-width="2"/>
      <line x1="32" y1="38" x2="42" y2="34" stroke="#50E6FF" stroke-width="2"/>
    </svg>
  `),

  AI_SEARCH: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M16 46 C8 46, 4 39, 6 31 C8 22, 16 17, 24 19 C28 11, 41 11, 46 19 C54 20, 58 28, 56 36 C54 43, 48 46, 40 46 Z" fill="#0078D4"/>
      <circle cx="30" cy="29" r="8" fill="none" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="36" y1="35" x2="44" y2="43" stroke="#50E6FF" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `),

  AZURE_OPENAI: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="#0078D4"/>
      <path d="M32 16 C33 26, 38 31, 48 32 C38 33, 33 38, 32 48 C31 38, 26 33, 16 32 C26 31, 31 26, 32 16 Z" fill="#FFFFFF"/>
      <circle cx="44" cy="20" r="2.5" fill="#50E6FF"/>
    </svg>
  `),

  KEY_VAULT: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="32" cy="32" r="24" fill="#FFB900"/>
      <circle cx="32" cy="24" r="7" fill="none" stroke="#FFFFFF" stroke-width="4"/>
      <path d="M32 31 L32 47 M32 39 L39 39 M32 45 L37 45" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `),

  ACR: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M16 44 C8 44, 4 37, 6 29 C8 20, 16 15, 24 17 C28 9, 41 9, 46 17 C54 18, 58 26, 56 34 C54 41, 48 44, 40 44 Z" fill="#0078D4"/>
      <rect x="28" y="28" width="24" height="20" rx="2" fill="#50E6FF" stroke="#005A9E" stroke-width="1.5"/>
      <line x1="36" y1="28" x2="36" y2="48" stroke="#005A9E" stroke-width="1.5"/>
      <line x1="44" y1="28" x2="44" y2="48" stroke="#005A9E" stroke-width="1.5"/>
      <line x1="28" y1="38" x2="52" y2="38" stroke="#005A9E" stroke-width="1.5"/>
    </svg>
  `),

  STORAGE: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="10" y="12" width="44" height="40" rx="3" fill="#00A4EF"/>
      <rect x="14" y="18" width="36" height="8" rx="1" fill="#FFFFFF"/>
      <rect x="14" y="30" width="36" height="8" rx="1" fill="#50E6FF"/>
      <rect x="14" y="42" width="36" height="6" rx="1" fill="#0078D4"/>
    </svg>
  `),

  COSMOS_DB: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="32" cy="32" r="18" fill="#0078D4"/>
      <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(-28 32 32)" fill="none" stroke="#50E6FF" stroke-width="3.5"/>
      <circle cx="14" cy="22" r="3" fill="#50E6FF"/>
      <circle cx="50" cy="42" r="3" fill="#50E6FF"/>
      <circle cx="46" cy="14" r="2.5" fill="#0078D4"/>
    </svg>
  `),

  SERVICE_BUS: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="10" y="12" width="44" height="40" rx="4" fill="#0078D4"/>
      <rect x="16" y="18" width="32" height="6" rx="1" fill="#50E6FF"/>
      <rect x="16" y="29" width="32" height="6" rx="1" fill="#FFFFFF"/>
      <rect x="16" y="40" width="32" height="6" rx="1" fill="#50E6FF"/>
    </svg>
  `),

  MANAGED_IDENTITY: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <polygon points="32,8 54,30 32,52 10,30" fill="#50E6FF" stroke="#0078D4" stroke-width="2"/>
      <circle cx="32" cy="25" r="5" fill="#0078D4"/>
      <path d="M22 40 C22 33, 42 33, 42 40 Z" fill="#0078D4"/>
      <circle cx="44" cy="44" r="8" fill="#FFB900"/>
      <path d="M44 40 L44 48 M44 45 L48 45" stroke="#FFFFFF" stroke-width="2"/>
    </svg>
  `),

  MGMT_GROUP: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M18 12 L10 12 L10 52 L18 52" fill="none" stroke="#7A7574" stroke-width="4" stroke-linecap="round"/>
      <path d="M46 12 L54 12 L54 52 L46 52" fill="none" stroke="#7A7574" stroke-width="4" stroke-linecap="round"/>
      <circle cx="32" cy="20" r="5" fill="#773ADC"/>
      <circle cx="22" cy="42" r="5" fill="#0078D4"/>
      <circle cx="42" cy="42" r="5" fill="#0078D4"/>
      <path d="M32 25 L22 37 M32 25 L42 37" stroke="#7A7574" stroke-width="2.5"/>
    </svg>
  `),

  COST_MGMT: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <polygon points="32,6 54,18 54,46 32,58 10,46 10,18" fill="#57A300"/>
      <text x="32" y="42" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="#FFFFFF" text-anchor="middle">$</text>
    </svg>
  `),

  DEFENDER: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M32 6 L54 14 L54 32 C54 46, 32 58, 32 58 C32 58, 10 46, 10 32 L10 14 Z" fill="#57A300"/>
      <rect x="24" y="28" width="16" height="14" rx="2" fill="#FFFFFF"/>
      <path d="M27 28 L27 22 C27 18, 37 18, 37 22 L37 28" fill="none" stroke="#FFFFFF" stroke-width="3"/>
    </svg>
  `),

  POLICY: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <polygon points="32,8 52,20 52,44 32,56 12,44 12,20" fill="none" stroke="#7A7574" stroke-width="4"/>
      <circle cx="32" cy="32" r="8" fill="#0078D4"/>
      <circle cx="46" cy="24" r="3.5" fill="#50E6FF"/>
      <circle cx="46" cy="32" r="3.5" fill="#50E6FF"/>
      <circle cx="46" cy="40" r="3.5" fill="#50E6FF"/>
    </svg>
  `),

  RBAC: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="26" cy="20" r="9" fill="#57A300"/>
      <path d="M10 48 C10 36, 42 36, 42 48 Z" fill="#7FBA00"/>
      <polygon points="46,34 56,40 56,52 46,58 36,52 36,40" fill="#0078D4"/>
      <polygon points="46,34 56,40 46,46 36,40" fill="#50E6FF"/>
    </svg>
  `),

  FIREWALL: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M16 38 C8 38, 4 31, 6 23 C8 14, 16 9, 24 11 C28 5, 41 5, 46 11 C54 12, 58 20, 56 28 C54 35, 48 38, 40 38 Z" fill="#0078D4"/>
      <rect x="14" y="34" width="36" height="22" rx="2" fill="#D13438" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="14" y1="41" x2="50" y2="41" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="14" y1="48" x2="50" y2="48" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="26" y1="34" x2="26" y2="41" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="38" y1="34" x2="38" y2="41" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="32" y1="41" x2="32" y2="48" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="26" y1="48" x2="26" y2="56" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="38" y1="48" x2="38" y2="56" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>
  `),

  BASTION: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M14 14 L50 50 M50 14 L14 50" stroke="#0078D4" stroke-width="6" stroke-linecap="round"/>
      <polygon points="50,14 40,14 50,24" fill="#50E6FF"/>
      <polygon points="50,50 40,50 50,40" fill="#50E6FF"/>
    </svg>
  `),

  VPN_GW: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <rect x="14" y="10" width="16" height="44" rx="2" fill="#0078D4"/>
      <rect x="34" y="10" width="16" height="44" rx="2" fill="#50E6FF"/>
      <circle cx="22" cy="20" r="3" fill="#FFFFFF"/>
      <circle cx="22" cy="32" r="3" fill="#FFFFFF"/>
      <circle cx="42" cy="20" r="3" fill="#0078D4"/>
      <circle cx="42" cy="32" r="3" fill="#0078D4"/>
    </svg>
  `),

  EXPRESSROUTE: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <polygon points="32,12 52,48 12,48" fill="none" stroke="#773ADC" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="32" cy="12" r="6" fill="#57A300"/>
      <circle cx="52" cy="48" r="6" fill="#57A300"/>
      <circle cx="12" cy="48" r="6" fill="#57A300"/>
    </svg>
  `),

  DNS_ZONE: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="32" cy="32" r="24" fill="#0078D4"/>
      <text x="32" y="38" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">DNS</text>
    </svg>
  `),

  DNS_RESOLVER: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="32" cy="32" r="22" fill="#0078D4"/>
      <ellipse cx="32" cy="32" rx="10" ry="22" fill="none" stroke="#50E6FF" stroke-width="2"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke="#50E6FF" stroke-width="2"/>
      <circle cx="32" cy="32" r="8" fill="#004578"/>
      <path d="M32 28 L32 36" stroke="#FFFFFF" stroke-width="3"/>
    </svg>
  `),

  DDOS: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <path d="M32 6 L54 14 L54 32 C54 46, 32 58, 32 58 C32 58, 10 46, 10 32 L10 14 Z" fill="#0078D4"/>
      <rect x="22" y="20" width="20" height="22" rx="2" fill="#FFFFFF"/>
      <line x1="26" y1="26" x2="38" y2="26" stroke="#0078D4" stroke-width="2.5"/>
      <line x1="26" y1="34" x2="38" y2="34" stroke="#0078D4" stroke-width="2.5"/>
    </svg>
  `),

  NET_WATCHER: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="28" cy="28" r="18" fill="#50E6FF" stroke="#0078D4" stroke-width="2.5"/>
      <ellipse cx="28" cy="28" rx="8" ry="18" fill="none" stroke="#0078D4" stroke-width="1.5"/>
      <line x1="10" y1="28" x2="46" y2="28" stroke="#0078D4" stroke-width="1.5"/>
      <line x1="41" y1="41" x2="54" y2="54" stroke="#7A7574" stroke-width="6" stroke-linecap="round"/>
    </svg>
  `),

  SUB_KEY: cleanSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
      <circle cx="32" cy="32" r="24" fill="#FFF2CC" stroke="#D97706" stroke-width="3"/>
      <circle cx="32" cy="23" r="6" fill="none" stroke="#F59E0B" stroke-width="3.5"/>
      <path d="M32 29 L32 45 M32 37 L38 37 M32 42 L36 42" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
    </svg>
  `),
};

export const AZURE_ICONS = AZURE_RAW_SVGS;

