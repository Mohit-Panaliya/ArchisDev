import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "../lib/gsap";
import { scrollToTop } from "../lib/smoothScroll";

export function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop(true);
    const near = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    const late = window.setTimeout(() => ScrollTrigger.refresh(), 650);
    return () => {
      window.clearTimeout(near);
      window.clearTimeout(late);
    };
  }, [pathname]);

  return null;
}
