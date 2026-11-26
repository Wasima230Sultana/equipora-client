# Equipora

Equipora is a marketplace for renting construction equipment in the UAE. Customers browse and book machines, owners list and manage their fleet and rentals, and admins moderate listings and bookings.

This repository is the **Next.js frontend**. The API lives in the separate `equipora-server` Express project.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript
- **Tailwind CSS 4** with shadcn/ui (`base-nova` style) in `packages/ui`
- **Better Auth** with MongoDB (email/password + optional Google sign-in)
- **Stripe** embedded Checkout
- **next-themes** for light/dark mode (persisted in localStorage)
- **Turborepo** npm workspaces, ESLint 10, Prettier

## Repository structure

```
.
├── apps/web/                  Next.js application
│   ├── app/                   Routes (App Router)
│   │   ├── (auth)/            Sign in / sign up
│   │   ├── (site)/            Home, profile
│   │   ├── api/               Auth handler + Stripe checkout route
│   │   ├── browse-equipment/  Public listing and details
│   │   ├── checkout/          Success / cancel pages
│   │   └── dashboard/         Role-based dashboards
│   ├── components/            Feature, layout and shared UI components
│   ├── hooks/                 Client data hooks
│   ├── lib/                   API clients, types and pure helpers
│   └── .env.example           Environment variable template
├── packages/ui/               Shared shadcn/ui components + global CSS
├── packages/eslint-config/    Shared ESLint config
└── packages/typescript-config/ Shared TypeScript configs
```

## Prerequisites

- Node.js **20.9+** and npm **12+**
- MongoDB (Atlas or local) — used by Better Auth
- A running [`equipora-server`](../Equipora-Server/equipora-server) API (default `http://localhost:5000`)
- Stripe test keys for checkout

## Getting started

```bash
npm install
cp apps/web/.env.example apps/web/.env.local
# fill in the values in apps/web/.env.local
npm run dev
```

The app runs at `http://localhost:3000` and expects the backend at `http://localhost:5000`.

### Environment variables (`apps/web/.env.local`)

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign session cookies |
| `BETTER_AUTH_URL` | Public app URL, e.g. `http://localhost:3000` |
| `MONGODB_URL` | MongoDB connection string (database `equipora`) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Optional Google sign-in credentials |
| `NEXT_PUBLIC_EQUIPORA_SERVER_URL` | Base URL of the Express backend |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB key used by photo upload in sign-up and profile forms |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe browser key |
| `STRIPE_SECRET_KEY` | Stripe server key (used by `/api/checkout`) |
| `NEXT_PUBLIC_APP_URL` | Optional override for Stripe return URLs |

Never commit `.env.local`.

## Scripts

Run from the repository root (Turborepo):

| Command | Description |
| --- | --- |
| `npm run dev` | Start all workspaces in development mode |
| `npm run build` | Production build |
| `npm run lint` | ESLint across workspaces |
| `npm run typecheck` | TypeScript check across workspaces |
| `npm run format` | Prettier write across workspaces |

Individual scripts can be run with `npm run <script> -w web`.

## Features and access

| Area | Customer | Owner | Admin |
| --- | --- | --- | --- |
| Browse/filter equipment | ✅ | ✅ | ✅ |
| Book equipment (Stripe Checkout) | ✅ | ✅ | ✅ |
| Favorites, my rentals, profile | ✅ | ✅ | ✅ |
| Add/edit equipment, earnings, rental requests | — | ✅ | — |
| Users, all equipment/rentals, analytics, status changes | — | — | ✅ |

Registration offers **Customer** and **Equipment owner** only. Admin accounts are provisioned by the platform, not through the public sign-up form.

## Architecture notes

- **Authentication:** Better Auth stores sessions in MongoDB. Browser API clients resolve the session token with `authClient.getSession()`; server route handlers read it from request cookies. `lib/backend-client.ts` sends it as `Authorization: Bearer <token>` — the format the Express backend verifies.
- **API clients:** `lib/*-api-client.ts` wrap the shared HTTP helper; data hooks in `hooks/` call those clients and keep loading/error state out of the components.
- **Payments:** `/api/checkout` validates input and derives pricing from the backend record, creates the rental, then opens Stripe Embedded Checkout. The success page confirms payment through the backend.
- **Theme:** `components/theme-provider.tsx` wraps the app; `components/ui/theme-toggle.tsx` can be placed anywhere and persists the choice via localStorage.

## Adding shadcn/ui components

From the repository root:

```bash
npx shadcn@latest add button -c apps/web
```

Components are generated in `packages/ui/src/components` and imported as:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Deployment

Use the Vercel configuration at the repository root and set all variables above in the project environment. The backend must be reachable at `NEXT_PUBLIC_EQUIPORA_SERVER_URL`, and `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` must point to the deployed frontend origin.
