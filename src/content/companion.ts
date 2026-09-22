/* ==========================================================================
   MAR - COMPANION
   --------------------------------------------------------------------------
   The small companion that waits at the edge of the page, asleep until it
   is clicked (or tapped) awake. Everything about how it looks and moves is
   configured here.

   TO USE PHOTOGRAPHS INSTEAD OF THE DRAWING
   Put three to five pictures in public/content/dog/ and list them below.
   The companion will use them instead of the drawn figure, cut out against
   the page, and will change which one it shows as you move through the site.
   Leave the list empty to keep the drawing.
   ========================================================================== */

export const companion = {
  /** Used in the control that switches the companion off, and by screen
   *  readers. Replace with the name, if there is one. */
  name: 'Companion',

  /** Photographs, if you have them, one list per state so a photograph can
   *  change with what the companion is doing. Each list is optional: leave
   *  it empty and that state falls back to `idle`, and if `idle` is empty
   *  too the drawn placeholder is used throughout. For example:
   *    idle:   ['/content/dog/resting-01.png', '/content/dog/resting-02.png']
   *    follow: ['/content/dog/alert-01.png']
   *  Pictures with the background already removed work best. */
  assets: {
    /** Resting, asleep at the edge of the window. */
    idle: [] as string[],
    /** The moment it wakes, before it starts following. */
    wake: [] as string[],
    /** Awake: following the cursor, or wandering on a phone. */
    follow: [] as string[],
    /** On the way back down to idle, after the second click. */
    settle: [] as string[],
  },

  /** Where it sits while asleep, as a fraction of the window width. */
  restingPosition: 0.08,

  /** How it moves once it has been clicked awake and is following the
   *  cursor. Higher stiffness relative to damping gives it more overshoot
   *  before it settles behind the pointer - a lag with character, rather
   *  than tracking the cursor exactly. */
  motion: {
    stiffness: 130,
    damping: 12,
  },

  /** While awake and following, it does not track the cursor forever
   *  without a break: every so often (a random point in this range, in
   *  milliseconds) it stops to sit and look around for a while (a random
   *  duration in this range) before it carries on. */
  pauseEvery: [2200, 4200] as [number, number],
  pauseFor: [400, 1100] as [number, number],

  /** There is no cursor on a phone, so a tap sends it wandering between
   *  nearby points instead of following anything: a new point roughly
   *  this often (milliseconds), within this fraction of the window width
   *  of where it rests. */
  mobileWander: {
    every: [1400, 2600] as [number, number],
    range: 0.5,
  },

  /** How long the wake and settle transitions take, in milliseconds. */
  wakeDuration: 260,
} as const;
