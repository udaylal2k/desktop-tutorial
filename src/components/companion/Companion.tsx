/* ==========================================================================
   MAR - COMPANION
   --------------------------------------------------------------------------
   Small, quiet, at the edge. It follows along the bottom of the window at a
   distance, sits down when nothing is happening, looks up when the page is
   scrolling, and never covers anything: it lives in the strip of margin
   below the content and does not take pointer events.

   It is not navigation, it does not speak, and it can be switched off from
   the control beside it or removed entirely from site.config.ts.

   On a phone there is no cursor to follow, so it simply rests in the corner
   and reacts to the page moving. Under a reduced motion setting it sits
   still and does not travel at all.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring } from 'motion/react';
import { companion } from '../../content/companion';
import { usePrefersReducedMotion, useIsTouch } from '../../lib/hooks';
import './companion.css';

const STORAGE_KEY = 'mar.companion';

type Pose = 'sitting' | 'walking' | 'looking';

export function Companion() {
  const reduced = usePrefersReducedMotion();
  const touch = useIsTouch();

  const [enabled, setEnabled] = useState(true);
  const [pose, setPose] = useState<Pose>('sitting');
  const [facing, setFacing] = useState(1);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Continuous values are kept off the React tree: nothing here causes a
  // re-render while the cursor is moving.
  const targetX = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 46, damping: 18, mass: 1.1 });

  /* How present it is. It rests almost out of sight and only comes forward
     when the pointer is down near the bottom of the window, so it is never
     sitting on top of something the visitor is reading. */
  const presence = useMotionValue(0.3);
  const opacity = useSpring(presence, { stiffness: 60, damping: 22 });

  const { scrollY } = useScroll();

  const lastX = useRef(0);
  const settle = useRef(0);

  /* Remember whether the visitor switched it off. */
  useEffect(() => {
    try {
      setEnabled(window.localStorage.getItem(STORAGE_KEY) !== 'off');
    } catch {
      // Storage can be unavailable. The companion simply stays on.
    }
  }, []);

  /* Start at the resting position rather than at the left edge. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rest = window.innerWidth * companion.restingPosition;
    targetX.set(rest);
    x.jump(rest);
    lastX.current = rest;
  }, [targetX, x]);

  /* Follow the cursor, at a distance, and only along the bottom edge. */
  useEffect(() => {
    if (!enabled || reduced || touch || !companion.followsCursor) return;

    const onPointerMove = (event: PointerEvent) => {
      const margin = 48;
      const next = Math.min(
        Math.max(event.clientX - 28, margin),
        window.innerWidth - margin * 2,
      );
      targetX.set(next);

      // Fully present in the bottom fifth of the window, fading back above it.
      const fromBottom = window.innerHeight - event.clientY;
      presence.set(fromBottom < window.innerHeight * 0.22 ? 1 : 0.3);

      setPose('walking');
      window.clearTimeout(settle.current);
      settle.current = window.setTimeout(() => setPose('sitting'), 900);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.clearTimeout(settle.current);
    };
  }, [enabled, reduced, touch, targetX, presence]);

  /* Turn to face the way it is travelling. */
  useEffect(() => {
    if (!enabled) return;
    const stop = x.on('change', (value) => {
      const delta = value - lastX.current;
      if (Math.abs(delta) > 1.5) setFacing(delta > 0 ? 1 : -1);
      lastX.current = value;
    });
    return stop;
  }, [enabled, x]);

  /* Look up while the page is moving. Driven by the scroll motion value,
     not by a scroll listener. */
  useEffect(() => {
    if (!enabled || reduced) return;
    let timer = 0;
    const stop = scrollY.on('change', () => {
      setPose('looking');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setPose('sitting'), 700);
    });
    return () => {
      stop();
      window.clearTimeout(timer);
    };
  }, [enabled, reduced, scrollY]);

  /* Change photograph on each new page, if there are photographs. */
  useEffect(() => {
    if (companion.photographs.length < 2) return;
    setPhotoIndex((index) => (index + 1) % companion.photographs.length);
  }, []);

  const switchOff = () => {
    setEnabled(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, 'off');
    } catch {
      // Nothing to do. It is off for this visit either way.
    }
  };

  const switchOn = () => {
    setEnabled(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, 'on');
    } catch {
      // As above.
    }
  };

  if (!enabled) {
    return (
      <button type="button" className="companion-restore" onClick={switchOn}>
        {companion.name} off
      </button>
    );
  }

  const photo = companion.photographs[photoIndex];

  return (
    <div className="companion" aria-hidden="true">
      <motion.div
        className="companion__figure"
        data-pose={reduced ? 'sitting' : pose}
        style={
          reduced || touch
            ? { left: `${companion.restingPosition * 100}%`, opacity: 0.55 }
            : { x, opacity }
        }
      >
        <div className="companion__body" style={{ transform: `scaleX(${facing})` }}>
          {photo ? (
            <img className="companion__photo" src={photo} alt="" loading="lazy" />
          ) : (
            <CompanionDrawing />
          )}
        </div>
        <span className="companion__shadow" />
      </motion.div>

      <button type="button" className="companion__off" onClick={switchOff}>
        <span className="visually-hidden">Switch off the {companion.name.toLowerCase()}</span>
        <span aria-hidden="true">{companion.name}</span>
      </button>
    </div>
  );
}

/**
 * The placeholder figure. One continuous line, in the same drawn register
 * as everything else on the site. It is deliberately not a cartoon and it is
 * deliberately not detailed: it is a mark holding a place until the real
 * photographs arrive.
 */
function CompanionDrawing() {
  return (
    <svg viewBox="0 0 48 34" className="companion__drawing" focusable="false" aria-hidden="true">
      {/* Body and legs. */}
      <path
        className="companion__line"
        d="M 8 28 L 8 18 Q 8 13 14 13 L 30 13 Q 36 13 36 18 L 36 22"
        fill="none"
      />
      <path className="companion__line" d="M 12 28 L 12 21" fill="none" />
      <path className="companion__line" d="M 31 28 L 31 21" fill="none" />
      {/* Head and ear. */}
      <path className="companion__line" d="M 36 18 L 41 18 Q 44 18 44 21 L 44 24" fill="none" />
      <path className="companion__ear" d="M 37 14 L 35 8 L 41 12" fill="none" />
      {/* Tail. */}
      <path className="companion__tail" d="M 8 18 Q 3 15 4 9" fill="none" />
      {/* Eye. */}
      <circle className="companion__eye" cx="41" cy="21" r="0.9" />
    </svg>
  );
}
