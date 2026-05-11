# Modern Driver

<img width="1898" height="958" alt="image" src="https://github.com/user-attachments/assets/440d7573-9cd7-4a79-bf47-619426e0c392" />

A collector car marketplace PWA — real-time auctions, virtual garage, editorial content, and full offline support.

**Live:** https://modern-driver.vercel.app

![TypeScript](https://img.shields.io/badge/TypeScript-93%25-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-PWA-646CFF?style=flat&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat&logo=vercel)

---

## What it is

A full-featured collector car platform built to production architectural standards. The focus is engineering discipline underneath the UI — deterministic state management, offline-first PWA behavior, and rendering stability under concurrent auction simulation.

Installable on desktop and mobile. Fully functional offline after first visit.

---

## Features

- **Real-time auction engine** — live competing bidders, reserve price logic, per-car bid history that persists across navigation, confetti on bid placement
- **Virtual Garage** — save and remove cars with Zustand, O(1) lookup via `Record<string, boolean>`, persisted across sessions
- **Showroom** — full catalogue with filtering by make, category, condition, and price range
- **Editorial** — featured articles with modal reader
- **PWA** — installable, Service Worker, offline fallback, Workbox runtime image caching

---

## Stack

| Category         | Tech                                           |
| ---------------- | ---------------------------------------------- |
| Framework        | React + TypeScript + Vite                      |
| Routing          | TanStack Router                                |
| Data fetching    | TanStack Query (`networkMode: "offlineFirst"`) |
| State management | Zustand                                        |
| Styling          | Tailwind CSS v4 + shadcn/ui                    |
| Animation        | Motion (formerly Framer Motion)                |
| PWA              | vite-plugin-pwa + Workbox                      |
| Deployment       | Vercel                                         |

---

## Architecture

### Auction state keyed per car

Bid history and reserve status are stored in `Record<string, ...>` maps keyed by car ID. Navigation never resets an in-progress auction — each vehicle maintains independent state regardless of routing.

The bid loop uses recursive `setTimeout` with `useAuctionStore.getState()` inside the callback. This ensures every simulated bid is calculated against the true current price rather than a value captured at effect registration time.

### Zustand selector stability

Selectors returning fallback arrays use stable constants defined outside components:

```ts
const EMPTY_BIDS: Bid[] = [];
const bids = useAuctionStore((state) => state.bids[carId] ?? EMPTY_BIDS);
```

An inline `?? []` creates a new array reference on every selector evaluation. Zustand compares snapshots by reference identity — a new reference every render means a detected change every render, which triggers another render. This produces an infinite loop that only surfaces during the brief window before auction state is initialized, making it easy to miss in development.

### TanStack Query with `networkMode: "offlineFirst"`

Mock data is wrapped in async functions with simulated latency, structurally identical to a real REST API. The default `networkMode: "online"` causes TanStack Query to pause queries when the browser reports no network connection — even when the query function doesn't touch the network. Setting `networkMode: "offlineFirst"` ensures queries always execute, which is correct behavior for a locally-resolved data layer.

### PWA cross-origin image caching

Unsplash images use `crossOrigin="anonymous"`. Without it, the browser returns opaque responses — Workbox can store them but cannot inspect status codes, so its cache strategies reject them silently. `crossOrigin="anonymous"` makes responses transparent and cacheable. Images not yet cached on first visit fall back to a local placeholder rather than a broken image state.

### Offline navigation

`navigateFallback: "/index.html"` in the Workbox config ensures the Service Worker serves the app shell for any unrecognized navigation request. Without this, direct URL navigation while offline hangs indefinitely — the Service Worker has no instruction for routes it hasn't cached.

---

## Running locally

```bash
bun install
bun run dev
```

PWA features require a production build:

```bash
bun run build && bun run preview
```
