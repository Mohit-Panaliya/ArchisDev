import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { isCoarsePointer, prefersReducedMotion } from "../lib/motion";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.32, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`.trim()}>
      {children}
    </span>
  );
}
