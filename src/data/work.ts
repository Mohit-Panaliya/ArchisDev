export type WorkCategory = "ERP" | "Web" | "Commerce" | "Apps";

export type WorkVariant = "dashboard" | "site" | "app" | "commerce" | "pipeline";

export type WorkItem = {
  id: string;
  title: string;
  category: WorkCategory;
  meta: string;
  description: string;
  tags: string[];
  visual: WorkVariant;
  layout: "feature" | "normal" | "half";
};

export const workItems: WorkItem[] = [
  {
    id: "retail-erp",
    title: "Retail ERP, without the spreadsheet tax",
    category: "ERP",
    meta: "ERPNext · Retail",
    description:
      "POS, purchasing, stock and accounts sharing one source of truth — with a CRM that knows every customer's order history.",
    tags: ["ERPNext", "POS", "Inventory", "CRM"],
    visual: "dashboard",
    layout: "feature",
  },
  {
    id: "fleetline",
    title: "Every delivery, on one live map",
    category: "Apps",
    meta: "Flutter · Logistics",
    description:
      "A driver app and operations dashboard with live tracking, route status and customer notifications.",
    tags: ["Flutter", "Maps", "Push"],
    visual: "app",
    layout: "normal",
  },
  {
    id: "savor",
    title: "Fine dining, plated for the web",
    category: "Web",
    meta: "React · Hospitality",
    description:
      "An atmospheric restaurant site with menu management and reservations that actually reach the host stand.",
    tags: ["React", "GSAP", "Reservations"],
    visual: "site",
    layout: "half",
  },
  {
    id: "northline",
    title: "Wholesale ordering, made self-serve",
    category: "Commerce",
    meta: "B2B Commerce · Distribution",
    description:
      "A wholesale portal with customer-specific pricing, credit limits and direct ERP sync for stock and invoices.",
    tags: ["B2B Commerce", "Payments", "ERP sync"],
    visual: "commerce",
    layout: "half",
  },
  {
    id: "pipeline-crm",
    title: "A CRM that matches the sales floor",
    category: "ERP",
    meta: "ERPNext · Sales",
    description:
      "Leads, follow-ups and quotations designed around real sales calls — not a generic funnel nobody updates.",
    tags: ["CRM", "ERPNext", "Automation"],
    visual: "pipeline",
    layout: "normal",
  },
  {
    id: "forgeworks",
    title: "Production visibility from quote to dispatch",
    category: "ERP",
    meta: "Odoo · Manufacturing",
    description:
      "BOMs, work orders, quality checks and on-time tracking for a manufacturing floor running multiple product lines.",
    tags: ["Odoo", "Manufacturing", "Quality"],
    visual: "dashboard",
    layout: "feature",
  },
];
