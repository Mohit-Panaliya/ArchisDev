import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { startScroll, stopScroll } from "../lib/smoothScroll";
import { services } from "../data/services";
import { site } from "../data/site";
import { Brand } from "./Logo";
import { Icon } from "./Icon";
import { Magnetic } from "./Magnetic";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    stopScroll();

    const menu = menuRef.current;
    menu?.querySelector(".mobile-menu__nav")?.scrollTo({ top: 0 });
    if (menu && !prefersReducedMotion()) {
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-item]"),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out", delay: 0.12 },
      );
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      startScroll();
      if (menu) gsap.killTweensOf(menu.querySelectorAll("[data-menu-item]"));
    };
  }, [menuOpen]);

  const isServices = pathname.startsWith("/services");

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-menu-open" : ""}`}
    >
      <div className="wrap header-inner">
        <Brand />

        <nav className="desktop-nav" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
          >
            Home
          </NavLink>

          <div className="nav-dropdown">
            <NavLink
              to="/services"
              className={`nav-link nav-dropdown__trigger ${isServices ? "is-active" : ""}`}
            >
              Services
              <Icon name="chevronDown" size={10} />
            </NavLink>
            <div className="nav-dropdown__panel">
              {services.map((service) => (
                <Link className="mega-link" to={`/services/${service.slug}`} key={service.slug}>
                  <span className="mega-link__index">{service.index}</span>
                  <span>
                    <span className="mega-link__name">{service.name}</span>
                    <span className="mega-link__desc">{service.tags.join(" · ")}</span>
                  </span>
                </Link>
              ))}
              <div className="mega-footer">
                <p>Not sure what you need? We will help you scope it.</p>
                <Link className="link-arrow" to="/contact">
                  Talk to us <Icon name="arrowUpRight" />
                </Link>
              </div>
            </div>
          </div>

          {site.nav
            .filter((item) => item.to !== "/services")
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Magnetic>
            <Link to="/contact" className="btn btn--primary btn--sm">
              Start a project <Icon name="arrowUpRight" />
            </Link>
          </Magnetic>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!menuOpen}
      >
        <div className="wrap mobile-menu__inner">
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            <NavLink to="/" end className="mobile-menu__link" data-menu-item onClick={() => setMenuOpen(false)}>
              Home <span>01</span>
            </NavLink>
            <NavLink
              to="/services"
              className="mobile-menu__link"
              data-menu-item
              onClick={() => setMenuOpen(false)}
            >
              Services <span>02</span>
            </NavLink>
            <div className="mobile-menu__sub" data-menu-item>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            {site.nav
              .filter((item) => item.to !== "/services")
              .map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="mobile-menu__link"
                  data-menu-item
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label} <span>{String(index + 3).padStart(2, "0")}</span>
                </NavLink>
              ))}
          </nav>
          <div className="mobile-menu__foot">
            <Link
              to="/contact"
              className="btn btn--primary mobile-menu__cta"
              data-menu-item
              onClick={() => setMenuOpen(false)}
            >
              Start a project <Icon name="arrowUpRight" />
            </Link>
            <div className="mobile-menu__meta">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span className="footer-status">{site.availability}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
