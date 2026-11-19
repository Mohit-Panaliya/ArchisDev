export const site = {
  name: "ArchisDev",
  legalName: "ArchisDev",
  tagline: "Digital architecture for ambitious businesses.",
  description:
    "We design and engineer websites, e-commerce, mobile apps, ERPNext & Odoo implementations and custom software — with transparent starting prices.",
  url: "https://mohit-panaliya.github.io/ArchisDev",
  email: "hello@archisdev.com",
  location: "Anand, Gujarat, India",
  timezone: "IST · UTC+5:30",
  availability: "Available for new projects",
  founded: "2026",
  github: "https://github.com/Mohit-Panaliya",
  nav: [
    { label: "Services", to: "/services" },
    { label: "Pricing", to: "/pricing" },
    { label: "Work", to: "/work" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
};

export const founders = [
  {
    name: "Mohit P",
    role: "Co-founder",
    monogram: "MP",
    bio: "Co-leads ArchisDev with a focus on ERP and delivery. Years of hands-on experience implementing business systems and shipping the modules teams live inside — CRM, sales, purchase, inventory, accounts and beyond.",
    focus: ["ERPNext", "Odoo", "CRM", "Implementation"],
  },
  {
    name: "Imran A",
    role: "Co-founder",
    monogram: "IA",
    bio: "Co-leads ArchisDev on the engineering side. Builds the systems behind the systems — applications, integrations and custom modules — with a bias for clean architecture and interfaces that feel effortless.",
    focus: ["Custom software", "Apps", "APIs", "ERP modules"],
  },
];

export const stats = [
  { value: 6, pad: 2, suffix: "", label: "Services, one team", note: "Landing pages to full ERP implementations." },
  { value: 40, pad: 0, suffix: "+", label: "ERP modules", note: "CRM, sales, inventory, accounts and more." },
  { value: 2, pad: 2, suffix: "", label: "Founders in every project", note: "The people you meet are the people who build." },
  { value: 0, pad: 2, suffix: "", label: "Hand-offs between teams", note: "No account managers. No telephone game." },
];

export const erpModules = [
  ["CRM", "Sales", "Purchase", "Inventory", "Manufacturing", "Accounting", "HR & Payroll", "Projects"],
  [
    "Helpdesk",
    "POS",
    "Quality",
    "Assets",
    "Maintenance",
    "Subscriptions",
    "Website",
    "Custom Modules",
  ],
];

export const stackMarquee = [
  "ERPNext",
  "Odoo",
  "Frappe",
  "Python",
  "React",
  "TypeScript",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "Docker",
  "AWS",
];

export const processSteps = [
  {
    num: "01",
    tag: "1–3 days",
    title: "Discover",
    copy: "We start with how your business actually runs — not a template brief. Goals, workflows, constraints and what success looks like.",
    list: ["Goals & success metrics", "Workflow mapping", "Scope & ballpark estimate"],
  },
  {
    num: "02",
    tag: "2–4 days",
    title: "Architect",
    copy: "The blueprint before the build. Information architecture, data model, module map and the stack that fits the job.",
    list: ["Sitemap & user flows", "Technical architecture", "Written scope & timeline"],
  },
  {
    num: "03",
    tag: "3–7 days",
    title: "Design",
    copy: "A distinct visual direction, key screens and a motion language — reviewed together before engineering starts.",
    list: ["Design direction", "Key screens & prototype", "Motion & interaction spec"],
  },
  {
    num: "04",
    tag: "2–6 weeks",
    title: "Build",
    copy: "Focused sprints with weekly demos and a staging link you can click, share and test on your own devices.",
    list: ["Weekly demos", "Staging environment", "QA on real devices"],
  },
  {
    num: "05",
    tag: "Ongoing",
    title: "Launch & support",
    copy: "Deployment, data migration, training and a support window after go-live. We don't disappear at handover.",
    list: ["Deployment & DNS", "Training & documentation", "30-day support window"],
  },
];
