import type { FAQ } from "./faqs";

export type Industry = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  threats: string[];
  workflow: string[];
  faqs: FAQ[];
};

export const industries: Industry[] = [
  {
    slug: "ecommerce-brands",
    title: "Ecommerce Brands",
    metaTitle: "Brand Protection for Ecommerce Brands | ProtectOurBrand",
    metaDescription:
      "ProtectOurBrand helps ecommerce brands detect, document, and pursue removal of counterfeit listings, fake stores, copied product pages, and unauthorized sellers.",
    summary:
      "Protect product images, listings, storefronts, and seller channels from copied content, counterfeit abuse, and marketplace misuse.",
    threats: [
      "Copied product images",
      "Counterfeit listings",
      "Unauthorized sellers",
      "Fake storefronts",
      "Marketplace relistings"
    ],
    workflow: [
      "Scan marketplaces, search results, and web pages.",
      "Compare abusive listings against original product assets.",
      "Prepare marketplace, host, and search enforcement requests."
    ],
    faqs: [
      {
        question: "Can ecommerce brands submit product photo claims?",
        answer:
          "Yes, when the brand owns or controls the original photos and the evidence supports a copyright or platform-policy request."
      }
    ]
  },
  {
    slug: "creators-influencers",
    title: "Creators and Influencers",
    metaTitle: "Brand Protection for Creators and Influencers | ProtectOurBrand",
    metaDescription:
      "ProtectOurBrand helps creators detect, document, and pursue removal of stolen creative, fake profiles, impersonation accounts, and copied media.",
    summary:
      "Protect original creative, public identity, handles, and audience trust across social platforms, search, and scraper sites.",
    threats: [
      "Stolen creative",
      "Fake profiles",
      "Impersonation accounts",
      "Copied downloads",
      "Scraper pages"
    ],
    workflow: [
      "Review owned profiles and original content URLs.",
      "Document fake profiles and copied creative.",
      "Submit platform-specific removal or reporting requests."
    ],
    faqs: [
      {
        question: "Can you help with fake social accounts?",
        answer:
          "Yes. We document the profile, compare it to the official account, and route the report through platform impersonation or IP channels."
      }
    ]
  },
  {
    slug: "agencies",
    title: "Agencies",
    metaTitle: "Brand Protection for Agencies | ProtectOurBrand",
    metaDescription:
      "ProtectOurBrand helps agencies support clients with DMCA monitoring, brand abuse documentation, fake profile reporting, and takedown workflow tracking.",
    summary:
      "Give client teams an evidence-first workflow for stolen creative, fake profiles, scraper pages, and marketplace abuse.",
    threats: [
      "Client creative theft",
      "Fake brand profiles",
      "Copied campaign assets",
      "Search abuse",
      "Clone pages"
    ],
    workflow: [
      "Set up monitored client brands and owned properties.",
      "Create client-ready evidence packets.",
      "Track submission status and unresolved abuse."
    ],
    faqs: [
      {
        question: "Can agencies manage multiple brands?",
        answer:
          "Yes. Plans can be scoped around multiple client brands, reporting needs, and enforcement volume."
      }
    ]
  },
  {
    slug: "saas-companies",
    title: "SaaS Companies",
    metaTitle: "Brand Protection for SaaS Companies | ProtectOurBrand",
    metaDescription:
      "ProtectOurBrand helps SaaS teams monitor rogue domains, fake ads, copied landing pages, scraper sites, and impersonation pages.",
    summary:
      "Protect product pages, login-adjacent brand trust, search visibility, and customer-facing identity from clone and domain abuse.",
    threats: [
      "Copied landing pages",
      "Rogue domains",
      "Fake ads",
      "Scraper sites",
      "Impersonation pages"
    ],
    workflow: [
      "Monitor product names, domains, and search results.",
      "Classify suspicious pages and ad landing destinations.",
      "Submit host, registrar, platform, or search requests."
    ],
    faqs: [
      {
        question: "Can you monitor lookalike SaaS domains?",
        answer:
          "Yes. We can watch for lookalike domains, review live pages, and document abuse indicators for escalation."
      }
    ]
  },
  {
    slug: "consumer-products",
    title: "Consumer Products",
    metaTitle: "Brand Protection for Consumer Products | ProtectOurBrand",
    metaDescription:
      "ProtectOurBrand helps consumer product companies document counterfeit listings, copied packaging, unauthorized sellers, and marketplace abuse.",
    summary:
      "Support marketplace enforcement for brands with copied photos, counterfeit products, similar packaging, and unauthorized listings.",
    threats: [
      "Counterfeit listings",
      "Copied packaging photos",
      "Unauthorized sellers",
      "Fake product pages",
      "Marketplace abuse"
    ],
    workflow: [
      "Review listings, sellers, and product evidence.",
      "Capture listing screenshots and seller identifiers.",
      "Submit marketplace enforcement requests and track outcomes."
    ],
    faqs: [
      {
        question: "Can you document copied packaging?",
        answer:
          "Yes. We can compare product and packaging references against marketplace listings and create an evidence file."
      }
    ]
  },
  {
    slug: "public-figures",
    title: "Public Figures",
    metaTitle: "Brand Protection for Public Figures | ProtectOurBrand",
    metaDescription:
      "ProtectOurBrand helps public figures detect, document, and report fake profiles, impersonation pages, stolen creative, fake ads, and search abuse.",
    summary:
      "Protect identity, public-facing profiles, and audience trust from impersonation, copied content, and paid promotion abuse.",
    threats: [
      "Fake social profiles",
      "Impersonation pages",
      "Fake ads",
      "Copied media",
      "Search result abuse"
    ],
    workflow: [
      "Verify official public properties and known aliases.",
      "Capture impersonation evidence and misleading claims.",
      "Route reports through social, ad, platform, and search channels."
    ],
    faqs: [
      {
        question: "Can you report impersonation of a public figure?",
        answer:
          "Yes, with authorization and supporting evidence. Each platform decides how it handles impersonation reports."
      }
    ]
  },
  {
    slug: "law-firms",
    title: "Law Firms",
    metaTitle: "Brand Protection Support for Law Firms | ProtectOurBrand",
    metaDescription:
      "ProtectOurBrand supports law firms with brand abuse detection, evidence documentation, monitoring reports, and takedown workflow support.",
    summary:
      "Provide evidence collection, monitoring, and workflow support for firms handling client brand abuse matters.",
    threats: [
      "Evidence-heavy infringement matters",
      "Counterfeit and marketplace abuse",
      "Rogue domains",
      "Search abuse",
      "Repeat infringers"
    ],
    workflow: [
      "Coordinate monitored terms and owned properties.",
      "Prepare evidence files and status reports.",
      "Track channel responses and unresolved items."
    ],
    faqs: [
      {
        question: "Does ProtectOurBrand replace legal counsel?",
        answer:
          "No. ProtectOurBrand is not a law firm unless expressly stated through a licensed attorney relationship. Law firms can use us for monitoring, documentation, and workflow support."
      }
    ]
  }
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
