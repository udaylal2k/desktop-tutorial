/* ==========================================================================
   MAR - COMPANION
   --------------------------------------------------------------------------
   Asleep at the edge of the window until it is clicked (or, on a phone,
   tapped) awake. Not a decoration that follows the cursor everywhere: a
   small click-to-activate state machine.

     REST       sitting still, at its resting position. Nothing is listening.
     WAKING     a short, brief stand-up, on the way to FOLLOWING.
     FOLLOWING  awake. On a device with a cursor, it follows at a distance,
                with lag and a little overshoot, and stops now and then to
                sit and look around. On a phone, with no cursor to follow,
                it wanders between nearby points instead.
     SETTLING   on the way back to REST, after a second click.

   It lives in the strip of margin at the bottom of the window and never
   takes pointer events except on its own small hit area, so it can never
   sit over something a visitor is trying to read or click - including the
   footer, which it steps aside for entirely once it comes into view.

   The position itself is a motion value written to directly from a
   requestAnimationFrame loop (transform only, no per-frame React state).
   React state only changes at the infrequent moments a human would
   actually notice: waking, settling, a change of pose, a change of
   direction. The pointer listener, the follow loop and the wander
   scheduler all exist only while the companion is actually awake, so an
   asleep companion costs nothing.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { companion } from '../../content/companion';
import { usePrefersReducedMotion, useIsTouch } from '../../lib/hooks';
import './companion.css';

const STORAGE_KEY = 'mar.companion';

type Phase = 'rest' | 'waking' | 'following' | 'settling';
type Pose = 'sitting' | 'walking' | 'looking';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const between = ([min, max]: readonly [number, number]) => min + Math.random() * (max - min);

export function Companion() {
  const reduced = usePrefersReducedMotion();
  const touch = useIsTouch();

  const [enabled, setEnabled] = useState(true);
  const [phase, setPhase] = useState<Phase>('rest');
  const [pose, setPose] = useState<Pose>('sitting');
  const [facing, setFacing] = useState<1 | -1>(1);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [nearFooter, setNearFooter] = useState(false);

  /* The position itself. Set directly from the animation loop below and
     never read back into React state, so following the cursor cannot
     cause a re-render. */
  const x = useMotionValue(0);

  const posRef = useRef(0);
  const velRef = useRef(0);
  const poseRef = useRef<Pose>('sitting');
  const facingRef = useRef<1 | -1>(1);
  const settleTargetRef = useRef(0);

  const pointerXRef = useRef<number | null>(null);
  const wanderTargetRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const nextPauseAtRef = useRef(0);
  const frozenTargetRef = useRef(0);

  const wakeTimer = useRef(0);

  /* Remember whether the visitor switched it off. */
  useEffect(() => {
    try {
      setEnabled(window.localStorage.getItem(STORAGE_KEY) !== 'off');
    } catch {
      // Storage can be unavailable. The companion simply stays on.
    }
  }, []);

  /* Start, and stay, at the resting position until it is woken. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const place = () => {
      const rest = window.innerWidth * companion.restingPosition;
      settleTargetRef.current = rest;
      if (phase === 'rest') {
        posRef.current = rest;
        velRef.current = 0;
        x.set(rest);
      }
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [phase, x]);

  /* It steps aside entirely once the footer comes into view, so it can
     never sit over the last thing on the page. */
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* Change photograph on each new page, if there are photographs. */
  useEffect(() => {
    if (companion.photographs.length < 2) return;
    setPhotoIndex((index) => (index + 1) % companion.photographs.length);
  }, []);

  /* The pointer is only worth listening to while something is awake to
     use it - an asleep companion has no listener at all. */
  useEffect(() => {
    if (!enabled || reduced || touch || phase !== 'following') return;
    const onPointerMove = (event: PointerEvent) => {
      pointerXRef.current = event.clientX;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [enabled, reduced, touch, phase]);

  /* On a phone there is no cursor, so being awake means wandering between
     nearby points instead of following one. */
  useEffect(() => {
    if (!touch || phase !== 'following') return;
    let timer = 0;
    const pick = () => {
      const width = window.innerWidth;
      const rest = width * companion.restingPosition;
      const range = width * companion.mobileWander.range;
      wanderTargetRef.current = clamp((rest - range) + Math.random() * range * 2, 24, width - 24);
      timer = window.setTimeout(pick, between(companion.mobileWander.every));
    };
    pick();
    return () => window.clearTimeout(timer);
  }, [touch, phase]);

  /* The follow-and-settle loop. Runs only while there is somewhere to go:
     awake and following, or on the way back down to rest. Everything it
     writes goes straight to the motion value and to refs; setPose and
     setFacing are only called when the value actually changes. */
  useEffect(() => {
    if (!enabled || reduced) return;
    if (phase !== 'following' && phase !== 'settling') return;

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      let target: number;

      if (phase === 'settling') {
        target = settleTargetRef.current;
      } else if (touch) {
        target = wanderTargetRef.current;
      } else if (now < pauseUntilRef.current) {
        target = frozenTargetRef.current;
      } else if (now >= nextPauseAtRef.current) {
        frozenTargetRef.current = posRef.current;
        pauseUntilRef.current = now + between(companion.pauseFor);
        nextPauseAtRef.current = now + between(companion.pauseEvery);
        target = frozenTargetRef.current;
      } else {
        const margin = 48;
        const cursor = pointerXRef.current ?? posRef.current;
        target = clamp(cursor - 28, margin, window.innerWidth - margin * 2);
      }

      const { stiffness, damping } = companion.motion;
      const accel = (target - posRef.current) * stiffness - velRef.current * damping;
      velRef.current += accel * dt;
      posRef.current += velRef.current * dt;
      x.set(posRef.current);

      const speed = Math.abs(velRef.current);
      const paused = phase === 'following' && !touch && now < pauseUntilRef.current;
      const nextPose: Pose =
        phase === 'settling' ? 'walking' : speed > 6 ? 'walking' : paused ? 'looking' : 'sitting';
      if (nextPose !== poseRef.current) {
        poseRef.current = nextPose;
        setPose(nextPose);
      }

      if (velRef.current > 4 || velRef.current < -4) {
        const direction = velRef.current > 0 ? 1 : -1;
        if (direction !== facingRef.current) {
          facingRef.current = direction;
          setFacing(direction);
        }
      }

      if (
        phase === 'settling' &&
        Math.abs(settleTargetRef.current - posRef.current) < 0.5 &&
        Math.abs(velRef.current) < 2
      ) {
        posRef.current = settleTargetRef.current;
        velRef.current = 0;
        x.set(posRef.current);
        poseRef.current = 'sitting';
        setPose('sitting');
        setPhase('rest');
        return;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    /* No sense animating a tab nobody is looking at. */
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, reduced, phase, touch, x]);

  /* A click (or tap) wakes it, or sends it back to rest. Ignored under
     reduced motion: the companion then stays put, a still drawing rather
     than an interactive toy, and only the off switch still does anything. */
  const activate = () => {
    if (!enabled || reduced) return;

    if (phase === 'rest') {
      pointerXRef.current = posRef.current;
      pauseUntilRef.current = 0;
      nextPauseAtRef.current = performance.now() + between(companion.pauseEvery);
      setPhase('waking');
      window.clearTimeout(wakeTimer.current);
      wakeTimer.current = window.setTimeout(() => setPhase('following'), companion.wakeDuration);
    } else if (phase === 'following') {
      window.clearTimeout(wakeTimer.current);
      setPhase('settling');
    }
    // A click mid-transition (waking or settling) is ignored, so the two
    // transitions cannot be interrupted into a stuck or flickering state.
  };

  useEffect(() => () => window.clearTimeout(wakeTimer.current), []);

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
  const awake = phase === 'following' || phase === 'waking';
  const actionLabel = awake ? `Settle ${companion.name.toLowerCase()}` : `Wake ${companion.name.toLowerCase()}`;

  return (
    <div className="companion" data-hidden={nearFooter || undefined}>
      <motion.button
        type="button"
        className="companion__figure"
        data-phase={reduced ? 'rest' : phase}
        data-pose={reduced ? 'sitting' : pose}
        onClick={activate}
        tabIndex={nearFooter ? -1 : 0}
        aria-hidden={nearFooter || undefined}
        style={{ x }}
      >
        <span className="visually-hidden">{actionLabel}</span>
        <span
          className="companion__body"
          aria-hidden="true"
          style={{ '--facing': facing } as React.CSSProperties}
        >
          {photo ? (
            <img className="companion__photo" src={photo} alt="" loading="lazy" />
          ) : (
            <CompanionDrawing />
          )}
        </span>
        <span className="companion__shadow" aria-hidden="true" />
      </motion.button>

      <button
        type="button"
        className="companion__off"
        onClick={switchOff}
        tabIndex={nearFooter ? -1 : 0}
        aria-hidden={nearFooter || undefined}
      >
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
