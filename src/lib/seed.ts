/* ==========================================================================
   MAR - SEEDED DRAWING
   --------------------------------------------------------------------------
   The placeholder artwork is drawn, not chosen from a set of pictures. Every
   drawing is generated from the text of its own label, which means the same
   placeholder always looks identical, on every visit and on every machine,
   and two different placeholders never look the same.
   ========================================================================== */

/** Turns any string into a 32 bit number. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** A small, fast, repeatable random number generator. */
export function seeded(input: string) {
  let state = hash(input) || 1;

  const next = (): number => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    /** A number between 0 and 1. */
    next,
    /** A number between min and max. */
    range: (min: number, max: number) => min + next() * (max - min),
    /** A whole number between min and max, inclusive. */
    int: (min: number, max: number) => Math.floor(min + next() * (max - min + 1)),
    /** One of the given values. */
    pick: <T>(values: readonly T[]): T => values[Math.floor(next() * values.length)],
    /** True with the given probability. */
    chance: (probability: number) => next() < probability,
  };
}

export type Rng = ReturnType<typeof seeded>;

/** Rounds to two decimals so the generated path data stays short. */
export const r2 = (n: number) => Math.round(n * 100) / 100;
