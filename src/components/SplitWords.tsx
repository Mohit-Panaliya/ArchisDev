import { useLayoutEffect, useRef, type ElementType } from "react";
import { gsap } from "../lib/gsap";
import { onIntroReady } from "../lib/intro";
import { prefersReducedMotion } from "../lib/motion";

type Mode = "scroll" | "intro" | "scrub";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: Mode;
  delay?: number;
  stagger?: number;
  start?: string;
  accentWords?: string[];
};

const clean = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

export function SplitWords({
  text,
  as: Tag = "span",
  className = "",
  mode = "scroll",
  delay = 0,
  stagger = 0.045,
  start = "top 86%",
  accentWords = [],
}: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(/\s+/);
  const accents = accentWords.map((word) => word.toLowerCase());

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const inner = container.querySelectorAll<HTMLElement>(".word__inner");
    let unsubscribe: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (mode === "intro") {
        gsap.set(inner, { yPercent: 115 });
        unsubscribe = onIntroReady(() => {
          gsap.fromTo(
            inner,
            { yPercent: 115 },
            { yPercent: 0, duration: 1.05, delay, stagger, ease: "power4.out" },
          );
        });
        return;
      }

      if (mode === "scrub") {
        gsap.fromTo(
          inner,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 76%",
              end: "bottom 62%",
              scrub: 0.8,
            },
          },
        );
        return;
      }

      gsap.fromTo(
        inner,
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: { trigger: container, start, once: true },
        },
      );
    }, container);

    return () => {
      unsubscribe?.();
      ctx.revert();
    };
  }, [text, mode, delay, stagger, start]);

  return (
    <Tag className={className} aria-label={text}>
      <span className="split" ref={containerRef} aria-hidden="true">
        {words.map((word, index) => {
          const isAccent = accents.includes(clean(word));
          return (
            <span className={`word ${isAccent ? "word--accent" : ""}`} key={`${word}-${index}`}>
              <span className="word__inner">{word}</span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
