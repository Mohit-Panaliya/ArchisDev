import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta({
    title: "Page not found — ArchisDev",
    description: "This page took a wrong turn. Head back home or explore our services.",
    path: "/404",
  });

  return (
    <section className="notfound">
      <div className="notfound__glow" aria-hidden="true" />
      <div className="notfound__inner">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">This page took a wrong turn.</h1>
        <p className="notfound__copy">
          The link may be old, or the page may have moved during a rebuild. The good stuff is still
          one click away.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn--primary">
            Back home <Icon name="arrowRight" />
          </Link>
          <Link to="/services" className="btn btn--ghost">
            Explore services
          </Link>
          <Link to="/contact" className="btn btn--ghost">
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
