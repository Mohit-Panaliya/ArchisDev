export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;
}
