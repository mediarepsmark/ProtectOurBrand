# ProtectOurBrand.com

Production-ready marketing site for ProtectOurBrand.com, a brand protection and DMCA monitoring service.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static content in `/content`
- Programmatic sitemap and robots
- JSON-LD structured data

## Local Commands

```bash
npm run lint
npm run typecheck
npm run build
npm run dev
```

## Backend Intake

- The case-review form posts to `/api/case-review.php`.
- Database settings live in `/api/db.php` and are used by `/api/case-review.php`.
- That endpoint inserts rows into `case_reviews` with the existing table columns from your screenshot.
- The shared DB config falls back to `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS` if you want to override it on the server.
- The PHP endpoint runs on a PHP-capable server; `next dev` and static exports will not execute it locally.

## Notes

The site uses legally careful language. Removal outcomes are not guaranteed and depend on the platform, host, registrar, marketplace, search engine, applicable law, evidence quality, and the type of infringement.
