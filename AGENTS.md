# ProtectOurBrand.com Build Instructions

## Project goal

Build a fast, professional, SEO-focused marketing website for ProtectOurBrand.com, a brand protection and DMCA monitoring service.

The site sells detection, documentation, and removal support for:
- stolen creative
- fake profiles
- counterfeit listings
- unauthorized sellers
- scraper sites
- clone websites
- rogue domains
- fake ads
- marketplace abuse
- search result abuse

## Brand voice

Use a direct, credible, enforcement-focused voice.

Tone:
- professional
- clear
- urgent but not alarmist
- practical
- founder/operator friendly
- legally careful

Avoid:
- guaranteeing removals
- copying competitor language
- sounding like a law firm unless specifically stated
- exaggerated cybersecurity claims
- generic SaaS fluff
- fake statistics
- unverifiable claims

Preferred phrases:
- detect
- document
- enforce
- monitor
- remove
- escalate
- evidence file
- takedown workflow
- abuse channel
- platform-specific enforcement
- search deindexing
- human-reviewed

Avoid promises like:
- guaranteed removal
- 100% success
- instant takedown
- we eliminate all threats

Use safer language:
- pursue removal
- prepare and submit enforcement requests
- track through resolution or escalation
- outcomes depend on platform, host, registrar, marketplace, and evidence quality

## Technical stack

Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Accessible semantic HTML
- Static content files in /content
- Reusable section components
- JSON-LD structured data
- Programmatic sitemap and robots files

## SEO requirements

Every indexable page must have:
- unique title
- unique meta description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- clean H1
- logical H2/H3 structure
- internal links
- visible FAQ where appropriate
- JSON-LD where appropriate

Use these schema types where appropriate:
- Organization
- WebSite
- Service
- BreadcrumbList
- FAQPage

Do not add FAQPage schema unless the same FAQ content is visible on the page.

## Performance requirements

Target:
- Lighthouse Performance 90+
- Accessibility 95+
- Best Practices 95+
- SEO 95+

Use:
- next/image where appropriate
- SVG icons where possible
- minimal client components
- no unnecessary animation libraries
- no bloated dependencies

## Accessibility requirements

Use:
- semantic sections
- keyboard-accessible navigation
- visible focus states
- adequate contrast
- descriptive link text
- form labels and validation messages

## Content requirements

Create high-converting pages for:
- homepage
- services overview
- individual service pages
- industries overview
- industry pages
- how it works
- pricing
- case review
- contact
- resources
- privacy
- terms

Every service page should include:
- hero section
- problem section
- what we detect
- what evidence we collect
- enforcement channels
- process
- deliverables
- FAQ
- CTA

## Build commands

After changes, run:
- npm run lint
- npm run typecheck
- npm run build

Fix all errors before final response.

## Review expectations

Before finishing a task:
- summarize files changed
- list tests run
- list known limitations
- flag content that needs business/legal review
