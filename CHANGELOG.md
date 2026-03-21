# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2026-03-21

### Added
- **URL sharing** — "Compartir 🔗" button in the header generates a shareable link with the current doll state compressed via LZString into the URL hash (`#d=...`); URL is copied to clipboard (falls back to a prompt on HTTP)
- **Load from URL hash** — opening a shared link auto-loads the encoded doll into the active slot before rendering, then cleans the hash from the address bar

### Fixed
- **Ravenclaw scarf** secondary color corrected from `#946b2d` (gold/brown) to `#aaaaaa` (silver), matching house colours

---

## [1.2.0] - 2026-03-21

### Added
- **Eyes** × 4 new styles → 9 total: `sparkle` (anime glints), `sleepy` (drooping lid), `pixel` (3×3 retro grid), `teary` (teardrop kawaii)
- **Eyebrows** × 3 new styles → 7 total: `thin` (fine 90s arch), `bushy` (thick natural), `raised` (skeptical asymmetric)
- **Hair** × 8 new styles → 18 total: `side_ponytail`, `braids`, `pixie`, `wavy_long`, `top_knot`, `mohawk`, `twin_tails`, `undercut`
- **Scale sliders** for every item category (-50% to +50%) — each panel section now shows a "Tamaño" range slider that scales the element via SVG transform around its natural center point
- **Background color picker** in the right panel — per-doll color saved in localStorage, renders as a radial gradient on the canvas background

### Changed
- `renderDoll()` now wraps every layer in `scaleWrap()` for per-category scaling
- `defaultDoll()` includes 13 new `*Scale` fields (all default 0) and `bgColor: '#1a2a4a'`
- `syncRightPanel()` now syncs the `#bg-color` input when switching slots

---

## [1.1.0] - 2026-03-21

### Added
- **Hats** × 2 new styles → 6 total: `crown`, `top_hat`
- **Wands** × 4 new styles → 8 total: `vine`, `phoenix`, `unicorn`, `oak`
- **Tops** × 4 new styles → 8 total: `striped`, `dress`, `jacket`, `uniform`
- **Glasses** × 4 new styles → 6 total: `cat_eye`, `aviator`, `hp_round`, `sunglasses`

### Fixed
- **Wands** reoriented to originate from doll's right hand (`translate(196,256) rotate(-38)`) pointing upward
- **Hats** raised further ~10px (brim bottoms now ~y=79)

---

## [1.0.1] - 2026-03-21

### Added
- **Hair** — 10 styles with per-item color picker (Harry, Hermione, Ron, Draco-inspired + short_spiky, long_straight, curly, buns, ponytail, bob)
- **README.md** — simple project overview with live URL, features, local dev instructions and Docker image info

### Fixed
- **Head size** reduced 15% (`rx 82→70`, `ry 90→77`) for better Funko proportions
- **Scarf** repositioned from mouth level (`y=156`) to neck zone (`y=180`) — now wraps correctly between head and body
- **Hats** raised ~12px — brims now sit above the eyebrows instead of at eye level
- **Footer** centered, smaller font (`0.6rem`), version badge styled with accent color to match page theme

---

## [1.0.0] - 2026-03-21

### Added

#### Doll customization
- Funko-style kawaii SVG doll with 14 fully customizable layers
- Gender selection: **boy** (straight silhouette) and **girl** (rounded hips silhouette) with dedicated body shapes
- **Eyes** × 5 variants: round, star, half-closed, wink, heart
- **Eyebrows** × 4 variants: straight, arched, angry, kawaii
- **Nose** × 3 variants: dot, button, heart
- **Mouth** × 4 variants: smile, line, surprise, UwU
- **Tops** × 4: t-shirt, crop top, hoodie, tank top
- **Bottoms** × 3: pants, skirt, shorts (gender-aware shapes)
- **Shoes** × 3: sneaker, boot, sandal
- **Hats** × 4: beanie, wizard hat, beret, cap
- **Capes/coats** × 2: coat, HP cape
- **Glasses** × 2: round, square
- **Belt** × 2: thin, wide
- **HP scarves** for all 4 Hogwarts houses: Gryffindor (red/gold), Slytherin (green/silver), Ravenclaw (blue/bronze), Hufflepuff (yellow/black) with stripe detail and fringe
- **HP wands** × 4: Elder Wand, Holly, Elm, Willow (each with unique SVG shape)

#### Interaction
- Drag & drop items onto the doll from the left panel
- Click-to-equip/unequip (also works on mobile via touch)
- Automatic category replacement: equipping an item removes any previous item of the same category
- Skin tone picker: 8 presets (light → dark + kawaii pink/mint) plus free color picker
- Per-item color picker for all clothing and accessory categories
- Eye color picker

#### Collection & persistence
- Collection of **4 named dolls** — tabs in the header with live mini-previews
- Editable doll name (up to 24 characters)
- Auto-save on every change via `localStorage`
- Manual save button with confirmation feedback
- Reset button to clear a doll back to defaults

#### Infrastructure
- Flask backend (Python 3.12) serving the SPA on **port 8934**
- Multi-architecture Docker image (`linux/amd64` + `linux/arm64/v8`) published to `ghcr.io/davic80/munecos-kawaii`
- `docker-compose.yml` with **Cloudflare Tunnel** integration (`cloudflared` service)
- GitHub Actions CI/CD: push to `main` → build & push `:latest`; tag `v*` → versioned image + GitHub Release

#### UI
- Dark gaming/kawaii theme with CSS custom properties
- Collapsible accordion sections in the left panel with inline color pickers
- Doll drop zone with animated highlight on drag-over
- Responsive layout (panel hidden on small screens)
- Footer bar with version number, GitHub link, and donation link

