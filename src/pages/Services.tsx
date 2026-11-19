import { Link } from "react-router-dom";
import { CtaPanel } from "../components/CtaPanel";
import { Icon } from "../components/Icon";
import { SplitWords } from "../components/SplitWords";
import { services } from "../data/services";
import { site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

const engagementModels = [
  {
    num: "01",
    title: "Fixed-scope project",
    copy: "A defined outcome, a written scope and a milestone-based quote. Best for landing pages, company sites, stores and first-phase systems.",
    note: "From ₹4,999",
    icon: "target" as const,
  },
  {
    num: "02",
    title: "Discovery + phased build",
    copy: "We start with a short paid discovery to map processes and architecture, then implement in phases you can stop, review or expand.",
    note: "ERP & custom software",
    icon: "layers" as const,
  },
  {
    num: "03",
    title: "Ongoing partnership",
    copy: "A monthly retainer for maintenance, improvements, integrations and priority support — with a clear list of what is covered.",
    note: "Monthly · no lock-in",
    icon: "clock" as const,
  },
];

export default function Services() {
  usePageMeta({
    title: "Services & pricing — ArchisDev",
    description:
      "Landing pages from ₹4,999, websites from ₹7,999, e-commerce from ₹14,999, apps from ₹16,999, ERPNext & Odoo implementation from ₹39,999, and custom software scoped on request.",
    path: "/services",
  });

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="page-hero__grid-bg" aria-hidden="true" />
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Services</span>
          </nav>

          <span className="label">
            <span className="label__dot" />
            Services & transparent pricing
          </span>
          <SplitWords
            as="h1"
            className="page-hero__title"
            text="Everything you need to ship. Nothing you don't."
          />
          <p className="lead page-hero__lead">
            Six focused services, priced from the start. Each one is delivered by the founders —
            {site.name} stays small on purpose, so the people who scope your project are the people
            who build it.
          </p>
          <div className="page-hero__meta">
            {services.map((service) => (
              <a href={`#${service.slug}`} className="chip" key={service.slug}>
                {service.navName}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="note-band" style={{ marginBottom: 28 }}>
            <Icon name="spark" />
            <span>
              <strong>Starting prices are real scopes.</strong> When a project needs more pages,
              modules or integrations, you get a written quote before any work begins — itemised,
              with third-party costs listed separately.
            </span>
          </div>

          <div className="services-index" id="services-list">
            <div className="services-index__head" aria-hidden="true">
              <span>No.</span>
              <span>Service</span>
              <span>Investment</span>
              <span />
            </div>

            {services.map((service) => (
              <Link
                to={`/services/${service.slug}`}
                className="service-row"
                key={service.slug}
                id={service.slug}
              >
                <span className="service-row__index">{service.index}</span>
                <span>
                  <span className="service-row__name">{service.name}</span>
                  <span className="service-row__desc">{service.short}</span>
                </span>
                <span className="service-row__price">
                  {service.priceLabel}
                  <b>{service.priceAmount}</b>
                </span>
                <span className="service-row__arrow">
                  <Icon name="arrowUpRight" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                How we engage
              </span>
              <SplitWords
                as="h2"
                className="section-title"
                text="Three ways to work together."
              />
            </div>
            <div className="section-head__aside">
              <p>
                Most projects start fixed-scope. Larger systems move into phased delivery once the
                architecture is clear.
              </p>
              <Link to="/pricing" className="link-arrow">
                Full pricing guide <Icon name="arrowUpRight" />
              </Link>
            </div>
          </div>

          <div className="engagement-grid">
            {engagementModels.map((model) => (
              <article className="engagement-card" key={model.num}>
                <div className="engagement-card__top">
                  <span className="engagement-card__num">{model.num}</span>
                  <span className="engagement-card__icon">
                    <Icon name={model.icon} />
                  </span>
                </div>
                <h3 className="engagement-card__title">{model.title}</h3>
                <p className="engagement-card__copy">{model.copy}</p>
                <span className="engagement-card__note">{model.note}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Not sure which service fits? <span>Tell us the outcome.</span>
          </>
        }
        copy="Describe the result you need. We will recommend the smallest sensible scope — and tell you honestly if a different kind of team would serve you better."
      />
    </>
  );
}
