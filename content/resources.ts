import type { FAQ } from "./faqs";

export type Resource = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
  }[];
  faqs: FAQ[];
};

export const resources: Resource[] = [
  {
    slug: "dmca-takedown-guide",
    title: "DMCA Takedown Guide",
    metaTitle: "DMCA Takedown Guide | ProtectOurBrand",
    metaDescription:
      "Learn how DMCA takedown requests work, what evidence to collect, and how brands can pursue removal of copied content and stolen images.",
    summary:
      "A practical guide to documenting copied content and preparing a careful DMCA takedown workflow.",
    sections: [
      {
        heading: "What a DMCA request needs",
        body:
          "A strong request identifies the original copyrighted material, the infringing location, the owner or authorized agent, and the specific use that should be reviewed.",
        bullets: ["Original URL", "Infringing URL", "Ownership context", "Screenshots", "Contact and good-faith statements"]
      },
      {
        heading: "Why evidence quality matters",
        body:
          "Platforms, hosts, and search engines evaluate requests based on their own requirements. Clear URL-level evidence makes review easier and reduces back-and-forth."
      },
      {
        heading: "What happens after submission",
        body:
          "The receiving channel may remove, restrict, reject, request more information, or leave the item unchanged. Tracking each response helps determine the next escalation option."
      }
    ],
    faqs: [
      {
        question: "Is a DMCA request the same as legal advice?",
        answer:
          "No. A DMCA request is an enforcement workflow. ProtectOurBrand is not a law firm and does not provide legal advice unless expressly stated through a licensed attorney relationship."
      }
    ]
  },
  {
    slug: "fake-instagram-account-removal",
    title: "Fake Instagram Account Removal",
    metaTitle: "Fake Instagram Account Removal | ProtectOurBrand",
    metaDescription:
      "Learn how to document a fake Instagram account, collect impersonation evidence, and submit a careful platform report.",
    summary:
      "How brands and public figures can prepare evidence for fake Instagram account reporting.",
    sections: [
      {
        heading: "Capture the account before it changes",
        body:
          "Record the handle, profile URL, bio, profile image, posts, stories if visible, and any links the account promotes.",
        bullets: ["Profile URL", "Handle", "Screenshots", "Official account comparison", "Misleading links"]
      },
      {
        heading: "Match the report path to the evidence",
        body:
          "A fake account may fit impersonation, trademark, copyright, fraud, or platform policy channels depending on what the profile is doing."
      }
    ],
    faqs: [
      {
        question: "Can a fake account be reported if it blocks me?",
        answer:
          "Often yes, but evidence can be harder to capture. Use available screenshots, public URLs, and official identity references."
      }
    ]
  },
  {
    slug: "how-to-remove-stolen-product-images",
    title: "How to Remove Stolen Product Images",
    metaTitle: "How to Remove Stolen Product Images | ProtectOurBrand",
    metaDescription:
      "Learn how ecommerce brands can document stolen product images and pursue removal across marketplaces, websites, and search results.",
    summary:
      "A step-by-step evidence workflow for copied product photos and abusive listings.",
    sections: [
      {
        heading: "Start with the original image source",
        body:
          "Identify where the product images first appeared and collect ownership, licensing, or agency context before preparing a request."
      },
      {
        heading: "Document every infringing use",
        body:
          "Capture URLs, seller IDs, screenshots, product titles, and image comparisons so each marketplace or host can review a specific claim."
      },
      {
        heading: "Choose the correct channel",
        body:
          "A stolen image may be reported through marketplace IP portals, host abuse desks, platform copyright forms, or search result removal paths."
      }
    ],
    faqs: [
      {
        question: "Can copied product photos support a marketplace report?",
        answer:
          "Yes, when ownership and copying evidence are strong enough for the marketplace's reporting process."
      }
    ]
  },
  {
    slug: "how-to-report-counterfeit-listings",
    title: "How to Report Counterfeit Listings",
    metaTitle: "How to Report Counterfeit Listings | ProtectOurBrand",
    metaDescription:
      "Learn how to document counterfeit listings, seller details, copied photos, and marketplace abuse before submitting enforcement requests.",
    summary:
      "A practical workflow for building a marketplace counterfeit evidence file.",
    sections: [
      {
        heading: "Create a listing record",
        body:
          "Save the listing URL, seller name, marketplace ID, title, price, images, variants, and any visible claims about authenticity."
      },
      {
        heading: "Compare against official product evidence",
        body:
          "Use official product pages, authorized seller references, packaging details, and photo comparisons to explain why the listing should be reviewed."
      },
      {
        heading: "Track relisting patterns",
        body:
          "Counterfeit abuse can move between seller accounts. Keep a history of seller names, IDs, and similar listing language."
      }
    ],
    faqs: [
      {
        question: "Do marketplaces require trademark evidence?",
        answer:
          "Many do for counterfeit or brand misuse reports. Requirements vary by marketplace and claim type."
      }
    ]
  },
  {
    slug: "what-to-do-if-someone-cloned-your-website",
    title: "What to Do if Someone Cloned Your Website",
    metaTitle: "What to Do if Someone Cloned Your Website | ProtectOurBrand",
    metaDescription:
      "Learn how to document a clone website, identify abuse channels, and pursue host, registrar, platform, and search enforcement paths.",
    summary:
      "What to capture first when a fake website copies your brand, storefront, or landing pages.",
    sections: [
      {
        heading: "Preserve the clone evidence",
        body:
          "Capture screenshots, URLs, copied text, images, checkout pages, contact details, and any misleading claims before the site changes."
      },
      {
        heading: "Identify infrastructure",
        body:
          "Review domain, host, registrar, DNS, and search result records to determine which abuse channels may be reachable."
      },
      {
        heading: "Escalate carefully",
        body:
          "Clone sites can involve copyright, trademark, domain abuse, fraud, or platform policy issues. The evidence determines the best route."
      }
    ],
    faqs: [
      {
        question: "Should I contact the clone site owner?",
        answer:
          "That depends on risk and context. Many brands start by documenting evidence and using host, registrar, or platform channels."
      }
    ]
  },
  {
    slug: "how-search-deindexing-works",
    title: "How Search Deindexing Works",
    metaTitle: "How Search Deindexing Works | ProtectOurBrand",
    metaDescription:
      "Learn how search deindexing requests work for infringing URLs, copied content, scraper pages, and brand abuse in search results.",
    summary:
      "How deindexing can reduce visibility of abusive pages without necessarily removing the underlying page.",
    sections: [
      {
        heading: "Deindexing targets the search result",
        body:
          "A deindexing request asks a search engine to review whether a specific URL should remain visible in search results."
      },
      {
        heading: "The page may still exist",
        body:
          "If the host does not remove the page, the content may still be reachable directly even when a search engine limits the result."
      },
      {
        heading: "Evidence should be URL-specific",
        body:
          "Search engines review precise URLs, original source references, and the basis for the request."
      }
    ],
    faqs: [
      {
        question: "Is deindexing a substitute for host removal?",
        answer:
          "No. Deindexing can reduce search visibility, while host or platform action addresses the underlying page."
      }
    ]
  },
  {
    slug: "how-to-document-online-brand-abuse",
    title: "How to Document Online Brand Abuse",
    metaTitle: "How to Document Online Brand Abuse | ProtectOurBrand",
    metaDescription:
      "Learn what evidence to capture when documenting fake profiles, copied content, counterfeit listings, rogue domains, fake ads, and marketplace abuse.",
    summary:
      "An evidence-first checklist for teams responding to online brand abuse.",
    sections: [
      {
        heading: "Capture the basics",
        body:
          "Save URLs, screenshots, timestamps, account names, seller IDs, page titles, search results, and the original material being copied."
      },
      {
        heading: "Keep evidence organized",
        body:
          "Group findings by channel, threat type, priority, ownership basis, and submission status so enforcement work can be tracked."
      },
      {
        heading: "Avoid vague reports",
        body:
          "Specific, evidence-backed requests are easier for platforms, hosts, registrars, marketplaces, and search engines to review."
      }
    ],
    faqs: [
      {
        question: "Do screenshots matter?",
        answer:
          "Yes. Screenshots preserve what was visible at the time of review and help support URL-level submissions."
      }
    ]
  }
];

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
