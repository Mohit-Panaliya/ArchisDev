import { useEffect, useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { isCoarsePointer, prefersReducedMotion } from "../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export function TiltCard({ children, className = "", max = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el) gsap.killTweensOf(el);
    };
  }, []);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);

    gsap.to(el, {
      rotateY: (x - 0.5) * max * 2,
      rotateX: (0.5 - y) * max * 2,
      transformPerspective: 1000,
      duration: 0.55,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "power3.out" });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ "--mx": "70%", "--my": "20%" } as CSSProperties}
    >
      {children}
    </div>
  );
}
