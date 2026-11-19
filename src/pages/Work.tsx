import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "../components/Accordion";
import { CtaPanel } from "../components/CtaPanel";
import { Icon } from "../components/Icon";
import { SplitWords } from "../components/SplitWords";
import { WorkVisual } from "../components/WorkVisual";
import { workItems, type WorkCategory } from "../data/work";
import { workFaqs } from "../data/services";
import { usePageMeta } from "../hooks/usePageMeta";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";

type Filter = WorkCategory | "All";

const filters: Filter[] = ["All", "ERP", "Web", "Commerce", "Apps"];

export default function Work() {
  usePageMeta({
    title: "Work — ArchisDev",
    description:
      "Representative builds across ERP, commerce, web and mobile apps — systems and storefronts designed to be used every day.",
    path: "/work",
  });

  const [filter, setFilter] = useState<Filter>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "All" ? workItems : workItems.filter((item) => item.category === filter);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;

    const cards = grid.querySelectorAll<HTMLElement>(".work-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.06, ease: "power3.out" },
      );
    }, grid);

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [filter]);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="page-hero__grid-bg" aria-hidden="true" />
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Work</span>
          </nav>

          <span className="label">
            <span className="label__dot" />
            Selected work
          </span>
          <SplitWords
            as="h1"
            className="page-hero__title"
            text="Built for the real world."
          />
          <p className="lead page-hero__lead">
            ERP, commerce, apps and sites — systems and storefronts made to be used every day, not
            just admired from a distance.
          </p>
          <div className="page-hero__meta">
            <span className="chip">ERPNext</span>
            <span className="chip">Odoo</span>
            <span className="chip">React</span>
            <span className="chip">Flutter</span>
            <span className="chip">Commerce</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="note-band" style={{ marginBottom: 32 }}>
            <Icon name="spark" />
            <span>
              These are <strong>representative builds and capability demos</strong> from our
              team&apos;s work. Some client names are withheld by agreement — ask during a call and
              we can walk you through the closest match to your project.
            </span>
          </div>

          <div className="filter-bar" role="group" aria-label="Filter work by category">
            {filters.map((entry) => (
              <button
                type="button"
                key={entry}
                className={`filter-btn ${filter === entry ? "is-active" : ""}`.trim()}
                aria-pressed={filter === entry}
                onClick={() => setFilter(entry)}
              >
                {entry}
              </button>
            ))}
            <span className="filter-count">
              {String(filtered.length).padStart(2, "0")} project
              {filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="work-grid" ref={gridRef}>
            {filtered.map((item) => (
              <article
                className={`work-card ${
                  item.layout === "feature"
                    ? "work-card--feature"
                    : item.layout === "half"
                      ? "work-card--half"
                      : ""
                }`.trim()}
                key={item.id}
              >
                <div className="work-card__visual">
                  <div className="work-card__visual-inner">
                    <WorkVisual variant={item.visual} />
                  </div>
                </div>
                <div className="work-card__info">
                  <div className="work-card__meta">
                    <span>{item.meta}</span>
                    <span>{item.category}</span>
                  </div>
                  <h2 className="work-card__title">{item.title}</h2>
                  <p className="work-card__desc">{item.description}</p>
                  <div className="work-card__tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="section-actions">
            <Link to="/contact" className="btn btn--primary">
              Ask for a walkthrough <Icon name="arrowUpRight" />
            </Link>
            <Link to="/services" className="btn btn--ghost">
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="wrap faq-layout">
          <div className="faq-aside">
            <span className="label">
              <span className="label__dot" />
              About this work
            </span>
            <SplitWords as="h2" className="section-title" text="The honest footnotes." />
          </div>
          <div>
            <Accordion items={workFaqs} />
          </div>
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Your project could be next. <span>Let&apos;s make it real.</span>
          </>
        }
        copy="Tell us what you are building and we will point you to the closest work we have done — plus what we would do differently for you."
      />
    </>
  );
}
