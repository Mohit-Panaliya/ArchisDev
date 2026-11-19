import { Link } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import { CtaPanel } from "../components/CtaPanel";
import { Icon } from "../components/Icon";
import { SplitWords } from "../components/SplitWords";
import { pricingFaqs, services } from "../data/services";
import { site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Pricing() {
  usePageMeta({
    title: "Pricing — ArchisDev",
    description:
      "Transparent starting prices: landing pages ₹4,999, websites ₹7,999, e-commerce ₹14,999, apps ₹16,999, ERPNext & Odoo from ₹39,999, custom software on request.",
    path: "/pricing",
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
            <span aria-current="page">Pricing</span>
          </nav>

          <span className="label">
            <span className="label__dot" />
            Pricing, without the theatre
          </span>
          <SplitWords
            as="h1"
            className="page-hero__title"
            text="Real starting prices. Real scopes."
          />
          <p className="lead page-hero__lead">
            These are not teaser numbers. Each price is a deliverable starting scope — when your
            project needs more, you get an itemised quote before anything begins.
          </p>
          <div className="page-hero__meta">
            <span className="chip">No hidden fees</span>
            <span className="chip">Milestone payments</span>
            <span className="chip">You own everything</span>
            <span className="chip">30-day support included</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                Starting scopes
              </span>
              <SplitWords as="h2" className="section-title" text="Pick a starting point." />
            </div>
            <div className="section-head__aside">
              <p>
                Every tile lists what the starting price includes. Need a combination? We scope
                that too.
              </p>
            </div>
          </div>

          <div className="price-grid">
            {services.map((service) => (
              <article
                className={`price-tile ${service.accent ? "price-tile--accent" : ""}`.trim()}
                key={service.slug}
              >
                <div className="price-tile__head">
                  <h3 className="price-tile__name">{service.name}</h3>
                  <span className="price-tile__index">{service.index}</span>
                </div>
                <div className="price-tile__price">
                  <small>{service.priceLabel}</small>
                  <b>{service.priceAmount}</b>
                </div>
                <p className="price-tile__desc">{service.short}</p>
                <ul className="price-tile__features">
                  {service.includes.slice(0, 4).map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="price-tile__foot">
                  <span>{service.timeline}</span>
                  <Link to={`/services/${service.slug}`}>
                    Details <Icon name="arrowUpRight" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="pricing-note">
            <div className="note-band">
              <Icon name="spark" />
              <span>
                <strong>What is not included:</strong> third-party costs such as domains, hosting,
                payment gateway fees, app store fees and premium assets. These are always listed
                upfront and stay in your name.
              </span>
            </div>
            <div className="note-band">
              <Icon name="shield" />
              <span>
                <strong>How payments work:</strong> typically 40–50% to start, the balance across
                milestones, and the final payment before handover. Larger ERP and custom builds are
                split into phases.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                At a glance
              </span>
              <SplitWords as="h2" className="section-title" text="Compare the starting scopes." />
            </div>
            <div className="section-head__aside">
              <p>
                Exact deliverables differ by project — the service pages list everything included in
                each starting scope.
              </p>
            </div>
          </div>

          <div className="compare">
            <table>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Starting from</th>
                  <th scope="col">Typical timeline</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.slug}>
                    <td>{service.name}</td>
                    <td>{service.goodFor}</td>
                    <td className="compare__price">{service.priceAmount}</td>
                    <td className="compare__time">{service.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-layout">
          <div className="faq-aside">
            <span className="label">
              <span className="label__dot" />
              Pricing FAQ
            </span>
            <SplitWords as="h2" className="section-title" text="Fair questions about money." />
            <div className="faq-aside__card">
              <p>
                Need a formal estimate, an NDA or a purchase-order process? Send the details and we
                will follow your procurement flow.
              </p>
              <a className="faq-aside__mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
          <div>
            <Accordion items={pricingFaqs} />
          </div>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Get a written quote. <span>Not a vague range.</span>
          </>
        }
        copy="Share your requirements and we will come back with scope, timeline and price — with the assumptions written down so everyone is comparing the same thing."
      />
    </>
  );
}
