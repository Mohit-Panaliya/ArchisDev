import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import { CountUp } from "../components/CountUp";
import { CtaPanel } from "../components/CtaPanel";
import { Icon } from "../components/Icon";
import { Magnetic } from "../components/Magnetic";
import { Marquee, MarqueeItems } from "../components/Marquee";
import { Reveal } from "../components/Reveal";
import { SplitWords } from "../components/SplitWords";
import { TiltCard } from "../components/TiltCard";
import { WorkVisual } from "../components/WorkVisual";
import { erpModules, processSteps, site, stackMarquee, stats } from "../data/site";
import { homeFaqs, services } from "../data/services";
import { workItems } from "../data/work";
import { usePageMeta } from "../hooks/usePageMeta";
import { gsap } from "../lib/gsap";

const Hero3D = lazy(() =>
  import("../components/Hero3D").then((module) => ({ default: module.Hero3D })),
);

const cardOrder = [
  "erp-development",
  "website-development",
  "landing-pages",
  "ecommerce",
  "app-development",
  "custom-software",
];

const homeWork = [workItems[0], workItems[1], workItems[2]];

const proofPoints = [
  {
    num: "01",
    title: "Senior people, direct access",
    copy: "You talk to the people designing and shipping your system. Decisions happen in hours, not through layers of account managers.",
    icon: "target" as const,
  },
  {
    num: "02",
    title: "ERP depth, not just websites",
    copy: "We have implemented the modules your back office depends on. That context makes every storefront, app and integration smarter.",
    icon: "layers" as const,
  },
  {
    num: "03",
    title: "Pricing without theatre",
    copy: "Written scope, itemised changes and transparent third-party costs. You always know what you are paying for, and why.",
    icon: "shield" as const,
  },
];

export default function Home() {
  usePageMeta({
    title: "ArchisDev — Websites, Apps & ERP for ambitious businesses",
    description: site.description,
    path: "/",
  });

  const processRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = processRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const viewport = section.querySelector<HTMLElement>(".process__viewport");
      const track = section.querySelector<HTMLElement>(".process__track");
      const progress = section.querySelector<HTMLElement>(".process__progress span");
      if (!viewport || !track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleX: self.progress });
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__glow" />
          <div className="hero__grid-bg" />
        </div>

        <div className="wrap hero__inner">
          <div className="hero__copy">
            <div className="availability">
              <span className="availability__dot" />
              {site.availability} · {site.founded}
            </div>

            <h1 className="hero__title">
              <span className="hero__title-line">
                <SplitWords as="span" text="We build the" mode="intro" delay={0.1} stagger={0.05} />
              </span>
              <span className="hero__title-line hero__title-line--outline">
                <SplitWords
                  as="span"
                  text="digital architecture"
                  mode="intro"
                  delay={0.22}
                  stagger={0.06}
                />
              </span>
              <span className="hero__title-line">
                <SplitWords
                  as="span"
                  text="your business runs on."
                  mode="intro"
                  delay={0.36}
                  stagger={0.045}
                />
              </span>
            </h1>

            <p className="hero__sub">
              Websites, e-commerce, apps and <strong>ERP systems</strong> — designed and engineered
              by the people who will actually build them. Transparent starting prices, senior
              hands, no hand-offs.
            </p>

            <div className="hero__actions">
              <Magnetic>
                <Link to="/services" className="btn btn--primary btn--lg">
                  Explore our services <Icon name="arrowUpRight" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn btn--ghost btn--lg">
                  Start a project <Icon name="arrowRight" />
                </Link>
              </Magnetic>
            </div>

            <dl className="hero__meta">
              <div>
                <dt>Focus</dt>
                <dd>ERP · Web · Commerce · Apps</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>Anand, India — remote worldwide</dd>
              </div>
              <div>
                <dt>Engagements from</dt>
                <dd>₹4,999 to enterprise ERP</dd>
              </div>
            </dl>
          </div>

          <div className="hero__visual">
            <Suspense fallback={<div className="hero__canvas-fallback" />}>
              <Hero3D />
            </Suspense>
            <span className="hero__chip hero__chip--1">ERPNext + Odoo</span>
            <span className="hero__chip hero__chip--2">40+ ERP modules</span>
            <span className="hero__chip hero__chip--3">Design × engineering</span>
            <span className="hero__chip hero__chip--4">Est. {site.founded}</span>
            <span className="hero__visual-label">The ArchisDev blueprint</span>
          </div>
        </div>

        <div className="wrap">
          <div className="hero__scroll">
            Scroll to explore
            <span className="hero__scroll-line" />
          </div>
        </div>
      </section>

      {/* ---------- Stack marquee ---------- */}
      <div className="tech-band" aria-hidden="true">
        <Marquee speed={42}>
          <MarqueeItems items={stackMarquee} />
        </Marquee>
      </div>

      {/* ---------- Manifesto ---------- */}
      <section className="section manifesto">
        <div className="wrap manifesto__grid">
          <div className="manifesto__side">
            <span className="label">
              <span className="label__dot" />
              01 — The idea
            </span>
            <div className="manifesto__principles">
              {[
                ["01", "Design that earns attention", "A first impression is a business asset."],
                ["02", "Engineering that earns trust", "Systems that hold up after launch."],
                ["03", "Support that answers", "The founders pick up the phone."],
              ].map(([num, title, copy]) => (
                <div className="principle" key={num}>
                  <span className="principle__num">{num}</span>
                  <div>
                    <div className="principle__title">{title}</div>
                    <p className="principle__copy">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/about" className="link-arrow">
              How we work <Icon name="arrowRight" />
            </Link>
          </div>

          <div>
            <h2 className="sr-only">Our approach</h2>
            <SplitWords
              as="p"
              className="manifesto__text"
              mode="scrub"
              accentWords={["systems", "engineered", "grow"]}
              text="Most studios ship screens. We ship systems — the kind your sales, stock, accounts and support teams live inside every day. Beautifully designed. Properly engineered. Built to grow."
            />
            <div className="manifesto__foot">
              <p className="mono">Two founders · One accountable team · Every project</p>
              <Link to="/services" className="link-arrow">
                What we do <Icon name="arrowUpRight" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Services bento ---------- */}
      <section className="section section--line" id="services">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                02 — Services
              </span>
              <SplitWords
                as="h2"
                className="section-title"
                text="Six ways we put software to work."
              />
            </div>
            <div className="section-head__aside">
              <p>
                Clear starting prices for real scopes. Every quote is written, itemised and agreed
                before we begin.
              </p>
              <Link to="/services" className="link-arrow">
                All services <Icon name="arrowUpRight" />
              </Link>
            </div>
          </div>

          <div className="services-grid">
            {cardOrder.map((slug) => {
              const service = services.find((entry) => entry.slug === slug);
              if (!service) return null;
              const classes =
                slug === "erp-development"
                  ? "service-card--wide service-card--erp"
                  : slug === "website-development"
                    ? "service-card--wide"
                    : slug === "custom-software"
                      ? "service-card--full"
                      : "";

              return (
                <TiltCard className={`service-card ${classes}`.trim()} key={service.slug}>
                  <div className="service-card__head">
                    <span className="service-card__index">{service.index} / Service</span>
                    <span className="service-card__icon">
                      <Icon name={service.icon} />
                    </span>
                  </div>

                  <div className="service-card__body">
                    <h3 className="service-card__title">
                      <Link to={`/services/${service.slug}`}>
                        {service.name} <Icon name="arrowUpRight" />
                      </Link>
                    </h3>
                    <p className="service-card__desc">{service.short}</p>
                  </div>

                  {slug === "erp-development" && (
                    <div className="service-card__modules" aria-hidden="true">
                      {["CRM", "Sales", "Inventory", "Accounting", "Manufacturing"].map((module) => (
                        <span key={module}>{module}</span>
                      ))}
                      <span className="is-accent">+35 more</span>
                    </div>
                  )}

                  <div className="service-card__foot">
                    <span className="service-card__price">
                      <small>{service.priceLabel}</small>
                      <b>{service.priceAmount}</b>
                    </span>
                    <span className="tag">{service.timeline}</span>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- ERP panel ---------- */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="erp-panel">
              <div className="erp-panel__inner">
                <div className="erp-panel__copy">
                  <span className="label">
                    <span className="label__dot" />
                    03 — Business systems
                  </span>
                  <h2 className="erp-panel__title">
                    ERP that fits <span>how you work.</span>
                  </h2>
                  <p>
                    We implement ERPNext and Odoo end-to-end — from process mapping and data
                    migration to training and go-live. CRM, sales, purchase, inventory, accounting
                    and the modules in between, configured around your actual operations.
                  </p>

                  <ul className="erp-checks">
                    {[
                      "Finance, sales, purchase & stock",
                      "CRM and helpdesk workflows",
                      "Data migration & reconciliation",
                      "Training, documentation & support",
                    ].map((item) => (
                      <li key={item}>
                        <Icon name="check" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="erp-price">
                    <div>
                      <span className="erp-price__label">Implementation from</span>
                      <div className="erp-price__value">₹39,999</div>
                      <small>ERPNext or Odoo · scoped after discovery</small>
                    </div>
                  </div>

                  <div className="erp-panel__actions">
                    <Magnetic>
                      <Link to="/services/erp-development" className="btn btn--primary btn--sm">
                        Explore ERP implementation <Icon name="arrowUpRight" />
                      </Link>
                    </Magnetic>
                    <Link to="/contact" className="link-arrow">
                      Talk to us about your stack <Icon name="arrowRight" />
                    </Link>
                  </div>
                </div>

                <div className="modules-card">
                  <div className="modules-card__head">
                    <span className="modules-card__title">
                      <span className="modules-card__live" />
                      Modules we implement
                    </span>
                    <span className="modules-card__count">40+</span>
                  </div>
                  {erpModules.map((group, index) => (
                    <div className="module-row" key={index}>
                      <Marquee speed={index === 0 ? 34 : 40} reverse={index === 1}>
                        {group.map((module) => (
                          <span className="marquee-item" key={module}>
                            <span className={`module-chip ${module === "CRM" ? "is-accent" : ""}`}>
                              {module}
                            </span>
                          </span>
                        ))}
                      </Marquee>
                    </div>
                  ))}
                  <div className="modules-card__foot">
                    From CRM to custom DocTypes
                    <span>ERPNext · Odoo</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="process" ref={processRef}>
        <div className="process__viewport">
          <div className="wrap process__head">
            <div className="section-head">
              <div className="section-head__main">
                <span className="label">
                  <span className="label__dot" />
                  04 — Process
                </span>
                <SplitWords
                  as="h2"
                  className="section-title"
                  text="From first call to go-live."
                />
              </div>
              <div className="section-head__aside">
                <p>
                  Five stages, one accountable team. You see work in progress every week — not a
                  reveal at the end.
                </p>
                <Link to="/about" className="link-arrow">
                  How we work <Icon name="arrowRight" />
                </Link>
              </div>
            </div>
          </div>

          <div className="process__track">
            {processSteps.map((step) => (
              <article className="process-step" key={step.num}>
                <span className="process-step__watermark" aria-hidden="true">
                  {step.num}
                </span>
                <div className="process-step__top">
                  <span className="process-step__num">/{step.num}</span>
                  <span className="process-step__tag">{step.tag}</span>
                </div>
                <div className="process-step__body">
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__copy">{step.copy}</p>
                  <ul className="process-step__list">
                    {step.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}

            <article className="process-step process-step--cta">
              <span className="process-step__watermark" aria-hidden="true">
                06
              </span>
              <div className="process-step__top">
                <span className="process-step__num">/ Next</span>
                <span className="process-step__tag">Your project</span>
              </div>
              <div className="process-step__body">
                <h3 className="process-step__title">Bring the problem. We&apos;ll bring the blueprint.</h3>
                <p className="process-step__copy">
                  A short conversation is usually enough to know if we are the right team — and
                  what the next sensible step looks like.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Magnetic>
                    <Link to="/contact" className="btn btn--primary btn--sm">
                      Book an intro call <Icon name="arrowUpRight" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </article>
          </div>

          <div className="process__progress" aria-hidden="true">
            <span />
          </div>
          <span className="process__hint">Scroll →</span>
        </div>
      </section>

      {/* ---------- Work preview ---------- */}
      <section className="section section--line">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                05 — Selected work
              </span>
              <SplitWords as="h2" className="section-title" text="Built for the real world." />
            </div>
            <div className="section-head__aside">
              <p>
                ERP, commerce, apps and sites — systems and storefronts made to be used, not just
                looked at.
              </p>
              <Link to="/work" className="link-arrow">
                All work <Icon name="arrowUpRight" />
              </Link>
            </div>
          </div>

          <div className="work-grid">
            {homeWork.map((item, index) => (
              <Link
                to="/work"
                className={`work-card ${
                  index === 0 ? "work-card--feature" : index === 2 ? "work-card--wide" : ""
                }`.trim()}
                key={item.id}
              >
                <div className="work-card__visual" data-cursor="view">
                  <div className="work-card__visual-inner">
                    <WorkVisual variant={item.visual} />
                  </div>
                  <div className="work-card__hover">
                    <span>View project</span>
                    <Icon name="arrowUpRight" />
                  </div>
                </div>
                <div className="work-card__info">
                  <div className="work-card__meta">
                    <span>{item.meta}</span>
                    <span>{item.category}</span>
                  </div>
                  <h3 className="work-card__title">{item.title}</h3>
                  <p className="work-card__desc">{item.description}</p>
                  <div className="work-card__tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="stats-section">
        <div className="wrap">
          <div className="stats-head">
            <div>
              <span className="label">
                <span className="label__dot" />
                06 — By the numbers
              </span>
              <SplitWords
                as="h2"
                className="section-title"
                text="Small team. Senior hands."
                start="top 90%"
              />
            </div>
            <p className="mono">The short version of why clients stay.</p>
          </div>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat__value">
                  <CountUp value={stat.value} pad={stat.pad} />
                  <em>{stat.suffix}</em>
                </div>
                <span className="stat__label">{stat.label}</span>
                <p className="stat__note">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why ---------- */}
      <section className="section section--line">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                07 — Why ArchisDev
              </span>
              <SplitWords
                as="h2"
                className="section-title"
                text="Built like a partner, not a vendor."
              />
            </div>
            <div className="section-head__aside">
              <p>
                A small, senior team with ERP roots and a product mindset — accountable from the
                first sketch to the support window.
              </p>
            </div>
          </div>

          <div className="why-grid">
            {proofPoints.map((point) => (
              <article className="why-card" key={point.num}>
                <span className="why-card__num">{point.num}</span>
                <span className="why-card__arrow">
                  <Icon name={point.icon} />
                </span>
                <h3 className="why-card__title">{point.title}</h3>
                <p className="why-card__copy">{point.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section">
        <div className="wrap faq-layout">
          <div className="faq-aside">
            <span className="label">
              <span className="label__dot" />
              08 — FAQ
            </span>
            <SplitWords as="h2" className="section-title" text="Questions, answered." />
            <p className="lead" style={{ fontSize: "0.95rem" }}>
              The things founders usually ask before the first call.
            </p>
            <div className="faq-aside__card">
              <p>Something not covered here? Ask directly — you will get a straight answer.</p>
              <a className="faq-aside__mail" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
          <div>
            <Accordion items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Bring us the problem. <span>We&apos;ll bring the blueprint.</span>
          </>
        }
        copy="Tell us what you are building, what is getting in the way, and what success would look like. We will reply within one business day with a clear next step."
      />
    </>
  );
}
