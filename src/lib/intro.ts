const state = { done: false };

export function markIntroDone() {
  if (state.done) return;
  state.done = true;
  window.dispatchEvent(new Event("archis:intro"));
}

export function isIntroDone() {
  return state.done;
}

export function onIntroReady(callback: () => void) {
  if (state.done) {
    callback();
    return () => {};
  }
  const handler = () => {
    window.removeEventListener("archis:intro", handler);
    callback();
  };
  window.addEventListener("archis:intro", handler);
  return () => window.removeEventListener("archis:intro", handler);
}
