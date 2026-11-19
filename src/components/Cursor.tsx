import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    gsap.set([dot, ring], { opacity: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    let visible = false;

    const onMove = (event: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: true });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const interactive = target?.closest("a, button, [role='button'], [data-cursor]");
      const isView = target?.closest("[data-cursor='view']");
      setHover(Boolean(interactive));
      setView(Boolean(isView));
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${view ? "is-hidden" : ""}`} aria-hidden="true" />
      <div
        ref={ringRef}
        className={`cursor-ring ${view ? "is-view" : ""} ${hover ? "is-hover" : ""}`}
        aria-hidden="true"
      >
        <span className="cursor-ring__label">View</span>
      </div>
    </>
  );
}
