import { useEffect } from 'react';

/**
 * Adds `is-in` to every `.reveal` element as it scrolls into view.
 * A MutationObserver picks up elements that mount later (lazy-loaded pages),
 * which would otherwise stay invisible.
 */
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      const showAll = () => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    const watch = () => document.querySelectorAll<HTMLElement>('.reveal:not(.is-in):not([data-watched])').forEach((el) => {
      el.dataset.watched = '';
      io.observe(el);
    });
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
