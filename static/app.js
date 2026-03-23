/* ============================================================
   MUNECOS KAWAII — app.js
   ============================================================ */

'use strict';

/* ---------- SVG DEFINITIONS ---------- */

// Returns the base SVG body/head for a given gender and skin color
function svgBase(gender, skin) {
  const isBoy = gender === 'boy';
  // Big round head, small body — Funko style
  return `
  <!-- SHADOW -->
  <ellipse cx="120" cy="328" rx="55" ry="10" fill="rgba(0,0,0,0.18)"/>

  <!-- NECK -->
  <rect x="105" y="178" width="30" height="22" rx="6" fill="${skin}"/>

  <!-- BODY -->
  ${ isBoy
    ? `<rect x="72" y="196" width="96" height="90" rx="22" fill="${skin}"/>`
    : `<path d="M72,196 Q72,280 90,288 Q120,298 150,288 Q168,280 168,196 Z" fill="${skin}"/>`
  }

  <!-- ARMS -->
  ${ isBoy
    ? `<rect x="38" y="200" width="36" height="62" rx="18" fill="${skin}"/>
       <rect x="166" y="200" width="36" height="62" rx="18" fill="${skin}"/>`
    : `<ellipse cx="56" cy="232" rx="17" ry="34" fill="${skin}" transform="rotate(-8,56,232)"/>
       <ellipse cx="184" cy="232" rx="17" ry="34" fill="${skin}" transform="rotate(8,184,232)"/>`
  }

  <!-- LEGS -->
  ${ isBoy
    ? `<rect x="86" y="282" width="34" height="52" rx="14" fill="${skin}"/>
       <rect x="120" y="282" width="34" height="52" rx="14" fill="${skin}"/>`
    : `<rect x="89" y="285" width="30" height="48" rx="13" fill="${skin}"/>
       <rect x="121" y="285" width="30" height="48" rx="13" fill="${skin}"/>`
  }

  <!-- HEAD (big funko) -->
  <ellipse cx="120" cy="112" rx="70" ry="77" fill="${skin}"/>

  <!-- CHEEKS -->
  <ellipse cx="74" cy="136" rx="14" ry="9" fill="rgba(255,160,160,0.35)"/>
  <ellipse cx="166" cy="136" rx="14" ry="9" fill="rgba(255,160,160,0.35)"/>
  `;
}

// ---- EYES ----
const EYES = {
  round: (c, _lc) => `
    <circle cx="90" cy="118" r="14" fill="white"/>
    <circle cx="90" cy="120" r="9" fill="${c}"/>
    <circle cx="90" cy="120" r="5" fill="#111"/>
    <circle cx="93" cy="116" r="2.5" fill="white"/>
    <circle cx="150" cy="118" r="14" fill="white"/>
    <circle cx="150" cy="120" r="9" fill="${c}"/>
    <circle cx="150" cy="120" r="5" fill="#111"/>
    <circle cx="153" cy="116" r="2.5" fill="white"/>`,
  star: (_c, _lc) => `
    <text x="76" y="132" font-size="24" text-anchor="middle" fill="#ffdd00">★</text>
    <text x="144" y="132" font-size="24" text-anchor="middle" fill="#ffdd00">★</text>`,
  half: (_c, lc) => `
    <path d="M76,118 Q90,132 104,118" fill="none" stroke="${lc}" stroke-width="3" stroke-linecap="round"/>
    <path d="M136,118 Q150,132 164,118" fill="none" stroke="${lc}" stroke-width="3" stroke-linecap="round"/>`,
  wink: (c, lc) => `
    <circle cx="90" cy="118" r="14" fill="white"/>
    <circle cx="90" cy="120" r="9" fill="${c}"/>
    <circle cx="90" cy="120" r="5" fill="#111"/>
    <circle cx="93" cy="116" r="2.5" fill="white"/>
    <path d="M136,120 Q150,132 164,120" fill="none" stroke="${lc}" stroke-width="3" stroke-linecap="round"/>`,
  heart: (_c, _lc) => `
    <text x="76" y="134" font-size="26" text-anchor="middle" fill="#ff4d6d">♥</text>
    <text x="144" y="134" font-size="26" text-anchor="middle" fill="#ff4d6d">♥</text>`,
  // Sparkle — big anime eyes with star pupil and glints
  sparkle: (c, lc) => `
    <circle cx="90" cy="118" r="16" fill="white"/>
    <circle cx="90" cy="119" r="11" fill="${c}"/>
    <circle cx="90" cy="119" r="6" fill="#111"/>
    <circle cx="94" cy="114" r="3" fill="white"/>
    <circle cx="86" cy="122" r="1.5" fill="white"/>
    <line x1="90" y1="100" x2="90" y2="96" stroke="${lc}" stroke-width="2" stroke-linecap="round"/>
    <line x1="100" y1="104" x2="103" y2="101" stroke="${lc}" stroke-width="2" stroke-linecap="round"/>
    <line x1="80" y1="104" x2="77" y2="101" stroke="${lc}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="150" cy="118" r="16" fill="white"/>
    <circle cx="150" cy="119" r="11" fill="${c}"/>
    <circle cx="150" cy="119" r="6" fill="#111"/>
    <circle cx="154" cy="114" r="3" fill="white"/>
    <circle cx="146" cy="122" r="1.5" fill="white"/>
    <line x1="150" y1="100" x2="150" y2="96" stroke="${lc}" stroke-width="2" stroke-linecap="round"/>
    <line x1="160" y1="104" x2="163" y2="101" stroke="${lc}" stroke-width="2" stroke-linecap="round"/>
    <line x1="140" y1="104" x2="137" y2="101" stroke="${lc}" stroke-width="2" stroke-linecap="round"/>`,
  // Sleepy — heavy drooping eyelid, half-open
  sleepy: (c, lc) => `
    <circle cx="90" cy="120" r="13" fill="white"/>
    <circle cx="90" cy="121" r="8" fill="${c}"/>
    <circle cx="90" cy="121" r="4" fill="#111"/>
    <circle cx="93" cy="118" r="2" fill="white"/>
    <path d="M76,114 Q90,110 104,114" fill="#f5c5a3" stroke="none"/>
    <path d="M76,114 Q90,110 104,114" fill="none" stroke="${lc}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="150" cy="120" r="13" fill="white"/>
    <circle cx="150" cy="121" r="8" fill="${c}"/>
    <circle cx="150" cy="121" r="4" fill="#111"/>
    <circle cx="153" cy="118" r="2" fill="white"/>
    <path d="M136,114 Q150,110 164,114" fill="#f5c5a3" stroke="none"/>
    <path d="M136,114 Q150,110 164,114" fill="none" stroke="${lc}" stroke-width="2.5" stroke-linecap="round"/>`,
  // Pixel — retro 3×3 grid pixel art eyes
  pixel: (_c, _lc) => `
    <rect x="78" y="110" width="7" height="7" fill="#111"/>
    <rect x="85" y="110" width="7" height="7" fill="#111"/>
    <rect x="92" y="110" width="7" height="7" fill="#111"/>
    <rect x="78" y="117" width="7" height="7" fill="#111"/>
    <rect x="85" y="117" width="7" height="7" fill="white"/>
    <rect x="92" y="117" width="7" height="7" fill="#111"/>
    <rect x="78" y="124" width="7" height="7" fill="#111"/>
    <rect x="85" y="124" width="7" height="7" fill="#111"/>
    <rect x="92" y="124" width="7" height="7" fill="#111"/>
    <rect x="138" y="110" width="7" height="7" fill="#111"/>
    <rect x="145" y="110" width="7" height="7" fill="#111"/>
    <rect x="152" y="110" width="7" height="7" fill="#111"/>
    <rect x="138" y="117" width="7" height="7" fill="#111"/>
    <rect x="145" y="117" width="7" height="7" fill="white"/>
    <rect x="152" y="117" width="7" height="7" fill="#111"/>
    <rect x="138" y="124" width="7" height="7" fill="#111"/>
    <rect x="145" y="124" width="7" height="7" fill="#111"/>
    <rect x="152" y="124" width="7" height="7" fill="#111"/>`,
  // Teary — round eyes with a single teardrop
  teary: (c, _lc) => `
    <circle cx="90" cy="118" r="14" fill="white"/>
    <circle cx="90" cy="119" r="9" fill="${c}"/>
    <circle cx="90" cy="119" r="5" fill="#111"/>
    <circle cx="93" cy="115" r="2.5" fill="white"/>
    <ellipse cx="90" cy="134" rx="3" ry="5" fill="rgba(100,180,255,0.7)"/>
    <path d="M87,130 Q90,136 93,130" fill="rgba(100,180,255,0.7)" stroke="none"/>
    <circle cx="150" cy="118" r="14" fill="white"/>
    <circle cx="150" cy="119" r="9" fill="${c}"/>
    <circle cx="150" cy="119" r="5" fill="#111"/>
    <circle cx="153" cy="115" r="2.5" fill="white"/>
    <ellipse cx="150" cy="134" rx="3" ry="5" fill="rgba(100,180,255,0.7)"/>
    <path d="M147,130 Q150,136 153,130" fill="rgba(100,180,255,0.7)" stroke="none"/>`,
  // Closed — happy closed curved eyes (sleeping/smiling)
  closed: (_c, lc) => `
    <path d="M76,122 Q90,112 104,122" fill="none" stroke="${lc}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M136,122 Q150,112 164,122" fill="none" stroke="${lc}" stroke-width="3.5" stroke-linecap="round"/>`,
  // Angry eyes — sharp angled pupils, menacing look
  angry_eyes: (c, _lc) => `
    <circle cx="90" cy="120" r="13" fill="white"/>
    <circle cx="91" cy="121" r="8" fill="${c}"/>
    <circle cx="91" cy="121" r="4.5" fill="#111"/>
    <circle cx="94" cy="118" r="2" fill="white"/>
    <line x1="76" y1="110" x2="104" y2="116" stroke="#111" stroke-width="4" stroke-linecap="round"/>
    <circle cx="150" cy="120" r="13" fill="white"/>
    <circle cx="149" cy="121" r="8" fill="${c}"/>
    <circle cx="149" cy="121" r="4.5" fill="#111"/>
    <circle cx="152" cy="118" r="2" fill="white"/>
    <line x1="136" y1="116" x2="164" y2="110" stroke="#111" stroke-width="4" stroke-linecap="round"/>`,
  // Dollar — round eyes with $ symbol pupils
  dollar: (c, _lc) => `
    <circle cx="90" cy="118" r="14" fill="white"/>
    <circle cx="90" cy="119" r="9" fill="${c}"/>
    <text x="90" y="123" font-size="11" text-anchor="middle" fill="#111" font-weight="bold">$</text>
    <circle cx="150" cy="118" r="14" fill="white"/>
    <circle cx="150" cy="119" r="9" fill="${c}"/>
    <text x="150" y="123" font-size="11" text-anchor="middle" fill="#111" font-weight="bold">$</text>`,
};

// ---- EYEBROWS ----
const BROWS = {
  straight: (c) => `
    <rect x="74" y="90" width="28" height="5" rx="2.5" fill="${c}"/>
    <rect x="138" y="90" width="28" height="5" rx="2.5" fill="${c}"/>`,
  arched: (c) => `
    <path d="M74,94 Q88,84 102,94" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <path d="M138,94 Q152,84 166,94" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
  angry: (c) => `
    <path d="M74,92 Q88,98 102,92" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <path d="M138,92 Q152,98 166,92" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
  kawaii: (c) => `
    <path d="M74,92 Q88,86 102,92" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M138,92 Q152,86 166,92" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="76" cy="92" r="3" fill="${c}"/>
    <circle cx="138" cy="92" r="3" fill="${c}"/>`,
  // Thin — very fine high arched lines, 90s/anime style
  thin: (c) => `
    <path d="M76,88 Q88,82 102,87" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M138,88 Q152,82 166,87" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round"/>`,
  // Bushy — thick natural stroke
  bushy: (c) => `
    <path d="M72,94 Q88,86 104,94" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <path d="M136,94 Q152,86 168,94" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,
  // Raised — left normal arched, right lifted skeptical
  raised: (c) => `
    <path d="M74,94 Q88,84 102,94" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <path d="M138,88 Q152,80 166,90" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
  // Worried — inner ends raised, outer ends dropped
  worried: (c) => `
    <path d="M74,94 Q82,84 102,90" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <path d="M138,90 Q158,84 166,94" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
  // Cross — both brows angled sharply inward/down, scowling
  cross: (c) => `
    <path d="M74,88 Q88,96 102,94" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <path d="M138,94 Q152,96 166,88" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
};

// ---- CHEEKS ----
// All functions receive (c) = cheek color. Positions: left cx≈74 cy≈136, right cx≈166 cy≈136
const CHEEKS = {
  // soft — classic oval blush
  soft: (c) => `
    <ellipse cx="74" cy="136" rx="14" ry="9" fill="${c}" opacity="0.55"/>
    <ellipse cx="166" cy="136" rx="14" ry="9" fill="${c}" opacity="0.55"/>`,
  // round — full circle blush
  round: (c) => `
    <circle cx="74" cy="136" r="13" fill="${c}" opacity="0.45"/>
    <circle cx="166" cy="136" r="13" fill="${c}" opacity="0.45"/>`,
  // heart — small heart shape on each cheek
  heart: (c) => `
    <text x="74" y="142" font-size="16" text-anchor="middle" fill="${c}" opacity="0.75">♥</text>
    <text x="166" y="142" font-size="16" text-anchor="middle" fill="${c}" opacity="0.75">♥</text>`,
  // star — tiny star sparkle blush
  star: (c) => `
    <text x="74" y="142" font-size="16" text-anchor="middle" fill="${c}" opacity="0.8">★</text>
    <text x="166" y="142" font-size="16" text-anchor="middle" fill="${c}" opacity="0.8">★</text>`,
  // freckles — three small dots per cheek
  freckles: (c) => `
    <circle cx="65" cy="135" r="2.5" fill="${c}" opacity="0.7"/>
    <circle cx="72" cy="139" r="2.5" fill="${c}" opacity="0.7"/>
    <circle cx="79" cy="133" r="2.5" fill="${c}" opacity="0.7"/>
    <circle cx="157" cy="133" r="2.5" fill="${c}" opacity="0.7"/>
    <circle cx="164" cy="139" r="2.5" fill="${c}" opacity="0.7"/>
    <circle cx="171" cy="135" r="2.5" fill="${c}" opacity="0.7"/>`,
  // lines — three short horizontal strokes (anime style)
  lines: (c) => `
    <line x1="60" y1="133" x2="76" y2="133" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
    <line x1="60" y1="137" x2="80" y2="137" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
    <line x1="62" y1="141" x2="76" y2="141" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
    <line x1="164" y1="133" x2="180" y2="133" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
    <line x1="160" y1="137" x2="180" y2="137" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
    <line x1="164" y1="141" x2="178" y2="141" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>`,
};

// ---- NOSE ----
const NOSES = {
  dot: `<circle cx="120" cy="140" r="4" fill="rgba(0,0,0,0.18)"/>`,
  button: `
    <ellipse cx="120" cy="142" rx="8" ry="6" fill="rgba(0,0,0,0.12)"/>
    <ellipse cx="116" cy="142" rx="3" ry="2" fill="rgba(0,0,0,0.12)"/>
    <ellipse cx="124" cy="142" rx="3" ry="2" fill="rgba(0,0,0,0.12)"/>`,
  heart: `<text x="120" y="148" font-size="14" text-anchor="middle" fill="rgba(0,0,0,0.22)">♥</text>`,
  // Cat — two tiny close dots, cat-style
  cat: `
    <circle cx="116" cy="142" r="2.5" fill="rgba(0,0,0,0.22)"/>
    <circle cx="124" cy="142" r="2.5" fill="rgba(0,0,0,0.22)"/>`,
  // Pig — upturned oval with two nostrils
  pig: `
    <ellipse cx="120" cy="143" rx="9" ry="6" fill="rgba(0,0,0,0.1)" stroke="rgba(0,0,0,0.18)" stroke-width="1.5"/>
    <circle cx="116" cy="144" r="2.5" fill="rgba(0,0,0,0.18)"/>
    <circle cx="124" cy="144" r="2.5" fill="rgba(0,0,0,0.18)"/>`,
  // Freckles — scattered dots across nose bridge
  freckles: `
    <circle cx="109" cy="144" r="2" fill="rgba(180,100,60,0.45)"/>
    <circle cx="116" cy="141" r="1.8" fill="rgba(180,100,60,0.4)"/>
    <circle cx="124" cy="141" r="1.8" fill="rgba(180,100,60,0.4)"/>
    <circle cx="131" cy="144" r="2" fill="rgba(180,100,60,0.45)"/>
    <circle cx="120" cy="143" r="1.5" fill="rgba(180,100,60,0.3)"/>`,
};

// ---- MOUTH ----
const MOUTHS = {
  smile: `<path d="M100,162 Q120,178 140,162" fill="none" stroke="#c0645a" stroke-width="3.5" stroke-linecap="round"/>`,
  line: `<line x1="104" y1="164" x2="136" y2="164" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>`,
  surprise: `<ellipse cx="120" cy="164" rx="12" ry="9" fill="#c0645a"/>`,
  uwu: `
    <path d="M102,162 Q112,174 120,162" fill="none" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>
    <path d="M120,162 Q128,174 138,162" fill="none" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>`,
  // Grin — wide open smile showing teeth
  grin: `
    <path d="M96,160 Q120,180 144,160" fill="#c0645a" stroke="#c0645a" stroke-width="2" stroke-linecap="round"/>
    <path d="M96,160 Q120,165 144,160" fill="white" stroke="none"/>
    <line x1="108" y1="160" x2="108" y2="165" stroke="#c0645a" stroke-width="1.5"/>
    <line x1="120" y1="160" x2="120" y2="165" stroke="#c0645a" stroke-width="1.5"/>
    <line x1="132" y1="160" x2="132" y2="165" stroke="#c0645a" stroke-width="1.5"/>`,
  // Cat mouth — W-shape
  cat_mouth: `
    <path d="M104,164 Q112,172 120,164" fill="none" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>
    <path d="M120,164 Q128,172 136,164" fill="none" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>
    <line x1="120" y1="162" x2="120" y2="156" stroke="#c0645a" stroke-width="2" stroke-linecap="round"/>`,
};

// ---- TOPS (shirts) ----
const TOPS = {
  tshirt: (c, gender) => gender === 'girl'
    ? `<path d="M80,200 Q72,210 72,230 L72,280 Q72,290 120,292 Q168,290 168,280 L168,230 Q168,210 160,200 L148,208 Q134,196 120,196 Q106,196 92,208 Z" fill="${c}"/>`
    : `<path d="M76,200 L72,220 L72,282 Q120,292 168,282 L168,220 L164,200 L148,208 Q134,194 120,194 Q106,194 92,208 Z" fill="${c}"/>`,
  crop: (c, _g) => `<path d="M84,200 Q80,210 80,240 L80,258 Q120,268 160,258 L160,240 Q160,210 156,200 L144,208 Q132,198 120,198 Q108,198 96,208 Z" fill="${c}"/>`,
  hoodie: (c, _g) => `
    <path d="M72,198 L68,215 L68,286 Q120,296 172,286 L172,215 L168,198 L148,210 Q134,192 120,192 Q106,192 92,210 Z" fill="${c}"/>
    <path d="M92,210 Q102,228 120,232 Q138,228 148,210 Q134,192 120,192 Q106,192 92,210 Z" fill="rgba(0,0,0,0.12)"/>`,
  tank: (c, _g) => `<path d="M90,196 L86,218 L86,282 Q120,290 154,282 L154,218 L150,196 Q134,188 120,188 Q106,188 90,196 Z" fill="${c}"/>`,
  striped: (c, _g) => `
    <path d="M74,200 L70,220 L70,284 Q120,294 170,284 L170,220 L166,200 L150,208 Q134,194 120,194 Q106,194 90,208 Z" fill="${c}"/>
    <rect x="70" y="218" width="100" height="8" fill="rgba(255,255,255,0.18)" clip-path="url(#body-clip)"/>
    <rect x="70" y="234" width="100" height="8" fill="rgba(255,255,255,0.18)" clip-path="url(#body-clip)"/>
    <rect x="70" y="250" width="100" height="8" fill="rgba(255,255,255,0.18)" clip-path="url(#body-clip)"/>
    <rect x="70" y="266" width="100" height="8" fill="rgba(255,255,255,0.18)" clip-path="url(#body-clip)"/>`,
  dress: (c, _g) => `
    <path d="M88,200 Q84,210 82,240 L74,286 Q120,298 166,286 L158,240 Q156,210 152,200 L140,208 Q130,198 120,198 Q110,198 100,208 Z" fill="${c}"/>
    <path d="M82,240 Q76,262 74,286 Q120,298 166,286 Q164,262 158,240 Z" fill="${darken(c,10)}"/>`,
  jacket: (c, _g) => `
    <path d="M72,198 L66,218 L66,286 Q120,296 174,286 L174,218 L168,198 L152,208 Q136,192 120,192 Q104,192 88,208 Z" fill="${c}"/>
    <rect x="116" y="196" width="8" height="90" rx="2" fill="${darken(c,18)}"/>
    <rect x="66" y="218" width="18" height="68" rx="4" fill="${darken(c,12)}"/>
    <rect x="156" y="218" width="18" height="68" rx="4" fill="${darken(c,12)}"/>
    <rect x="70" y="238" width="14" height="10" rx="3" fill="${darken(c,25)}"/>
    <rect x="70" y="258" width="14" height="10" rx="3" fill="${darken(c,25)}"/>`,
  uniform: (c, _g) => `
    <path d="M74,200 L70,220 L70,284 Q120,294 170,284 L170,220 L166,200 L150,208 Q134,194 120,194 Q106,194 90,208 Z" fill="${c}"/>
    <path d="M104,208 L110,224 L120,216 L130,224 L136,208 Q124,198 120,198 Q116,198 104,208 Z" fill="${darken(c,20)}"/>
    <line x1="120" y1="216" x2="120" y2="286" stroke="${darken(c,20)}" stroke-width="3"/>
    <rect x="86" y="242" width="10" height="6" rx="2" fill="${darken(c,30)}"/>
    <rect x="86" y="256" width="10" height="6" rx="2" fill="${darken(c,30)}"/>`,
  // Vest — unisex sleeveless V-neck chaleco
  vest: (c, _g) => `
    <path d="M90,196 L86,218 L86,284 Q120,292 154,284 L154,218 L150,196 L138,204 Q130,196 120,196 Q110,196 102,204 Z" fill="${c}"/>
    <path d="M102,204 Q108,220 120,224 Q132,220 138,204 Q130,196 120,196 Q110,196 102,204 Z" fill="${darken(c,16)}"/>
    <rect x="116" y="224" width="8" height="60" rx="2" fill="${darken(c,10)}"/>`,
};

// ---- BOTTOMS ----
const BOTTOMS = {
  pants: (c, gender) => gender === 'girl'
    ? `<path d="M82,282 L82,330 Q100,336 110,330 L118,300 L122,300 L130,330 Q140,336 158,330 L158,282 Z" fill="${c}"/>`
    : `<path d="M78,280 L78,332 Q98,338 112,332 L119,302 L121,302 L128,332 Q142,338 162,332 L162,280 Z" fill="${c}"/>`,
  skirt: (c, _g) => `
    <path d="M92,282 L72,340 L168,340 L148,282 Z" fill="${c}"/>
    <path d="M72,334 L168,334 L168,340 L72,340 Z" fill="${darken(c,12)}"/>
    <line x1="90" y1="290" x2="74" y2="334" stroke="${darken(c,8)}" stroke-width="1" opacity="0.5"/>`,
  shorts: (c, gender) => gender === 'girl'
    ? `<path d="M84,282 L84,310 Q100,316 112,310 L118,296 L122,296 L128,310 Q140,316 156,310 L156,282 Z" fill="${c}"/>`
    : `<path d="M80,280 L80,312 Q98,318 112,312 L119,298 L121,298 L128,312 Q142,318 160,312 L160,280 Z" fill="${c}"/>`,
  // Leggings — slim fitted tapered to ankle
  leggings: (c, _g) => `
    <path d="M84,282 L82,338 Q96,342 110,338 L118,302 L122,302 L130,338 Q144,342 158,338 L156,282 Z" fill="${c}"/>
    <rect x="82" y="334" width="28" height="6" rx="3" fill="${darken(c,14)}"/>
    <rect x="130" y="334" width="28" height="6" rx="3" fill="${darken(c,14)}"/>`,
  // Mini skirt — short trapezoid, narrow waist wide hem
  skirt_mini: (c, _g) => `
    <path d="M90,282 L76,314 L164,314 L150,282 Z" fill="${c}"/>
    <path d="M76,308 L164,308 L164,314 L76,314 Z" fill="${darken(c,12)}"/>
    <line x1="88" y1="290" x2="78" y2="308" stroke="${darken(c,8)}" stroke-width="1" opacity="0.5"/>`,
  // Joggers — relaxed tapered with ribbed cuffs
  joggers: (c, _g) => `
    <path d="M80,282 L80,328 Q98,336 112,328 L119,302 L121,302 L128,328 Q142,336 160,328 L160,282 Z" fill="${c}"/>
    <rect x="80" y="324" width="32" height="10" rx="4" fill="${darken(c,12)}"/>
    <rect x="128" y="324" width="32" height="10" rx="4" fill="${darken(c,12)}"/>
    <line x1="80" y1="328" x2="112" y2="328" stroke="${darken(c,20)}" stroke-width="1.5"/>
    <line x1="128" y1="328" x2="160" y2="328" stroke="${darken(c,20)}" stroke-width="1.5"/>`,
};

// ---- SHOES ----
const SHOES = {
  sneaker: (c) => `
    <ellipse cx="104" cy="334" rx="22" ry="10" fill="${c}"/>
    <ellipse cx="136" cy="334" rx="22" ry="10" fill="${c}"/>
    <rect x="87" y="326" width="32" height="10" rx="4" fill="${darken(c,20)}"/>
    <rect x="121" y="326" width="32" height="10" rx="4" fill="${darken(c,20)}"/>`,
  boot: (c) => `
    <rect x="87" y="316" width="32" height="22" rx="6" fill="${c}"/>
    <rect x="121" y="316" width="32" height="22" rx="6" fill="${c}"/>
    <ellipse cx="103" cy="336" rx="20" ry="6" fill="${darken(c,15)}"/>
    <ellipse cx="137" cy="336" rx="20" ry="6" fill="${darken(c,15)}"/>`,
  sandal: (c) => `
    <ellipse cx="104" cy="335" rx="22" ry="6" fill="${c}"/>
    <ellipse cx="136" cy="335" rx="22" ry="6" fill="${c}"/>
    <line x1="89" y1="328" x2="119" y2="328" stroke="${darken(c,25)}" stroke-width="3"/>
    <line x1="123" y1="328" x2="153" y2="328" stroke="${darken(c,25)}" stroke-width="3"/>`,
  // Heel — high-heel silhouette
  heel: (c) => `
    <path d="M85,328 Q87,338 107,338 Q123,338 125,328 L125,322 Q107,320 85,328 Z" fill="${c}"/>
    <path d="M119,328 Q121,338 141,338 Q157,338 159,328 L159,322 Q141,320 119,328 Z" fill="${c}"/>
    <rect x="85" y="328" width="6" height="14" rx="3" fill="${darken(c,20)}"/>
    <rect x="119" y="328" width="6" height="14" rx="3" fill="${darken(c,20)}"/>`,
  // Knee-high boot
  boot_high: (c) => `
    <rect x="87" y="296" width="30" height="42" rx="6" fill="${c}"/>
    <rect x="121" y="296" width="30" height="42" rx="6" fill="${c}"/>
    <ellipse cx="102" cy="337" rx="19" ry="6" fill="${darken(c,15)}"/>
    <ellipse cx="136" cy="337" rx="19" ry="6" fill="${darken(c,15)}"/>
    <rect x="87" y="308" width="30" height="4" rx="2" fill="${darken(c,10)}"/>
    <rect x="121" y="308" width="30" height="4" rx="2" fill="${darken(c,10)}"/>`,
  // Slipper / loafer — flat round
  slipper: (c) => `
    <ellipse cx="104" cy="334" rx="22" ry="8" fill="${c}"/>
    <ellipse cx="136" cy="334" rx="22" ry="8" fill="${c}"/>
    <path d="M83,330 Q95,322 125,328" fill="none" stroke="${darken(c,18)}" stroke-width="3" stroke-linecap="round"/>
    <path d="M117,328 Q147,322 159,330" fill="none" stroke="${darken(c,18)}" stroke-width="3" stroke-linecap="round"/>`,
};

// ---- HATS ----
const HATS = {
  beanie: (c) => `
    <path d="M54,62 Q52,10 120,6 Q188,10 186,62 Z" fill="${c}"/>
    <rect x="46" y="56" width="148" height="15" rx="7.5" fill="${darken(c,15)}"/>`,
  wizard: (c) => `
    <path d="M120,-26 L86,60 L154,60 Z" fill="${c}"/>
    <ellipse cx="120" cy="60" rx="46" ry="11" fill="${darken(c,10)}"/>
    <path d="M100,22 Q120,10 140,22" fill="none" stroke="#f5c518" stroke-width="2.5"/>`,
  beret: (c) => `
    <ellipse cx="120" cy="24" rx="66" ry="26" fill="${c}"/>
    <circle cx="148" cy="8" r="6" fill="${darken(c,18)}"/>
    <rect x="60" y="38" width="120" height="11" rx="5.5" fill="${darken(c,10)}"/>`,
  cap: (c) => `
    <path d="M58,60 Q56,16 120,12 Q184,16 182,60 Z" fill="${c}"/>
    <rect x="52" y="54" width="136" height="13" rx="6.5" fill="${darken(c,12)}"/>
    <rect x="32" y="60" width="98" height="10" rx="5" fill="${darken(c,8)}"/>`,
  crown: (c) => `
    <rect x="60" y="54" width="120" height="18" rx="4" fill="${darken(c,10)}"/>
    <polygon points="60,54 80,26 100,50 120,20 140,50 160,26 180,54" fill="${c}"/>
    <circle cx="80" cy="30" r="5" fill="${darken(c,30)}"/>
    <circle cx="120" cy="24" r="6" fill="${darken(c,30)}"/>
    <circle cx="160" cy="30" r="5" fill="${darken(c,30)}"/>`,
  top_hat: (c) => `
    <rect x="84" y="10" width="72" height="56" rx="6" fill="${c}"/>
    <rect x="58" y="60" width="124" height="13" rx="6.5" fill="${darken(c,12)}"/>
    <rect x="86" y="22" width="68" height="6" rx="3" fill="${darken(c,20)}"/>`,
};

// ---- CAPES / COATS ----
const CAPES = {
  coat: (c) => `
    <path d="M60,196 L44,290 Q60,310 80,304 L80,196 Z" fill="${c}"/>
    <path d="M180,196 L196,290 Q180,310 160,304 L160,196 Z" fill="${c}"/>
    <rect x="80" y="192" width="12" height="112" rx="4" fill="${darken(c,10)}"/>
    <rect x="148" y="192" width="12" height="112" rx="4" fill="${darken(c,10)}"/>`,
  hp_cape: (c) => `
    <path d="M58,196 L36,296 Q56,318 80,308 L80,196 Z" fill="${c}"/>
    <path d="M182,196 L204,296 Q184,318 160,308 L160,196 Z" fill="${c}"/>
    <path d="M80,196 L80,308 Q120,318 160,308 L160,196 Z" fill="${darken(c,6)}"/>`,
  // Poncho — symmetrical draped sides, no lapels, rounded hem
  poncho: (c) => `
    <path d="M56,200 Q50,240 54,290 Q72,306 88,298 L88,200 Z" fill="${c}"/>
    <path d="M184,200 Q190,240 186,290 Q168,306 152,298 L152,200 Z" fill="${c}"/>
    <path d="M88,200 L88,298 Q120,308 152,298 L152,200 Q136,194 120,192 Q104,194 88,200 Z" fill="${darken(c,8)}"/>
    <path d="M88,200 Q104,206 120,206 Q136,206 152,200 Q136,194 120,192 Q104,194 88,200 Z" fill="${darken(c,16)}"/>`,
  // Short cape — waist-length cape with neck clasp
  short_cape: (c) => `
    <path d="M62,200 Q54,232 60,258 Q76,268 88,262 L88,200 Z" fill="${c}"/>
    <path d="M178,200 Q186,232 180,258 Q164,268 152,262 L152,200 Z" fill="${c}"/>
    <path d="M88,200 L88,262 Q120,272 152,262 L152,200 Q136,194 120,192 Q104,194 88,200 Z" fill="${darken(c,8)}"/>
    <circle cx="120" cy="200" r="5" fill="${darken(c,24)}"/>
    <circle cx="120" cy="200" r="3" fill="${darken(c,10)}"/>`,
  // Cloak — full cape with visible hood draped over shoulders
  cloak: (c) => `
    <path d="M58,196 L36,296 Q56,318 80,308 L80,196 Z" fill="${c}"/>
    <path d="M182,196 L204,296 Q184,318 160,308 L160,196 Z" fill="${c}"/>
    <path d="M80,196 L80,308 Q120,318 160,308 L160,196 Z" fill="${darken(c,6)}"/>
    <path d="M80,196 Q120,186 160,196 Q148,168 120,162 Q92,168 80,196 Z" fill="${darken(c,4)}"/>
    <path d="M86,196 Q120,188 154,196 Q148,172 120,166 Q92,172 86,196 Z" fill="${darken(c,12)}"/>`,
  // Leather vest — sleeveless open vest with zip and pockets
  vest_leather: (c) => `
    <path d="M80,196 L68,286 Q80,294 92,290 L96,196 Z" fill="${c}"/>
    <path d="M160,196 L172,286 Q160,294 148,290 L144,196 Z" fill="${c}"/>
    <path d="M96,196 L92,290 Q120,298 148,290 L144,196 Q136,192 120,191 Q104,192 96,196 Z" fill="${darken(c,10)}"/>
    <line x1="120" y1="196" x2="120" y2="290" stroke="${darken(c,30)}" stroke-width="2" stroke-dasharray="4,3"/>
    <rect x="88" y="238" width="14" height="10" rx="3" fill="${darken(c,20)}"/>
    <rect x="138" y="238" width="14" height="10" rx="3" fill="${darken(c,20)}"/>`,
};

// ---- GLASSES ----
const GLASSES = {
  round: (c) => `
    <circle cx="90" cy="118" r="18" fill="none" stroke="${c}" stroke-width="3"/>
    <circle cx="150" cy="118" r="18" fill="none" stroke="${c}" stroke-width="3"/>
    <line x1="108" y1="118" x2="132" y2="118" stroke="${c}" stroke-width="2.5"/>
    <line x1="72" y1="114" x2="62" y2="110" stroke="${c}" stroke-width="2.5"/>
    <line x1="168" y1="114" x2="178" y2="110" stroke="${c}" stroke-width="2.5"/>`,
  square: (c) => `
    <rect x="72" y="104" width="36" height="28" rx="4" fill="none" stroke="${c}" stroke-width="3"/>
    <rect x="132" y="104" width="36" height="28" rx="4" fill="none" stroke="${c}" stroke-width="3"/>
    <line x1="108" y1="118" x2="132" y2="118" stroke="${c}" stroke-width="2.5"/>
    <line x1="72" y1="114" x2="60" y2="110" stroke="${c}" stroke-width="2.5"/>
    <line x1="168" y1="114" x2="180" y2="110" stroke="${c}" stroke-width="2.5"/>`,
  cat_eye: (c) => `
    <path d="M72,120 Q80,106 102,104 Q114,104 108,120 Z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M132,120 Q138,106 160,104 Q168,106 168,120 Z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/>
    <line x1="108" y1="114" x2="132" y2="114" stroke="${c}" stroke-width="2.5"/>
    <line x1="72" y1="116" x2="62" y2="112" stroke="${c}" stroke-width="2.5"/>
    <line x1="168" y1="112" x2="178" y2="108" stroke="${c}" stroke-width="2.5"/>`,
  aviator: (c) => `
    <path d="M72,112 Q72,130 90,132 Q108,132 108,112 Q108,104 90,104 Q72,104 72,112 Z" fill="rgba(200,230,255,0.15)" stroke="${c}" stroke-width="2.5"/>
    <path d="M132,112 Q132,130 150,132 Q168,132 168,112 Q168,104 150,104 Q132,104 132,112 Z" fill="rgba(200,230,255,0.15)" stroke="${c}" stroke-width="2.5"/>
    <line x1="108" y1="118" x2="132" y2="118" stroke="${c}" stroke-width="2.5"/>
    <line x1="72" y1="110" x2="60" y2="106" stroke="${c}" stroke-width="2.5"/>
    <line x1="168" y1="110" x2="180" y2="106" stroke="${c}" stroke-width="2.5"/>`,
  hp_round: (c) => `
    <circle cx="90" cy="120" r="15" fill="none" stroke="${c}" stroke-width="3.5"/>
    <circle cx="150" cy="120" r="15" fill="none" stroke="${c}" stroke-width="3.5"/>
    <line x1="105" y1="120" x2="135" y2="120" stroke="${c}" stroke-width="2.5"/>
    <line x1="75" y1="116" x2="64" y2="112" stroke="${c}" stroke-width="3"/>
    <line x1="165" y1="116" x2="176" y2="112" stroke="${c}" stroke-width="3"/>`,
  sunglasses: (c) => `
    <rect x="70" y="108" width="40" height="22" rx="8" fill="${c}" opacity="0.85"/>
    <rect x="130" y="108" width="40" height="22" rx="8" fill="${c}" opacity="0.85"/>
    <line x1="110" y1="119" x2="130" y2="119" stroke="${c}" stroke-width="3"/>
    <line x1="70" y1="115" x2="58" y2="111" stroke="${c}" stroke-width="2.5"/>
    <line x1="170" y1="115" x2="182" y2="111" stroke="${c}" stroke-width="2.5"/>`,
};

// ---- BELTS ----
const BELTS = {
  thin: (c) => `
    <rect x="74" y="274" width="92" height="8" rx="4" fill="${c}"/>
    <rect x="116" y="272" width="8" height="12" rx="2" fill="${darken(c,20)}"/>`,
  wide: (c) => `
    <rect x="74" y="270" width="92" height="14" rx="5" fill="${c}"/>
    <rect x="114" y="268" width="12" height="18" rx="3" fill="${darken(c,20)}"/>`,
  // Suspenders — two vertical straps from shoulders to waistband
  suspenders: (c) => `
    <rect x="105" y="200" width="7" height="78" rx="3" fill="${c}"/>
    <rect x="128" y="200" width="7" height="78" rx="3" fill="${c}"/>
    <rect x="101" y="195" width="15" height="8" rx="3" fill="${darken(c,15)}"/>
    <rect x="124" y="195" width="15" height="8" rx="3" fill="${darken(c,15)}"/>`,
};

// ---- HP SCARVES ----
const HP_HOUSES = {
  gryffindor: { c1: '#740001', c2: '#d3a625', name: 'Gryffindor' },
  slytherin:  { c1: '#1a472a', c2: '#aaaaaa', name: 'Slytherin' },
  ravenclaw:  { c1: '#0e1a40', c2: '#aaaaaa', name: 'Ravenclaw' },
  hufflepuff: { c1: '#ecb939', c2: '#372e29', name: 'Hufflepuff' },
};

function svgScarf(house) {
  const { c1, c2 } = HP_HOUSES[house];
  return `
    <!-- scarf base around neck -->
    <rect x="90" y="180" width="60" height="16" rx="8" fill="${c1}"/>
    <!-- stripes -->
    <rect x="96" y="180" width="8" height="16" rx="0" fill="${c2}"/>
    <rect x="112" y="180" width="8" height="16" fill="${c2}"/>
    <rect x="128" y="180" width="8" height="16" fill="${c2}"/>
    <!-- hanging end left -->
    <rect x="92" y="192" width="18" height="44" rx="6" fill="${c1}"/>
    <rect x="94" y="192" width="6" height="44" rx="3" fill="${c2}"/>
    <rect x="102" y="192" width="6" height="44" rx="3" fill="${c1}"/>
    <!-- fringe -->
    <line x1="93" y1="234" x2="91" y2="242" stroke="${c2}" stroke-width="2"/>
    <line x1="97" y1="234" x2="95" y2="242" stroke="${c2}" stroke-width="2"/>
    <line x1="101" y1="234" x2="99" y2="242" stroke="${c2}" stroke-width="2"/>
    <line x1="105" y1="234" x2="103" y2="242" stroke="${c2}" stroke-width="2"/>`;
}

// ---- FREE SCARVES ----
const SCARF2_STYLES = ['solid', 'diagonal', 'checker', 'stripes', 'knit'];

function svgScarf2(style, c1, c2) {
  if (style === 'solid') {
    return `
    <rect x="88" y="178" width="64" height="18" rx="9" fill="${c1}"/>
    <rect x="88" y="188" width="64" height="8" rx="4" fill="${c1}" opacity="0.7"/>`;
  }
  if (style === 'diagonal') {
    return `
    <rect x="88" y="178" width="64" height="18" rx="9" fill="${c1}"/>
    <clipPath id="scarf2-clip"><rect x="88" y="178" width="64" height="18" rx="9"/></clipPath>
    <g clip-path="url(#scarf2-clip)">
      <line x1="94" y1="174" x2="84" y2="200" stroke="${c2}" stroke-width="7" stroke-linecap="butt"/>
      <line x1="108" y1="174" x2="98" y2="200" stroke="${c2}" stroke-width="7" stroke-linecap="butt"/>
      <line x1="122" y1="174" x2="112" y2="200" stroke="${c2}" stroke-width="7" stroke-linecap="butt"/>
      <line x1="136" y1="174" x2="126" y2="200" stroke="${c2}" stroke-width="7" stroke-linecap="butt"/>
      <line x1="150" y1="174" x2="140" y2="200" stroke="${c2}" stroke-width="7" stroke-linecap="butt"/>
    </g>`;
  }
  if (style === 'checker') {
    return `
    <rect x="88" y="178" width="64" height="18" rx="9" fill="${c1}"/>
    <clipPath id="scarf2-clip"><rect x="88" y="178" width="64" height="18" rx="9"/></clipPath>
    <g clip-path="url(#scarf2-clip)">
      <rect x="88" y="178" width="8" height="9" fill="${c2}"/>
      <rect x="96" y="187" width="8" height="9" fill="${c2}"/>
      <rect x="104" y="178" width="8" height="9" fill="${c2}"/>
      <rect x="112" y="187" width="8" height="9" fill="${c2}"/>
      <rect x="120" y="178" width="8" height="9" fill="${c2}"/>
      <rect x="128" y="187" width="8" height="9" fill="${c2}"/>
      <rect x="136" y="178" width="8" height="9" fill="${c2}"/>
      <rect x="144" y="187" width="8" height="9" fill="${c2}"/>
    </g>`;
  }
  if (style === 'stripes') {
    return `
    <rect x="88" y="178" width="64" height="18" rx="9" fill="${c1}"/>
    <clipPath id="scarf2-clip"><rect x="88" y="178" width="64" height="18" rx="9"/></clipPath>
    <g clip-path="url(#scarf2-clip)">
      <rect x="88" y="181" width="64" height="4" fill="${c2}"/>
      <rect x="88" y="189" width="64" height="4" fill="${c2}"/>
    </g>`;
  }
  if (style === 'knit') {
    return `
    <rect x="88" y="178" width="64" height="18" rx="9" fill="${c1}"/>
    <clipPath id="scarf2-clip"><rect x="88" y="178" width="64" height="18" rx="9"/></clipPath>
    <g clip-path="url(#scarf2-clip)">
      <path d="M88,183 Q92,179 96,183 Q100,187 104,183 Q108,179 112,183 Q116,187 120,183 Q124,179 128,183 Q132,187 136,183 Q140,179 144,183 Q148,187 152,183" fill="none" stroke="${c2}" stroke-width="2" stroke-linecap="round"/>
      <path d="M88,191 Q92,187 96,191 Q100,195 104,191 Q108,187 112,191 Q116,195 120,191 Q124,187 128,191 Q132,195 136,191 Q140,187 144,191 Q148,195 152,191" fill="none" stroke="${c2}" stroke-width="2" stroke-linecap="round"/>
    </g>`;
  }
  return '';
}

// ---- HP WANDS ----
// All wands originate from the doll's right hand (~196,256), pointing up-right at ~-38°
const WANDS = {
  elder: `
    <g transform="translate(184,258) rotate(38)">
      <rect x="-4" y="-88" width="8" height="88" rx="4" fill="#3d2b1f"/>
      <ellipse cx="0" cy="-88" rx="8" ry="7" fill="#2a1a0e"/>
      <circle cx="0" cy="-70" r="4" fill="#6b4423"/>
      <circle cx="0" cy="-52" r="3" fill="#6b4423"/>
    </g>`,
  holly: `
    <g transform="translate(184,258) rotate(38)">
      <rect x="-3" y="-80" width="6" height="80" rx="3" fill="#8b4513"/>
      <ellipse cx="0" cy="-80" rx="6" ry="7" fill="#5a2d0c"/>
    </g>`,
  elm: `
    <g transform="translate(184,258) rotate(38)">
      <rect x="-4" y="-84" width="8" height="84" rx="4" fill="#c8a96e"/>
      <ellipse cx="0" cy="-84" rx="9" ry="6" fill="#a07840"/>
    </g>`,
  willow: `
    <g transform="translate(184,258) rotate(38)">
      <path d="M0,0 Q-6,-20 -3,-40 Q0,-60 -2,-80" fill="none" stroke="#8b7355" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="0" cy="-80" rx="7" ry="5" fill="#6b5a3e"/>
    </g>`,
  vine: `
    <g transform="translate(184,258) rotate(38)">
      <rect x="-3" y="-80" width="6" height="80" rx="3" fill="#4a7c3f"/>
      <path d="M-3,-20 Q-12,-28 -8,-38" fill="none" stroke="#5a9e4e" stroke-width="2.5"/>
      <path d="M3,-45 Q12,-53 8,-63" fill="none" stroke="#5a9e4e" stroke-width="2.5"/>
      <ellipse cx="0" cy="-80" rx="5" ry="7" fill="#2d5c24"/>
    </g>`,
  phoenix: `
    <g transform="translate(184,258) rotate(38)">
      <rect x="-3" y="-80" width="6" height="80" rx="3" fill="#6b3d1e"/>
      <path d="M-6,-80 Q0,-92 6,-80 Q0,-70 -6,-80 Z" fill="#e8820c"/>
      <path d="M-3,-78 Q0,-88 3,-78" fill="none" stroke="#f5c518" stroke-width="1.5"/>
    </g>`,
  unicorn: `
    <g transform="translate(184,258) rotate(38)">
      <rect x="-3" y="-80" width="6" height="80" rx="3" fill="#e8e0d0"/>
      <path d="M0,-80 L-4,-96 L0,-90 L4,-96 Z" fill="#d4c5f0"/>
      <ellipse cx="0" cy="-80" rx="5" ry="5" fill="#c8b8e8"/>
    </g>`,
  oak: `
    <g transform="translate(184,258) rotate(38)">
      <path d="M-4,0 Q-5,-40 -3,-80 Q0,-82 3,-80 Q5,-40 4,0" fill="#5c3d1e"/>
      <circle cx="-2" cy="-28" r="4" fill="#4a2e14"/>
      <circle cx="2" cy="-56" r="3.5" fill="#4a2e14"/>
      <ellipse cx="0" cy="-80" rx="7" ry="5" fill="#3a2010"/>
    </g>`,
  // Crystal — angular faceted crystal tip
  crystal: `
    <g transform="translate(184,258) rotate(38)">
      <rect x="-3" y="-68" width="6" height="68" rx="3" fill="#c8b8e8"/>
      <polygon points="0,-84 -7,-68 7,-68" fill="#a990d8"/>
      <polygon points="0,-84 -7,-68 0,-72" fill="#d4c8f0"/>
      <polygon points="0,-84 7,-68 0,-72" fill="#b8a4e0"/>
      <line x1="-3" y1="-68" x2="-3" y2="-16" stroke="#d4c8f0" stroke-width="1" opacity="0.6"/>
    </g>`,
};

// ---- LEFT HAND OBJECTS ----
// Left hand center: boy arm x=38 w=36 → cx=56, hand bottom ≈ y=258
const LEFTHAND = {
  // Potion — round flask with short thin neck, cork, semi-transparent liquid
  potion: (c) => `
    <g transform="translate(56,248) scale(1.1)">
      <!-- Flask body (round) -->
      <circle cx="0" cy="8" r="13" fill="rgba(220,240,255,0.35)" stroke="rgba(180,210,255,0.7)" stroke-width="1.2"/>
      <!-- Liquid fill (semi-transparent, lower half) -->
      <clipPath id="lh-potion-clip"><circle cx="0" cy="8" r="13"/></clipPath>
      <rect x="-13" y="10" width="26" height="11" fill="${c}" opacity="0.55" clip-path="url(#lh-potion-clip)"/>
      <!-- Highlight -->
      <circle cx="-5" cy="2" r="3.5" fill="rgba(255,255,255,0.45)"/>
      <!-- Neck -->
      <rect x="-4" y="-11" width="8" height="11" rx="2" fill="rgba(200,230,255,0.5)" stroke="rgba(180,210,255,0.6)" stroke-width="1"/>
      <!-- Cork -->
      <rect x="-4.5" y="-15" width="9" height="6" rx="2" fill="#c8a46e"/>
      <rect x="-3" y="-14" width="6" height="2" rx="1" fill="#a07840" opacity="0.5"/>
    </g>`,
  // Flower — petals + centre + longer stem + two leaves
  flower: (c) => `
    <g transform="translate(56,244) scale(1.1)">
      <!-- Stem (longer) -->
      <line x1="0" y1="4" x2="0" y2="26" stroke="#4a8c3f" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Leaves -->
      <path d="M0,18 Q-8,13 -6,8" fill="none" stroke="#4a8c3f" stroke-width="2" stroke-linecap="round"/>
      <path d="M0,15 Q8,10 6,5" fill="none" stroke="#4a8c3f" stroke-width="2" stroke-linecap="round"/>
      <!-- Petals (6, rotated) -->
      <g>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="${c}" opacity="0.9"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="${c}" opacity="0.9" transform="rotate(60,0,0)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="${c}" opacity="0.9" transform="rotate(120,0,0)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="${c}" opacity="0.9" transform="rotate(180,0,0)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="${c}" opacity="0.9" transform="rotate(240,0,0)"/>
        <ellipse cx="0" cy="-9" rx="4" ry="7" fill="${c}" opacity="0.9" transform="rotate(300,0,0)"/>
      </g>
      <!-- Centre -->
      <circle cx="0" cy="0" r="5" fill="#f5d84a"/>
      <circle cx="0" cy="0" r="3" fill="#e8b820"/>
    </g>`,
  // Book — closed book held in hand, coloured covers, white pages on spine
  book: (c) => `
    <g transform="translate(56,246) scale(1.5)">
      <!-- Back cover -->
      <rect x="-11" y="-14" width="22" height="26" rx="2" fill="${c}"/>
      <!-- Pages (right side, white block) -->
      <rect x="8" y="-12" width="4" height="22" rx="1" fill="#f0ece0"/>
      <!-- Front cover -->
      <rect x="-11" y="-14" width="19" height="26" rx="2" fill="${c}"/>
      <!-- Cover shadow/edge -->
      <rect x="-11" y="-14" width="3" height="26" rx="1" fill="rgba(0,0,0,0.15)"/>
      <!-- Decorative lines on cover -->
      <line x1="-5" y1="-7" x2="5" y2="-7" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="-5" y1="-3" x2="5" y2="-3" stroke="rgba(255,255,255,0.35)" stroke-width="1" stroke-linecap="round"/>
      <line x1="-5" y1="1" x2="3" y2="1" stroke="rgba(255,255,255,0.35)" stroke-width="1" stroke-linecap="round"/>
    </g>`,
};

// ---- HAIR ----
// Head: cx=120 cy=112 rx=70 ry=77 → top≈35, sides≈50/190, bottom≈189
const HAIR = {
  // Harry Potter — messy short spikes
  harry: (c) => `
    <ellipse cx="120" cy="60" rx="68" ry="34" fill="${c}"/>
    <path d="M52,75 Q48,42 62,34 Q72,26 80,38" fill="${c}"/>
    <path d="M188,75 Q194,50 182,36 Q170,24 160,38" fill="${c}"/>
    <path d="M88,35 Q86,22 96,18 Q108,14 110,28" fill="${c}"/>
    <path d="M110,32 Q112,16 122,14 Q134,12 132,28" fill="${c}"/>
    <path d="M132,34 Q136,18 148,20 Q158,24 152,36" fill="${c}"/>
    <path d="M152,42 Q160,28 170,32 Q178,38 168,48" fill="${c}"/>`,
  // Hermione — long bushy/wavy
  hermione: (c) => `
    <ellipse cx="120" cy="58" rx="70" ry="32" fill="${c}"/>
    <path d="M50,72 Q38,90 40,130 Q42,160 50,178" fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round"/>
    <path d="M190,72 Q202,90 200,130 Q198,160 188,178" fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round"/>
    <path d="M50,72 Q44,110 46,150 Q48,172 52,188" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="0.6"/>
    <path d="M190,72 Q196,110 194,150 Q192,172 186,188" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity="0.6"/>`,
  // Ron — straight medium, side parted
  ron: (c) => `
    <ellipse cx="120" cy="58" rx="68" ry="30" fill="${c}"/>
    <path d="M52,68 Q50,80 52,100 Q54,120 58,140" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round"/>
    <path d="M188,68 Q190,80 188,100 Q186,120 182,140" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round"/>
    <rect x="52" y="44" width="30" height="26" rx="6" fill="${c}"/>`,
  // Draco — slicked back, neat
  draco: (c) => `
    <ellipse cx="120" cy="52" rx="68" ry="24" fill="${c}"/>
    <rect x="52" y="44" width="136" height="20" rx="6" fill="${c}"/>
    <path d="M52,56 Q54,48 72,44 Q120,36 168,44 Q186,48 188,56" fill="${c}" stroke="${c}" stroke-width="2"/>`,
  // Short spiky — punk unisex
  short_spiky: (c) => `
    <ellipse cx="120" cy="56" rx="68" ry="28" fill="${c}"/>
    <path d="M72,44 Q68,28 78,24 Q86,20 88,36" fill="${c}"/>
    <path d="M92,38 Q90,20 102,16 Q114,12 112,32" fill="${c}"/>
    <path d="M112,36 Q114,18 126,16 Q138,16 134,34" fill="${c}"/>
    <path d="M134,38 Q138,22 150,22 Q160,24 156,40" fill="${c}"/>
    <path d="M154,44 Q160,30 170,32 Q178,36 172,50" fill="${c}"/>`,
  // Long straight — past shoulders
  long_straight: (c) => `
    <ellipse cx="120" cy="56" rx="68" ry="28" fill="${c}"/>
    <rect x="50" y="56" width="22" height="140" rx="11" fill="${c}"/>
    <rect x="168" y="56" width="22" height="140" rx="11" fill="${c}"/>
    <rect x="52" y="36" width="136" height="26" rx="8" fill="${c}"/>`,
  // Curly — big afro-style
  curly: (c) => `
    <ellipse cx="120" cy="72" rx="78" ry="48" fill="${c}"/>
    <ellipse cx="64" cy="88" rx="24" ry="22" fill="${c}"/>
    <ellipse cx="176" cy="88" rx="24" ry="22" fill="${c}"/>
    <ellipse cx="86" cy="46" rx="22" ry="20" fill="${c}"/>
    <ellipse cx="154" cy="46" rx="22" ry="20" fill="${c}"/>
    <ellipse cx="120" cy="38" rx="26" ry="18" fill="${c}"/>`,
  // Double buns — kawaii
  buns: (c) => `
    <ellipse cx="120" cy="60" rx="62" ry="26" fill="${c}"/>
    <circle cx="72" cy="44" r="22" fill="${c}"/>
    <circle cx="168" cy="44" r="22" fill="${c}"/>
    <rect x="58" y="52" width="124" height="18" rx="4" fill="${c}"/>`,
  // Ponytail — high
  ponytail: (c) => `
    <ellipse cx="120" cy="58" rx="68" ry="28" fill="${c}"/>
    <ellipse cx="120" cy="36" rx="18" ry="14" fill="${c}"/>
    <path d="M112,36 Q106,20 114,0 Q120,-8 126,0 Q134,20 128,36" fill="${c}"/>
    <rect x="52" y="44" width="136" height="20" rx="6" fill="${c}"/>`,
  // Bob — chin-length
  bob: (c) => `
    <ellipse cx="120" cy="58" rx="68" ry="28" fill="${c}"/>
    <rect x="50" y="56" width="22" height="80" rx="11" fill="${c}"/>
    <rect x="168" y="56" width="22" height="80" rx="11" fill="${c}"/>
    <rect x="52" y="36" width="136" height="26" rx="8" fill="${c}"/>
    <rect x="50" y="128" width="140" height="10" rx="5" fill="${c}"/>`,
  // Side ponytail — high base, long tail falling over right shoulder
  side_ponytail: (c) => `
    <ellipse cx="120" cy="58" rx="68" ry="28" fill="${c}"/>
    <rect x="52" y="44" width="136" height="20" rx="6" fill="${c}"/>
    <ellipse cx="172" cy="46" rx="16" ry="12" fill="${c}"/>
    <path d="M178,50 Q198,80 194,120 Q190,155 182,178" fill="none" stroke="${c}" stroke-width="20" stroke-linecap="round"/>`,
  // Braids — two symmetric long braids with segmented pattern
  braids: (c) => `
    <ellipse cx="120" cy="56" rx="68" ry="26" fill="${c}"/>
    <rect x="52" y="38" width="136" height="22" rx="6" fill="${c}"/>
    <rect x="56" y="62" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="58" y="74" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="56" y="84" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="58" y="96" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="56" y="106" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="58" y="118" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="56" y="128" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="58" y="140" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="56" y="150" width="20" height="10" rx="4" fill="${c}"/>
    <rect x="164" y="62" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="166" y="74" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="164" y="84" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="166" y="96" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="164" y="106" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="166" y="118" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="164" y="128" width="20" height="12" rx="4" fill="${c}"/>
    <rect x="166" y="140" width="16" height="10" rx="3" fill="${c}"/>
    <rect x="164" y="150" width="20" height="10" rx="4" fill="${c}"/>`,
  // Pixie — very short with side-swept fringe
  pixie: (c) => `
    <ellipse cx="120" cy="62" rx="68" ry="18" fill="${c}"/>
    <rect x="52" y="50" width="136" height="16" rx="6" fill="${c}"/>
    <path d="M52,58 Q64,42 96,46 Q110,48 106,60" fill="${c}"/>`,
  // Wavy long — flowing S-curve waves past shoulders
  wavy_long: (c) => `
    <ellipse cx="120" cy="56" rx="68" ry="28" fill="${c}"/>
    <rect x="52" y="36" width="136" height="26" rx="8" fill="${c}"/>
    <path d="M50,68 Q44,90 52,112 Q60,134 50,156 Q42,174 50,192" fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round"/>
    <path d="M190,68 Q196,90 188,112 Q180,134 190,156 Q198,174 190,192" fill="none" stroke="${c}" stroke-width="22" stroke-linecap="round"/>`,
  // Top knot — hair pulled up into a high bun on the crown
  top_knot: (c) => `
    <ellipse cx="120" cy="64" rx="66" ry="20" fill="${c}"/>
    <rect x="54" y="52" width="132" height="16" rx="6" fill="${c}"/>
    <ellipse cx="120" cy="38" rx="22" ry="16" fill="${c}"/>
    <circle cx="120" cy="24" r="18" fill="${c}"/>
    <circle cx="120" cy="24" r="10" fill="${darken(c, 12)}"/>`,
  // Mohawk — shaved sides, tall central crest of spikes
  mohawk: (c) => `
    <ellipse cx="120" cy="66" rx="68" ry="16" fill="${c}"/>
    <path d="M100,60 Q102,44 108,32 Q114,18 120,10 Q126,18 132,32 Q138,44 140,60" fill="${c}"/>
    <path d="M108,58 Q110,46 114,36 Q118,24 120,16 Q122,24 126,36 Q130,46 132,58" fill="${darken(c, 15)}"/>`,
  // Twin tails — two long pigtails hanging from low sides
  twin_tails: (c) => `
    <ellipse cx="120" cy="58" rx="68" ry="28" fill="${c}"/>
    <rect x="52" y="40" width="136" height="24" rx="6" fill="${c}"/>
    <ellipse cx="58" cy="70" rx="14" ry="10" fill="${c}"/>
    <path d="M52,74 Q40,100 44,140 Q46,165 52,188" fill="none" stroke="${c}" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="182" cy="70" rx="14" ry="10" fill="${c}"/>
    <path d="M188,74 Q200,100 196,140 Q194,165 188,188" fill="none" stroke="${c}" stroke-width="20" stroke-linecap="round"/>`,
  // Undercut — shaved sides, thick mass only on top
  undercut: (c) => `
    <ellipse cx="120" cy="66" rx="68" ry="14" fill="${c}"/>
    <ellipse cx="120" cy="50" rx="58" ry="24" fill="${c}"/>
    <path d="M62,52 Q60,36 74,28 Q94,18 120,16 Q146,18 166,28 Q180,36 178,52" fill="${c}"/>`,
};

/* ---------- BACKGROUND SCENES ---------- */
const BG_SCENES = {
  hogwarts: {
    label: 'Hogwarts',
    svg: `
      <!-- Sky gradient base -->
      <rect x="0" y="0" width="240" height="340" fill="#0d1530"/>
      <!-- Stars -->
      <circle cx="20" cy="18" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="55" cy="8" r="1" fill="rgba(255,255,220,0.8)"/>
      <circle cx="90" cy="22" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="130" cy="10" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="170" cy="20" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="210" cy="6" r="1" fill="rgba(255,255,220,0.8)"/>
      <circle cx="40" cy="35" r="0.8" fill="rgba(255,255,220,0.6)"/>
      <circle cx="195" cy="38" r="0.8" fill="rgba(255,255,220,0.6)"/>
      <!-- Moon -->
      <circle cx="195" cy="30" r="14" fill="rgba(255,250,200,0.22)"/>
      <circle cx="200" cy="26" r="11" fill="rgba(20,24,50,0.7)"/>
      <!-- Castle silhouette -->
      <!-- Main body -->
      <rect x="30" y="240" width="180" height="100" fill="rgba(20,22,40,0.82)"/>
      <!-- Battlements main -->
      <rect x="30" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <rect x="48" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <rect x="66" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <rect x="84" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <rect x="144" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <rect x="162" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <rect x="180" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <rect x="198" y="232" width="12" height="12" fill="rgba(20,22,40,0.82)"/>
      <!-- Left tower -->
      <rect x="18" y="190" width="34" height="110" fill="rgba(18,20,38,0.88)"/>
      <polygon points="18,190 35,162 52,190" fill="rgba(18,20,38,0.9)"/>
      <rect x="18" y="182" width="8" height="10" fill="rgba(18,20,38,0.9)"/>
      <rect x="30" y="182" width="8" height="10" fill="rgba(18,20,38,0.9)"/>
      <rect x="42" y="182" width="8" height="10" fill="rgba(18,20,38,0.9)"/>
      <!-- Right tower -->
      <rect x="188" y="200" width="34" height="140" fill="rgba(18,20,38,0.88)"/>
      <polygon points="188,200 205,170 222,200" fill="rgba(18,20,38,0.9)"/>
      <rect x="188" y="192" width="8" height="10" fill="rgba(18,20,38,0.9)"/>
      <rect x="200" y="192" width="8" height="10" fill="rgba(18,20,38,0.9)"/>
      <rect x="212" y="192" width="8" height="10" fill="rgba(18,20,38,0.9)"/>
      <!-- Lit windows -->
      <rect x="44" y="252" width="8" height="11" rx="3" fill="rgba(255,220,100,0.55)"/>
      <rect x="60" y="258" width="8" height="11" rx="3" fill="rgba(255,220,100,0.45)"/>
      <rect x="152" y="248" width="8" height="11" rx="3" fill="rgba(255,220,100,0.55)"/>
      <rect x="170" y="260" width="8" height="11" rx="3" fill="rgba(255,220,100,0.4)"/>
      <rect x="26" y="218" width="6" height="9" rx="2" fill="rgba(255,220,100,0.5)"/>
      <rect x="196" y="228" width="6" height="9" rx="2" fill="rgba(255,220,100,0.5)"/>
      <!-- Ground -->
      <rect x="0" y="316" width="240" height="24" fill="rgba(10,14,28,0.7)"/>`,
  },
  great_hall: {
    label: 'Gran Comedor',
    svg: `
      <!-- Stone ceiling -->
      <rect x="0" y="0" width="240" height="340" fill="#1a1200"/>
      <!-- Ceiling arches -->
      <path d="M0,0 Q60,30 120,0 Q180,30 240,0 L240,50 Q180,80 120,50 Q60,80 0,50 Z" fill="rgba(30,24,18,0.6)"/>
      <!-- Floating candles -->
      <rect x="35" y="42" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="37" cy="40" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="75" y="28" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="77" cy="26" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="115" y="38" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="117" cy="36" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="155" y="25" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="157" cy="23" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="195" y="40" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="197" cy="38" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <!-- Candle strings -->
      <line x1="37" y1="0" x2="37" y2="42" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="77" y1="0" x2="77" y2="28" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="117" y1="0" x2="117" y2="38" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="157" y1="0" x2="157" y2="25" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="197" y1="0" x2="197" y2="40" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <!-- Long tables -->
      <rect x="10" y="300" width="100" height="12" rx="4" fill="rgba(80,55,30,0.7)"/>
      <rect x="130" y="300" width="100" height="12" rx="4" fill="rgba(80,55,30,0.7)"/>
      <!-- Table legs -->
      <rect x="18" y="310" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="96" y="310" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="138" y="310" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="216" y="310" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <!-- Stone floor -->
      <rect x="0" y="322" width="240" height="18" fill="rgba(40,34,28,0.55)"/>
      <line x1="0" y1="330" x2="240" y2="330" stroke="rgba(60,50,40,0.4)" stroke-width="1"/>`,
  },
  forbidden_forest: {
    label: 'Bosque Prohibido',
    svg: `
      <!-- Dark sky -->
      <rect x="0" y="0" width="240" height="340" fill="#0a1a0a"/>
      <!-- Stars -->
      <circle cx="30" cy="15" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="70" cy="25" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="110" cy="10" r="1" fill="rgba(255,255,220,0.6)"/>
      <circle cx="150" cy="20" r="1.2" fill="rgba(255,255,220,0.8)"/>
      <circle cx="190" cy="12" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="50" cy="40" r="0.8" fill="rgba(255,255,220,0.5)"/>
      <circle cx="170" cy="35" r="0.8" fill="rgba(255,255,220,0.5)"/>
      <!-- Full moon -->
      <circle cx="120" cy="50" r="28" fill="rgba(220,230,210,0.2)"/>
      <circle cx="120" cy="50" r="22" fill="rgba(230,240,215,0.18)"/>
      <!-- Tree trunks — back layer -->
      <rect x="0" y="180" width="22" height="160" fill="rgba(15,18,12,0.7)"/>
      <rect x="218" y="200" width="22" height="140" fill="rgba(15,18,12,0.7)"/>
      <rect x="50" y="200" width="16" height="140" fill="rgba(15,18,12,0.6)"/>
      <rect x="170" y="210" width="16" height="130" fill="rgba(15,18,12,0.6)"/>
      <!-- Tree crowns — back -->
      <ellipse cx="11" cy="178" rx="30" ry="50" fill="rgba(10,22,10,0.75)"/>
      <ellipse cx="229" cy="196" rx="28" ry="46" fill="rgba(10,22,10,0.75)"/>
      <ellipse cx="58" cy="196" rx="24" ry="42" fill="rgba(10,22,10,0.65)"/>
      <ellipse cx="178" cy="206" rx="24" ry="40" fill="rgba(10,22,10,0.65)"/>
      <!-- Tree trunks — front layer -->
      <rect x="88" y="240" width="14" height="100" fill="rgba(12,15,10,0.8)"/>
      <rect x="136" y="250" width="14" height="90" fill="rgba(12,15,10,0.8)"/>
      <!-- Tree crowns — front -->
      <ellipse cx="95" cy="236" rx="28" ry="48" fill="rgba(8,18,8,0.82)"/>
      <ellipse cx="143" cy="246" rx="26" ry="44" fill="rgba(8,18,8,0.82)"/>
      <!-- Ground -->
      <rect x="0" y="316" width="240" height="24" fill="rgba(8,14,8,0.75)"/>
      <!-- Ground mist -->
      <ellipse cx="120" cy="320" rx="120" ry="10" fill="rgba(180,200,180,0.08)"/>`,
  },
  platform_934: {
    label: 'Andén 9¾',
    svg: `
      <!-- Station ceiling / sky -->
      <rect x="0" y="0" width="240" height="340" fill="#b0b8c8"/>
      <!-- Steel roof arches -->
      <path d="M0,0 Q120,60 240,0" fill="none" stroke="rgba(160,160,180,0.3)" stroke-width="3"/>
      <path d="M0,20 Q120,80 240,20" fill="none" stroke="rgba(160,160,180,0.2)" stroke-width="2"/>
      <!-- Steam/smoke clouds -->
      <ellipse cx="60" cy="100" rx="40" ry="18" fill="rgba(220,220,230,0.12)"/>
      <ellipse cx="80" cy="88" rx="30" ry="14" fill="rgba(220,220,230,0.1)"/>
      <ellipse cx="160" cy="110" rx="38" ry="16" fill="rgba(220,220,230,0.1)"/>
      <ellipse cx="140" cy="96" rx="28" ry="12" fill="rgba(220,220,230,0.09)"/>
      <!-- Train body -->
      <rect x="0" y="240" width="200" height="60" rx="8" fill="rgba(180,30,30,0.72)"/>
      <!-- Train windows -->
      <rect x="10" y="252" width="22" height="16" rx="4" fill="rgba(255,240,180,0.45)"/>
      <rect x="40" y="252" width="22" height="16" rx="4" fill="rgba(255,240,180,0.45)"/>
      <rect x="70" y="252" width="22" height="16" rx="4" fill="rgba(255,240,180,0.5)"/>
      <rect x="100" y="252" width="22" height="16" rx="4" fill="rgba(255,240,180,0.4)"/>
      <rect x="130" y="252" width="22" height="16" rx="4" fill="rgba(255,240,180,0.45)"/>
      <rect x="160" y="252" width="22" height="16" rx="4" fill="rgba(255,240,180,0.4)"/>
      <!-- Train bottom stripe -->
      <rect x="0" y="292" width="200" height="8" fill="rgba(30,30,30,0.6)"/>
      <!-- Wheels -->
      <circle cx="40" cy="304" r="10" fill="rgba(20,20,20,0.8)"/>
      <circle cx="40" cy="304" r="5" fill="rgba(100,100,110,0.7)"/>
      <circle cx="120" cy="304" r="10" fill="rgba(20,20,20,0.8)"/>
      <circle cx="120" cy="304" r="5" fill="rgba(100,100,110,0.7)"/>
      <!-- Platform -->
      <rect x="0" y="310" width="240" height="30" fill="rgba(90,80,70,0.65)"/>
      <line x1="0" y1="314" x2="240" y2="314" stroke="rgba(120,110,90,0.4)" stroke-width="1"/>
      <!-- Sign 9¾ -->
      <rect x="192" y="270" width="38" height="22" rx="4" fill="rgba(30,30,30,0.7)"/>
      <text x="211" y="286" font-size="11" text-anchor="middle" fill="rgba(255,220,80,0.9)" font-weight="bold">9¾</text>`,
  },
  quidditch: {
    label: 'Quidditch',
    svg: `
      <!-- Open sky -->
      <rect x="0" y="0" width="240" height="340" fill="#1a3a1a"/>
      <!-- Clouds -->
      <ellipse cx="50" cy="40" rx="32" ry="14" fill="rgba(255,255,255,0.1)"/>
      <ellipse cx="66" cy="34" rx="22" ry="12" fill="rgba(255,255,255,0.1)"/>
      <ellipse cx="180" cy="55" rx="28" ry="12" fill="rgba(255,255,255,0.08)"/>
      <ellipse cx="195" cy="48" rx="20" ry="10" fill="rgba(255,255,255,0.08)"/>
      <!-- Stars/sparkles around hoops -->
      <text x="22" y="155" font-size="10" fill="rgba(255,230,80,0.7)">✦</text>
      <text x="210" y="170" font-size="10" fill="rgba(255,230,80,0.7)">✦</text>
      <text x="110" y="60" font-size="8" fill="rgba(255,230,80,0.5)">✦</text>
      <!-- Left goal post -->
      <rect x="10" y="170" width="5" height="120" fill="rgba(160,140,80,0.65)"/>
      <!-- Left hoops -->
      <circle cx="12" cy="170" r="14" fill="none" stroke="rgba(160,140,80,0.7)" stroke-width="4"/>
      <circle cx="12" cy="200" r="14" fill="none" stroke="rgba(160,140,80,0.7)" stroke-width="4"/>
      <circle cx="12" cy="230" r="14" fill="none" stroke="rgba(160,140,80,0.7)" stroke-width="4"/>
      <!-- Right goal post -->
      <rect x="225" y="170" width="5" height="120" fill="rgba(160,140,80,0.65)"/>
      <!-- Right hoops -->
      <circle cx="228" cy="170" r="14" fill="none" stroke="rgba(160,140,80,0.7)" stroke-width="4"/>
      <circle cx="228" cy="200" r="14" fill="none" stroke="rgba(160,140,80,0.7)" stroke-width="4"/>
      <circle cx="228" cy="230" r="14" fill="none" stroke="rgba(160,140,80,0.7)" stroke-width="4"/>
      <!-- Golden snitch -->
      <circle cx="185" cy="90" r="7" fill="rgba(255,210,40,0.8)"/>
      <circle cx="185" cy="90" r="4" fill="rgba(255,230,80,0.9)"/>
      <path d="M175,88 Q168,84 162,88" fill="none" stroke="rgba(255,210,40,0.6)" stroke-width="2"/>
      <path d="M195,88 Q202,84 208,88" fill="none" stroke="rgba(255,210,40,0.6)" stroke-width="2"/>
      <!-- Ground pitch -->
      <rect x="0" y="308" width="240" height="32" fill="rgba(20,60,20,0.55)"/>
      <line x1="120" y1="308" x2="120" y2="340" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <ellipse cx="120" cy="315" rx="50" ry="8" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>`,
  },
};

/* ---------- COLOR HELPERS ---------- */
function darken(hex, amount) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// Wraps svg string in a scale transform around (cx,cy)
// scaleVal: -50..+50 (0 = no change, +50 = 1.5x, -50 = 0.5x)
function scaleWrap(svg, cx, cy, scaleVal) {
  if (!scaleVal) return svg;
  const s = 1 + scaleVal / 100;
  return `<g transform="translate(${cx},${cy}) scale(${s}) translate(${-cx},${-cy})">${svg}</g>`;
}

const CATEGORY_YOFFSET_MAP = {
  eyes:    'eyesYOffset',
  brows:   'browsYOffset',
  nose:    'noseYOffset',
  mouth:   'mouthYOffset',
  hair:    'hairYOffset',
  top:     'topYOffset',
  bottom:  'bottomYOffset',
  shoes:   'shoesYOffset',
  hat:     'hatYOffset',
  cape:    'capeYOffset',
  glasses: 'glassesYOffset',
  belt:    'beltYOffset',
  wand:    'wandYOffset',
  lefthand: 'lefthandYOffset',
};

const CATEGORY_SCALE_MAP = {
  eyes:    'eyesScale',
  brows:   'browsScale',
  nose:    'noseScale',
  mouth:   'mouthScale',
  hair:    'hairScale',
  top:     'topScale',
  bottom:  'bottomScale',
  shoes:   'shoesScale',
  hat:     'hatScale',
  cape:    'capeScale',
  glasses: 'glassesScale',
  belt:    'beltScale',
  wand:    'wandScale',
  lefthand: 'lefthandScale',
};

// SVG origin point for each category's scale transform
const CATEGORY_SCALE_ORIGIN = {
  eyes:    [120, 118],
  brows:   [120,  97],
  nose:    [120, 140],
  mouth:   [120, 165],
  hair:    [120,  60],
  hat:     [120,  45],
  glasses: [120, 115],
  top:     [120, 240],
  bottom:  [120, 300],
  shoes:   [120, 334],
  cape:    [120, 250],
  belt:    [120, 278],
  wand:    [196, 256],
  lefthand: [56, 252],
};

/* ---------- SCENE BACKGROUND COLORS ---------- */
const SCENE_BG = {
  hogwarts:         '#0d1530',
  great_hall:       '#1a1200',
  forbidden_forest: '#0a1a0a',
  platform_934:     '#b0b8c8',
  quidditch:        '#1a3a1a',
};

function applyBgColor() {
  const bg = (doll.bgScene && SCENE_BG[doll.bgScene]) ? SCENE_BG[doll.bgScene] : (doll.bgColor || '#1a2a4a');
  document.querySelector('.canvas-bg').style.background =
    `radial-gradient(ellipse at 50% 60%, ${bg} 0%, ${darken(bg, 20)} 100%)`;
}

/* ---------- STATE ---------- */
const COLLECTION_KEY = 'munecos_kawaii_collection';
const MAX_SLOTS = 4;

function defaultDoll(idx) {
  return {
    name: `Muñeco ${idx + 1}`,
    gender: 'boy',
    skin: '#f5c5a3',
    eyeColor: '#3a7bd5',
    eyes: 'round',
    brows: 'arched',
    nose: 'dot',
    mouth: 'smile',
    top: null, topColor: '#e94560',
    bottom: null, bottomColor: '#3a7bd5',
    shoes: null, shoesColor: '#444444',
    hat: null, hatColor: '#7c3aed',
    cape: null, capeColor: '#1e1e1e',
    glasses: null, glassesColor: '#222222',
    belt: null, beltColor: '#8b4513',
    hair: null, hairColor: '#3d2b1f',
    scarf: null,
    scarf2: null, scarf2Color: '#e94560', scarf2Color2: '#ffffff',
    wand: null,
    lefthand: null, lefthandColor: '#7c3aed',
    bgColor: '#1a2a4a',
    browColor: '#5a3a1a',
    lashColor: '#3d2b1f',
    // scale fields: -50..+50 (0 = normal size)
    eyesScale: 0, browsScale: 0, noseScale: 0, mouthScale: 0,
    hairScale: 0, topScale: 0,   bottomScale: 0, shoesScale: 0,
    hatScale: 0,  capeScale: 0,  glassesScale: 0, beltScale: 0,
    wandScale: 0, lefthandScale: 0,
    // yOffset fields: -15..+15 (0 = normal position, in SVG px)
    eyesYOffset: 0, browsYOffset: 0, noseYOffset: 0, mouthYOffset: 0,
    hairYOffset: 0, topYOffset: 0,   bottomYOffset: 0, shoesYOffset: 0,
    hatYOffset: 0,  capeYOffset: 0,  glassesYOffset: 0, beltYOffset: 0,
    wandYOffset: 0, lefthandYOffset: 0,
    // flip fields (horizontal mirror) for selected categories
    hairFlip: false, hatFlip: false, wandFlip: false, lefthandFlip: false, scarf2Flip: false,
    // background scene
    bgScene: null,
  };
}

function loadCollection() {
  try {
    const raw = localStorage.getItem(COLLECTION_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      while (arr.length < MAX_SLOTS) arr.push(defaultDoll(arr.length));
      return arr.slice(0, MAX_SLOTS);
    }
  } catch (_) {}
  return Array.from({ length: MAX_SLOTS }, (_, i) => defaultDoll(i));
}

function saveCollection() {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

let collection = loadCollection();
let activeSlot = 0;
let doll = collection[activeSlot];

/* ---------- RENDER DOLL ---------- */
function renderDoll(container, d) {
  const sc = (cat, svg) => {
    const origin = CATEGORY_SCALE_ORIGIN[cat];
    const field  = CATEGORY_SCALE_MAP[cat];
    return scaleWrap(svg, origin[0], origin[1], d[field] || 0);
  };
  const yo = (cat, svg) => {
    const field = CATEGORY_YOFFSET_MAP[cat];
    const v = d[field] || 0;
    if (!v) return svg;
    return `<g transform="translate(0,${v})">${svg}</g>`;
  };
  const flip = (cat, svg) => {
    const field = cat + 'Flip';
    if (!d[field]) return svg;
    return `<g transform="translate(240,0) scale(-1,1)">${svg}</g>`;
  };
  const layer = (cat, svg, hasFlip) => yo(cat, hasFlip ? flip(cat, sc(cat, svg)) : sc(cat, svg));
  const parts = [];
  // Background scene (rendered inside the SVG, before base)
  if (d.bgScene && BG_SCENES[d.bgScene]) parts.push(BG_SCENES[d.bgScene].svg);
  parts.push(svgBase(d.gender, d.skin));
  if (d.hair)    parts.push(layer('hair',    (HAIR[d.hair]    || (() => ''))(d.hairColor    || '#3d2b1f'), true));
  if (d.brows)   parts.push(layer('brows',   (BROWS[d.brows]   || (() => ''))(d.browColor || '#5a3a1a'), false));
  if (d.eyes)    parts.push(layer('eyes',    (EYES[d.eyes]    || EYES.round)(d.eyeColor, d.lashColor || d.hairColor || '#3d2b1f'), false));
  if (d.nose)    parts.push(layer('nose',    NOSES[d.nose]    || '', false));
  if (d.mouth)   parts.push(layer('mouth',   MOUTHS[d.mouth]  || '', false));
  if (d.bottom)  parts.push(layer('bottom',  (BOTTOMS[d.bottom] || (() => ''))(d.bottomColor, d.gender), false));
  if (d.belt)    parts.push(layer('belt',    (BELTS[d.belt]   || (() => ''))(d.beltColor), false));
  if (d.top)     parts.push(layer('top',     (TOPS[d.top]     || (() => ''))(d.topColor, d.gender), false));
  if (d.shoes)   parts.push(layer('shoes',   (SHOES[d.shoes]  || (() => ''))(d.shoesColor), false));
  if (d.cape)    parts.push(layer('cape',    (CAPES[d.cape]   || (() => ''))(d.capeColor), false));
  if (d.hat)     parts.push(layer('hat',     (HATS[d.hat]     || (() => ''))(d.hatColor), true));
  if (d.glasses) parts.push(layer('glasses', (GLASSES[d.glasses] || (() => ''))(d.glassesColor), false));
  if (d.scarf)     parts.push(svgScarf(d.scarf));
  if (d.scarf2) {
    let s2 = svgScarf2(d.scarf2, d.scarf2Color || '#e94560', d.scarf2Color2 || '#ffffff');
    if (d.scarf2Flip) s2 = `<g transform="translate(240,0) scale(-1,1)">${s2}</g>`;
    parts.push(s2);
  }
  if (d.wand)      parts.push(layer('wand',     WANDS[d.wand]    || '', true));
  if (d.lefthand)  parts.push(layer('lefthand', (LEFTHAND[d.lefthand] || (() => ''))(d.lefthandColor || '#7c3aed'), true));

  container.innerHTML = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">${parts.join('\n')}</svg>`;
}

function renderAll() {
  renderDoll(document.getElementById('doll-layers'), doll);
  applyBgColor();
  updateEquipped();
  updateSlotTabs();
  syncRightPanel();
}

/* mini SVG for slot tabs */
function renderMini(d) {
  const parts = [svgBase(d.gender, d.skin)];
  if (d.eyes) parts.push((EYES[d.eyes] || EYES.round)(d.eyeColor, d.lashColor || d.hairColor || '#3d2b1f'));
  if (d.top) parts.push((TOPS[d.top] || (() => ''))(d.topColor, d.gender));
  if (d.scarf) parts.push(svgScarf(d.scarf));
  return `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">${parts.join('\n')}</svg>`;
}

/* ---------- EQUIPPED STATE (highlight chips) ---------- */
const CATEGORY_FIELD_MAP = {
  gender: 'gender',
  eyes: 'eyes',
  brows: 'brows',
  nose: 'nose',
  mouth: 'mouth',
  hair: 'hair',
  top: 'top',
  bottom: 'bottom',
  shoes: 'shoes',
  hat: 'hat',
  cape: 'cape',
  glasses: 'glasses',
  belt: 'belt',
  scarf: 'scarf',
  scarf2: 'scarf2',
  wand: 'wand',
  lefthand: 'lefthand',
};

function updateEquipped() {
  document.querySelectorAll('.item-chip').forEach(el => {
    const cat = el.dataset.category;
    const val = el.dataset.value;
    const field = CATEGORY_FIELD_MAP[cat];
    el.classList.toggle('equipped', doll[field] === val);
  });
  document.querySelectorAll('.gender-chip').forEach(el => {
    el.classList.toggle('equipped', doll.gender === el.dataset.value);
  });
}

/* ---------- EQUIP ITEM ---------- */
function equipItem(category, value) {
  const field = CATEGORY_FIELD_MAP[category];
  if (!field) return;
  // toggle off if already equipped (except gender/eyes/brows/nose/mouth — always need one)
  const mandatory = ['gender', 'eyes', 'nose', 'mouth'];
  if (doll[field] === value && !mandatory.includes(category)) {
    doll[field] = null;
  } else {
    doll[field] = value;
  }
  saveCollection();
  renderAll();
}

/* ---------- DRAG & DROP ---------- */
let dragData = null;

function initDragDrop() {
  const dollWrap = document.querySelector('.doll-wrap');

  document.addEventListener('dragstart', e => {
    const chip = e.target.closest('.item-chip');
    if (!chip) return;
    dragData = { category: chip.dataset.category, value: chip.dataset.value };
    chip.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'copy';
  });

  document.addEventListener('dragend', e => {
    const chip = e.target.closest('.item-chip');
    if (chip) chip.classList.remove('dragging');
    dragData = null;
  });

  dollWrap.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    dollWrap.classList.add('drag-over');
  });

  dollWrap.addEventListener('dragleave', () => dollWrap.classList.remove('drag-over'));

  dollWrap.addEventListener('drop', e => {
    e.preventDefault();
    dollWrap.classList.remove('drag-over');
    if (dragData) {
      equipItem(dragData.category, dragData.value);
      dragData = null;
    }
  });

  // Touch support (mobile)
  let touchChip = null;
  document.addEventListener('touchstart', e => {
    const chip = e.target.closest('.item-chip');
    if (chip) touchChip = chip;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (!touchChip) return;
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el && el.closest('.doll-wrap')) {
      equipItem(touchChip.dataset.category, touchChip.dataset.value);
    }
    touchChip = null;
  });
}

/* ---------- SLOT TABS ---------- */
function updateSlotTabs() {
  document.querySelectorAll('.slot-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === activeSlot);
    const mini = tab.querySelector('.slot-mini-svg');
    if (mini) mini.innerHTML = renderMini(collection[i]);
    const nameEl = tab.querySelector('.slot-name');
    if (nameEl) nameEl.textContent = collection[i].name;
  });
}

function switchSlot(idx) {
  activeSlot = idx;
  doll = collection[idx];
  renderAll();
  document.getElementById('doll-name').value = doll.name;
}

/* ---------- RIGHT PANEL SYNC ---------- */
function syncRightPanel() {
  document.getElementById('doll-name').value = doll.name;
  const bgEl = document.getElementById('bg-color');
  if (bgEl) bgEl.value = doll.bgColor || '#1a2a4a';
  document.querySelectorAll('.scene-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.scene === (doll.bgScene || ''));
  });
}

/* ---------- BUILD LEFT PANEL ---------- */
function buildPanel() {
  const panel = document.getElementById('left-panel');
  panel.innerHTML = '';

  const SKIN_PRESETS = [
    { color: '#fde8d0', title: 'Clara' },
    { color: '#f5c5a3', title: 'Media-clara' },
    { color: '#e8a87c', title: 'Media' },
    { color: '#c68642', title: 'Morena' },
    { color: '#8d5524', title: 'Oscura' },
    { color: '#5c3317', title: 'Muy oscura' },
    { color: '#ffe0f0', title: 'Rosa kawaii' },
    { color: '#b8f0e0', title: 'Menta kawaii' },
  ];

  const sections = [
    {
      label: 'Rasgos', icon: '✨', open: true,
      subsections: [
        {
          label: 'Piel', cat: 'skin',
          type: 'skin',
          items: [],
        },
        {
          label: 'Género', cat: 'gender',
          type: 'gender',
          items: [
            { value: 'boy', label: 'Niño', icon: '♂' },
            { value: 'girl', label: 'Niña', icon: '♀' },
          ],
        },
        {
          label: 'Ojos', cat: 'eyes', colorField: 'eyeColor', colorFieldLabel: 'Color ojos', colorField2: 'lashColor', colorField2Label: 'Color pestañas', scaleField: 'eyesScale', yOffsetField: 'eyesYOffset',
          items: Object.keys(EYES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Cejas', cat: 'brows', colorField: 'browColor', scaleField: 'browsScale', yOffsetField: 'browsYOffset',
          items: Object.keys(BROWS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Nariz', cat: 'nose', scaleField: 'noseScale', yOffsetField: 'noseYOffset',
          items: Object.keys(NOSES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Boca', cat: 'mouth', scaleField: 'mouthScale', yOffsetField: 'mouthYOffset',
          items: Object.keys(MOUTHS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Pelo', cat: 'hair', colorField: 'hairColor', scaleField: 'hairScale', yOffsetField: 'hairYOffset',
          flipField: 'hairFlip',
          items: Object.keys(HAIR).map(k => ({ value: k, label: k })),
        },
      ],
    },
    {
      label: 'Ropa', icon: '👕', open: true,
      subsections: [
        {
          label: 'Camiseta / Top', cat: 'top', colorField: 'topColor', scaleField: 'topScale', yOffsetField: 'topYOffset',
          items: Object.keys(TOPS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Pantalón / Falda', cat: 'bottom', colorField: 'bottomColor', scaleField: 'bottomScale', yOffsetField: 'bottomYOffset',
          items: Object.keys(BOTTOMS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Zapatos', cat: 'shoes', colorField: 'shoesColor', scaleField: 'shoesScale', yOffsetField: 'shoesYOffset',
          items: Object.keys(SHOES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Cinturón', cat: 'belt', colorField: 'beltColor', scaleField: 'beltScale', yOffsetField: 'beltYOffset',
          items: Object.keys(BELTS).map(k => ({ value: k, label: k })),
        },
      ],
    },
    {
      label: 'Harry Potter & Extras', icon: '⚡', open: true,
      subsections: [
        {
          label: 'Bufanda HP', cat: 'scarf',
          items: Object.keys(HP_HOUSES).map(k => ({ value: k, label: HP_HOUSES[k].name })),
        },
        {
          label: 'Bufanda libre', cat: 'scarf2',
          colorField: 'scarf2Color', colorFieldLabel: 'Color 1',
          colorField2: 'scarf2Color2', colorField2Label: 'Color 2',
          flipField: 'scarf2Flip',
          items: SCARF2_STYLES.map(k => ({ value: k, label: k })),
        },
        {
          label: 'Varita', cat: 'wand', scaleField: 'wandScale', yOffsetField: 'wandYOffset',
          flipField: 'wandFlip',
          items: Object.keys(WANDS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Objeto mano izq.', cat: 'lefthand',
          colorField: 'lefthandColor', colorFieldLabel: 'Color',
          scaleField: 'lefthandScale', yOffsetField: 'lefthandYOffset',
          flipField: 'lefthandFlip',
          items: Object.keys(LEFTHAND).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Sombrero', cat: 'hat', colorField: 'hatColor', scaleField: 'hatScale', yOffsetField: 'hatYOffset',
          flipField: 'hatFlip',
          items: Object.keys(HATS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Capa / Abrigo', cat: 'cape', colorField: 'capeColor', scaleField: 'capeScale', yOffsetField: 'capeYOffset',
          items: Object.keys(CAPES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Gafas', cat: 'glasses', colorField: 'glassesColor', scaleField: 'glassesScale', yOffsetField: 'glassesYOffset',
          items: Object.keys(GLASSES).map(k => ({ value: k, label: k })),
        },
      ],
    },
  ];

  sections.forEach(sec => {
    const acc = document.createElement('div');
    const hdr = document.createElement('div');
    hdr.className = 'accordion-header' + (sec.open ? ' open' : '');
    hdr.innerHTML = `<span>${sec.icon} ${sec.label}</span><span class="chevron">▶</span>`;
    const body = document.createElement('div');
    body.className = 'accordion-body' + (sec.open ? ' open' : '');

    hdr.addEventListener('click', () => {
      hdr.classList.toggle('open');
      body.classList.toggle('open');
    });

    sec.subsections.forEach(sub => {
      const subHdr = document.createElement('div');
      subHdr.style.cssText = 'font-size:0.7rem;color:var(--text-muted);padding:6px 4px 4px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;';
      subHdr.textContent = sub.label;
      body.appendChild(subHdr);

      // Color picker for this sub-category
      if (sub.colorField) {
        const colorRow = document.createElement('div');
        colorRow.className = 'color-row';
        colorRow.innerHTML = `
          <label>${sub.colorFieldLabel || 'Color'}</label>
          <input type="color" id="clr-${sub.cat}" value="${doll[sub.colorField] || '#ffffff'}"/>`;
        colorRow.querySelector('input').addEventListener('input', e => {
          doll[sub.colorField] = e.target.value;
          saveCollection();
          renderAll();
        });
        body.appendChild(colorRow);
      }

      // Second color picker (e.g. lash color for eyes)
      if (sub.colorField2) {
        const colorRow2 = document.createElement('div');
        colorRow2.className = 'color-row';
        colorRow2.innerHTML = `
          <label>${sub.colorField2Label || 'Color 2'}</label>
          <input type="color" id="clr2-${sub.cat}" value="${doll[sub.colorField2] || '#ffffff'}"/>`;
        colorRow2.querySelector('input').addEventListener('input', e => {
          doll[sub.colorField2] = e.target.value;
          saveCollection();
          renderAll();
        });
        body.appendChild(colorRow2);
      }

      // Special type: skin picker
      if (sub.type === 'skin') {
        const skinGrid = document.createElement('div');
        skinGrid.className = 'left-skin-picker';
        SKIN_PRESETS.forEach(preset => {
          const sw = document.createElement('div');
          sw.className = 'skin-swatch left-swatch' + (doll.skin === preset.color ? ' active' : '');
          sw.style.background = preset.color;
          sw.title = preset.title;
          sw.addEventListener('click', () => {
            doll.skin = preset.color;
            skinGrid.querySelectorAll('.left-swatch').forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            document.querySelectorAll('.skin-swatch').forEach(s => s.classList.toggle('active', s.dataset.color === preset.color));
            const sc = document.getElementById('skin-custom');
            if (sc) sc.value = preset.color;
            saveCollection();
            renderAll();
          });
          skinGrid.appendChild(sw);
        });
        body.appendChild(skinGrid);
        // Custom color for skin
        const skinCustomRow = document.createElement('div');
        skinCustomRow.className = 'color-row';
        skinCustomRow.innerHTML = `<label>Personalizado</label><input type="color" id="left-skin-custom" value="${doll.skin || '#f5c5a3'}"/>`;
        skinCustomRow.querySelector('input').addEventListener('input', e => {
          doll.skin = e.target.value;
          skinGrid.querySelectorAll('.left-swatch').forEach(s => s.classList.remove('active'));
          document.querySelectorAll('.skin-swatch').forEach(s => s.classList.remove('active'));
          const sc = document.getElementById('skin-custom');
          if (sc) sc.value = e.target.value;
          saveCollection();
          renderAll();
        });
        body.appendChild(skinCustomRow);
        return; // skin subsection done — skip chips/sliders
      }

      // Special type: gender (chips only, no grid)
      if (sub.type === 'gender') {
        const gGrid = document.createElement('div');
        gGrid.className = 'item-grid';
        sub.items.forEach(item => {
          const chip = document.createElement('div');
          chip.className = 'item-chip' + (doll.gender === item.value ? ' equipped' : '');
          chip.innerHTML = `<span style="font-size:1.2rem">${item.icon}</span><span>${item.label}</span>`;
          chip.addEventListener('click', () => {
            doll.gender = item.value;
            gGrid.querySelectorAll('.item-chip').forEach(c => c.classList.remove('equipped'));
            chip.classList.add('equipped');
            document.querySelectorAll('.gender-btn').forEach(b => b.classList.toggle('active', b.dataset.gender === item.value));
            saveCollection();
            renderAll();
          });
          gGrid.appendChild(chip);
        });
        body.appendChild(gGrid);
        return; // gender subsection done
      }

      // Item grid (standard chips with hover preview)
      const grid = document.createElement('div');
      grid.className = 'item-grid';
      const FIELD_MAP = {
        eyes: 'eyes', brows: 'brows', nose: 'nose', mouth: 'mouth',
        hair: 'hair', top: 'top', bottom: 'bottom', shoes: 'shoes',
        hat: 'hat', cape: 'cape', glasses: 'glasses', belt: 'belt',
        scarf: 'scarf', scarf2: 'scarf2', wand: 'wand', lefthand: 'lefthand',
      };
      const dollField = FIELD_MAP[sub.cat];

      sub.items.forEach(item => {
        const chip = document.createElement('div');
        chip.className = 'item-chip';
        chip.draggable = true;
        chip.dataset.category = sub.cat;
        chip.dataset.value = item.value;

        // Mini preview SVG
        const previewSvg = buildPreviewSvg(sub.cat, item.value, doll);
        chip.innerHTML = `${previewSvg}<span>${capitalize(item.label)}</span>`;

        chip.addEventListener('click', () => equipItem(sub.cat, item.value));

        // Hover preview (desktop only)
        if (dollField) {
          chip.addEventListener('mouseenter', () => {
            const prev = doll[dollField];
            doll[dollField] = item.value;
            renderDoll(document.getElementById('doll-layers'), doll);
            doll[dollField] = prev;
          });
          chip.addEventListener('mouseleave', () => {
            renderDoll(document.getElementById('doll-layers'), doll);
          });
        }

        grid.appendChild(chip);
      });

      body.appendChild(grid);

      // Scale slider for this sub-category (below the item grid)
      if (sub.scaleField) {
        const curVal = doll[sub.scaleField] || 0;
        const scaleRow = document.createElement('div');
        scaleRow.className = 'scale-row';
        scaleRow.innerHTML = `
          <span class="scale-icon">⤢</span>
          <label>Tamaño</label>
          <input type="range" min="-50" max="50" step="1" value="${curVal}" id="scl-${sub.cat}"/>
          <span class="scale-val" id="scl-val-${sub.cat}">${curVal > 0 ? '+' : ''}${curVal}%</span>`;
        const inp = scaleRow.querySelector('input');
        const lbl = scaleRow.querySelector('.scale-val');
        inp.addEventListener('input', e => {
          const v = parseInt(e.target.value, 10);
          doll[sub.scaleField] = v;
          lbl.textContent = `${v > 0 ? '+' : ''}${v}%`;
          saveCollection();
          renderDoll(document.getElementById('doll-layers'), doll);
        });
        body.appendChild(scaleRow);
      }

      // Y-offset slider for this sub-category (below the scale slider)
      if (sub.yOffsetField) {
        const curOff = doll[sub.yOffsetField] || 0;
        const offsetRow = document.createElement('div');
        offsetRow.className = 'scale-row';
        offsetRow.innerHTML = `
          <span class="scale-icon">↕</span>
          <label>Posición</label>
          <input type="range" min="-15" max="15" step="1" value="${curOff}" id="yoff-${sub.cat}"/>
          <span class="scale-val" id="yoff-val-${sub.cat}">${curOff > 0 ? '+' : ''}${curOff}</span>`;
        const inp2 = offsetRow.querySelector('input');
        const lbl2 = offsetRow.querySelector('.scale-val');
        inp2.addEventListener('input', e => {
          const v = parseInt(e.target.value, 10);
          doll[sub.yOffsetField] = v;
          lbl2.textContent = `${v > 0 ? '+' : ''}${v}`;
          saveCollection();
          renderDoll(document.getElementById('doll-layers'), doll);
        });
        body.appendChild(offsetRow);
      }

      // Reset adjustments button (if scale or yOffset exist)
      if (sub.scaleField || sub.yOffsetField) {
        const resetRow = document.createElement('div');
        resetRow.className = 'reset-row';
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn-reset-adj';
        resetBtn.textContent = '↺ Resetear ajustes';
        resetBtn.addEventListener('click', () => {
          if (sub.scaleField) {
            doll[sub.scaleField] = 0;
            const sclEl = document.getElementById(`scl-${sub.cat}`);
            const sclValEl = document.getElementById(`scl-val-${sub.cat}`);
            if (sclEl) sclEl.value = 0;
            if (sclValEl) sclValEl.textContent = '0%';
          }
          if (sub.yOffsetField) {
            doll[sub.yOffsetField] = 0;
            const offEl = document.getElementById(`yoff-${sub.cat}`);
            const offValEl = document.getElementById(`yoff-val-${sub.cat}`);
            if (offEl) offEl.value = 0;
            if (offValEl) offValEl.textContent = '0';
          }
          saveCollection();
          renderDoll(document.getElementById('doll-layers'), doll);
        });
        resetRow.appendChild(resetBtn);
        body.appendChild(resetRow);
      }

      // Flip toggle button (only for categories with flipField)
      if (sub.flipField) {
        const flipRow = document.createElement('div');
        flipRow.className = 'flip-row';
        const flipBtn = document.createElement('button');
        flipBtn.className = 'btn-flip' + (doll[sub.flipField] ? ' active' : '');
        flipBtn.textContent = '⇄ Espejo';
        flipBtn.addEventListener('click', () => {
          doll[sub.flipField] = !doll[sub.flipField];
          flipBtn.classList.toggle('active', doll[sub.flipField]);
          saveCollection();
          renderDoll(document.getElementById('doll-layers'), doll);
        });
        flipRow.appendChild(flipBtn);
        body.appendChild(flipRow);
      }
    });

    acc.appendChild(hdr);
    acc.appendChild(body);
    panel.appendChild(acc);
  });
}

function buildPreviewSvg(cat, value, d) {
  let inner = '';
  const skin = d.skin || '#f5c5a3';
  const eyeC = d.eyeColor || '#3a7bd5';
  switch (cat) {
    case 'gender':
      inner = svgBase(value, skin);
      break;
    case 'eyes':
      inner = `<ellipse cx="22" cy="22" rx="20" ry="20" fill="#fff2e8"/>` + (EYES[value] || EYES.round)(eyeC, d.lashColor || d.hairColor || '#3d2b1f');
      inner = `<svg viewBox="60 100 120 60" xmlns="http://www.w3.org/2000/svg">${(EYES[value]||EYES.round)(eyeC, d.lashColor || d.hairColor || '#3d2b1f')}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    case 'brows':
      inner = `<svg viewBox="60 82 120 34" xmlns="http://www.w3.org/2000/svg">${(BROWS[value] || (() => ''))(d.browColor || '#5a3a1a')}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    case 'nose':
      inner = `<svg viewBox="96 128 48 32" xmlns="http://www.w3.org/2000/svg">${NOSES[value]||''}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    case 'mouth':
      inner = `<svg viewBox="90 150 60 40" xmlns="http://www.w3.org/2000/svg">${MOUTHS[value]||''}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    case 'hair': {
      const fn = HAIR[value];
      inner = fn ? fn(d.hairColor || '#3d2b1f') : '';
      inner = `<svg viewBox="34 10 172 110" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'top': {
      const fn = TOPS[value];
      inner = fn ? fn(d.topColor || '#e94560', d.gender) : '';
      inner = `<svg viewBox="60 180 120 120" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'bottom': {
      const fn = BOTTOMS[value];
      inner = fn ? fn(d.bottomColor || '#3a7bd5', d.gender) : '';
      inner = `<svg viewBox="70 270 100 80" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'shoes': {
      const fn = SHOES[value];
      inner = fn ? fn(d.shoesColor || '#444') : '';
      inner = `<svg viewBox="60 310 120 40" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'hat': {
      const fn = HATS[value];
      inner = fn ? fn(d.hatColor || '#7c3aed') : '';
      inner = `<svg viewBox="30 0 180 130" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'cape': {
      const fn = CAPES[value];
      inner = fn ? fn(d.capeColor || '#1e1e1e') : '';
      inner = `<svg viewBox="30 180 180 140" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'glasses': {
      const fn = GLASSES[value];
      inner = fn ? fn(d.glassesColor || '#222') : '';
      inner = `<svg viewBox="50 96 140 40" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'belt': {
      const fn = BELTS[value];
      inner = fn ? fn(d.beltColor || '#8b4513') : '';
      inner = `<svg viewBox="68 264 110 30" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'scarf': {
      inner = svgScarf(value);
      inner = `<svg viewBox="80 162 80 80" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'scarf2': {
      inner = svgScarf2(value, d.scarf2Color || '#e94560', d.scarf2Color2 || '#ffffff');
      inner = `<svg viewBox="80 168 80 30" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'wand': {
      inner = WANDS[value] || '';
      inner = `<svg viewBox="120 190 90 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'lefthand': {
      const fn = LEFTHAND[value];
      inner = fn ? fn(d.lefthandColor || '#7c3aed') : '';
      inner = `<svg viewBox="30 220 60 60" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    default:
      return `<div style="width:44px;height:44px;background:var(--surface2);border-radius:8px;"></div>`;
  }
  const svgFull = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  return `<div style="width:44px;height:44px;">${svgFull}</div>`;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* ---------- INIT ---------- */
// ===== EXPORT PNG =====
function exportPng() {
  const btn = document.getElementById('btn-save');
  btn.textContent = 'Exportando...';
  btn.disabled = true;

  // Get the SVG element from the doll layers
  const svgEl = document.querySelector('#doll-layers svg');
  if (!svgEl) {
    btn.textContent = 'Guardar PNG';
    btn.disabled = false;
    return;
  }

  const SIZE = 480; // 2× the viewBox width for a crisp export
  const clone = svgEl.cloneNode(true);
  clone.setAttribute('width', SIZE);
  clone.setAttribute('height', Math.round(SIZE * 340 / 240));
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  // Inline the background color so the PNG isn't transparent
  const bgColor = doll.bgColor || '#1a2a4a';
  const bgDark = darken(bgColor, 20);
  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('width', '240');
  bgRect.setAttribute('height', '340');
  bgRect.setAttribute('fill', bgColor);
  clone.insertBefore(bgRect, clone.firstChild);

  const svgStr = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width  = SIZE;
    canvas.height = Math.round(SIZE * 340 / 240);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);

    canvas.toBlob(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${(doll.name || 'muneco').replace(/\s+/g, '_')}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
      btn.textContent = '¡Descargado!';
      btn.disabled = false;
      setTimeout(() => btn.textContent = 'Guardar PNG', 2000);
    }, 'image/png');
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    btn.textContent = 'Guardar PNG';
    btn.disabled = false;
  };
  img.src = url;
}

// ===== URL SHARING =====
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return new Promise(resolve => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    resolve(ok);
  });
}

function showToast(msg, isError) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast' + (isError ? ' toast-error' : '') + ' show';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2500);
}

function shareDoll() {
  const json = JSON.stringify(doll);
  const compressed = LZString.compressToEncodedURIComponent(json);
  const url = `${location.origin}${location.pathname}#d=${compressed}`;
  copyToClipboard(url).then(ok => {
    if (ok) {
      showToast('¡URL copiada al portapapeles! 🔗');
    } else {
      prompt('Copia esta URL:', url);
    }
  });
}

function loadFromHash() {
  const hash = location.hash;
  if (!hash.startsWith('#d=')) return false;
  try {
    const json = LZString.decompressFromEncodedURIComponent(hash.slice(3));
    const loaded = JSON.parse(json);
    Object.assign(collection[activeSlot], defaultDoll(activeSlot), loaded);
    doll = collection[activeSlot];
    saveCollection();
    history.replaceState(null, '', location.pathname);
    return true;
  } catch (_) { return false; }
}

document.addEventListener('DOMContentLoaded', () => {
  // Build slot tabs
  const slotsEl = document.getElementById('slots');
  collection.forEach((_, i) => {
    const tab = document.createElement('div');
    tab.className = 'slot-tab' + (i === 0 ? ' active' : '');
    tab.innerHTML = `<div class="slot-mini-svg"></div><span class="slot-name"></span>`;
    tab.addEventListener('click', () => switchSlot(i));
    slotsEl.appendChild(tab);
  });

  // Name input
  document.getElementById('doll-name').addEventListener('input', e => {
    doll.name = e.target.value || `Muñeco ${activeSlot + 1}`;
    saveCollection();
    updateSlotTabs();
  });

  // Save/export PNG button
  document.getElementById('btn-save').addEventListener('click', exportPng);

  // Share button
  document.getElementById('btn-share').addEventListener('click', shareDoll);

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', () => {
    const name = doll.name;
    collection[activeSlot] = defaultDoll(activeSlot);
    collection[activeSlot].name = name;
    doll = collection[activeSlot];
    saveCollection();
    buildPanel();
    renderAll();
  });

  // Eye color — managed via left panel only

  // Background color
  document.getElementById('bg-color').addEventListener('input', e => {
    doll.bgColor = e.target.value;
    saveCollection();
    applyBgColor();
  });

  // Scene picker (right panel)
  (function buildScenePicker() {
    const picker = document.getElementById('scene-picker');
    if (!picker) return;
    // "Ninguna" chip
    const noneChip = document.createElement('div');
    noneChip.className = 'scene-chip' + (!doll.bgScene ? ' active' : '');
    noneChip.dataset.scene = '';
    noneChip.innerHTML = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="340" fill="#1a2a4a"/><text x="120" y="175" text-anchor="middle" font-size="40" fill="rgba(255,255,255,0.2)">✕</text></svg><span>Ninguna</span>`;
    noneChip.addEventListener('click', () => {
      doll.bgScene = null;
      saveCollection();
      renderAll();
    });
    picker.appendChild(noneChip);
    // One chip per scene
    const SCENE_LABELS = {
      hogwarts:         'Hogwarts',
      great_hall:       'Gran Comedor',
      forbidden_forest: 'Bosque Prohibido',
      platform_934:     'Andén 9¾',
      quidditch:        'Quidditch',
    };
    Object.keys(BG_SCENES).forEach(key => {
      const scene = BG_SCENES[key];
      const chip = document.createElement('div');
      chip.className = 'scene-chip' + (doll.bgScene === key ? ' active' : '');
      chip.dataset.scene = key;
      const miniSvg = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="340" fill="${SCENE_BG[key] || '#1a2a4a'}"/>${scene.svg}</svg>`;
      chip.innerHTML = `${miniSvg}<span>${SCENE_LABELS[key] || key}</span>`;
      chip.addEventListener('click', () => {
        doll.bgScene = key;
        saveCollection();
        renderAll();
      });
      picker.appendChild(chip);
    });
  })();

  // Drag & drop
  initDragDrop();

  // Load from URL hash if present
  loadFromHash();

  // Build left panel
  buildPanel();

  // Initial render
  renderAll();
});
