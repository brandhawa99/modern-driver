# Modern Driver

A curated classic car marketplace PWA — built with React, TypeScript, and Vite.

**Live:** https://modern-driver.vercel.app

![TypeScript](https://img.shields.io/badge/TypeScript-93%25-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-PWA-646CFF?style=flat&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)

---

## What it is

A full-featured collector car platform with a real-time auction engine, virtual garage, and editorial content — styled as a luxury dark-mode PWA with gold accents and Cormorant Garamond typography. Installable, offline-capable, and built to production architectural standards throughout.

---

## Features

- **Real-time auction engine** — live bid feed with simulated competing bidders, reserve price logic, and per-car bid history that survives navigation
- **Virtual Garage** — persistent save/remove with Zustand, O(1) lookup via `Record<string, boolean>`
- **Showroom** — full catalogue with filtering
- **Editorial** — featured articles with modal reader
- **PWA** — installable, Service Worker, offline page, Workbox image caching

---

## Stack

| Category         | Tech                            |
| ---------------- | ------------------------------- |
| Framework        | React + TypeScript + Vite       |
| Routing          | TanStack Router                 |
| Data fetching    | TanStack Query                  |
| State management | Zustand                         |
| Styling          | Tailwind CSS v4 + shadcn/ui     |
| Animation        | Motion (formerly Framer Motion) |
| PWA              | vite-plugin-pwa + Workbox       |
| Deployment       | Vercel                          |

---

## Architecture

### Auction state keyed per car

Bid history and reserve status live in `Record<string, ...>` maps — `bidsByCarId`, `reserveMetByCarId` — rather than flat values. Navigation never resets an in-progress auction.

The bid loop runs on recursive `setTimeout` and reads price with `useAuctionStore.getState()` inside the callback rather than closing over React state. This means every simulated bid is calculated off the true current price, not a stale snapshot from when the effect was registered. The obvious implementation with `useEffect` + closed-over state gets this wrong.

**Zustand selector stability**

Selectors that return arrays use stable empty constants defined outside components:

```ts
const EMPTY_BIDS: Bid[] = [];
// selector: state => state.bidsByCarId[carId] ?? EMPTY_BIDS
```

Inline `?? []` creates a new array reference on every render. Zustand's snapshot diffing sees it as changed, schedules a re-render, and you get an infinite loop. This is a non-obvious failure mode that only surfaces under specific selector patterns.

**PWA cross-origin image caching**

Unsplash images are served with `crossOrigin="anonymous"`. Without it, the browser treats them as opaque responses — the Service Worker can store them but cannot inspect status codes, so Workbox's cache strategies refuse to cache them. `crossOrigin="anonymous"` makes the response transparent and cacheable.

**TanStack Query over direct imports**

Mock data is wrapped in async functions with simulated latency. The data layer is structurally identical to a real REST API — loading states, error boundaries, stale-while-revalidate, and cache invalidation all behave exactly as they would in production.

---

## Running locally

```bash
bun install
bun run dev
```

PWA features (Service Worker, offline mode, image caching) require a production build:

```bash
bun run build && bun run preview
```