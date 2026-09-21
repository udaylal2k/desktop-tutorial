/* ==========================================================================
   MAR - HOOKS
   Small pieces of shared behaviour used across the site.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from 'react';

/** True when the visitor has asked their system to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** True while the given media query matches. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on viewports below the tablet breakpoint. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');

/** True on devices whose primary input cannot hover, such as phones. */
export const useIsTouch = () => useMediaQuery('(hover: none)');

/**
 * Stops the page behind a panel from scrolling. Several panels can be open
 * in sequence, so the lock is reference counted rather than a simple flag.
 */
let lockCount = 0;

export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    document.body.dataset.scrollLocked = 'true';
    return () => {
      lockCount -= 1;
      if (lockCount <= 0) {
        lockCount = 0;
        delete document.body.dataset.scrollLocked;
      }
    };
  }, [active]);
}

/**
 * Keeps keyboard focus inside an open panel, restores it to whatever had
 * focus before the panel opened, and closes on Escape.
 */
export function useFocusTrap(
  active: boolean,
  onClose: () => void,
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    returnTo.current = document.activeElement as HTMLElement | null;
    const node = ref.current;

    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

    // Move focus into the panel once it has rendered.
    const raf = requestAnimationFrame(() => {
      const first = node?.querySelector<HTMLElement>(selector);
      (first ?? node)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !node) return;

      const focusable = Array.from(node.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      returnTo.current?.focus?.();
    };
  }, [active, onClose]);

  return ref;
}

/**
 * Reveals an element once it has entered the viewport. Uses an observer
 * rather than a scroll listener, and disconnects as soon as it has fired.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || revealed) return;

    if (!('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px 12% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed, threshold]);

  return { ref, revealed };
}

/** A value that only updates once the caller has stopped changing it. */
export function useDebounced<T>(value: T, delay = 160): T {
  const [settled, setSettled] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return settled;
}

/** A stable callback that always sees the latest props. */
export function useEvent<A extends unknown[], R>(fn: (...args: A) => R) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: A) => ref.current(...args), []);
}
