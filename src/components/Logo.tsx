import { Link } from "react-router-dom";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 27V15.5a11 11 0 0 1 22 0V27"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="square"
      />
      <path d="M19 20h8v8h-8z" fill="currentColor" />
    </svg>
  );
}

export function Brand({ showSub = false }: { showSub?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="ArchisDev — home">
      <LogoMark className="brand__mark" />
      <span className="brand__word">
        Archis<em>Dev</em>
        {showSub && <span className="brand__sub">Digital Architecture</span>}
      </span>
    </Link>
  );
}
