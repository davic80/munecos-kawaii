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
  <ellipse cx="120" cy="112" rx="82" ry="90" fill="${skin}"/>

  <!-- CHEEKS -->
  <ellipse cx="68" cy="138" rx="16" ry="10" fill="rgba(255,160,160,0.35)"/>
  <ellipse cx="172" cy="138" rx="16" ry="10" fill="rgba(255,160,160,0.35)"/>
  `;
}

// ---- EYES ----
const EYES = {
  round: (c) => `
    <circle cx="90" cy="118" r="14" fill="white"/>
    <circle cx="90" cy="120" r="9" fill="${c}"/>
    <circle cx="90" cy="120" r="5" fill="#111"/>
    <circle cx="93" cy="116" r="2.5" fill="white"/>
    <circle cx="150" cy="118" r="14" fill="white"/>
    <circle cx="150" cy="120" r="9" fill="${c}"/>
    <circle cx="150" cy="120" r="5" fill="#111"/>
    <circle cx="153" cy="116" r="2.5" fill="white"/>`,
  star: (_c) => `
    <text x="76" y="132" font-size="24" text-anchor="middle" fill="#ffdd00">★</text>
    <text x="144" y="132" font-size="24" text-anchor="middle" fill="#ffdd00">★</text>`,
  half: (_c) => `
    <path d="M76,118 Q90,132 104,118" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <path d="M136,118 Q150,132 164,118" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>`,
  wink: (c) => `
    <circle cx="90" cy="118" r="14" fill="white"/>
    <circle cx="90" cy="120" r="9" fill="${c}"/>
    <circle cx="90" cy="120" r="5" fill="#111"/>
    <circle cx="93" cy="116" r="2.5" fill="white"/>
    <path d="M136,120 Q150,132 164,120" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>`,
  heart: (_c) => `
    <text x="76" y="134" font-size="26" text-anchor="middle" fill="#ff4d6d">♥</text>
    <text x="144" y="134" font-size="26" text-anchor="middle" fill="#ff4d6d">♥</text>`,
};

// ---- EYEBROWS ----
const BROWS = {
  straight: `
    <rect x="74" y="96" width="28" height="5" rx="2.5" fill="#5a3a1a"/>
    <rect x="138" y="96" width="28" height="5" rx="2.5" fill="#5a3a1a"/>`,
  arched: `
    <path d="M74,100 Q88,90 102,100" fill="none" stroke="#5a3a1a" stroke-width="4" stroke-linecap="round"/>
    <path d="M138,100 Q152,90 166,100" fill="none" stroke="#5a3a1a" stroke-width="4" stroke-linecap="round"/>`,
  angry: `
    <path d="M74,98 Q88,104 102,98" fill="none" stroke="#5a3a1a" stroke-width="4" stroke-linecap="round"/>
    <path d="M138,98 Q152,104 166,98" fill="none" stroke="#5a3a1a" stroke-width="4" stroke-linecap="round"/>`,
  kawaii: `
    <path d="M74,98 Q88,92 102,98" fill="none" stroke="#d4804a" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M138,98 Q152,92 166,98" fill="none" stroke="#d4804a" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="76" cy="98" r="3" fill="#d4804a"/>
    <circle cx="138" cy="98" r="3" fill="#d4804a"/>`,
};

// ---- NOSE ----
const NOSES = {
  dot: `<circle cx="120" cy="140" r="4" fill="rgba(0,0,0,0.18)"/>`,
  button: `
    <ellipse cx="120" cy="142" rx="8" ry="6" fill="rgba(0,0,0,0.12)"/>
    <ellipse cx="116" cy="142" rx="3" ry="2" fill="rgba(0,0,0,0.12)"/>
    <ellipse cx="124" cy="142" rx="3" ry="2" fill="rgba(0,0,0,0.12)"/>`,
  heart: `<text x="120" y="148" font-size="14" text-anchor="middle" fill="rgba(0,0,0,0.22)">♥</text>`,
};

// ---- MOUTH ----
const MOUTHS = {
  smile: `<path d="M100,162 Q120,178 140,162" fill="none" stroke="#c0645a" stroke-width="3.5" stroke-linecap="round"/>`,
  line: `<line x1="104" y1="164" x2="136" y2="164" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>`,
  surprise: `<ellipse cx="120" cy="164" rx="12" ry="9" fill="#c0645a"/>`,
  uwu: `
    <path d="M102,162 Q112,174 120,162" fill="none" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>
    <path d="M120,162 Q128,174 138,162" fill="none" stroke="#c0645a" stroke-width="3" stroke-linecap="round"/>`,
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
};

// ---- BOTTOMS ----
const BOTTOMS = {
  pants: (c, gender) => gender === 'girl'
    ? `<path d="M82,282 L82,330 Q100,336 110,330 L118,300 L122,300 L130,330 Q140,336 158,330 L158,282 Z" fill="${c}"/>`
    : `<path d="M78,280 L78,332 Q98,338 112,332 L119,302 L121,302 L128,332 Q142,338 162,332 L162,280 Z" fill="${c}"/>`,
  skirt: (c, _g) => `<path d="M78,282 Q78,320 120,326 Q162,320 162,282 Z" fill="${c}"/>`,
  shorts: (c, gender) => gender === 'girl'
    ? `<path d="M84,282 L84,310 Q100,316 112,310 L118,296 L122,296 L128,310 Q140,316 156,310 L156,282 Z" fill="${c}"/>`
    : `<path d="M80,280 L80,312 Q98,318 112,312 L119,298 L121,298 L128,312 Q142,318 160,312 L160,280 Z" fill="${c}"/>`,
};

// ---- SHOES ----
const SHOES = {
  sneaker: (c) => `
    <ellipse cx="97" cy="334" rx="22" ry="10" fill="${c}"/>
    <ellipse cx="143" cy="334" rx="22" ry="10" fill="${c}"/>
    <rect x="80" y="326" width="32" height="10" rx="4" fill="${darken(c,20)}"/>
    <rect x="128" y="326" width="32" height="10" rx="4" fill="${darken(c,20)}"/>`,
  boot: (c) => `
    <rect x="80" y="316" width="32" height="22" rx="6" fill="${c}"/>
    <rect x="128" y="316" width="32" height="22" rx="6" fill="${c}"/>
    <ellipse cx="96" cy="336" rx="20" ry="6" fill="${darken(c,15)}"/>
    <ellipse cx="144" cy="336" rx="20" ry="6" fill="${darken(c,15)}"/>`,
  sandal: (c) => `
    <ellipse cx="97" cy="335" rx="22" ry="6" fill="${c}"/>
    <ellipse cx="143" cy="335" rx="22" ry="6" fill="${c}"/>
    <line x1="82" y1="328" x2="112" y2="328" stroke="${darken(c,25)}" stroke-width="3"/>
    <line x1="130" y1="328" x2="160" y2="328" stroke="${darken(c,25)}" stroke-width="3"/>`,
};

// ---- HATS ----
const HATS = {
  beanie: (c) => `
    <path d="M40,106 Q40,50 120,46 Q200,50 200,106 Z" fill="${c}"/>
    <rect x="36" y="102" width="168" height="18" rx="9" fill="${darken(c,15)}"/>`,
  wizard: (c) => `
    <path d="M120,6 L80,110 L160,110 Z" fill="${c}"/>
    <ellipse cx="120" cy="110" rx="50" ry="12" fill="${darken(c,10)}"/>
    <path d="M96,68 Q120,56 144,68" fill="none" stroke="#f5c518" stroke-width="2.5"/>`,
  beret: (c) => `
    <ellipse cx="120" cy="64" rx="68" ry="28" fill="${c}"/>
    <circle cx="148" cy="48" r="7" fill="${darken(c,18)}"/>
    <rect x="60" y="82" width="120" height="12" rx="6" fill="${darken(c,10)}"/>`,
  cap: (c) => `
    <path d="M50,106 Q50,62 120,58 Q190,62 190,106 Z" fill="${c}"/>
    <rect x="46" y="100" width="148" height="14" rx="7" fill="${darken(c,12)}"/>
    <rect x="30" y="106" width="100" height="12" rx="6" fill="${darken(c,8)}"/>`,
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
};

// ---- BELTS ----
const BELTS = {
  thin: (c) => `
    <rect x="74" y="274" width="92" height="8" rx="4" fill="${c}"/>
    <rect x="116" y="272" width="8" height="12" rx="2" fill="${darken(c,20)}"/>`,
  wide: (c) => `
    <rect x="74" y="270" width="92" height="14" rx="5" fill="${c}"/>
    <rect x="114" y="268" width="12" height="18" rx="3" fill="${darken(c,20)}"/>`,
};

// ---- HP SCARVES ----
const HP_HOUSES = {
  gryffindor: { c1: '#740001', c2: '#d3a625', name: 'Gryffindor' },
  slytherin:  { c1: '#1a472a', c2: '#aaaaaa', name: 'Slytherin' },
  ravenclaw:  { c1: '#0e1a40', c2: '#946b2d', name: 'Ravenclaw' },
  hufflepuff: { c1: '#ecb939', c2: '#372e29', name: 'Hufflepuff' },
};

function svgScarf(house) {
  const { c1, c2 } = HP_HOUSES[house];
  return `
    <!-- scarf base around neck -->
    <rect x="90" y="170" width="60" height="16" rx="8" fill="${c1}"/>
    <!-- stripes -->
    <rect x="96" y="170" width="8" height="16" rx="0" fill="${c2}"/>
    <rect x="112" y="170" width="8" height="16" fill="${c2}"/>
    <rect x="128" y="170" width="8" height="16" fill="${c2}"/>
    <!-- hanging end left -->
    <rect x="92" y="182" width="18" height="40" rx="6" fill="${c1}"/>
    <rect x="94" y="182" width="6" height="40" rx="3" fill="${c2}"/>
    <rect x="102" y="182" width="6" height="40" rx="3" fill="${c1}"/>
    <!-- fringe -->
    <line x1="93" y1="220" x2="91" y2="228" stroke="${c2}" stroke-width="2"/>
    <line x1="97" y1="220" x2="95" y2="228" stroke="${c2}" stroke-width="2"/>
    <line x1="101" y1="220" x2="99" y2="228" stroke="${c2}" stroke-width="2"/>
    <line x1="105" y1="220" x2="103" y2="228" stroke="${c2}" stroke-width="2"/>`;
}

// ---- HP WANDS ----
const WANDS = {
  elder: `
    <g transform="translate(164,200) rotate(-30)">
      <rect x="-4" y="0" width="8" height="88" rx="4" fill="#3d2b1f"/>
      <ellipse cx="0" cy="0" rx="8" ry="8" fill="#2a1a0e"/>
      <circle cx="0" cy="18" r="4" fill="#6b4423"/>
      <circle cx="0" cy="36" r="3" fill="#6b4423"/>
    </g>`,
  holly: `
    <g transform="translate(164,204) rotate(-25)">
      <rect x="-3" y="0" width="6" height="80" rx="3" fill="#8b4513"/>
      <ellipse cx="0" cy="0" rx="6" ry="7" fill="#5a2d0c"/>
    </g>`,
  elm: `
    <g transform="translate(162,202) rotate(-28)">
      <rect x="-4" y="0" width="8" height="84" rx="4" fill="#c8a96e"/>
      <ellipse cx="0" cy="0" rx="9" ry="6" fill="#a07840"/>
    </g>`,
  willow: `
    <g transform="translate(163,200) rotate(-22)">
      <path d="M0,0 Q6,20 3,40 Q0,60 2,80" fill="none" stroke="#8b7355" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="0" cy="0" rx="7" ry="5" fill="#6b5a3e"/>
    </g>`,
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
    scarf: null,
    wand: null,
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
  const parts = [];
  parts.push(svgBase(d.gender, d.skin));
  if (d.brows) parts.push(BROWS[d.brows] || '');
  if (d.eyes) parts.push((EYES[d.eyes] || EYES.round)(d.eyeColor));
  if (d.nose) parts.push(NOSES[d.nose] || '');
  if (d.mouth) parts.push(MOUTHS[d.mouth] || '');
  if (d.bottom) parts.push((BOTTOMS[d.bottom] || (() => ''))(d.bottomColor, d.gender));
  if (d.top) parts.push((TOPS[d.top] || (() => ''))(d.topColor, d.gender));
  if (d.shoes) parts.push((SHOES[d.shoes] || (() => ''))(d.shoesColor));
  if (d.cape) parts.push((CAPES[d.cape] || (() => ''))(d.capeColor));
  if (d.hat) parts.push((HATS[d.hat] || (() => ''))(d.hatColor));
  if (d.glasses) parts.push((GLASSES[d.glasses] || (() => ''))(d.glassesColor));
  if (d.belt) parts.push((BELTS[d.belt] || (() => ''))(d.beltColor));
  if (d.scarf) parts.push(svgScarf(d.scarf));
  if (d.wand) parts.push(WANDS[d.wand] || '');

  container.innerHTML = `<svg viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">${parts.join('\n')}</svg>`;
}

function renderAll() {
  renderDoll(document.getElementById('doll-layers'), doll);
  updateEquipped();
  updateSlotTabs();
  syncRightPanel();
}

/* mini SVG for slot tabs */
function renderMini(d) {
  const parts = [svgBase(d.gender, d.skin)];
  if (d.eyes) parts.push((EYES[d.eyes] || EYES.round)(d.eyeColor));
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
  top: 'top',
  bottom: 'bottom',
  shoes: 'shoes',
  hat: 'hat',
  cape: 'cape',
  glasses: 'glasses',
  belt: 'belt',
  scarf: 'scarf',
  wand: 'wand',
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
  const mandatory = ['gender', 'eyes', 'brows', 'nose', 'mouth'];
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
  document.getElementById('eye-color').value = doll.eyeColor;
  document.querySelectorAll('.skin-swatch').forEach(sw => {
    sw.classList.toggle('active', sw.dataset.color === doll.skin);
  });
  document.getElementById('skin-custom').value = doll.skin;
  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.gender === doll.gender);
  });
}

/* ---------- BUILD LEFT PANEL ---------- */
function buildPanel() {
  const panel = document.getElementById('left-panel');
  panel.innerHTML = '';

  const sections = [
    {
      label: 'Rasgos', icon: '✨', open: true,
      subsections: [
        {
          label: 'Género', cat: 'gender',
          type: 'gender',
          items: [
            { value: 'boy', label: 'Niño', icon: '♂' },
            { value: 'girl', label: 'Niña', icon: '♀' },
          ],
        },
        {
          label: 'Ojos', cat: 'eyes', colorField: 'eyeColor',
          items: Object.keys(EYES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Cejas', cat: 'brows',
          items: Object.keys(BROWS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Nariz', cat: 'nose',
          items: Object.keys(NOSES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Boca', cat: 'mouth',
          items: Object.keys(MOUTHS).map(k => ({ value: k, label: k })),
        },
      ],
    },
    {
      label: 'Ropa', icon: '👕', open: true,
      subsections: [
        {
          label: 'Camiseta / Top', cat: 'top', colorField: 'topColor',
          items: Object.keys(TOPS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Pantalón / Falda', cat: 'bottom', colorField: 'bottomColor',
          items: Object.keys(BOTTOMS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Zapatos', cat: 'shoes', colorField: 'shoesColor',
          items: Object.keys(SHOES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Cinturón', cat: 'belt', colorField: 'beltColor',
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
          label: 'Varita', cat: 'wand',
          items: Object.keys(WANDS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Sombrero', cat: 'hat', colorField: 'hatColor',
          items: Object.keys(HATS).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Capa / Abrigo', cat: 'cape', colorField: 'capeColor',
          items: Object.keys(CAPES).map(k => ({ value: k, label: k })),
        },
        {
          label: 'Gafas', cat: 'glasses', colorField: 'glassesColor',
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
          <label>Color</label>
          <input type="color" id="clr-${sub.cat}" value="${doll[sub.colorField] || '#ffffff'}"/>`;
        colorRow.querySelector('input').addEventListener('input', e => {
          doll[sub.colorField] = e.target.value;
          saveCollection();
          renderAll();
        });
        body.appendChild(colorRow);
      }

      // Item grid
      const grid = document.createElement('div');
      grid.className = 'item-grid';

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
        grid.appendChild(chip);
      });

      body.appendChild(grid);
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
      inner = `<ellipse cx="22" cy="22" rx="20" ry="20" fill="#fff2e8"/>` + (EYES[value] || EYES.round)(eyeC);
      inner = `<svg viewBox="60 100 120 60" xmlns="http://www.w3.org/2000/svg">${(EYES[value]||EYES.round)(eyeC)}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    case 'brows':
      inner = `<svg viewBox="60 82 120 34" xmlns="http://www.w3.org/2000/svg">${BROWS[value]||''}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    case 'nose':
      inner = `<svg viewBox="96 128 48 32" xmlns="http://www.w3.org/2000/svg">${NOSES[value]||''}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
    case 'mouth':
      inner = `<svg viewBox="90 150 60 40" xmlns="http://www.w3.org/2000/svg">${MOUTHS[value]||''}</svg>`;
      return `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;">${inner}</div>`;
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
    case 'wand': {
      inner = WANDS[value] || '';
      inner = `<svg viewBox="120 190 90 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
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

  // Save button
  document.getElementById('btn-save').addEventListener('click', () => {
    saveCollection();
    const btn = document.getElementById('btn-save');
    btn.textContent = 'Guardado!';
    setTimeout(() => btn.textContent = 'Guardar', 1500);
  });

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

  // Gender buttons (right panel)
  document.querySelectorAll('.gender-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      doll.gender = btn.dataset.gender;
      saveCollection();
      renderAll();
    });
  });

  // Skin swatches
  document.querySelectorAll('.skin-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      doll.skin = sw.dataset.color;
      document.getElementById('skin-custom').value = doll.skin;
      saveCollection();
      renderAll();
    });
  });

  // Skin custom picker
  document.getElementById('skin-custom').addEventListener('input', e => {
    doll.skin = e.target.value;
    document.querySelectorAll('.skin-swatch').forEach(sw => sw.classList.remove('active'));
    saveCollection();
    renderAll();
  });

  // Eye color
  document.getElementById('eye-color').addEventListener('input', e => {
    doll.eyeColor = e.target.value;
    saveCollection();
    renderAll();
  });

  // Drag & drop
  initDragDrop();

  // Build left panel
  buildPanel();

  // Initial render
  renderAll();
});
