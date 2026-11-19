import { Link } from "react-router-dom";
import { site } from "../data/site";
import { services } from "../data/services";
import { Brand } from "./Logo";
import { Icon } from "./Icon";
import { Magnetic } from "./Magnetic";
import { scrollToTop } from "../lib/smoothScroll";

const explore = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-cta">
          <span className="label">
            <span className="label__dot" />
            Start a project
          </span>
          <h2 className="footer-cta__title">
            Let&apos;s build something <span>that lasts.</span>
          </h2>
          <div className="footer-cta__row">
            <Magnetic>
              <Link to="/contact" className="btn btn--primary btn--lg">
                Book an intro call <Icon name="arrowUpRight" />
              </Link>
            </Magnetic>
            <a href={`mailto:${site.email}`} className="footer-mail">
              {site.email} <Icon name="arrowUpRight" />
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              {site.tagline} A small, senior team building websites, commerce, apps and ERP
              systems that businesses actually run on.
            </p>
            <span className="footer-status">{site.availability}</span>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Explore</h3>
            <div className="footer-links">
              {explore.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Services</h3>
            <div className="footer-links">
              {services.map((service) => (
                <Link key={service.slug} to={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Studio</h3>
            <div className="footer-contact">
              <div>
                <span className="footer-contact__label">Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div>
                <span className="footer-contact__label">Location</span>
                {site.location}
              </div>
              <div>
                <span className="footer-contact__label">Hours</span>
                {site.timezone}
              </div>
              <div>
                <span className="footer-contact__label">GitHub</span>
                <a href={site.github} target="_blank" rel="noreferrer">
                  @Mohit-Panaliya
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          ARCHISDEV
        </div>
      </div>

      <div className="wrap">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ArchisDev. All rights reserved.</span>
          <div className="footer-bottom__meta">
            <span>Anand · Gujarat · India</span>
            <span>Designed &amp; engineered in-house</span>
          </div>
          <button type="button" className="back-top" onClick={() => scrollToTop(false)}>
            Back to top <Icon name="arrowUpRight" />
          </button>
        </div>
      </div>
    </footer>
  );
}
