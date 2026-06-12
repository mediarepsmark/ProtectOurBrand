import type { FAQ } from "./faqs";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  keyword: string;
  metaDescription: string;
  summary: string;
  problem: string;
  detects: string[];
  evidence: string[];
  channels: string[];
  deliverables: string[];
  faqs: FAQ[];
};

const sharedProcess = [
  "Confirm the owned brand, original material, and suspected abuse.",
  "Scan and review URLs, accounts, listings, pages, ads, or domains.",
  "Capture evidence with screenshots, timestamps, source references, and ownership context.",
  "Prepare platform-specific enforcement requests and submit through the appropriate channel.",
  "Track responses, unresolved items, and escalation options."
];

export const services: Service[] = [
  {
    slug: "dmca-takedown-service",
    title: "DMCA Takedown Service",
    shortTitle: "DMCA Takedowns",
    keyword: "DMCA takedown service",
    metaDescription:
      "ProtectOurBrand helps teams detect, document, and pursue removal of copied website content, stolen creative, and stolen product images across web hosts, platforms, and search engines. Request a brand threat review.",
    summary:
      "Prepare documented copyright enforcement requests for copied content, stolen images, scraper pages, and unauthorized republication.",
    problem:
      "Copied content spreads quickly when scraper pages, fake stores, and unauthorized publishers reuse your creative without context or permission.",
    detects: [
      "Copied website text and creative",
      "Stolen product images",
      "Republished media and downloads",
      "Scraper pages and mirror URLs",
      "Search results pointing to infringing copies"
    ],
    evidence: [
      "Original source URL and publication context",
      "Infringing URL, screenshots, and timestamped captures",
      "Ownership or authorization notes",
      "Host, registrar, platform, and search result details"
    ],
    channels: [
      "Web host abuse desks",
      "Platform copyright forms",
      "Search deindexing channels",
      "Registrar and domain abuse contacts",
      "Marketplace IP portals where applicable"
    ],
    deliverables: [
      "Evidence file",
      "DMCA request draft and submission notes",
      "Submission tracking",
      "Resolution or escalation report"
    ],
    faqs: [
      {
        question: "Can you remove copied website content?",
        answer:
          "ProtectOurBrand can prepare and submit enforcement requests for copied website content when the evidence supports a copyright claim. Outcomes depend on the receiving platform, host, law, and evidence quality."
      },
      {
        question: "Can you help with stolen product images?",
        answer:
          "Yes. We document the original product photos, capture where they are being used, and pursue removal through the relevant host, marketplace, platform, or search channel."
      }
    ]
  },
  {
    slug: "brand-monitoring",
    title: "Brand Monitoring Service",
    shortTitle: "Brand Monitoring",
    keyword: "brand monitoring service",
    metaDescription:
      "ProtectOurBrand monitors brand names, domains, social profiles, marketplaces, search results, and web pages for brand abuse, copied content, and impersonation threats.",
    summary:
      "Monitor web, social, marketplace, domain, and search surfaces for likely brand abuse before it grows into a larger enforcement issue.",
    problem:
      "Brand abuse rarely stays in one place. New profiles, domains, listings, ads, and scraper pages can appear after one takedown request is submitted.",
    detects: [
      "Brand name misuse",
      "Lookalike domains",
      "Fake social profiles",
      "Marketplace listings using brand assets",
      "Search results for copied or abusive pages"
    ],
    evidence: [
      "Discovery logs",
      "Reviewed URLs and profile records",
      "Risk classification",
      "Screenshots and timestamps for priority findings"
    ],
    channels: [
      "Search monitoring",
      "Social platform review",
      "Marketplace monitoring",
      "Domain watch lists",
      "Web crawl review"
    ],
    deliverables: [
      "Monitoring report",
      "Prioritized abuse queue",
      "Evidence-ready findings",
      "Recommended enforcement path"
    ],
    faqs: [
      {
        question: "How often can monitoring run?",
        answer:
          "Monitoring cadence depends on plan scope and urgency. Smaller brands may use monthly scans, while high-risk brands may need more frequent review."
      },
      {
        question: "Is monitoring human-reviewed?",
        answer:
          "Yes. Automated discovery is useful, but ProtectOurBrand uses human review to reduce false positives and classify likely abuse."
      }
    ]
  },
  {
    slug: "fake-profile-removal",
    title: "Fake Profile Removal Service",
    shortTitle: "Impersonation Removal",
    keyword: "fake profile removal",
    metaDescription:
      "ProtectOurBrand helps brands detect, document, and pursue removal of fake profiles, impersonation accounts, fake Instagram accounts, fake Facebook pages, and brand impersonation.",
    summary:
      "Document impersonation accounts and submit platform-specific requests for fake social profiles, pages, and handles.",
    problem:
      "Fake profiles can confuse customers, redirect buyers, solicit payments, and damage trust before the real brand sees the account.",
    detects: [
      "Fake Instagram and Facebook accounts",
      "Impersonation pages and handles",
      "Profiles using brand names, logos, and product photos",
      "Accounts directing customers to suspicious links",
      "Repeat impersonation patterns"
    ],
    evidence: [
      "Profile URLs and handle history",
      "Screenshots of logo, name, bio, and posts",
      "Official profile references",
      "Customer confusion or misuse notes when available"
    ],
    channels: [
      "Social platform impersonation forms",
      "Trademark or copyright reporting routes",
      "Fraud and abuse channels",
      "Escalation contacts where available"
    ],
    deliverables: [
      "Impersonation evidence file",
      "Platform-specific removal request",
      "Response tracking",
      "Monitoring for replacement accounts"
    ],
    faqs: [
      {
        question: "Can you help remove a fake Instagram account?",
        answer:
          "We can document the account and submit the appropriate impersonation, trademark, copyright, or fraud report depending on the facts and available evidence."
      },
      {
        question: "What if the profile is using my logo but not my exact name?",
        answer:
          "We can still review it. The right enforcement path depends on how the profile uses your brand assets and whether the platform recognizes the evidence."
      }
    ]
  },
  {
    slug: "counterfeit-product-takedown",
    title: "Counterfeit Product Takedown Service",
    shortTitle: "Counterfeit Takedowns",
    keyword: "counterfeit product takedown",
    metaDescription:
      "ProtectOurBrand helps ecommerce brands detect, document, and pursue removal of counterfeit listings, fake product listings, unauthorized sellers, and marketplace abuse.",
    summary:
      "Track counterfeit listings and prepare marketplace enforcement requests supported by product, brand, and seller evidence.",
    problem:
      "Counterfeit listings can use copied photos, similar packaging, unauthorized brand names, and misleading seller claims to divert customers.",
    detects: [
      "Counterfeit product listings",
      "Fake product listing removal targets",
      "Unauthorized seller patterns",
      "Copied product photos",
      "Marketplace stores using brand assets"
    ],
    evidence: [
      "Listing URLs, seller names, and marketplace IDs",
      "Product photo comparisons",
      "Brand registration or ownership context",
      "Pricing, availability, and seller history notes"
    ],
    channels: [
      "Marketplace IP portals",
      "Seller abuse reporting",
      "Copyright and trademark forms",
      "Search and ad reporting where applicable"
    ],
    deliverables: [
      "Listing evidence packet",
      "Marketplace report submissions",
      "Seller cluster tracking",
      "Weekly or executive reporting"
    ],
    faqs: [
      {
        question: "Can you report unauthorized sellers?",
        answer:
          "Yes, when there is a supported enforcement basis. We document the listings and route reports through marketplace channels that fit the evidence."
      },
      {
        question: "Do marketplaces always remove counterfeit listings?",
        answer:
          "No. Marketplace outcomes depend on the platform rules, IP ownership evidence, listing details, seller behavior, and the available proof."
      }
    ]
  },
  {
    slug: "scraper-site-removal",
    title: "Scraper Site Removal Service",
    shortTitle: "Scraper Site Removal",
    keyword: "scraper site removal",
    metaDescription:
      "ProtectOurBrand helps teams detect, document, and pursue removal of scraper sites, copied website pages, stolen text, copied images, and scraped content.",
    summary:
      "Identify scraper pages, compare them to original content, and pursue removal or search deindexing through the appropriate channels.",
    problem:
      "Scraper sites can outrank original pages, dilute attribution, and create confusing duplicate pages that reuse your copy, images, or downloads.",
    detects: [
      "Copied website pages",
      "Scraped product copy",
      "Stolen blog posts or guides",
      "Mirror pages",
      "Scraper domains indexed in search"
    ],
    evidence: [
      "Original and copied page comparisons",
      "Publication and indexation context",
      "Screenshots and HTML excerpts",
      "Host and search result records"
    ],
    channels: [
      "Host abuse channels",
      "Search deindexing channels",
      "Domain abuse contacts",
      "Platform copyright forms"
    ],
    deliverables: [
      "Scraper site evidence report",
      "Removal request submissions",
      "Search deindexing support",
      "Follow-up tracker"
    ],
    faqs: [
      {
        question: "Can scraper pages be removed from search?",
        answer:
          "Search deindexing can be pursued when a search engine accepts the evidence and the request meets its requirements. The page may still exist on the host unless the host also acts."
      },
      {
        question: "What if the scraper hides ownership details?",
        answer:
          "We document the page, domain, hosting signals, and available abuse contacts, then use the best reachable enforcement path."
      }
    ]
  },
  {
    slug: "clone-website-removal",
    title: "Clone Website Removal Service",
    shortTitle: "Clone Site Removal",
    keyword: "clone website removal",
    metaDescription:
      "ProtectOurBrand helps companies detect, document, and pursue removal of clone websites, fake storefronts, copied landing pages, and phishing-style brand abuse.",
    summary:
      "Document cloned storefronts and copied sites, then pursue removal through hosts, registrars, platforms, and search channels.",
    problem:
      "A cloned website can look credible enough to mislead customers, capture leads, sell fake products, or damage search trust.",
    detects: [
      "Fake websites using brand names",
      "Copied storefront removal targets",
      "Cloned landing pages",
      "Lookalike checkout pages",
      "Brand misuse across copied design and assets"
    ],
    evidence: [
      "Original site references",
      "Clone URL screenshots and page captures",
      "Domain, host, and registrar details",
      "Brand asset and content comparisons"
    ],
    channels: [
      "Hosting provider abuse desks",
      "Registrar abuse desks",
      "Search deindexing",
      "Platform and payment abuse channels when identified"
    ],
    deliverables: [
      "Clone site evidence file",
      "Host and registrar request package",
      "Search deindexing request support",
      "Escalation tracker"
    ],
    faqs: [
      {
        question: "Can you help with a fake website using my brand?",
        answer:
          "Yes. We document the cloned content and brand misuse, identify likely infrastructure, and pursue removal or deindexing through available abuse channels."
      },
      {
        question: "Is a clone website always a copyright issue?",
        answer:
          "Not always. It may involve copyright, trademark, fraud, platform policy, or domain abuse concerns. The evidence determines the best path."
      }
    ]
  },
  {
    slug: "marketplace-enforcement",
    title: "Marketplace Enforcement Service",
    shortTitle: "Marketplace Enforcement",
    keyword: "marketplace enforcement service",
    metaDescription:
      "ProtectOurBrand helps ecommerce brands document and report marketplace abuse, counterfeit listings, copied product photos, unauthorized sellers, and fake product listings.",
    summary:
      "Build marketplace evidence files and submit enforcement requests for abusive listings, sellers, and storefronts.",
    problem:
      "Marketplaces move fast, and abusive listings can relist under new sellers or slightly changed titles after an initial report.",
    detects: [
      "Copied product image listings",
      "Counterfeit listings",
      "Unauthorized sellers",
      "Marketplace stores using brand identity",
      "Relisted or mirrored abusive products"
    ],
    evidence: [
      "Listing URLs and IDs",
      "Seller names and storefront captures",
      "Original product references",
      "Photo, title, and description comparisons"
    ],
    channels: [
      "Marketplace IP owner portals",
      "Seller reporting channels",
      "Copyright and trademark forms",
      "Platform support and escalation queues"
    ],
    deliverables: [
      "Marketplace abuse queue",
      "Evidence-backed reports",
      "Submission and response log",
      "Relisting watch list"
    ],
    faqs: [
      {
        question: "Can you handle marketplace relistings?",
        answer:
          "Monitoring can track relistings and seller clusters so new abuse can be documented and routed into the takedown workflow."
      },
      {
        question: "What marketplaces can you review?",
        answer:
          "ProtectOurBrand can review major marketplaces and ecommerce platforms where public listings can be captured and enforcement channels are available."
      }
    ]
  },
  {
    slug: "rogue-domain-monitoring",
    title: "Rogue Domain Monitoring Service",
    shortTitle: "Domain Abuse Monitoring",
    keyword: "rogue domain monitoring",
    metaDescription:
      "ProtectOurBrand monitors rogue domains, typosquats, lookalike domains, brand domain abuse, fake stores, and cloned sites for brands that need evidence-backed escalation.",
    summary:
      "Watch for lookalike domains, typosquats, fake stores, and domain-based brand abuse that could confuse customers.",
    problem:
      "Rogue domains often appear before fake stores, impersonation pages, ad abuse, or phishing-style pages become visible to customers.",
    detects: [
      "Typosquatting monitoring targets",
      "Lookalike domain detection",
      "Brand domain abuse",
      "New domains using product or company names",
      "Domains hosting clone websites"
    ],
    evidence: [
      "Domain registration and DNS signals",
      "Landing page screenshots",
      "Brand name and URL similarity notes",
      "Host, registrar, and search result records"
    ],
    channels: [
      "Registrar abuse desks",
      "Hosting provider abuse desks",
      "Search deindexing",
      "Ad and platform abuse reporting when applicable"
    ],
    deliverables: [
      "Domain watch report",
      "Priority domain evidence files",
      "Registrar or host request package",
      "Escalation status tracker"
    ],
    faqs: [
      {
        question: "Can you detect typosquats?",
        answer:
          "Yes. We can monitor lookalike patterns around brand names, product names, and domains, then review live pages for abuse indicators."
      },
      {
        question: "Can every rogue domain be taken down?",
        answer:
          "No. Action depends on the domain behavior, applicable policies, available evidence, registrar or host response, and legal context."
      }
    ]
  },
  {
    slug: "search-deindexing",
    title: "Search Deindexing Service",
    shortTitle: "Search Deindexing",
    keyword: "search deindexing service",
    metaDescription:
      "ProtectOurBrand helps teams document infringing URLs and pursue search result removal or deindexing support for stolen content, copied pages, and brand abuse.",
    summary:
      "Prepare search deindexing requests for infringing URLs, copied pages, scraper results, and abuse that appears in search engines.",
    problem:
      "Even after a host ignores a request, abusive pages can continue appearing in search results and drawing traffic away from the original source.",
    detects: [
      "Infringing URLs in search results",
      "Scraper pages outranking originals",
      "Copied product pages",
      "Clone pages indexed by search engines",
      "Search snippets showing brand abuse"
    ],
    evidence: [
      "Search result captures",
      "Original and infringing URL comparison",
      "Copyright or ownership context",
      "Prior host or platform request status when available"
    ],
    channels: [
      "Search engine copyright reporting",
      "Search result removal tools",
      "Host abuse desks",
      "Platform reporting where the source page is hosted"
    ],
    deliverables: [
      "Search evidence file",
      "Deindexing request package",
      "Submission tracking",
      "Follow-up and escalation notes"
    ],
    faqs: [
      {
        question: "Does deindexing remove the page from the internet?",
        answer:
          "No. Deindexing may remove or limit a result in search, but the underlying page can remain online unless the host or platform also acts."
      },
      {
        question: "Can you remove an infringing URL from Google?",
        answer:
          "We can prepare and submit a request when the facts and evidence support it. The search engine decides whether to act."
      }
    ]
  },
  {
    slug: "fake-ad-reporting",
    title: "Fake Ad Reporting Service",
    shortTitle: "Fake Ad Reporting",
    keyword: "fake ad reporting service",
    metaDescription:
      "ProtectOurBrand helps brands document and report fake ads, scam promotions, impersonation ads, copied creative, and paid search or social ad abuse.",
    summary:
      "Document fake ads and brand misuse in paid channels, then route reports through ad platform abuse and IP reporting paths.",
    problem:
      "Fake ads can send customers to scam pages, clone stores, counterfeit listings, or impersonation profiles before organic monitoring detects the abuse.",
    detects: [
      "Fake social ads",
      "Paid search ads misusing brand names",
      "Copied creative in ad units",
      "Ads pointing to rogue domains",
      "Marketplace or fake store promotions"
    ],
    evidence: [
      "Ad screenshots and landing page URLs",
      "Advertiser or page identifiers",
      "Copied creative comparisons",
      "Brand ownership and official ad references"
    ],
    channels: [
      "Ad platform abuse forms",
      "Copyright and trademark reporting",
      "Landing page host or registrar channels",
      "Search and social reporting flows"
    ],
    deliverables: [
      "Ad abuse evidence file",
      "Platform report submissions",
      "Landing page enforcement notes",
      "Status and escalation tracker"
    ],
    faqs: [
      {
        question: "Can you report a fake ad using my brand?",
        answer:
          "Yes. We capture the ad, landing page, advertiser signals, and copied creative, then submit through the reporting path that fits the evidence."
      },
      {
        question: "What if the ad disappears before review?",
        answer:
          "Evidence capture matters. Screenshots, URLs, timestamps, and advertiser details help preserve the record when the ad is no longer visible."
      }
    ]
  }
];

export const serviceProcess = sharedProcess;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
