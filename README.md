# Desi Properties / Apna Deal

Asian-owned business marketplace for the USA — buy, sell, and lease motels, gas stations, restaurants, apartments, offices, and Airbnbs. Built for the South Asian community (Indian, Pakistani, and broader desi-owned businesses).

Inspired by [BizBuySell](https://www.bizbuysell.com/) — sellers pay a flat listing fee instead of broker commissions.

## Two versions included

| File | Stack | Best for |
|------|-------|----------|
| **`apna-deal.html`** | Pure HTML/CSS/JS | Open directly in browser — no install |
| **React app** (`src/`) | React + Vite + Leaflet | Full app with map, localStorage, routing |

### Quick start — HTML prototype (recommended)

Open `apna-deal.html` in any browser. No build step.

### Quick start — React app

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Features

- **Login** — Google, phone, email (mock)
- **Buy / Lease** toggle with category filters
- **Sell tab** — $199 listing fee vs broker commission comparison
- **Profile completion gate** — contacts unlock only when profile is complete
- **Saved listings** empty state
- **Map view** (React version only)

## Business model

- Sellers pay **$199** to list (Apna Deal) / **$299** (React version)
- No broker commission (~6% on a $1.2M motel = $72,000 saved)
- Premium listings, broker subscriptions, and lead gen planned (BizBuySell-style)

## Deploy

**GitHub Pages (HTML):** Enable Pages on `main` branch, set root to `/` and open `apna-deal.html`.

**Netlify (React):**
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## Repo

https://github.com/sumanth2525/Desi-Properties
