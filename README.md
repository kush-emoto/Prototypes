# EMotorad D2C storefront prototype

A production-shaped stakeholder prototype based on the approved India website PNGs. It demonstrates the intended storefront, India/Spain market switch, content editing, catalogue, PDP, cart, search, account and test-ride journeys.

## What this is

- Reusable Next.js + TypeScript frontend, not a disposable HTML mock-up.
- Responsive implementation of the approved design language. The PNGs remain the pixel-level source of truth.
- Browser-local CMS demo at `/studio`. Publish a headline, CTA, announcement, hero image, market variant or section visibility and the storefront reflects it immediately.
- Typed mock API routes under `/api` that establish the frontend/backend contract shape.
- A clean handoff point for a shared Sanity CMS and backend-for-frontend integrations.

## What is intentionally not live

- CMS edits are saved to the current browser's local storage. They are not shared across users or devices.
- Checkout, payments, authentication, ERP/OMS inventory, LeadSquared/CRM and test-ride writes are not connected.
- Product data and API responses are representative prototype data.

These boundaries prevent stakeholder testing from changing production systems. See [docs/CODER_HANDOFF.md](docs/CODER_HANDOFF.md) for the replacement plan.

## Run locally

Prerequisite: Node.js 24 LTS.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/studio`.

Quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy through GitHub and Vercel

1. Create an empty GitHub repository, for example `emotorad-d2c-platform`.
2. From this directory, commit the prototype and push it to a `prototype` branch.
3. In Vercel, choose **Add New → Project**, import that repository and keep the detected Next.js settings.
4. Use Node.js 24 and leave environment variables empty for the browser-local demo.
5. Set the production branch according to the team's release process; use Vercel preview deployments for every pull request.
6. When Sanity is provisioned, add the variables in `.env.example` to Development, Preview and Production separately.

Recommended ownership: the frontend lead owns this repository and Vercel project; backend leads own the contracts and adapters behind `/api`; content operations owns Sanity roles and publishing workflows.

## Route map

| Route | Purpose |
|---|---|
| `/` | CMS-driven market-aware homepage |
| `/bikes` | Product listing and category filtering |
| `/bikes/[slug]` | Product detail experience |
| `/cart` | Cart interaction and checkout boundary |
| `/test-ride` | Test-ride request flow |
| `/search` | Storefront search experience |
| `/account`, `/login` | Account and authentication shell |
| `/studio` | Stakeholder CMS simulator and live preview |
| `/api/*` | Mock production-shaped backend contracts |

## Repository structure

```text
src/app/          Routes, pages and API handlers
src/components/   Reusable storefront components
src/context/      Prototype content runtime
src/data/         Replaceable catalogue and defaults
src/lib/          Shared domain contracts
docs/             Backend/frontend handoff and API contract
public/           Approved/reused media assets
```
