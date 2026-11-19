import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/motion";
import { markIntroDone } from "../lib/intro";
import { startScroll, stopScroll } from "../lib/smoothScroll";
import { Brand } from "./Logo";

const STORAGE_KEY = "archisdev:intro";

function shouldShow() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

export function Preloader() {
  const [show, setShow] = useState(shouldShow);
  const overlayRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!show) {
      markIntroDone();
      startScroll();
      return;
    }

    stopScroll();
    const overlay = overlayRef.current;
    const count = countRef.current;
    const bar = barRef.current;
    if (!overlay || !count || !bar) return;

    const counter = { value: 0 };
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* storage unavailable */
        }
        startScroll();
        markIntroDone();
        setShow(false);
      },
    });

    timeline
      .to(counter, {
        value: 100,
        duration: 1.15,
        onUpdate: () => {
          count.textContent = String(Math.round(counter.value)).padStart(3, "0");
        },
      })
      .to(bar, { scaleX: 1, duration: 1.15 }, 0)
      .to(overlay, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.35)
      .add(() => markIntroDone(), 1.5);

    return () => {
      timeline.kill();
      startScroll();
      markIntroDone();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="preloader" ref={overlayRef} aria-hidden="true">
      <div className="preloader__top">
        <Brand />
        <span className="mono">Digital architecture</span>
      </div>
      <div>
        <div className="preloader__mid">
          <div className="preloader__line">
            We build the systems
            <br />
            <span>your business runs on.</span>
          </div>
          <div className="preloader__count" ref={countRef}>
            000
          </div>
        </div>
        <div className="preloader__bar">
          <span ref={barRef} />
        </div>
      </div>
      <div className="preloader__top">
        <span className="mono">Anand · Gujarat · India</span>
        <span className="mono">© 2026</span>
      </div>
    </div>
  );
}
