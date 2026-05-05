# Modern Driver

A Progressive Web App built as a targeted portfolio project for a Frontend Developer role at [Classic Driver](https://www.classicdriver.com). Inspired by classicdriver.com — a curated marketplace for collector and classic cars.

**Live demo:** https://modern-driver.vercel.app

![TypeScript](https://img.shields.io/badge/TypeScript-93%25-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-PWA-646CFF?style=flat&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)

---

## Features

- **Installable PWA** — Service Worker, Web App Manifest, offline support, and Workbox image caching with `NetworkFirst` strategy
- **Real-time auction engine** — live bid feed with simulated bidders, reserve price logic, per-car bid history that persists across navigation, and confetti on bid placement
- **Virtual Garage** — save and remove cars, persisted across sessions with Zustand
- **Showroom** — browse and filter the full car catalogue
- **Featured articles** — editorial content with modal popup reader
- **Luxury dark aesthetic** — gold accents, Cormorant Garamond serif typography, smooth page transitions

---

## Tech Stack

| Category         | Tech                            |
| ---------------- | ------------------------------- |
| Framework        | React + TypeScript + Vite       |
| Routing          | TanStack Router                 |
| Data fetching    | TanStack Query                  |
| State management | Zustand                         |
| Styling          | Tailwind CSS + shadcn/ui        |
| Animation        | Motion (formerly Framer Motion) |
| PWA              | vite-plugin-pwa + Workbox       |
| Deployment       | Vercel                          |

---

## Architecture decisions

**Auction state keyed per car**
`bidsByCarId` and `reserveMetByCarId` are `Record<string, ...>` maps in Zustand rather than flat values. This means bid history and reserve status persist independently per car — navigating away and back never resets the auction.

**Stale closure prevention in the bid loop**
The fake bid loop uses recursive `setTimeout` with `useAuctionStore.getState()` inside the callback instead of closed-over React state. This ensures every bid is calculated off the latest current price, not the value captured at effect time.

**PWA image caching**
Unsplash images use `crossOrigin="anonymous"` so the service worker can store non-opaque responses. Without this, the browser blocks the service worker from caching cross-origin images entirely.

**TanStack Query over direct imports**
Mock data is wrapped in fake async functions with a simulated delay. The data layer mirrors a real API so loading states, error boundaries, and caching all work exactly as they would in production.

**Zustand selector stability**
Fallback arrays in Zustand selectors use stable constants defined outside components (`const EMPTY_BIDS: Bid[] = []`) rather than inline `?? []`. Inline array literals create new references on every render and cause infinite re-render loops with Zustand's snapshot diffing.

---

## Running locally

```bash
bun install
bun run dev
```

To test PWA features (Service Worker, offline mode):

```bash
bun run build
bun run preview
```

PWA features only work in the production build — the service worker is not registered in dev mode.
