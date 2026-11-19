import { Link } from "react-router-dom";
import { CtaPanel } from "../components/CtaPanel";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { SplitWords } from "../components/SplitWords";
import { facts, principles, toolbox } from "../data/about";
import { founders, site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function About() {
  usePageMeta({
    title: "About — ArchisDev",
    description:
      "ArchisDev is a two-founder studio in Anand, Gujarat, building websites, apps, commerce and ERP systems with ERPNext and Odoo. Senior hands, no hand-offs.",
    path: "/about",
  });

  return (
    <>
      <section className="about-hero">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="wrap about-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">About</span>
            </nav>

            <span className="label">
              <span className="label__dot" />
              The studio
            </span>
            <Reveal y={16}>
              <h1 className="about-hero__title">
                Two builders. <span className="about-hero__outline">Zero hand-offs.</span>
              </h1>
            </Reveal>
            <p className="lead about-hero__lead">
              {site.name} is a small studio founded by {founders[0].name} and {founders[1].name}.
              We design and engineer the systems ambitious businesses run on — and we stay
              accountable from the first sketch to the support window.
            </p>
            <div className="page-hero__meta">
              <span className="chip">Founded {site.founded}</span>
              <span className="chip">Anand, Gujarat</span>
              <span className="chip">ERPNext + Odoo</span>
              <span className="chip">Remote worldwide</span>
            </div>
          </div>

          <aside className="about-poster" aria-label="Studio facts">
            <span className="label">
              <span className="label__dot" />
              {site.availability}
            </span>
            <span className="about-poster__mark" aria-hidden="true">
              AD
            </span>
            <div className="about-poster__rows">
              {facts.map((fact) => (
                <div className="about-poster__row" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap about-story">
          <div>
            <span className="label">
              <span className="label__dot" />
              Why we exist
            </span>
            <Reveal>
              <p className="about-story__text" style={{ marginTop: 22 }}>
                Most businesses do not need more software. They need the <span>right</span>{" "}
                software — designed around how they actually sell, buy, stock, invoice and support
                customers. That is the work we care about.
              </p>
            </Reveal>
          </div>
          <div className="about-story__aside">
            <span className="label__num">/ The short version</span>
            <p>
              We started {site.name} after years of building ERP modules and business systems —
              CRM, sales, purchase, inventory, accounts and the custom pieces in between. We saw
              the same pattern: beautiful front ends disconnected from messy back offices, and
              agencies that disappeared at handover.
            </p>
            <p>
              So we built a studio that does both sides properly. Strategy, design and engineering
              under one roof, with the founders on every project. Transparent pricing. Real
              support. Systems that outlast the launch.
            </p>
            <Link to="/work" className="link-arrow">
              See representative work <Icon name="arrowUpRight" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                Founders
              </span>
              <SplitWords as="h2" className="section-title" text="The people on your project." />
            </div>
            <div className="section-head__aside">
              <p>
                No account managers, no junior hand-off. You work directly with the people
                responsible for the outcome.
              </p>
            </div>
          </div>

          <div className="founder-grid">
            {founders.map((founder) => (
              <article className="founder-card" key={founder.name}>
                <div className="founder-card__top">
                  <span className="founder-card__monogram">{founder.monogram}</span>
                  <span className="founder-card__role">
                    {founder.role}
                    <br />
                    {site.name}
                  </span>
                </div>
                <h3 className="founder-card__name">{founder.name}</h3>
                <p className="founder-card__bio">{founder.bio}</p>
                <div className="founder-card__focus">
                  {founder.focus.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a className="founder-card__contact" href={`mailto:${site.email}`}>
                  <Icon name="mail" /> {site.email}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__main">
              <span className="label">
                <span className="label__dot" />
                How we think
              </span>
              <SplitWords as="h2" className="section-title" text="Five principles we don't trade." />
            </div>
            <div className="section-head__aside">
              <p>
                These are working rules, not wall posters. They decide what we build, how we
                communicate and when we say no.
              </p>
            </div>
          </div>

          <div className="principle-list">
            {principles.map((principle, index) => (
              <div className="principle-row" key={principle.title}>
                <span className="principle-row__num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="principle-row__title">{principle.title}</h3>
                <p className="principle-row__copy">{principle.copy}</p>
              </div>
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
                Toolbox
              </span>
              <SplitWords as="h2" className="section-title" text="Boring where it matters." />
            </div>
            <div className="section-head__aside">
              <p>
                Proven stacks, chosen for longevity and your team&apos;s ability to maintain them —
                not because they are trendy.
              </p>
            </div>
          </div>

          <div className="toolbox">
            {toolbox.map((group) => (
              <div className="toolbox__group" key={group.title}>
                <div className="toolbox__title">{group.title}</div>
                <div className="toolbox__list">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Work with the founders. <span>Not a sales team.</span>
          </>
        }
        copy="If you want a partner who understands both the storefront and the back office, we should talk. A short intro call is enough to know if it is a fit."
      />
    </>
  );
}
