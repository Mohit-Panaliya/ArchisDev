import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";

type Props = {
  title: ReactNode;
  copy?: string;
};

const ticker = ["Start a project", "ArchisDev", "Let's build", "ArchisDev"];

export function CtaPanel({ title, copy }: Props) {
  return (
    <section className="cta-panel">
      <Marquee className="cta-panel__marquee" speed={46} reverse>
        {ticker.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item}
            <span className="marquee-item__sep" />
          </span>
        ))}
      </Marquee>
      <div className="wrap cta-panel__inner">
        <span className="label">
          <span className="label__dot" />
          Next step
        </span>
        <h2 className="cta-panel__title">{title}</h2>
        {copy && (
          <p className="lead" style={{ maxWidth: "52ch" }}>
            {copy}
          </p>
        )}
        <div className="cta-panel__actions">
          <Magnetic>
            <Link to="/contact" className="btn btn--primary btn--lg">
              Start a project <Icon name="arrowUpRight" />
            </Link>
          </Magnetic>
          <Magnetic>
            <a href="mailto:hello@archisdev.com" className="btn btn--ghost btn--lg">
              <Icon name="mail" /> Email us
            </a>
          </Magnetic>
        </div>
        <div className="cta-panel__meta">
          <span>Reply within 1 business day</span>
          <span>NDA friendly</span>
          <span>Remote worldwide</span>
        </div>
      </div>
    </section>
  );
}
