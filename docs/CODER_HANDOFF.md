# Frontend and backend handoff

## Architectural intent

Keep the page components independent of vendors. The storefront consumes domain-shaped content and commerce contracts; adapters translate Sanity, ERP, OMS, CRM and payment provider payloads at the boundary.

```text
Storefront components
  ├── ContentRepository → browser-local demo → Sanity adapter
  └── /api BFF contracts → mock handlers → ERP / OMS / CRM / payments
```

Do not call ERP, OMS, LeadSquared or payment APIs directly from browser components. Server-side adapters must own credentials, normalization, timeouts, idempotency and observability.

## Frontend continuation

1. Extract final tokens and responsive measurements from Figma Dev Mode; replace approximated CSS values without changing component contracts.
2. Add visual regression snapshots for the approved desktop and mobile breakpoints.
3. Replace `<img>` elements with the agreed image pipeline after confirming CDN and transformation ownership.
4. Add accessibility testing, focus states and full keyboard validation.
5. Add analytics through a consent-aware data layer rather than direct vendor calls from components.

## Shared CMS connection

Provision one Sanity project with separate `development`, `staging` and `production` datasets. Model market and locale explicitly; do not clone the whole CMS for Europe.

Recommended initial document types:

- `siteSettings`: market, locale, navigation, announcement and support contacts.
- `homePage`: market, SEO, ordered modular sections and hero.
- `productEditorial`: product slug/SKU reference, storytelling, media, features and FAQs. Price, stock and fulfilment remain authoritative in ERP/OMS.
- `campaign`: market, schedule, placements and CTA.
- `store`: store identifier, location and editorial details; operational availability comes from the booking service.
- `redirect`: source, destination, status and market.

Replace the provider in `src/context/content-context.tsx` with a `SanityContentRepository` implementing `ContentRepository` from `src/lib/types.ts`. Preserve the `HomeContent` view model so page components do not change. Add preview tokens only to server-side code, and enable Sanity visual editing for draft preview.

## Backend continuation

The handlers under `src/app/api` are contract fixtures, not business logic. Move them into the selected backend-for-frontend deployment or keep them as Next.js route handlers calling backend adapters.

Implementation order:

1. Product catalogue and availability read model from ERP/OMS.
2. Pincode serviceability and delivery promise.
3. Cart price validation and promotion evaluation.
4. Checkout orchestration and payment webhooks with idempotency.
5. Test-ride stores, slots and bookings.
6. Customer identity, orders, warranty and service history.
7. CRM event publishing through one lead/customer orchestration boundary.

Use the error envelope in `openapi.yaml` consistently. Add correlation IDs, structured logs, metrics and traces before live integrations.

## Definition of done before production

- Contract tests against ERP/OMS adapters and payment webhooks.
- CMS roles, approval workflow, content validation and rollback tested.
- Consent mode, analytics taxonomy, server-side conversion events and tag governance approved.
- Core Web Vitals budgets and automated accessibility checks in CI.
- SEO metadata, schema markup, sitemap, robots, redirects and Europe localization verified.
- Security review for auth, PII, secrets, rate limits, CSP and dependency supply chain.
- Load, failover and reconciliation tests for checkout and inventory reservations.
