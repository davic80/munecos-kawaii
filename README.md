# Munecos Kawaii

A Funko-style kawaii doll dress-up app. Customize your doll with SVG layers, save up to 4 named dolls, and share your creations.

**Live:** https://munecos.f1madrid.win/

---

## Features

- Funko-style big-head SVG doll with real-time preview
- 15+ customizable layers: hair, eyes, eyebrows, nose, mouth, tops, bottoms, shoes, hats, capes, glasses, belt, HP scarf, HP wand
- 10 hair styles (including Harry, Hermione, Ron, Draco-inspired)
- Color pickers for skin, eyes, and every clothing/accessory item
- Boy / girl body silhouettes
- Drag & drop or click to equip items
- Touch support for mobile
- 4-slot collection with custom names, saved automatically in `localStorage`

---

## Tech stack

- **Backend:** Python 3.12 + Flask + Gunicorn
- **Frontend:** Vanilla JS, HTML5, CSS3, inline SVG
- **Deployment:** Docker + Cloudflare Tunnel (Raspberry Pi)

---

## Run locally

```bash
git clone https://github.com/davic80/munecos-kawaii.git
cd munecos-kawaii
cp .env.example .env          # edit SECRET_KEY at minimum
docker compose up --build
```

Open http://localhost:8934

---

## Docker image

```
ghcr.io/davic80/munecos-kawaii:latest
```

Multi-arch: `linux/amd64` + `linux/arm64/v8`

---

## License

MIT — [davic80](https://github.com/davic80)
