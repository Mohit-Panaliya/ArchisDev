import type { IconName } from "../components/Icon";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  index: string;
  name: string;
  navName: string;
  short: string;
  tagline: string;
  description: string[];
  priceAmount: string;
  priceLabel: string;
  priceNote: string;
  timeline: string;
  icon: IconName;
  accent?: boolean;
  wide?: boolean;
  tags: string[];
  deliverables: { title: string; copy: string }[];
  includes: string[];
  fit: string[];
  tech: string[];
  goodFor: string;
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "landing-pages",
    index: "01",
    name: "Landing Pages",
    navName: "Landing Pages",
    short: "A sharp, single-page site engineered around one goal — more enquiries, signups or sales.",
    tagline: "One page. One goal. Built to convert.",
    description: [
      "A landing page is not a brochure. It is a focused argument for why someone should act — and every section, scroll and animation should earn the next second of attention.",
      "We design the page around your conversion goal, shape the flow, build the interactions, then test it on real phones. You get a page that loads fast, looks like nobody else's and makes saying yes easy.",
    ],
    priceAmount: "₹4,999",
    priceLabel: "Starting from",
    priceNote:
      "Final quote depends on sections, content and integrations. Domain and hosting are billed at actuals.",
    timeline: "5–7 days",
    icon: "layout",
    tags: ["1 page", "Conversion-led", "Fast launch"],
    deliverables: [
      {
        title: "Conversion-led structure",
        copy: "Message hierarchy and section flow built around a single action.",
      },
      {
        title: "Custom visual design",
        copy: "No recycled template — a direction designed for your brand and audience.",
      },
      {
        title: "Motion & microinteractions",
        copy: "Scroll reveals, hover states and transitions that guide attention.",
      },
      {
        title: "Lead capture",
        copy: "Validated forms wired to email or CRM, plus a WhatsApp click-to-chat CTA.",
      },
      {
        title: "SEO & social previews",
        copy: "Clean semantics, meta tags, Open Graph cards and analytics.",
      },
      {
        title: "Launch ready",
        copy: "Responsive build, performance pass, deployment and a walkthrough.",
      },
    ],
    includes: [
      "1 custom-designed page",
      "Up to 5 core sections",
      "Mobile-first responsive build",
      "Scroll & hover interactions",
      "Lead form + WhatsApp CTA",
      "On-page SEO + analytics",
      "Deployed and live",
    ],
    fit: [
      "You are launching a product, campaign or service and need a page that converts.",
      "Your current page looks generic and explains too much without asking for anything.",
      "You want something live in days, not months.",
    ],
    tech: ["React", "GSAP", "Vite", "Netlify"],
    goodFor: "Campaigns, product launches, service businesses",
    faqs: [
      {
        q: "What do you need from me to start?",
        a: "Your logo if you have one, the offer, target audience and any existing brand assets. We can guide the structure and copy direction — we do not write full brand copy from scratch, but we make the page work with what you have.",
      },
      {
        q: "Do I own the design and code?",
        a: "Yes. On final payment, the design files and source code are yours, and every account we create is set up in your name.",
      },
      {
        q: "What is not included?",
        a: "Domain and hosting fees, premium photography, and any third-party subscriptions. We will recommend sensible, low-cost options and set the page up on accounts you own.",
      },
      {
        q: "Can the form connect to my CRM?",
        a: "Yes — forms can post to your CRM, email service or WhatsApp. Standard email delivery is included; deeper CRM or automation integrations are quoted if they need custom work.",
      },
    ],
  },
  {
    slug: "website-development",
    index: "02",
    name: "Website Development",
    navName: "Website Development",
    short: "A complete multi-page website that makes your business look as sharp as the work you do.",
    tagline: "A complete digital presence, engineered properly.",
    description: [
      "Your website is the first meeting most customers will ever have with you. It should load fast, explain what you do in seconds, and make the next step obvious.",
      "From sitemap to launch: custom design, a responsive build, content structure, technical SEO, analytics and a CMS if your team needs to update things without a developer. You will see a staging link before anything goes live.",
    ],
    priceAmount: "₹7,999",
    priceLabel: "Starting from",
    priceNote:
      "Starting scope includes up to 6–8 pages. Larger content structures, copywriting and advanced integrations are quoted transparently.",
    timeline: "2–3 weeks",
    icon: "globe",
    tags: ["Multi-page", "Responsive", "SEO foundations"],
    deliverables: [
      {
        title: "Sitemap & content structure",
        copy: "Pages, navigation and hierarchy mapped before design starts.",
      },
      {
        title: "Custom design system",
        copy: "Typography, colour, components and layouts that stay consistent as you grow.",
      },
      {
        title: "Responsive build",
        copy: "Tested on real phones, tablets and desktops — not just resized in a browser.",
      },
      {
        title: "Motion & microinteractions",
        copy: "Purposeful scroll animation and hover detail that make the site feel considered.",
      },
      {
        title: "Technical SEO",
        copy: "Semantic markup, meta tags, sitemap, speed and shareability basics done right.",
      },
      {
        title: "CMS-ready content",
        copy: "Optional CMS so your team can edit pages, posts and case studies.",
      },
      {
        title: "Analytics & forms",
        copy: "Conversion tracking, enquiry forms and reliable email delivery.",
      },
      {
        title: "Staging & handover",
        copy: "A review link, deployment, walkthrough and documentation you can keep.",
      },
    ],
    includes: [
      "Up to 8 custom pages",
      "Design system + responsive build",
      "Scroll animations & interactions",
      "CMS-ready content structure",
      "Technical SEO foundations",
      "Contact forms + analytics",
      "Staging review & walkthrough",
      "Live in 2–3 weeks",
    ],
    fit: [
      "Your website feels outdated and you are embarrassed to send it to clients.",
      "You need a professional presence with clear service, work and contact pages.",
      "You want a site you can update without calling a developer every time.",
    ],
    tech: ["React", "TypeScript", "GSAP", "WordPress / CMS"],
    goodFor: "Service businesses, studios, consultancies, B2B",
    faqs: [
      {
        q: "How many pages are included?",
        a: "The starting scope covers up to 6–8 pages — typically home, services, about, work, and contact plus a few detail pages. Larger sites, blogs and landing page sets are quoted based on the final sitemap.",
      },
      {
        q: "Will I be able to edit the content?",
        a: "If you need to update it regularly, yes. We can build on a CMS or add a lightweight content layer so your team edits text and images without touching code. A fully static site is an option if content changes rarely.",
      },
      {
        q: "Will my site rank on Google?",
        a: "We build the technical foundation — semantics, speed, metadata, sitemaps and clean URLs. Rankings also depend on content, competition and consistency. We can recommend an SEO plan but do not promise positions.",
      },
      {
        q: "Can you redesign an existing site?",
        a: "Yes. We audit what is working, preserve any search equity and rebuild the experience. Content migration is part of the scope once we know the current structure.",
      },
    ],
  },
  {
    slug: "ecommerce",
    index: "03",
    name: "E-Commerce Development",
    navName: "E-Commerce",
    short: "A store that sells while you sleep — catalogue, cart, checkout, payments and orders in one flow.",
    tagline: "A storefront built to sell, not just to exist.",
    description: [
      "An e-commerce build is logistics as much as design: product structure, pricing rules, payments, shipping, notifications and returns. We wire the full journey — then test it with real orders before launch.",
      "You get a fast storefront your customers trust and an admin your team can actually run. Payments, shipping, coupons, order emails and analytics included — configured for how you sell.",
    ],
    priceAmount: "₹14,999",
    priceLabel: "Starting from",
    priceNote:
      "Starting scope covers up to ~500 simple products. Payment gateway fees, photography, licences and complex courier integrations are billed separately.",
    timeline: "3–4 weeks",
    icon: "bag",
    tags: ["Storefront", "Payments", "Order ops"],
    deliverables: [
      {
        title: "Storefront design",
        copy: "Home, collection, product and checkout flows designed for trust and speed.",
      },
      {
        title: "Catalogue setup",
        copy: "Products, variants, categories, pricing and bulk import of existing data.",
      },
      {
        title: "Cart & checkout",
        copy: "A short, tested checkout with coupons, shipping options and order confirmation.",
      },
      {
        title: "Payments",
        copy: "Razorpay, Stripe, PayPal or UPI-based gateways integrated and tested.",
      },
      {
        title: "Shipping & tax",
        copy: "Zone-based rates, tax rules and tracking details with your fulfilment process.",
      },
      {
        title: "Order notifications",
        copy: "Transactional emails and status updates for customers and your team.",
      },
      {
        title: "Admin & analytics",
        copy: "Orders, stock and revenue visibility, plus conversion tracking.",
      },
      {
        title: "ERP-ready",
        copy: "Optional sync with ERPNext or Odoo for stock, invoices and fulfilment.",
      },
    ],
    includes: [
      "Custom storefront design",
      "Catalogue, variants & bulk import",
      "Cart, checkout & order emails",
      "Payment gateway integration",
      "Shipping & tax configuration",
      "Admin & sales analytics",
      "Up to ~500 products configured",
      "Launch in 3–4 weeks",
    ],
    fit: [
      "You sell physical or digital products and need a real store, not just a catalogue.",
      "You are moving from social media DMs or a marketplace to your own storefront.",
      "You need order, stock and payment data in one place.",
    ],
    tech: ["Commerce platform", "Razorpay / Stripe", "ERPNext sync", "React"],
    goodFor: "D2C brands, retailers, wholesale stores",
    faqs: [
      {
        q: "Which payment gateways can you integrate?",
        a: "Razorpay, Stripe, PayPal and UPI-based providers are all possible. You keep the merchant account in your name — we integrate, test and hand over the credentials.",
      },
      {
        q: "Can you import my existing products?",
        a: "Yes. We can import products and variants from a spreadsheet or your current platform. Basic cleanup and mapping are included; messy or very large catalogues are quoted after a sample review.",
      },
      {
        q: "Can the store sync with ERPNext or Odoo?",
        a: "Yes. If you run an ERP, we can sync products, stock, orders and invoices so the storefront and back office stay aligned. This is scoped as an add-on.",
      },
      {
        q: "Do you handle shipping integration?",
        a: "We configure shipping zones and rates, and can integrate courier APIs for live rates and tracking where available. Courier account fees and complex multi-warehouse rules are quoted separately.",
      },
    ],
  },
  {
    slug: "app-development",
    index: "04",
    name: "App Development",
    navName: "App Development",
    short: "Native-feeling iOS and Android apps built from one codebase, connected to real APIs.",
    tagline: "Your product in their pocket.",
    description: [
      "We build cross-platform apps with Flutter or React Native — one codebase, two stores, interactions that feel native. Authentication, notifications, payments, maps or whatever your product needs, wired to a backend that can handle real usage.",
      "We handle the engineering and guide you through store submission and the small details that get apps approved. You keep the product decisions.",
    ],
    priceAmount: "₹16,999",
    priceLabel: "Starting from",
    priceNote:
      "Starting scope covers a focused app with core flows and standard integrations. Complex backends, real-time features and store compliance are scoped after discovery.",
    timeline: "4–6 weeks",
    icon: "smartphone",
    tags: ["iOS + Android", "Cross-platform", "API-driven"],
    deliverables: [
      {
        title: "Product & UX flows",
        copy: "Screen maps, core journeys and the decisions that define the first release.",
      },
      {
        title: "Custom app UI",
        copy: "A distinctive interface designed for small screens and real thumbs.",
      },
      {
        title: "Cross-platform build",
        copy: "Flutter or React Native — one codebase for iOS and Android.",
      },
      {
        title: "Backend & APIs",
        copy: "Authentication, data models, APIs and integration with existing systems.",
      },
      {
        title: "Push notifications",
        copy: "Transactional and engagement notifications wired to your backend.",
      },
      {
        title: "Testing & release builds",
        copy: "Staging and release builds tested on real devices.",
      },
      {
        title: "Store submission support",
        copy: "Asset preparation, privacy details and guidance through review.",
      },
      {
        title: "Analytics & crash reporting",
        copy: "Visibility into usage and failures from day one.",
      },
    ],
    includes: [
      "iOS + Android from one codebase",
      "Custom UI & user flows",
      "Backend/API integration",
      "Authentication & user accounts",
      "Push notifications",
      "Testing on real devices",
      "Store submission support",
      "Launch in 4–6 weeks",
    ],
    fit: [
      "You need an app for customers, field staff or internal operations.",
      "Your product needs offline-friendly flows, notifications or device features.",
      "You want one codebase instead of two separate native teams.",
    ],
    tech: ["Flutter", "React Native", "REST APIs", "Firebase"],
    goodFor: "Startups, field operations, customer apps",
    faqs: [
      {
        q: "Do you build separate iOS and Android apps?",
        a: "We use Flutter or React Native — one codebase that ships to both stores. This keeps cost and maintenance lower while still delivering a native-feeling experience.",
      },
      {
        q: "Do you build the backend too?",
        a: "Yes, if you need one. We can build APIs and data models as part of the scope, or integrate with your existing backend and services.",
      },
      {
        q: "What is not included in the starting price?",
        a: "Apple and Google developer accounts, store fees, third-party subscriptions and any compliance work specific to regulated industries. We list these clearly before we start.",
      },
      {
        q: "How long does store approval take?",
        a: "Usually a few days to two weeks depending on the store and completeness. We prepare the submission and assets with you so review is less likely to bounce back.",
      },
    ],
  },
  {
    slug: "erp-development",
    index: "05",
    name: "ERP Development",
    navName: "ERP Development",
    short:
      "ERPNext & Odoo implementation — CRM, sales, inventory, accounts, HR and everything in between.",
    tagline: "ERPNext & Odoo, implemented around how you actually work.",
    description: [
      "Most ERP projects fail because the software is forced onto broken processes. We start with how your business actually runs — leads, quotes, purchasing, stock, production, dispatch, accounts — then configure the ERP to fit, not the other way around.",
      "We implement ERPNext and Odoo end to end: discovery, module setup, custom development, data migration, user training and post-go-live support. CRM, sales, purchase, inventory, manufacturing, accounting, HR, projects and helpdesk — chosen deliberately, not switched on blindly.",
    ],
    priceAmount: "₹39,999",
    priceLabel: "Implementation from",
    priceNote:
      "Implementation starts at ₹39,999. Final scope depends on modules, users, data volume and customisation. Odoo Enterprise licences (if chosen) are billed separately.",
    timeline: "4–8 weeks",
    icon: "boxes",
    accent: true,
    wide: true,
    tags: ["ERPNext", "Odoo", "CRM", "Implementation"],
    deliverables: [
      {
        title: "Process discovery",
        copy: "A clear map of how sales, purchasing, stock, production and accounts really flow.",
      },
      {
        title: "Module mapping & setup",
        copy: "Only the modules you need — configured for your roles, taxes and terminology.",
      },
      {
        title: "Custom modules",
        copy: "DocTypes, workflows, reports and automations specific to your business.",
      },
      {
        title: "Data migration",
        copy: "Customers, suppliers, products, opening balances and history migrated carefully.",
      },
      {
        title: "Users & permissions",
        copy: "Role-based access so people see exactly what they should — nothing more.",
      },
      {
        title: "Accounting configuration",
        copy: "Chart of accounts, taxes, invoicing and payment flows aligned with your CA.",
      },
      {
        title: "Training & documentation",
        copy: "Hands-on sessions and simple SOPs for the people using the system daily.",
      },
      {
        title: "Go-live & support",
        copy: "Cutover support, backups and a stabilisation window after launch.",
      },
    ],
    includes: [
      "Process discovery & module map",
      "ERPNext or Odoo implementation",
      "CRM, sales & purchase setup",
      "Inventory & accounting configuration",
      "Data migration (standard scope)",
      "Custom modules & reports",
      "Training & documentation",
      "Post-go-live support window",
    ],
    fit: [
      "Your business runs on spreadsheets, WhatsApp and disconnected software.",
      "You need CRM, stock, purchasing and accounts to share the same data.",
      "You already use ERPNext or Odoo but need customisation, fixes or new modules.",
      "You want an implementation partner who understands operations, not just code.",
    ],
    tech: ["ERPNext", "Odoo", "Frappe", "Python", "MariaDB / PostgreSQL"],
    goodFor: "Manufacturing, retail, distribution, services",
    faqs: [
      {
        q: "ERPNext or Odoo — which one should we choose?",
        a: "It depends on your processes, budget and appetite for customisation. Both are capable. We look at manufacturing depth, accounting, e-commerce needs and hosting preferences, then recommend one with reasons instead of forcing a favourite.",
      },
      {
        q: "Which modules can you implement?",
        a: "CRM, sales, purchase, inventory, manufacturing, accounting, HR and payroll, projects, helpdesk, POS, quality, assets, maintenance, subscriptions and custom modules. We configure only what your team will actually use.",
      },
      {
        q: "Can you migrate from Tally, Excel or another ERP?",
        a: "Yes. We migrate masters, opening balances and relevant history. The effort depends on data quality and volume, so migration is scoped after we review samples of your existing data.",
      },
      {
        q: "Can you improve an existing ERPNext or Odoo setup?",
        a: "Yes. We audit the current instance, fix configuration and performance issues, and build the missing customisations. You do not need to start over to get value from what you already have.",
      },
      {
        q: "What about hosting and backups?",
        a: "We can set up cloud or VPS hosting, SSL, automated backups and monitoring. Hosting costs are billed at actuals; the setup and maintenance process is documented for your team.",
      },
    ],
  },
  {
    slug: "custom-software",
    index: "06",
    name: "Custom Software",
    navName: "Custom Software",
    short: "Internal tools, portals, SaaS products and integrations — scoped around your actual workflow.",
    tagline: "When off-the-shelf stops fitting, we build the fit.",
    description: [
      "Some problems do not fit a template: an internal portal, a quoting engine, a partner dashboard, a SaaS MVP or automation between systems that were never meant to talk. That is where custom software earns its keep.",
      "We start with the workflow and the economics, then design the smallest complete system that solves the problem — clean architecture, real security, documented code and a team you can keep building with.",
    ],
    priceAmount: "Custom quote",
    priceLabel: "Scoped per project",
    priceNote:
      "Custom software is quoted after a discovery call and written scope. Fixed-scope and milestone-based engagements are both available.",
    timeline: "4–12 weeks",
    icon: "code",
    wide: true,
    tags: ["Web apps", "Internal tools", "Integrations", "SaaS"],
    deliverables: [
      {
        title: "Discovery & scope",
        copy: "Problem framing, users, constraints and a written scope with milestones.",
      },
      {
        title: "Architecture",
        copy: "Data model, APIs, security boundaries and infrastructure decisions.",
      },
      {
        title: "Product design",
        copy: "Flows and interfaces built for the people doing the work every day.",
      },
      {
        title: "Custom development",
        copy: "Web apps, portals, dashboards, automation and integrations.",
      },
      {
        title: "Quality assurance",
        copy: "Testing on real workflows, edge cases and realistic data volumes.",
      },
      {
        title: "Deployment & documentation",
        copy: "Production deployment, documentation and a clean handover.",
      },
    ],
    includes: [
      "Discovery workshop & written scope",
      "Custom web app or portal",
      "API & third-party integrations",
      "Role-based access & security",
      "Automation & reporting",
      "Staging reviews each sprint",
      "Documentation & handover",
      "Ongoing support available",
    ],
    fit: [
      "Your team runs a critical process in spreadsheets or email threads.",
      "You need software that fits your workflow instead of changing how you work.",
      "You need integrations between systems that were never designed to connect.",
      "You are building an MVP and want a serious technical partner.",
    ],
    tech: ["React", "Node.js", "Python", "PostgreSQL", "ERPNext / Odoo"],
    goodFor: "Operations, SaaS MVPs, internal tools, integration",
    faqs: [
      {
        q: "How do you quote custom software?",
        a: "After a discovery call, we send a written scope with features, milestones and a fixed quote where possible. If scope is genuinely uncertain, we propose a paid discovery phase first so nobody is guessing.",
      },
      {
        q: "Can you integrate with our ERP?",
        a: "Yes — ERPNext, Odoo and most systems with an API. We have implemented CRM, sales, inventory and accounting workflows, and we can build the glue between new software and existing systems.",
      },
      {
        q: "Who owns the code and IP?",
        a: "You do, on final payment. We work with your accounts, your repositories and your infrastructure, and we do not lock you into us.",
      },
      {
        q: "Will you sign an NDA?",
        a: "Yes. If you need one before sharing details, send it across and we will review and sign before the first working session.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);

export const homeFaqs: Faq[] = [
  {
    q: "How do the starting prices actually work?",
    a: "Each starting price is a real scope, not a bait price: the base scope for a landing page includes one designed page, core sections, motion, a lead form and launch. Every starting price is listed on the pricing page. If your scope is larger we send a written quote before any work starts, itemised by pages, modules and integrations.",
  },
  {
    q: "How soon can we start?",
    a: "We take a limited number of projects at a time so every build gets senior attention. Share a few lines about your project and we will reply within one business day with availability and the next step.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work remotely with clients worldwide from Anand, Gujarat (IST). Calls can be scheduled around your timezone during the discovery and design phases.",
  },
  {
    q: "Who owns the code, design and accounts?",
    a: "You do. Projects are delivered with source code and design files, and domains, hosting, payment gateways and app store accounts are created in your name.",
  },
  {
    q: "Can you take over an existing website or ERP?",
    a: "Yes. We audit the current setup first, document what we find, then agree on a stabilisation and improvement plan. You do not need to rebuild everything to make progress.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a 30-day support window for fixes and questions. After that, we offer flexible monthly retainers for maintenance, new features and improvements — no lock-in required.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why are the prices so transparent?",
    a: "Because vague pricing wastes everyone's time. The starting prices on this site reflect real, deliverable scopes. When your requirements go beyond them, we explain exactly what changes and why before you commit.",
  },
  {
    q: "What can change the final quote?",
    a: "Page count, custom integrations, content production, data migration, third-party licences, timeline urgency and the number of review rounds. Every quote lists what is included and what is not.",
  },
  {
    q: "How do payments work?",
    a: "Typically 40–50% to start and the balance across milestones, with the final payment before handover. Large ERP and custom builds are split into phases. We invoice in INR and share a simple scope note with each payment.",
  },
  {
    q: "Are there hidden costs?",
    a: "No hidden fees from us. Third-party costs — domains, hosting, payment gateway fees, app store fees, premium images or licences — are listed upfront and stay in your name.",
  },
  {
    q: "Do you offer support plans?",
    a: "Yes. A 30-day support window is included with builds. After that, monthly retainers cover maintenance, small enhancements and priority response, based on the level of support you need.",
  },
];

export const workFaqs: Faq[] = [
  {
    q: "Are these real client projects?",
    a: "These are representative builds and capability demos from our team's work. Some client names are withheld by agreement. Full walkthroughs and references can be shared during a call.",
  },
  {
    q: "Can I see a live demo?",
    a: "For many of our ERP and app builds we can arrange a guided walkthrough of a staging or demo environment. Tell us which type of system you want to see and we will suggest the closest fit.",
  },
  {
    q: "Do you work on white-label projects for agencies?",
    a: "Yes. We can work behind your brand with NDAs and clear delivery responsibilities. White-label arrangements are scoped like any other custom project.",
  },
];
