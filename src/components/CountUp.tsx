import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";

type Props = {
  value: number;
  pad?: number;
  suffix?: string;
  duration?: number;
};

export function CountUp({ value, pad = 0, suffix = "", duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (input: number) => String(Math.round(input)).padStart(pad, "0");

    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }

    el.textContent = format(0);
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => {
        el.textContent = format(counter.value);
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, pad, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {String(value).padStart(pad, "0")}
      </span>
      {suffix && <em>{suffix}</em>}
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </>
  );
}
