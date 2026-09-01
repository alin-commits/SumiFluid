export function useRevealObserver(rootRef, threshold = 0.15) {
  let revealObserver = null;

  onMounted(() => {
    const root = rootRef.value;
    if (!root) return;

    const targets = [...root.querySelectorAll(".reveal")];
    if (root.classList?.contains("reveal")) {
      targets.unshift(root);
    }

    if (!targets.length) return;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    targets.forEach((target) => revealObserver.observe(target));
  });

  onBeforeUnmount(() => {
    revealObserver?.disconnect();
  });
}
