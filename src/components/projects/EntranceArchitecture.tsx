/* ==========================================================================
   MAR - ENTRANCE ARCHITECTURE
   --------------------------------------------------------------------------
   The building at the entrance to the projects, drawn rather than
   photographed, until the owner's own picture replaces it.

   It is a silhouette, because a silhouette is what a building is against a
   sky. The composition is a long horizontal mass on a deep colonnade, with
   a slab held over it, a taller element set back behind, and low walls
   running off to both edges so the building sits in a place rather than on
   a page.

   The set back element carries a lighter tone than the mass in front of it,
   which is how distance reads in an elevation: things further away are
   paler, because there is more air in front of them.

   As the light goes, the openings come on.
   ========================================================================== */

import { motion, type MotionValue } from 'motion/react';

interface EntranceArchitectureProps {
  /** Rises from 0 to 1 as the openings should come on. */
  lit: MotionValue<number>;
  /**
   * Frames the elevation for a narrow window. On a phone the drawing is cut
   * down to the building itself, with the sky and the outer walls trimmed
   * away, and fitted across the foot of the screen. Filling a tall narrow
   * window instead would crop the building down to a few bays in the middle.
   */
  fit?: boolean;
}

/** An opening: x, y, width, height. */
type Opening = [number, number, number, number];

/** A band of narrow vertical slots, which is how the elevation gets its
 *  rhythm without ever becoming a grid of squares. */
function slots(
  from: number,
  to: number,
  y: number,
  height: number,
  width: number,
  pitch: number,
): Opening[] {
  const out: Opening[] = [];
  for (let x = from; x + width <= to; x += pitch) out.push([x, y, width, height]);
  return out;
}

/* The near mass: two bands of tall slots above a deep colonnade. */
const MASS_OPENINGS: Opening[] = [
  ...slots(432, 1072, 556, 96, 17, 42),
  ...slots(432, 1072, 668, 22, 17, 42),
];

/* The colonnade at the base. Deeper and wider than a window: this is the
   part of the building a person would walk through. */
const COLONNADE: Opening[] = slots(430, 1074, 706, 100, 32, 84);

/* The set back element: seven floors of a finer, closer rhythm, read
   through more air. */
const TOWER_OPENINGS: Opening[] = Array.from({ length: 7 }, (_, floor) =>
  slots(1140, 1356, 300 + floor * 66, 44, 15, 34),
).flat();

export function EntranceArchitecture({ lit, fit = false }: EntranceArchitectureProps) {
  return (
    <svg
      className="entrance__drawing"
      viewBox={fit ? '330 380 1100 750' : '0 0 1600 1100'}
      preserveAspectRatio={fit ? 'xMidYMax meet' : 'xMidYMax slice'}
      aria-hidden="true"
      focusable="false"
    >
      {/* Everything is set down inside the frame so that there is sky above
          the building whatever shape the window is. */}
      <g transform="translate(0 200)">
      {/* ---------------------------------------------------- SET BACK ---- */}
      {/* Drawn first so the near mass overlaps it. */}
      <g className="entrance__far">
        {/* The low wall running off to the right edge. */}
        <rect x="1368" y="742" width="232" height="66" />
        {/* The taller element, and the slab that caps it. */}
        <rect x="1120" y="252" width="252" height="556" />
        <rect x="1104" y="234" width="284" height="20" />
      </g>

      {/* ------------------------------------------------------- NEAR ----- */}
      <g className="entrance__near">
        {/* The wall that runs off the left edge, holding the composition down. */}
        <rect x="0" y="728" width="212" height="80" />
        {/* The low wing. */}
        <rect x="212" y="642" width="188" height="166" />
        {/* The main horizontal mass. */}
        <rect x="400" y="520" width="704" height="288" />
        {/* The slab held over it, running past the mass at both ends. */}
        <rect x="378" y="498" width="748" height="24" />
      </g>

      {/* ----------------------------------------------------- GROUND ----- */}
      <rect className="entrance__ground" x="0" y="806" width="1600" height="120" />
      <path className="entrance__datum" d="M 0 806 H 1600" />

      {/* ---------------------------------------------------- OPENINGS ---- */}
      {/* Always present, so the elevation is never a blank block by day. */}
      <g className="entrance__openings">
        {MASS_OPENINGS.map(([x, y, w, h], i) => (
          <rect key={`m${i}`} x={x} y={y} width={w} height={h} />
        ))}
        {TOWER_OPENINGS.map(([x, y, w, h], i) => (
          <rect key={`t${i}`} x={x} y={y} width={w} height={h} className="entrance__far-void" />
        ))}
      </g>

      <g className="entrance__colonnade">
        {COLONNADE.map(([x, y, w, h], i) => (
          <rect key={`c${i}`} x={x} y={y} width={w} height={h} />
        ))}
      </g>

      {/* ---------------------------------------------------------- LIT --- */}
      {/* Not every opening lights. A building with every window on is an
          office; a building with some of them on is lived in. */}
      <motion.g className="entrance__windows" style={{ opacity: lit }}>
        {MASS_OPENINGS.filter((_, i) => i % 3 === 0).map(([x, y, w, h], i) => (
          <rect key={`lm${i}`} x={x} y={y} width={w} height={h} className="entrance__lit" />
        ))}
        {TOWER_OPENINGS.filter((_, i) => (i * 7 + i * i) % 5 < 2).map(([x, y, w, h], i) => (
          <rect key={`lt${i}`} x={x} y={y} width={w} height={h} className="entrance__lit" />
        ))}
        {COLONNADE.filter((_, i) => i % 3 === 0).map(([x, y, w, h], i) => (
          <rect
            key={`lc${i}`}
            x={x}
            y={y + h * 0.55}
            width={w}
            height={h * 0.45}
            className="entrance__lit entrance__lit--low"
          />
        ))}
      </motion.g>
      </g>
    </svg>
  );
}
