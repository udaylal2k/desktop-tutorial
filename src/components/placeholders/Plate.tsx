/* ==========================================================================
   MAR - PLATE
   --------------------------------------------------------------------------
   A placeholder drawn in the house language: paper ground, hairline frame,
   registration marks, a technical caption, and a construction appropriate to
   what the picture will be.

   It holds the exact proportion of the picture that will replace it, so the
   page you are looking at now is the page you will have when the real images
   arrive. Nothing moves.
   ========================================================================== */

import { useMemo } from 'react';
import type { ImageRegister } from '../../content/types';
import { drawPlate } from './drawPlate';
import './placeholders.css';

/** Prints a ratio the way a drawing sheet prints it, for example 3:2. */
function ratioLabel(ratio: number): string {
  const candidates: [number, number][] = [
    [1, 1], [4, 3], [3, 2], [16, 10], [16, 9], [21, 9], [2, 1], [3, 4], [4, 5], [2, 3], [9, 16],
  ];
  let best = candidates[0];
  let bestDiff = Infinity;
  for (const [w, h] of candidates) {
    const diff = Math.abs(w / h - ratio);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = [w, h];
    }
  }
  return `${best[0]}:${best[1]}`;
}

interface PlateProps {
  register: ImageRegister;
  ratio: number;
  /** Printed at the bottom left of the plate. Also seeds the drawing. */
  label?: string;
  /** Hides the caption strip. Used where the plate is very small. */
  bare?: boolean;
  className?: string;
}

export function Plate({ register, ratio, label, bare = false, className }: PlateProps) {
  const width = 1000;
  const height = Math.round(width / ratio);
  const seed = `${label ?? ''}|${register}|${ratio}`;

  const geometry = useMemo(
    () => drawPlate(register, width, height, seed),
    [register, height, seed],
  );

  // Registration marks, one at each corner, the way a printed sheet is
  // registered. They are the only thing every plate on the site shares.
  const m = Math.min(width, height) * 0.045;
  const inset = Math.min(width, height) * 0.035;
  const corners = [
    [inset, inset, 1, 1],
    [width - inset, inset, -1, 1],
    [inset, height - inset, 1, -1],
    [width - inset, height - inset, -1, -1],
  ] as const;

  return (
    <div className={['plate', className].filter(Boolean).join(' ')} data-register={register}>
      <svg
        className="plate__drawing"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <rect width={width} height={height} className="plate__ground" />

        {geometry.hair.map((d, i) => (
          <path key={`h${i}`} d={d} className="plate__hair" />
        ))}
        {geometry.wash.map((d, i) => (
          <path key={`w${i}`} d={d} className="plate__wash" />
        ))}
        {geometry.fill.map((d, i) => (
          <path key={`f${i}`} d={d} className="plate__fill" />
        ))}
        {geometry.line.map((d, i) => (
          <path key={`l${i}`} d={d} className="plate__line" />
        ))}
        {geometry.mark.map((d, i) => (
          <path key={`m${i}`} d={d} className="plate__mark" />
        ))}

        {/* Sheet border, held off the edge. */}
        <rect
          x={inset}
          y={inset}
          width={width - inset * 2}
          height={height - inset * 2}
          className="plate__border"
        />

        {corners.map(([cx, cy, sx, sy], i) => (
          <g key={`c${i}`} className="plate__registration">
            <path d={`M ${cx} ${cy} L ${cx + m * sx} ${cy}`} />
            <path d={`M ${cx} ${cy} L ${cx} ${cy + m * sy}`} />
          </g>
        ))}
      </svg>

      {!bare && (
        <div className="plate__caption" aria-hidden="true">
          <span className="plate__caption-label">{label ?? register}</span>
          <span className="plate__caption-ratio">{ratioLabel(ratio)}</span>
        </div>
      )}
    </div>
  );
}
