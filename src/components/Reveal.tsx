import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
};

export function Reveal({ children, className = "", delay = 0, y = 28, start = "top 88%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
