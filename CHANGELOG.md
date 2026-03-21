# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
