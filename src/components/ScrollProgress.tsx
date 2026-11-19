import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      const rail = railRef.current;
      const thumb = thumbRef.current;
      if (!bar || !rail || !thumb) return;

      const viewport = window.innerHeight;
      const scrollable = document.documentElement.scrollHeight - viewport;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      bar.style.transform = `scaleX(${progress})`;

      rail.classList.toggle("is-idle", scrollable <= 1);
      const trackH = rail.offsetHeight;
      if (trackH > 0) {
        const ratio = viewport / (scrollable + viewport);
        const thumbH = Math.min(trackH, Math.max(30, trackH * ratio));
        thumb.style.height = `${thumbH}px`;
        thumb.style.transform = `translate3d(0, ${progress * (trackH - thumbH)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={barRef} />
      </div>
      <div className="scroll-rail" ref={railRef} aria-hidden="true">
        <span ref={thumbRef} />
      </div>
    </>
  );
}
