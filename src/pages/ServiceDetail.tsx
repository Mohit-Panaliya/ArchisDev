import { Link, useParams } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import { CtaPanel } from "../components/CtaPanel";
import { Icon } from "../components/Icon";
import { Magnetic } from "../components/Magnetic";
import { SplitWords } from "../components/SplitWords";
import { getService, services, type Service } from "../data/services";
import { usePageMeta } from "../hooks/usePageMeta";
import NotFound from "./NotFound";

function ServiceDetail({ service }: { service: Service }) {
  usePageMeta({
    title: `${service.name} — ArchisDev`,
    description: `${service.short} ${service.priceLabel} ${service.priceAmount}. ${service.priceNote}`,
    path: `/services/${service.slug}`,
  });

  const related = services.filter((entry) => entry.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="detail-hero">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </nav>

          <div className="detail-hero__grid">
            <div>
              <span className="label detail-hero__label">
                <span className="label__num">/{service.index}</span>
                {service.tags[0]} · {service.tags[1]}
              </span>
              <SplitWords as="h1" className="detail-hero__title" text={service.name} />
              <p className="detail-hero__lead">
                <strong style={{ color: "var(--ink)" }}>{service.tagline}</strong> {service.short}
              </p>
              <div className="detail-hero__meta">
                <span className="tag">{service.timeline}</span>
                <span className="tag">{service.goodFor}</span>
                {service.tags.slice(1, 3).map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className="price-card">
              <span className="price-card__label">{service.priceLabel}</span>
              <div
                className={`price-card__value ${
                  service.priceAmount.length > 9 ? "price-card__value--text" : ""
                }`.trim()}
              >
                {service.priceAmount}
              </div>
              <p className="price-card__note">{service.priceNote}</p>
              <div className="price-card__rows">
                <div className="price-card__row">
                  <span>Timeline</span>
                  <strong>{service.timeline}</strong>
                </div>
                <div className="price-card__row">
                  <span>Best for</span>
                  <strong>{service.goodFor}</strong>
                </div>
                <div className="price-card__row">
                  <span>Engagement</span>
                  <strong>{service.priceAmount === "Custom quote" ? "Phased build" : "Fixed scope"}</strong>
                </div>
              </div>
              <div className="price-card__cta">
                <Magnetic>
                  <Link to="/contact" className="btn btn--primary">
                    Start a project <Icon name="arrowUpRight" />
                  </Link>
                </Magnetic>
                <Link to="/pricing" className="btn btn--ghost">
                  See all pricing
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap detail-body">
          <div>
            <div className="detail-block">
              <span className="label">
                <span className="label__dot" />
                Overview
              </span>
              <h2 className="detail-block__title" style={{ marginTop: 16 }}>
                What this looks like in practice.
              </h2>
              {service.description.map((paragraph) => (
                <p className="detail-block__copy" key={paragraph.slice(0, 40)}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="detail-block">
              <h2 className="detail-block__title">What&apos;s included</h2>
              <div className="deliverables">
                {service.deliverables.map((item) => (
                  <div className="deliverable" key={item.title}>
                    <span className="deliverable__check">
                      <Icon name="check" />
                    </span>
                    <div>
                      <div className="deliverable__title">{item.title}</div>
                      <p className="deliverable__copy">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-block">
              <h2 className="detail-block__title">Who it&apos;s for</h2>
              <ul className="fit-list">
                {service.fit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2 className="detail-block__title">Questions, answered</h2>
              <Accordion items={service.faqs} />
            </div>
          </div>

          <aside className="detail-aside">
            <div className="aside-card">
              <div className="aside-card__title">At a glance</div>
              <ul className="aside-card__list">
                <li>
                  <span>Start</span>
                  <strong>{service.priceAmount}</strong>
                </li>
                <li>
                  <span>Timeline</span>
                  <strong>{service.timeline}</strong>
                </li>
                <li>
                  <span>Good for</span>
                  <strong style={{ textAlign: "right" }}>{service.goodFor}</strong>
                </li>
                <li>
                  <span>Support</span>
                  <strong>30 days included</strong>
                </li>
              </ul>
            </div>

            <div className="aside-card">
              <div className="aside-card__title">Toolbox</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {service.tech.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="aside-card">
              <div className="aside-card__title">Not sure yet?</div>
              <p>
                Send two or three lines about the problem. We will reply with the shortest sensible
                path — even if that means a smaller scope than you expected.
              </p>
              <Link to="/contact" className="link-arrow" style={{ marginTop: 14 }}>
                Talk to us <Icon name="arrowRight" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--line">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                Often paired with
              </span>
              <SplitWords as="h2" className="section-title" text="Build the whole system." />
            </div>
          </div>

          <div className="related-grid">
            {related.map((entry) => (
              <Link to={`/services/${entry.slug}`} className="related-card" key={entry.slug}>
                <span className="related-card__index">{entry.index} / Service</span>
                <span className="related-card__arrow">
                  <Icon name="arrowUpRight" />
                </span>
                <h3 className="related-card__title">{entry.name}</h3>
                <span className="related-card__price">
                  {entry.priceLabel} {entry.priceAmount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Let&apos;s scope your {service.navName.toLowerCase()}. <span>Properly.</span>
          </>
        }
        copy="A short call and a few details are enough to give you a realistic scope, timeline and price — before you commit to anything."
      />
    </>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = slug ? getService(slug) : undefined;

  if (!service) return <NotFound />;

  return <ServiceDetail service={service} />;
}
