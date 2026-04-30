/* ============================================================
   MUNECOS KAWAII — app.js
   ============================================================ */

'use strict';

/* ---------- RESPONSIVE HELPERS ---------- */
const mqMobile = window.matchMedia('(max-width: 767px)');
const mqTablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
function isMobile() { return mqMobile.matches; }
function isTablet() { return mqTablet.matches; }

/* ---------- SVG DEFINITIONS ---------- */

// Returns the base SVG body/head for a given gender, skin color, and optional bodyShape
function svgBase(gender, skin, bodyShape) {
  const isBoy = gender === 'boy';
  const isElf = bodyShape === 'elf';
  // Big round head, slim body — Funko style with rounded shoulders
  return `
  <!-- SHADOW -->
  <ellipse cx="120" cy="328" rx="50" ry="9" fill="rgba(0,0,0,0.18)"/>

  <!-- NECK -->
  <rect x="107" y="178" width="26" height="22" rx="6" fill="${skin}"/>

  <!-- BODY -->
  ${ isBoy
    ? `<path d="M94,197 Q82,197 81,210 L81,270 Q81,285 97,286 Q120,290 143,286 Q159,285 159,270 L159,210 Q158,197 146,197 Z" fill="${skin}"/>`
    : `<path d="M96,197 Q84,197 83,210 L83,252 Q83,265 90,274 Q104,283 120,284 Q136,283 150,274 Q157,265 157,252 L157,210 Q156,197 144,197 Z" fill="${skin}"/>`
  }

  <!-- ARMS -->
  ${ isBoy
    ? `<path d="M81,205 Q61,200 56,215 L60,262 Q62,269 70,269 Q78,269 81,263 Z" fill="${skin}"/>
       <path d="M159,205 Q179,200 184,215 L180,262 Q178,269 170,269 Q162,269 159,263 Z" fill="${skin}"/>`
    : `<ellipse cx="64"  cy="234" rx="12" ry="32" fill="${skin}" transform="rotate(-8,64,234)"/>
       <ellipse cx="176" cy="234" rx="12" ry="32" fill="${skin}" transform="rotate(8,176,234)"/>`
  }

  <!-- HANDS (kawaii finger bumps at wrist bottom) -->
  ${ isBoy
    ? `<circle cx="65" cy="272" r="3" fill="${skin}"/>
       <circle cx="71" cy="274" r="3" fill="${skin}"/>
       <circle cx="77" cy="272" r="3" fill="${skin}"/>
       <circle cx="162" cy="272" r="3" fill="${skin}"/>
       <circle cx="168" cy="274" r="3" fill="${skin}"/>
       <circle cx="174" cy="272" r="3" fill="${skin}"/>`
    : `<circle cx="57" cy="268" r="2.5" fill="${skin}"/>
       <circle cx="61" cy="270" r="2.5" fill="${skin}"/>
       <circle cx="65" cy="268" r="2.5" fill="${skin}"/>
       <circle cx="175" cy="268" r="2.5" fill="${skin}"/>
       <circle cx="179" cy="270" r="2.5" fill="${skin}"/>
       <circle cx="183" cy="268" r="2.5" fill="${skin}"/>`
  }

  <!-- LEGS -->
  ${ isBoy
    ? `<rect x="84" y="282" width="32" height="52" rx="13" fill="${skin}"/>
       <rect x="122" y="282" width="32" height="52" rx="13" fill="${skin}"/>`
    : `<rect x="92" y="283" width="24" height="50" rx="10" fill="${skin}"/>
       <rect x="124" y="283" width="24" height="50" rx="10" fill="${skin}"/>`
  }

  <!-- TOES (kawaii toe bumps at foot bottom) -->
  ${ isBoy
    ? `<circle cx="91" cy="336" r="4" fill="${skin}"/>
       <circle cx="100" cy="338" r="4" fill="${skin}"/>
       <circle cx="109" cy="336" r="4" fill="${skin}"/>
       <circle cx="129" cy="336" r="4" fill="${skin}"/>
       <circle cx="138" cy="338" r="4" fill="${skin}"/>
       <circle cx="147" cy="336" r="4" fill="${skin}"/>`
    : `<circle cx="97" cy="335" r="3" fill="${skin}"/>
       <circle cx="104" cy="337" r="3" fill="${skin}"/>
       <circle cx="111" cy="335" r="3" fill="${skin}"/>
       <circle cx="129" cy="335" r="3" fill="${skin}"/>
       <circle cx="136" cy="337" r="3" fill="${skin}"/>
       <circle cx="143" cy="335" r="3" fill="${skin}"/>`
  }

  ${ isElf ? `
  <!-- DOBBY EARS: large drooping bat ears, rendered before head -->
  <!-- Left ear: wide flap attaching from temple to jaw, tip droops outward-down -->
  <path d="M56,82 Q4,95 2,135 Q4,162 56,152 Z" fill="${skin}"/>
  <path d="M56,90 Q16,102 14,132 Q17,152 56,144" fill="none" stroke="rgba(0,0,0,0.09)" stroke-width="2.5"/>
  <!-- Right ear -->
  <path d="M184,82 Q236,95 238,135 Q236,162 184,152 Z" fill="${skin}"/>
  <path d="M184,90 Q224,102 226,132 Q223,152 184,144" fill="none" stroke="rgba(0,0,0,0.09)" stroke-width="2.5"/>` : `
  <!-- STANDARD EARS: small rounded stubs, head overlaps leaving crescent -->
  <ellipse cx="49" cy="112" rx="10" ry="13" fill="${skin}"/>
  <ellipse cx="191" cy="112" rx="10" ry="13" fill="${skin}"/>` }

  <!-- HEAD (big funko) -->
  <ellipse cx="120" cy="112" rx="70" ry="77" fill="${skin}"/>
  ${ isElf ? `
  <!-- Elf wrinkles: subtle, kawaii -->
  <path d="M98,78 Q120,73 142,78" fill="none" stroke="rgba(0,0,0,0.10)" stroke-width="0.9" stroke-linecap="round"/>
  <path d="M107,87 Q120,83 133,87" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M76,122 Q72,117 75,112" fill="none" stroke="rgba(0,0,0,0.09)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M164,122 Q168,117 165,112" fill="none" stroke="rgba(0,0,0,0.09)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M100,144 Q96,153 99,161" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M140,144 Q144,153 141,161" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M109,183 Q120,179 131,183" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="0.9" stroke-linecap="round"/>
  <path d="M88,222 Q100,218 112,222" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M128,222 Q140,218 152,222" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M98,252 Q120,247 142,252" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="0.8" stroke-linecap="round"/>
  ` : '' }
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
  // Snake — two narrow diagonal slits (Voldemort / Nagini style)
  snake: `
    <line x1="113" y1="138" x2="117" y2="146" stroke="rgba(0,0,0,0.28)" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="123" y1="138" x2="127" y2="146" stroke="rgba(0,0,0,0.28)" stroke-width="1.8" stroke-linecap="round"/>`,
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
  dress_rose: (c, _g) => `
    <path d="M88,200 Q84,210 82,240 L74,286 Q120,298 166,286 L158,240 Q156,210 152,200 L140,208 Q130,198 120,198 Q110,198 100,208 Z" fill="${c}"/>
    <path d="M82,240 Q76,262 74,286 Q120,298 166,286 Q164,262 158,240 Z" fill="${darken(c,10)}"/>
    <!-- Rose petals scattered on skirt -->
    <circle cx="90"  cy="252" r="5" fill="#e8355a"/><circle cx="86"  cy="256" r="3.5" fill="#f06080"/><circle cx="94"  cy="256" r="3.5" fill="#f06080"/><circle cx="90"  cy="259" r="3.5" fill="#f06080"/><circle cx="90"  cy="253" r="2.5" fill="#fff0f3"/>
    <circle cx="115" cy="265" r="5" fill="#c0224a"/><circle cx="111" cy="269" r="3.5" fill="#e04070"/><circle cx="119" cy="269" r="3.5" fill="#e04070"/><circle cx="115" cy="272" r="3.5" fill="#e04070"/><circle cx="115" cy="266" r="2.5" fill="#fff0f3"/>
    <circle cx="140" cy="255" r="5" fill="#e8355a"/><circle cx="136" cy="259" r="3.5" fill="#f06080"/><circle cx="144" cy="259" r="3.5" fill="#f06080"/><circle cx="140" cy="262" r="3.5" fill="#f06080"/><circle cx="140" cy="256" r="2.5" fill="#fff0f3"/>
    <circle cx="100" cy="275" r="4" fill="#c0224a"/><circle cx="97"  cy="278" r="3" fill="#e04070"/><circle cx="103" cy="278" r="3" fill="#e04070"/><circle cx="100" cy="281" r="3" fill="#e04070"/>
    <circle cx="130" cy="278" r="4" fill="#e8355a"/><circle cx="127" cy="281" r="3" fill="#f06080"/><circle cx="133" cy="281" r="3" fill="#f06080"/><circle cx="130" cy="284" r="3" fill="#f06080"/>
    <!-- Small leaves -->
    <ellipse cx="96"  cy="250" rx="3" ry="1.5" fill="#4a8a3a" transform="rotate(-30,96,250)"/>
    <ellipse cx="121" cy="263" rx="3" ry="1.5" fill="#4a8a3a" transform="rotate(20,121,263)"/>
    <ellipse cx="146" cy="253" rx="3" ry="1.5" fill="#4a8a3a" transform="rotate(-40,146,253)"/>`,
  dress_daisy: (c, _g) => `
    <path d="M88,200 Q84,210 82,240 L74,286 Q120,298 166,286 L158,240 Q156,210 152,200 L140,208 Q130,198 120,198 Q110,198 100,208 Z" fill="${c}"/>
    <path d="M82,240 Q76,262 74,286 Q120,298 166,286 Q164,262 158,240 Z" fill="${darken(c,10)}"/>
    <!-- Daisies: white petals + yellow center -->
    <circle cx="95"  cy="218" r="4.5" fill="#ffe135"/>${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="${95+Math.round(7*Math.cos(a*Math.PI/180))}" cy="${218+Math.round(7*Math.sin(a*Math.PI/180))}" rx="3.5" ry="2" fill="#fff" transform="rotate(${a},${95+Math.round(7*Math.cos(a*Math.PI/180))},${218+Math.round(7*Math.sin(a*Math.PI/180))})" opacity="0.95"/>`).join('')}
    <circle cx="145" cy="222" r="4.5" fill="#ffe135"/>${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="${145+Math.round(7*Math.cos(a*Math.PI/180))}" cy="${222+Math.round(7*Math.sin(a*Math.PI/180))}" rx="3.5" ry="2" fill="#fff" transform="rotate(${a},${145+Math.round(7*Math.cos(a*Math.PI/180))},${222+Math.round(7*Math.sin(a*Math.PI/180))})" opacity="0.95"/>`).join('')}
    <circle cx="108" cy="258" r="4"   fill="#ffe135"/>${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="${108+Math.round(6*Math.cos(a*Math.PI/180))}" cy="${258+Math.round(6*Math.sin(a*Math.PI/180))}" rx="3" ry="1.8" fill="#fff" transform="rotate(${a},${108+Math.round(6*Math.cos(a*Math.PI/180))},${258+Math.round(6*Math.sin(a*Math.PI/180))})" opacity="0.92"/>`).join('')}
    <circle cx="135" cy="270" r="4"   fill="#ffe135"/>${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="${135+Math.round(6*Math.cos(a*Math.PI/180))}" cy="${270+Math.round(6*Math.sin(a*Math.PI/180))}" rx="3" ry="1.8" fill="#fff" transform="rotate(${a},${135+Math.round(6*Math.cos(a*Math.PI/180))},${270+Math.round(6*Math.sin(a*Math.PI/180))})" opacity="0.92"/>`).join('')}
    <!-- Stems -->
    <line x1="95" y1="223" x2="97" y2="230" stroke="#5a9a3a" stroke-width="1.2"/>
    <line x1="145" y1="227" x2="143" y2="234" stroke="#5a9a3a" stroke-width="1.2"/>`,
  dress_wildflower: (c, _g) => `
    <path d="M88,200 Q84,210 82,240 L74,286 Q120,298 166,286 L158,240 Q156,210 152,200 L140,208 Q130,198 120,198 Q110,198 100,208 Z" fill="${c}"/>
    <path d="M82,240 Q76,262 74,286 Q120,298 166,286 Q164,262 158,240 Z" fill="${darken(c,10)}"/>
    <!-- Wildflowers: lavender, orange, pink, yellow mixed -->
    <!-- Lavender sprig -->
    <line x1="97" y1="244" x2="97" y2="228" stroke="#5a8a3a" stroke-width="1.5"/>
    <ellipse cx="97" cy="228" rx="2.5" ry="4" fill="#b07ad8"/>
    <ellipse cx="94" cy="233" rx="2" ry="3" fill="#c48ee0"/>
    <ellipse cx="100" cy="232" rx="2" ry="3" fill="#c48ee0"/>
    <!-- Orange poppy -->
    <circle cx="118" cy="220" r="3" fill="#ff8c00"/>
    ${[0,60,120,180,240,300].map(a=>`<ellipse cx="${118+Math.round(5.5*Math.cos(a*Math.PI/180))}" cy="${220+Math.round(5.5*Math.sin(a*Math.PI/180))}" rx="3" ry="2" fill="#ff6a00" transform="rotate(${a},${118+Math.round(5.5*Math.cos(a*Math.PI/180))},${220+Math.round(5.5*Math.sin(a*Math.PI/180))})" opacity="0.9"/>`).join('')}
    <!-- Pink cosmos -->
    <circle cx="143" cy="226" r="3" fill="#ff9ec4"/>
    ${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="${143+Math.round(5*Math.cos(a*Math.PI/180))}" cy="${226+Math.round(5*Math.sin(a*Math.PI/180))}" rx="2.5" ry="1.8" fill="#ffb8d8" transform="rotate(${a},${143+Math.round(5*Math.cos(a*Math.PI/180))},${226+Math.round(5*Math.sin(a*Math.PI/180))})" opacity="0.9"/>`).join('')}
    <!-- Yellow buttercup -->
    <circle cx="104" cy="268" r="3" fill="#ffe040"/>
    ${[0,72,144,216,288].map(a=>`<ellipse cx="${104+Math.round(5*Math.cos(a*Math.PI/180))}" cy="${268+Math.round(5*Math.sin(a*Math.PI/180))}" rx="2.8" ry="1.8" fill="#ffec6e" transform="rotate(${a},${104+Math.round(5*Math.cos(a*Math.PI/180))},${268+Math.round(5*Math.sin(a*Math.PI/180))})" opacity="0.9"/>`).join('')}
    <!-- Mini lavender lower -->
    <line x1="137" y1="280" x2="137" y2="268" stroke="#5a8a3a" stroke-width="1.2"/>
    <ellipse cx="137" cy="268" rx="2" ry="3.5" fill="#b07ad8"/>
    <ellipse cx="134" cy="272" rx="1.8" ry="2.5" fill="#c48ee0"/>
    <ellipse cx="140" cy="272" rx="1.8" ry="2.5" fill="#c48ee0"/>
    <!-- Tiny leaves scattered -->
    <ellipse cx="110" cy="247" rx="3" ry="1.5" fill="#4a8a3a" transform="rotate(-25,110,247)"/>
    <ellipse cx="130" cy="256" rx="3" ry="1.5" fill="#5a9a3a" transform="rotate(15,130,256)"/>
    <ellipse cx="150" cy="270" rx="2.5" ry="1.3" fill="#4a8a3a" transform="rotate(-35,150,270)"/>`,
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
    <ellipse cx="100" cy="334" rx="22" ry="10" fill="${c}"/>
    <ellipse cx="138" cy="334" rx="22" ry="10" fill="${c}"/>
    <rect x="84" y="326" width="32" height="10" rx="4" fill="${darken(c,20)}"/>
    <rect x="122" y="326" width="32" height="10" rx="4" fill="${darken(c,20)}"/>`,
  boot: (c) => `
    <rect x="84" y="316" width="32" height="22" rx="6" fill="${c}"/>
    <rect x="122" y="316" width="32" height="22" rx="6" fill="${c}"/>
    <ellipse cx="100" cy="336" rx="20" ry="6" fill="${darken(c,15)}"/>
    <ellipse cx="138" cy="336" rx="20" ry="6" fill="${darken(c,15)}"/>`,
  sandal: (c) => `
    <ellipse cx="100" cy="335" rx="22" ry="6" fill="${c}"/>
    <ellipse cx="138" cy="335" rx="22" ry="6" fill="${c}"/>
    <line x1="85" y1="328" x2="115" y2="328" stroke="${darken(c,25)}" stroke-width="3"/>
    <line x1="123" y1="328" x2="153" y2="328" stroke="${darken(c,25)}" stroke-width="3"/>`,
  // Heel — high-heel silhouette
  heel: (c) => `
    <path d="M82,328 Q84,338 104,338 Q120,338 122,328 L122,322 Q104,320 82,328 Z" fill="${c}"/>
    <path d="M120,328 Q122,338 142,338 Q158,338 160,328 L160,322 Q142,320 120,328 Z" fill="${c}"/>
    <rect x="82" y="328" width="6" height="14" rx="3" fill="${darken(c,20)}"/>
    <rect x="120" y="328" width="6" height="14" rx="3" fill="${darken(c,20)}"/>`,
  // Knee-high boot
  boot_high: (c) => `
    <rect x="84" y="296" width="32" height="42" rx="6" fill="${c}"/>
    <rect x="122" y="296" width="32" height="42" rx="6" fill="${c}"/>
    <ellipse cx="100" cy="337" rx="20" ry="6" fill="${darken(c,15)}"/>
    <ellipse cx="138" cy="337" rx="20" ry="6" fill="${darken(c,15)}"/>
    <rect x="84" y="308" width="32" height="4" rx="2" fill="${darken(c,10)}"/>
    <rect x="122" y="308" width="32" height="4" rx="2" fill="${darken(c,10)}"/>`,
  // Slipper / loafer — flat round
  slipper: (c) => `
    <ellipse cx="100" cy="334" rx="22" ry="8" fill="${c}"/>
    <ellipse cx="138" cy="334" rx="22" ry="8" fill="${c}"/>
    <path d="M80,330 Q93,322 122,328" fill="none" stroke="${darken(c,18)}" stroke-width="3" stroke-linecap="round"/>
    <path d="M120,328 Q149,322 160,330" fill="none" stroke="${darken(c,18)}" stroke-width="3" stroke-linecap="round"/>`,
};

// ---- SOCKS ----
// Positioned at the lower leg ankles, above shoes. c = primary color, c2 = secondary (stripes/checks)
const SOCKS = {
  plain: (c, _c2, gender) => {
    const [lx, rx, y, w] = gender === 'girl' ? [90,122,313,28] : [84,122,312,32];
    return `
      <rect x="${lx}" y="${y}" width="${w}" height="18" rx="5" fill="${c}"/>
      <rect x="${rx}" y="${y}" width="${w}" height="18" rx="5" fill="${c}"/>`;
  },
  striped: (c, c2, gender) => {
    const [lx, rx, y, w] = gender === 'girl' ? [90,122,313,28] : [84,122,312,32];
    const sc2 = c2 || '#ffffff';
    return `
      <rect x="${lx}" y="${y}" width="${w}" height="18" rx="5" fill="${c}"/>
      <rect x="${rx}" y="${y}" width="${w}" height="18" rx="5" fill="${c}"/>
      <rect x="${lx}" y="${y+4}" width="${w}" height="4" fill="${sc2}" opacity="0.85"/>
      <rect x="${rx}" y="${y+4}" width="${w}" height="4" fill="${sc2}" opacity="0.85"/>
      <rect x="${lx}" y="${y+12}" width="${w}" height="4" fill="${sc2}" opacity="0.85"/>
      <rect x="${rx}" y="${y+12}" width="${w}" height="4" fill="${sc2}" opacity="0.85"/>`;
  },
  checkered: (c, c2, gender) => {
    const [lx, rx, y, w] = gender === 'girl' ? [90,122,313,28] : [84,122,312,32];
    const sc2 = c2 || '#ffffff';
    const hw = Math.round(w / 2);
    return `
      <rect x="${lx}" y="${y}" width="${w}" height="18" rx="5" fill="${c}"/>
      <rect x="${rx}" y="${y}" width="${w}" height="18" rx="5" fill="${c}"/>
      <rect x="${lx}" y="${y}" width="${hw}" height="9" fill="${sc2}" opacity="0.76"/>
      <rect x="${lx+hw}" y="${y+9}" width="${hw}" height="9" fill="${sc2}" opacity="0.76"/>
      <rect x="${rx}" y="${y}" width="${hw}" height="9" fill="${sc2}" opacity="0.76"/>
      <rect x="${rx+hw}" y="${y+9}" width="${hw}" height="9" fill="${sc2}" opacity="0.76"/>`;
  },
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
  // Christmas stockings held by the cuff — hang downward from the hand
  // rotate(-38) makes +y go down-right so the stocking hangs naturally
  sock_grey: `
    <g transform="translate(184,258) rotate(-38)">
      <path d="M-6,10 L-6,50 Q-6,62 2,64 L14,64 Q22,64 22,56 Q22,48 16,48 L6,48 L6,10 Z" fill="#cccccc"/>
      <ellipse cx="-2" cy="58" rx="5" ry="6" fill="rgba(0,0,0,0.13)"/>
      <ellipse cx="19" cy="54" rx="5" ry="6" fill="rgba(0,0,0,0.10)"/>
      <rect x="-9" y="-2" width="18" height="16" rx="7" fill="#e8e8e8"/>
      <line x1="-9" y1="5" x2="9" y2="5" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
      <line x1="-9" y1="10" x2="9" y2="10" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
    </g>`,
  sock_brown: `
    <g transform="translate(184,258) rotate(-38)">
      <path d="M-6,10 L-6,50 Q-6,62 2,64 L14,64 Q22,64 22,56 Q22,48 16,48 L6,48 L6,10 Z" fill="#c28840"/>
      <ellipse cx="-2" cy="58" rx="5" ry="6" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="19" cy="54" rx="5" ry="6" fill="rgba(0,0,0,0.11)"/>
      <rect x="-9" y="-2" width="18" height="16" rx="7" fill="#f0deb0"/>
      <line x1="-9" y1="5" x2="9" y2="5" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
      <line x1="-9" y1="10" x2="9" y2="10" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
    </g>`,
  sock_gryffindor: `
    <g transform="translate(184,258) rotate(-38)">
      <path d="M-6,10 L-6,50 Q-6,62 2,64 L14,64 Q22,64 22,56 Q22,48 16,48 L6,48 L6,10 Z" fill="#740001"/>
      <rect x="-6" y="16" width="12" height="4" fill="#d3a625"/>
      <rect x="-6" y="28" width="12" height="4" fill="#d3a625"/>
      <rect x="-6" y="40" width="12" height="4" fill="#d3a625"/>
      <ellipse cx="-2" cy="58" rx="5" ry="6" fill="rgba(0,0,0,0.18)"/>
      <ellipse cx="19" cy="54" rx="5" ry="6" fill="rgba(0,0,0,0.14)"/>
      <rect x="-9" y="-2" width="18" height="16" rx="7" fill="#f5f5f5"/>
      <line x1="-9" y1="5" x2="9" y2="5" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
      <line x1="-9" y1="10" x2="9" y2="10" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
    </g>`,
  sock_slytherin: `
    <g transform="translate(184,258) rotate(-38)">
      <path d="M-6,10 L-6,50 Q-6,62 2,64 L14,64 Q22,64 22,56 Q22,48 16,48 L6,48 L6,10 Z" fill="#1a472a"/>
      <rect x="-6" y="16" width="12" height="4" fill="#aaaaaa"/>
      <rect x="-6" y="28" width="12" height="4" fill="#aaaaaa"/>
      <rect x="-6" y="40" width="12" height="4" fill="#aaaaaa"/>
      <ellipse cx="-2" cy="58" rx="5" ry="6" fill="rgba(0,0,0,0.18)"/>
      <ellipse cx="19" cy="54" rx="5" ry="6" fill="rgba(0,0,0,0.14)"/>
      <rect x="-9" y="-2" width="18" height="16" rx="7" fill="#f5f5f5"/>
      <line x1="-9" y1="5" x2="9" y2="5" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
      <line x1="-9" y1="10" x2="9" y2="10" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
    </g>`,
  sock_ravenclaw: `
    <g transform="translate(184,258) rotate(-38)">
      <path d="M-6,10 L-6,50 Q-6,62 2,64 L14,64 Q22,64 22,56 Q22,48 16,48 L6,48 L6,10 Z" fill="#0e1a40"/>
      <rect x="-6" y="16" width="12" height="4" fill="#aaaaaa"/>
      <rect x="-6" y="28" width="12" height="4" fill="#aaaaaa"/>
      <rect x="-6" y="40" width="12" height="4" fill="#aaaaaa"/>
      <ellipse cx="-2" cy="58" rx="5" ry="6" fill="rgba(0,0,0,0.18)"/>
      <ellipse cx="19" cy="54" rx="5" ry="6" fill="rgba(0,0,0,0.14)"/>
      <rect x="-9" y="-2" width="18" height="16" rx="7" fill="#f5f5f5"/>
      <line x1="-9" y1="5" x2="9" y2="5" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
      <line x1="-9" y1="10" x2="9" y2="10" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
    </g>`,
  sock_hufflepuff: `
    <g transform="translate(184,258) rotate(-38)">
      <path d="M-6,10 L-6,50 Q-6,62 2,64 L14,64 Q22,64 22,56 Q22,48 16,48 L6,48 L6,10 Z" fill="#ecb939"/>
      <rect x="-6" y="16" width="12" height="4" fill="#372e29"/>
      <rect x="-6" y="28" width="12" height="4" fill="#372e29"/>
      <rect x="-6" y="40" width="12" height="4" fill="#372e29"/>
      <ellipse cx="-2" cy="58" rx="5" ry="6" fill="rgba(0,0,0,0.15)"/>
      <ellipse cx="19" cy="54" rx="5" ry="6" fill="rgba(0,0,0,0.12)"/>
      <rect x="-9" y="-2" width="18" height="16" rx="7" fill="#f5f5f5"/>
      <line x1="-9" y1="5" x2="9" y2="5" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
      <line x1="-9" y1="10" x2="9" y2="10" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
    </g>`,
};

const WAND_LABELS = {
  sock_grey:       'Calcetín gris',
  sock_brown:      'Calcetín marrón',
  sock_gryffindor: 'Calcetín Gryffindor',
  sock_slytherin:  'Calcetín Slytherin',
  sock_ravenclaw:  'Calcetín Ravenclaw',
  sock_hufflepuff: 'Calcetín Hufflepuff',
};

// ---- HP BROOMS ----
// Each broom is split into { back, front } at x=105 (y≈285 on the pole line).
// back  = pole tip/handle from (30,270) → (105,285) — rendered BEFORE svgBase (behind body/legs)
// front = pole from (105,285) → (215,308) + grip + bristles + tie — rendered between bottom and belt
// Cut point on pole line (30,270)→(215,308): x=105 → y = 270 + 38*(105-30)/185 ≈ 285
const BROOMS = {
  // Nimbus 2000 — pale-wood pole, compact bristle bundle, gold ring at handle tip
  nimbus_2000: {
    back: `
    <g>
      <!-- Pole back segment: tip (30,270) → cut (105,285) -->
      <line x1="30" y1="270" x2="105" y2="285" stroke="#c8a46e" stroke-width="5" stroke-linecap="round"/>
      <!-- Gold handle ring at tip -->
      <ellipse cx="33" cy="271" rx="5" ry="3" fill="none" stroke="#d4a017" stroke-width="2" transform="rotate(12,33,271)"/>
    </g>`,
    front: `
    <g>
      <!-- Pole front segment: cut (105,285) → tail (215,308) -->
      <line x1="105" y1="285" x2="215" y2="308" stroke="#c8a46e" stroke-width="5" stroke-linecap="round"/>
      <!-- Handle grip (darker centre segment, fully in front) -->
      <line x1="105" y1="285" x2="140" y2="291" stroke="#a07840" stroke-width="7" stroke-linecap="round"/>
      <!-- Bristles: compact symmetrical fan -->
      <line x1="212" y1="307" x2="228" y2="292" stroke="#8b7355" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="230" y2="297" stroke="#8b7355" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="231" y2="303" stroke="#8b7355" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="230" y2="308" stroke="#8b7355" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="228" y2="314" stroke="#8b7355" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="225" y2="319" stroke="#8b7355" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="221" y2="322" stroke="#8b7355" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Bristle tie band -->
      <line x1="206" y1="305" x2="209" y2="318" stroke="#6b5a3e" stroke-width="2.5" stroke-linecap="round"/>
    </g>`,
  },

  // Nimbus 2001 — darker mahogany pole, wider fan bristles, silver fittings
  nimbus_2001: {
    back: `
    <g>
      <!-- Pole back segment -->
      <line x1="30" y1="270" x2="105" y2="285" stroke="#8b5e3c" stroke-width="5" stroke-linecap="round"/>
      <!-- Wood grain on back segment -->
      <line x1="55" y1="275" x2="95" y2="283" stroke="#a07050" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
      <!-- Silver handle cap -->
      <ellipse cx="33" cy="271" rx="5" ry="3" fill="#c0c0c0" stroke="#a0a0a0" stroke-width="1" transform="rotate(12,33,271)"/>
    </g>`,
    front: `
    <g>
      <!-- Pole front segment -->
      <line x1="105" y1="285" x2="215" y2="308" stroke="#8b5e3c" stroke-width="5" stroke-linecap="round"/>
      <!-- Wood grain on front segment -->
      <line x1="125" y1="289" x2="165" y2="297" stroke="#a07050" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
      <!-- Handle grip -->
      <line x1="105" y1="285" x2="140" y2="291" stroke="#6b3d1e" stroke-width="7" stroke-linecap="round"/>
      <!-- Bristles: wider fan -->
      <line x1="212" y1="307" x2="230" y2="288" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="232" y2="294" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="233" y2="301" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="233" y2="307" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="232" y2="313" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="229" y2="319" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="225" y2="324" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="220" y2="327" stroke="#7a6548" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Silver bristle band -->
      <line x1="205" y1="305" x2="209" y2="319" stroke="#b0b0b0" stroke-width="2.5" stroke-linecap="round"/>
    </g>`,
  },

  // Firebolt — sleek dark mahogany, black grip, razor-thin even bristles
  firebolt: {
    back: `
    <g>
      <!-- Pole back segment — rich mahogany -->
      <line x1="30" y1="270" x2="105" y2="285" stroke="#7c3010" stroke-width="5" stroke-linecap="round"/>
      <!-- Lacquer sheen on back -->
      <line x1="48" y1="273" x2="100" y2="284" stroke="#a04020" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
      <!-- Polished silver handle ferrule -->
      <rect x="26" y="266" width="10" height="6" rx="2" fill="#d0d0d0" stroke="#a0a0a0" stroke-width="0.8" transform="rotate(12,31,269)"/>
    </g>`,
    front: `
    <g>
      <!-- Pole front segment -->
      <line x1="105" y1="285" x2="215" y2="308" stroke="#7c3010" stroke-width="5" stroke-linecap="round"/>
      <!-- Lacquer sheen on front -->
      <line x1="108" y1="285" x2="198" y2="304" stroke="#a04020" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
      <!-- Black striped grip -->
      <line x1="105" y1="285" x2="138" y2="290" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
      <line x1="108" y1="285" x2="114" y2="286" stroke="#3a3a3a" stroke-width="2" stroke-linecap="round"/>
      <line x1="118" y1="287" x2="124" y2="288" stroke="#3a3a3a" stroke-width="2" stroke-linecap="round"/>
      <line x1="128" y1="289" x2="134" y2="290" stroke="#3a3a3a" stroke-width="2" stroke-linecap="round"/>
      <!-- Bristles: ultra-thin, perfectly even -->
      <line x1="213" y1="307" x2="228" y2="290" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="230" y2="294" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="231" y2="299" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="232" y2="303" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="232" y2="307" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="231" y2="311" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="229" y2="315" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="226" y2="319" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="213" y1="307" x2="222" y2="322" stroke="#6b5030" stroke-width="1.2" stroke-linecap="round"/>
      <!-- Thin black bristle band -->
      <line x1="206" y1="305" x2="209" y2="317" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
    </g>`,
  },

  // Cleansweep 11 — dark green pole, sturdy V-spread bristles, metal reinforcements
  cleansweep: {
    back: `
    <g>
      <!-- Pole back segment — dark green -->
      <line x1="30" y1="270" x2="105" y2="285" stroke="#3a5c2a" stroke-width="6" stroke-linecap="round"/>
      <!-- Metal reinforcement band on back -->
      <line x1="60" y1="276" x2="65" y2="277" stroke="#888" stroke-width="3" stroke-linecap="round"/>
      <!-- Bronze handle cap -->
      <ellipse cx="33" cy="271" rx="5" ry="3" fill="#cd7f32" stroke="#a06020" stroke-width="1" transform="rotate(12,33,271)"/>
    </g>`,
    front: `
    <g>
      <!-- Pole front segment -->
      <line x1="105" y1="285" x2="215" y2="308" stroke="#3a5c2a" stroke-width="6" stroke-linecap="round"/>
      <!-- Metal reinforcement band on front -->
      <line x1="165" y1="297" x2="170" y2="298" stroke="#888" stroke-width="3" stroke-linecap="round"/>
      <!-- Handle grip — darker green -->
      <line x1="105" y1="285" x2="140" y2="291" stroke="#2a4a1a" stroke-width="8" stroke-linecap="round"/>
      <!-- Bristles: wide V, sturdy -->
      <line x1="212" y1="307" x2="231" y2="287" stroke="#8b7355" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="233" y2="294" stroke="#8b7355" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="234" y2="301" stroke="#8b7355" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="234" y2="308" stroke="#8b7355" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="232" y2="315" stroke="#8b7355" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="228" y2="321" stroke="#8b7355" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="222" y2="326" stroke="#8b7355" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Sturdy bristle band -->
      <line x1="205" y1="305" x2="209" y2="320" stroke="#5a4a2e" stroke-width="3" stroke-linecap="round"/>
    </g>`,
  },

  // Comet 260 — mahogany with grain, long swept-back curved bristles like a comet tail
  comet_260: {
    back: `
    <g>
      <!-- Pole back segment — mahogany -->
      <line x1="30" y1="270" x2="105" y2="285" stroke="#8b4513" stroke-width="5" stroke-linecap="round"/>
      <!-- Wood vein on back -->
      <line x1="52" y1="274" x2="98" y2="284" stroke="#a0522d" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
      <!-- Copper handle ring -->
      <ellipse cx="33" cy="271" rx="5" ry="3" fill="none" stroke="#cd7f32" stroke-width="2" transform="rotate(12,33,271)"/>
    </g>`,
    front: `
    <g>
      <!-- Pole front segment -->
      <line x1="105" y1="285" x2="215" y2="308" stroke="#8b4513" stroke-width="5" stroke-linecap="round"/>
      <!-- Wood vein on front -->
      <line x1="108" y1="285" x2="192" y2="303" stroke="#a0522d" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
      <!-- Handle grip -->
      <line x1="105" y1="285" x2="140" y2="291" stroke="#6b2e0e" stroke-width="7" stroke-linecap="round"/>
      <!-- Bristles: long, swept back, curving like comet tail -->
      <path d="M212,307 Q222,298 232,288" fill="none" stroke="#9b8465" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M212,307 Q224,301 235,294" fill="none" stroke="#9b8465" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M212,307 Q225,305 236,301" fill="none" stroke="#9b8465" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M212,307 Q225,308 235,308" fill="none" stroke="#9b8465" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M212,307 Q224,311 233,314" fill="none" stroke="#9b8465" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M212,307 Q222,315 229,321" fill="none" stroke="#9b8465" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M212,307 Q219,319 223,327" fill="none" stroke="#9b8465" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Bristle tie -->
      <line x1="205" y1="305" x2="209" y2="318" stroke="#6b5030" stroke-width="2.5" stroke-linecap="round"/>
    </g>`,
  },

  // Oakshaft 79 — thick oak pole, knots, rustic uneven bristles
  oakshaft: {
    back: `
    <g>
      <!-- Thick oak pole back segment -->
      <line x1="30" y1="270" x2="105" y2="285" stroke="#6b4423" stroke-width="7" stroke-linecap="round"/>
      <!-- Knot on back segment -->
      <ellipse cx="68" cy="276" rx="5" ry="3" fill="#4a2e14" transform="rotate(12,68,276)"/>
      <!-- Rough twine wrap on back segment -->
      <line x1="85" y1="279" x2="91" y2="280" stroke="#8b7355" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="95" y1="281" x2="101" y2="282" stroke="#8b7355" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Rustic blunt handle end -->
      <ellipse cx="33" cy="271" rx="5" ry="3.5" fill="#4a2e14" transform="rotate(12,33,271)"/>
    </g>`,
    front: `
    <g>
      <!-- Thick oak pole front segment -->
      <line x1="105" y1="285" x2="215" y2="308" stroke="#6b4423" stroke-width="7" stroke-linecap="round"/>
      <!-- Knot on front segment -->
      <ellipse cx="158" cy="295" rx="4" ry="2.5" fill="#4a2e14" transform="rotate(12,158,295)"/>
      <!-- Rough twine wrap on front segment -->
      <line x1="108" y1="285" x2="114" y2="286" stroke="#8b7355" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="118" y1="287" x2="124" y2="288" stroke="#8b7355" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="128" y1="289" x2="134" y2="290" stroke="#8b7355" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="138" y1="291" x2="144" y2="292" stroke="#8b7355" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Bristles: thick, irregular, rustic -->
      <line x1="212" y1="307" x2="229" y2="288" stroke="#7a6040" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="232" y2="295" stroke="#7a6040" stroke-width="2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="233" y2="303" stroke="#7a6040" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="232" y2="309" stroke="#7a6040" stroke-width="2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="230" y2="316" stroke="#7a6040" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="225" y2="323" stroke="#7a6040" stroke-width="2" stroke-linecap="round"/>
      <line x1="212" y1="307" x2="218" y2="328" stroke="#7a6040" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Rough twine bristle tie -->
      <line x1="205" y1="305" x2="209" y2="321" stroke="#8b7355" stroke-width="3.5" stroke-linecap="round"/>
    </g>`,
  },
};

// ---- TATTOOS ----
// All designs centered at (120,145) — left cheek by default.
// Use tattooXOffset/tattooYOffset to reposition anywhere on the body.
// Color is user-controlled via tattooColor.
const TATTOOS = {
  // Lightning bolt — Harry Potter's scar
  lightning: (c) => `
    <g transform="translate(120,145)">
      <polygon points="2,-11 -3,-1 2,-1 -2,11 3,1 -2,1" fill="${c}"/>
    </g>`,

  // Heart — simple bold heart
  heart: (c) => `
    <g transform="translate(120,145)">
      <path d="M0,8 C-1,6 -9,1 -9,-4 C-9,-8 -6,-10 -3,-10 C-1,-10 0,-9 0,-8 C0,-9 1,-10 3,-10 C6,-10 9,-8 9,-4 C9,1 1,6 0,8 Z" fill="${c}"/>
    </g>`,

  // Deathly Hallows symbol — triangle + circle + vertical line
  deathly_hallows: (c) => `
    <g transform="translate(120,145)">
      <!-- Triangle -->
      <polygon points="0,-12 -10,8 10,8" fill="none" stroke="${c}" stroke-width="1.5"/>
      <!-- Circle -->
      <circle cx="0" cy="3" r="5" fill="none" stroke="${c}" stroke-width="1.5"/>
      <!-- Vertical line (Elder Wand) -->
      <line x1="0" y1="-12" x2="0" y2="8" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
    </g>`,

  // Dark Mark — skull with snake
  dark_mark: (c) => `
    <g transform="translate(120,145)">
      <!-- Skull -->
      <ellipse cx="0" cy="-6" rx="7" ry="6" fill="none" stroke="${c}" stroke-width="1.4"/>
      <!-- Eye sockets -->
      <ellipse cx="-2.5" cy="-7" rx="1.5" ry="1.5" fill="${c}"/>
      <ellipse cx="2.5" cy="-7" rx="1.5" ry="1.5" fill="${c}"/>
      <!-- Jaw -->
      <path d="M-5,-1 Q-4,1 0,1 Q4,1 5,-1" fill="none" stroke="${c}" stroke-width="1.2"/>
      <!-- Teeth -->
      <line x1="-2" y1="-1" x2="-2" y2="1" stroke="${c}" stroke-width="1"/>
      <line x1="0" y1="-1" x2="0" y2="1" stroke="${c}" stroke-width="1"/>
      <line x1="2" y1="-1" x2="2" y2="1" stroke="${c}" stroke-width="1"/>
      <!-- Snake body coming out of skull -->
      <path d="M0,1 Q-5,5 -3,8 Q0,11 3,8 Q6,5 4,10" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Snake tongue -->
      <path d="M4,10 L5,12 M4,10 L3,12" fill="none" stroke="${c}" stroke-width="1" stroke-linecap="round"/>
    </g>`,

  // Golden Snitch — small winged ball
  golden_snitch: (c) => `
    <g transform="translate(120,145)">
      <!-- Ball -->
      <circle cx="0" cy="0" r="5" fill="${c}" opacity="0.9"/>
      <circle cx="-1.5" cy="-1.5" r="1.5" fill="rgba(255,255,255,0.5)"/>
      <!-- Left wing -->
      <path d="M-5,0 Q-12,-8 -10,-2 Q-12,2 -5,1" fill="${c}" opacity="0.7"/>
      <!-- Right wing -->
      <path d="M5,0 Q12,-8 10,-2 Q12,2 5,1" fill="${c}" opacity="0.7"/>
    </g>`,

  // "Always" — Snape's eternal promise, italic script
  always: (c) => `
    <g transform="translate(120,145)">
      <text x="0" y="0" text-anchor="middle" dominant-baseline="middle"
            font-family="Georgia, serif" font-style="italic" font-size="9"
            fill="${c}">Always</text>
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

// ---- PETS ----
// Centered at (0,0), ~30-40px tall. outfitKey uses HP_HOUSES[key].c1/.c2 for stripes
const PETS = {
  rat: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const vest = h ? `
      <rect x="-8" y="-4" width="16" height="14" rx="3" fill="${h.c1}" opacity="0.9"/>
      <rect x="-8" y="-1" width="16" height="3" rx="0" fill="${h.c2}" opacity="0.85"/>
      <rect x="-8" y="5" width="16" height="3" rx="0" fill="${h.c2}" opacity="0.85"/>` : '';
    return `<g>
      <!-- Tail (curvy) -->
      <path d="M12,8 Q22,2 18,-8 Q14,-14 20,-18" fill="none" stroke="#b8a090" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Body (grey oval) -->
      <ellipse cx="0" cy="4" rx="14" ry="10" fill="#b8a8a0"/>
      <ellipse cx="0" cy="4" rx="14" ry="10" fill="rgba(255,255,255,0.1)"/>
      ${vest}
      <!-- Ears -->
      <ellipse cx="-8" cy="-9" rx="6" ry="5" fill="#c8b8b0"/>
      <ellipse cx="-8" cy="-9" rx="4" ry="3.5" fill="#e8b8b0"/>
      <ellipse cx="8" cy="-9" rx="6" ry="5" fill="#c8b8b0"/>
      <ellipse cx="8" cy="-9" rx="4" ry="3.5" fill="#e8b8b0"/>
      <!-- Head -->
      <ellipse cx="0" cy="-4" rx="10" ry="8" fill="#c0b0a8"/>
      <!-- Eyes (kawaii) -->
      <circle cx="-4" cy="-5" r="2.2" fill="#1a1a1a"/>
      <circle cx="-3.2" cy="-5.8" r="0.8" fill="#fff"/>
      <circle cx="4" cy="-5" r="2.2" fill="#1a1a1a"/>
      <circle cx="4.8" cy="-5.8" r="0.8" fill="#fff"/>
      <!-- Nose -->
      <ellipse cx="0" cy="-2" rx="1.8" ry="1.2" fill="#e8a0a0"/>
      <!-- Whiskers -->
      <line x1="-10" y1="-3" x2="-3" y2="-2" stroke="#8a7a70" stroke-width="0.6" opacity="0.6"/>
      <line x1="-10" y1="-1" x2="-3" y2="-1" stroke="#8a7a70" stroke-width="0.6" opacity="0.6"/>
      <line x1="3" y1="-2" x2="10" y2="-3" stroke="#8a7a70" stroke-width="0.6" opacity="0.6"/>
      <line x1="3" y1="-1" x2="10" y2="-1" stroke="#8a7a70" stroke-width="0.6" opacity="0.6"/>
      <!-- Feet -->
      <ellipse cx="-6" cy="13" rx="3.5" ry="2" fill="#c0b0a8"/>
      <ellipse cx="6" cy="13" rx="3.5" ry="2" fill="#c0b0a8"/>
    </g>`;
  },
  toad: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const bib = h ? `
      <path d="M-10,-2 Q0,-10 10,-2 L8,8 Q0,12 -8,8 Z" fill="${h.c1}" opacity="0.85"/>
      <rect x="-7" y="0" width="14" height="3" rx="0" fill="${h.c2}" opacity="0.8"/>
      <rect x="-6" y="5" width="12" height="2.5" rx="0" fill="${h.c2}" opacity="0.8"/>` : '';
    return `<g>
      <!-- Body (green rounded) -->
      <ellipse cx="0" cy="4" rx="16" ry="13" fill="#5a8a50"/>
      <ellipse cx="0" cy="6" rx="14" ry="10" fill="#6aa060"/>
      <!-- Spots -->
      <circle cx="-7" cy="2" r="2.5" fill="#4a7a42" opacity="0.5"/>
      <circle cx="5" cy="6" r="2" fill="#4a7a42" opacity="0.5"/>
      <circle cx="8" cy="-1" r="1.8" fill="#4a7a42" opacity="0.5"/>
      ${bib}
      <!-- Eyes (bulging) -->
      <circle cx="-7" cy="-10" r="5.5" fill="#6aa060"/>
      <circle cx="-7" cy="-10" r="4" fill="#e8e8d0"/>
      <circle cx="-7" cy="-10" r="2.5" fill="#1a1a1a"/>
      <circle cx="-6.2" cy="-10.8" r="0.9" fill="#fff"/>
      <circle cx="7" cy="-10" r="5.5" fill="#6aa060"/>
      <circle cx="7" cy="-10" r="4" fill="#e8e8d0"/>
      <circle cx="7" cy="-10" r="2.5" fill="#1a1a1a"/>
      <circle cx="7.8" cy="-10.8" r="0.9" fill="#fff"/>
      <!-- Mouth line -->
      <path d="M-8,4 Q0,8 8,4" fill="none" stroke="#3a6a32" stroke-width="1" opacity="0.6"/>
      <!-- Front legs -->
      <ellipse cx="-10" cy="15" rx="4" ry="2.5" fill="#5a8a50"/>
      <ellipse cx="10" cy="15" rx="4" ry="2.5" fill="#5a8a50"/>
      <!-- Toes -->
      <circle cx="-13" cy="15" r="1.2" fill="#4a7a42"/>
      <circle cx="-10" cy="16.5" r="1.2" fill="#4a7a42"/>
      <circle cx="13" cy="15" r="1.2" fill="#4a7a42"/>
      <circle cx="10" cy="16.5" r="1.2" fill="#4a7a42"/>
    </g>`;
  },
  cat: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const scarf = h ? `
      <rect x="-8" y="-8" width="16" height="6" rx="2" fill="${h.c1}" opacity="0.9"/>
      <rect x="-8" y="-6" width="16" height="2" rx="0" fill="${h.c2}" opacity="0.85"/>
      <rect x="4" y="-8" width="5" height="12" rx="1.5" fill="${h.c1}" opacity="0.85"/>
      <rect x="4.5" y="-4" width="4" height="2" rx="0" fill="${h.c2}" opacity="0.8"/>` : '';
    return `<g>
      <!-- Tail (curved) -->
      <path d="M12,6 Q24,-2 20,-14 Q18,-20 22,-24" fill="none" stroke="#6a6a6a" stroke-width="3" stroke-linecap="round"/>
      <!-- Body (sitting) -->
      <ellipse cx="0" cy="6" rx="13" ry="12" fill="#808080"/>
      <ellipse cx="0" cy="8" rx="11" ry="9" fill="#909090"/>
      <!-- Chest lighter patch -->
      <ellipse cx="0" cy="8" rx="6" ry="7" fill="#a0a0a0" opacity="0.5"/>
      ${scarf}
      <!-- Head -->
      <circle cx="0" cy="-8" r="11" fill="#858585"/>
      <!-- Ears (pointy) -->
      <polygon points="-10,-16 -6,-26 -2,-16" fill="#858585"/>
      <polygon points="-8,-18 -6,-24 -4,-18" fill="#c8a0a0" opacity="0.6"/>
      <polygon points="2,-16 6,-26 10,-16" fill="#858585"/>
      <polygon points="4,-18 6,-24 8,-18" fill="#c8a0a0" opacity="0.6"/>
      <!-- Eyes (big kawaii) -->
      <ellipse cx="-4" cy="-9" rx="3.5" ry="3.8" fill="#d4e84a"/>
      <ellipse cx="-4" cy="-9" rx="1.8" ry="3" fill="#1a1a1a"/>
      <circle cx="-3.2" cy="-10" r="1" fill="#fff"/>
      <ellipse cx="4" cy="-9" rx="3.5" ry="3.8" fill="#d4e84a"/>
      <ellipse cx="4" cy="-9" rx="1.8" ry="3" fill="#1a1a1a"/>
      <circle cx="4.8" cy="-10" r="1" fill="#fff"/>
      <!-- Nose -->
      <polygon points="-1.5,-5 0,-3.5 1.5,-5" fill="#e8a0a0"/>
      <!-- Whiskers -->
      <line x1="-11" y1="-6" x2="-4" y2="-5" stroke="#aaa" stroke-width="0.6" opacity="0.6"/>
      <line x1="-11" y1="-4" x2="-4" y2="-4" stroke="#aaa" stroke-width="0.6" opacity="0.6"/>
      <line x1="4" y1="-5" x2="11" y2="-6" stroke="#aaa" stroke-width="0.6" opacity="0.6"/>
      <line x1="4" y1="-4" x2="11" y2="-4" stroke="#aaa" stroke-width="0.6" opacity="0.6"/>
      <!-- Mouth -->
      <path d="M-2,-3 Q0,-1.5 2,-3" fill="none" stroke="#666" stroke-width="0.7"/>
      <!-- Front paws -->
      <ellipse cx="-5" cy="16" rx="4" ry="2.5" fill="#808080"/>
      <ellipse cx="5" cy="16" rx="4" ry="2.5" fill="#808080"/>
    </g>`;
  },

  owl: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const bandana = h ? `
      <rect x="-6" y="-3" width="12" height="5" rx="2" fill="${h.c1}" opacity="0.9"/>
      <rect x="-6" y="-1.5" width="12" height="2" fill="${h.c2}" opacity="0.85"/>` : '';
    return `<g>
      <!-- Wings -->
      <ellipse cx="-11" cy="7" rx="5" ry="9" fill="#d0cbc4" transform="rotate(-15,-11,7)"/>
      <ellipse cx="11" cy="7" rx="5" ry="9" fill="#d0cbc4" transform="rotate(15,11,7)"/>
      <!-- Body -->
      <ellipse cx="0" cy="7" rx="12" ry="12" fill="#ede8e0"/>
      <!-- Belly feathers -->
      <ellipse cx="0" cy="10" rx="6" ry="7" fill="rgba(180,170,155,0.35)"/>
      ${bandana}
      <!-- Head -->
      <circle cx="0" cy="-9" r="11" fill="#e8e2d8"/>
      <!-- Ear tufts -->
      <polygon points="-7,-18 -5,-27 -2,-18" fill="#c0b8a8"/>
      <polygon points="2,-18 5,-27 7,-18" fill="#c0b8a8"/>
      <!-- Facial disc -->
      <ellipse cx="0" cy="-9" rx="8" ry="7" fill="rgba(200,190,175,0.4)"/>
      <!-- Eyes (big amber) -->
      <circle cx="-4" cy="-10" r="4" fill="#e8b830"/>
      <circle cx="-4" cy="-10" r="2.2" fill="#111"/>
      <circle cx="-2.7" cy="-11.2" r="1" fill="#fff"/>
      <circle cx="4" cy="-10" r="4" fill="#e8b830"/>
      <circle cx="4" cy="-10" r="2.2" fill="#111"/>
      <circle cx="5.3" cy="-11.2" r="1" fill="#fff"/>
      <!-- Beak -->
      <polygon points="-2,-6.5 0,-4 2,-6.5" fill="#d4a020"/>
      <!-- Talons -->
      <ellipse cx="-4" cy="18" rx="3.5" ry="2" fill="#c8982a"/>
      <ellipse cx="4" cy="18" rx="3.5" ry="2" fill="#c8982a"/>
    </g>`;
  },

  snake: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const collar = h ? `
      <rect x="-4" y="-15" width="8" height="3.5" rx="1.5" fill="${h.c1}" opacity="0.9" transform="rotate(-10,0,-13)"/>
      <rect x="-4" y="-14" width="8" height="1.5" fill="${h.c2}" opacity="0.85" transform="rotate(-10,0,-13)"/>` : '';
    return `<g>
      <!-- Coiled body lower loop -->
      <path d="M-12,14 Q-16,5 -8,-1 Q0,-7 8,-1 Q16,5 12,14"
            fill="none" stroke="#3a8a30" stroke-width="9" stroke-linecap="round"/>
      <path d="M-12,14 Q-16,5 -8,-1 Q0,-7 8,-1 Q16,5 12,14"
            fill="none" stroke="#4aaa40" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
      <!-- Upper body -->
      <path d="M8,-1 Q12,-7 8,-13" fill="none" stroke="#3a8a30" stroke-width="8" stroke-linecap="round"/>
      ${collar}
      <!-- Head (flat oval, tilted) -->
      <ellipse cx="6" cy="-17" rx="8" ry="5" fill="#3a8a30" transform="rotate(-20,6,-17)"/>
      <ellipse cx="6" cy="-19" rx="6.5" ry="3" fill="#2a6a20" transform="rotate(-20,6,-17)"/>
      <!-- Eyes (slit) -->
      <ellipse cx="10" cy="-20" rx="1.8" ry="2.2" fill="#f0c040" transform="rotate(-20,10,-20)"/>
      <ellipse cx="10" cy="-20" rx="0.5" ry="1.7" fill="#111" transform="rotate(-20,10,-20)"/>
      <!-- Forked tongue -->
      <path d="M13,-15 L18,-12" fill="none" stroke="#e03030" stroke-width="1" stroke-linecap="round"/>
      <path d="M18,-12 L21,-10 M18,-12 L21,-14" fill="none" stroke="#e03030" stroke-width="0.9" stroke-linecap="round"/>
    </g>`;
  },

  niffler: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const sash = h ? `
      <path d="M-9,1 Q0,-5 9,1 L8,5 Q0,-1 -8,5 Z" fill="${h.c1}" opacity="0.85"/>
      <path d="M-9,2.5 Q0,-3.5 9,2.5" fill="none" stroke="${h.c2}" stroke-width="1.5" opacity="0.85"/>` : '';
    return `<g>
      <!-- Body -->
      <ellipse cx="0" cy="6" rx="14" ry="13" fill="#2a2018"/>
      <ellipse cx="0" cy="6" rx="14" ry="13" fill="rgba(80,60,40,0.3)"/>
      <!-- Belly pouch (golden) -->
      <ellipse cx="0" cy="9" rx="8" ry="7" fill="#b8962a" opacity="0.75"/>
      <ellipse cx="0" cy="7" rx="5" ry="3" fill="rgba(255,220,80,0.3)"/>
      ${sash}
      <!-- Head -->
      <circle cx="0" cy="-7" r="11" fill="#2a2018"/>
      <circle cx="0" cy="-7" r="11" fill="rgba(80,60,40,0.25)"/>
      <!-- Platypus bill -->
      <ellipse cx="0" cy="-1" rx="9" ry="5" fill="#8a7040"/>
      <ellipse cx="0" cy="0" rx="8" ry="3.5" fill="#a08050"/>
      <!-- Nostrils -->
      <circle cx="-3" cy="-0.5" r="1.2" fill="rgba(0,0,0,0.35)"/>
      <circle cx="3" cy="-0.5" r="1.2" fill="rgba(0,0,0,0.35)"/>
      <!-- Eyes (small, shiny) -->
      <circle cx="-5" cy="-9" r="2.8" fill="#1a1a1a"/>
      <circle cx="-4.2" cy="-10" r="1" fill="#fff"/>
      <circle cx="5" cy="-9" r="2.8" fill="#1a1a1a"/>
      <circle cx="5.8" cy="-10" r="1" fill="#fff"/>
      <!-- Ears (small round) -->
      <circle cx="-9" cy="-14" r="4" fill="#2a2018"/>
      <circle cx="-9" cy="-14" r="2.5" fill="#3a2a20"/>
      <circle cx="9" cy="-14" r="4" fill="#2a2018"/>
      <circle cx="9" cy="-14" r="2.5" fill="#3a2a20"/>
      <!-- Front paws -->
      <ellipse cx="-7" cy="17" rx="4" ry="2.5" fill="#3a2a18"/>
      <ellipse cx="7" cy="17" rx="4" ry="2.5" fill="#3a2a18"/>
      <!-- Claws -->
      <line x1="-10" y1="18" x2="-10" y2="20" stroke="#555" stroke-width="0.8"/>
      <line x1="-7.5" y1="19" x2="-7.5" y2="21" stroke="#555" stroke-width="0.8"/>
      <line x1="-5" y1="19" x2="-5" y2="21" stroke="#555" stroke-width="0.8"/>
      <line x1="5" y1="19" x2="5" y2="21" stroke="#555" stroke-width="0.8"/>
      <line x1="7.5" y1="19" x2="7.5" y2="21" stroke="#555" stroke-width="0.8"/>
      <line x1="10" y1="18" x2="10" y2="20" stroke="#555" stroke-width="0.8"/>
      <!-- Gold coins in belly -->
      <circle cx="0" cy="9" r="3" fill="rgba(255,200,30,0.5)"/>
      <circle cx="-4" cy="11" r="2" fill="rgba(255,200,30,0.4)"/>
      <circle cx="4" cy="7" r="2" fill="rgba(255,200,30,0.4)"/>
    </g>`;
  },

  phoenix: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const sash = h ? `
      <path d="M-9,-6 Q0,-10 9,-2" fill="none" stroke="${h.c1}" stroke-width="4" stroke-linecap="round"/>
      <path d="M-9,-6 Q0,-10 9,-2" fill="none" stroke="${h.c2}" stroke-width="1.5" stroke-dasharray="3,3" stroke-linecap="round" opacity="0.85"/>` : '';
    return `<g>
      <!-- Flame tail feathers -->
      <path d="M-5,9 Q-10,20 -8,32 Q-3,26 0,20 Q3,26 8,32 Q10,20 5,9 Z" fill="#f39c12"/>
      <path d="M-2,10 Q-6,22 -4,34 Q0,28 4,34 Q6,22 2,10 Z" fill="#ffd700" opacity="0.85"/>
      <path d="M-8,12 Q-14,22 -12,30" fill="none" stroke="#e74c3c" stroke-width="1.2" opacity="0.7"/>
      <path d="M8,12 Q14,22 12,30" fill="none" stroke="#e74c3c" stroke-width="1.2" opacity="0.7"/>
      <!-- Body -->
      <ellipse cx="0" cy="-1" rx="9" ry="11" fill="#c0392b"/>
      <!-- Wings spread -->
      <path d="M-9,-4 Q-24,-12 -30,-3 Q-24,5 -9,3 Z" fill="#e74c3c"/>
      <path d="M-9,-4 Q-22,-10 -27,-2" fill="none" stroke="#f39c12" stroke-width="0.9" opacity="0.75"/>
      <path d="M-9,-2 Q-20,-5 -24,2" fill="none" stroke="#f39c12" stroke-width="0.9" opacity="0.65"/>
      <path d="M9,-4 Q24,-12 30,-3 Q24,5 9,3 Z" fill="#e74c3c"/>
      <path d="M9,-4 Q22,-10 27,-2" fill="none" stroke="#f39c12" stroke-width="0.9" opacity="0.75"/>
      <path d="M9,-2 Q20,-5 24,2" fill="none" stroke="#f39c12" stroke-width="0.9" opacity="0.65"/>
      ${sash}
      <!-- Head -->
      <circle cx="0" cy="-14" r="7" fill="#e74c3c"/>
      <!-- Crest -->
      <path d="M-4,-21 Q0,-30 4,-21" fill="#f39c12" opacity="0.95"/>
      <path d="M-6,-20 Q-1,-27 3,-23" fill="#e74c3c" opacity="0.8"/>
      <!-- Beak -->
      <polygon points="0,-8 -2.5,-6.5 2.5,-6.5" fill="#f39c12"/>
      <!-- Eye -->
      <circle cx="-2.5" cy="-15" r="2" fill="#ffd700"/>
      <circle cx="-2.5" cy="-15" r="1" fill="#111"/>
      <circle cx="-1.8" cy="-15.6" r="0.5" fill="white"/>
    </g>`;
  },

  dragon: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const collar = h ? `
      <rect x="5" y="-13" width="10" height="4" rx="2" fill="${h.c1}" opacity="0.9" transform="rotate(-20,10,-11)"/>
      <rect x="5" y="-12" width="10" height="1.8" fill="${h.c2}" opacity="0.85" transform="rotate(-20,10,-11)"/>` : '';
    return `<g>
      <!-- Tail -->
      <path d="M-13,5 Q-24,10 -26,5 Q-22,0 -13,3 Z" fill="#2e7d32"/>
      <!-- Spiny back -->
      <path d="M-9,-6 Q-7,-14 -3,-9 Q-1,-16 3,-9 Q6,-14 9,-7" fill="none" stroke="#1b5e20" stroke-width="1.6"/>
      <!-- Wing (left, folded) -->
      <path d="M-5,-6 Q-14,-13 -18,-7 Q-12,-2 -5,-4 Z" fill="#4caf50" opacity="0.9"/>
      <!-- Body -->
      <ellipse cx="0" cy="0" rx="13" ry="10" fill="#2e7d32"/>
      <!-- Belly -->
      <ellipse cx="-1" cy="2" rx="8" ry="6" fill="#4caf50" opacity="0.65"/>
      ${collar}
      <!-- Head -->
      <circle cx="13" cy="-7" r="9" fill="#388e3c"/>
      <!-- Snout -->
      <ellipse cx="19" cy="-5" rx="5" ry="3.5" fill="#43a047"/>
      <!-- Eye -->
      <circle cx="15" cy="-9" r="2.5" fill="#ffd700"/>
      <circle cx="15" cy="-9" r="1.2" fill="#111"/>
      <circle cx="15.7" cy="-9.5" r="0.6" fill="white"/>
      <!-- Nostril -->
      <circle cx="20.5" cy="-5.5" r="1" fill="#1b5e20"/>
      <!-- Tiny teeth -->
      <path d="M17,-2.5 L18.5,-1.5 L20,-2.5" fill="white" stroke="rgba(0,0,0,0.2)" stroke-width="0.4"/>
      <!-- Legs/feet -->
      <ellipse cx="-6" cy="9" rx="4" ry="2.5" fill="#1b5e20"/>
      <ellipse cx="5" cy="9" rx="4" ry="2.5" fill="#1b5e20"/>
      <!-- Claws -->
      <line x1="-9" y1="10" x2="-10" y2="12" stroke="#0d3312" stroke-width="0.9"/>
      <line x1="-6" y1="11" x2="-6" y2="13" stroke="#0d3312" stroke-width="0.9"/>
      <line x1="-3" y1="11" x2="-2" y2="13" stroke="#0d3312" stroke-width="0.9"/>
    </g>`;
  },

  pixie: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const cape = h ? `
      <path d="M-6,-4 Q0,-8 6,-4 L5,6 Q0,10 -5,6 Z" fill="${h.c1}" opacity="0.85"/>
      <rect x="-6" y="-4" width="12" height="3" rx="0" fill="${h.c2}" opacity="0.8"/>` : '';
    return `<g>
      <!-- Dragonfly wings (behind body) -->
      <ellipse cx="-11" cy="-5" rx="9" ry="5.5" fill="rgba(187,222,251,0.62)" transform="rotate(-22,-11,-5)"/>
      <ellipse cx="11" cy="-5" rx="9" ry="5.5" fill="rgba(187,222,251,0.62)" transform="rotate(22,11,-5)"/>
      <ellipse cx="-10" cy="-1" rx="7" ry="4" fill="rgba(144,202,249,0.48)" transform="rotate(-10,-10,-1)"/>
      <ellipse cx="10" cy="-1" rx="7" ry="4" fill="rgba(144,202,249,0.48)" transform="rotate(10,10,-1)"/>
      <!-- Body -->
      <ellipse cx="0" cy="3" rx="6" ry="8.5" fill="#1565c0"/>
      ${cape}
      <!-- Head -->
      <circle cx="0" cy="-9" r="8" fill="#1e88e5"/>
      <!-- Big pointy ears -->
      <path d="M-8,-11 Q-16,-20 -8,-7" fill="#1565c0"/>
      <path d="M8,-11 Q16,-20 8,-7" fill="#1565c0"/>
      <!-- Large imp eyes -->
      <ellipse cx="-3" cy="-10" rx="2.8" ry="3.2" fill="#fff176"/>
      <ellipse cx="3" cy="-10" rx="2.8" ry="3.2" fill="#fff176"/>
      <circle cx="-3" cy="-10" r="1.5" fill="#111"/>
      <circle cx="3" cy="-10" r="1.5" fill="#111"/>
      <circle cx="-2.4" cy="-10.6" r="0.5" fill="white"/>
      <circle cx="3.6" cy="-10.6" r="0.5" fill="white"/>
      <!-- Mischievous grin -->
      <path d="M-3,-5 Q0,-3 3,-5" fill="none" stroke="#0d47a1" stroke-width="0.9"/>
      <!-- Arms -->
      <line x1="-6" y1="0" x2="-13" y2="5" stroke="#1565c0" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="6" y1="0" x2="13" y2="5" stroke="#1565c0" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Legs -->
      <line x1="-3" y1="11" x2="-4" y2="18" stroke="#0d47a1" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="3" y1="11" x2="4" y2="18" stroke="#0d47a1" stroke-width="1.8" stroke-linecap="round"/>
    </g>`;
  },

  botruc: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const band = h ? `
      <ellipse cx="0" cy="1" rx="4" ry="2.5" fill="${h.c1}" opacity="0.9"/>
      <ellipse cx="0" cy="1" rx="4" ry="1" fill="${h.c2}" opacity="0.8"/>` : '';
    return `<g>
      <!-- Body (twig) -->
      <ellipse cx="0" cy="3" rx="3" ry="10" fill="#7a5c3a"/>
      <line x1="-1" y1="-2" x2="2" y2="0" stroke="#5c3d1e" stroke-width="0.7" opacity="0.5"/>
      <line x1="-2" y1="4" x2="1" y2="6" stroke="#5c3d1e" stroke-width="0.7" opacity="0.5"/>
      <!-- Head -->
      <ellipse cx="0" cy="-11" rx="5.5" ry="5" fill="#5a8a2a"/>
      ${band}
      <!-- Arms (long twig fingers) -->
      <line x1="-3" y1="-1" x2="-13" y2="-6" stroke="#7a5c3a" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="-13" y1="-6" x2="-17" y2="-3" stroke="#7a5c3a" stroke-width="0.9" stroke-linecap="round"/>
      <line x1="-13" y1="-6" x2="-15" y2="-10" stroke="#7a5c3a" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="-13" y1="-6" x2="-11" y2="-11" stroke="#7a5c3a" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="3" y1="-1" x2="13" y2="-6" stroke="#7a5c3a" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="13" y1="-6" x2="17" y2="-3" stroke="#7a5c3a" stroke-width="0.9" stroke-linecap="round"/>
      <line x1="13" y1="-6" x2="15" y2="-10" stroke="#7a5c3a" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="13" y1="-6" x2="11" y2="-11" stroke="#7a5c3a" stroke-width="0.8" stroke-linecap="round"/>
      <!-- Legs -->
      <line x1="-2" y1="12" x2="-5" y2="20" stroke="#7a5c3a" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="-5" y1="20" x2="-9" y2="22" stroke="#7a5c3a" stroke-width="0.9" stroke-linecap="round"/>
      <line x1="-5" y1="20" x2="-4" y2="23" stroke="#7a5c3a" stroke-width="0.9" stroke-linecap="round"/>
      <line x1="2" y1="12" x2="5" y2="20" stroke="#7a5c3a" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="5" y1="20" x2="9" y2="22" stroke="#7a5c3a" stroke-width="0.9" stroke-linecap="round"/>
      <line x1="5" y1="20" x2="4" y2="23" stroke="#7a5c3a" stroke-width="0.9" stroke-linecap="round"/>
      <!-- Eyes (big, bright green) -->
      <circle cx="-2.5" cy="-12" r="2.2" fill="#a8e060"/>
      <circle cx="-2.5" cy="-12" r="1.1" fill="#111"/>
      <circle cx="-1.9" cy="-12.6" r="0.7" fill="white"/>
      <circle cx="2.5" cy="-12" r="2.2" fill="#a8e060"/>
      <circle cx="2.5" cy="-12" r="1.1" fill="#111"/>
      <circle cx="3.1" cy="-12.6" r="0.7" fill="white"/>
      <!-- Leaf tufts on head -->
      <ellipse cx="-2" cy="-16" rx="3.5" ry="2" fill="#66bb2a" transform="rotate(-20,-2,-16)"/>
      <ellipse cx="2" cy="-17" rx="3" ry="1.8" fill="#77cc33" transform="rotate(15,2,-17)"/>
    </g>`;
  },

  thestral: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const ribbon = h ? `
      <rect x="4" y="-13" width="8" height="3.5" rx="1.5" fill="${h.c1}" opacity="0.9" transform="rotate(-15,8,-11)"/>
      <rect x="4" y="-12" width="8" height="1.5" fill="${h.c2}" opacity="0.85" transform="rotate(-15,8,-11)"/>` : '';
    return `<g>
      <!-- Bat wings (behind body) -->
      <path d="M-4,-6 Q-18,-22 -26,-13 Q-20,-4 -4,-5 Z" fill="rgba(18,12,28,0.88)"/>
      <path d="M-4,-6 Q-14,-18 -20,-10" fill="none" stroke="#241830" stroke-width="0.8" opacity="0.7"/>
      <path d="M-4,-5 Q-11,-13 -16,-7" fill="none" stroke="#241830" stroke-width="0.8" opacity="0.6"/>
      <path d="M4,-6 Q18,-22 26,-13 Q20,-4 4,-5 Z" fill="rgba(18,12,28,0.88)"/>
      <path d="M4,-6 Q14,-18 20,-10" fill="none" stroke="#241830" stroke-width="0.8" opacity="0.7"/>
      <!-- Body (skeletal, gaunt) -->
      <ellipse cx="0" cy="1" rx="10" ry="8" fill="#18111e"/>
      <!-- Visible ribs -->
      <line x1="-7" y1="-3" x2="-5" y2="5" stroke="#281d34" stroke-width="0.9" opacity="0.8"/>
      <line x1="-3" y1="-4" x2="-2" y2="5" stroke="#281d34" stroke-width="0.9" opacity="0.8"/>
      <line x1="1" y1="-4" x2="1" y2="5" stroke="#281d34" stroke-width="0.9" opacity="0.7"/>
      <line x1="5" y1="-4" x2="4" y2="5" stroke="#281d34" stroke-width="0.9" opacity="0.8"/>
      <!-- Neck -->
      <path d="M7,-4 Q11,-11 9,-18" fill="none" stroke="#18111e" stroke-width="6" stroke-linecap="round"/>
      ${ribbon}
      <!-- Head (long, equine) -->
      <ellipse cx="10" cy="-19" rx="5" ry="4.5" fill="#18111e" transform="rotate(-15,10,-19)"/>
      <!-- Pale eyes -->
      <circle cx="13" cy="-21" r="2" fill="#c0e8ff" opacity="0.85"/>
      <circle cx="13" cy="-21" r="0.8" fill="#e8f8ff"/>
      <!-- Nostril -->
      <circle cx="14.5" cy="-17" r="0.8" fill="#0a0812"/>
      <!-- Wispy mane -->
      <path d="M7,-7 Q5,-13 7,-20" fill="none" stroke="#201530" stroke-width="1.4" stroke-linecap="round" opacity="0.85"/>
      <!-- Tail -->
      <path d="M-10,1 Q-18,6 -20,14 Q-16,10 -14,15" fill="none" stroke="#18111e" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Thin bony legs -->
      <line x1="-6" y1="8" x2="-8" y2="19" stroke="#110c18" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="-8" y1="19" x2="-9" y2="22" stroke="#110c18" stroke-width="1.2"/>
      <line x1="-1" y1="8" x2="-2" y2="19" stroke="#110c18" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="-2" y1="19" x2="-3" y2="22" stroke="#110c18" stroke-width="1.2"/>
      <line x1="4" y1="7" x2="5" y2="18" stroke="#110c18" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="5" y1="18" x2="6" y2="21" stroke="#110c18" stroke-width="1.2"/>
      <line x1="8" y1="5" x2="9" y2="16" stroke="#110c18" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="9" y1="16" x2="10" y2="19" stroke="#110c18" stroke-width="1.2"/>
    </g>`;
  },

  hipogrifo: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const harness = h ? `
      <path d="M-2,3 Q5,-5 12,2" fill="none" stroke="${h.c1}" stroke-width="4" stroke-linecap="round"/>
      <path d="M-2,3 Q5,-5 12,2" fill="none" stroke="${h.c2}" stroke-width="1.5" stroke-linecap="round" opacity="0.85"/>` : '';
    return `<g>
      <!-- Horse hindquarters -->
      <ellipse cx="-8" cy="1" rx="10" ry="8" fill="#8a9aa8"/>
      <!-- Horse tail -->
      <path d="M-17,0 Q-25,5 -26,13 Q-22,8 -20,14" fill="none" stroke="#7a8a98" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Horse back legs -->
      <line x1="-14" y1="7" x2="-16" y2="17" stroke="#6a7a88" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="-16" cy="19" rx="3" ry="1.5" fill="#3a3a3a"/>
      <line x1="-5" y1="8" x2="-5" y2="18" stroke="#6a7a88" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="-5" cy="20" rx="3" ry="1.5" fill="#3a3a3a"/>
      <!-- Eagle body (front) -->
      <ellipse cx="5" cy="-1" rx="10" ry="9" fill="#8a8878"/>
      <!-- Chest feathers -->
      <path d="M-2,3 Q2,7 8,3 Q4,9 -2,7 Z" fill="#a8a890" opacity="0.6"/>
      ${harness}
      <!-- Wings -->
      <path d="M2,-5 Q-8,-20 -18,-13 Q-12,-4 2,-4 Z" fill="#7a7868"/>
      <path d="M2,-5 Q-6,-16 -14,-9" fill="none" stroke="#5a5a4a" stroke-width="0.9" opacity="0.7"/>
      <path d="M2,-4 Q-4,-11 -10,-6" fill="none" stroke="#5a5a4a" stroke-width="0.9" opacity="0.6"/>
      <path d="M8,-5 Q18,-20 28,-13 Q22,-4 8,-4 Z" fill="#7a7868"/>
      <path d="M8,-5 Q16,-16 24,-9" fill="none" stroke="#5a5a4a" stroke-width="0.9" opacity="0.7"/>
      <!-- Eagle head -->
      <circle cx="14" cy="-11" r="7" fill="#8a8878"/>
      <!-- Feather crown -->
      <path d="M10,-18 Q12,-24 14,-20 Q16,-26 18,-19" fill="#6a6858" opacity="0.9"/>
      <!-- Beak -->
      <path d="M18,-9 Q24,-11 22,-6 Q18,-5 17,-8 Z" fill="#d4a828"/>
      <!-- Eye -->
      <circle cx="14" cy="-13" r="2.5" fill="#f5a623"/>
      <circle cx="14" cy="-13" r="1.2" fill="#111"/>
      <circle cx="14.7" cy="-13.7" r="0.6" fill="white"/>
      <!-- Eagle front legs / talons -->
      <line x1="8" y1="7" x2="8" y2="15" stroke="#7a7868" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M5,15 Q8,18 11,15" fill="none" stroke="#c8a830" stroke-width="1.6"/>
      <line x1="5" y1="16" x2="4" y2="19" stroke="#c8a830" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="7.5" y1="17" x2="7" y2="20" stroke="#c8a830" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="10" y1="16" x2="11" y2="19" stroke="#c8a830" stroke-width="1.2" stroke-linecap="round"/>
    </g>`;
  },

  mandragora: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const sash = h ? `
      <rect x="-10" y="4" width="20" height="6" rx="2" fill="${h.c1}" opacity="0.85"/>
      <rect x="-10" y="6" width="20" height="2.5" rx="0" fill="${h.c2}" opacity="0.8"/>` : '';
    return `<g>
      <!-- Root tendrils -->
      <line x1="-8" y1="18" x2="-14" y2="27" stroke="#8b4513" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="-3" y1="21" x2="-6" y2="30" stroke="#8b4513" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="2" y1="22" x2="2" y2="32" stroke="#8b4513" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="7" y1="21" x2="10" y2="30" stroke="#8b4513" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="12" y1="18" x2="18" y2="26" stroke="#8b4513" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Body (carrot-like root) -->
      <path d="M-10,-6 Q-13,8 -10,20 Q0,26 10,20 Q13,8 10,-6 Z" fill="#c8a46e"/>
      <path d="M-7,-2 Q-9,8 -7,16" fill="none" stroke="rgba(0,0,0,0.10)" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M6,0 Q7,10 5,17" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.2" stroke-linecap="round"/>
      ${sash}
      <!-- Head -->
      <circle cx="0" cy="-14" r="12" fill="#c8a46e"/>
      <!-- Screaming open mouth -->
      <ellipse cx="0" cy="-9" rx="6" ry="5" fill="#2a0e00"/>
      <!-- Distressed eyes -->
      <ellipse cx="-4.5" cy="-17" rx="3" ry="3.5" fill="white"/>
      <circle cx="-4.5" cy="-17" r="1.8" fill="#5a3a1a"/>
      <circle cx="-3.8" cy="-17.8" r="0.6" fill="white"/>
      <ellipse cx="4.5" cy="-17" rx="3" ry="3.5" fill="white"/>
      <circle cx="4.5" cy="-17" r="1.8" fill="#5a3a1a"/>
      <circle cx="5.2" cy="-17.8" r="0.6" fill="white"/>
      <!-- Furrowed brows -->
      <path d="M-7.5,-22 Q-4.5,-20 -1.5,-22" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M1.5,-22 Q4.5,-20 7.5,-22" fill="none" stroke="#5a3a1a" stroke-width="1.2" stroke-linecap="round"/>
      <!-- Leaves on head -->
      <path d="M-1,-24 Q-16,-40 -11,-52 Q-2,-38 0,-26" fill="#2d8a20"/>
      <path d="M1,-24 Q16,-40 11,-52 Q2,-38 0,-26" fill="#3aaa28"/>
      <path d="M0,-25 Q-5,-44 0,-54 Q5,-44 0,-25" fill="#4cc035" opacity="0.85"/>
      <line x1="-6" y1="-30" x2="-10" y2="-46" stroke="rgba(255,255,255,0.28)" stroke-width="0.8"/>
      <line x1="6" y1="-30" x2="10" y2="-46" stroke="rgba(255,255,255,0.28)" stroke-width="0.8"/>
    </g>`;
  },

  acromantula: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const band = h ? `
      <ellipse cx="7" cy="-5" rx="9" ry="4" fill="${h.c1}" opacity="0.75"/>
      <ellipse cx="7" cy="-4" rx="9" ry="1.8" fill="${h.c2}" opacity="0.7"/>` : '';
    return `<g>
      <!-- 8 legs -->
      <path d="M-10,-1 Q-22,-4 -28,3" fill="none" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M-10,1 Q-22,5 -30,14" fill="none" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M-9,4 Q-20,12 -25,22" fill="none" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M-7,7 Q-15,17 -18,27" fill="none" stroke="#1a1a1a" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M10,-1 Q22,-4 28,3" fill="none" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M10,1 Q22,5 30,14" fill="none" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9,4 Q20,12 25,22" fill="none" stroke="#1a1a1a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M7,7 Q15,17 18,27" fill="none" stroke="#1a1a1a" stroke-width="1.7" stroke-linecap="round"/>
      <!-- Abdomen -->
      <ellipse cx="-8" cy="7" rx="14" ry="12" fill="#2a1a10"/>
      <ellipse cx="-8" cy="7" rx="9" ry="7" fill="rgba(60,40,20,0.4)"/>
      <!-- Cephalothorax -->
      <circle cx="7" cy="-5" r="11" fill="#2a1a10"/>
      ${band}
      <!-- 6 red eyes -->
      <circle cx="3" cy="-9" r="2" fill="#e83020" opacity="0.92"/>
      <circle cx="8" cy="-11" r="2" fill="#e83020" opacity="0.92"/>
      <circle cx="13" cy="-9" r="2" fill="#e83020" opacity="0.92"/>
      <circle cx="3" cy="-5" r="1.5" fill="#b02010" opacity="0.8"/>
      <circle cx="13" cy="-5" r="1.5" fill="#b02010" opacity="0.8"/>
      <circle cx="8" cy="-4" r="1.5" fill="#b02010" opacity="0.8"/>
      <circle cx="3.6" cy="-9.6" r="0.6" fill="rgba(255,255,255,0.7)"/>
      <circle cx="8.6" cy="-11.6" r="0.6" fill="rgba(255,255,255,0.7)"/>
      <!-- Chelicera fangs -->
      <path d="M4,-1 Q5,3 4,6" fill="none" stroke="#f0f0f0" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M10,-1 Q9,3 10,6" fill="none" stroke="#f0f0f0" stroke-width="1.6" stroke-linecap="round"/>
    </g>`;
  },

  grindylow: (outfitKey) => {
    const h = outfitKey && HP_HOUSES[outfitKey];
    const collar = h ? `
      <rect x="-9" y="-3" width="18" height="5" rx="2" fill="${h.c1}" opacity="0.9"/>
      <rect x="-9" y="-1" width="18" height="2" rx="0" fill="${h.c2}" opacity="0.85"/>` : '';
    return `<g>
      <!-- Long webbed fingers -->
      <path d="M-9,4 Q-17,12 -20,22" fill="none" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M-7,6 Q-13,16 -14,26" fill="none" stroke="#2e7d32" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M9,4 Q17,12 20,22" fill="none" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M7,6 Q13,16 14,26" fill="none" stroke="#2e7d32" stroke-width="1.4" stroke-linecap="round"/>
      <!-- Body -->
      <ellipse cx="0" cy="6" rx="10" ry="12" fill="#388e3c"/>
      ${collar}
      <!-- Gill slits -->
      <path d="M-8,-1 Q-11,3 -8,7" fill="none" stroke="#1b5e20" stroke-width="1.2" opacity="0.85"/>
      <path d="M-6,-2 Q-9,3 -6,8" fill="none" stroke="#1b5e20" stroke-width="1.0" opacity="0.7"/>
      <path d="M8,-1 Q11,3 8,7" fill="none" stroke="#1b5e20" stroke-width="1.2" opacity="0.85"/>
      <path d="M6,-2 Q9,3 6,8" fill="none" stroke="#1b5e20" stroke-width="1.0" opacity="0.7"/>
      <!-- Head -->
      <circle cx="0" cy="-10" r="11" fill="#43a047"/>
      <!-- Horns -->
      <path d="M-5,-20 Q-8,-29 -4,-22" fill="#2e7d32"/>
      <path d="M5,-20 Q8,-29 4,-22" fill="#2e7d32"/>
      <!-- Big yellow-green eyes -->
      <ellipse cx="-4" cy="-12" rx="3.5" ry="4" fill="#c6ff00"/>
      <circle cx="-4" cy="-12" r="2" fill="#111"/>
      <circle cx="-3.3" cy="-12.8" r="0.7" fill="white"/>
      <ellipse cx="4" cy="-12" rx="3.5" ry="4" fill="#c6ff00"/>
      <circle cx="4" cy="-12" r="2" fill="#111"/>
      <circle cx="4.7" cy="-12.8" r="0.7" fill="white"/>
      <!-- Mouth with teeth -->
      <path d="M-4,-6 Q0,-4 4,-6" fill="none" stroke="#1b5e20" stroke-width="0.9"/>
      <line x1="-2" y1="-6" x2="-2" y2="-3" stroke="#d0f5d0" stroke-width="1"/>
      <line x1="0" y1="-5.5" x2="0" y2="-2.5" stroke="#d0f5d0" stroke-width="1"/>
      <line x1="2" y1="-6" x2="2" y2="-3" stroke="#d0f5d0" stroke-width="1"/>
      <!-- Webbed legs -->
      <line x1="-4" y1="17" x2="-6" y2="25" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
      <line x1="4" y1="17" x2="6" y2="25" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
      <path d="M-9,25 Q-6,28 -3,25" fill="#2e7d32" opacity="0.8"/>
      <path d="M3,25 Q6,28 9,25" fill="#2e7d32" opacity="0.8"/>
    </g>`;
  },
};

// Pet position configs: { tx, ty, scale, leash? }
const PET_POSITIONS = {
  floor:     { tx: 170, ty: 308, s: 1.0 },
  righthand: { tx: 184, ty: 238, s: 0.7 },
  lefthand:  { tx: 56,  ty: 238, s: 0.7 },
  leash:     { tx: 170, ty: 308, s: 1.0 },
};

// Renders positioned pet SVG layer (returns string)
function renderPet(petKey, outfitKey, position, petScaleVal) {
  const fn = PETS[petKey];
  if (!fn) return '';
  const pos = PET_POSITIONS[position] || PET_POSITIONS.floor;
  let inner = fn(outfitKey);
  // Leash line from left hand to pet center
  const leashLine = position === 'leash'
    ? `<path d="M56,258 Q90,290 ${pos.tx},${pos.ty - 5}" fill="none" stroke="#8b6914" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="4,2"/>`
    : '';
  // pet scale: base is 1.75× (75% added), slider adds -50..+50 on top
  const s = 1 + (75 + petScaleVal) / 100;
  let petSvg = `<g transform="translate(${pos.tx},${pos.ty}) scale(${s * pos.s}) translate(${-pos.tx},${-pos.ty})"><g transform="translate(${pos.tx},${pos.ty})">${inner}</g></g>`;
  return `<g class="pet-layer" data-pet="${petKey}">${leashLine}${petSvg}</g>`;
}

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
    svgSky: `
      <!-- Night sky -->
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
      <!-- Castle silhouette — main body -->
      <rect x="30" y="180" width="180" height="160" fill="rgba(20,22,40,0.85)"/>
      <!-- Battlements main -->
      <rect x="30" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="48" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="66" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="84" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="144" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="162" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="180" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="198" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <!-- Left tower -->
      <rect x="18" y="130" width="34" height="210" fill="rgba(18,20,38,0.9)"/>
      <polygon points="18,130 35,102 52,130" fill="rgba(18,20,38,0.92)"/>
      <rect x="18" y="122" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="30" y="122" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="42" y="122" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <!-- Right tower -->
      <rect x="188" y="140" width="34" height="200" fill="rgba(18,20,38,0.9)"/>
      <polygon points="188,140 205,110 222,140" fill="rgba(18,20,38,0.92)"/>
      <rect x="188" y="132" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="200" y="132" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="212" y="132" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <!-- Lit windows -->
      <rect x="44" y="196" width="8" height="11" rx="3" fill="rgba(255,220,100,0.55)"/>
      <rect x="60" y="208" width="8" height="11" rx="3" fill="rgba(255,220,100,0.45)"/>
      <rect x="152" y="192" width="8" height="11" rx="3" fill="rgba(255,220,100,0.55)"/>
      <rect x="170" y="204" width="8" height="11" rx="3" fill="rgba(255,220,100,0.4)"/>
      <rect x="26" y="158" width="6" height="9" rx="2" fill="rgba(255,220,100,0.5)"/>
      <rect x="196" y="168" width="6" height="9" rx="2" fill="rgba(255,220,100,0.5)"/>`,
    svgGround: `
      <!-- Dark grass ground -->
      <rect x="0" y="0" width="240" height="80" fill="rgba(10,14,28,0.92)"/>
      <rect x="0" y="0" width="240" height="8" fill="rgba(20,30,12,0.5)"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#0d1530"/>
      <circle cx="40" cy="18" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="110" cy="8" r="1" fill="rgba(255,255,220,0.8)"/>
      <circle cx="180" cy="22" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="260" cy="10" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="340" cy="20" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="420" cy="6" r="1" fill="rgba(255,255,220,0.8)"/>
      <circle cx="80" cy="35" r="0.8" fill="rgba(255,255,220,0.6)"/>
      <circle cx="390" cy="38" r="0.8" fill="rgba(255,255,220,0.6)"/>
      <circle cx="462" cy="15" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="310" cy="32" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="145" cy="45" r="0.8" fill="rgba(255,255,220,0.5)"/>
      <circle cx="455" cy="44" r="0.8" fill="rgba(255,255,220,0.6)"/>
      <circle cx="400" cy="30" r="14" fill="rgba(255,250,200,0.22)"/>
      <circle cx="406" cy="26" r="11" fill="rgba(20,24,50,0.7)"/>
      <rect x="58" y="180" width="364" height="160" fill="rgba(20,22,40,0.85)"/>
      <rect x="58" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="76" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="94" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="228" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="286" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="344" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="376" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="398" y="172" width="12" height="12" fill="rgba(20,22,40,0.85)"/>
      <rect x="8" y="130" width="34" height="210" fill="rgba(18,20,38,0.9)"/>
      <polygon points="8,130 25,102 42,130" fill="rgba(18,20,38,0.92)"/>
      <rect x="8" y="122" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="20" y="122" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="32" y="122" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="438" y="140" width="34" height="200" fill="rgba(18,20,38,0.9)"/>
      <polygon points="438,140 455,110 472,140" fill="rgba(18,20,38,0.92)"/>
      <rect x="438" y="132" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="450" y="132" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="462" y="132" width="8" height="10" fill="rgba(18,20,38,0.92)"/>
      <rect x="226" y="148" width="24" height="192" fill="rgba(18,20,38,0.88)"/>
      <polygon points="226,150 238,122 250,150" fill="rgba(18,20,38,0.90)"/>
      <rect x="86" y="196" width="8" height="11" rx="3" fill="rgba(255,220,100,0.55)"/>
      <rect x="108" y="208" width="8" height="11" rx="3" fill="rgba(255,220,100,0.45)"/>
      <rect x="303" y="192" width="8" height="11" rx="3" fill="rgba(255,220,100,0.55)"/>
      <rect x="344" y="204" width="8" height="11" rx="3" fill="rgba(255,220,100,0.4)"/>
      <rect x="16" y="158" width="6" height="9" rx="2" fill="rgba(255,220,100,0.5)"/>
      <rect x="444" y="168" width="6" height="9" rx="2" fill="rgba(255,220,100,0.5)"/>
      <rect x="232" y="160" width="5" height="8" rx="2" fill="rgba(255,220,100,0.45)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="rgba(10,14,28,0.92)"/>
      <rect x="0" y="0" width="480" height="8" fill="rgba(20,30,12,0.5)"/>`,
  },
  great_hall: {
    label: 'Gran Comedor',
    svgSky: `
      <!-- Stone ceiling dark -->
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
      <!-- Long tables in mid area -->
      <rect x="10" y="240" width="100" height="12" rx="4" fill="rgba(80,55,30,0.7)"/>
      <rect x="130" y="240" width="100" height="12" rx="4" fill="rgba(80,55,30,0.7)"/>
      <rect x="18" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="96" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="138" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="216" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>`,
    svgGround: `
      <!-- Stone floor -->
      <rect x="0" y="0" width="240" height="80" fill="rgba(40,34,28,0.9)"/>
      <line x1="0" y1="12" x2="240" y2="12" stroke="rgba(60,50,40,0.5)" stroke-width="1"/>
      <line x1="0" y1="40" x2="240" y2="40" stroke="rgba(60,50,40,0.4)" stroke-width="1"/>
      <line x1="60" y1="0" x2="60" y2="80" stroke="rgba(60,50,40,0.3)" stroke-width="0.8"/>
      <line x1="120" y1="0" x2="120" y2="80" stroke="rgba(60,50,40,0.3)" stroke-width="0.8"/>
      <line x1="180" y1="0" x2="180" y2="80" stroke="rgba(60,50,40,0.3)" stroke-width="0.8"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#1a1200"/>
      <path d="M0,0 Q120,30 240,0 Q360,30 480,0 L480,50 Q360,80 240,50 Q120,80 0,50 Z" fill="rgba(30,24,18,0.6)"/>
      <rect x="55" y="42" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="57" cy="40" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="115" y="28" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="117" cy="26" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="175" y="38" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="177" cy="36" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="238" y="25" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="240" cy="23" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="300" y="38" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="302" cy="36" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="360" y="28" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="362" cy="26" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <rect x="420" y="42" width="4" height="14" rx="2" fill="rgba(255,240,200,0.85)"/>
      <ellipse cx="422" cy="40" rx="3" ry="5" fill="rgba(255,200,60,0.7)"/>
      <line x1="57" y1="0" x2="57" y2="42" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="117" y1="0" x2="117" y2="28" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="177" y1="0" x2="177" y2="38" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="240" y1="0" x2="240" y2="25" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="302" y1="0" x2="302" y2="38" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="362" y1="0" x2="362" y2="28" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <line x1="422" y1="0" x2="422" y2="42" stroke="rgba(180,160,120,0.3)" stroke-width="0.8"/>
      <rect x="10" y="240" width="200" height="12" rx="4" fill="rgba(80,55,30,0.7)"/>
      <rect x="270" y="240" width="200" height="12" rx="4" fill="rgba(80,55,30,0.7)"/>
      <rect x="18" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="196" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="278" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>
      <rect x="456" y="250" width="6" height="20" rx="2" fill="rgba(60,40,20,0.7)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="rgba(40,34,28,0.9)"/>
      <line x1="0" y1="12" x2="480" y2="12" stroke="rgba(60,50,40,0.5)" stroke-width="1"/>
      <line x1="0" y1="40" x2="480" y2="40" stroke="rgba(60,50,40,0.4)" stroke-width="1"/>
      <line x1="120" y1="0" x2="120" y2="80" stroke="rgba(60,50,40,0.3)" stroke-width="0.8"/>
      <line x1="240" y1="0" x2="240" y2="80" stroke="rgba(60,50,40,0.3)" stroke-width="0.8"/>
      <line x1="360" y1="0" x2="360" y2="80" stroke="rgba(60,50,40,0.3)" stroke-width="0.8"/>`,
  },
  forbidden_forest: {
    label: 'Bosque Prohibido',
    svgSky: `
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
      <rect x="0" y="160" width="22" height="180" fill="rgba(15,18,12,0.75)"/>
      <rect x="218" y="175" width="22" height="165" fill="rgba(15,18,12,0.75)"/>
      <rect x="50" y="178" width="16" height="162" fill="rgba(15,18,12,0.65)"/>
      <rect x="170" y="185" width="16" height="155" fill="rgba(15,18,12,0.65)"/>
      <!-- Tree crowns — back -->
      <ellipse cx="11" cy="158" rx="30" ry="50" fill="rgba(10,22,10,0.78)"/>
      <ellipse cx="229" cy="172" rx="28" ry="46" fill="rgba(10,22,10,0.78)"/>
      <ellipse cx="58" cy="175" rx="24" ry="42" fill="rgba(10,22,10,0.68)"/>
      <ellipse cx="178" cy="182" rx="24" ry="40" fill="rgba(10,22,10,0.68)"/>
      <!-- Tree trunks — front layer -->
      <rect x="88" y="210" width="14" height="130" fill="rgba(12,15,10,0.85)"/>
      <rect x="136" y="220" width="14" height="120" fill="rgba(12,15,10,0.85)"/>
      <!-- Tree crowns — front -->
      <ellipse cx="95" cy="206" rx="28" ry="48" fill="rgba(8,18,8,0.85)"/>
      <ellipse cx="143" cy="216" rx="26" ry="44" fill="rgba(8,18,8,0.85)"/>`,
    svgGround: `
      <!-- Dark forest floor -->
      <rect x="0" y="0" width="240" height="80" fill="rgba(8,14,8,0.92)"/>
      <!-- Ground mist -->
      <ellipse cx="120" cy="10" rx="130" ry="14" fill="rgba(180,200,180,0.1)"/>
      <ellipse cx="60" cy="20" rx="80" ry="10" fill="rgba(180,200,180,0.07)"/>
      <ellipse cx="190" cy="18" rx="70" ry="9" fill="rgba(180,200,180,0.07)"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#0a1a0a"/>
      <circle cx="60" cy="15" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="140" cy="25" r="1.2" fill="rgba(255,255,220,0.9)"/>
      <circle cx="220" cy="10" r="1" fill="rgba(255,255,220,0.6)"/>
      <circle cx="300" cy="20" r="1.2" fill="rgba(255,255,220,0.8)"/>
      <circle cx="380" cy="12" r="1" fill="rgba(255,255,220,0.7)"/>
      <circle cx="460" cy="22" r="1.2" fill="rgba(255,255,220,0.8)"/>
      <circle cx="100" cy="40" r="0.8" fill="rgba(255,255,220,0.5)"/>
      <circle cx="340" cy="35" r="0.8" fill="rgba(255,255,220,0.5)"/>
      <circle cx="440" cy="38" r="0.8" fill="rgba(255,255,220,0.6)"/>
      <circle cx="240" cy="50" r="28" fill="rgba(220,230,210,0.2)"/>
      <circle cx="240" cy="50" r="22" fill="rgba(230,240,215,0.18)"/>
      <rect x="0" y="160" width="22" height="180" fill="rgba(15,18,12,0.75)"/>
      <rect x="458" y="175" width="22" height="165" fill="rgba(15,18,12,0.75)"/>
      <rect x="90" y="178" width="16" height="162" fill="rgba(15,18,12,0.65)"/>
      <rect x="240" y="185" width="16" height="155" fill="rgba(15,18,12,0.60)"/>
      <rect x="370" y="185" width="16" height="155" fill="rgba(15,18,12,0.65)"/>
      <ellipse cx="11" cy="158" rx="38" ry="50" fill="rgba(10,22,10,0.78)"/>
      <ellipse cx="469" cy="172" rx="36" ry="46" fill="rgba(10,22,10,0.78)"/>
      <ellipse cx="98" cy="175" rx="30" ry="42" fill="rgba(10,22,10,0.68)"/>
      <ellipse cx="248" cy="182" rx="28" ry="40" fill="rgba(10,22,10,0.65)"/>
      <ellipse cx="378" cy="182" rx="28" ry="40" fill="rgba(10,22,10,0.68)"/>
      <rect x="158" y="210" width="14" height="130" fill="rgba(12,15,10,0.85)"/>
      <rect x="306" y="220" width="14" height="120" fill="rgba(12,15,10,0.85)"/>
      <ellipse cx="165" cy="206" rx="30" ry="48" fill="rgba(8,18,8,0.85)"/>
      <ellipse cx="313" cy="216" rx="28" ry="44" fill="rgba(8,18,8,0.85)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="rgba(8,14,8,0.92)"/>
      <ellipse cx="240" cy="10" rx="260" ry="14" fill="rgba(180,200,180,0.1)"/>
      <ellipse cx="120" cy="20" rx="140" ry="10" fill="rgba(180,200,180,0.07)"/>
      <ellipse cx="370" cy="18" rx="130" ry="9" fill="rgba(180,200,180,0.07)"/>`,
  },
   platform_934: {
    label: 'Andén 9¾',
    svgSky: `
      <!-- Platform 9¾ — brick wall with magical barrier and sign -->
      <rect x="0" y="0" width="240" height="340" fill="#3d1e0e"/>

      <!-- === BRICK WALL (staggered rows, JS-generated) === -->
      ${Array.from({length:26},(_,r)=>{const y=r*13;const off=r%2===0?-2:11;return Array.from({length:10},(_,b)=>{const x=off+b*27;const c=['rgba(92,38,18,0.62)','rgba(76,30,14,0.60)','rgba(108,44,22,0.58)','rgba(84,34,16,0.63)'][(b+r)%4];return `<rect x="${x}" y="${y}" width="25" height="11" rx="1" fill="${c}"/>`;}).join('');}).join('')}

      <!-- === VICTORIAN STATION TOP (iron arch) === -->
      <path d="M14,0 Q120,-16 226,0" fill="none" stroke="rgba(45,35,22,0.9)" stroke-width="16"/>
      <path d="M14,0 Q120,-16 226,0" fill="none" stroke="rgba(68,55,36,0.4)"  stroke-width="6"/>

      <!-- === IRON COLUMNS === -->
      <rect x="0"   y="0" width="14" height="340" fill="rgba(42,32,20,0.92)"/>
      <rect x="226" y="0" width="14" height="340" fill="rgba(42,32,20,0.92)"/>
      <rect x="12"  y="0" width="3"  height="340" fill="rgba(62,50,30,0.55)"/>
      <rect x="225" y="0" width="3"  height="340" fill="rgba(62,50,30,0.55)"/>
      <rect x="0"   y="0"   width="16" height="14" fill="rgba(52,42,26,0.95)"/>
      <rect x="224" y="0"   width="16" height="14" fill="rgba(52,42,26,0.95)"/>
      <rect x="0"   y="326" width="16" height="14" fill="rgba(52,42,26,0.95)"/>
      <rect x="224" y="326" width="16" height="14" fill="rgba(52,42,26,0.95)"/>

      <!-- === SIGN BRACKETS === -->
      <rect x="72"  y="27" width="10" height="6" rx="1" fill="rgba(68,55,32,0.88)"/>
      <rect x="158" y="27" width="10" height="6" rx="1" fill="rgba(68,55,32,0.88)"/>
      <line x1="77"  y1="33" x2="72"  y2="50" stroke="rgba(138,110,46,0.78)" stroke-width="1.5"/>
      <line x1="163" y1="33" x2="168" y2="50" stroke="rgba(138,110,46,0.78)" stroke-width="1.5"/>
      <!-- Sign board -->
      <rect x="60"  y="50" width="120" height="36" rx="4" fill="#120b04"/>
      <rect x="62"  y="52" width="116" height="32" rx="3" fill="none" stroke="rgba(172,138,46,0.68)" stroke-width="1.5"/>
      <text x="120" y="73" font-size="13" font-weight="bold" text-anchor="middle" fill="rgba(255,218,70,0.96)">PLATFORM 9¾</text>

      <!-- === GAS LAMPS (on columns) === -->
      <rect x="8"   y="104" width="3" height="24" fill="rgba(142,112,46,0.82)"/>
      <ellipse cx="9.5"   cy="102" rx="9" ry="6" fill="rgba(255,205,75,0.45)"/>
      <ellipse cx="9.5"   cy="98"  rx="5" ry="4" fill="rgba(255,240,130,0.58)"/>
      <rect x="229" y="104" width="3" height="24" fill="rgba(142,112,46,0.82)"/>
      <ellipse cx="230.5" cy="102" rx="9" ry="6" fill="rgba(255,205,75,0.45)"/>
      <ellipse cx="230.5" cy="98"  rx="5" ry="4" fill="rgba(255,240,130,0.58)"/>

      <!-- === MAGICAL BARRIER === -->
      <!-- Arch wash (slight lighter interior) -->
      <path d="M82,300 Q72,188 120,96 Q168,188 158,300 Z" fill="rgba(140,100,220,0.07)"/>
      <!-- Glow layers (outer to inner) -->
      <ellipse cx="120" cy="198" rx="66" ry="98" fill="rgba(95,65,205,0.05)"/>
      <ellipse cx="120" cy="198" rx="54" ry="80" fill="rgba(115,80,220,0.07)"/>
      <ellipse cx="120" cy="198" rx="42" ry="63" fill="rgba(135,98,232,0.10)"/>
      <ellipse cx="120" cy="198" rx="30" ry="46" fill="rgba(155,118,242,0.14)"/>
      <ellipse cx="120" cy="198" rx="20" ry="31" fill="rgba(175,145,252,0.19)"/>
      <ellipse cx="120" cy="198" rx="12" ry="19" fill="rgba(200,178,255,0.25)"/>
      <ellipse cx="120" cy="198" rx="6"  ry="10" fill="rgba(228,215,255,0.32)"/>
      <!-- Arch outline -->
      <path d="M82,300 Q72,188 120,96 Q168,188 158,300" fill="none" stroke="rgba(172,145,255,0.24)" stroke-width="2.5"/>
      <!-- Magic ripple lines -->
      <path d="M93,148 Q120,143 147,148" fill="none" stroke="rgba(172,148,255,0.34)" stroke-width="1.5"/>
      <path d="M87,163 Q120,157 153,163" fill="none" stroke="rgba(172,148,255,0.30)" stroke-width="1.5"/>
      <path d="M84,178 Q120,171 156,178" fill="none" stroke="rgba(172,148,255,0.27)" stroke-width="1.5"/>
      <path d="M83,193 Q120,200 157,193" fill="none" stroke="rgba(172,148,255,0.25)" stroke-width="1.5"/>
      <path d="M84,208 Q120,215 156,208" fill="none" stroke="rgba(172,148,255,0.23)" stroke-width="1.5"/>
      <path d="M87,223 Q120,230 153,223" fill="none" stroke="rgba(172,148,255,0.21)" stroke-width="1.5"/>
      <path d="M91,238 Q120,245 149,238" fill="none" stroke="rgba(172,148,255,0.18)" stroke-width="1.5"/>
      <!-- Sparkle dots at arch edges -->
      <circle cx="83"  cy="144" r="1.5" fill="rgba(210,190,255,0.58)"/>
      <circle cx="157" cy="150" r="1.5" fill="rgba(210,190,255,0.55)"/>
      <circle cx="76"  cy="185" r="1.5" fill="rgba(210,190,255,0.48)"/>
      <circle cx="164" cy="192" r="1.5" fill="rgba(210,190,255,0.48)"/>
      <circle cx="83"  cy="228" r="1.5" fill="rgba(210,190,255,0.42)"/>
      <circle cx="157" cy="235" r="1.5" fill="rgba(210,190,255,0.40)"/>
      <circle cx="100" cy="112" r="1"   fill="rgba(210,190,255,0.38)"/>
      <circle cx="142" cy="116" r="1"   fill="rgba(210,190,255,0.38)"/>
      <!-- Barrier base shimmer (where trolley enters) -->
      <ellipse cx="113" cy="262" rx="22" ry="7" fill="rgba(150,122,248,0.20)"/>
      <ellipse cx="113" cy="266" rx="16" ry="4" fill="rgba(175,152,255,0.24)"/>`,
    svgGround: `
      <!-- groundH=80. Stone platform + trolley entering barrier -->

      <!-- === STONE FLOOR === -->
      <rect x="0" y="0" width="240" height="80" fill="#625648"/>
      <line x1="48"  y1="0" x2="48"  y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="96"  y1="0" x2="96"  y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="144" y1="0" x2="144" y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="192" y1="0" x2="192" y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="0"   y1="40" x2="240" y2="40" stroke="rgba(86,74,58,0.38)" stroke-width="1"/>
      <!-- Yellow safety line -->
      <rect x="0" y="10" width="240" height="3" fill="rgba(255,225,50,0.55)"/>
      <!-- Portal glow on floor -->
      <ellipse cx="113" cy="2" rx="44" ry="9" fill="rgba(125,88,218,0.16)"/>

      <!-- === LUGGAGE TROLLEY (entering barrier, negative-y appears in barrier zone) === -->
      <!-- Frame uprights -->
      <rect x="96"  y="-55" width="4"  height="62" rx="1" fill="rgba(78,56,26,0.90)"/>
      <rect x="122" y="-55" width="4"  height="62" rx="1" fill="rgba(78,56,26,0.90)"/>
      <!-- Top bar -->
      <rect x="96"  y="-55" width="30" height="4"  rx="1" fill="rgba(88,62,30,0.88)"/>
      <!-- Shelf crossbar -->
      <rect x="94"  y="-28" width="36" height="5"  rx="2" fill="rgba(92,68,36,0.92)"/>
      <!-- Handle bar -->
      <rect x="126" y="-52" width="4"  height="55" rx="1" fill="rgba(70,50,22,0.90)"/>
      <rect x="124" y="-54" width="8"  height="4"  rx="1" fill="rgba(70,50,22,0.88)"/>
      <!-- Trunk on top shelf -->
      <rect x="97"  y="-52" width="28" height="20" rx="2" fill="rgba(86,56,34,0.88)"/>
      <rect x="99"  y="-50" width="4"  height="16" fill="rgba(68,42,24,0.82)"/>
      <rect x="119" y="-50" width="4"  height="16" fill="rgba(68,42,24,0.82)"/>
      <rect x="99"  y="-43" width="24" height="2"  fill="rgba(152,112,56,0.55)"/>
      <!-- Owl cage on lower shelf -->
      <rect x="98"  y="-23" width="22" height="20" rx="1" fill="none" stroke="rgba(165,128,50,0.72)" stroke-width="1.5"/>
      <line x1="109" y1="-23" x2="109" y2="-3"    stroke="rgba(165,128,50,0.60)" stroke-width="1"/>
      <ellipse cx="109" cy="-12" rx="4" ry="3.5"   fill="rgba(240,234,218,0.68)"/>
      <!-- Wheels (on platform) -->
      <circle cx="100" cy="15" r="9"   fill="#1a1a1a"/>
      <circle cx="100" cy="15" r="6"   fill="#242424"/>
      <circle cx="100" cy="15" r="2.5" fill="#585858"/>
      <circle cx="122" cy="15" r="9"   fill="#1a1a1a"/>
      <circle cx="122" cy="15" r="6"   fill="#242424"/>
      <circle cx="122" cy="15" r="2.5" fill="#585858"/>
      <!-- Axle -->
      <rect x="94" y="13" width="36" height="4" rx="1" fill="rgba(46,36,22,0.85)"/>
      <!-- Magic shimmer at wall/floor junction -->
      <ellipse cx="113" cy="-1" rx="22" ry="7"  fill="rgba(152,124,250,0.26)"/>
      <ellipse cx="113" cy="2"  rx="16" ry="4"  fill="rgba(178,155,255,0.22)"/>

      <!-- Scattered items on platform -->
      <path d="M162,52 Q168,47 175,54" fill="none" stroke="rgba(218,213,198,0.48)" stroke-width="2"/>
      <path d="M184,64 Q191,58 198,65" fill="none" stroke="rgba(218,213,198,0.42)" stroke-width="2"/>
      <rect x="44" y="58" width="18" height="12" rx="2" fill="rgba(196,158,58,0.55)"/>
      <rect x="44" y="58" width="18" height="4"  rx="2" fill="rgba(220,178,68,0.45)"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#3d1e0e"/>
      ${Array.from({length:26},(_,r)=>{const y=r*13;const off=r%2===0?-2:11;return Array.from({length:20},(_,b)=>{const x=off+b*27;const c=['rgba(92,38,18,0.62)','rgba(76,30,14,0.60)','rgba(108,44,22,0.58)','rgba(84,34,16,0.63)'][(b+r)%4];return `<rect x="${x}" y="${y}" width="25" height="11" rx="1" fill="${c}"/>`;}).join('');}).join('')}
      <path d="M14,0 Q240,-16 466,0" fill="none" stroke="rgba(45,35,22,0.9)" stroke-width="16"/>
      <path d="M14,0 Q240,-16 466,0" fill="none" stroke="rgba(68,55,36,0.4)" stroke-width="6"/>
      <rect x="0" y="0" width="14" height="340" fill="rgba(42,32,20,0.92)"/>
      <rect x="466" y="0" width="14" height="340" fill="rgba(42,32,20,0.92)"/>
      <rect x="12" y="0" width="3" height="340" fill="rgba(62,50,30,0.55)"/>
      <rect x="465" y="0" width="3" height="340" fill="rgba(62,50,30,0.55)"/>
      <rect x="0" y="0" width="16" height="14" fill="rgba(52,42,26,0.95)"/>
      <rect x="464" y="0" width="16" height="14" fill="rgba(52,42,26,0.95)"/>
      <rect x="0" y="326" width="16" height="14" fill="rgba(52,42,26,0.95)"/>
      <rect x="464" y="326" width="16" height="14" fill="rgba(52,42,26,0.95)"/>
      <rect x="212" y="27" width="10" height="6" rx="1" fill="rgba(68,55,32,0.88)"/>
      <rect x="258" y="27" width="10" height="6" rx="1" fill="rgba(68,55,32,0.88)"/>
      <line x1="217" y1="33" x2="212" y2="50" stroke="rgba(138,110,46,0.78)" stroke-width="1.5"/>
      <line x1="263" y1="33" x2="268" y2="50" stroke="rgba(138,110,46,0.78)" stroke-width="1.5"/>
      <rect x="200" y="50" width="120" height="36" rx="4" fill="#120b04"/>
      <rect x="202" y="52" width="116" height="32" rx="3" fill="none" stroke="rgba(172,138,46,0.68)" stroke-width="1.5"/>
      <text x="260" y="73" font-size="13" font-weight="bold" text-anchor="middle" fill="rgba(255,218,70,0.96)">PLATFORM 9¾</text>
      <rect x="8" y="104" width="3" height="24" fill="rgba(142,112,46,0.82)"/>
      <ellipse cx="9.5" cy="102" rx="9" ry="6" fill="rgba(255,205,75,0.45)"/>
      <ellipse cx="9.5" cy="98" rx="5" ry="4" fill="rgba(255,240,130,0.58)"/>
      <rect x="469" y="104" width="3" height="24" fill="rgba(142,112,46,0.82)"/>
      <ellipse cx="470.5" cy="102" rx="9" ry="6" fill="rgba(255,205,75,0.45)"/>
      <ellipse cx="470.5" cy="98" rx="5" ry="4" fill="rgba(255,240,130,0.58)"/>
      <path d="M162,300 Q152,188 260,96 Q308,188 318,300 Z" fill="rgba(140,100,220,0.07)"/>
      <ellipse cx="260" cy="198" rx="66" ry="98" fill="rgba(95,65,205,0.05)"/>
      <ellipse cx="260" cy="198" rx="54" ry="80" fill="rgba(115,80,220,0.07)"/>
      <ellipse cx="260" cy="198" rx="42" ry="63" fill="rgba(135,98,232,0.10)"/>
      <ellipse cx="260" cy="198" rx="30" ry="46" fill="rgba(155,118,242,0.14)"/>
      <ellipse cx="260" cy="198" rx="20" ry="31" fill="rgba(175,145,252,0.19)"/>
      <ellipse cx="260" cy="198" rx="12" ry="19" fill="rgba(200,178,255,0.25)"/>
      <ellipse cx="260" cy="198" rx="6" ry="10" fill="rgba(228,215,255,0.32)"/>
      <path d="M222,300 Q212,188 260,96 Q308,188 298,300" fill="none" stroke="rgba(172,145,255,0.24)" stroke-width="2.5"/>
      <path d="M233,148 Q260,143 287,148" fill="none" stroke="rgba(172,148,255,0.34)" stroke-width="1.5"/>
      <path d="M227,163 Q260,157 293,163" fill="none" stroke="rgba(172,148,255,0.30)" stroke-width="1.5"/>
      <path d="M224,178 Q260,171 296,178" fill="none" stroke="rgba(172,148,255,0.27)" stroke-width="1.5"/>
      <path d="M223,193 Q260,200 297,193" fill="none" stroke="rgba(172,148,255,0.25)" stroke-width="1.5"/>
      <ellipse cx="253" cy="262" rx="22" ry="7" fill="rgba(150,122,248,0.20)"/>
      <ellipse cx="253" cy="266" rx="16" ry="4" fill="rgba(175,152,255,0.24)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#625648"/>
      <line x1="96" y1="0" x2="96" y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="192" y1="0" x2="192" y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="288" y1="0" x2="288" y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="384" y1="0" x2="384" y2="80" stroke="rgba(86,74,58,0.45)" stroke-width="1"/>
      <line x1="0" y1="40" x2="480" y2="40" stroke="rgba(86,74,58,0.38)" stroke-width="1"/>
      <rect x="0" y="10" width="480" height="3" fill="rgba(255,225,50,0.55)"/>
      <ellipse cx="253" cy="2" rx="44" ry="9" fill="rgba(125,88,218,0.16)"/>
      <rect x="236" y="-55" width="4" height="62" rx="1" fill="rgba(78,56,26,0.90)"/>
      <rect x="262" y="-55" width="4" height="62" rx="1" fill="rgba(78,56,26,0.90)"/>
      <rect x="236" y="-55" width="30" height="4" rx="1" fill="rgba(88,62,30,0.88)"/>
      <rect x="234" y="-28" width="36" height="5" rx="2" fill="rgba(92,68,36,0.92)"/>
      <rect x="237" y="-52" width="28" height="20" rx="2" fill="rgba(86,56,34,0.88)"/>
      <rect x="238" y="-23" width="22" height="20" rx="1" fill="none" stroke="rgba(165,128,50,0.72)" stroke-width="1.5"/>
      <ellipse cx="249" cy="-12" rx="4" ry="3.5" fill="rgba(240,234,218,0.68)"/>
      <circle cx="240" cy="15" r="9" fill="#1a1a1a"/>
      <circle cx="240" cy="15" r="6" fill="#242424"/>
      <circle cx="240" cy="15" r="2.5" fill="#585858"/>
      <circle cx="263" cy="15" r="9" fill="#1a1a1a"/>
      <circle cx="263" cy="15" r="6" fill="#242424"/>
      <circle cx="263" cy="15" r="2.5" fill="#585858"/>
      <rect x="234" y="13" width="36" height="4" rx="1" fill="rgba(46,36,22,0.85)"/>
      <ellipse cx="253" cy="-1" rx="22" ry="7" fill="rgba(152,124,250,0.26)"/>`,
  },
  potions_class: {
    label: 'Aula de Pociones',
    svgSky: `
      <!-- Dungeon Potions Classroom -->
      <rect x="0" y="0" width="240" height="340" fill="#0a080f"/>

      <!-- Vaulted stone ceiling ribs -->
      <path d="M-10,0 Q80,200 170,0" fill="none" stroke="rgba(70,60,85,0.6)" stroke-width="12"/>
      <path d="M70,0 Q160,190 250,0" fill="none" stroke="rgba(70,60,85,0.5)" stroke-width="12"/>
      <path d="M-10,0 Q80,200 170,0" fill="none" stroke="rgba(100,90,115,0.18)" stroke-width="4"/>
      <path d="M70,0 Q160,190 250,0" fill="none" stroke="rgba(100,90,115,0.15)" stroke-width="4"/>
      <!-- Stone ceiling frieze -->
      <rect x="0" y="0" width="240" height="22" fill="rgba(38,32,48,0.9)"/>
      <polygon points="115,0 125,0 130,22 110,22" fill="rgba(55,47,68,0.5)"/>

      <!-- === LEFT STONE WALL === -->
      <rect x="0" y="40" width="18" height="300" fill="rgba(32,27,42,0.95)"/>
      <rect x="0" y="58"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="80"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="102" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="124" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="146" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="168" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="190" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>

      <!-- Left shelf 1 + bottles -->
      <rect x="0" y="88" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="3"  y="68" width="7" height="22" rx="2" fill="rgba(30,100,45,0.85)"/>
      <rect x="3"  y="66" width="7" height="4"  rx="1" fill="rgba(40,120,55,0.7)"/>
      <rect x="13" y="72" width="6" height="18" rx="2" fill="rgba(90,20,120,0.85)"/>
      <rect x="13" y="70" width="6" height="4"  rx="1" fill="rgba(110,30,140,0.7)"/>
      <rect x="22" y="66" width="8" height="24" rx="2" fill="rgba(160,45,20,0.85)"/>
      <rect x="22" y="64" width="8" height="4"  rx="1" fill="rgba(190,55,25,0.7)"/>
      <rect x="33" y="70" width="6" height="20" rx="2" fill="rgba(40,70,160,0.85)"/>
      <rect x="33" y="68" width="6" height="4"  rx="1" fill="rgba(55,90,185,0.7)"/>
      <rect x="42" y="67" width="8" height="23" rx="2" fill="rgba(190,130,20,0.85)"/>
      <rect x="42" y="65" width="8" height="4"  rx="1" fill="rgba(215,155,25,0.7)"/>
      <rect x="53" y="72" width="6" height="18" rx="2" fill="rgba(25,120,90,0.85)"/>
      <rect x="62" y="69" width="5" height="21" rx="2" fill="rgba(130,20,60,0.8)"/>

      <!-- Left shelf 2 + bottles -->
      <rect x="0" y="148" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="3"  y="128" width="7" height="22" rx="2" fill="rgba(110,160,30,0.8)"/>
      <rect x="3"  y="126" width="7" height="4"  rx="1" fill="rgba(130,185,35,0.65)"/>
      <rect x="13" y="132" width="6" height="18" rx="2" fill="rgba(60,15,90,0.85)"/>
      <rect x="22" y="126" width="8" height="24" rx="2" fill="rgba(20,40,150,0.8)"/>
      <rect x="33" y="130" width="6" height="20" rx="2" fill="rgba(155,25,45,0.85)"/>
      <rect x="42" y="127" width="8" height="23" rx="2" fill="rgba(40,130,65,0.8)"/>
      <rect x="53" y="132" width="6" height="18" rx="2" fill="rgba(170,140,20,0.75)"/>
      <rect x="62" y="129" width="5" height="21" rx="2" fill="rgba(30,80,140,0.75)"/>

      <!-- Left shelf 3 + bottles -->
      <rect x="0" y="208" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="3"  y="188" width="7" height="22" rx="2" fill="rgba(35,90,170,0.8)"/>
      <rect x="13" y="192" width="6" height="18" rx="2" fill="rgba(130,25,90,0.8)"/>
      <rect x="22" y="186" width="8" height="24" rx="2" fill="rgba(60,150,35,0.75)"/>
      <rect x="33" y="190" width="6" height="20" rx="2" fill="rgba(185,80,20,0.8)"/>
      <rect x="42" y="188" width="8" height="22" rx="2" fill="rgba(80,20,120,0.75)"/>
      <rect x="53" y="193" width="6" height="17" rx="2" fill="rgba(200,160,25,0.7)"/>

      <!-- === RIGHT STONE WALL === -->
      <rect x="222" y="40" width="18" height="300" fill="rgba(32,27,42,0.95)"/>
      <rect x="222" y="58"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="222" y="80"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="222" y="102" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="222" y="124" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="222" y="146" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="222" y="168" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="222" y="190" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>

      <!-- Right shelf 1 + bottles -->
      <rect x="172" y="88" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="174" y="68" width="7" height="22" rx="2" fill="rgba(185,55,20,0.85)"/>
      <rect x="174" y="66" width="7" height="4"  rx="1" fill="rgba(215,70,25,0.7)"/>
      <rect x="184" y="72" width="6" height="18" rx="2" fill="rgba(40,110,190,0.85)"/>
      <rect x="193" y="66" width="8" height="24" rx="2" fill="rgba(100,25,130,0.85)"/>
      <rect x="204" y="70" width="6" height="20" rx="2" fill="rgba(30,130,55,0.85)"/>
      <rect x="213" y="68" width="7" height="22" rx="2" fill="rgba(175,135,25,0.8)"/>

      <!-- Right shelf 2 + bottles -->
      <rect x="172" y="148" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="174" y="128" width="7" height="22" rx="2" fill="rgba(130,150,20,0.8)"/>
      <rect x="184" y="132" width="6" height="18" rx="2" fill="rgba(85,18,110,0.85)"/>
      <rect x="193" y="126" width="8" height="24" rx="2" fill="rgba(165,55,30,0.8)"/>
      <rect x="204" y="130" width="6" height="20" rx="2" fill="rgba(22,110,195,0.8)"/>
      <rect x="213" y="128" width="7" height="22" rx="2" fill="rgba(50,145,70,0.75)"/>

      <!-- === FLOATING CANDLES === -->
      <rect x="90"  y="32" width="4" height="16" rx="1" fill="rgba(235,225,200,0.85)"/>
      <ellipse cx="92"    cy="30" rx="4"   ry="5"   fill="rgba(255,170,30,0.50)"/>
      <ellipse cx="92"    cy="27" rx="2.5" ry="3.5" fill="rgba(255,235,120,0.70)"/>
      <rect x="112" y="24" width="4" height="16" rx="1" fill="rgba(235,225,200,0.80)"/>
      <ellipse cx="114"   cy="22" rx="4"   ry="5"   fill="rgba(255,170,30,0.45)"/>
      <ellipse cx="114"   cy="19" rx="2.5" ry="3.5" fill="rgba(255,235,120,0.65)"/>
      <rect x="133" y="35" width="4" height="16" rx="1" fill="rgba(235,225,200,0.85)"/>
      <ellipse cx="135"   cy="33" rx="4"   ry="5"   fill="rgba(255,170,30,0.50)"/>
      <ellipse cx="135"   cy="30" rx="2.5" ry="3.5" fill="rgba(255,235,120,0.70)"/>
      <rect x="70"  y="40" width="3" height="14" rx="1" fill="rgba(235,225,200,0.70)"/>
      <ellipse cx="71.5"  cy="38" rx="3.5" ry="4.5" fill="rgba(255,170,30,0.40)"/>
      <ellipse cx="71.5"  cy="35" rx="2"   ry="3"   fill="rgba(255,235,120,0.55)"/>
      <rect x="157" y="38" width="3" height="14" rx="1" fill="rgba(235,225,200,0.70)"/>
      <ellipse cx="158.5" cy="36" rx="3.5" ry="4.5" fill="rgba(255,170,30,0.40)"/>
      <ellipse cx="158.5" cy="33" rx="2"   ry="3"   fill="rgba(255,235,120,0.55)"/>

      <!-- === BLACKBOARD === -->
      <rect x="68" y="52" width="104" height="68" rx="4" fill="rgba(18,38,18,0.85)"/>
      <rect x="70" y="54" width="100" height="64" rx="3" fill="rgba(28,52,24,0.6)"/>
      <rect x="67" y="51"  width="106" height="4" rx="1" fill="rgba(80,55,30,0.75)"/>
      <rect x="67" y="116" width="106" height="4" rx="1" fill="rgba(80,55,30,0.75)"/>
      <rect x="67" y="51"  width="4" height="69" rx="1" fill="rgba(80,55,30,0.75)"/>
      <rect x="169" y="51" width="4" height="69" rx="1" fill="rgba(80,55,30,0.75)"/>
      <text x="120" y="68" font-size="6" font-weight="bold" text-anchor="middle" fill="rgba(245,245,235,0.55)">Amortentia</text>
      <line x1="78" y1="76" x2="162" y2="76" stroke="rgba(240,240,230,0.35)" stroke-width="1.5"/>
      <line x1="78" y1="83" x2="155" y2="83" stroke="rgba(240,240,230,0.30)" stroke-width="1.5"/>
      <line x1="78" y1="90" x2="148" y2="90" stroke="rgba(240,240,230,0.25)" stroke-width="1.5"/>
      <line x1="78" y1="97" x2="142" y2="97" stroke="rgba(240,240,230,0.20)" stroke-width="1.5"/>

      <!-- === CAULDRON AMBIENT GLOW (visible at bottom of sky layer) === -->
      <ellipse cx="82" cy="285" rx="65" ry="45" fill="rgba(40,200,70,0.07)"/>
      <ellipse cx="82" cy="308" rx="45" ry="30" fill="rgba(60,220,90,0.09)"/>
      <ellipse cx="82" cy="328" rx="30" ry="20" fill="rgba(80,240,100,0.11)"/>`,
    svgGround: `
      <!-- groundH=100. y=0..100=floor+props -->

      <!-- === STONE FLOOR === -->
      <rect x="0" y="0" width="240" height="100" fill="#252030"/>
      <line x1="60"  y1="0" x2="60"  y2="100" stroke="rgba(50,42,65,0.5)" stroke-width="1"/>
      <line x1="120" y1="0" x2="120" y2="100" stroke="rgba(50,42,65,0.5)" stroke-width="1"/>
      <line x1="180" y1="0" x2="180" y2="100" stroke="rgba(50,42,65,0.5)" stroke-width="1"/>
      <line x1="0" y1="50" x2="240" y2="50" stroke="rgba(50,42,65,0.4)" stroke-width="1"/>

      <!-- === IRON CAULDRON === -->
      <!-- Steam wisps (negative y = above ground boundary, visible in scene) -->
      <ellipse cx="82" cy="-18" rx="18" ry="12" fill="rgba(60,220,90,0.18)"/>
      <ellipse cx="70" cy="-28" rx="14" ry="10" fill="rgba(60,220,90,0.14)"/>
      <ellipse cx="95" cy="-24" rx="16" ry="10" fill="rgba(60,220,90,0.12)"/>
      <ellipse cx="80" cy="-10" rx="22" ry="9"  fill="rgba(60,220,90,0.22)"/>
      <!-- Cauldron rim -->
      <ellipse cx="82" cy="18" rx="30" ry="10" fill="#111"/>
      <!-- Bubbling liquid -->
      <ellipse cx="82" cy="18" rx="27" ry="8"  fill="rgba(30,160,55,0.7)"/>
      <ellipse cx="74" cy="16" rx="7"  ry="4"  fill="rgba(60,220,80,0.55)"/>
      <ellipse cx="92" cy="17" rx="5"  ry="3"  fill="rgba(50,200,70,0.50)"/>
      <!-- Cauldron body -->
      <path d="M52,18 Q45,60 52,72 Q62,82 82,84 Q102,82 112,72 Q119,60 112,18" fill="#1a1a1e"/>
      <!-- Rim highlight ring -->
      <ellipse cx="82" cy="18" rx="30" ry="10" fill="none" stroke="rgba(90,85,100,0.6)" stroke-width="2"/>
      <!-- Legs -->
      <rect x="58" y="82" width="6" height="14" rx="2" fill="#111"/>
      <rect x="79" y="84" width="6" height="12" rx="2" fill="#111"/>
      <rect x="100" y="82" width="6" height="14" rx="2" fill="#111"/>
      <ellipse cx="61" cy="96" rx="5" ry="2" fill="rgba(50,45,60,0.8)"/>
      <ellipse cx="82" cy="96" rx="5" ry="2" fill="rgba(50,45,60,0.8)"/>
      <ellipse cx="103" cy="96" rx="5" ry="2" fill="rgba(50,45,60,0.8)"/>
      <!-- Floor glow under cauldron -->
      <ellipse cx="82" cy="97" rx="35" ry="5" fill="rgba(40,180,60,0.12)"/>

      <!-- Small bottles near cauldron -->
      <rect x="124" y="68" width="6" height="18" rx="2" fill="rgba(100,20,120,0.8)"/>
      <rect x="124" y="66" width="6" height="4"  rx="1" fill="rgba(120,30,140,0.65)"/>
      <rect x="133" y="72" width="5" height="14" rx="2" fill="rgba(25,120,50,0.8)"/>
      <rect x="133" y="70" width="5" height="4"  rx="1" fill="rgba(35,145,60,0.65)"/>

      <!-- === WORKBENCH (right) === -->
      <rect x="152" y="28" width="82" height="42" rx="3" fill="rgba(55,40,25,0.9)"/>
      <rect x="150" y="26" width="86" height="6"  rx="2" fill="rgba(75,55,32,0.95)"/>
      <rect x="154" y="68" width="8"  height="30" fill="rgba(45,30,18,0.9)"/>
      <rect x="222" y="68" width="8"  height="30" fill="rgba(45,30,18,0.9)"/>
      <!-- Mortar & pestle -->
      <ellipse cx="168" cy="26" rx="10" ry="6" fill="rgba(80,75,85,0.85)"/>
      <ellipse cx="168" cy="24" rx="9"  ry="4" fill="rgba(100,95,105,0.70)"/>
      <rect x="166" y="8"  width="4" height="18" rx="2" fill="rgba(100,95,105,0.80)"/>
      <ellipse cx="168" cy="7" rx="5" ry="3" fill="rgba(110,105,115,0.75)"/>
      <!-- Ingredient jars -->
      <rect x="186" y="10" width="10" height="18" rx="3" fill="rgba(35,95,55,0.8)"/>
      <rect x="186" y="8"  width="10" height="5"  rx="1" fill="rgba(70,130,80,0.6)"/>
      <rect x="200" y="12" width="10" height="16" rx="3" fill="rgba(150,55,25,0.8)"/>
      <rect x="200" y="10" width="10" height="5"  rx="1" fill="rgba(185,75,35,0.6)"/>
      <rect x="214" y="9"  width="10" height="17" rx="3" fill="rgba(45,45,130,0.8)"/>
      <rect x="214" y="7"  width="10" height="5"  rx="1" fill="rgba(65,65,160,0.6)"/>`,
    groundH: 100,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#0a080f"/>
      <path d="M-10,0 Q160,200 330,0" fill="none" stroke="rgba(70,60,85,0.6)" stroke-width="12"/>
      <path d="M150,0 Q320,190 490,0" fill="none" stroke="rgba(70,60,85,0.5)" stroke-width="12"/>
      <rect x="0" y="0" width="480" height="22" fill="rgba(38,32,48,0.9)"/>
      <rect x="0" y="40" width="18" height="300" fill="rgba(32,27,42,0.95)"/>
      <rect x="0" y="58"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="80"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="102" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="124" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="0" y="88" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="3"  y="68" width="7" height="22" rx="2" fill="rgba(30,100,45,0.85)"/>
      <rect x="13" y="72" width="6" height="18" rx="2" fill="rgba(90,20,120,0.85)"/>
      <rect x="22" y="66" width="8" height="24" rx="2" fill="rgba(160,45,20,0.85)"/>
      <rect x="33" y="70" width="6" height="20" rx="2" fill="rgba(40,70,160,0.85)"/>
      <rect x="42" y="67" width="8" height="23" rx="2" fill="rgba(190,130,20,0.85)"/>
      <rect x="53" y="72" width="6" height="18" rx="2" fill="rgba(25,120,90,0.85)"/>
      <rect x="62" y="69" width="5" height="21" rx="2" fill="rgba(130,20,60,0.8)"/>
      <rect x="0" y="148" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="3"  y="128" width="7" height="22" rx="2" fill="rgba(110,160,30,0.8)"/>
      <rect x="13" y="132" width="6" height="18" rx="2" fill="rgba(60,15,90,0.85)"/>
      <rect x="22" y="126" width="8" height="24" rx="2" fill="rgba(20,40,150,0.8)"/>
      <rect x="33" y="130" width="6" height="20" rx="2" fill="rgba(155,25,45,0.85)"/>
      <rect x="42" y="127" width="8" height="23" rx="2" fill="rgba(40,130,65,0.8)"/>
      <rect x="462" y="40" width="18" height="300" fill="rgba(32,27,42,0.95)"/>
      <rect x="462" y="58"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="462" y="80"  width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="462" y="102" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="462" y="124" width="18" height="1.5" fill="rgba(55,47,68,0.5)"/>
      <rect x="412" y="88" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="414" y="68" width="7" height="22" rx="2" fill="rgba(185,55,20,0.85)"/>
      <rect x="424" y="72" width="6" height="18" rx="2" fill="rgba(40,110,190,0.85)"/>
      <rect x="433" y="66" width="8" height="24" rx="2" fill="rgba(100,25,130,0.85)"/>
      <rect x="444" y="70" width="6" height="20" rx="2" fill="rgba(30,130,55,0.85)"/>
      <rect x="453" y="68" width="7" height="22" rx="2" fill="rgba(175,135,25,0.8)"/>
      <rect x="412" y="148" width="68" height="5" fill="rgba(75,55,35,0.9)"/>
      <rect x="414" y="128" width="7" height="22" rx="2" fill="rgba(130,150,20,0.8)"/>
      <rect x="424" y="132" width="6" height="18" rx="2" fill="rgba(85,18,110,0.85)"/>
      <rect x="433" y="126" width="8" height="24" rx="2" fill="rgba(165,55,30,0.8)"/>
      <rect x="444" y="130" width="6" height="20" rx="2" fill="rgba(22,110,195,0.8)"/>
      <rect x="453" y="128" width="7" height="22" rx="2" fill="rgba(50,145,70,0.75)"/>
      <rect x="176" y="52" width="128" height="68" rx="4" fill="rgba(18,38,18,0.85)"/>
      <rect x="178" y="54" width="124" height="64" rx="3" fill="rgba(28,52,24,0.6)"/>
      <rect x="175" y="51" width="130" height="4" rx="1" fill="rgba(80,55,30,0.75)"/>
      <rect x="175" y="116" width="130" height="4" rx="1" fill="rgba(80,55,30,0.75)"/>
      <rect x="175" y="51" width="4" height="69" rx="1" fill="rgba(80,55,30,0.75)"/>
      <rect x="301" y="51" width="4" height="69" rx="1" fill="rgba(80,55,30,0.75)"/>
      <text x="240" y="68" font-size="6" font-weight="bold" text-anchor="middle" fill="rgba(245,245,235,0.55)">Amortentia</text>
      <line x1="186" y1="76" x2="294" y2="76" stroke="rgba(240,240,230,0.35)" stroke-width="1.5"/>
      <line x1="186" y1="83" x2="286" y2="83" stroke="rgba(240,240,230,0.30)" stroke-width="1.5"/>
      <rect x="88"  y="32" width="4" height="16" rx="1" fill="rgba(235,225,200,0.85)"/>
      <ellipse cx="90" cy="30" rx="4" ry="5" fill="rgba(255,170,30,0.50)"/>
      <ellipse cx="90" cy="27" rx="2.5" ry="3.5" fill="rgba(255,235,120,0.70)"/>
      <rect x="150" y="24" width="4" height="16" rx="1" fill="rgba(235,225,200,0.80)"/>
      <ellipse cx="152" cy="22" rx="4" ry="5" fill="rgba(255,170,30,0.45)"/>
      <ellipse cx="152" cy="19" rx="2.5" ry="3.5" fill="rgba(255,235,120,0.65)"/>
      <rect x="240" y="35" width="4" height="16" rx="1" fill="rgba(235,225,200,0.85)"/>
      <ellipse cx="242" cy="33" rx="4" ry="5" fill="rgba(255,170,30,0.50)"/>
      <rect x="320" y="24" width="4" height="16" rx="1" fill="rgba(235,225,200,0.80)"/>
      <ellipse cx="322" cy="22" rx="4" ry="5" fill="rgba(255,170,30,0.45)"/>
      <rect x="390" y="35" width="4" height="16" rx="1" fill="rgba(235,225,200,0.85)"/>
      <ellipse cx="392" cy="33" rx="4" ry="5" fill="rgba(255,170,30,0.50)"/>
      <ellipse cx="164" cy="285" rx="120" ry="45" fill="rgba(40,200,70,0.07)"/>
      <ellipse cx="164" cy="308" rx="85" ry="30" fill="rgba(60,220,90,0.09)"/>`,
    groundHWide: 100,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="100" fill="#252030"/>
      <line x1="120" y1="0" x2="120" y2="100" stroke="rgba(50,42,65,0.5)" stroke-width="1"/>
      <line x1="240" y1="0" x2="240" y2="100" stroke="rgba(50,42,65,0.5)" stroke-width="1"/>
      <line x1="360" y1="0" x2="360" y2="100" stroke="rgba(50,42,65,0.5)" stroke-width="1"/>
      <line x1="0" y1="50" x2="480" y2="50" stroke="rgba(50,42,65,0.4)" stroke-width="1"/>
      <ellipse cx="164" cy="18" rx="18" ry="12" fill="rgba(60,220,90,0.18)"/>
      <ellipse cx="150" cy="28" rx="14" ry="10" fill="rgba(60,220,90,0.14)"/>
      <ellipse cx="178" cy="24" rx="16" ry="10" fill="rgba(60,220,90,0.12)"/>
      <ellipse cx="164" cy="10" rx="22" ry="9" fill="rgba(60,220,90,0.22)"/>
      <ellipse cx="164" cy="18" rx="30" ry="10" fill="#111"/>
      <ellipse cx="164" cy="18" rx="27" ry="8" fill="rgba(30,160,55,0.7)"/>
      <path d="M134,18 Q127,60 134,72 Q144,82 164,84 Q184,82 194,72 Q201,60 194,18" fill="#1a1a1e"/>
      <ellipse cx="164" cy="18" rx="30" ry="10" fill="none" stroke="rgba(90,85,100,0.6)" stroke-width="2"/>
      <rect x="140" y="82" width="6" height="14" rx="2" fill="#111"/>
      <rect x="161" y="84" width="6" height="12" rx="2" fill="#111"/>
      <rect x="182" y="82" width="6" height="14" rx="2" fill="#111"/>
      <rect x="304" y="28" width="82" height="42" rx="3" fill="rgba(55,40,25,0.9)"/>
      <rect x="302" y="26" width="86" height="6" rx="2" fill="rgba(75,55,32,0.95)"/>
      <ellipse cx="318" cy="26" rx="10" ry="6" fill="rgba(80,75,85,0.85)"/>
      <rect x="316" y="8" width="4" height="18" rx="2" fill="rgba(100,95,105,0.80)"/>
      <rect x="336" y="10" width="10" height="18" rx="3" fill="rgba(35,95,55,0.8)"/>
      <rect x="350" y="12" width="10" height="16" rx="3" fill="rgba(150,55,25,0.8)"/>
      <rect x="364" y="9" width="10" height="17" rx="3" fill="rgba(45,45,130,0.8)"/>`,
  },
  quidditch: {
    label: 'Quidditch',
    svgSky: `
      <!-- Blue sky -->
      <rect x="0" y="0" width="240" height="340" fill="#4a9fd4"/>
      <!-- Sky gradient overlay -->
      <rect x="0" y="0" width="240" height="120" fill="rgba(30,80,160,0.18)"/>
      <!-- Fluffy clouds -->
      <ellipse cx="50" cy="38" rx="36" ry="16" fill="rgba(255,255,255,0.88)"/>
      <ellipse cx="72" cy="30" rx="28" ry="14" fill="rgba(255,255,255,0.92)"/>
      <ellipse cx="34" cy="44" rx="22" ry="12" fill="rgba(255,255,255,0.8)"/>
      <ellipse cx="180" cy="55" rx="32" ry="14" fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="200" cy="46" rx="24" ry="12" fill="rgba(255,255,255,0.9)"/>
      <ellipse cx="164" cy="60" rx="20" ry="10" fill="rgba(255,255,255,0.78)"/>
      <ellipse cx="120" cy="20" rx="20" ry="9" fill="rgba(255,255,255,0.7)"/>
      <ellipse cx="136" cy="14" rx="16" ry="8" fill="rgba(255,255,255,0.75)"/>
      <!-- Golden snitch high up -->
      <circle cx="170" cy="85" r="7" fill="rgba(255,210,40,0.9)"/>
      <circle cx="170" cy="85" r="4" fill="rgba(255,235,80,0.95)"/>
      <path d="M160,83 Q153,79 147,83" fill="none" stroke="rgba(255,210,40,0.7)" stroke-width="2"/>
      <path d="M180,83 Q187,79 193,83" fill="none" stroke="rgba(255,210,40,0.7)" stroke-width="2"/>
      <!-- Left goal post (tall, in sky) -->
      <rect x="12" y="100" width="6" height="200" fill="rgba(180,150,60,0.8)"/>
      <!-- Left hoops -->
      <circle cx="15" cy="130" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="15" cy="165" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="15" cy="200" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <!-- Right goal post -->
      <rect x="222" y="100" width="6" height="200" fill="rgba(180,150,60,0.8)"/>
      <!-- Right hoops -->
      <circle cx="225" cy="130" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="225" cy="165" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="225" cy="200" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>`,
    svgGround: `
      <!-- Quidditch pitch in perspective -->
      <!-- Base green field -->
      <rect x="0" y="0" width="240" height="80" fill="#2e7d32"/>
      <!-- Perspective trapezoid — lighter centre stripe -->
      <polygon points="80,0 160,0 240,80 0,80" fill="rgba(46,120,46,0.6)"/>
      <!-- Perspective lines converging to horizon centre -->
      <line x1="120" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>
      <line x1="120" y1="0" x2="240" y2="80" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>
      <line x1="120" y1="0" x2="60" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
      <line x1="120" y1="0" x2="180" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
      <!-- Centre circle (ellipse in perspective — near bottom = bigger) -->
      <ellipse cx="120" cy="68" rx="55" ry="10" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <!-- Halfway line (perspective — wider at front) -->
      <line x1="0" y1="50" x2="240" y2="50" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <!-- Goal line (front) -->
      <line x1="0" y1="72" x2="240" y2="72" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <!-- Post bases at ground level -->
      <rect x="9" y="0" width="8" height="20" fill="rgba(160,130,40,0.7)"/>
      <rect x="223" y="0" width="8" height="20" fill="rgba(160,130,40,0.7)"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#4a9fd4"/>
      <rect x="0" y="0" width="480" height="120" fill="rgba(30,80,160,0.18)"/>
      <ellipse cx="70" cy="38" rx="36" ry="16" fill="rgba(255,255,255,0.88)"/>
      <ellipse cx="98" cy="30" rx="28" ry="14" fill="rgba(255,255,255,0.92)"/>
      <ellipse cx="52" cy="44" rx="22" ry="12" fill="rgba(255,255,255,0.8)"/>
      <ellipse cx="280" cy="55" rx="32" ry="14" fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="306" cy="46" rx="24" ry="12" fill="rgba(255,255,255,0.9)"/>
      <ellipse cx="262" cy="60" rx="20" ry="10" fill="rgba(255,255,255,0.78)"/>
      <ellipse cx="390" cy="38" rx="34" ry="14" fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="418" cy="28" rx="22" ry="12" fill="rgba(255,255,255,0.9)"/>
      <ellipse cx="170" cy="20" rx="20" ry="9" fill="rgba(255,255,255,0.7)"/>
      <circle cx="340" cy="85" r="7" fill="rgba(255,210,40,0.9)"/>
      <circle cx="340" cy="85" r="4" fill="rgba(255,235,80,0.95)"/>
      <path d="M330,83 Q323,79 317,83" fill="none" stroke="rgba(255,210,40,0.7)" stroke-width="2"/>
      <path d="M350,83 Q357,79 363,83" fill="none" stroke="rgba(255,210,40,0.7)" stroke-width="2"/>
      <rect x="10" y="100" width="6" height="200" fill="rgba(180,150,60,0.8)"/>
      <circle cx="13" cy="130" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="13" cy="165" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="13" cy="200" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <rect x="464" y="100" width="6" height="200" fill="rgba(180,150,60,0.8)"/>
      <circle cx="467" cy="130" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="467" cy="165" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>
      <circle cx="467" cy="200" r="16" fill="none" stroke="rgba(180,150,60,0.85)" stroke-width="5"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#2e7d32"/>
      <polygon points="160,0 320,0 480,80 0,80" fill="rgba(46,120,46,0.6)"/>
      <line x1="240" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>
      <line x1="240" y1="0" x2="480" y2="80" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>
      <line x1="240" y1="0" x2="120" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
      <line x1="240" y1="0" x2="360" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
      <ellipse cx="240" cy="68" rx="110" ry="10" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <line x1="0" y1="50" x2="480" y2="50" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <rect x="7" y="0" width="8" height="20" fill="rgba(160,130,40,0.7)"/>
      <rect x="465" y="0" width="8" height="20" fill="rgba(160,130,40,0.7)"/>`,
  },

  /* ===== GENERIC SCENES ===== */
  park: {
    label: 'Parque',
    svgSky: `
      <rect x="0" y="0" width="240" height="340" fill="#87CEEB"/>
      <rect x="0" y="0" width="240" height="80" fill="rgba(100,180,255,0.15)"/>
      <!-- Clouds -->
      <ellipse cx="60" cy="40" rx="30" ry="14" fill="rgba(255,255,255,0.9)"/>
      <ellipse cx="80" cy="34" rx="24" ry="12" fill="rgba(255,255,255,0.92)"/>
      <ellipse cx="44" cy="46" rx="18" ry="10" fill="rgba(255,255,255,0.8)"/>
      <ellipse cx="180" cy="50" rx="28" ry="12" fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="196" cy="44" rx="20" ry="10" fill="rgba(255,255,255,0.9)"/>
      <!-- Sun -->
      <circle cx="200" cy="60" r="20" fill="rgba(255,230,80,0.9)"/>
      <circle cx="200" cy="60" r="14" fill="rgba(255,245,120,0.95)"/>
      <!-- Tree left -->
      <rect x="30" y="200" width="10" height="60" fill="#6d4c21"/>
      <ellipse cx="35" cy="190" rx="28" ry="36" fill="#3a8c3a"/>
      <ellipse cx="28" cy="198" rx="20" ry="28" fill="#2e7d32"/>
      <ellipse cx="45" cy="196" rx="22" ry="30" fill="#43a047"/>
      <!-- Tree right -->
      <rect x="195" y="210" width="8" height="50" fill="#6d4c21"/>
      <ellipse cx="199" cy="202" rx="24" ry="32" fill="#3a8c3a"/>
      <ellipse cx="192" cy="208" rx="18" ry="24" fill="#2e7d32"/>
      <ellipse cx="208" cy="206" rx="20" ry="26" fill="#43a047"/>
      <!-- Bench -->
      <rect x="90" y="268" width="60" height="6" rx="2" fill="#8d6e4a"/>
      <rect x="94" y="274" width="4" height="16" fill="#6d4c21"/>
      <rect x="142" y="274" width="4" height="16" fill="#6d4c21"/>
      <rect x="88" y="260" width="4" height="12" fill="#6d4c21"/>
      <rect x="148" y="260" width="4" height="12" fill="#6d4c21"/>
      <rect x="88" y="258" width="64" height="4" rx="2" fill="#a07850"/>`,
    svgGround: `
      <rect x="0" y="0" width="240" height="80" fill="#4CAF50"/>
      <rect x="0" y="0" width="240" height="20" fill="rgba(60,140,60,0.5)"/>
      <!-- Path -->
      <path d="M100,0 Q120,40 140,80 L100,80 Q80,40 60,0 Z" fill="rgba(180,160,120,0.6)"/>
      <!-- Flowers -->
      <circle cx="20" cy="30" r="3" fill="#ff6b6b"/>
      <circle cx="25" cy="28" r="2.5" fill="#ffd93d"/>
      <circle cx="70" cy="50" r="3" fill="#ff6b6b"/>
      <circle cx="170" cy="25" r="2.5" fill="#c084fc"/>
      <circle cx="210" cy="45" r="3" fill="#ffd93d"/>
      <circle cx="215" cy="60" r="2.5" fill="#ff6b6b"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#87CEEB"/>
      <rect x="0" y="0" width="480" height="80" fill="rgba(100,180,255,0.15)"/>
      <ellipse cx="80" cy="40" rx="30" ry="14" fill="rgba(255,255,255,0.9)"/>
      <ellipse cx="108" cy="34" rx="24" ry="12" fill="rgba(255,255,255,0.92)"/>
      <ellipse cx="290" cy="50" rx="28" ry="12" fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="314" cy="44" rx="20" ry="10" fill="rgba(255,255,255,0.9)"/>
      <ellipse cx="430" cy="42" rx="26" ry="12" fill="rgba(255,255,255,0.85)"/>
      <ellipse cx="452" cy="36" rx="18" ry="10" fill="rgba(255,255,255,0.9)"/>
      <circle cx="400" cy="60" r="20" fill="rgba(255,230,80,0.9)"/>
      <circle cx="400" cy="60" r="14" fill="rgba(255,245,120,0.95)"/>
      <rect x="28" y="200" width="10" height="60" fill="#6d4c21"/>
      <ellipse cx="33" cy="190" rx="28" ry="36" fill="#3a8c3a"/>
      <ellipse cx="26" cy="198" rx="20" ry="28" fill="#2e7d32"/>
      <ellipse cx="43" cy="196" rx="22" ry="30" fill="#43a047"/>
      <rect x="390" y="210" width="8" height="50" fill="#6d4c21"/>
      <ellipse cx="394" cy="202" rx="24" ry="32" fill="#3a8c3a"/>
      <ellipse cx="386" cy="208" rx="18" ry="24" fill="#2e7d32"/>
      <ellipse cx="404" cy="206" rx="20" ry="26" fill="#43a047"/>
      <rect x="200" y="268" width="80" height="6" rx="2" fill="#8d6e4a"/>
      <rect x="204" y="274" width="4" height="16" fill="#6d4c21"/>
      <rect x="272" y="274" width="4" height="16" fill="#6d4c21"/>
      <rect x="198" y="260" width="4" height="12" fill="#6d4c21"/>
      <rect x="278" y="260" width="4" height="12" fill="#6d4c21"/>
      <rect x="198" y="258" width="84" height="4" rx="2" fill="#a07850"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#4CAF50"/>
      <rect x="0" y="0" width="480" height="20" fill="rgba(60,140,60,0.5)"/>
      <path d="M200,0 Q240,40 280,80 L200,80 Q160,40 120,0 Z" fill="rgba(180,160,120,0.6)"/>
      <circle cx="30" cy="30" r="3" fill="#ff6b6b"/>
      <circle cx="45" cy="28" r="2.5" fill="#ffd93d"/>
      <circle cx="140" cy="50" r="3" fill="#ff6b6b"/>
      <circle cx="340" cy="25" r="2.5" fill="#c084fc"/>
      <circle cx="420" cy="45" r="3" fill="#ffd93d"/>
      <circle cx="455" cy="60" r="2.5" fill="#ff6b6b"/>`,
  },

  sunset_beach: {
    label: 'Playa',
    svgSky: `
      <!-- Gradient sunset sky -->
      <defs>
        <linearGradient id="sunset-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a0533"/>
          <stop offset="25%" stop-color="#6b2fa0"/>
          <stop offset="50%" stop-color="#e8653a"/>
          <stop offset="75%" stop-color="#f4a636"/>
          <stop offset="100%" stop-color="#f7d26b"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="240" height="340" fill="url(#sunset-grad)"/>
      <!-- Sun setting at horizon -->
      <circle cx="120" cy="250" r="30" fill="rgba(255,180,50,0.9)"/>
      <circle cx="120" cy="250" r="22" fill="rgba(255,220,80,0.95)"/>
      <!-- Sun reflection on water -->
      <rect x="105" y="260" width="30" height="2" rx="1" fill="rgba(255,200,60,0.4)"/>
      <rect x="100" y="265" width="40" height="1.5" rx="1" fill="rgba(255,200,60,0.3)"/>
      <rect x="95" y="270" width="50" height="1.5" rx="1" fill="rgba(255,200,60,0.2)"/>
      <rect x="90" y="275" width="60" height="1" rx="1" fill="rgba(255,200,60,0.15)"/>
      <!-- Clouds -->
      <ellipse cx="50" cy="100" rx="32" ry="10" fill="rgba(255,160,80,0.4)"/>
      <ellipse cx="190" cy="80" rx="26" ry="8" fill="rgba(255,140,60,0.35)"/>
      <ellipse cx="140" cy="120" rx="20" ry="6" fill="rgba(255,180,100,0.3)"/>
      <!-- Palm tree left -->
      <path d="M40,290 Q42,250 38,210" fill="none" stroke="#4a3520" stroke-width="6" stroke-linecap="round"/>
      <path d="M38,215 Q15,200 5,220" fill="none" stroke="#2e7d32" stroke-width="5" stroke-linecap="round"/>
      <path d="M38,210 Q55,195 70,210" fill="none" stroke="#388e3c" stroke-width="5" stroke-linecap="round"/>
      <path d="M38,212 Q25,190 10,195" fill="none" stroke="#43a047" stroke-width="4" stroke-linecap="round"/>
      <path d="M38,212 Q50,188 65,192" fill="none" stroke="#2e7d32" stroke-width="4" stroke-linecap="round"/>
      <!-- Water line -->
      <rect x="0" y="260" width="240" height="40" fill="rgba(20,80,140,0.4)"/>
      <path d="M0,262 Q30,258 60,262 Q90,266 120,262 Q150,258 180,262 Q210,266 240,262" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>`,
    svgGround: `
      <!-- Sandy beach -->
      <rect x="0" y="0" width="240" height="80" fill="#e8c67a"/>
      <rect x="0" y="0" width="240" height="10" fill="rgba(200,170,100,0.5)"/>
      <!-- Wet sand near water -->
      <rect x="0" y="0" width="240" height="15" fill="rgba(180,150,80,0.4)"/>
      <!-- Shells/details -->
      <ellipse cx="60" cy="40" rx="4" ry="3" fill="rgba(255,240,210,0.6)" transform="rotate(-15,60,40)"/>
      <ellipse cx="170" cy="55" rx="3" ry="2" fill="rgba(255,230,200,0.5)" transform="rotate(20,170,55)"/>
      <circle cx="130" cy="35" r="2" fill="rgba(200,180,150,0.5)"/>`,
    groundH: 80,
    svgSkyWide: `
      <defs>
        <linearGradient id="sunset-grad-w" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a0533"/>
          <stop offset="25%" stop-color="#6b2fa0"/>
          <stop offset="50%" stop-color="#e8653a"/>
          <stop offset="75%" stop-color="#f4a636"/>
          <stop offset="100%" stop-color="#f7d26b"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="340" fill="url(#sunset-grad-w)"/>
      <circle cx="240" cy="250" r="30" fill="rgba(255,180,50,0.9)"/>
      <circle cx="240" cy="250" r="22" fill="rgba(255,220,80,0.95)"/>
      <rect x="225" y="260" width="30" height="2" rx="1" fill="rgba(255,200,60,0.4)"/>
      <rect x="210" y="265" width="60" height="1.5" rx="1" fill="rgba(255,200,60,0.3)"/>
      <rect x="190" y="270" width="100" height="1.5" rx="1" fill="rgba(255,200,60,0.2)"/>
      <ellipse cx="80" cy="100" rx="32" ry="10" fill="rgba(255,160,80,0.4)"/>
      <ellipse cx="380" cy="80" rx="26" ry="8" fill="rgba(255,140,60,0.35)"/>
      <ellipse cx="240" cy="120" rx="24" ry="6" fill="rgba(255,180,100,0.3)"/>
      <path d="M40,290 Q42,250 38,210" fill="none" stroke="#4a3520" stroke-width="6" stroke-linecap="round"/>
      <path d="M38,215 Q15,200 5,220" fill="none" stroke="#2e7d32" stroke-width="5" stroke-linecap="round"/>
      <path d="M38,210 Q55,195 70,210" fill="none" stroke="#388e3c" stroke-width="5" stroke-linecap="round"/>
      <path d="M38,212 Q25,190 10,195" fill="none" stroke="#43a047" stroke-width="4" stroke-linecap="round"/>
      <path d="M430,290 Q432,250 428,210" fill="none" stroke="#4a3520" stroke-width="6" stroke-linecap="round"/>
      <path d="M428,215 Q405,200 395,220" fill="none" stroke="#2e7d32" stroke-width="5" stroke-linecap="round"/>
      <path d="M428,210 Q445,195 460,210" fill="none" stroke="#388e3c" stroke-width="5" stroke-linecap="round"/>
      <path d="M428,212 Q415,190 400,195" fill="none" stroke="#43a047" stroke-width="4" stroke-linecap="round"/>
      <rect x="0" y="260" width="480" height="40" fill="rgba(20,80,140,0.4)"/>
      <path d="M0,262 Q60,258 120,262 Q180,266 240,262 Q300,258 360,262 Q420,266 480,262" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#e8c67a"/>
      <rect x="0" y="0" width="480" height="15" fill="rgba(180,150,80,0.4)"/>
      <ellipse cx="120" cy="40" rx="4" ry="3" fill="rgba(255,240,210,0.6)" transform="rotate(-15,120,40)"/>
      <ellipse cx="340" cy="55" rx="3" ry="2" fill="rgba(255,230,200,0.5)" transform="rotate(20,340,55)"/>
      <circle cx="240" cy="35" r="2" fill="rgba(200,180,150,0.5)"/>`,
  },
  brick_wall: {
    label: 'Muro de Ladrillos',
    svgSky: `
      <!-- Dark stone ceiling / upper wall -->
      <rect x="0" y="0" width="240" height="340" fill="#3a2e26"/>
      <!-- Brick pattern — upper wall (sky layer) -->
      <!-- Row 1 y=4 -->
      <rect x="2" y="4" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="4" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="4" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="4" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="4" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="4" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="4" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Row 2 y=20 (offset) -->
      <rect x="2" y="20" width="18" height="14" rx="1" fill="#5e3224"/><rect x="22" y="20" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="58" y="20" width="34" height="14" rx="1" fill="#5e3224"/><rect x="94" y="20" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="130" y="20" width="34" height="14" rx="1" fill="#5e3224"/><rect x="166" y="20" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="202" y="20" width="34" height="14" rx="1" fill="#5e3224"/>
      <!-- Row 3 y=36 -->
      <rect x="2" y="36" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="36" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="36" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="36" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="36" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="36" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="36" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Row 4 y=52 (offset) -->
      <rect x="2" y="52" width="18" height="14" rx="1" fill="#5e3224"/><rect x="22" y="52" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="58" y="52" width="34" height="14" rx="1" fill="#5e3224"/><rect x="94" y="52" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="130" y="52" width="34" height="14" rx="1" fill="#5e3224"/><rect x="166" y="52" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="202" y="52" width="34" height="14" rx="1" fill="#5e3224"/>
      <!-- Row 5 y=68 -->
      <rect x="2" y="68" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="68" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="68" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="68" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="68" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="68" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="68" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Row 6 y=84 (offset) -->
      <rect x="2" y="84" width="18" height="14" rx="1" fill="#5e3224"/><rect x="22" y="84" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="58" y="84" width="34" height="14" rx="1" fill="#5e3224"/><rect x="94" y="84" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="130" y="84" width="34" height="14" rx="1" fill="#5e3224"/><rect x="166" y="84" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="202" y="84" width="34" height="14" rx="1" fill="#5e3224"/>
      <!-- Row 7 y=100 -->
      <rect x="2" y="100" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="100" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="100" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="100" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="100" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="100" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="100" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Row 8 y=116 (offset) -->
      <rect x="2" y="116" width="18" height="14" rx="1" fill="#5e3224"/><rect x="22" y="116" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="58" y="116" width="34" height="14" rx="1" fill="#5e3224"/><rect x="94" y="116" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="130" y="116" width="34" height="14" rx="1" fill="#5e3224"/><rect x="166" y="116" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="202" y="116" width="34" height="14" rx="1" fill="#5e3224"/>
      <!-- Row 9 y=132 -->
      <rect x="2" y="132" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="132" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="132" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="132" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="132" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="132" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="132" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Row 10 y=148 (offset) -->
      <rect x="2" y="148" width="18" height="14" rx="1" fill="#5e3224"/><rect x="22" y="148" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="58" y="148" width="34" height="14" rx="1" fill="#5e3224"/><rect x="94" y="148" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="130" y="148" width="34" height="14" rx="1" fill="#5e3224"/><rect x="166" y="148" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="202" y="148" width="34" height="14" rx="1" fill="#5e3224"/>
      <!-- Row 11 y=164 -->
      <rect x="2" y="164" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="164" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="164" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="164" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="164" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="164" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="164" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Row 12 y=180 (offset) -->
      <rect x="2" y="180" width="18" height="14" rx="1" fill="#5e3224"/><rect x="22" y="180" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="58" y="180" width="34" height="14" rx="1" fill="#5e3224"/><rect x="94" y="180" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="130" y="180" width="34" height="14" rx="1" fill="#5e3224"/><rect x="166" y="180" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="202" y="180" width="34" height="14" rx="1" fill="#5e3224"/>
      <!-- Row 13 y=196 -->
      <rect x="2" y="196" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="196" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="196" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="196" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="196" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="196" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="196" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Row 14 y=212 (offset) -->
      <rect x="2" y="212" width="18" height="14" rx="1" fill="#5e3224"/><rect x="22" y="212" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="58" y="212" width="34" height="14" rx="1" fill="#5e3224"/><rect x="94" y="212" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="130" y="212" width="34" height="14" rx="1" fill="#5e3224"/><rect x="166" y="212" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="202" y="212" width="34" height="14" rx="1" fill="#5e3224"/>
      <!-- Row 15 y=228 -->
      <rect x="2" y="228" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="38" y="228" width="34" height="14" rx="1" fill="#5e3224"/><rect x="74" y="228" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="110" y="228" width="34" height="14" rx="1" fill="#5e3224"/><rect x="146" y="228" width="34" height="14" rx="1" fill="#6b3a2a"/><rect x="182" y="228" width="34" height="14" rx="1" fill="#5e3224"/><rect x="218" y="228" width="20" height="14" rx="1" fill="#6b3a2a"/>
      <!-- Mortar overlay / darkening effect -->
      <rect x="0" y="0" width="240" height="340" fill="rgba(20,12,8,0.28)"/>
      <!-- Moss/damp patches -->
      <ellipse cx="30" cy="60" rx="14" ry="6" fill="rgba(40,80,30,0.22)"/>
      <ellipse cx="170" cy="130" rx="10" ry="5" fill="rgba(40,80,30,0.18)"/>
      <ellipse cx="110" cy="190" rx="12" ry="4" fill="rgba(40,80,30,0.15)"/>
      <!-- Torches / wall lamps -->
      <rect x="28" y="240" width="6" height="22" rx="1" fill="rgba(120,80,30,0.8)"/>
      <ellipse cx="31" cy="238" rx="7" ry="9" fill="rgba(255,160,40,0.5)"/>
      <ellipse cx="31" cy="234" rx="4" ry="6" fill="rgba(255,220,100,0.6)"/>
      <rect x="206" y="240" width="6" height="22" rx="1" fill="rgba(120,80,30,0.8)"/>
      <ellipse cx="209" cy="238" rx="7" ry="9" fill="rgba(255,160,40,0.5)"/>
      <ellipse cx="209" cy="234" rx="4" ry="6" fill="rgba(255,220,100,0.6)"/>`,
    svgGround: `
      <!-- Cobblestone alley floor -->
      <rect x="0" y="0" width="240" height="80" fill="#4a3e34"/>
      <!-- Cobble stones -->
      <ellipse cx="20" cy="20" rx="14" ry="9" fill="rgba(80,65,50,0.7)"/>
      <ellipse cx="55" cy="15" rx="16" ry="8" fill="rgba(70,55,42,0.7)"/>
      <ellipse cx="95" cy="22" rx="15" ry="9" fill="rgba(85,68,52,0.65)"/>
      <ellipse cx="135" cy="14" rx="14" ry="8" fill="rgba(75,60,46,0.7)"/>
      <ellipse cx="175" cy="20" rx="16" ry="9" fill="rgba(80,65,50,0.65)"/>
      <ellipse cx="215" cy="16" rx="14" ry="8" fill="rgba(70,55,42,0.7)"/>
      <ellipse cx="10" cy="45" rx="13" ry="8" fill="rgba(75,60,46,0.6)"/>
      <ellipse cx="45" cy="50" rx="15" ry="9" fill="rgba(80,65,50,0.6)"/>
      <ellipse cx="85" cy="44" rx="16" ry="8" fill="rgba(70,55,42,0.65)"/>
      <ellipse cx="125" cy="52" rx="14" ry="9" fill="rgba(85,68,52,0.6)"/>
      <ellipse cx="165" cy="46" rx="15" ry="8" fill="rgba(75,60,46,0.65)"/>
      <ellipse cx="205" cy="50" rx="13" ry="9" fill="rgba(80,65,50,0.6)"/>
      <ellipse cx="30" cy="68" rx="14" ry="7" fill="rgba(70,55,42,0.6)"/>
      <ellipse cx="70" cy="72" rx="16" ry="7" fill="rgba(80,65,50,0.55)"/>
      <ellipse cx="110" cy="66" rx="15" ry="8" fill="rgba(75,60,46,0.6)"/>
      <ellipse cx="150" cy="70" rx="14" ry="7" fill="rgba(70,55,42,0.55)"/>
      <ellipse cx="190" cy="65" rx="16" ry="8" fill="rgba(85,68,52,0.6)"/>
      <!-- Puddle / wet reflection -->
      <ellipse cx="120" cy="38" rx="28" ry="9" fill="rgba(50,70,90,0.25)"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#3a2e26"/>
      ${Array.from({length:22},(_,r)=>{const y=r*16;const off=r%2===0?-2:18;return Array.from({length:16},(_,b)=>{const x=off+b*32;const c=['#6b3a2a','#5e3224','#6b3a2a','#5e3224'][(b+r)%4];return `<rect x="${x}" y="${y}" width="30" height="14" rx="1" fill="${c}"/>`;}).join('');}).join('')}
      <rect x="0" y="0" width="480" height="340" fill="rgba(20,12,8,0.28)"/>
      <ellipse cx="60" cy="60" rx="18" ry="6" fill="rgba(40,80,30,0.22)"/>
      <ellipse cx="340" cy="130" rx="14" ry="5" fill="rgba(40,80,30,0.18)"/>
      <ellipse cx="220" cy="190" rx="16" ry="4" fill="rgba(40,80,30,0.15)"/>
      <rect x="55" y="240" width="6" height="22" rx="1" fill="rgba(120,80,30,0.8)"/>
      <ellipse cx="58" cy="238" rx="7" ry="9" fill="rgba(255,160,40,0.5)"/>
      <ellipse cx="58" cy="234" rx="4" ry="6" fill="rgba(255,220,100,0.6)"/>
      <rect x="419" y="240" width="6" height="22" rx="1" fill="rgba(120,80,30,0.8)"/>
      <ellipse cx="422" cy="238" rx="7" ry="9" fill="rgba(255,160,40,0.5)"/>
      <ellipse cx="422" cy="234" rx="4" ry="6" fill="rgba(255,220,100,0.6)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#4a3e34"/>
      <ellipse cx="40" cy="20" rx="14" ry="9" fill="rgba(80,65,50,0.7)"/>
      <ellipse cx="110" cy="15" rx="16" ry="8" fill="rgba(70,55,42,0.7)"/>
      <ellipse cx="190" cy="22" rx="15" ry="9" fill="rgba(85,68,52,0.65)"/>
      <ellipse cx="270" cy="14" rx="14" ry="8" fill="rgba(75,60,46,0.7)"/>
      <ellipse cx="350" cy="20" rx="16" ry="9" fill="rgba(80,65,50,0.65)"/>
      <ellipse cx="435" cy="16" rx="14" ry="8" fill="rgba(70,55,42,0.7)"/>
      <ellipse cx="20" cy="45" rx="13" ry="8" fill="rgba(75,60,46,0.6)"/>
      <ellipse cx="90" cy="50" rx="15" ry="9" fill="rgba(80,65,50,0.6)"/>
      <ellipse cx="170" cy="44" rx="16" ry="8" fill="rgba(70,55,42,0.65)"/>
      <ellipse cx="250" cy="52" rx="14" ry="9" fill="rgba(85,68,52,0.6)"/>
      <ellipse cx="330" cy="46" rx="15" ry="8" fill="rgba(75,60,46,0.65)"/>
      <ellipse cx="410" cy="50" rx="13" ry="9" fill="rgba(80,65,50,0.6)"/>
      <ellipse cx="240" cy="38" rx="55" ry="9" fill="rgba(50,70,90,0.25)"/>`,
  },

  /* ===== HP EXTRA SCENES ===== */
  ministry: {
    label: 'Ministerio',
    svgSky: `
      <!-- Ministry of Magic interior — golden atrium -->
      <rect x="0" y="0" width="240" height="340" fill="#2a2010"/>
      <!-- Gold-tiled walls -->
      <rect x="0"   y="0" width="18" height="340" fill="#3a2e10"/>
      <rect x="222" y="0" width="18" height="340" fill="#3a2e10"/>
      <!-- Wall tile grid left -->
      ${[0,24,48,72,96,120,144,168,192,216,240,264,288,312].map(y=>`<rect x="1" y="${y}" width="16" height="22" rx="1" fill="rgba(180,140,40,0.18)"/>`).join('')}
      <!-- Wall tile grid right -->
      ${[0,24,48,72,96,120,144,168,192,216,240,264,288,312].map(y=>`<rect x="223" y="${y}" width="16" height="22" rx="1" fill="rgba(180,140,40,0.18)"/>`).join('')}
      <!-- Ceiling — black with gold stars -->
      <rect x="0" y="0" width="240" height="60" fill="#0a0808"/>
      <circle cx="40"  cy="25" r="1.5" fill="rgba(255,215,60,0.8)"/>
      <circle cx="70"  cy="15" r="1"   fill="rgba(255,215,60,0.6)"/>
      <circle cx="100" cy="30" r="1.5" fill="rgba(255,215,60,0.7)"/>
      <circle cx="130" cy="12" r="1"   fill="rgba(255,215,60,0.8)"/>
      <circle cx="160" cy="28" r="1.5" fill="rgba(255,215,60,0.6)"/>
      <circle cx="190" cy="18" r="1"   fill="rgba(255,215,60,0.7)"/>
      <circle cx="220" cy="32" r="1.5" fill="rgba(255,215,60,0.6)"/>
      <!-- Gold fireplace portals (Floo Network) -->
      <rect x="20"  y="160" width="44" height="100" rx="22 22 4 4" fill="#1a1208"/>
      <rect x="22"  y="162" width="40" height="96"  rx="20 20 2 2" fill="#0f0a04"/>
      <rect x="24"  y="200" width="36" height="58"  rx="2"          fill="rgba(0,180,80,0.18)"/>
      <ellipse cx="42" cy="200" rx="16" ry="8" fill="rgba(0,220,100,0.25)"/>
      <rect x="176" y="160" width="44" height="100" rx="22 22 4 4" fill="#1a1208"/>
      <rect x="178" y="162" width="40" height="96"  rx="20 20 2 2" fill="#0f0a04"/>
      <rect x="180" y="200" width="36" height="58"  rx="2"          fill="rgba(0,180,80,0.18)"/>
      <ellipse cx="198" cy="200" rx="16" ry="8" fill="rgba(0,220,100,0.25)"/>
      <!-- Floo flames -->
      <path d="M30,258 Q34,240 38,254 Q42,238 46,252 Q50,240 54,256" fill="none" stroke="rgba(0,255,100,0.5)" stroke-width="2"/>
      <path d="M186,258 Q190,240 194,254 Q198,238 202,252 Q206,240 210,256" fill="none" stroke="rgba(0,255,100,0.5)" stroke-width="2"/>
      <!-- Central gold statue pedestal -->
      <rect x="98" y="200" width="44" height="100" fill="#2a2010"/>
      <rect x="94" y="198" width="52" height="8"   rx="2" fill="rgba(200,160,30,0.6)"/>
      <!-- Statue silhouette -->
      <rect x="114" y="130" width="12" height="70" fill="rgba(200,160,30,0.35)"/>
      <circle cx="120" cy="124" r="10" fill="rgba(200,160,30,0.30)"/>
      <path d="M108,160 Q120,150 132,160" fill="rgba(200,160,30,0.25)"/>
      <!-- Ministry seal on floor -->
      <circle cx="120" cy="340" r="35" fill="rgba(180,140,30,0.12)"/>
      <circle cx="120" cy="340" r="28" fill="none" stroke="rgba(180,140,30,0.2)" stroke-width="1.5"/>`,
    svgGround: `
      <!-- Black & gold mosaic floor -->
      <rect x="0" y="0" width="240" height="80" fill="#1a1408"/>
      <!-- Mosaic tiles -->
      ${Array.from({length:8},(_,col)=>Array.from({length:5},(_,row)=>`<rect x="${col*30+1}" y="${row*16+1}" width="28" height="14" rx="1" fill="${(col+row)%2===0?'rgba(180,140,30,0.18)':'rgba(255,255,255,0.04)'}"/>`).join('')).join('')}
      <!-- Central seal -->
      <circle cx="120" cy="40" r="30" fill="none" stroke="rgba(180,140,30,0.3)" stroke-width="1.5"/>
      <circle cx="120" cy="40" r="20" fill="none" stroke="rgba(180,140,30,0.2)" stroke-width="1"/>
      <text x="120" y="45" font-size="10" text-anchor="middle" fill="rgba(180,140,30,0.45)" font-weight="bold">M</text>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#2a2010"/>
      <rect x="0" y="0" width="18" height="340" fill="#3a2e10"/>
      <rect x="462" y="0" width="18" height="340" fill="#3a2e10"/>
      ${[0,24,48,72,96,120,144,168,192,216,240,264,288,312].map(y=>`<rect x="1" y="${y}" width="16" height="22" rx="1" fill="rgba(180,140,40,0.18)"/>`).join('')}
      ${[0,24,48,72,96,120,144,168,192,216,240,264,288,312].map(y=>`<rect x="463" y="${y}" width="16" height="22" rx="1" fill="rgba(180,140,40,0.18)"/>`).join('')}
      <rect x="0" y="0" width="480" height="60" fill="#0a0808"/>
      <circle cx="80"  cy="25" r="1.5" fill="rgba(255,215,60,0.8)"/>
      <circle cx="140" cy="15" r="1"   fill="rgba(255,215,60,0.6)"/>
      <circle cx="200" cy="30" r="1.5" fill="rgba(255,215,60,0.7)"/>
      <circle cx="260" cy="12" r="1"   fill="rgba(255,215,60,0.8)"/>
      <circle cx="320" cy="28" r="1.5" fill="rgba(255,215,60,0.6)"/>
      <circle cx="380" cy="18" r="1"   fill="rgba(255,215,60,0.7)"/>
      <circle cx="440" cy="32" r="1.5" fill="rgba(255,215,60,0.6)"/>
      <rect x="20"  y="160" width="44" height="100" rx="22 22 4 4" fill="#1a1208"/>
      <rect x="22"  y="162" width="40" height="96"  rx="20 20 2 2" fill="#0f0a04"/>
      <rect x="24"  y="200" width="36" height="58"  rx="2" fill="rgba(0,180,80,0.18)"/>
      <ellipse cx="42" cy="200" rx="16" ry="8" fill="rgba(0,220,100,0.25)"/>
      <path d="M30,258 Q34,240 38,254 Q42,238 46,252 Q50,240 54,256" fill="none" stroke="rgba(0,255,100,0.5)" stroke-width="2"/>
      <rect x="416" y="160" width="44" height="100" rx="22 22 4 4" fill="#1a1208"/>
      <rect x="418" y="162" width="40" height="96"  rx="20 20 2 2" fill="#0f0a04"/>
      <rect x="420" y="200" width="36" height="58"  rx="2" fill="rgba(0,180,80,0.18)"/>
      <ellipse cx="438" cy="200" rx="16" ry="8" fill="rgba(0,220,100,0.25)"/>
      <path d="M426,258 Q430,240 434,254 Q438,238 442,252 Q446,240 450,256" fill="none" stroke="rgba(0,255,100,0.5)" stroke-width="2"/>
      <rect x="218" y="200" width="44" height="100" fill="#2a2010"/>
      <rect x="214" y="198" width="52" height="8" rx="2" fill="rgba(200,160,30,0.6)"/>
      <rect x="234" y="130" width="12" height="70" fill="rgba(200,160,30,0.35)"/>
      <circle cx="240" cy="124" r="10" fill="rgba(200,160,30,0.30)"/>
      <circle cx="240" cy="340" r="35" fill="rgba(180,140,30,0.12)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#1a1408"/>
      ${Array.from({length:16},(_,col)=>Array.from({length:5},(_,row)=>`<rect x="${col*30+1}" y="${row*16+1}" width="28" height="14" rx="1" fill="${(col+row)%2===0?'rgba(180,140,30,0.18)':'rgba(255,255,255,0.04)'}"/>`).join('')).join('')}
      <circle cx="240" cy="40" r="30" fill="none" stroke="rgba(180,140,30,0.3)" stroke-width="1.5"/>
      <circle cx="240" cy="40" r="20" fill="none" stroke="rgba(180,140,30,0.2)" stroke-width="1"/>
      <text x="240" y="45" font-size="10" text-anchor="middle" fill="rgba(180,140,30,0.45)" font-weight="bold">M</text>`,
  },

  hogsmeade: {
    label: 'Hogsmeade',
    svgSky: `
      <!-- Winter sky — deep blue-grey, snowing -->
      <rect x="0" y="0" width="240" height="340" fill="#3a4a5a"/>
      <!-- Cloud layer -->
      <ellipse cx="50"  cy="30" rx="40" ry="18" fill="rgba(200,210,220,0.25)"/>
      <ellipse cx="130" cy="22" rx="50" ry="16" fill="rgba(200,210,220,0.20)"/>
      <ellipse cx="210" cy="35" rx="36" ry="14" fill="rgba(200,210,220,0.22)"/>
      <!-- Snowflakes -->
      <circle cx="20"  cy="55"  r="1.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="55"  cy="80"  r="1"   fill="rgba(255,255,255,0.6)"/>
      <circle cx="90"  cy="45"  r="1.5" fill="rgba(255,255,255,0.8)"/>
      <circle cx="125" cy="70"  r="1"   fill="rgba(255,255,255,0.7)"/>
      <circle cx="160" cy="50"  r="1.5" fill="rgba(255,255,255,0.6)"/>
      <circle cx="195" cy="85"  r="1"   fill="rgba(255,255,255,0.8)"/>
      <circle cx="230" cy="60"  r="1.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="35"  cy="110" r="1"   fill="rgba(255,255,255,0.5)"/>
      <circle cx="75"  cy="130" r="1.5" fill="rgba(255,255,255,0.6)"/>
      <circle cx="115" cy="100" r="1"   fill="rgba(255,255,255,0.7)"/>
      <circle cx="155" cy="120" r="1.5" fill="rgba(255,255,255,0.5)"/>
      <circle cx="200" cy="105" r="1"   fill="rgba(255,255,255,0.6)"/>
      <!-- The Three Broomsticks inn (left) -->
      <rect x="0" y="120" width="80" height="160" fill="#5a3a20"/>
      <rect x="0" y="100" width="80" height="24"  fill="#4a2e18"/>
      <!-- Inn roof with snow -->
      <polygon points="0,100 40,70 80,100" fill="#3a2a18"/>
      <polygon points="0,100 40,70 80,100" fill="rgba(230,240,255,0.6)"/>
      <rect x="0" y="98" width="80" height="5" fill="rgba(230,240,255,0.7)"/>
      <!-- Inn windows (warm glow) -->
      <rect x="8"  y="130" width="20" height="16" rx="2" fill="rgba(255,200,80,0.7)"/>
      <rect x="52" y="130" width="20" height="16" rx="2" fill="rgba(255,200,80,0.65)"/>
      <rect x="8"  y="165" width="20" height="16" rx="2" fill="rgba(255,200,80,0.6)"/>
      <rect x="52" y="165" width="20" height="16" rx="2" fill="rgba(255,200,80,0.65)"/>
      <!-- Inn door -->
      <rect x="28" y="230" width="24" height="50" rx="2" fill="#3a2010"/>
      <circle cx="50" cy="255" r="2" fill="rgba(200,160,40,0.9)"/>
      <!-- Inn sign -->
      <rect x="12" y="115" width="56" height="14" rx="2" fill="#3a2010"/>
      <text x="40" y="125" font-size="6" text-anchor="middle" fill="rgba(255,200,80,0.9)" font-weight="bold">THREE BROOMSTICKS</text>
      <!-- Honeydukes (right) -->
      <rect x="160" y="130" width="80" height="150" fill="#8a3a5a"/>
      <rect x="160" y="110" width="80" height="24"  fill="#7a2a4a"/>
      <polygon points="160,110 200,80 240,110" fill="#6a1a3a"/>
      <polygon points="160,110 200,80 240,110" fill="rgba(230,240,255,0.55)"/>
      <rect x="160" y="108" width="80" height="5" fill="rgba(230,240,255,0.7)"/>
      <rect x="168" y="140" width="20" height="16" rx="2" fill="rgba(255,180,200,0.7)"/>
      <rect x="212" y="140" width="20" height="16" rx="2" fill="rgba(255,180,200,0.65)"/>
      <rect x="172" y="235" width="22" height="45" rx="2" fill="#5a1a2a"/>
      <rect x="164" y="125" width="72" height="14" rx="2" fill="#5a1a2a"/>
      <text x="200" y="135" font-size="6" text-anchor="middle" fill="rgba(255,180,200,0.95)" font-weight="bold">HONEYDUKES</text>
      <!-- Cobblestone road (middle) -->
      <rect x="80" y="200" width="80" height="140" fill="#3a3530"/>
      <!-- Snow on road -->
      <rect x="80" y="200" width="80" height="8" fill="rgba(230,240,255,0.4)"/>
      <!-- Snow on roofs strip -->
      <rect x="80" y="120" width="80" height="80" fill="#3a4a5a"/>
      <!-- Middle building -->
      <rect x="86" y="150" width="68" height="130" fill="#4a4a3a"/>
      <polygon points="82,152 120,118 158,152" fill="#3a3a2a"/>
      <polygon points="82,152 120,118 158,152" fill="rgba(230,240,255,0.5)"/>
      <rect x="100" y="162" width="16" height="14" rx="2" fill="rgba(255,220,100,0.6)"/>
      <rect x="124" y="162" width="16" height="14" rx="2" fill="rgba(255,220,100,0.55)"/>`,
    svgGround: `
      <!-- Snow-covered cobblestone street -->
      <rect x="0" y="0" width="240" height="80" fill="#c8d4e0"/>
      <!-- Cobble hints under snow -->
      <ellipse cx="20"  cy="35" rx="12" ry="7" fill="rgba(150,160,170,0.3)"/>
      <ellipse cx="55"  cy="28" rx="14" ry="6" fill="rgba(150,160,170,0.25)"/>
      <ellipse cx="95"  cy="38" rx="13" ry="7" fill="rgba(150,160,170,0.3)"/>
      <ellipse cx="140" cy="28" rx="12" ry="6" fill="rgba(150,160,170,0.25)"/>
      <ellipse cx="180" cy="35" rx="14" ry="7" fill="rgba(150,160,170,0.3)"/>
      <ellipse cx="220" cy="28" rx="12" ry="6" fill="rgba(150,160,170,0.25)"/>
      <!-- Fresh snow on top -->
      <rect x="0" y="0" width="240" height="12" fill="rgba(230,240,255,0.8)"/>
      <!-- Footprints -->
      <ellipse cx="100" cy="45" rx="4" ry="6" fill="rgba(120,130,145,0.3)" transform="rotate(-15,100,45)"/>
      <ellipse cx="112" cy="52" rx="4" ry="6" fill="rgba(120,130,145,0.3)" transform="rotate(10,112,52)"/>
      <ellipse cx="126" cy="46" rx="4" ry="6" fill="rgba(120,130,145,0.3)" transform="rotate(-10,126,46)"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#3a4a5a"/>
      <ellipse cx="80"  cy="30" rx="40" ry="18" fill="rgba(200,210,220,0.25)"/>
      <ellipse cx="240" cy="22" rx="50" ry="16" fill="rgba(200,210,220,0.20)"/>
      <ellipse cx="420" cy="35" rx="36" ry="14" fill="rgba(200,210,220,0.22)"/>
      <circle cx="30"  cy="55"  r="1.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="100" cy="80"  r="1"   fill="rgba(255,255,255,0.6)"/>
      <circle cx="180" cy="45"  r="1.5" fill="rgba(255,255,255,0.8)"/>
      <circle cx="250" cy="70"  r="1"   fill="rgba(255,255,255,0.7)"/>
      <circle cx="320" cy="50"  r="1.5" fill="rgba(255,255,255,0.6)"/>
      <circle cx="395" cy="85"  r="1"   fill="rgba(255,255,255,0.8)"/>
      <circle cx="460" cy="60"  r="1.5" fill="rgba(255,255,255,0.7)"/>
      <!-- Three Broomsticks left -->
      <rect x="0" y="120" width="80" height="160" fill="#5a3a20"/>
      <rect x="0" y="100" width="80" height="24" fill="#4a2e18"/>
      <polygon points="0,100 40,70 80,100" fill="#3a2a18"/>
      <polygon points="0,100 40,70 80,100" fill="rgba(230,240,255,0.6)"/>
      <rect x="0" y="98" width="80" height="5" fill="rgba(230,240,255,0.7)"/>
      <rect x="8"  y="130" width="20" height="16" rx="2" fill="rgba(255,200,80,0.7)"/>
      <rect x="52" y="130" width="20" height="16" rx="2" fill="rgba(255,200,80,0.65)"/>
      <rect x="28" y="230" width="24" height="50" rx="2" fill="#3a2010"/>
      <rect x="12" y="115" width="56" height="14" rx="2" fill="#3a2010"/>
      <text x="40" y="125" font-size="6" text-anchor="middle" fill="rgba(255,200,80,0.9)" font-weight="bold">THREE BROOMSTICKS</text>
      <!-- Honeydukes right -->
      <rect x="400" y="130" width="80" height="150" fill="#8a3a5a"/>
      <rect x="400" y="110" width="80" height="24" fill="#7a2a4a"/>
      <polygon points="400,110 440,80 480,110" fill="#6a1a3a"/>
      <polygon points="400,110 440,80 480,110" fill="rgba(230,240,255,0.55)"/>
      <rect x="400" y="108" width="80" height="5" fill="rgba(230,240,255,0.7)"/>
      <rect x="408" y="140" width="20" height="16" rx="2" fill="rgba(255,180,200,0.7)"/>
      <rect x="452" y="140" width="20" height="16" rx="2" fill="rgba(255,180,200,0.65)"/>
      <rect x="412" y="235" width="22" height="45" rx="2" fill="#5a1a2a"/>
      <rect x="404" y="125" width="72" height="14" rx="2" fill="#5a1a2a"/>
      <text x="440" y="135" font-size="6" text-anchor="middle" fill="rgba(255,180,200,0.95)" font-weight="bold">HONEYDUKES</text>
      <!-- Centre road and building -->
      <rect x="80" y="200" width="320" height="140" fill="#3a3530"/>
      <rect x="80" y="200" width="320" height="8" fill="rgba(230,240,255,0.4)"/>
      <rect x="80" y="120" width="320" height="80" fill="#3a4a5a"/>
      <rect x="156" y="150" width="168" height="130" fill="#4a4a3a"/>
      <polygon points="150,152 240,118 330,152" fill="#3a3a2a"/>
      <polygon points="150,152 240,118 330,152" fill="rgba(230,240,255,0.5)"/>
      <rect x="210" y="162" width="16" height="14" rx="2" fill="rgba(255,220,100,0.6)"/>
      <rect x="254" y="162" width="16" height="14" rx="2" fill="rgba(255,220,100,0.55)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#c8d4e0"/>
      <ellipse cx="40"  cy="35" rx="12" ry="7" fill="rgba(150,160,170,0.3)"/>
      <ellipse cx="110" cy="28" rx="14" ry="6" fill="rgba(150,160,170,0.25)"/>
      <ellipse cx="190" cy="38" rx="13" ry="7" fill="rgba(150,160,170,0.3)"/>
      <ellipse cx="280" cy="28" rx="12" ry="6" fill="rgba(150,160,170,0.25)"/>
      <ellipse cx="360" cy="35" rx="14" ry="7" fill="rgba(150,160,170,0.3)"/>
      <ellipse cx="440" cy="28" rx="12" ry="6" fill="rgba(150,160,170,0.25)"/>
      <rect x="0" y="0" width="480" height="12" fill="rgba(230,240,255,0.8)"/>
      <ellipse cx="200" cy="45" rx="4" ry="6" fill="rgba(120,130,145,0.3)" transform="rotate(-15,200,45)"/>
      <ellipse cx="224" cy="52" rx="4" ry="6" fill="rgba(120,130,145,0.3)" transform="rotate(10,224,52)"/>
      <ellipse cx="252" cy="46" rx="4" ry="6" fill="rgba(120,130,145,0.3)" transform="rotate(-10,252,46)"/>`,
  },

  hagrid_hut: {
    label: 'Cabaña Hagrid',
    svgSky: `
      <!-- Overcast sky, twilight mood -->
      <rect x="0" y="0" width="240" height="340" fill="#3a4a30"/>
      <!-- Sky gradient overlay -->
      <rect x="0" y="0" width="240" height="120" fill="rgba(20,30,15,0.4)"/>
      <!-- Clouds -->
      <ellipse cx="60"  cy="40" rx="50" ry="20" fill="rgba(50,60,40,0.6)"/>
      <ellipse cx="180" cy="30" rx="45" ry="18" fill="rgba(50,60,40,0.55)"/>
      <ellipse cx="120" cy="55" rx="40" ry="15" fill="rgba(50,60,40,0.4)"/>
      <!-- Moon (half) -->
      <circle cx="210" cy="50" r="18" fill="rgba(220,220,180,0.25)"/>
      <circle cx="218" cy="50" r="18" fill="#3a4a30"/>
      <!-- Forbidden Forest silhouette (dark trees) -->
      <rect x="0" y="150" width="240" height="190" fill="rgba(15,25,10,0.85)"/>
      <!-- Tree silhouettes left -->
      <polygon points="0,260 12,180 24,260"   fill="#1a2810"/>
      <polygon points="10,260 25,160 40,260"  fill="#1e2e12"/>
      <polygon points="25,260 42,170 58,260"  fill="#1a2810"/>
      <polygon points="5,260  18,190 32,260"  fill="#162210"/>
      <!-- Tree silhouettes right -->
      <polygon points="180,260 196,165 212,260" fill="#1a2810"/>
      <polygon points="196,260 214,175 232,260" fill="#1e2e12"/>
      <polygon points="215,260 230,185 245,260" fill="#1a2810"/>
      <!-- Hagrid's hut (centre-left) -->
      <rect x="30" y="175" width="90" height="120" rx="3" fill="#5a4530"/>
      <!-- Hut roof -->
      <polygon points="24,178 75,130 126,178" fill="#4a3828"/>
      <!-- Roof thatch lines -->
      <line x1="35" y1="175" x2="75" y2="135" stroke="rgba(80,60,35,0.5)" stroke-width="2"/>
      <line x1="50" y1="175" x2="75" y2="133" stroke="rgba(80,60,35,0.4)" stroke-width="2"/>
      <line x1="65" y1="175" x2="75" y2="132" stroke="rgba(80,60,35,0.3)" stroke-width="2"/>
      <line x1="85" y1="175" x2="75" y2="132" stroke="rgba(80,60,35,0.3)" stroke-width="2"/>
      <line x1="100" y1="175" x2="75" y2="133" stroke="rgba(80,60,35,0.4)" stroke-width="2"/>
      <line x1="115" y1="175" x2="75" y2="135" stroke="rgba(80,60,35,0.5)" stroke-width="2"/>
      <!-- Chimney with smoke -->
      <rect x="85" y="130" width="12" height="36" rx="2" fill="#4a3020"/>
      <ellipse cx="91" cy="128" rx="8"  ry="6"  fill="rgba(120,120,120,0.4)"/>
      <ellipse cx="86" cy="120" rx="6"  ry="5"  fill="rgba(120,120,120,0.3)"/>
      <ellipse cx="96" cy="114" rx="5"  ry="4"  fill="rgba(120,120,120,0.25)"/>
      <!-- Hut window (warm glow) -->
      <rect x="44" y="192" width="24" height="20" rx="2" fill="rgba(255,200,80,0.65)"/>
      <rect x="46" y="194" width="10" height="16" rx="1" fill="rgba(255,220,100,0.55)"/>
      <rect x="58" y="194" width="10" height="16" rx="1" fill="rgba(255,220,100,0.55)"/>
      <!-- Hut door (huge, for Hagrid) -->
      <rect x="75" y="228" width="36" height="67" rx="4" fill="#3a2818"/>
      <circle cx="108" cy="262" r="3"  fill="rgba(180,140,60,0.9)"/>
      <!-- Pumpkins near door -->
      <ellipse cx="70" cy="290" rx="10" ry="8"  fill="#c8620a"/>
      <rect    x="69" y="280"  width="2" height="6" fill="#3a5a20"/>
      <ellipse cx="58" cy="293" rx="8" ry="6" fill="#d06a10"/>
      <rect    x="57" y="285" width="2" height="5" fill="#3a5a20"/>`,
    svgGround: `
      <!-- Muddy grass path -->
      <rect x="0" y="0" width="240" height="80" fill="#3a4a28"/>
      <!-- Grass tufts -->
      <rect x="0"   y="0" width="240" height="8" fill="rgba(50,70,30,0.6)"/>
      <line x1="15"  y1="8" x2="12"  y2="0" stroke="#4a6a2a" stroke-width="2"/>
      <line x1="18"  y1="8" x2="20"  y2="1" stroke="#3a5a22" stroke-width="1.5"/>
      <line x1="40"  y1="8" x2="38"  y2="0" stroke="#4a6a2a" stroke-width="2"/>
      <line x1="70"  y1="8" x2="72"  y2="1" stroke="#3a5a22" stroke-width="1.5"/>
      <line x1="100" y1="8" x2="98"  y2="0" stroke="#4a6a2a" stroke-width="2"/>
      <line x1="140" y1="8" x2="142" y2="1" stroke="#3a5a22" stroke-width="1.5"/>
      <line x1="170" y1="8" x2="168" y2="0" stroke="#4a6a2a" stroke-width="2"/>
      <line x1="200" y1="8" x2="202" y2="1" stroke="#3a5a22" stroke-width="1.5"/>
      <line x1="225" y1="8" x2="223" y2="0" stroke="#4a6a2a" stroke-width="2"/>
      <!-- Mud path -->
      <path d="M90,0 Q120,40 150,80 L110,80 Q80,40 50,0 Z" fill="rgba(60,40,20,0.5)"/>
      <!-- Small rocks -->
      <ellipse cx="30"  cy="55" rx="5" ry="3" fill="rgba(80,70,60,0.6)"/>
      <ellipse cx="180" cy="48" rx="4" ry="2.5" fill="rgba(80,70,60,0.5)"/>
      <ellipse cx="210" cy="62" rx="6" ry="3"   fill="rgba(80,70,60,0.55)"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#3a4a30"/>
      <rect x="0" y="0" width="480" height="120" fill="rgba(20,30,15,0.4)"/>
      <ellipse cx="100" cy="40" rx="50" ry="20" fill="rgba(50,60,40,0.6)"/>
      <ellipse cx="380" cy="30" rx="45" ry="18" fill="rgba(50,60,40,0.55)"/>
      <ellipse cx="240" cy="55" rx="40" ry="15" fill="rgba(50,60,40,0.4)"/>
      <circle cx="430" cy="50" r="18" fill="rgba(220,220,180,0.25)"/>
      <circle cx="440" cy="50" r="18" fill="#3a4a30"/>
      <rect x="0" y="150" width="480" height="190" fill="rgba(15,25,10,0.85)"/>
      <polygon points="0,260 12,180 24,260" fill="#1a2810"/>
      <polygon points="10,260 25,160 40,260" fill="#1e2e12"/>
      <polygon points="25,260 42,170 58,260" fill="#1a2810"/>
      <polygon points="420,260 436,165 452,260" fill="#1a2810"/>
      <polygon points="436,260 454,175 470,260" fill="#1e2e12"/>
      <polygon points="455,260 470,185 485,260" fill="#1a2810"/>
      <!-- Hagrid's hut wider/centred -->
      <rect x="170" y="175" width="90" height="120" rx="3" fill="#5a4530"/>
      <polygon points="164,178 215,130 266,178" fill="#4a3828"/>
      <line x1="175" y1="175" x2="215" y2="135" stroke="rgba(80,60,35,0.5)" stroke-width="2"/>
      <line x1="200" y1="175" x2="215" y2="133" stroke="rgba(80,60,35,0.4)" stroke-width="2"/>
      <line x1="230" y1="175" x2="215" y2="133" stroke="rgba(80,60,35,0.4)" stroke-width="2"/>
      <line x1="255" y1="175" x2="215" y2="135" stroke="rgba(80,60,35,0.5)" stroke-width="2"/>
      <rect x="225" y="130" width="12" height="36" rx="2" fill="#4a3020"/>
      <ellipse cx="231" cy="128" rx="8" ry="6" fill="rgba(120,120,120,0.4)"/>
      <ellipse cx="226" cy="120" rx="6" ry="5" fill="rgba(120,120,120,0.3)"/>
      <rect x="184" y="192" width="24" height="20" rx="2" fill="rgba(255,200,80,0.65)"/>
      <rect x="215" y="228" width="36" height="67" rx="4" fill="#3a2818"/>
      <circle cx="248" cy="262" r="3" fill="rgba(180,140,60,0.9)"/>
      <ellipse cx="155" cy="290" rx="10" ry="8" fill="#c8620a"/>
      <rect x="154" y="280" width="2" height="6" fill="#3a5a20"/>
      <ellipse cx="280" cy="290" rx="8" ry="6" fill="#c8620a"/>
      <rect x="279" y="282" width="2" height="5" fill="#3a5a20"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#3a4a28"/>
      <rect x="0" y="0" width="480" height="8" fill="rgba(50,70,30,0.6)"/>
      <path d="M180,0 Q240,40 300,80 L220,80 Q160,40 100,0 Z" fill="rgba(60,40,20,0.5)"/>
      <ellipse cx="60"  cy="55" rx="5" ry="3" fill="rgba(80,70,60,0.6)"/>
      <ellipse cx="380" cy="48" rx="4" ry="2.5" fill="rgba(80,70,60,0.5)"/>
      <ellipse cx="430" cy="62" rx="6" ry="3" fill="rgba(80,70,60,0.55)"/>`,
  },

  leaky_cauldron: {
    label: 'Caldero Chorreante',
    svgSky: `
      <!-- Dark pub interior -->
      <rect x="0" y="0" width="240" height="340" fill="#1e1508"/>
      <!-- Wooden ceiling beams -->
      <rect x="0"   y="0"  width="240" height="12" fill="#2a1e0c"/>
      <rect x="0"   y="30" width="240" height="8"  fill="#2a1e0c"/>
      <rect x="0"   y="60" width="240" height="6"  fill="#261c0a"/>
      <rect x="30"  y="0"  width="8"   height="80" fill="#241a08"/>
      <rect x="100" y="0"  width="8"   height="80" fill="#241a08"/>
      <rect x="170" y="0"  width="8"   height="80" fill="#241a08"/>
      <!-- Stone walls -->
      <rect x="0"   y="80" width="18" height="260" fill="#2a2418"/>
      <rect x="222" y="80" width="18" height="260" fill="#2a2418"/>
      <!-- Stone blocks left -->
      ${[80,106,132,158,184,210,236,262,288,314].map(y=>`<rect x="1" y="${y}" width="16" height="22" rx="1" fill="rgba(60,50,35,0.5)"/>`).join('')}
      <!-- Stone blocks right -->
      ${[80,106,132,158,184,210,236,262,288,314].map(y=>`<rect x="223" y="${y}" width="16" height="22" rx="1" fill="rgba(60,50,35,0.5)"/>`).join('')}
      <!-- Candles hanging (chandelier) -->
      <line x1="120" y1="0" x2="120" y2="50" stroke="rgba(120,90,40,0.6)" stroke-width="2"/>
      <rect x="90" y="48" width="60" height="4" rx="1" fill="rgba(100,75,35,0.8)"/>
      <!-- Candle flames on chandelier -->
      ${[96,106,116,126,136,146].map(x=>`<rect x="${x}" y="40" width="3" height="10" rx="1" fill="rgba(120,80,30,0.9)"/><ellipse cx="${x+1.5}" cy="38" rx="3" ry="4" fill="rgba(255,180,40,0.6)"/><ellipse cx="${x+1.5}" cy="36" rx="2" ry="3" fill="rgba(255,220,100,0.7)"/>`).join('')}
      <!-- Bar counter (background) -->
      <rect x="18" y="200" width="100" height="140" fill="#2e2010"/>
      <rect x="16" y="198" width="104" height="8"   rx="2" fill="#3a2a12"/>
      <!-- Barrels on shelves -->
      <rect x="24" y="110" width="60" height="8" fill="rgba(60,40,20,0.7)"/>
      <ellipse cx="36" cy="109" rx="8"  ry="10" fill="#5a3a1a"/>
      <ellipse cx="36" cy="109" rx="5"  ry="7"  fill="#4a2e14"/>
      <ellipse cx="56" cy="109" rx="8"  ry="10" fill="#5a3a1a"/>
      <ellipse cx="56" cy="109" rx="5"  ry="7"  fill="#4a2e14"/>
      <ellipse cx="75" cy="109" rx="7"  ry="9"  fill="#5a3a1a"/>
      <ellipse cx="75" cy="109" rx="4"  ry="6"  fill="#4a2e14"/>
      <!-- Bottles on shelf -->
      <rect x="150" y="100" width="70" height="6" fill="rgba(60,40,20,0.7)"/>
      ${[155,163,172,181,190,200,210].map((x,i)=>`<rect x="${x}" y="${88+i%2*4}" width="6" height="14" rx="2" fill="${['rgba(100,50,20,0.8)','rgba(40,80,40,0.8)','rgba(80,60,20,0.7)','rgba(60,40,80,0.8)','rgba(100,30,30,0.8)','rgba(40,60,80,0.7)','rgba(80,50,30,0.8)'][i]}"/>`).join('')}
      <!-- Fireplace (right wall) -->
      <rect x="170" y="185" width="55" height="100" rx="4" fill="#1a1208"/>
      <rect x="165" y="183" width="65" height="10"  rx="2" fill="#2a1e0c"/>
      <rect x="172" y="220" width="51" height="65"  rx="2" fill="#0e0a04"/>
      <!-- Fire glow -->
      <path d="M178,282 Q185,255 192,270 Q198,248 204,265 Q210,250 216,275 Q218,285 178,285 Z" fill="rgba(200,80,10,0.45)"/>
      <path d="M181,282 Q187,260 193,272 Q199,252 205,268 Q210,255 214,278 Z" fill="rgba(255,150,20,0.4)"/>
      <ellipse cx="197" cy="278" rx="20" ry="8" fill="rgba(255,100,0,0.2)"/>
      <!-- Cauldron on bar -->
      <ellipse cx="70" cy="200" rx="20" ry="10" fill="#1a1a1a"/>
      <rect    x="50" y="200"  width="40" height="18" rx="0 0 8 8" fill="#222"/>
      <ellipse cx="70" cy="218" rx="20" ry="8"  fill="#1a1a1a"/>
      <ellipse cx="70" cy="200" rx="18" ry="7"  fill="rgba(0,180,80,0.3)"/>`,
    svgGround: `
      <!-- Dark wooden floor -->
      <rect x="0" y="0" width="240" height="80" fill="#2a1e0c"/>
      <!-- Floor planks -->
      ${[0,30,60,90,120,150,180,210].map(x=>`<rect x="${x}" y="0" width="28" height="80" rx="0" fill="rgba(50,35,15,${x%60===0?'0.15':'0.08'})"/>`).join('')}
      <!-- Plank horizontal grain lines -->
      <line x1="0" y1="20" x2="240" y2="20" stroke="rgba(50,35,15,0.3)" stroke-width="1"/>
      <line x1="0" y1="40" x2="240" y2="40" stroke="rgba(50,35,15,0.25)" stroke-width="1"/>
      <line x1="0" y1="60" x2="240" y2="60" stroke="rgba(50,35,15,0.2)"  stroke-width="1"/>
      <!-- Fireplace glow on floor -->
      <ellipse cx="197" cy="5" rx="38" ry="12" fill="rgba(200,80,10,0.12)"/>
      <!-- Scattered straw/sawdust -->
      <line x1="40"  y1="35" x2="52"  y2="32" stroke="rgba(120,90,40,0.3)" stroke-width="1"/>
      <line x1="80"  y1="55" x2="70"  y2="60" stroke="rgba(120,90,40,0.25)" stroke-width="1"/>
      <line x1="150" y1="44" x2="162" y2="40" stroke="rgba(120,90,40,0.3)"  stroke-width="1"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#1e1508"/>
      <rect x="0" y="0" width="480" height="12" fill="#2a1e0c"/>
      <rect x="0" y="30" width="480" height="8" fill="#2a1e0c"/>
      <rect x="0" y="60" width="480" height="6" fill="#261c0a"/>
      <rect x="60"  y="0" width="8" height="80" fill="#241a08"/>
      <rect x="200" y="0" width="8" height="80" fill="#241a08"/>
      <rect x="340" y="0" width="8" height="80" fill="#241a08"/>
      <rect x="0"   y="80" width="18" height="260" fill="#2a2418"/>
      <rect x="462" y="80" width="18" height="260" fill="#2a2418"/>
      ${[80,106,132,158,184,210,236,262,288,314].map(y=>`<rect x="1" y="${y}" width="16" height="22" rx="1" fill="rgba(60,50,35,0.5)"/>`).join('')}
      ${[80,106,132,158,184,210,236,262,288,314].map(y=>`<rect x="463" y="${y}" width="16" height="22" rx="1" fill="rgba(60,50,35,0.5)"/>`).join('')}
      <line x1="240" y1="0" x2="240" y2="50" stroke="rgba(120,90,40,0.6)" stroke-width="2"/>
      <rect x="180" y="48" width="120" height="4" rx="1" fill="rgba(100,75,35,0.8)"/>
      ${[186,202,218,234,250,266,282].map(x=>`<rect x="${x}" y="40" width="3" height="10" rx="1" fill="rgba(120,80,30,0.9)"/><ellipse cx="${x+1.5}" cy="38" rx="3" ry="4" fill="rgba(255,180,40,0.6)"/><ellipse cx="${x+1.5}" cy="36" rx="2" ry="3" fill="rgba(255,220,100,0.7)"/>`).join('')}
      <rect x="18" y="200" width="160" height="140" fill="#2e2010"/>
      <rect x="16" y="198" width="164" height="8" rx="2" fill="#3a2a12"/>
      <rect x="24" y="110" width="60" height="8" fill="rgba(60,40,20,0.7)"/>
      <ellipse cx="36" cy="109" rx="8" ry="10" fill="#5a3a1a"/>
      <ellipse cx="56" cy="109" rx="8" ry="10" fill="#5a3a1a"/>
      <ellipse cx="75" cy="109" rx="7" ry="9" fill="#5a3a1a"/>
      <rect x="310" y="185" width="55" height="100" rx="4" fill="#1a1208"/>
      <rect x="305" y="183" width="65" height="10" rx="2" fill="#2a1e0c"/>
      <rect x="312" y="220" width="51" height="65" rx="2" fill="#0e0a04"/>
      <path d="M318,282 Q325,255 332,270 Q338,248 344,265 Q350,250 356,275 Q358,285 318,285 Z" fill="rgba(200,80,10,0.45)"/>
      <path d="M321,282 Q327,260 333,272 Q339,252 345,268 Q350,255 354,278 Z" fill="rgba(255,150,20,0.4)"/>
      <ellipse cx="337" cy="278" rx="20" ry="8" fill="rgba(255,100,0,0.2)"/>
      <ellipse cx="140" cy="200" rx="20" ry="10" fill="#1a1a1a"/>
      <rect x="120" y="200" width="40" height="18" rx="0 0 8 8" fill="#222"/>
      <ellipse cx="140" cy="218" rx="20" ry="8" fill="#1a1a1a"/>
      <ellipse cx="140" cy="200" rx="18" ry="7" fill="rgba(0,180,80,0.3)"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#2a1e0c"/>
      ${[0,60,120,180,240,300,360,420].map(x=>`<rect x="${x}" y="0" width="56" height="80" rx="0" fill="rgba(50,35,15,${x%120===0?'0.15':'0.08'})"/>`).join('')}
      <line x1="0" y1="20" x2="480" y2="20" stroke="rgba(50,35,15,0.3)" stroke-width="1"/>
      <line x1="0" y1="40" x2="480" y2="40" stroke="rgba(50,35,15,0.25)" stroke-width="1"/>
      <line x1="0" y1="60" x2="480" y2="60" stroke="rgba(50,35,15,0.2)" stroke-width="1"/>
      <ellipse cx="337" cy="5" rx="38" ry="12" fill="rgba(200,80,10,0.12)"/>`,
  },

  private_drive: {
    label: 'Privet Drive',
    svgSky: `
      <!-- Day sky -->
      <rect x="0" y="0" width="240" height="340" fill="#87ceeb"/>
      <!-- Clouds -->
      <ellipse cx="55" cy="28" rx="26" ry="13" fill="rgba(255,255,255,0.88)"/>
      <ellipse cx="74" cy="22" rx="18" ry="11" fill="rgba(255,255,255,0.88)"/>
      <ellipse cx="175" cy="42" rx="22" ry="11" fill="rgba(255,255,255,0.82)"/>
      <ellipse cx="194" cy="36" rx="16" ry="9" fill="rgba(255,255,255,0.82)"/>
      <!-- Roof (dark grey tiles) -->
      <polygon points="10,132 120,58 230,132" fill="#3a3a3a"/>
      <line x1="10" y1="132" x2="120" y2="58" stroke="#2a2a2a" stroke-width="1.2"/>
      <line x1="230" y1="132" x2="120" y2="58" stroke="#2a2a2a" stroke-width="1.2"/>
      <!-- Chimney -->
      <rect x="58" y="62" width="18" height="36" rx="2" fill="#b06050"/>
      <rect x="55" y="60" width="24" height="6" rx="2" fill="#8a4a3a"/>
      <!-- House facade (red brick) -->
      <rect x="20" y="130" width="200" height="210" fill="#c0705a"/>
      <!-- Brick rows hint -->
      <line x1="20" y1="145" x2="220" y2="145" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <line x1="20" y1="160" x2="220" y2="160" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <line x1="20" y1="175" x2="220" y2="175" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <line x1="20" y1="190" x2="220" y2="190" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <line x1="20" y1="205" x2="220" y2="205" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <!-- Vertical brick breaks -->
      <line x1="48" y1="130" x2="48" y2="210" stroke="rgba(180,120,100,0.12)" stroke-width="0.6"/>
      <line x1="76" y1="130" x2="76" y2="210" stroke="rgba(180,120,100,0.12)" stroke-width="0.6"/>
      <line x1="164" y1="130" x2="164" y2="210" stroke="rgba(180,120,100,0.12)" stroke-width="0.6"/>
      <line x1="192" y1="130" x2="192" y2="210" stroke="rgba(180,120,100,0.12)" stroke-width="0.6"/>
      <!-- Upstairs windows -->
      <rect x="36" y="146" width="44" height="48" rx="3" fill="#c8dff0"/>
      <rect x="36" y="146" width="44" height="48" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="58" y1="146" x2="58" y2="194" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="36" y1="170" x2="80" y2="170" stroke="#8a6a4a" stroke-width="2"/>
      <path d="M36,146 Q42,162 38,194" fill="rgba(240,220,200,0.65)"/>
      <path d="M80,146 Q74,162 78,194" fill="rgba(240,220,200,0.65)"/>
      <rect x="160" y="146" width="44" height="48" rx="3" fill="#c8dff0"/>
      <rect x="160" y="146" width="44" height="48" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="182" y1="146" x2="182" y2="194" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="160" y1="170" x2="204" y2="170" stroke="#8a6a4a" stroke-width="2"/>
      <path d="M160,146 Q170,164 162,194" fill="rgba(240,220,200,0.75)"/>
      <path d="M204,146 Q194,164 202,194" fill="rgba(240,220,200,0.75)"/>
      <!-- Front door (black) -->
      <rect x="96" y="212" width="48" height="68" rx="3" fill="#1a1a1a"/>
      <rect x="100" y="216" width="18" height="18" rx="2" fill="#282828"/>
      <rect x="122" y="216" width="18" height="18" rx="2" fill="#282828"/>
      <rect x="100" y="238" width="18" height="18" rx="2" fill="#282828"/>
      <rect x="122" y="238" width="18" height="18" rx="2" fill="#282828"/>
      <circle cx="120" cy="262" r="4" fill="#d4a017"/>
      <circle cx="120" cy="262" r="2" fill="#b8880c"/>
      <!-- Ground floor windows -->
      <rect x="30" y="214" width="54" height="44" rx="3" fill="#c8dff0"/>
      <rect x="30" y="214" width="54" height="44" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="57" y1="214" x2="57" y2="258" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="30" y1="236" x2="84" y2="236" stroke="#8a6a4a" stroke-width="2"/>
      <rect x="156" y="214" width="54" height="44" rx="3" fill="#c8dff0"/>
      <rect x="156" y="214" width="54" height="44" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="183" y1="214" x2="183" y2="258" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="156" y1="236" x2="210" y2="236" stroke="#8a6a4a" stroke-width="2"/>`,
    svgGround: `
      <!-- Perfect manicured lawn -->
      <rect x="0" y="0" width="240" height="80" fill="#5aaa3a"/>
      <rect x="0" y="0" width="240" height="80" fill="url(#stripe)" opacity="0.18"/>
      <line x1="0" y1="0" x2="240" y2="0" stroke="rgba(40,100,20,0.15)" stroke-width="20"/>
      <line x1="0" y1="20" x2="240" y2="20" stroke="rgba(40,100,20,0.12)" stroke-width="18"/>
      <line x1="0" y1="40" x2="240" y2="40" stroke="rgba(40,100,20,0.10)" stroke-width="18"/>
      <line x1="0" y1="60" x2="240" y2="60" stroke="rgba(40,100,20,0.12)" stroke-width="18"/>
      <!-- Front path -->
      <rect x="96" y="0" width="48" height="32" fill="#c8c0b0"/>
      <line x1="96" y1="10" x2="144" y2="10" stroke="rgba(150,140,120,0.4)" stroke-width="0.8"/>
      <line x1="96" y1="20" x2="144" y2="20" stroke="rgba(150,140,120,0.4)" stroke-width="0.8"/>
      <!-- Flower beds -->
      <rect x="18" y="0" width="74" height="16" rx="0" fill="#6a3010"/>
      <circle cx="30" cy="7" r="5" fill="#e94560"/><line x1="30" y1="0" x2="30" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="44" cy="7" r="5" fill="#ff8c00"/><line x1="44" y1="0" x2="44" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="58" cy="7" r="5" fill="#ffd700"/><line x1="58" y1="0" x2="58" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="72" cy="7" r="5" fill="#ff69b4"/><line x1="72" y1="0" x2="72" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="84" cy="7" r="4" fill="#cc4488"/><line x1="84" y1="0" x2="84" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <rect x="148" y="0" width="74" height="16" rx="0" fill="#6a3010"/>
      <circle cx="160" cy="7" r="5" fill="#ff69b4"/><line x1="160" y1="0" x2="160" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="174" cy="7" r="5" fill="#e94560"/><line x1="174" y1="0" x2="174" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="188" cy="7" r="5" fill="#ffd700"/><line x1="188" y1="0" x2="188" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="202" cy="7" r="5" fill="#ff8c00"/><line x1="202" y1="0" x2="202" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>
      <circle cx="214" cy="7" r="4" fill="#e94560"/><line x1="214" y1="0" x2="214" y2="14" stroke="#4a7a2a" stroke-width="1.5"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#87ceeb"/>
      <ellipse cx="80" cy="28" rx="26" ry="13" fill="rgba(255,255,255,0.88)"/>
      <ellipse cx="106" cy="22" rx="18" ry="11" fill="rgba(255,255,255,0.88)"/>
      <ellipse cx="360" cy="42" rx="22" ry="11" fill="rgba(255,255,255,0.82)"/>
      <ellipse cx="386" cy="36" rx="16" ry="9" fill="rgba(255,255,255,0.82)"/>
      <polygon points="20,132 240,58 460,132" fill="#3a3a3a"/>
      <line x1="20" y1="132" x2="240" y2="58" stroke="#2a2a2a" stroke-width="1.2"/>
      <line x1="460" y1="132" x2="240" y2="58" stroke="#2a2a2a" stroke-width="1.2"/>
      <rect x="118" y="62" width="18" height="36" rx="2" fill="#b06050"/>
      <rect x="115" y="60" width="24" height="6" rx="2" fill="#8a4a3a"/>
      <rect x="30" y="130" width="400" height="210" fill="#c0705a"/>
      <line x1="30" y1="145" x2="430" y2="145" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <line x1="30" y1="160" x2="430" y2="160" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <line x1="30" y1="175" x2="430" y2="175" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <line x1="30" y1="190" x2="430" y2="190" stroke="rgba(180,120,100,0.2)" stroke-width="0.8"/>
      <rect x="56" y="146" width="44" height="48" rx="3" fill="#c8dff0"/>
      <rect x="56" y="146" width="44" height="48" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="78" y1="146" x2="78" y2="194" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="56" y1="170" x2="100" y2="170" stroke="#8a6a4a" stroke-width="2"/>
      <rect x="180" y="146" width="44" height="48" rx="3" fill="#c8dff0"/>
      <rect x="180" y="146" width="44" height="48" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="202" y1="146" x2="202" y2="194" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="180" y1="170" x2="224" y2="170" stroke="#8a6a4a" stroke-width="2"/>
      <rect x="256" y="146" width="44" height="48" rx="3" fill="#c8dff0"/>
      <rect x="256" y="146" width="44" height="48" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="278" y1="146" x2="278" y2="194" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="256" y1="170" x2="300" y2="170" stroke="#8a6a4a" stroke-width="2"/>
      <rect x="380" y="146" width="44" height="48" rx="3" fill="#c8dff0"/>
      <rect x="380" y="146" width="44" height="48" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="402" y1="146" x2="402" y2="194" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="380" y1="170" x2="424" y2="170" stroke="#8a6a4a" stroke-width="2"/>
      <rect x="196" y="212" width="88" height="68" rx="3" fill="#1a1a1a"/>
      <circle cx="240" cy="262" r="4" fill="#d4a017"/>
      <rect x="40" y="214" width="110" height="44" rx="3" fill="#c8dff0"/>
      <rect x="40" y="214" width="110" height="44" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="95" y1="214" x2="95" y2="258" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="40" y1="236" x2="150" y2="236" stroke="#8a6a4a" stroke-width="2"/>
      <rect x="330" y="214" width="110" height="44" rx="3" fill="#c8dff0"/>
      <rect x="330" y="214" width="110" height="44" rx="3" fill="none" stroke="#8a6a4a" stroke-width="3"/>
      <line x1="385" y1="214" x2="385" y2="258" stroke="#8a6a4a" stroke-width="2"/>
      <line x1="330" y1="236" x2="440" y2="236" stroke="#8a6a4a" stroke-width="2"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#5aaa3a"/>
      <line x1="0" y1="0" x2="480" y2="0" stroke="rgba(40,100,20,0.15)" stroke-width="20"/>
      <line x1="0" y1="20" x2="480" y2="20" stroke="rgba(40,100,20,0.12)" stroke-width="18"/>
      <line x1="0" y1="40" x2="480" y2="40" stroke="rgba(40,100,20,0.10)" stroke-width="18"/>
      <line x1="0" y1="60" x2="480" y2="60" stroke="rgba(40,100,20,0.12)" stroke-width="18"/>
      <rect x="196" y="0" width="88" height="32" fill="#c8c0b0"/>
      <rect x="18" y="0" width="170" height="16" fill="#6a3010"/>
      <circle cx="30" cy="7" r="5" fill="#e94560"/>
      <circle cx="50" cy="7" r="5" fill="#ff8c00"/>
      <circle cx="70" cy="7" r="5" fill="#ffd700"/>
      <circle cx="90" cy="7" r="5" fill="#ff69b4"/>
      <circle cx="110" cy="7" r="5" fill="#e94560"/>
      <circle cx="130" cy="7" r="5" fill="#ff8c00"/>
      <circle cx="150" cy="7" r="5" fill="#ffd700"/>
      <circle cx="170" cy="7" r="4" fill="#cc4488"/>
      <rect x="292" y="0" width="170" height="16" fill="#6a3010"/>
      <circle cx="304" cy="7" r="5" fill="#ff69b4"/>
      <circle cx="324" cy="7" r="5" fill="#e94560"/>
      <circle cx="344" cy="7" r="5" fill="#ffd700"/>
      <circle cx="364" cy="7" r="5" fill="#ff8c00"/>
      <circle cx="384" cy="7" r="5" fill="#ff69b4"/>
      <circle cx="404" cy="7" r="5" fill="#e94560"/>
      <circle cx="424" cy="7" r="5" fill="#ffd700"/>
      <circle cx="444" cy="7" r="4" fill="#e94560"/>`,
  },

  madriguera: {
    label: 'La Madriguera',
    svgSky: `
      <!-- Warm sunset sky -->
      <rect x="0" y="0" width="240" height="340" fill="#e8904a"/>
      <rect x="0" y="0" width="240" height="120" fill="rgba(220,140,60,0.5)"/>
      <rect x="0" y="200" width="240" height="140" fill="rgba(100,60,20,0.3)"/>
      <!-- Sun low on horizon -->
      <circle cx="190" cy="180" r="22" fill="rgba(255,230,80,0.7)"/>
      <circle cx="190" cy="180" r="16" fill="rgba(255,220,60,0.9)"/>
      <!-- Clouds (warm-tinted) -->
      <ellipse cx="50" cy="60" rx="30" ry="14" fill="rgba(255,200,150,0.6)"/>
      <ellipse cx="70" cy="54" rx="22" ry="12" fill="rgba(255,200,150,0.55)"/>
      <ellipse cx="160" cy="80" rx="26" ry="12" fill="rgba(255,180,120,0.5)"/>
      <!-- The Burrow — tall crooked house -->
      <!-- Foundation / ground floor (widest) -->
      <rect x="60" y="240" width="80" height="100" rx="2" fill="#c8aa6e"/>
      <!-- 2nd floor (slightly narrower, offset) -->
      <rect x="66" y="196" width="68" height="50" rx="2" fill="#d4b878" transform="rotate(-1,100,220)"/>
      <!-- 3rd floor -->
      <rect x="72" y="156" width="58" height="44" rx="2" fill="#c8aa6e" transform="rotate(1.5,101,178)"/>
      <!-- 4th floor (narrow) -->
      <rect x="78" y="124" width="46" height="36" rx="2" fill="#d4b878" transform="rotate(-2,101,142)"/>
      <!-- Roof (pointy, uneven) -->
      <polygon points="70,126 101,94 134,128" fill="#5a3a1a"/>
      <!-- Chimney (wonky) -->
      <rect x="105" y="88" width="14" height="30" rx="2" fill="#b06040" transform="rotate(4,112,103)"/>
      <rect x="103" y="86" width="18" height="5" rx="1" fill="#8a4a30" transform="rotate(4,112,89)"/>
      <!-- Smoke -->
      <circle cx="116" cy="80" r="5" fill="rgba(200,180,160,0.4)"/>
      <circle cx="120" cy="72" r="4" fill="rgba(200,180,160,0.3)"/>
      <circle cx="118" cy="64" r="3" fill="rgba(200,180,160,0.2)"/>
      <!-- Windows on each floor -->
      <rect x="68" y="252" width="20" height="20" rx="2" fill="#f5e8c8"/>
      <rect x="68" y="252" width="20" height="20" rx="2" fill="none" stroke="#7a5a2a" stroke-width="2"/>
      <line x1="78" y1="252" x2="78" y2="272" stroke="#7a5a2a" stroke-width="1.5"/>
      <line x1="68" y1="262" x2="88" y2="262" stroke="#7a5a2a" stroke-width="1.5"/>
      <rect x="112" y="252" width="20" height="20" rx="2" fill="#f5e8c8"/>
      <rect x="112" y="252" width="20" height="20" rx="2" fill="none" stroke="#7a5a2a" stroke-width="2"/>
      <line x1="122" y1="252" x2="122" y2="272" stroke="#7a5a2a" stroke-width="1.5"/>
      <line x1="112" y1="262" x2="132" y2="262" stroke="#7a5a2a" stroke-width="1.5"/>
      <!-- Front door (arched, old wood) -->
      <path d="M90,340 L90,278 Q100,266 110,278 L110,340" fill="#7a5a2a"/>
      <circle cx="107" cy="295" r="3" fill="#c8a020"/>
      <!-- 2nd floor window -->
      <rect x="74" y="207" width="18" height="18" rx="2" fill="#f5e8c8"/>
      <rect x="74" y="207" width="18" height="18" rx="2" fill="none" stroke="#7a5a2a" stroke-width="2"/>
      <rect x="104" y="207" width="18" height="18" rx="2" fill="#ffe8a0"/>
      <rect x="104" y="207" width="18" height="18" rx="2" fill="none" stroke="#7a5a2a" stroke-width="2"/>
      <!-- 3rd floor window -->
      <rect x="80" y="168" width="16" height="16" rx="2" fill="#f5e8c8"/>
      <rect x="80" y="168" width="16" height="16" rx="2" fill="none" stroke="#7a5a2a" stroke-width="2"/>
      <!-- Enchanted washing line -->
      <line x1="20" y1="200" x2="60" y2="210" stroke="#8a7050" stroke-width="1.2"/>
      <rect x="22" y="192" width="8" height="14" rx="1" fill="#e94560" opacity="0.85"/>
      <rect x="32" y="194" width="8" height="12" rx="1" fill="#3a7bd5" opacity="0.85"/>
      <rect x="42" y="196" width="7" height="10" rx="1" fill="#ffd700" opacity="0.85"/>
      <rect x="50" y="198" width="8" height="11" rx="1" fill="#2e7d32" opacity="0.85"/>`,
    svgGround: `
      <!-- Countryside grass -->
      <rect x="0" y="0" width="240" height="80" fill="#5a8a30"/>
      <!-- Hill bumps -->
      <ellipse cx="40" cy="0" rx="60" ry="20" fill="rgba(70,110,40,0.4)"/>
      <ellipse cx="200" cy="0" rx="50" ry="16" fill="rgba(70,110,40,0.35)"/>
      <!-- Garden gnome hint -->
      <ellipse cx="30" cy="32" rx="8" ry="10" fill="#c84820"/>
      <circle cx="30" cy="20" r="6" fill="#f5c5a3"/>
      <rect x="26" y="8" width="8" height="12" rx="3" fill="#e63030"/>
      <!-- Magical items on ground -->
      <circle cx="190" cy="38" r="4" fill="#ffd700" opacity="0.7"/>
      <circle cx="196" cy="42" r="3" fill="#e94560" opacity="0.6"/>
      <!-- Wildflowers -->
      <circle cx="155" cy="28" r="3" fill="#e94560"/>
      <circle cx="162" cy="22" r="3" fill="#ffd700"/>
      <circle cx="170" cy="30" r="3" fill="#ff69b4"/>
      <line x1="155" y1="28" x2="155" y2="42" stroke="#4a7a2a" stroke-width="1.2"/>
      <line x1="162" y1="22" x2="162" y2="38" stroke="#4a7a2a" stroke-width="1.2"/>
      <line x1="170" y1="30" x2="170" y2="44" stroke="#4a7a2a" stroke-width="1.2"/>`,
    groundH: 80,
    svgSkyWide: `
      <rect x="0" y="0" width="480" height="340" fill="#e8904a"/>
      <rect x="0" y="0" width="480" height="120" fill="rgba(220,140,60,0.5)"/>
      <rect x="0" y="200" width="480" height="140" fill="rgba(100,60,20,0.3)"/>
      <circle cx="400" cy="180" r="22" fill="rgba(255,230,80,0.7)"/>
      <circle cx="400" cy="180" r="16" fill="rgba(255,220,60,0.9)"/>
      <ellipse cx="90" cy="60" rx="30" ry="14" fill="rgba(255,200,150,0.6)"/>
      <ellipse cx="118" cy="54" rx="22" ry="12" fill="rgba(255,200,150,0.55)"/>
      <ellipse cx="310" cy="80" rx="26" ry="12" fill="rgba(255,180,120,0.5)"/>
      <!-- The Burrow left side, slightly narrower -->
      <rect x="40" y="240" width="80" height="100" rx="2" fill="#c8aa6e"/>
      <rect x="46" y="196" width="68" height="50" rx="2" fill="#d4b878" transform="rotate(-1,80,220)"/>
      <rect x="52" y="156" width="58" height="44" rx="2" fill="#c8aa6e" transform="rotate(1.5,81,178)"/>
      <rect x="58" y="124" width="46" height="36" rx="2" fill="#d4b878" transform="rotate(-2,81,142)"/>
      <polygon points="50,126 81,94 114,128" fill="#5a3a1a"/>
      <rect x="85" y="88" width="14" height="30" rx="2" fill="#b06040" transform="rotate(4,92,103)"/>
      <circle cx="96" cy="80" r="5" fill="rgba(200,180,160,0.4)"/>
      <circle cx="100" cy="72" r="4" fill="rgba(200,180,160,0.3)"/>
      <rect x="48" y="252" width="20" height="20" rx="2" fill="#f5e8c8"/>
      <rect x="48" y="252" width="20" height="20" rx="2" fill="none" stroke="#7a5a2a" stroke-width="2"/>
      <line x1="58" y1="252" x2="58" y2="272" stroke="#7a5a2a" stroke-width="1.5"/>
      <line x1="48" y1="262" x2="68" y2="262" stroke="#7a5a2a" stroke-width="1.5"/>
      <rect x="92" y="252" width="20" height="20" rx="2" fill="#f5e8c8"/>
      <rect x="92" y="252" width="20" height="20" rx="2" fill="none" stroke="#7a5a2a" stroke-width="2"/>
      <path d="M68,340 L68,278 Q79,266 90,278 L90,340" fill="#7a5a2a"/>
      <circle cx="87" cy="295" r="3" fill="#c8a020"/>
      <line x1="0" y1="200" x2="40" y2="210" stroke="#8a7050" stroke-width="1.2"/>
      <rect x="2" y="192" width="8" height="14" rx="1" fill="#e94560" opacity="0.85"/>
      <rect x="12" y="194" width="8" height="12" rx="1" fill="#3a7bd5" opacity="0.85"/>
      <rect x="22" y="196" width="7" height="10" rx="1" fill="#ffd700" opacity="0.85"/>
      <rect x="30" y="198" width="8" height="11" rx="1" fill="#2e7d32" opacity="0.85"/>`,
    svgGroundWide: `
      <rect x="0" y="0" width="480" height="80" fill="#5a8a30"/>
      <ellipse cx="80" cy="0" rx="100" ry="20" fill="rgba(70,110,40,0.4)"/>
      <ellipse cx="400" cy="0" rx="90" ry="16" fill="rgba(70,110,40,0.35)"/>
      <ellipse cx="60" cy="32" rx="8" ry="10" fill="#c84820"/>
      <circle cx="60" cy="20" r="6" fill="#f5c5a3"/>
      <rect x="56" y="8" width="8" height="12" rx="3" fill="#e63030"/>
      <circle cx="380" cy="38" r="4" fill="#ffd700" opacity="0.7"/>
      <circle cx="388" cy="42" r="3" fill="#e94560" opacity="0.6"/>
      <circle cx="310" cy="28" r="3" fill="#e94560"/>
      <circle cx="324" cy="22" r="3" fill="#ffd700"/>
      <circle cx="340" cy="30" r="3" fill="#ff69b4"/>
      <line x1="310" y1="28" x2="310" y2="42" stroke="#4a7a2a" stroke-width="1.2"/>
      <line x1="324" y1="22" x2="324" y2="38" stroke="#4a7a2a" stroke-width="1.2"/>
      <line x1="340" y1="30" x2="340" y2="44" stroke="#4a7a2a" stroke-width="1.2"/>`,
  },
};

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

// Wraps svg string in a rotation transform around (cx,cy)
// angle: degrees, positive = clockwise
function rotateWrap(svg, cx, cy, angle) {
  if (!angle) return svg;
  return `<g transform="rotate(${angle},${cx},${cy})">${svg}</g>`;
}

const CATEGORY_YOFFSET_MAP = {
  eyes:    'eyesYOffset',
  brows:   'browsYOffset',
  nose:    'noseYOffset',
  mouth:   'mouthYOffset',
  cheeks:  'cheeksYOffset',
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
  broom:   'broomYOffset',
  tattoo:  'tattooYOffset',
  sock:    'sockYOffset',
};

// X-offset field map (horizontal repositioning — only for categories that support it)
const CATEGORY_XOFFSET_MAP = {
  tattoo: 'tattooXOffset',
};

const CATEGORY_SCALE_MAP = {
  eyes:    'eyesScale',
  brows:   'browsScale',
  nose:    'noseScale',
  mouth:   'mouthScale',
  cheeks:  'cheeksScale',
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
    broom:   'broomScale',
    tattoo:  'tattooScale',
    pet:     'petScale',
    sock:    'sockScale',
  };

// SVG origin point for each category's scale transform
const CATEGORY_SCALE_ORIGIN = {
  eyes:    [120, 118],
  brows:   [120,  97],
  nose:    [120, 140],
  mouth:   [120, 165],
  cheeks:  [120, 136],
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
    broom:   [120, 288],
    tattoo:  [120, 145],
    pet:     [170, 308],
    sock:    [120, 323],
  };

// Rotation field map (only for categories that support rotation)
const CATEGORY_ROTATE_MAP = {
  broom:  'broomRotate',
  tattoo: 'tattooRotate',
};

// SVG pivot point for each category's rotation transform
const CATEGORY_ROTATE_ORIGIN = {
  broom:  [120, 288],
  tattoo: [120, 145],
};

/* ---------- SCENE BACKGROUND COLORS ---------- */
const SCENE_BG = {
  hogwarts:         '#0d1530',
  great_hall:       '#1a1200',
  forbidden_forest: '#0a1a0a',
  platform_934:     '#4a2010',
  quidditch:        '#4a9fd4',
  park:             '#87CEEB',
  sunset_beach:     '#1a0533',
  brick_wall:       '#3a2e26',
  ministry:         '#2a2010',
  hogsmeade:        '#3a4a5a',
  hagrid_hut:       '#3a4a30',
  leaky_cauldron:   '#1e1508',
  potions_class:    '#0a080f',
  private_drive:    '#d4e8d4',
  madriguera:       '#87CEEB',
};

/* ---------- DOLL POSITION ---------- */
function getDefaultDollPos(slotIdx) {
  const area = document.querySelector('.canvas-area');
  if (!area) return { x: 0, y: 0 };
  const aW = area.clientWidth;
  const aH = area.clientHeight;
  const dW = 240, dH = 340;
  // Spread dolls across the canvas: slot 0 at 20%, 1 at 40%, 2 at 60%, 3 at 80%
  const count = collection.filter(d => d.inScene).length || 1;
  const inSceneIdxs = collection.map((d, i) => d.inScene ? i : -1).filter(i => i >= 0);
  const posInScene = inSceneIdxs.indexOf(slotIdx);
  const spacing = aW / (count + 1);
  const x = spacing * (posInScene + 1) - dW / 2;
  const y = aH * 0.8 - dH;
  return { x, y };
}

function renderSceneDolls() {
  const container = document.getElementById('scene-dolls');
  if (!container) return;

  // Ensure a doll-wrap exists for each slot that is inScene
  collection.forEach((d, i) => {
    let wrap = container.querySelector(`.doll-wrap[data-slot="${i}"]`);
    if (d.inScene) {
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'doll-wrap';
        wrap.dataset.slot = i;
        wrap.innerHTML = `<div class="doll-layers"></div><div class="doll-name-tag"></div>`;
        container.appendChild(wrap);
      }
      // Render doll SVG into its layer
      const layers = wrap.querySelector('.doll-layers');
      renderDoll(layers, d);
      // Apply per-doll scale (0 = 1×, −50 = 0.5×, +50 = 1.5×)
      const ds = 1 + (d.dollScale || 0) / 100;
      layers.style.transform = `scale(${ds})`;
      layers.style.transformOrigin = 'center bottom';
      // Position
      const pos = getDefaultDollPos(i);
      const x = (d.dollX !== null && d.dollX !== undefined) ? d.dollX : pos.x;
      const y = (d.dollY !== null && d.dollY !== undefined) ? d.dollY : pos.y;
      wrap.style.left = x + 'px';
      wrap.style.top  = y + 'px';
      // Active state
      wrap.classList.toggle('active-doll', i === activeSlot);
      // Name tag
      const nameTag = wrap.querySelector('.doll-name-tag');
      if (nameTag) nameTag.textContent = d.name || `Muñeco ${i + 1}`;
    } else {
      // Remove if exists but not in scene
      if (wrap) wrap.remove();
    }
  });

  // Remove any orphaned wraps
  container.querySelectorAll('.doll-wrap').forEach(wrap => {
    const idx = parseInt(wrap.dataset.slot, 10);
    if (!collection[idx] || !collection[idx].inScene) wrap.remove();
  });
}

/* Render just the active doll's SVG (for live slider/preview updates) */
function renderActiveDoll() {
  const layers = document.querySelector(`#scene-dolls .doll-wrap[data-slot="${activeSlot}"] .doll-layers`);
  if (!layers) return;
  renderDoll(layers, doll);
  const ds = 1 + (doll.dollScale || 0) / 100;
  layers.style.transform = `scale(${ds})`;
  layers.style.transformOrigin = 'center bottom';
}

/* ---------- BACKGROUND SCENE LAYER ---------- */
function renderBgScene() {
  const el = document.getElementById('bg-scene-layer');
  if (!el) return;
  if (!sceneState.bgScene || !BG_SCENES[sceneState.bgScene]) {
    el.innerHTML = '';
    return;
  }
  const scene   = BG_SCENES[sceneState.bgScene];
  const bg      = SCENE_BG[sceneState.bgScene] || '#1a2a4a';
  const area    = document.querySelector('.canvas-area');
  const wide    = area && scene.svgSkyWide && area.clientWidth > area.clientHeight;
  const svgSky    = wide ? scene.svgSkyWide    : scene.svgSky;
  const svgGround = wide ? (scene.svgGroundWide || scene.svgGround) : scene.svgGround;
  const groundH   = wide ? (scene.groundHWide  || scene.groundH || 80) : (scene.groundH || 80);
  const skyW      = wide ? 480 : 240;
  el.innerHTML = `
    <svg viewBox="0 0 ${skyW} 340" preserveAspectRatio="xMidYMin slice"
      xmlns="http://www.w3.org/2000/svg"
      style="position:absolute;inset:0;width:100%;height:100%;">
      <rect width="${skyW}" height="340" fill="${bg}"/>
      ${svgSky}
    </svg>
    <svg viewBox="0 0 ${skyW} ${groundH}" preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style="position:absolute;bottom:0;left:0;width:100%;height:20%;">
      ${svgGround}
    </svg>`;
}

function applyBgColor() {
  const canvasBg = document.querySelector('.canvas-bg');
  if (sceneState.bgScene) {
    canvasBg.style.background = 'transparent';
  } else {
    const bg = sceneState.bgColor || '#1a2a4a';
    canvasBg.style.background =
      `radial-gradient(ellipse at 50% 60%, ${bg} 0%, ${darken(bg, 20)} 100%)`;
  }
}

/* ---------- STATE ---------- */
const COLLECTION_KEY = 'munecos_kawaii_collection';
const SCENE_STATE_KEY = 'munecos_kawaii_scene';
const MAX_SLOTS = 8;
const PET_SCALE_MIN = -100;
const PET_SCALE_MAX = 100;
const PET_SCALE_DEFAULT = 0; // renders at 1.75× (old +75% base)

function normalizePetScale(value) {
  let n = Number(value);
  if (!Number.isFinite(n)) return PET_SCALE_DEFAULT;
  // Migrate old 75..200 absolute range to new -50..+50 additive range
  if (n > PET_SCALE_MAX) n = n - 75;
  return Math.min(PET_SCALE_MAX, Math.max(PET_SCALE_MIN, Math.round(n)));
}

function defaultSceneState() {
  return { bgColor: '#1a2a4a', bgScene: null };
}

function loadSceneState() {
  try {
    const raw = localStorage.getItem(SCENE_STATE_KEY);
    if (raw) return Object.assign(defaultSceneState(), JSON.parse(raw));
  } catch (_) {}
  return defaultSceneState();
}

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
    shoes: null, shoesColor: '#444444', sock: null, sockColor: '#ffffff', sockColor2: '#cccccc',
    hat: null, hatColor: '#7c3aed',
    cape: null, capeColor: '#1e1e1e',
    glasses: null, glassesColor: '#222222',
    belt: null, beltColor: '#8b4513',
    hair: null, hairColor: '#3d2b1f',
    scarf: null,
    scarf2: null, scarf2Color: '#e94560', scarf2Color2: '#ffffff',
    wand: null,
    lefthand: null, lefthandColor: '#7c3aed',
    broom: null,
    bgColor: '#1a2a4a',
    browColor: '#5a3a1a',
    lashColor: '#3d2b1f',
    cheeks: 'soft',
    cheeksColor: 'rgba(255,160,160,0.35)',
    // scale fields: -50..+50 (0 = normal size)
    eyesScale: 0, browsScale: 0, noseScale: 0, mouthScale: 0, cheeksScale: 0,
    hairScale: 0, topScale: 0,   bottomScale: 0, shoesScale: 0,
    hatScale: 0,  capeScale: 0,  glassesScale: 0, beltScale: 0,
    wandScale: 0, lefthandScale: 0, broomScale: 0, tattooScale: 0, sockScale: 0,
    // yOffset fields: -15..+15 (0 = normal position, in SVG px)
    eyesYOffset: 0, browsYOffset: 0, noseYOffset: 0, mouthYOffset: 0, cheeksYOffset: 0,
    hairYOffset: 0, topYOffset: 0,   bottomYOffset: 0, shoesYOffset: 0,
    hatYOffset: 0,  capeYOffset: 0,  glassesYOffset: 0, beltYOffset: 0,
    wandYOffset: 0, lefthandYOffset: 0, broomYOffset: 0, tattooYOffset: 0, sockYOffset: 0,
    // xOffset fields (horizontal repositioning)
    tattooXOffset: 0,
    // rotate fields (degrees, 0 = default angle)
    broomRotate: 0, tattooRotate: 0,
    // flip fields (horizontal mirror) for selected categories
    hairFlip: false, hatFlip: false, wandFlip: false, lefthandFlip: false, scarf2Flip: false, tattooFlip: false,
    // background scene
    bgScene: null,
    // doll position and scale in canvas
    dollX: null, dollY: null, dollScale: 0,
    // bodyShape: null = standard Funko, 'elf' = house elf (large ears)
    bodyShape: null,
    // pet fields
    pet: null, petOutfit: null, petPosition: 'floor', petScale: PET_SCALE_DEFAULT,
    // whether this doll is placed in the shared scene
    inScene: idx === 0,
  };
}

function randomizeDoll() {
  const pick    = obj => { const k = Object.keys(obj); return k[k.length * Math.random() | 0]; };
  const pickArr = arr => arr[arr.length * Math.random() | 0];
  const chance  = p   => Math.random() < p;

  const SKIN_TONES  = ['#fde8d0','#f5c5a3','#e8a87c','#d4895e','#c87941','#a0622a','#7d4315','#4a2a10'];
  const HAIR_COLORS = ['#3d2b1f','#1a1010','#8b4513','#c87941','#ffd700','#ff6b6b','#9b59b6','#3498db','#2ecc71','#e74c3c','#ff8c00','#c0c0c0','#ff69b4','#00ced1'];
  const EYE_COLORS  = ['#3a7bd5','#2ecc71','#9b59b6','#e74c3c','#f39c12','#1abc9c','#5a3a1a','#1a3a6b','#c06060','#40a060'];
  const VIVID       = ['#e94560','#3a7bd5','#7c3aed','#2ecc71','#ff6b6b','#ffd700','#ff8c00','#00ced1','#ff69b4','#9b59b6','#e67e22','#1abc9c','#e74c3c','#f39c12'];
  const DARKS       = ['#1a1a2e','#2c2c54','#1e3a2f','#2d1b44','#1c2833','#3d1a1a','#2d2d2d','#3a1a1a'];
  const SHOE_COLORS = ['#222','#444','#8b4513','#c0c0c0','#1a1a2e','#3d1a1a','#f0f0f0'];

  // Preserve scene / position data
  const keep = { name: doll.name, inScene: doll.inScene, dollX: doll.dollX, dollY: doll.dollY, dollScale: doll.dollScale };
  collection[activeSlot] = defaultDoll(activeSlot);
  Object.assign(collection[activeSlot], keep);
  doll = collection[activeSlot];

  // === TRAITS ===
  doll.skin      = pickArr(SKIN_TONES);
  doll.gender    = chance(0.55) ? 'girl' : 'boy';
  doll.eyes      = pick(EYES);
  doll.eyeColor  = pickArr(EYE_COLORS);
  doll.lashColor = chance(0.5) ? '#1a1010' : '#3d2b1f';
  doll.brows     = pick(BROWS);
  doll.browColor = pickArr(['#3d2b1f','#1a1010','#6b3a2a','#8b4513']);
  doll.nose      = pick(NOSES);
  doll.mouth     = pick(MOUTHS);
  doll.cheeks    = chance(0.72) ? pick(CHEEKS) : null;

  // === HAIR ===
  doll.hair      = pick(HAIR);
  doll.hairColor = pickArr(HAIR_COLORS);
  doll.hairFlip  = chance(0.3);

  // === CLOTHING ===
  doll.top         = pick(TOPS);
  doll.topColor    = pickArr(VIVID);
  doll.bottom      = pick(BOTTOMS);
  doll.bottomColor = pickArr(VIVID);
  doll.shoes       = pick(SHOES);
  doll.shoesColor  = pickArr(SHOE_COLORS);

  // === HP EXTRAS (probabilistic) ===
  if (chance(0.60)) doll.wand = pick(WANDS);
  if (chance(0.45)) { doll.cape = pick(CAPES); doll.capeColor = pickArr([...DARKS, ...VIVID]); }
  if (chance(0.30)) { doll.hat  = pick(HATS);  doll.hatColor  = pickArr([...DARKS, ...VIVID]); }
  if (chance(0.25)) { doll.glasses = pick(GLASSES); doll.glassesColor = pickArr(['#1a1010','#8b4513','#ffd700','#c0c0c0','#444']); }
  if (chance(0.40)) { doll.belt = pick(BELTS); doll.beltColor = pickArr(['#1a1010','#8b4513','#ffd700','#c0c0c0']); }
  if (chance(0.38)) doll.scarf = pickArr(['gryffindor','slytherin','ravenclaw','hufflepuff']);
  if (chance(0.32)) { doll.pet = pick(PETS); doll.petPosition = pickArr(['floor','righthand','lefthand','leash']); }
  if (chance(0.18)) doll.broom = pick(BROOMS);
  if (chance(0.15) && !doll.broom) { doll.lefthand = pick(LEFTHAND); doll.lefthandColor = pickArr(VIVID); }
  if (chance(0.10)) { doll.tattoo = pick(TATTOOS); doll.tattooColor = pickArr(['#1a1010','#8b4513','#e74c3c','#3498db','#2ecc71']); }

  buildPanel();
  renderAll();
  saveCollection();
}

function loadCollection() {
  try {
    const raw = localStorage.getItem(COLLECTION_KEY);
    if (raw) {
      const arr = JSON.parse(raw).map((d, idx) => {
        const merged = Object.assign(defaultDoll(idx), d || {});
        merged.petScale = normalizePetScale(merged.petScale);
        return merged;
      });
      while (arr.length < MAX_SLOTS) arr.push(defaultDoll(arr.length));
      return arr.slice(0, MAX_SLOTS);
    }
  } catch (_) {}
  return Array.from({ length: MAX_SLOTS }, (_, i) => defaultDoll(i));
}

function saveCollection() {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
  localStorage.setItem(SCENE_STATE_KEY, JSON.stringify(sceneState));
}

let collection = loadCollection();
let sceneState = loadSceneState();
// Migrate: if first doll has bgColor/bgScene and sceneState doesn't, copy them over
if (collection[0] && collection[0].bgColor && sceneState.bgColor === '#1a2a4a' && collection[0].bgColor !== '#1a2a4a') {
  sceneState.bgColor = collection[0].bgColor;
}
if (collection[0] && collection[0].bgScene && !sceneState.bgScene) {
  sceneState.bgScene = collection[0].bgScene;
}
let activeSlot = 0;
let doll = collection[activeSlot];

/* ---------- ELF DIRT OVERLAY ---------- */
function elfDirtOverlay(d) {
  // Irregular stain blobs only over equipped clothing — never on bare skin.
  // Each stain is a rotated/skewed ellipse cluster for an organic, non-uniform look.
  const s = [];

  // Helper: irregular stain = overlapping ellipses with slight rotation offsets
  const stain = (cx, cy, rx, ry, rot, fill, op) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" opacity="${op}" transform="rotate(${rot},${cx},${cy})"/>`;

  if (d.top) {
    // Large grease splatter, chest-centre
    s.push(stain(117, 222, 19, 11, 12,  '#6b3a10', 0.26));
    s.push(stain(121, 218,  9,  6, -8,  '#3d1a04', 0.20));
    // Oil drip right side
    s.push(stain(144, 244, 11,  7, 18,  '#7a4010', 0.28));
    s.push(stain(147, 252,  5,  9, 5,   '#4a2008', 0.22));
    // Smear upper left
    s.push(stain(98,  238, 13,  7, -15, '#5a2e08', 0.24));
    s.push(stain(93,  234,  5,  4, 20,  '#7a4010', 0.18));
    // Small specks
    s.push(stain(129, 208,  7,  4, 30,  '#6b3a10', 0.30));
    s.push(stain(133, 262,  6,  3, -10, '#3d1a04', 0.25));
    s.push(stain(108, 256,  8,  5, 8,   '#7a4010', 0.19));
    s.push(stain(152, 230,  5,  3, -20, '#5a2e08', 0.22));
  }

  if (d.belt) {
    s.push(stain(109, 275, 10,  4,  5,  '#5a2e08', 0.27));
    s.push(stain(106, 278,  4,  3, -12, '#3d1a04', 0.22));
    s.push(stain(135, 272,  8,  4, -8,  '#6b3a10', 0.28));
    s.push(stain(140, 276,  4,  2, 15,  '#7a4010', 0.20));
  }

  if (d.bottom) {
    // Left leg blotch
    s.push(stain(97,  298, 15,  9, -12, '#6b3a10', 0.25));
    s.push(stain(92,  302,  6,  5, 20,  '#3d1a04', 0.22));
    // Right leg smear
    s.push(stain(139, 290, 10,  7,  10, '#5a2e08', 0.28));
    s.push(stain(145, 296,  5,  4, -5,  '#7a4010', 0.24));
    // Knee area drips
    s.push(stain(108, 315,  5, 10,  3,  '#6b3a10', 0.26));
    s.push(stain(112, 322,  4,  6, -8,  '#4a2008', 0.20));
    s.push(stain(131, 312, 13,  7, 15,  '#5a2e08', 0.22));
    s.push(stain(136, 325,  6,  4, -15, '#7a4010', 0.25));
    // Lower specks
    s.push(stain(120, 306,  4,  3, 25,  '#3d1a04', 0.19));
    s.push(stain(100, 330,  7,  4,  8,  '#6b3a10', 0.21));
  }

  if (d.shoes) {
    s.push(stain(96,  330, 11,  5, -10, '#7a4010', 0.30));
    s.push(stain(91,  333,  5,  3,  18, '#3d1a04', 0.24));
    s.push(stain(140, 330, 11,  5,  12, '#5a2e08', 0.29));
    s.push(stain(145, 334,  5,  3, -15, '#4a2008', 0.22));
  }

  if (d.cape) {
    s.push(stain(66,  248, 10,  6, -20, '#6b3a10', 0.22));
    s.push(stain(61,  254,  5,  4,  10, '#3d1a04', 0.18));
    s.push(stain(174, 256, 10,  6,  18, '#5a2e08', 0.22));
    s.push(stain(178, 264,  4,  3, -12, '#7a4010', 0.19));
  }

  if (d.scarf) {
    // HP scarf neck band: x=92-148, y=181-195
    s.push(stain(100, 184,  8,  4,  -8, '#6b3a10', 0.28));
    s.push(stain(96,  188,  4,  3,  10, '#3d1a04', 0.22));
    s.push(stain(136, 183,  7,  4, -12, '#7a4010', 0.26));
    s.push(stain(121, 187,  5,  3,  15, '#5a2e08', 0.20));
    // Left hanging tail: x=93-109, y=194-235
    s.push(stain(100, 200,  7,  4, -10, '#6b3a10', 0.25));
    s.push(stain(97,  206,  4,  3,  18, '#3d1a04', 0.22));
    s.push(stain(104, 216,  6,  4,  -5, '#5a2e08', 0.28));
    s.push(stain(99,  223,  4,  3,  12, '#7a4010', 0.20));
    s.push(stain(105, 231,  5,  3, -15, '#4a2008', 0.24));
  }
  if (d.scarf2) {
    // Free scarf neck band only: x=89-151, y=179-195
    s.push(stain(105, 182,  9,  4,  12, '#6b3a10', 0.26));
    s.push(stain(101, 188,  4,  3, -10, '#3d1a04', 0.21));
    s.push(stain(130, 183,  7,  4, -18, '#7a4010', 0.28));
    s.push(stain(140, 189,  5,  3,  15, '#5a2e08', 0.22));
  }

  return s.join('\n');
}

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
  const ro = (cat, svg) => {
    const origin = CATEGORY_ROTATE_ORIGIN[cat];
    if (!origin) return svg;
    return rotateWrap(svg, origin[0], origin[1], d[CATEGORY_ROTATE_MAP[cat]] || 0);
  };
  const xo = (cat, svg) => {
    const field = CATEGORY_XOFFSET_MAP[cat];
    if (!field) return svg;
    const v = d[field] || 0;
    if (!v) return svg;
    return `<g transform="translate(${v},0)">${svg}</g>`;
  };
  const layer = (cat, svg, hasFlip) => ro(cat, yo(cat, hasFlip ? flip(cat, sc(cat, svg)) : sc(cat, svg)));
  // Tattoo: sc → flip → xo → yo → ro (scale at anchor, then mirror, then reposition, then rotate)
  const tattooLayer = svg => ro('tattoo', yo('tattoo', xo('tattoo', flip('tattoo', sc('tattoo', svg)))));
  // Broom has no flip — both back and front get the same scale/yOffset/rotate transforms
  const broomLayer = svg => ro('broom', yo('broom', sc('broom', svg)));
  const parts = [];
  // broom_back renders BEHIND everything (below svgBase / body)
  if (d.broom) parts.push(broomLayer((BROOMS[d.broom] || {}).back || ''));
  parts.push(svgBase(d.gender, d.skin, d.bodyShape));
  if (d.hair)    parts.push(layer('hair',    (HAIR[d.hair]    || (() => ''))(d.hairColor    || '#3d2b1f'), true));
  if (d.brows)   parts.push(layer('brows',   (BROWS[d.brows]   || (() => ''))(d.browColor || '#5a3a1a'), false));
  if (d.eyes)    parts.push(layer('eyes',    (EYES[d.eyes]    || EYES.round)(d.eyeColor, d.lashColor || d.hairColor || '#3d2b1f'), false));
  if (d.nose)    parts.push(layer('nose',    NOSES[d.nose]    || '', false));
  if (d.mouth)   parts.push(layer('mouth',   MOUTHS[d.mouth]  || '', false));
  if (d.cheeks)  parts.push(layer('cheeks',  (CHEEKS[d.cheeks] || (() => ''))(d.cheeksColor || 'rgba(255,160,160,0.35)'), false));
  // tattoo: above skin, below all clothing and accessories
  if (d.tattoo)  parts.push(tattooLayer((TATTOOS[d.tattoo] || (() => ''))(d.tattooColor || '#1a1a2e')));
  if (d.bottom)  parts.push(layer('bottom',  (BOTTOMS[d.bottom] || (() => ''))(d.bottomColor, d.gender), false));
  if (d.sock)    parts.push(layer('sock',    (SOCKS[d.sock]    || (() => ''))(d.sockColor || '#ffffff', d.sockColor2 || '#cccccc', d.gender), false));
  // broom_front renders in front of bottom/legs but behind belt/top
  if (d.broom)   parts.push(broomLayer((BROOMS[d.broom] || {}).front || ''));
  if (d.belt)    parts.push(layer('belt',    (BELTS[d.belt]   || (() => ''))(d.beltColor), false));
  if (d.top)     parts.push(layer('top',     (TOPS[d.top]     || (() => ''))(d.topColor, d.gender), false));
  if (d.shoes)   parts.push(layer('shoes',   (SHOES[d.shoes]  || (() => ''))(d.shoesColor), false));
  if (d.bodyShape === 'elf') { const dirt = elfDirtOverlay(d); if (dirt) parts.push(dirt); }
  if (d.cape)    parts.push(layer('cape',    (CAPES[d.cape]   || (() => ''))(d.capeColor), false));
  if (d.hat)     parts.push(layer('hat',     (HATS[d.hat]     || (() => ''))(d.hatColor), true));
  if (d.glasses) parts.push(layer('glasses', (GLASSES[d.glasses] || (() => ''))(d.glassesColor), false));
  if (d.scarf)     parts.push(svgScarf(d.scarf));
  if (d.scarf2) {
    let s2 = svgScarf2(d.scarf2, d.scarf2Color || '#e94560', d.scarf2Color2 || '#ffffff');
    if (d.scarf2Flip) s2 = `<g transform="translate(240,0) scale(-1,1)">${s2}</g>`;
    parts.push(s2);
  }
  // Hand conflict: pet in righthand hides wand, pet in lefthand/leash hides lefthand
  const petHidesWand = d.pet && d.petPosition === 'righthand';
  const petHidesLefthand = d.pet && (d.petPosition === 'lefthand' || d.petPosition === 'leash');
  if (d.wand && !petHidesWand)      parts.push(`<g class="wand-layer" data-wand="${d.wand}">${layer('wand',     WANDS[d.wand]    || '', true)}</g>`);
  if (d.lefthand && !petHidesLefthand)  parts.push(layer('lefthand', (LEFTHAND[d.lefthand] || (() => ''))(d.lefthandColor || '#7c3aed'), true));
  // Pet: last layer
  if (d.pet) parts.push(renderPet(d.pet, d.petOutfit, d.petPosition || 'floor', normalizePetScale(d.petScale)));

  container.innerHTML = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">${parts.join('\n')}</svg>`;
}

function renderAll() {
  renderSceneDolls();
  renderBgScene();
  applyBgColor();
  updateEquipped();
  updateSlotTabs();
  syncRightPanel();
}

/* mini SVG for slot tabs */
function renderMini(d) {
  const parts = [svgBase(d.gender, d.skin, d.bodyShape)];
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
  cheeks: 'cheeks',
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
  broom: 'broom',
  tattoo: 'tattoo',
  pet: 'pet',
  sock: 'sock',
};

function updateEquipped() {
  document.querySelectorAll('.item-chip').forEach(el => {
    const cat = el.dataset.category;
    if (!cat) return;
    const val = el.dataset.value;
    const field = CATEGORY_FIELD_MAP[cat];
    el.classList.toggle('equipped', doll[field] === val);
  });
  document.querySelectorAll('.gender-chip').forEach(el => {
    el.classList.toggle('equipped', doll.gender === el.dataset.value);
  });
  document.querySelectorAll('.pet-pos-chip[data-pos]').forEach(el => {
    el.classList.toggle('equipped', (doll.petPosition || 'floor') === el.dataset.pos);
  });
  document.querySelectorAll('.pet-outfit-chip[data-outfit]').forEach(el => {
    const key = el.dataset.outfit === 'null' ? null : el.dataset.outfit;
    el.classList.toggle('equipped', doll.petOutfit === key);
  });
}

/* ---------- EQUIP ITEM ---------- */
function equipItem(category, value) {
  const field = CATEGORY_FIELD_MAP[category];
  if (!field) return;
  // toggle off if already equipped (except gender/eyes/brows/nose/mouth — always need one)
  const mandatory = ['gender', 'eyes', 'nose', 'mouth', 'cheeks'];
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
  const sceneDolls = document.getElementById('scene-dolls');

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

  sceneDolls.addEventListener('dragover', e => {
    if (!dragData) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    // Highlight the closest doll-wrap
    const wrap = e.target.closest('.doll-wrap');
    sceneDolls.querySelectorAll('.doll-wrap').forEach(w => w.classList.remove('drag-over'));
    if (wrap) wrap.classList.add('drag-over');
  });

  sceneDolls.addEventListener('dragleave', e => {
    if (!e.relatedTarget || !sceneDolls.contains(e.relatedTarget)) {
      sceneDolls.querySelectorAll('.doll-wrap').forEach(w => w.classList.remove('drag-over'));
    }
  });

  sceneDolls.addEventListener('drop', e => {
    e.preventDefault();
    sceneDolls.querySelectorAll('.doll-wrap').forEach(w => w.classList.remove('drag-over'));
    if (dragData) {
      // Drop onto whichever doll wrap was targeted, or the active doll
      const wrap = e.target.closest('.doll-wrap');
      if (wrap) {
        const idx = parseInt(wrap.dataset.slot, 10);
        if (idx !== activeSlot) switchSlot(idx);
      }
      equipItem(dragData.category, dragData.value);
      dragData = null;
    }
  });

  // Touch support for mobile
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
      const wrap = el.closest('.doll-wrap');
      const idx = parseInt(wrap.dataset.slot, 10);
      if (idx !== activeSlot) switchSlot(idx);
      equipItem(touchChip.dataset.category, touchChip.dataset.value);
    }
    touchChip = null;
  });
}

/* ---------- DOLL DRAG (move dolls around canvas + click to select) ---------- */
function initDollDrag() {
  const area = document.querySelector('.canvas-area');
  if (!area) return;
  const trashZone = document.getElementById('scene-trash-zone');

  let dragging = false, dragWrap = null, startX, startY, origLeft, origTop;
  let didMove = false; // distinguish click from drag
  let clickTarget = null; // track original click target for pet sound

  // Click on canvas background → deselect active doll visually
  area.addEventListener('click', e => {
    if (!e.target.closest('.doll-wrap')) {
      document.querySelectorAll('.doll-wrap.active-doll').forEach(w => w.classList.remove('active-doll'));
    }
  });

  const isOverTrash = (wrapTop) => {
    const aH = area.clientHeight;
    // doll bottom = wrapTop + 340; trash zone occupies bottom 60px
    return (wrapTop + 340) > (aH - 30);
  };

  const onStart = (wrap, cx, cy, evTarget) => {
    dragging = true;
    didMove = false;
    clickTarget = evTarget || null;
    dragWrap = wrap;
    startX = cx; startY = cy;
    origLeft = wrap.offsetLeft;
    origTop  = wrap.offsetTop;
    wrap.classList.add('grabbing');
    // Select this doll
    const idx = parseInt(wrap.dataset.slot, 10);
    if (idx !== activeSlot) {
      switchSlot(idx);
    }
    // Show trash zone
    if (trashZone) trashZone.classList.add('visible');
  };

  const onMove = (cx, cy) => {
    if (!dragging || !dragWrap) return;
    const dx = cx - startX, dy = cy - startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didMove = true;
    const aW = area.clientWidth;
    const aH = area.clientHeight;
    const newLeft = Math.max(-120, Math.min(aW - 120, origLeft + dx));
    const newTop  = Math.max(-170, Math.min(aH - 170, origTop  + dy));
    dragWrap.style.left = newLeft + 'px';
    dragWrap.style.top  = newTop  + 'px';
    // Trash zone hover feedback
    if (trashZone) trashZone.classList.toggle('hover', isOverTrash(newTop));
  };

  const onEnd = () => {
    if (!dragging || !dragWrap) return;
    dragging = false;
    dragWrap.classList.remove('grabbing');
    const wrapTop = dragWrap.offsetTop;
    if (trashZone) { trashZone.classList.remove('visible'); trashZone.classList.remove('hover'); }

    if (didMove && isOverTrash(wrapTop)) {
      // Remove doll from scene
      const idx = parseInt(dragWrap.dataset.slot, 10);
      collection[idx].inScene = false;
      collection[idx].dollX = null;
      collection[idx].dollY = null;
      saveCollection();
      renderAll();
    } else if (didMove) {
      const idx = parseInt(dragWrap.dataset.slot, 10);
      collection[idx].dollX = dragWrap.offsetLeft;
      collection[idx].dollY = dragWrap.offsetTop;
      saveCollection();
    } else if (!didMove && clickTarget) {
      // Click (not drag) — check for pet layer or wand layer click
      const petLayer = clickTarget.closest ? clickTarget.closest('.pet-layer') : null;
      if (petLayer) {
        const petKey = petLayer.dataset.pet;
        if (petKey) AudioManager.playAnimalSound(petKey);
      }
      const wandLayer = clickTarget.closest ? clickTarget.closest('.wand-layer') : null;
      if (wandLayer) {
        const wandKey = wandLayer.dataset.wand;
        if (wandKey) AudioManager.playWandSound(wandKey);
      }
    }
    dragWrap = null;
    clickTarget = null;
  };

  // Delegate mouse events on scene-dolls container
  const sceneDolls = document.getElementById('scene-dolls');
  sceneDolls.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    const wrap = e.target.closest('.doll-wrap');
    if (!wrap) return;
    e.preventDefault();
    onStart(wrap, e.clientX, e.clientY, e.target);
  });
  document.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  document.addEventListener('mouseup', () => onEnd());

  sceneDolls.addEventListener('touchstart', e => {
    if (e.target.closest('.item-chip')) return;
    const wrap = e.target.closest('.doll-wrap');
    if (!wrap) return;
    e.preventDefault();
    onStart(wrap, e.touches[0].clientX, e.touches[0].clientY, e.target);
  }, { passive: false });

  document.addEventListener('touchmove', e => {
    if (dragging) { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); }
  }, { passive: false });

  document.addEventListener('touchend', () => onEnd());
}

/* ---------- SLOT TABS ---------- */
function updateSlotTabs() {
  document.querySelectorAll('.slot-tab').forEach(tab => {
    const i = parseInt(tab.dataset.slotIdx, 10);
    if (!Number.isFinite(i) || !collection[i]) return;
    tab.classList.toggle('active', i === activeSlot);
    tab.classList.toggle('in-scene', !!collection[i].inScene);
    const mini = tab.querySelector('.slot-mini-svg');
    if (mini) mini.innerHTML = renderMini(collection[i]);
    const nameEl = tab.querySelector('.slot-name');
    if (nameEl) nameEl.textContent = collection[i].name;
  });
}

function switchSlot(idx) {
  activeSlot = idx;
  doll = collection[idx];
  buildPanel();
  renderAll();
  const desktopName = document.getElementById('doll-name');
  if (desktopName) desktopName.value = doll.name;
  const mobName = document.getElementById('mob-doll-name');
  if (mobName) mobName.value = doll.name;
}

/* ---------- RIGHT PANEL SYNC ---------- */
function syncRightPanel() {
  // Desktop right panel
  const desktopName = document.getElementById('doll-name');
  if (desktopName) desktopName.value = doll.name;
  const dsInput = document.getElementById('doll-scale-input');
  const dsVal   = document.getElementById('doll-scale-val');
  if (dsInput) { const v = doll.dollScale || 0; dsInput.value = v; dsVal.textContent = `${v > 0 ? '+' : ''}${v}%`; }
  const bgEl = document.getElementById('bg-color');
  if (bgEl) bgEl.value = sceneState.bgColor || '#1a2a4a';
  document.querySelectorAll('#scene-picker .scene-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.scene === (sceneState.bgScene || ''));
  });
  const toggleBtn = document.getElementById('btn-toggle-scene');
  if (toggleBtn) {
    toggleBtn.textContent = doll.inScene ? '⊖ Quitar de escena' : '⊕ Añadir a escena';
    toggleBtn.classList.toggle('in-scene', !!doll.inScene);
  }

  // Mobile config section (if present)
  const mobName = document.getElementById('mob-doll-name');
  if (mobName) mobName.value = doll.name;
  const mobBg = document.getElementById('mob-bg-color');
  if (mobBg) mobBg.value = sceneState.bgColor || '#1a2a4a';
  document.querySelectorAll('#mob-scene-picker .scene-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.scene === (sceneState.bgScene || ''));
  });
  const mobToggle = document.getElementById('mob-toggle-scene');
  if (mobToggle) {
    mobToggle.textContent = doll.inScene ? '⊖ Quitar de escena' : '⊕ Añadir a escena';
    mobToggle.classList.toggle('in-scene', !!doll.inScene);
  }
}

/* ---------- BUILD LEFT PANEL ---------- */
function buildPanel() {
  const target = isMobile()
    ? document.getElementById('bottom-sheet-content')
    : document.getElementById('left-panel');
  target.innerHTML = '';

  // Random button above Rasgos
  const rndBtn = document.createElement('button');
  rndBtn.className = 'btn-random';
  rndBtn.id = 'btn-random';
  rndBtn.textContent = '🎲 Sorpresa';
  rndBtn.addEventListener('click', randomizeDoll);
  target.appendChild(rndBtn);

  const SKIN_PRESETS = [
    { color: '#fde8d0', title: 'Clara' },
    { color: '#f5c5a3', title: 'Media-clara' },
    { color: '#e8a87c', title: 'Media' },
    { color: '#c68642', title: 'Morena' },
    { color: '#8d5524', title: 'Oscura' },
    { color: '#5c3317', title: 'Muy oscura' },
    { color: '#ffe0f0', title: 'Rosa kawaii' },
    { color: '#b8f0e0', title: 'Menta kawaii' },
    { color: '#a8d8f0', title: 'Azul kawaii' },
    { color: '#a8e6b8', title: 'Verde kawaii' },
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
          label: 'Forma', cat: 'bodyShape',
          type: 'bodyShape',
          items: [
            { value: null,  label: 'Estándar', icon: '🧸' },
            { value: 'elf', label: 'Elfo doméstico', icon: '🧝' },
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
          label: 'Mejillas', cat: 'cheeks', colorField: 'cheeksColor', colorFieldLabel: 'Color',
          scaleField: 'cheeksScale', yOffsetField: 'cheeksYOffset',
          items: Object.keys(CHEEKS).map(k => ({ value: k, label: k })),
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
          label: 'Calcetines', cat: 'sock',
          colorField: 'sockColor', colorFieldLabel: 'Color 1',
          colorField2: 'sockColor2', colorField2Label: 'Color 2',
          scaleField: 'sockScale', yOffsetField: 'sockYOffset',
          items: Object.keys(SOCKS).map(k => ({ value: k, label: k === 'plain' ? 'Lisos' : k === 'striped' ? 'Rayas' : 'Cuadros' })),
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
          label: 'Escoba', cat: 'broom',
          scaleField: 'broomScale', yOffsetField: 'broomYOffset',
          rotateField: 'broomRotate',
          items: Object.keys(BROOMS).map(k => ({ value: k, label: k.replace(/_/g, ' ') })),
        },
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
          items: Object.keys(WANDS).map(k => ({ value: k, label: WAND_LABELS[k] || k.replace(/_/g, ' ') })),
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
        {
          label: 'Tatuaje', cat: 'tattoo',
          colorField: 'tattooColor', colorFieldLabel: 'Color',
          scaleField: 'tattooScale',
          xOffsetField: 'tattooXOffset', xOffsetMin: -80, xOffsetMax: 80,
          yOffsetField: 'tattooYOffset', yOffsetMin: -80, yOffsetMax: 80,
          rotateField: 'tattooRotate', rotateMin: -180, rotateMax: 180,
          flipField: 'tattooFlip',
          items: Object.keys(TATTOOS).map(k => ({ value: k, label: k.replace(/_/g, ' ') })),
        },
        {
          label: '🐾 Mascota', cat: 'pet', type: 'pet',
          scaleField: 'petScale',
          items: Object.keys(PETS).map(k => ({ value: k, label: k })),
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

      // Special type: bodyShape picker
      if (sub.type === 'bodyShape') {
        const bsGrid = document.createElement('div');
        bsGrid.className = 'item-grid';
        sub.items.forEach(item => {
          const chip = document.createElement('div');
          const isActive = (doll.bodyShape || null) === item.value;
          chip.className = 'item-chip' + (isActive ? ' equipped' : '');
          chip.innerHTML = `<span style="font-size:1.2rem">${item.icon}</span><span>${item.label}</span>`;
          chip.addEventListener('click', () => {
            doll.bodyShape = item.value;
            bsGrid.querySelectorAll('.item-chip').forEach(c => c.classList.remove('equipped'));
            chip.classList.add('equipped');
            saveCollection();
            renderAll();
          });
          bsGrid.appendChild(chip);
        });
        body.appendChild(bsGrid);
        return; // bodyShape subsection done
      }

      // Special type: pet picker (toggle chips + position + outfit + scale)
      if (sub.type === 'pet') {
        const petTypes = [
          { key: 'rat',     emoji: '🐀', label: 'Rata' },
          { key: 'toad',    emoji: '🐸', label: 'Sapo' },
          { key: 'cat',     emoji: '🐱', label: 'Gato' },
          { key: 'owl',     emoji: '🦉', label: 'Lechuza' },
          { key: 'snake',   emoji: '🐍', label: 'Serpiente' },
          { key: 'niffler', emoji: '🦔', label: 'Niffler' },
          { key: 'phoenix', emoji: '🔥', label: 'Fénix' },
          { key: 'dragon',  emoji: '🐲', label: 'Dragón' },
          { key: 'pixie',    emoji: '✨', label: 'Pixie' },
          { key: 'botruc',      emoji: '🌿', label: 'Botruc' },
          { key: 'thestral',    emoji: '🦇', label: 'Thestral' },
          { key: 'hipogrifo',   emoji: '🦅', label: 'Hipogrifo' },
          { key: 'mandragora',  emoji: '🌱', label: 'Mandrágora' },
          { key: 'acromantula', emoji: '🕷️', label: 'Acromántula' },
          { key: 'grindylow',   emoji: '🌊', label: 'Grindylow' },
        ];
        const petGrid = document.createElement('div');
        petGrid.className = 'item-grid pet-type-grid';
        petTypes.forEach(pt => {
          const chip = document.createElement('div');
          chip.className = 'item-chip pet-type-chip' + (doll.pet === pt.key ? ' equipped' : '');
          chip.dataset.category = 'pet';
          chip.dataset.value = pt.key;
          const previewSvg = buildPreviewSvg('pet', pt.key, doll);
          chip.innerHTML = `${previewSvg}<span>${pt.emoji} ${pt.label}</span>`;
          chip.addEventListener('click', () => {
            // Toggle off if same pet
            if (doll.pet === pt.key) {
              doll.pet = null;
              doll.petOutfit = null;
              doll.petPosition = 'floor';
              doll.petScale = PET_SCALE_DEFAULT;
            } else {
              doll.pet = pt.key;
            }
            saveCollection();
            renderAll();
            // Rebuild panel to show/hide pet options
            buildPanel();
          });
          petGrid.appendChild(chip);
        });
        body.appendChild(petGrid);

        // Show position/outfit/scale only if a pet is equipped
        if (doll.pet) {
          // Position chips
          const posLabel = document.createElement('div');
          posLabel.style.cssText = 'font-size:0.65rem;color:var(--text-muted);padding:4px 4px 2px;font-weight:600;';
          posLabel.textContent = 'Posición';
          body.appendChild(posLabel);
          const posGrid = document.createElement('div');
          posGrid.className = 'item-grid pet-position-chips';
          const positions = [
            { key: 'floor', label: 'Suelo' },
            { key: 'righthand', label: 'Mano der.' },
            { key: 'lefthand', label: 'Mano izq.' },
            { key: 'leash', label: 'Correa' },
          ];
          positions.forEach(pos => {
            const chip = document.createElement('div');
            chip.className = 'item-chip pet-pos-chip' + ((doll.petPosition || 'floor') === pos.key ? ' equipped' : '');
            chip.dataset.pos = pos.key;
            chip.innerHTML = `<span>${pos.label}</span>`;
            chip.addEventListener('click', () => {
              doll.petPosition = pos.key;
              posGrid.querySelectorAll('.pet-pos-chip').forEach(c => c.classList.remove('equipped'));
              chip.classList.add('equipped');
              saveCollection();
              renderAll();
            });
            posGrid.appendChild(chip);
          });
          body.appendChild(posGrid);

          // Outfit chips
          const outfitLabel = document.createElement('div');
          outfitLabel.style.cssText = 'font-size:0.65rem;color:var(--text-muted);padding:4px 4px 2px;font-weight:600;';
          outfitLabel.textContent = 'Traje';
          body.appendChild(outfitLabel);
          const outfitGrid = document.createElement('div');
          outfitGrid.className = 'item-grid pet-outfit-chips';
          const outfits = [
            { key: null, label: '✕ Ninguno' },
            { key: 'gryffindor', label: 'Gryffindor' },
            { key: 'slytherin', label: 'Slytherin' },
            { key: 'ravenclaw', label: 'Ravenclaw' },
            { key: 'hufflepuff', label: 'Hufflepuff' },
          ];
          outfits.forEach(o => {
            const chip = document.createElement('div');
            chip.className = 'item-chip pet-outfit-chip' + (doll.petOutfit === o.key ? ' equipped' : '');
            chip.dataset.outfit = o.key === null ? 'null' : o.key;
            const colorDot = o.key && HP_HOUSES[o.key]
              ? `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${HP_HOUSES[o.key].c1};border:1px solid ${HP_HOUSES[o.key].c2};margin-right:3px;vertical-align:middle;"></span>`
              : '';
            chip.innerHTML = `${colorDot}<span>${o.label}</span>`;
            chip.addEventListener('click', () => {
              doll.petOutfit = o.key;
              outfitGrid.querySelectorAll('.pet-outfit-chip').forEach(c => c.classList.remove('equipped'));
              chip.classList.add('equipped');
              saveCollection();
              renderAll();
            });
            outfitGrid.appendChild(chip);
          });
          body.appendChild(outfitGrid);

          // Pet scale slider
          const curPetScale = normalizePetScale(doll.petScale);
          const petScaleRow = document.createElement('div');
          petScaleRow.className = 'scale-row';
          petScaleRow.innerHTML = `
            <span class="scale-icon">🔍</span>
            <label>Tamaño</label>
            <input type="range" min="${PET_SCALE_MIN}" max="${PET_SCALE_MAX}" step="1" value="${curPetScale}" id="scl-pet"/>
            <span class="scale-val" id="scl-val-pet">${curPetScale > 0 ? '+' : ''}${curPetScale}%</span>`;
          const petScaleInp = petScaleRow.querySelector('input');
          const petScaleLbl = petScaleRow.querySelector('.scale-val');
          petScaleInp.addEventListener('input', e => {
            const v = normalizePetScale(parseInt(e.target.value, 10));
            doll.petScale = v;
            petScaleLbl.textContent = `${v > 0 ? '+' : ''}${v}%`;
            saveCollection();
            renderActiveDoll();
          });
          body.appendChild(petScaleRow);
        }

        return; // pet subsection done
      }

      // Item grid (standard chips with hover preview)
      const grid = document.createElement('div');
      grid.className = 'item-grid';
      const FIELD_MAP = {
        eyes: 'eyes', brows: 'brows', nose: 'nose', mouth: 'mouth',
        hair: 'hair', top: 'top', bottom: 'bottom', shoes: 'shoes',
        hat: 'hat', cape: 'cape', glasses: 'glasses', belt: 'belt',
        scarf: 'scarf', scarf2: 'scarf2', wand: 'wand', lefthand: 'lefthand',
        broom: 'broom', tattoo: 'tattoo', pet: 'pet',
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
            renderActiveDoll();
            doll[dollField] = prev;
          });
          chip.addEventListener('mouseleave', () => {
            renderActiveDoll();
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
          renderActiveDoll();
        });
        body.appendChild(scaleRow);
      }

      // X-offset slider for this sub-category (below scale slider, above Y-offset)
      if (sub.xOffsetField) {
        const curXOff = doll[sub.xOffsetField] || 0;
        const xMin = sub.xOffsetMin !== undefined ? sub.xOffsetMin : -80;
        const xMax = sub.xOffsetMax !== undefined ? sub.xOffsetMax : 80;
        const xOffsetRow = document.createElement('div');
        xOffsetRow.className = 'scale-row';
        xOffsetRow.innerHTML = `
          <span class="scale-icon">↔</span>
          <label>Pos. X</label>
          <input type="range" min="${xMin}" max="${xMax}" step="1" value="${curXOff}" id="xoff-${sub.cat}"/>
          <span class="scale-val" id="xoff-val-${sub.cat}">${curXOff > 0 ? '+' : ''}${curXOff}</span>`;
        const inpX = xOffsetRow.querySelector('input');
        const lblX = xOffsetRow.querySelector('.scale-val');
        inpX.addEventListener('input', e => {
          const v = parseInt(e.target.value, 10);
          doll[sub.xOffsetField] = v;
          lblX.textContent = `${v > 0 ? '+' : ''}${v}`;
          saveCollection();
          renderActiveDoll();
        });
        body.appendChild(xOffsetRow);
      }

      // Y-offset slider for this sub-category (below the scale slider)
      if (sub.yOffsetField) {
        const curOff = doll[sub.yOffsetField] || 0;
        const yMin = sub.yOffsetMin !== undefined ? sub.yOffsetMin : -15;
        const yMax = sub.yOffsetMax !== undefined ? sub.yOffsetMax : 15;
        const offsetRow = document.createElement('div');
        offsetRow.className = 'scale-row';
        offsetRow.innerHTML = `
          <span class="scale-icon">↕</span>
          <label>Pos. Y</label>
          <input type="range" min="${yMin}" max="${yMax}" step="1" value="${curOff}" id="yoff-${sub.cat}"/>
          <span class="scale-val" id="yoff-val-${sub.cat}">${curOff > 0 ? '+' : ''}${curOff}</span>`;
        const inp2 = offsetRow.querySelector('input');
        const lbl2 = offsetRow.querySelector('.scale-val');
        inp2.addEventListener('input', e => {
          const v = parseInt(e.target.value, 10);
          doll[sub.yOffsetField] = v;
          lbl2.textContent = `${v > 0 ? '+' : ''}${v}`;
          saveCollection();
          renderActiveDoll();
        });
        body.appendChild(offsetRow);
      }

      // Rotation slider for this sub-category (below the yOffset slider)
      if (sub.rotateField) {
        const curRot = doll[sub.rotateField] || 0;
        const rMin = sub.rotateMin !== undefined ? sub.rotateMin : -45;
        const rMax = sub.rotateMax !== undefined ? sub.rotateMax : 45;
        const rotRow = document.createElement('div');
        rotRow.className = 'scale-row';
        rotRow.innerHTML = `
          <span class="scale-icon">↻</span>
          <label>Rotación</label>
          <input type="range" min="${rMin}" max="${rMax}" step="1" value="${curRot}" id="rot-${sub.cat}"/>
          <span class="scale-val" id="rot-val-${sub.cat}">${curRot > 0 ? '+' : ''}${curRot}°</span>`;
        const inp3 = rotRow.querySelector('input');
        const lbl3 = rotRow.querySelector('.scale-val');
        inp3.addEventListener('input', e => {
          const v = parseInt(e.target.value, 10);
          doll[sub.rotateField] = v;
          lbl3.textContent = `${v > 0 ? '+' : ''}${v}°`;
          saveCollection();
          renderActiveDoll();
        });
        body.appendChild(rotRow);
      }

      // Reset adjustments button (if scale, xOffset, yOffset or rotate exist)
      if (sub.scaleField || sub.xOffsetField || sub.yOffsetField || sub.rotateField) {
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
          if (sub.xOffsetField) {
            doll[sub.xOffsetField] = 0;
            const xoffEl = document.getElementById(`xoff-${sub.cat}`);
            const xoffValEl = document.getElementById(`xoff-val-${sub.cat}`);
            if (xoffEl) xoffEl.value = 0;
            if (xoffValEl) xoffValEl.textContent = '0';
          }
          if (sub.yOffsetField) {
            doll[sub.yOffsetField] = 0;
            const offEl = document.getElementById(`yoff-${sub.cat}`);
            const offValEl = document.getElementById(`yoff-val-${sub.cat}`);
            if (offEl) offEl.value = 0;
            if (offValEl) offValEl.textContent = '0';
          }
          if (sub.rotateField) {
            doll[sub.rotateField] = 0;
            const rotEl = document.getElementById(`rot-${sub.cat}`);
            const rotValEl = document.getElementById(`rot-val-${sub.cat}`);
            if (rotEl) rotEl.value = 0;
            if (rotValEl) rotValEl.textContent = '0°';
          }
          saveCollection();
          renderActiveDoll();
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
          renderActiveDoll();
        });
        flipRow.appendChild(flipBtn);
        body.appendChild(flipRow);
      }
    });

    acc.appendChild(hdr);
    acc.appendChild(body);
    target.appendChild(acc);
  });

  // On mobile or tablet, append "Configuracion" section with right-panel controls
  // (right panel is hidden below 1024px)
  if (isMobile() || isTablet()) {
    buildConfigSection(target);
  }
}

/* ---------- MOBILE: CONFIG SECTION (right-panel controls in bottom sheet) ---------- */
function buildConfigSection(container) {
  const acc = document.createElement('div');
  acc.className = 'accordion-section';

  const hdr = document.createElement('div');
  hdr.className = 'accordion-header';
  hdr.innerHTML = `<span>⚙️ Configuración</span><span class="chevron">▸</span>`;
  hdr.addEventListener('click', () => {
    hdr.classList.toggle('open');
    bodyEl.classList.toggle('open');
  });

  const bodyEl = document.createElement('div');
  bodyEl.className = 'accordion-body';

  // -- Name input --
  const nameLabel = document.createElement('h3');
  nameLabel.textContent = 'Nombre';
  nameLabel.style.cssText = 'font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);border-bottom:1px solid var(--border);padding-bottom:6px;margin-bottom:6px;';
  bodyEl.appendChild(nameLabel);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'name-input';
  nameInput.id = 'mob-doll-name';
  nameInput.placeholder = 'Nombre del muñeco';
  nameInput.maxLength = 24;
  nameInput.value = doll.name;
  nameInput.addEventListener('input', e => {
    doll.name = e.target.value || `Muñeco ${activeSlot + 1}`;
    // Sync desktop name input if it exists
    const desktopName = document.getElementById('doll-name');
    if (desktopName) desktopName.value = doll.name;
    saveCollection();
    updateSlotTabs();
    renderSceneDolls();
  });
  bodyEl.appendChild(nameInput);

  // -- Doll scale slider --
  const dsLabel = document.createElement('h3');
  dsLabel.textContent = 'Tamaño del muñeco';
  dsLabel.style.cssText = 'font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);border-bottom:1px solid var(--border);padding:6px 0;margin-top:10px;';
  bodyEl.appendChild(dsLabel);

  const dsRow = document.createElement('div');
  dsRow.className = 'scale-row';
  dsRow.innerHTML = `<span class="scale-icon">⤢</span><input type="range" min="-50" max="50" step="1" value="${doll.dollScale || 0}" id="mob-doll-scale-input"/><span class="scale-val" id="mob-doll-scale-val">${(doll.dollScale || 0) > 0 ? '+' : ''}${doll.dollScale || 0}%</span>`;
  const mobDsInp = dsRow.querySelector('input');
  const mobDsVal = dsRow.querySelector('.scale-val');
  mobDsInp.addEventListener('input', e => {
    const v = parseInt(e.target.value, 10);
    doll.dollScale = v;
    mobDsVal.textContent = `${v > 0 ? '+' : ''}${v}%`;
    // sync desktop
    const di = document.getElementById('doll-scale-input');
    const dv = document.getElementById('doll-scale-val');
    if (di) { di.value = v; dv.textContent = `${v > 0 ? '+' : ''}${v}%`; }
    saveCollection();
    renderActiveDoll();
  });
  bodyEl.appendChild(dsRow);

  // -- Background color --
  const bgLabel = document.createElement('h3');
  bgLabel.textContent = 'Color de fondo';
  bgLabel.style.cssText = 'font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);border-bottom:1px solid var(--border);padding:6px 0;margin-top:10px;';
  bodyEl.appendChild(bgLabel);

  const bgRow = document.createElement('div');
  bgRow.className = 'color-row';
  const bgLbl = document.createElement('label');
  bgLbl.textContent = 'Fondo';
  const bgInput = document.createElement('input');
  bgInput.type = 'color';
  bgInput.id = 'mob-bg-color';
  bgInput.value = sceneState.bgColor || '#1a2a4a';
  bgInput.addEventListener('input', e => {
    sceneState.bgColor = e.target.value;
    // Sync desktop bg input
    const desktopBg = document.getElementById('bg-color');
    if (desktopBg) desktopBg.value = e.target.value;
    saveCollection();
    applyBgColor();
  });
  bgRow.appendChild(bgLbl);
  bgRow.appendChild(bgInput);
  bodyEl.appendChild(bgRow);

  // -- Scene picker --
  const sceneLabel = document.createElement('h3');
  sceneLabel.textContent = 'Escena de fondo';
  sceneLabel.style.cssText = 'font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);border-bottom:1px solid var(--border);padding:6px 0;margin-top:10px;';
  bodyEl.appendChild(sceneLabel);

  const scenePicker = document.createElement('div');
  scenePicker.className = 'scene-picker';
  scenePicker.id = 'mob-scene-picker';
  // "Ninguna" chip
  const noneChip = document.createElement('div');
  noneChip.className = 'scene-chip' + (!sceneState.bgScene ? ' active' : '');
  noneChip.dataset.scene = '';
  noneChip.innerHTML = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="340" fill="#1a2a4a"/><text x="120" y="175" text-anchor="middle" font-size="40" fill="rgba(255,255,255,0.2)">✕</text></svg><span>Ninguna</span>`;
  noneChip.addEventListener('click', () => {
    sceneState.bgScene = null;
    AudioManager.stopBg();
    saveCollection();
    renderAll();
  });
  scenePicker.appendChild(noneChip);

  const SCENE_LABELS = {
    hogwarts: 'Hogwarts', great_hall: 'Gran Comedor',
    forbidden_forest: 'Bosque Prohibido', platform_934: 'Andén 9¾',
    quidditch: 'Quidditch', park: 'Parque', sunset_beach: 'Playa',
    brick_wall: 'Muro de Ladrillos', ministry: 'Ministerio',
    hogsmeade: 'Hogsmeade', hagrid_hut: 'Cabaña Hagrid', leaky_cauldron: 'Caldero Chorreante',
    potions_class: 'Aula de Pociones',
  };
  Object.keys(BG_SCENES).forEach(key => {
    const scene = BG_SCENES[key];
    const chip = document.createElement('div');
    chip.className = 'scene-chip' + (sceneState.bgScene === key ? ' active' : '');
    chip.dataset.scene = key;
    const miniSvg = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="340" fill="${SCENE_BG[key] || '#1a2a4a'}"/>${scene.svgSky || ''}${scene.svgGround ? `<g transform="translate(0,${340 - (scene.groundH||80)})">${scene.svgGround}</g>` : ''}</svg>`;
    chip.innerHTML = `${miniSvg}<span>${SCENE_LABELS[key] || key}</span>`;
    chip.addEventListener('click', () => {
      sceneState.bgScene = key;
      AudioManager.playBgMusic(key);
      saveCollection();
      renderAll();
    });
    scenePicker.appendChild(chip);
  });
  bodyEl.appendChild(scenePicker);

  // -- Toggle in-scene button --
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'btn-toggle-scene' + (doll.inScene ? ' in-scene' : '');
  toggleBtn.id = 'mob-toggle-scene';
  toggleBtn.textContent = doll.inScene ? '⊖ Quitar de escena' : '⊕ Añadir a escena';
  toggleBtn.style.cssText = 'width:100%;margin-top:10px;';
  toggleBtn.addEventListener('click', () => {
    doll.inScene = !doll.inScene;
    if (!doll.inScene) { doll.dollX = null; doll.dollY = null; }
    saveCollection();
    renderAll();
  });
  bodyEl.appendChild(toggleBtn);

  // -- Reset button --
  const resetBtn = document.createElement('button');
  resetBtn.className = 'btn-reset';
  resetBtn.id = 'mob-reset';
  resetBtn.textContent = '🗑 Resetear muñeco';
  resetBtn.style.cssText = 'width:100%;margin-top:8px;';
  resetBtn.addEventListener('click', () => {
    const name = doll.name;
    const wasInScene = doll.inScene;
    collection[activeSlot] = defaultDoll(activeSlot);
    collection[activeSlot].name = name;
    collection[activeSlot].inScene = wasInScene;
    doll = collection[activeSlot];
    saveCollection();
    buildPanel();
    renderAll();
  });
  bodyEl.appendChild(resetBtn);

  acc.appendChild(hdr);
  acc.appendChild(bodyEl);
  container.appendChild(acc);
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
    case 'cheeks': {
      inner = `<svg viewBox="40 118 160 40" xmlns="http://www.w3.org/2000/svg">${(CHEEKS[value]||(() => ''))(d.cheeksColor||'rgba(255,160,160,0.35)')}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
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
    case 'broom': {
      const b = BROOMS[value] || {};
      inner = (b.back || '') + (b.front || '');
      inner = `<svg viewBox="0 255 240 80" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'tattoo': {
      const fn = TATTOOS[value];
      inner = fn ? fn(d.tattooColor || '#1a1a2e') : '';
      inner = `<svg viewBox="80 100 80 80" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    case 'pet': {
      const fn = PETS[value];
      inner = fn ? fn(null) : '';
      inner = `<svg viewBox="-20 -20 40 40" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    }
    default:
      return `<div style="width:44px;height:44px;background:var(--surface2);border-radius:8px;"></div>`;
  }
  const svgFull = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  return `<div style="width:44px;height:44px;">${svgFull}</div>`;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* ---------- AUDIO MANAGER ---------- */
const AudioManager = {
  ctx: null,
  bgGain: null,
  sfxGain: null,
  currentBg: null,
  bgSources: [],

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.bgGain = this.ctx.createGain();
    this.bgGain.gain.value = 0.3;
    this.bgGain.connect(this.ctx.destination);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.5;
    this.sfxGain.connect(this.ctx.destination);
  },

  playAnimalSound(petKey) {
    this.init();
    switch (petKey) {
      case 'rat':     this.synthRat();     break;
      case 'toad':    this.synthToad();    break;
      case 'cat':     this.synthCat();     break;
      case 'owl':     this.synthOwl();     break;
      case 'snake':   this.synthSnake();   break;
      case 'niffler': this.synthNiffler(); break;
      case 'phoenix': this.synthPhoenix(); break;
      case 'dragon':  this.synthDragon();  break;
      case 'pixie':    this.synthPixie();    break;
      case 'botruc':      this.synthBotruc();      break;
      case 'thestral':    this.synthThestral();    break;
      case 'hipogrifo':   this.synthHipogrifo();   break;
      case 'mandragora':  this.synthMandragora();  break;
      case 'acromantula': this.synthAcromantula(); break;
      case 'grindylow':   this.synthGrindylow();   break;
    }
  },

  synthRat() {
    // High-frequency squeak
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(4200, ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
    // Second squeak
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(3200, ctx.currentTime + 0.22);
    osc2.frequency.exponentialRampToValueAtTime(4500, ctx.currentTime + 0.30);
    osc2.frequency.exponentialRampToValueAtTime(3400, ctx.currentTime + 0.38);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.22);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.42);
    osc2.connect(gain2);
    gain2.connect(this.sfxGain);
    osc2.start(ctx.currentTime + 0.22);
    osc2.stop(ctx.currentTime + 0.42);
  },

  synthToad() {
    // Low-frequency croak
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.setValueAtTime(0.35, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
    // Second croak
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(100, ctx.currentTime + 0.5);
    osc2.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.8);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.5);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
    osc2.connect(gain2);
    gain2.connect(this.sfxGain);
    osc2.start(ctx.currentTime + 0.5);
    osc2.stop(ctx.currentTime + 0.9);
  },

  synthCat() {
    // Meow: frequency sweep
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.35);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.55);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.setValueAtTime(0.4, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
    // Add slight vibrato with second oscillator
    const vib = ctx.createOscillator();
    const vibGain = ctx.createGain();
    vib.type = 'sine';
    vib.frequency.value = 6;
    vibGain.gain.value = 30;
    vib.connect(vibGain);
    vibGain.connect(osc.frequency);
    vib.start(ctx.currentTime);
    vib.stop(ctx.currentTime + 0.6);
  },

  synthOwl() {
    const ctx = this.ctx;
    // First hoot: "hoo" descending
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(210, ctx.currentTime + 0.45);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.35, ctx.currentTime + 0.32);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
    // Second hoot
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(260, ctx.currentTime + 0.65);
    osc2.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 1.15);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.01, ctx.currentTime + 0.65);
    gain2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.71);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 1.02);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
    osc2.connect(gain2);
    gain2.connect(this.sfxGain);
    osc2.start(ctx.currentTime + 0.65);
    osc2.stop(ctx.currentTime + 1.2);
  },

  synthSnake() {
    const ctx = this.ctx;
    // Bandpass-filtered noise → hiss
    const bufferSize = Math.floor(ctx.sampleRate * 0.8);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3200;
    filter.Q.value = 0.7;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.55, ctx.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + 0.8);
  },

  synthNiffler() {
    const ctx = this.ctx;
    // Rapid chattering chirps
    [0, 0.1, 0.2, 0.3, 0.42].forEach((t, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(900 + i * 70, ctx.currentTime + t);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + t + 0.07);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + t + 0.09);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.09);
    });
  },

  synthPhoenix() {
    const ctx = this.ctx;
    // Rising melodic cry: two harmonic oscillators sweep upward
    [0, 0.18].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + i * 200, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(1800 + i * 300, ctx.currentTime + delay + 0.5);
      osc.frequency.exponentialRampToValueAtTime(1200 + i * 150, ctx.currentTime + delay + 0.8);
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.3 - i * 0.05, ctx.currentTime + delay + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.85);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.9);
    });
    // Short bright harmonic shimmer
    const osc3 = ctx.createOscillator();
    const g3 = ctx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(3200, ctx.currentTime + 0.1);
    osc3.frequency.exponentialRampToValueAtTime(4800, ctx.currentTime + 0.35);
    g3.gain.setValueAtTime(0.12, ctx.currentTime + 0.1);
    g3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc3.connect(g3);
    g3.connect(this.sfxGain);
    osc3.start(ctx.currentTime + 0.1);
    osc3.stop(ctx.currentTime + 0.5);
  },

  synthDragon() {
    const ctx = this.ctx;
    // Low growl: sawtooth with descending frequency + distortion-like overtones
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.45);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.7);
    gain.gain.setValueAtTime(0.45, ctx.currentTime);
    gain.gain.setValueAtTime(0.45, ctx.currentTime + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.75);
    // Bandpass to shape growl character
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 220;
    filter.Q.value = 1.5;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
    // Brief rumble noise burst
    const bufLen = Math.floor(ctx.sampleRate * 0.3);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const nf = ctx.createBiquadFilter();
    nf.type = 'lowpass';
    nf.frequency.value = 200;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.25, ctx.currentTime + 0.05);
    ng.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    noise.connect(nf);
    nf.connect(ng);
    ng.connect(this.sfxGain);
    noise.start(ctx.currentTime + 0.05);
    noise.stop(ctx.currentTime + 0.35);
  },

  synthPixie() {
    const ctx = this.ctx;
    // Rapid high-pitched giggle: quick descending bursts
    [0, 0.12, 0.24, 0.38].forEach((t, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(3400 - i * 80, ctx.currentTime + t);
      osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + t + 0.09);
      gain.gain.setValueAtTime(0.22, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + t + 0.11);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.12);
    });
    // Tiny glittery chime at end
    const chime = ctx.createOscillator();
    const cg = ctx.createGain();
    chime.type = 'sine';
    chime.frequency.value = 5200;
    cg.gain.setValueAtTime(0.14, ctx.currentTime + 0.5);
    cg.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.7);
    chime.connect(cg);
    cg.connect(this.sfxGain);
    chime.start(ctx.currentTime + 0.5);
    chime.stop(ctx.currentTime + 0.75);
  },

  synthBotruc() {
    const ctx = this.ctx;
    // Dry woody taps: short noise bursts filtered to bark resonance
    [0, 0.09, 0.19, 0.31, 0.44].forEach((t, i) => {
      const bufLen = Math.floor(ctx.sampleRate * 0.04);
      const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let j = 0; j < bufLen; j++) data[j] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800 + i * 120;
      filter.Q.value = 9;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + t + 0.045);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      noise.start(ctx.currentTime + t);
      noise.stop(ctx.currentTime + t + 0.05);
    });
  },

  synthThestral() {
    const ctx = this.ctx;
    // Breathy hollow whinny: filtered noise sweep
    const bufLen = Math.floor(ctx.sampleRate * 0.85);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(550, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.3);
    filter.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.75);
    filter.Q.value = 4;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.82);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 0.88);
    // Eerie sine undertone
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, ctx.currentTime + 0.05);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.35);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.75);
    og.gain.setValueAtTime(0, ctx.currentTime + 0.05);
    og.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.15);
    og.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    osc.connect(og);
    og.connect(this.sfxGain);
    osc.start(ctx.currentTime + 0.05);
    osc.stop(ctx.currentTime + 0.85);
  },

  synthHipogrifo() {
    const ctx = this.ctx;
    // Eagle screech: sharp sawtooth descend
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.28);
    gain.gain.setValueAtTime(0.32, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.32);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1600;
    filter.Q.value = 1.2;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
    // Horse whinny: sine sweep with vibrato
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(340, ctx.currentTime + 0.32);
    osc2.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.52);
    osc2.frequency.exponentialRampToValueAtTime(270, ctx.currentTime + 0.85);
    g2.gain.setValueAtTime(0, ctx.currentTime + 0.32);
    g2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.4);
    g2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
    osc2.connect(g2);
    g2.connect(this.sfxGain);
    osc2.start(ctx.currentTime + 0.32);
    osc2.stop(ctx.currentTime + 0.95);
    // Vibrato LFO on the whinny
    const lfo = ctx.createOscillator();
    const lfog = ctx.createGain();
    lfo.frequency.value = 9;
    lfog.gain.value = 38;
    lfo.connect(lfog);
    lfog.connect(osc2.frequency);
    lfo.start(ctx.currentTime + 0.44);
    lfo.stop(ctx.currentTime + 0.9);
  },

  synthMandragora() {
    // Screaming plant: sharp ascending shriek
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(2800, ctx.currentTime + 0.12);
    osc.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 0.28);
    osc.frequency.linearRampToValueAtTime(3200, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2200;
    filter.Q.value = 2.5;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.55);
  },

  synthAcromantula() {
    // Spider: rapid dry clicking bursts
    const ctx = this.ctx;
    for (let i = 0; i < 6; i++) {
      const bufSize = ctx.sampleRate * 0.03;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let j = 0; j < bufSize; j++) data[j] = (Math.random() * 2 - 1) * (1 - j / bufSize);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const gain = ctx.createGain();
      gain.gain.value = 0.28;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 3500;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      src.start(ctx.currentTime + i * 0.07);
    }
  },

  synthGrindylow() {
    // Underwater gurgling: sine with rapid tremolo + low filter
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(340, ctx.currentTime + 0.3);
    osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.75);
    const lfo = ctx.createOscillator();
    const lfog = ctx.createGain();
    lfo.frequency.value = 22;
    lfog.gain.value = 0.22;
    lfo.connect(lfog);
    lfog.connect(gain.gain);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    filter.Q.value = 3;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
    lfo.start(ctx.currentTime);
    lfo.stop(ctx.currentTime + 0.8);
  },

  // Hedwig's Theme: B4 E5 G5 F#5 E5 B5 A5 F#5 E5 G5 F#5 D#5 F5 B4
  // Triangle oscillator, celesta-like, ~350-500ms per note, loops
  synthHPTheme() {
    const ctx = this.ctx;
    // Note frequencies
    const notes = [
      493.88, // B4
      659.25, // E5
      783.99, // G5
      739.99, // F#5
      659.25, // E5
      987.77, // B5
      880.00, // A5
      739.99, // F#5
      659.25, // E5
      783.99, // G5
      739.99, // F#5
      622.25, // D#5
      698.46, // F5
      493.88, // B4
    ];
    const durations = [
      0.4, 0.6, 0.35, 0.35, 0.6, 0.4, 0.8, 0.8,
      0.6, 0.35, 0.35, 0.6, 0.35, 1.0,
    ];
    const totalDuration = durations.reduce((a, b) => a + b, 0);

    const playLoop = () => {
      if (this.currentBg !== 'great_hall') return;
      let t = ctx.currentTime;
      const sources = [];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        // Celesta-like envelope: quick attack, sustain, soft release
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
        gain.gain.setValueAtTime(0.2, t + durations[i] * 0.6);
        gain.gain.exponentialRampToValueAtTime(0.01, t + durations[i] - 0.02);
        osc.connect(gain);
        gain.connect(this.bgGain);
        osc.start(t);
        osc.stop(t + durations[i]);
        sources.push(osc);
        t += durations[i];
      });
      this.bgSources = sources;
      // Schedule next loop
      this._bgTimer = setTimeout(() => playLoop(), totalDuration * 1000 + 200);
    };
    playLoop();
  },

  synthStadium() {
    const ctx = this.ctx;
    // Whistle: 2500Hz with vibrato, 0.5s
    const whistle = ctx.createOscillator();
    const wGain = ctx.createGain();
    whistle.type = 'sine';
    whistle.frequency.value = 2500;
    const vibrato = ctx.createOscillator();
    const vibGain = ctx.createGain();
    vibrato.type = 'sine';
    vibrato.frequency.value = 8;
    vibGain.gain.value = 80;
    vibrato.connect(vibGain);
    vibGain.connect(whistle.frequency);
    wGain.gain.setValueAtTime(0.3, ctx.currentTime);
    wGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    whistle.connect(wGain);
    wGain.connect(this.sfxGain);
    whistle.start(ctx.currentTime);
    whistle.stop(ctx.currentTime + 0.5);
    vibrato.start(ctx.currentTime);
    vibrato.stop(ctx.currentTime + 0.5);

    // Crowd burst: white noise through bandpass filter
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000;
    bandpass.Q.value = 0.5;
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0, ctx.currentTime);
    nGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.3);
    nGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.8);
    nGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    noise.connect(bandpass);
    bandpass.connect(nGain);
    nGain.connect(this.sfxGain);
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 1.5);
  },

  playBgMusic(sceneKey) {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (this.muted) return;
    if (this.currentBg === sceneKey) return; // already playing
    this.stopBg();
    this.currentBg = sceneKey;
    switch (sceneKey) {
      case 'hogwarts':
        this.synthHogwarts();
        break;
      case 'great_hall':
        this.synthHPTheme();
        break;
      case 'forbidden_forest':
        this.synthForest();
        break;
      case 'platform_934':
        this.synthTrain();
        break;
      case 'quidditch':
        this.synthStadium();
        this.currentBg = null; // one-shot, not looping
        break;
      case 'park':
        this.synthPark();
        break;
      case 'sunset_beach':
        this.synthBeach();
        break;
      case 'brick_wall':
        this.synthAlley();
        break;
      case 'ministry':
        this.synthMinistry();
        break;
      case 'hogsmeade':
        this.synthHogsmeade();
        break;
      case 'hagrid_hut':
        this.synthHagrid();
        break;
      case 'leaky_cauldron':
        this.synthLeakyCauldron();
        break;
      case 'potions_class':
        this.synthPotions();
        break;
      case 'private_drive':
        this.synthPrivateDrive();
        break;
      case 'madriguera':
        this.synthMadriguera();
        break;
    }
  },

  stopBg() {
    this.currentBg = null;
    if (this._bgTimer) { clearTimeout(this._bgTimer); this._bgTimer = null; }
    this.bgSources.forEach(s => { try { s.stop(); } catch (_) {} });
    this.bgSources = [];
    if (this.bgGain) {
      this.bgGain.gain.linearRampToValueAtTime(0.01, (this.ctx ? this.ctx.currentTime : 0) + 0.3);
      setTimeout(() => { if (this.bgGain) this.bgGain.gain.value = 0.3; }, 400);
    }
  },

  // ---- WAND SOUNDS (unique per wand) ----
  playWandSound(wandKey) {
    this.init();
    const fn = this['synthWand_' + wandKey];
    if (fn) fn.call(this);
  },

  // Elder — deep powerful hum, ancient resonance
  synthWand_elder() {
    const ctx = this.ctx, t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle'; osc.frequency.value = 110;
    osc2.type = 'sine'; osc2.frequency.value = 55; // sub-bass
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.setValueAtTime(0.3, t + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);
    osc.connect(gain); osc2.connect(gain); gain.connect(this.sfxGain);
    // Slight detune for ancient shimmer
    const detune = ctx.createOscillator();
    detune.type = 'triangle'; detune.frequency.value = 112;
    const dGain = ctx.createGain();
    dGain.gain.setValueAtTime(0.15, t);
    dGain.gain.exponentialRampToValueAtTime(0.01, t + 1.2);
    detune.connect(dGain); dGain.connect(this.sfxGain);
    [osc, osc2, detune].forEach(o => { o.start(t); o.stop(t + 1.2); });
  },

  // Holly — bright sparkle, quick shimmering burst
  synthWand_holly() {
    const ctx = this.ctx, t = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 2000 + i * 500 + Math.random() * 200;
      const start = t + i * 0.04;
      gain.gain.setValueAtTime(0, t);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.25);
      osc.connect(gain); gain.connect(this.sfxGain);
      osc.start(start); osc.stop(start + 0.3);
    }
  },

  // Elm — warm bell tone, mellow harmonic ring
  synthWand_elm() {
    const ctx = this.ctx, t = ctx.currentTime;
    const freqs = [440, 880, 1320]; // fundamental + harmonics
    const amps = [0.3, 0.15, 0.08];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = f;
      gain.gain.setValueAtTime(amps[i], t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8 - i * 0.1);
      osc.connect(gain); gain.connect(this.sfxGain);
      osc.start(t); osc.stop(t + 0.9);
    });
  },

  // Willow — ethereal whoosh, breathy wind sweep
  synthWand_willow() {
    const ctx = this.ctx, t = ctx.currentTime;
    const bufSize = ctx.sampleRate;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = 2;
    bp.frequency.setValueAtTime(300, t);
    bp.frequency.exponentialRampToValueAtTime(3000, t + 0.4);
    bp.frequency.exponentialRampToValueAtTime(500, t + 0.8);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.9);
    noise.connect(bp); bp.connect(gain); gain.connect(this.sfxGain);
    noise.start(t); noise.stop(t + 1.0);
  },

  // Vine — nature chime, pentatonic cascade
  synthWand_vine() {
    const ctx = this.ctx, t = ctx.currentTime;
    const notes = [523, 587, 659, 784, 880]; // C5 D5 E5 G5 A5 pentatonic
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = f;
      const start = t + i * 0.07;
      gain.gain.setValueAtTime(0, t);
      gain.gain.setValueAtTime(0.22, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + 0.4);
      osc.connect(gain); gain.connect(this.sfxGain);
      osc.start(start); osc.stop(start + 0.45);
    });
  },

  // Phoenix — rising flame burst, crackling fire sweep
  synthWand_phoenix() {
    const ctx = this.ctx, t = ctx.currentTime;
    // Rising sawtooth sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.5);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.setValueAtTime(0.25, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.7);
    osc.connect(gain); gain.connect(this.sfxGain);
    osc.start(t); osc.stop(t + 0.7);
    // Crackle noise overlay
    const bufSize = ctx.sampleRate * 0.6;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() > 0.9 ? 1 : 0) * (Math.random() * 2 - 1);
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.15, t);
    nGain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
    noise.connect(nGain); nGain.connect(this.sfxGain);
    noise.start(t); noise.stop(t + 0.6);
  },

  // Unicorn — shimmering glissando, dual detuned oscillators
  synthWand_unicorn() {
    const ctx = this.ctx, t = ctx.currentTime;
    [0, 3].forEach(detune => { // slight detune for chorus
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 + detune, t);
      osc.frequency.exponentialRampToValueAtTime(1600 + detune, t + 0.5);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.8);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.setValueAtTime(0.25, t + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 1.0);
      osc.connect(gain); gain.connect(this.sfxGain);
      osc.start(t); osc.stop(t + 1.0);
    });
    // Shimmer overtone
    const shimmer = ctx.createOscillator();
    const sGain = ctx.createGain();
    shimmer.type = 'sine'; shimmer.frequency.value = 2400;
    sGain.gain.setValueAtTime(0.08, t);
    sGain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
    shimmer.connect(sGain); sGain.connect(this.sfxGain);
    shimmer.start(t); shimmer.stop(t + 0.6);
  },

  // Oak — deep resonant thud, wooden knock
  synthWand_oak() {
    const ctx = this.ctx, t = ctx.currentTime;
    // Thud: low sine
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 80;
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
    osc.connect(gain); gain.connect(this.sfxGain);
    osc.start(t); osc.stop(t + 0.35);
    // Click transient
    const click = ctx.createOscillator();
    const cGain = ctx.createGain();
    click.type = 'square'; click.frequency.value = 600;
    cGain.gain.setValueAtTime(0.3, t);
    cGain.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
    click.connect(cGain); cGain.connect(this.sfxGain);
    click.start(t); click.stop(t + 0.05);
    // Body resonance
    const body = ctx.createOscillator();
    const bGain = ctx.createGain();
    body.type = 'triangle'; body.frequency.value = 160;
    bGain.gain.setValueAtTime(0.15, t);
    bGain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
    body.connect(bGain); bGain.connect(this.sfxGain);
    body.start(t); body.stop(t + 0.25);
  },

  // Crystal — glass bell ring, bright high sustain
  synthWand_crystal() {
    const ctx = this.ctx, t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const gain2 = ctx.createGain();
    osc.type = 'sine'; osc.frequency.value = 1200;
    osc2.type = 'sine'; osc2.frequency.value = 2400; // overtone
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 1.4);
    gain2.gain.setValueAtTime(0.12, t);
    gain2.gain.exponentialRampToValueAtTime(0.01, t + 1.0);
    osc.connect(gain); gain.connect(this.sfxGain);
    osc2.connect(gain2); gain2.connect(this.sfxGain);
    osc.start(t); osc.stop(t + 1.4);
    osc2.start(t); osc2.stop(t + 1.0);
    // Subtle shimmer
    const shim = ctx.createOscillator();
    const sGain = ctx.createGain();
    shim.type = 'sine'; shim.frequency.value = 3600;
    sGain.gain.setValueAtTime(0.05, t);
    sGain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
    shim.connect(sGain); sGain.connect(this.sfxGain);
    shim.start(t); shim.stop(t + 0.5);
  },
  muted: false,

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      if (this.bgGain) this.bgGain.gain.linearRampToValueAtTime(0.001, (this.ctx ? this.ctx.currentTime : 0) + 0.3);
    } else {
      if (this.bgGain) this.bgGain.gain.linearRampToValueAtTime(0.3, (this.ctx ? this.ctx.currentTime : 0) + 0.3);
      // Restart current bg if any
      const scene = this.currentBg;
      if (scene) { this.currentBg = null; this.playBgMusic(scene); }
    }
    return this.muted;
  },

  // Hogwarts — mysterious, slower version of HP theme (lower octave, reverb-like)
  synthHogwarts() {
    const ctx = this.ctx;
    const notes = [246.94,329.63,392.00,369.99,329.63,493.88,440.00,369.99,329.63,392.00,369.99,311.13,349.23,246.94];
    const durations = [0.5,0.75,0.44,0.44,0.75,0.5,1.0,1.0,0.75,0.44,0.44,0.75,0.44,1.25];
    const totalDuration = durations.reduce((a,b)=>a+b,0);
    const playLoop = () => {
      if (this.currentBg !== 'hogwarts') return;
      let t = ctx.currentTime;
      const sources = [];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.01, t + durations[i] - 0.02);
        osc.connect(gain); gain.connect(this.bgGain);
        osc.start(t); osc.stop(t + durations[i]);
        sources.push(osc);
        t += durations[i];
      });
      this.bgSources = sources;
      this._bgTimer = setTimeout(() => playLoop(), totalDuration * 1000 + 300);
    };
    playLoop();
  },

  // Forbidden Forest — wind + owl + rustling leaves loop
  synthForest() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'forbidden_forest') return;
      const dur = 5.0;
      // Wind: filtered noise
      const bufSize = ctx.sampleRate * dur;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const wind = ctx.createBufferSource();
      wind.buffer = buf;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 400;
      const wGain = ctx.createGain();
      wGain.gain.setValueAtTime(0, ctx.currentTime);
      wGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8);
      wGain.gain.setValueAtTime(0.08, ctx.currentTime + 3.0);
      wGain.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      wind.connect(lp); lp.connect(wGain); wGain.connect(this.bgGain);
      wind.start(ctx.currentTime); wind.stop(ctx.currentTime + dur);
      this.bgSources.push(wind);
      // Owl hoot: two sine bursts
      [1.0, 1.6].forEach(offset => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(280, ctx.currentTime + offset);
        osc.frequency.linearRampToValueAtTime(240, ctx.currentTime + offset + 0.3);
        g.gain.setValueAtTime(0, ctx.currentTime + offset);
        g.gain.linearRampToValueAtTime(0.14, ctx.currentTime + offset + 0.05);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.5);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(ctx.currentTime + offset); osc.stop(ctx.currentTime + offset + 0.6);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  // Platform 9¾ — steam hiss + distant train whistle loop
  synthTrain() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'platform_934') return;
      const dur = 5.0;
      // Steam hiss: highpass noise
      const bufSize = ctx.sampleRate * dur;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const steam = ctx.createBufferSource();
      steam.buffer = buf;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 3000;
      const sGain = ctx.createGain();
      sGain.gain.setValueAtTime(0, ctx.currentTime);
      sGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.5);
      sGain.gain.setValueAtTime(0.05, ctx.currentTime + 3.5);
      sGain.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      steam.connect(hp); hp.connect(sGain); sGain.connect(this.bgGain);
      steam.start(ctx.currentTime); steam.stop(ctx.currentTime + dur);
      this.bgSources.push(steam);
      // Train whistle: two-tone at 2.0s
      [[880, 0.4], [1100, 0.3]].forEach(([freq, delay]) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine'; osc.frequency.value = freq;
        const t0 = ctx.currentTime + 2.0 + delay;
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.15, t0 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.01, t0 + 0.6);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(t0); osc.stop(t0 + 0.7);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.1) * 1000);
    };
    playLoop();
  },

  // Park — bird chirps loop
  synthPark() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'park') return;
      const dur = 4.0;
      // 3 bird chirp bursts at random-ish offsets
      [[0.3, 3200, 3800], [1.2, 2800, 3400], [2.5, 3500, 4200]].forEach(([offset, f1, f2]) => {
        for (let j = 0; j < 3; j++) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          const t0 = ctx.currentTime + offset + j * 0.12;
          osc.frequency.setValueAtTime(f1, t0);
          osc.frequency.linearRampToValueAtTime(f2, t0 + 0.07);
          osc.frequency.linearRampToValueAtTime(f1 * 0.9, t0 + 0.13);
          g.gain.setValueAtTime(0, t0);
          g.gain.linearRampToValueAtTime(0.12, t0 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.01, t0 + 0.15);
          osc.connect(g); g.connect(this.bgGain);
          osc.start(t0); osc.stop(t0 + 0.18);
          this.bgSources.push(osc);
        }
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  // Sunset Beach — ocean waves loop (LFO-modulated noise)
  synthBeach() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'sunset_beach') return;
      const dur = 6.0;
      const bufSize = ctx.sampleRate * dur;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 800;
      // LFO for wave rhythm
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.25; // ~one wave every 4s
      lfoGain.gain.value = 0.08;
      lfo.connect(lfoGain);
      const wGain = ctx.createGain();
      wGain.gain.setValueAtTime(0.04, ctx.currentTime);
      lfoGain.connect(wGain.gain);
      src.connect(lp); lp.connect(wGain); wGain.connect(this.bgGain);
      lfo.start(ctx.currentTime); lfo.stop(ctx.currentTime + dur);
      src.start(ctx.currentTime); src.stop(ctx.currentTime + dur);
      this.bgSources.push(src, lfo);
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.3) * 1000);
    };
    playLoop();
  },

  // Diagon Alley / Brick Wall — eerie wind + distant chatter loop
  synthAlley() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'brick_wall') return;
      const dur = 5.5;
      // Low eerie wind
      const bufSize = ctx.sampleRate * dur;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const wind = ctx.createBufferSource();
      wind.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 200; bp.Q.value = 2;
      const wGain = ctx.createGain();
      wGain.gain.setValueAtTime(0, ctx.currentTime);
      wGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1.0);
      wGain.gain.setValueAtTime(0.07, ctx.currentTime + 4.0);
      wGain.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      wind.connect(bp); bp.connect(wGain); wGain.connect(this.bgGain);
      wind.start(ctx.currentTime); wind.stop(ctx.currentTime + dur);
      this.bgSources.push(wind);
      // Distant footsteps: low thud x2
      [1.5, 2.8].forEach(offset => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(80, ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + offset + 0.2);
        g.gain.setValueAtTime(0.15, ctx.currentTime + offset);
        g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.25);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(ctx.currentTime + offset); osc.stop(ctx.currentTime + offset + 0.3);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  synthPotions() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'potions_class') return;
      const dur = 6;
      // Cauldron bubble: filtered noise with slow LFO tremolo
      const bufSize = ctx.sampleRate * dur;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass'; lpf.frequency.value = 160; lpf.Q.value = 9;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.6);
      noiseGain.gain.setValueAtTime(0.11, ctx.currentTime + dur - 0.8);
      noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      // Slow LFO for bubbling rhythm
      const lfo = ctx.createOscillator();
      lfo.type = 'sine'; lfo.frequency.value = 0.65;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.07;
      lfo.connect(lfoGain); lfoGain.connect(noiseGain.gain);
      noise.connect(lpf); lpf.connect(noiseGain); noiseGain.connect(this.bgGain);
      noise.start(ctx.currentTime); noise.stop(ctx.currentTime + dur);
      lfo.start(ctx.currentTime); lfo.stop(ctx.currentTime + dur);
      this.bgSources.push(noise, lfo);
      // Mystical low drone
      const drone = ctx.createOscillator();
      drone.type = 'sine'; drone.frequency.value = 55;
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0, ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 1.2);
      droneGain.gain.setValueAtTime(0.04, ctx.currentTime + dur - 1);
      droneGain.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      drone.connect(droneGain); droneGain.connect(this.bgGain);
      drone.start(ctx.currentTime); drone.stop(ctx.currentTime + dur);
      this.bgSources.push(drone);
      // Occasional bubble pops within the loop window
      [1.2, 2.6, 4.1].forEach(offset => {
        if (offset >= dur) return;
        const pop = ctx.createOscillator();
        const popGain = ctx.createGain();
        const t = ctx.currentTime + offset;
        pop.type = 'sine';
        pop.frequency.setValueAtTime(180 + Math.random() * 80, t);
        pop.frequency.exponentialRampToValueAtTime(75, t + 0.09);
        popGain.gain.setValueAtTime(0.10, t);
        popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
        pop.connect(popGain); popGain.connect(this.bgGain);
        pop.start(t); pop.stop(t + 0.13);
        this.bgSources.push(pop);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.15) * 1000);
    };
    playLoop();
  },

  // Ministry of Magic — low ominous drone + golden metallic bell pings + marble footsteps
  synthMinistry() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'ministry') return;
      const dur = 6.0;
      // Dark atrium drone (two close oscillators for tension)
      [65, 69].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine'; osc.frequency.value = freq;
        g.gain.setValueAtTime(0, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.055 - i * 0.01, ctx.currentTime + 0.8);
        g.gain.setValueAtTime(0.04, ctx.currentTime + dur - 0.8);
        g.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
        this.bgSources.push(osc);
      });
      // Golden bell pings at irregular offsets
      [0.8, 2.3, 4.1].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = [830, 1040, 740][i];
        const t = ctx.currentTime + offset;
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(t); osc.stop(t + 1.1);
        this.bgSources.push(osc);
      });
      // Marble footsteps: two low thuds
      [1.6, 3.4].forEach(offset => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        const t = ctx.currentTime + offset;
        osc.frequency.setValueAtTime(90, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.18);
        g.gain.setValueAtTime(0.13, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(t); osc.stop(t + 0.25);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  // Hogsmeade — winter wind + warm distant bells (Three Broomsticks) loop
  synthHogsmeade() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'hogsmeade') return;
      const dur = 5.5;
      // Soft winter wind (bandpass noise)
      const bufSize = Math.ceil(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const wind = ctx.createBufferSource();
      wind.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 350; bp.Q.value = 1.5;
      const wg = ctx.createGain();
      wg.gain.setValueAtTime(0, ctx.currentTime);
      wg.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.6);
      wg.gain.setValueAtTime(0.05, ctx.currentTime + dur - 0.8);
      wg.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      wind.connect(bp); bp.connect(wg); wg.connect(this.bgGain);
      wind.start(ctx.currentTime); wind.stop(ctx.currentTime + dur);
      this.bgSources.push(wind);
      // Warm pub bells — a gentle 3-note phrase (C-E-G in pentatonic)
      [[1.0, 523.25], [1.8, 659.25], [2.6, 784.0], [3.8, 659.25]].forEach(([offset, freq]) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle'; osc.frequency.value = freq;
        const t = ctx.currentTime + offset;
        g.gain.setValueAtTime(0.10, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(t); osc.stop(t + 0.6);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  // Hagrid's Hut — fireplace crackle + outdoor forest ambience + occasional creak
  synthHagrid() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'hagrid_hut') return;
      const dur = 5.0;
      // Fireplace crackle: lowpass noise with slight tremolo
      const bufSize = Math.ceil(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const fire = ctx.createBufferSource();
      fire.buffer = buf;
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass'; lpf.frequency.value = 500;
      const fg = ctx.createGain();
      fg.gain.setValueAtTime(0, ctx.currentTime);
      fg.gain.linearRampToValueAtTime(0.10, ctx.currentTime + 0.5);
      fg.gain.setValueAtTime(0.08, ctx.currentTime + dur - 0.6);
      fg.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      fire.connect(lpf); lpf.connect(fg); fg.connect(this.bgGain);
      fire.start(ctx.currentTime); fire.stop(ctx.currentTime + dur);
      this.bgSources.push(fire);
      // Distant forest: very soft high-passed noise
      const buf2 = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d2 = buf2.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d2[i] = Math.random() * 2 - 1;
      const forest = ctx.createBufferSource();
      forest.buffer = buf2;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 3000;
      const fg2 = ctx.createGain();
      fg2.gain.value = 0.025;
      forest.connect(hp); hp.connect(fg2); fg2.connect(this.bgGain);
      forest.start(ctx.currentTime); forest.stop(ctx.currentTime + dur);
      this.bgSources.push(forest);
      // Hut creak: descending low tone
      const creak = ctx.createOscillator();
      const cg = ctx.createGain();
      creak.type = 'sawtooth';
      const t0 = ctx.currentTime + 2.5;
      creak.frequency.setValueAtTime(180, t0);
      creak.frequency.exponentialRampToValueAtTime(120, t0 + 0.35);
      cg.gain.setValueAtTime(0.06, t0);
      cg.gain.exponentialRampToValueAtTime(0.001, t0 + 0.4);
      creak.connect(cg); cg.connect(this.bgGain);
      creak.start(t0); creak.stop(t0 + 0.45);
      this.bgSources.push(creak);
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  // Leaky Cauldron — fireplace + low tavern murmur + wood floor creak
  synthLeakyCauldron() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'leaky_cauldron') return;
      const dur = 6.5;
      // Fireplace crackle
      const bufSize = Math.ceil(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const fire = ctx.createBufferSource();
      fire.buffer = buf;
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass'; lpf.frequency.value = 450;
      const fg = ctx.createGain();
      fg.gain.setValueAtTime(0, ctx.currentTime);
      fg.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.5);
      fg.gain.setValueAtTime(0.07, ctx.currentTime + dur - 0.8);
      fg.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      fire.connect(lpf); lpf.connect(fg); fg.connect(this.bgGain);
      fire.start(ctx.currentTime); fire.stop(ctx.currentTime + dur);
      this.bgSources.push(fire);
      // Tavern murmur: low bandpass noise
      const buf2 = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d2 = buf2.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d2[i] = Math.random() * 2 - 1;
      const murmur = ctx.createBufferSource();
      murmur.buffer = buf2;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 280; bp.Q.value = 1.2;
      const mg = ctx.createGain();
      mg.gain.value = 0.04;
      murmur.connect(bp); bp.connect(mg); mg.connect(this.bgGain);
      murmur.start(ctx.currentTime); murmur.stop(ctx.currentTime + dur);
      this.bgSources.push(murmur);
      // Wood floor creak at 1.8s and 4.2s
      [1.8, 4.2].forEach(offset => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        const t = ctx.currentTime + offset;
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.3);
        g.gain.setValueAtTime(0.05, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(t); osc.stop(t + 0.4);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  // Privet Drive — cheerful suburban birds + a short mundane 4-note melody
  synthPrivateDrive() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'private_drive') return;
      const dur = 4.5;
      // Garden birds (like park but simpler)
      [[0.4, 3000, 3600], [1.5, 2600, 3200], [3.0, 3200, 3900]].forEach(([offset, f1, f2]) => {
        for (let j = 0; j < 2; j++) {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          const t0 = ctx.currentTime + offset + j * 0.14;
          osc.frequency.setValueAtTime(f1, t0);
          osc.frequency.linearRampToValueAtTime(f2, t0 + 0.07);
          osc.frequency.linearRampToValueAtTime(f1 * 0.92, t0 + 0.13);
          g.gain.setValueAtTime(0, t0);
          g.gain.linearRampToValueAtTime(0.10, t0 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.16);
          osc.connect(g); g.connect(this.bgGain);
          osc.start(t0); osc.stop(t0 + 0.2);
          this.bgSources.push(osc);
        }
      });
      // Simple 4-note tune (C-E-G-E, xylophone-ish)
      [[0.8, 523.25], [1.1, 659.25], [1.4, 784.0], [1.7, 659.25]].forEach(([offset, freq]) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle'; osc.frequency.value = freq;
        const t = ctx.currentTime + offset;
        g.gain.setValueAtTime(0.09, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(t); osc.stop(t + 0.3);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

  // La Madriguera — warm outdoor wind + magical sparkles + cozy low hum
  synthMadriguera() {
    const ctx = this.ctx;
    const playLoop = () => {
      if (this.currentBg !== 'madriguera') return;
      const dur = 5.5;
      // Countryside wind (soft bandpass noise)
      const bufSize = Math.ceil(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
      const wind = ctx.createBufferSource();
      wind.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 400; bp.Q.value = 1.8;
      const wg = ctx.createGain();
      wg.gain.setValueAtTime(0, ctx.currentTime);
      wg.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 0.7);
      wg.gain.setValueAtTime(0.04, ctx.currentTime + dur - 0.8);
      wg.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      wind.connect(bp); bp.connect(wg); wg.connect(this.bgGain);
      wind.start(ctx.currentTime); wind.stop(ctx.currentTime + dur);
      this.bgSources.push(wind);
      // Cozy low hum (magical household)
      const hum = ctx.createOscillator();
      const hg = ctx.createGain();
      hum.type = 'sine'; hum.frequency.value = 82;
      hg.gain.setValueAtTime(0, ctx.currentTime);
      hg.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.0);
      hg.gain.setValueAtTime(0.03, ctx.currentTime + dur - 1.0);
      hg.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
      hum.connect(hg); hg.connect(this.bgGain);
      hum.start(ctx.currentTime); hum.stop(ctx.currentTime + dur);
      this.bgSources.push(hum);
      // Magical sparkles — short high-pitch tones (HP-ish scale fragment)
      [[0.7, 987.77], [1.6, 880.0], [2.8, 1046.5], [4.0, 783.99]].forEach(([offset, freq]) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle'; osc.frequency.value = freq;
        const t = ctx.currentTime + offset;
        g.gain.setValueAtTime(0.08, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(g); g.connect(this.bgGain);
        osc.start(t); osc.stop(t + 0.45);
        this.bgSources.push(osc);
      });
      this._bgTimer = setTimeout(() => playLoop(), (dur - 0.2) * 1000);
    };
    playLoop();
  },

};
// ===== EXPORT PNG (individual doll) =====
function exportPng() {
  const btn = document.getElementById('btn-save');
  btn.textContent = 'Exportando...';
  btn.disabled = true;

  // Find the active doll's SVG
  const wrap = document.querySelector(`.doll-wrap[data-slot="${activeSlot}"] .doll-layers svg`);
  if (!wrap) {
    btn.textContent = '🧍 Guardar';
    btn.disabled = false;
    return;
  }

  const SIZE = 480; // 2× the viewBox width for a crisp export
  const clone = wrap.cloneNode(true);
  clone.setAttribute('width', SIZE);
  clone.setAttribute('height', Math.round(SIZE * 340 / 240));
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  // Inline the background color so the PNG isn't transparent
  const bgColor = sceneState.bgColor || '#1a2a4a';
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
      btn.textContent = 'Descargado!';
      btn.disabled = false;
      setTimeout(() => btn.textContent = '🧍 Guardar', 2000);
    }, 'image/png');
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    btn.textContent = '🧍 Guardar';
    btn.disabled = false;
  };
  img.src = url;
}

// ===== EXPORT SCENE PNG (all dolls + background) =====
function exportScenePng() {
  const btn = document.getElementById('btn-scene-save');
  btn.textContent = 'Exportando...';
  btn.disabled = true;

  const area = document.querySelector('.canvas-area');
  if (!area) { btn.textContent = '🌅 Escena'; btn.disabled = false; return; }

  const aW = area.clientWidth;
  const aH = area.clientHeight;
  const SCALE = 2; // 2x for crisp
  const cW = aW * SCALE;
  const cH = aH * SCALE;

  const canvas = document.createElement('canvas');
  canvas.width = cW;
  canvas.height = cH;
  const ctx = canvas.getContext('2d');

  // Draw background
  const bgColor = sceneState.bgColor || '#1a2a4a';
  if (sceneState.bgScene && BG_SCENES[sceneState.bgScene]) {
    // Render the scene background: solid color + sky SVG
    const scene = BG_SCENES[sceneState.bgScene];
    const sceneBg = SCENE_BG[sceneState.bgScene] || '#1a2a4a';
    ctx.fillStyle = sceneBg;
    ctx.fillRect(0, 0, cW, cH);
    // We'll draw the sky SVG
    const skySvg = `<svg viewBox="0 0 240 340" width="${cW}" height="${cH}" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="340" fill="${sceneBg}"/>${scene.svgSky}</svg>`;
    const groundH = scene.groundH || 80;
    const groundSvg = `<svg viewBox="0 0 240 ${groundH}" width="${cW}" height="${Math.round(cH * 0.2)}" xmlns="http://www.w3.org/2000/svg">${scene.svgGround}</svg>`;

    // Render background SVGs then dolls on top
    const skyBlob = new Blob([skySvg], { type: 'image/svg+xml;charset=utf-8' });
    const skyUrl = URL.createObjectURL(skyBlob);
    const skyImg = new Image();
    skyImg.onload = () => {
      ctx.drawImage(skyImg, 0, 0, cW, cH);
      URL.revokeObjectURL(skyUrl);
      // Ground
      const groundBlob = new Blob([groundSvg], { type: 'image/svg+xml;charset=utf-8' });
      const groundUrl = URL.createObjectURL(groundBlob);
      const groundImg = new Image();
      groundImg.onload = () => {
        ctx.drawImage(groundImg, 0, cH * 0.8, cW, cH * 0.2);
        URL.revokeObjectURL(groundUrl);
        drawSceneDolls(ctx, aW, aH, SCALE, () => finishSceneExport(canvas, btn));
      };
      groundImg.onerror = () => {
        URL.revokeObjectURL(groundUrl);
        drawSceneDolls(ctx, aW, aH, SCALE, () => finishSceneExport(canvas, btn));
      };
      groundImg.src = groundUrl;
    };
    skyImg.onerror = () => {
      URL.revokeObjectURL(skyUrl);
      drawSceneDolls(ctx, aW, aH, SCALE, () => finishSceneExport(canvas, btn));
    };
    skyImg.src = skyUrl;
  } else {
    // Solid/gradient background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    drawSceneDolls(ctx, aW, aH, SCALE, () => finishSceneExport(canvas, btn));
  }
}

function drawSceneDolls(ctx, aW, aH, scale, callback) {
  const wraps = document.querySelectorAll('#scene-dolls .doll-wrap');
  let remaining = wraps.length;
  if (remaining === 0) { callback(); return; }

  wraps.forEach(wrap => {
    const svgEl = wrap.querySelector('.doll-layers svg');
    if (!svgEl) { remaining--; if (!remaining) callback(); return; }
    const x = wrap.offsetLeft * scale;
    const y = wrap.offsetTop * scale;
    const w = 240 * scale;
    const h = 340 * scale;

    const clone = svgEl.cloneNode(true);
    clone.setAttribute('width', w);
    clone.setAttribute('height', h);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const svgStr = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x, y, w, h);
      URL.revokeObjectURL(url);
      remaining--;
      if (!remaining) callback();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      remaining--;
      if (!remaining) callback();
    };
    img.src = url;
  });
}

function finishSceneExport(canvas, btn) {
  canvas.toBlob(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'escena_kawaii.png';
    a.click();
    URL.revokeObjectURL(a.href);
    btn.textContent = 'Descargado!';
    btn.disabled = false;
    setTimeout(() => btn.textContent = '🌅 Escena', 2000);
  }, 'image/png');
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

/* ---------- BOTTOM SHEET (Task 8) ---------- */
function initBottomSheet() {
  const sheet = document.getElementById('bottom-sheet');
  const overlay = document.getElementById('bottom-sheet-overlay');
  const handle = sheet.querySelector('.bottom-sheet-handle');
  if (!sheet || !handle) return;

  let startY = 0, startTranslate = 0, dragging = false;
  const maxH = () => sheet.offsetHeight;

  function getTranslateY() {
    const st = getComputedStyle(sheet);
    const m = new DOMMatrix(st.transform);
    return m.m42;
  }

  function snapTo(state) {
    sheet.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
    sheet.style.transform = ''; // clear inline style so CSS classes take over
    sheet.classList.remove('peek', 'open');
    if (state === 'open') {
      sheet.classList.add('open');
      overlay.classList.add('visible');
    } else if (state === 'peek') {
      sheet.classList.add('peek');
      overlay.classList.remove('visible');
    } else {
      // closed: translateY(100%) from default CSS
      overlay.classList.remove('visible');
    }
  }

  // Toggle from hamburger button
  window._toggleBottomSheet = function() {
    if (sheet.classList.contains('open')) {
      snapTo('closed');
    } else {
      snapTo('open');
    }
  };

  // Close on overlay tap
  overlay.addEventListener('click', () => snapTo('closed'));

  // Touch drag on handle
  handle.addEventListener('touchstart', e => {
    dragging = true;
    startY = e.touches[0].clientY;
    startTranslate = getTranslateY();
    sheet.style.transition = 'none';
  }, { passive: true });

  handle.addEventListener('touchmove', e => {
    if (!dragging) return;
    e.preventDefault(); // prevent scroll interference
    const dy = e.touches[0].clientY - startY;
    const newY = Math.max(0, startTranslate + dy);
    sheet.style.transform = `translateY(${newY}px)`;
  }, { passive: false });

  handle.addEventListener('touchend', e => {
    if (!dragging) return;
    dragging = false;
    const currentY = getTranslateY();
    const h = maxH();
    const ratio = currentY / h;
    // Snap logic: < 30% from top → open, > 70% → closed, else peek
    if (ratio < 0.3) {
      snapTo('open');
    } else if (ratio > 0.7) {
      snapTo('closed');
    } else {
      snapTo('peek');
    }
  });

  // Also handle touchcancel on handle
  handle.addEventListener('touchcancel', () => {
    if (dragging) {
      dragging = false;
      snapTo('closed');
    }
  });
}

/* ---------- MOBILE SLOT BAR (Task 9) ---------- */
function buildMobileSlotBar() {
  const bar = document.getElementById('mobile-slot-bar');
  if (!bar) return;
  bar.innerHTML = '';
  collection.forEach((_, i) => {
    const tab = document.createElement('div');
    tab.className = 'slot-tab';
    tab.dataset.slotIdx = i;
    tab.draggable = true;
    tab.innerHTML = `<div class="slot-mini-svg"></div><span class="slot-name"></span>`;
    tab.addEventListener('click', () => switchSlot(i));
    // HTML5 drag (mouse/trackpad on tablet/desktop)
    tab.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', `slot:${i}`);
      e.dataTransfer.effectAllowed = collection[i].inScene ? 'none' : 'copy';
      tab.classList.add('dragging');
    });
    tab.addEventListener('dragend', () => tab.classList.remove('dragging'));
    bar.appendChild(tab);
  });
  updateSlotTabs();
}

/* ---------- MOBILE ACTION MENU (Task 10) ---------- */
function initActionMenu() {
  const btn = document.getElementById('btn-action-menu');
  const popup = document.getElementById('action-menu-popup');
  if (!btn || !popup) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    popup.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!popup.contains(e.target) && e.target !== btn) {
      popup.classList.remove('open');
    }
  });

  // Wire up mobile action buttons
  document.getElementById('mob-save').addEventListener('click', () => {
    popup.classList.remove('open');
    exportPng();
  });
  document.getElementById('mob-scene-save').addEventListener('click', () => {
    popup.classList.remove('open');
    exportScenePng();
  });
  document.getElementById('mob-share').addEventListener('click', () => {
    popup.classList.remove('open');
    shareDoll();
  });
  document.getElementById('mob-mute').addEventListener('click', () => {
    popup.classList.remove('open');
    const muted = AudioManager.toggleMute();
    document.getElementById('mob-mute').textContent = muted ? '🔇 Música: OFF' : '🎵 Música: ON';
    const btnMute = document.getElementById('btn-mute');
    if (btnMute) btnMute.classList.toggle('muted', muted);
  });
}

/* ---------- RESIZE HANDLER (Task 11) ---------- */
function initResponsiveHandler() {
  let prevMobile = isMobile();
  let prevTablet = isTablet();

  function onLayoutChange() {
    const nowMobile = isMobile();
    const nowTablet = isTablet();
    if (nowMobile !== prevMobile || nowTablet !== prevTablet) {
      prevMobile = nowMobile;
      prevTablet = nowTablet;
      buildPanel();
      if (nowMobile || nowTablet) {
        buildMobileSlotBar();
      }
      renderAll();
    }
  }

  mqMobile.addEventListener('change', onLayoutChange);
  mqTablet.addEventListener('change', onLayoutChange);
}

/* ---------- TOUCHCANCEL SAFETY (Task 11) ---------- */
function initTouchCancel() {
  document.addEventListener('touchcancel', () => {
    // Clean up any drag states
    document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    const dropHint = document.getElementById('scene-drop-hint');
    if (dropHint) dropHint.classList.remove('visible');
    const trash = document.getElementById('scene-trash-zone');
    if (trash) { trash.classList.remove('visible'); trash.classList.remove('hover'); }
  });
}

/* ---------- MOBILE SLOT TOUCH DRAG ---------- */
function initMobileSlotDrag() {
  const bar = document.getElementById('mobile-slot-bar');
  const canvasArea = document.querySelector('.canvas-area');
  const dropHint = document.getElementById('scene-drop-hint');
  if (!bar || !canvasArea) return;

  let ghost = null;
  let dragSlotIdx = null;
  let activeTouchId = null;

  function createGhost(slotIdx, x, y) {
    ghost = document.createElement('div');
    ghost.className = 'slot-drag-ghost';
    ghost.innerHTML = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"
      style="width:68px;height:96px;">${renderMini(collection[slotIdx]).match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1] || ''}</svg>`;
    document.body.appendChild(ghost);
    moveGhost(x, y);
  }

  function moveGhost(x, y) {
    if (!ghost) return;
    ghost.style.left = x + 'px';
    ghost.style.top = y + 'px';
  }

  function removeGhost() {
    if (ghost) { ghost.remove(); ghost = null; }
    if (dropHint) dropHint.classList.remove('visible');
    dragSlotIdx = null;
    activeTouchId = null;
  }

  function isOverCanvas(x, y) {
    const rect = canvasArea.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  // Event delegation on bar — survives innerHTML rebuilds
  bar.addEventListener('touchstart', e => {
    // Find the tab that was touched
    const tab = e.target.closest('.slot-tab');
    if (!tab) return;
    const idx = parseInt(tab.dataset.slotIdx, 10);
    if (!Number.isFinite(idx)) return;

    // Only start drag if touch moves enough (distinguish tap from drag)
    const touch = e.changedTouches[0];
    dragSlotIdx = idx;
    activeTouchId = touch.identifier;
    createGhost(idx, touch.clientX, touch.clientY);
    e.preventDefault(); // prevent scroll while dragging slot
  }, { passive: false });

  document.addEventListener('touchmove', e => {
    if (dragSlotIdx === null) return;
    // Find our tracked touch
    let touch = null;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouchId) {
        touch = e.changedTouches[i]; break;
      }
    }
    if (!touch) return;
    e.preventDefault();

    moveGhost(touch.clientX, touch.clientY);

    const overCanvas = isOverCanvas(touch.clientX, touch.clientY);
    const alreadyInScene = collection[dragSlotIdx]?.inScene;

    if (overCanvas && !alreadyInScene) {
      if (dropHint) dropHint.classList.add('visible');
      ghost.classList.remove('no-drop');
    } else {
      if (dropHint) dropHint.classList.remove('visible');
      if (overCanvas && alreadyInScene) ghost.classList.add('no-drop');
      else ghost.classList.remove('no-drop');
    }
  }, { passive: false });

  document.addEventListener('touchend', e => {
    if (dragSlotIdx === null) return;
    let touch = null;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouchId) {
        touch = e.changedTouches[i]; break;
      }
    }
    const idx = dragSlotIdx;
    removeGhost();
    if (!touch) return;

    if (isOverCanvas(touch.clientX, touch.clientY) && !collection[idx].inScene) {
      const rect = canvasArea.getBoundingClientRect();
      collection[idx].dollX = touch.clientX - rect.left - 120;
      collection[idx].dollY = touch.clientY - rect.top - 170;
      collection[idx].inScene = true;
      switchSlot(idx);
      saveCollection();
      renderAll();
    }
  });

  document.addEventListener('touchcancel', () => { removeGhost(); });
}

document.addEventListener('DOMContentLoaded', () => {
  // Build slot tabs (draggable to canvas)
  let draggingSlotIdx = null;
  const slotsEl = document.getElementById('slots');
  collection.forEach((_, i) => {
    const tab = document.createElement('div');
    tab.className = 'slot-tab' + (i === 0 ? ' active' : '') + (collection[i].inScene ? ' in-scene' : '');
    tab.draggable = true;
    tab.dataset.slotIdx = i;
    tab.innerHTML = `<div class="slot-mini-svg"></div><span class="slot-name"></span>`;
    tab.addEventListener('click', () => switchSlot(i));
    tab.addEventListener('dragstart', e => {
      draggingSlotIdx = i;
      e.dataTransfer.setData('text/plain', `slot:${i}`);
      e.dataTransfer.effectAllowed = collection[i].inScene ? 'none' : 'copy';
      tab.classList.add('dragging');
    });
    tab.addEventListener('dragend', () => { tab.classList.remove('dragging'); draggingSlotIdx = null; });
    slotsEl.appendChild(tab);
  });

  // Canvas drop zone for slot tabs (add doll to scene)
  const canvasArea = document.querySelector('.canvas-area');
  const dropHint = document.getElementById('scene-drop-hint');
  canvasArea.addEventListener('dragover', e => {
    const dt = e.dataTransfer;
    if (!dt.types.includes('text/plain')) return;
    // If dragging a slot tab that is already in scene → prohibited
    if (draggingSlotIdx !== null && collection[draggingSlotIdx].inScene) {
      dt.dropEffect = 'none';
      return; // don't preventDefault → browser shows prohibited cursor
    }
    e.preventDefault();
    dt.dropEffect = 'copy';
    if (dropHint) dropHint.classList.add('visible');
  });
  canvasArea.addEventListener('dragleave', e => {
    if (!e.relatedTarget || !canvasArea.contains(e.relatedTarget)) {
      if (dropHint) dropHint.classList.remove('visible');
    }
  });
  canvasArea.addEventListener('drop', e => {
    if (dropHint) dropHint.classList.remove('visible');
    const data = e.dataTransfer.getData('text/plain');
    if (data && data.startsWith('slot:')) {
      e.preventDefault();
      const idx = parseInt(data.split(':')[1], 10);
      if (!collection[idx].inScene) {
        // Place doll at drop position
        const rect = canvasArea.getBoundingClientRect();
        collection[idx].dollX = e.clientX - rect.left - 120;
        collection[idx].dollY = e.clientY - rect.top - 170;
        collection[idx].inScene = true;
        switchSlot(idx);
        saveCollection();
        renderAll();
      }
    }
  });

  // Doll scale slider (desktop right panel)
  document.getElementById('doll-scale-input').addEventListener('input', e => {
    const v = parseInt(e.target.value, 10);
    doll.dollScale = v;
    document.getElementById('doll-scale-val').textContent = `${v > 0 ? '+' : ''}${v}%`;
    // sync mobile slider if present
    const mi = document.getElementById('mob-doll-scale-input');
    const mv = document.getElementById('mob-doll-scale-val');
    if (mi) { mi.value = v; mv.textContent = `${v > 0 ? '+' : ''}${v}%`; }
    saveCollection();
    renderActiveDoll();
  });

  // Name input
  document.getElementById('doll-name').addEventListener('input', e => {
    doll.name = e.target.value || `Muñeco ${activeSlot + 1}`;
    saveCollection();
    updateSlotTabs();
    renderSceneDolls(); // update name tag
  });

  // Save/export PNG button (individual)
  document.getElementById('btn-save').addEventListener('click', exportPng);

  // Save scene PNG button
  document.getElementById('btn-scene-save').addEventListener('click', exportScenePng);

  // Share button
  document.getElementById('btn-share').addEventListener('click', shareDoll);

  // Mute button (desktop)
  document.getElementById('btn-mute').addEventListener('click', () => {
    const muted = AudioManager.toggleMute();
    document.getElementById('btn-mute').textContent = muted ? '🔇' : '🎵';
    document.getElementById('btn-mute').classList.toggle('muted', muted);
    const mobMute = document.getElementById('mob-mute');
    if (mobMute) mobMute.textContent = muted ? '🔇 Música: OFF' : '🎵 Música: ON';
  });

  // mob-random (mobile action menu)
  document.getElementById('mob-random').addEventListener('click', () => {
    randomizeDoll();
    document.getElementById('action-menu-popup').classList.remove('open');
  });

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', () => {
    const name = doll.name;
    const wasInScene = doll.inScene;
    collection[activeSlot] = defaultDoll(activeSlot);
    collection[activeSlot].name = name;
    collection[activeSlot].inScene = wasInScene;
    doll = collection[activeSlot];
    saveCollection();
    buildPanel();
    renderAll();
  });

  // Toggle in-scene button
  document.getElementById('btn-toggle-scene').addEventListener('click', () => {
    doll.inScene = !doll.inScene;
    if (!doll.inScene) {
      doll.dollX = null;
      doll.dollY = null;
    }
    saveCollection();
    renderAll();
  });

  // Background color (global)
  document.getElementById('bg-color').addEventListener('input', e => {
    sceneState.bgColor = e.target.value;
    saveCollection();
    applyBgColor();
  });

  // Scene picker (right panel)
  (function buildScenePicker() {
    const picker = document.getElementById('scene-picker');
    if (!picker) return;
    // "Ninguna" chip
    const noneChip = document.createElement('div');
    noneChip.className = 'scene-chip' + (!sceneState.bgScene ? ' active' : '');
    noneChip.dataset.scene = '';
    noneChip.innerHTML = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="340" fill="#1a2a4a"/><text x="120" y="175" text-anchor="middle" font-size="40" fill="rgba(255,255,255,0.2)">✕</text></svg><span>Ninguna</span>`;
    noneChip.addEventListener('click', () => {
      sceneState.bgScene = null;
      AudioManager.stopBg();
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
      park:             'Parque',
      sunset_beach:     'Playa',
      brick_wall:       'Muro de Ladrillos',
      ministry:         'Ministerio',
      hogsmeade:        'Hogsmeade',
      hagrid_hut:       'Cabaña Hagrid',
      leaky_cauldron:   'Caldero Chorreante',
      potions_class:    'Aula de Pociones',
    };
    Object.keys(BG_SCENES).forEach(key => {
      const scene = BG_SCENES[key];
      const chip = document.createElement('div');
      chip.className = 'scene-chip' + (sceneState.bgScene === key ? ' active' : '');
      chip.dataset.scene = key;
      const miniSvg = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="340" fill="${SCENE_BG[key] || '#1a2a4a'}"/>${scene.svgSky || ''}${scene.svgGround ? `<g transform="translate(0,${340 - (scene.groundH||80)})">${scene.svgGround}</g>` : ''}</svg>`;
      chip.innerHTML = `${miniSvg}<span>${SCENE_LABELS[key] || key}</span>`;
      chip.addEventListener('click', () => {
        sceneState.bgScene = key;
        AudioManager.playBgMusic(key);
        saveCollection();
        renderAll();
      });
      picker.appendChild(chip);
    });
  })();

  // Drag & drop
  initDragDrop();
  initDollDrag();

  // Load from URL hash if present
  loadFromHash();

  // Mobile: bottom sheet, slot bar, action menu, resize handler, touchcancel, touch drag
  initBottomSheet();
  initActionMenu();
  initResponsiveHandler();
  initTouchCancel();
  initMobileSlotDrag();
  if (isMobile() || isTablet()) {
    buildMobileSlotBar();
  }

  // Hamburger button toggles bottom sheet
  document.getElementById('btn-hamburger').addEventListener('click', () => {
    if (window._toggleBottomSheet) window._toggleBottomSheet();
  });

  // Build left panel (or bottom sheet content on mobile)
  buildPanel();

  // Initial render
  renderAll();

  // Re-render background on resize (orientation changes on tablet/desktop)
  window.addEventListener('resize', () => renderBgScene());
});
