import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./motion";

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;
let locked = false;

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return;
  if (typeof window === "undefined") return;

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);

  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  if (locked) lenis.stop();
}

export function destroySmoothScroll() {
  if (tick) gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
  tick = null;
}

export function stopScroll() {
  locked = true;
  lenis?.stop();
  document.documentElement.classList.add("is-locked");
}

export function startScroll() {
  locked = false;
  lenis?.start();
  document.documentElement.classList.remove("is-locked");
}

export function scrollToTop(immediate = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}
