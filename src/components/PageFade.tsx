import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";

export function PageFade({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", clearProps: "transform" },
    );

    return () => {
      tween.kill();
    };
  }, [pathname]);

  return (
    <div ref={ref} className="page-shell">
      {children}
    </div>
  );
}
