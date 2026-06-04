import { useEffect, useRef } from 'react';

// Reveal-on-scroll: adds `.in` to `.reveal` descendants as they enter view.
// A watchdog force-reveals everything if the animation timeline is frozen
// (throttled/backgrounded tabs), so content is never trapped invisible.
export function useReveal(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const els = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });

    const t1 = (document.timeline && document.timeline.currentTime) || 0;
    const watchdog = setTimeout(() => {
      const t2 = (document.timeline && document.timeline.currentTime) || 0;
      if (Math.abs(t2 - t1) < 5) {
        root.querySelectorAll('.reveal').forEach((e) => {
          e.style.transition = 'none';
          e.style.opacity = '1';
          e.style.transform = 'none';
          e.classList.add('in');
        });
        root.querySelectorAll('.bar i').forEach((b) => {
          if (b.dataset.v) {
            b.style.transition = 'none';
            b.style.width = `${b.dataset.v}%`;
          }
        });
      }
    }, 900);

    return () => {
      io.disconnect();
      clearTimeout(watchdog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
