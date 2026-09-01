import { onBeforeUnmount, onMounted, ref } from "vue";

export const useCountUp = (
  items,
  {
    duration = 1400,
    stagger = 180,
    target = null,
    threshold = 0.15,
    rootMargin = "0px",
  } = {},
) => {
  const displayValues = ref(items.map(() => 0));
  let observer = null;
  let hasStarted = false;

  const animateValue = (index, target, animationDuration = duration) => {
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayValues.value[index] = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        displayValues.value[index] = target;
      }
    };

    requestAnimationFrame(step);
  };

  const start = () => {
    if (hasStarted) return;
    hasStarted = true;

    items.forEach((item, index) => {
      setTimeout(() => {
        animateValue(index, item.value);
      }, index * stagger);
    });
  };

  onMounted(() => {
    const element = target?.value ?? target;

    if (!element) {
      start();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer?.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return {
    displayValues,
    start,
    animateValue,
  };
};