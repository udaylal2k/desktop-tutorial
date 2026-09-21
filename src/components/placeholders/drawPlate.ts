/* ==========================================================================
   MAR - PLATE DRAWING
   --------------------------------------------------------------------------
   Draws the architectural linework inside a placeholder. Each register gets
   its own construction: a plan is subdivided, a section is cut, an elevation
   is punctured, an axonometric is projected, and so on.

   The drawing is generated from the placeholder's own label, so it never
   changes between visits and no two placeholders on a page look alike.

   None of this survives contact with real content. The moment an image has
   a `src`, the plate is replaced by the photograph.
   ========================================================================== */

import type { ImageRegister } from '../../content/types';
import { seeded, r2, type Rng } from '../../lib/seed';

export interface PlateGeometry {
  /** Hairlines: construction, grid, setting out. */
  hair: string[];
  /** Drawn lines: the subject itself. */
  line: string[];
  /** Filled areas: poché, ground, solid mass. */
  fill: string[];
  /** Lighter filled areas: sky, distance, ground plane, cast light. */
  wash: string[];
  /** Accent marks: one or two only, in the annotation colour. */
  mark: string[];
}

const empty = (): PlateGeometry => ({ hair: [], line: [], fill: [], wash: [], mark: [] });

const rect = (x: number, y: number, w: number, h: number) =>
  `M ${r2(x)} ${r2(y)} H ${r2(x + w)} V ${r2(y + h)} H ${r2(x)} Z`;

const line = (x1: number, y1: number, x2: number, y2: number) =>
  `M ${r2(x1)} ${r2(y1)} L ${r2(x2)} ${r2(y2)}`;

const circle = (cx: number, cy: number, r: number) =>
  `M ${r2(cx - r)} ${r2(cy)} a ${r2(r)} ${r2(r)} 0 1 0 ${r2(r * 2)} 0 a ${r2(r)} ${r2(r)} 0 1 0 ${r2(-r * 2)} 0`;

/** A field of parallel hatching inside a rectangle, at 45 degrees. */
function hatch(x: number, y: number, w: number, h: number, step: number): string[] {
  const out: string[] = [];
  for (let d = -h; d < w; d += step) {
    const x1 = Math.max(x + d, x);
    const y1 = d < 0 ? y - d : y;
    const x2 = Math.min(x + d + h, x + w);
    const y2 = y + (x2 - (x + d));
    if (x2 > x1) out.push(line(x1, y1, x2, Math.min(y2, y + h)));
  }
  return out;
}

/* --------------------------------------------------------------------------
   PLAN
   A footprint, subdivided into rooms, with wall thickness and one opening.
   -------------------------------------------------------------------------- */
function drawPlan(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const pad = Math.min(w, h) * 0.12;
  const x = pad;
  const y = pad;
  const bw = w - pad * 2;
  const bh = h - pad * 2;
  const t = Math.min(bw, bh) * 0.035; // wall thickness

  // Setting out grid.
  const cols = rng.int(4, 6);
  const rows = rng.int(3, 5);
  for (let i = 1; i < cols; i += 1) g.hair.push(line(x + (bw / cols) * i, y - pad * 0.4, x + (bw / cols) * i, y + bh + pad * 0.4));
  for (let i = 1; i < rows; i += 1) g.hair.push(line(x - pad * 0.4, y + (bh / rows) * i, x + bw + pad * 0.4, y + (bh / rows) * i));

  // Outer wall, drawn as poché between two lines.
  g.fill.push(rect(x, y, bw, t), rect(x, y + bh - t, bw, t), rect(x, y, t, bh), rect(x + bw - t, y, t, bh));
  g.line.push(rect(x, y, bw, bh));

  // Internal divisions: two or three rooms, one of them left open.
  const splitX = x + bw * rng.range(0.34, 0.54);
  const splitY = y + bh * rng.range(0.38, 0.6);
  g.fill.push(rect(splitX, y + t, t, splitY - y - t));
  g.fill.push(rect(x + t, splitY, splitX - x - t, t));
  if (rng.chance(0.7)) {
    const second = splitX + (x + bw - splitX) * rng.range(0.4, 0.66);
    g.fill.push(rect(second, splitY, t, y + bh - splitY - t));
  }

  // An opening in the outer wall, with its swing drawn.
  const doorY = y + bh * rng.range(0.55, 0.8);
  const doorW = Math.min(bw, bh) * 0.16;
  g.fill.push(rect(x, doorY, t, doorW)); // reopened below
  g.line.push(`M ${r2(x)} ${r2(doorY)} a ${r2(doorW)} ${r2(doorW)} 0 0 1 ${r2(doorW)} ${r2(doorW)}`);
  g.line.push(line(x, doorY, x, doorY + doorW));

  // The open room: marked, not filled.
  g.mark.push(circle(splitX + (x + bw - splitX) / 2, y + (splitY - y) / 2, Math.min(bw, bh) * 0.018));

  return g;
}

/* --------------------------------------------------------------------------
   SECTION
   Ground, a cut through the mass, and the floors stacked inside it.
   -------------------------------------------------------------------------- */
function drawSection(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const pad = Math.min(w, h) * 0.12;
  const ground = h - pad * 1.4;
  const x = pad;
  const bw = w - pad * 2;
  const top = pad + (h - pad * 2) * rng.range(0.06, 0.2);
  const t = Math.min(bw, h) * 0.022;

  // Ground line and the ground itself.
  g.line.push(line(0, ground, w, ground));
  g.hair.push(...hatch(0, ground, w, h - ground, Math.max(10, w * 0.022)));

  // The cut mass.
  g.line.push(rect(x, top, bw, ground - top));
  g.fill.push(rect(x, top, t, ground - top), rect(x + bw - t, top, t, ground - top));

  // Floors.
  const levels = rng.int(2, 4);
  const spacing = (ground - top) / levels;
  for (let i = 1; i <= levels; i += 1) {
    const fy = top + spacing * i;
    if (fy < ground - 1) g.fill.push(rect(x, fy - t / 2, bw, t));
  }

  // Openings on the cut face.
  for (let i = 0; i < levels; i += 1) {
    const oy = top + spacing * i + spacing * 0.3;
    const ox = x + bw * rng.range(0.16, 0.6);
    const ow = bw * rng.range(0.12, 0.26);
    g.hair.push(rect(ox, oy, ow, spacing * 0.38));
  }

  // A datum: the one accent on the plate.
  const datum = top + (ground - top) * rng.range(0.3, 0.7);
  g.mark.push(line(pad * 0.3, datum, w - pad * 0.3, datum));

  return g;
}

/* --------------------------------------------------------------------------
   ELEVATION
   A flat face, punctured on a grid, standing on a ground line.
   -------------------------------------------------------------------------- */
function drawElevation(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const pad = Math.min(w, h) * 0.12;
  const ground = h - pad * 1.2;
  const x = pad;
  const bw = w - pad * 2;
  const top = pad + (h - pad * 2) * rng.range(0.08, 0.24);

  g.line.push(line(0, ground, w, ground));
  g.line.push(rect(x, top, bw, ground - top));

  const cols = rng.int(4, 8);
  const rows = rng.int(2, 4);
  const cellW = bw / cols;
  const cellH = (ground - top) / rows;
  const inset = Math.min(cellW, cellH) * 0.22;

  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      if (rng.chance(0.22)) continue;
      const ox = x + cellW * c + inset;
      const oy = top + cellH * r + inset;
      const ow = cellW - inset * 2;
      const oh = cellH - inset * 2;
      if (rng.chance(0.2)) {
        g.fill.push(rect(ox, oy, ow, oh));
      } else {
        g.line.push(rect(ox, oy, ow, oh));
        g.hair.push(line(ox + ow / 2, oy, ox + ow / 2, oy + oh));
      }
    }
  }

  // Setting out above the building.
  for (let c = 0; c <= cols; c += 1) {
    g.hair.push(line(x + cellW * c, pad * 0.4, x + cellW * c, top));
  }

  return g;
}

/* --------------------------------------------------------------------------
   AXONOMETRIC
   Volumes projected at thirty degrees, drawn as an exploded stack.
   -------------------------------------------------------------------------- */
function drawAxonometric(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const unit = Math.min(w, h) * 0.13;
  const dx = unit * 1.6;
  const dy = unit * 0.92;
  const cx = w * 0.5;
  const cy = h * 0.62;

  const box = (ox: number, oy: number, bx: number, by: number, height: number) => {
    // Top face as a rhombus, then the two visible sides.
    const p = (gx: number, gy: number, gz: number) => [
      r2(ox + (gx - gy) * dx * 0.5),
      r2(oy + (gx + gy) * dy * 0.5 - gz * unit),
    ];
    const [ax, ay] = p(0, 0, height);
    const [bx2, by2] = p(bx, 0, height);
    const [cx2, cy2] = p(bx, by, height);
    const [dx2, dy2] = p(0, by, height);
    const [ex, ey] = p(0, by, 0);
    const [fx, fy] = p(bx, by, 0);
    const [gx2, gy2] = p(bx, 0, 0);

    g.fill.push(`M ${ax} ${ay} L ${bx2} ${by2} L ${cx2} ${cy2} L ${dx2} ${dy2} Z`);
    g.line.push(`M ${dx2} ${dy2} L ${ex} ${ey} L ${fx} ${fy} L ${cx2} ${cy2}`);
    g.line.push(`M ${cx2} ${cy2} L ${gx2} ${gy2} L ${bx2} ${by2}`);
    g.line.push(`M ${fx} ${fy} L ${gx2} ${gy2}`);
  };

  const pieces = rng.int(2, 3);
  let lift = 0;
  for (let i = 0; i < pieces; i += 1) {
    const bx = rng.range(1.4, 2.6);
    const by = rng.range(1.2, 2.2);
    const height = rng.range(0.5, 1.1);
    box(cx, cy - lift, bx, by, height);
    lift += unit * (height + rng.range(0.55, 0.9));
  }

  // The projection lines that make it an axonometric rather than a picture.
  g.hair.push(line(cx - dx * 2.6, cy + dy * 0.4, cx + dx * 2.6, cy + dy * 0.4));
  g.hair.push(line(cx, cy - lift - unit * 1.4, cx, cy + dy * 1.6));

  return g;
}

/* --------------------------------------------------------------------------
   DIAGRAM
   Nodes and the relationships between them.
   -------------------------------------------------------------------------- */
function drawDiagram(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const count = rng.int(5, 8);
  const pad = Math.min(w, h) * 0.18;
  const nodes: [number, number][] = [];

  for (let i = 0; i < count; i += 1) {
    nodes.push([rng.range(pad, w - pad), rng.range(pad, h - pad)]);
  }

  // Connect each node to its nearest neighbour, then add a few long links.
  nodes.forEach(([x, y], i) => {
    let best = -1;
    let bestD = Infinity;
    nodes.forEach(([nx, ny], j) => {
      if (i === j) return;
      const d = (nx - x) ** 2 + (ny - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = j;
      }
    });
    if (best >= 0) g.line.push(line(x, y, nodes[best][0], nodes[best][1]));
  });

  for (let i = 0; i < 2; i += 1) {
    const a = nodes[rng.int(0, count - 1)];
    const b = nodes[rng.int(0, count - 1)];
    if (a !== b) g.hair.push(line(a[0], a[1], b[0], b[1]));
  }

  const rad = Math.min(w, h) * 0.022;
  nodes.forEach(([x, y], i) => {
    if (i === 0) g.mark.push(circle(x, y, rad * 1.5));
    else g.fill.push(circle(x, y, rad));
  });

  return g;
}

/* --------------------------------------------------------------------------
   SKETCH
   Loose, overlapping, searching for the line rather than stating it.
   -------------------------------------------------------------------------- */
function drawSketch(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const pad = Math.min(w, h) * 0.16;

  const stroke = (x1: number, y1: number, x2: number, y2: number, passes: number) => {
    for (let i = 0; i < passes; i += 1) {
      const wob = Math.min(w, h) * 0.008;
      const mx = (x1 + x2) / 2 + rng.range(-wob * 3, wob * 3);
      const my = (y1 + y2) / 2 + rng.range(-wob * 3, wob * 3);
      g.line.push(
        `M ${r2(x1 + rng.range(-wob, wob))} ${r2(y1 + rng.range(-wob, wob))} Q ${r2(mx)} ${r2(my)} ${r2(x2 + rng.range(-wob, wob))} ${r2(y2 + rng.range(-wob, wob))}`,
      );
    }
  };

  // A searched box.
  const x = pad;
  const y = pad + (h - pad * 2) * rng.range(0.1, 0.3);
  const bw = w - pad * 2;
  const bh = h - y - pad;
  stroke(x, y, x + bw, y, 2);
  stroke(x + bw, y, x + bw, y + bh, 2);
  stroke(x + bw, y + bh, x, y + bh, 2);
  stroke(x, y + bh, x, y, 2);

  // Things inside it.
  for (let i = 0; i < rng.int(3, 6); i += 1) {
    const sx = rng.range(x, x + bw * 0.7);
    const sy = rng.range(y, y + bh * 0.8);
    stroke(sx, sy, sx + rng.range(bw * 0.12, bw * 0.4), sy + rng.range(-bh * 0.2, bh * 0.25), 1);
  }

  // A line that was worked over until it was right.
  const ky = y + bh * rng.range(0.4, 0.7);
  stroke(x + bw * 0.1, ky, x + bw * 0.9, ky, 3);

  return g;
}

/* --------------------------------------------------------------------------
   PHOTOGRAPH AND RENDER
   Not a pretend photograph. Masses standing on a ground under an open sky,
   which is what an architectural photograph is before there is anything
   particular in it. One mass carries the full tone; the others stand
   further back and are paler, because there is more air in front of them.
   -------------------------------------------------------------------------- */
function drawField(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const horizon = h * rng.range(0.7, 0.8);

  // The ground, drawn as a field of hairlines rather than as a tone, so it
  // reads as a surface receding rather than as a grey band.
  g.hair.push(...hatch(0, horizon, w, h - horizon, Math.max(12, w * 0.03)));
  g.line.push(line(0, horizon, w, horizon));

  // Three masses across the picture, each standing on the horizon.
  const spans: [number, number][] = [
    [rng.range(0.03, 0.1), rng.range(0.2, 0.3)],
    [rng.range(0.3, 0.4), rng.range(0.26, 0.36)],
    [rng.range(0.68, 0.76), rng.range(0.16, 0.26)],
  ];

  // Whichever one is nearest takes the full tone. The others stand back.
  const near = rng.int(0, 2);

  spans.forEach(([left, width], index) => {
    const x = w * left;
    const mw = w * width;
    const mh = h * (index === near ? rng.range(0.3, 0.46) : rng.range(0.18, 0.34));
    const y = horizon - mh;

    if (index === near) {
      g.fill.push(rect(x, y, mw, mh));
      // One opening cut in the face, held well off the corners.
      const ow = mw * rng.range(0.18, 0.34);
      const oh = mh * rng.range(0.2, 0.36);
      g.wash.push(rect(x + mw * rng.range(0.2, 0.46), y + mh * rng.range(0.2, 0.4), ow, oh));
      // And the shadow it lays across the ground.
      const cast = mh * rng.range(0.12, 0.24);
      g.hair.push(
        `M ${r2(x)} ${r2(horizon)} L ${r2(x - cast * 0.8)} ${r2(horizon + cast)} L ${r2(x + mw - cast * 0.8)} ${r2(horizon + cast)} L ${r2(x + mw)} ${r2(horizon)} Z`,
      );
      // The datum: the eaves line carried out across the whole picture.
      g.hair.push(line(0, y, w, y));
    } else {
      g.wash.push(rect(x, y, mw, mh));
      g.hair.push(rect(x, y, mw, mh));
    }
  });

  // The one annotation: a short tick against the horizon, not a rule across
  // the whole sheet.
  const tick = w * rng.range(0.12, 0.7);
  g.mark.push(line(tick, horizon - h * 0.045, tick, horizon));

  return g;
}

/* --------------------------------------------------------------------------
   MODEL
   Stacked card, photographed from slightly above.
   -------------------------------------------------------------------------- */
function drawModel(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const cx = w * 0.5;
  const base = h * 0.76;
  const layers = rng.int(3, 5);
  let lw = Math.min(w, h) * rng.range(0.6, 0.78);
  let ly = base;

  g.hair.push(line(0, base, w, base));

  for (let i = 0; i < layers; i += 1) {
    const lh = Math.min(w, h) * rng.range(0.055, 0.1);
    const offset = (rng.next() - 0.5) * lw * 0.22;
    const x = cx - lw / 2 + offset;
    g.line.push(rect(x, ly - lh, lw, lh));
    if (i % 2 === 0) g.fill.push(rect(x, ly - lh, lw, lh * 0.18));
    ly -= lh + Math.min(w, h) * 0.012;
    lw *= rng.range(0.76, 0.93);
  }

  return g;
}

/* --------------------------------------------------------------------------
   DETAIL
   Layers of construction with leaders out to where the annotation goes.
   -------------------------------------------------------------------------- */
function drawDetail(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const x = w * 0.14;
  const bw = w * 0.46;
  let y = h * 0.14;
  const layers = rng.int(4, 6);

  for (let i = 0; i < layers; i += 1) {
    const lh = (h * 0.72) / layers;
    g.line.push(rect(x, y, bw, lh));
    if (rng.chance(0.45)) g.hair.push(...hatch(x, y, bw, lh, Math.max(7, w * 0.016)));
    else if (rng.chance(0.4)) g.fill.push(rect(x, y, bw, lh * 0.22));

    // Leader out to the annotation column.
    const ly = y + lh * 0.5;
    g.hair.push(line(x + bw, ly, w * 0.8, ly));
    g.hair.push(line(w * 0.8, ly, w * 0.86, ly));
    g.fill.push(circle(x + bw, ly, Math.min(w, h) * 0.008));
    y += lh;
  }

  g.mark.push(line(w * 0.8, h * 0.12, w * 0.8, h * 0.88));
  return g;
}

/* --------------------------------------------------------------------------
   TEXTURE
   A material field, at the grain the material is read at.
   -------------------------------------------------------------------------- */
function drawTexture(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const step = Math.max(10, Math.min(w, h) * 0.055);
  const courses = Math.ceil(h / step);

  for (let i = 0; i < courses; i += 1) {
    const y = i * step;
    g.hair.push(line(0, y, w, y));
    const offset = (i % 2) * step * 1.1;
    for (let x = offset; x < w; x += step * 2.2) {
      g.hair.push(line(x, y, x, Math.min(y + step, h)));
    }
  }
  // One course that is different, so the field has a subject.
  const special = rng.int(1, courses - 2);
  g.fill.push(rect(0, special * step, w, step));
  return g;
}

/* --------------------------------------------------------------------------
   PORTRAIT
   A figure implied by the frame around it, not drawn.
   -------------------------------------------------------------------------- */
function drawPortrait(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const cx = w * 0.5;
  const headR = Math.min(w, h) * rng.range(0.15, 0.185);
  const headY = h * 0.34;

  g.line.push(circle(cx, headY, headR));
  // Shoulders: two arcs meeting the bottom of the frame.
  const sy = headY + headR * 1.5;
  const sw = headR * 2.5;
  g.line.push(
    `M ${r2(cx - sw)} ${r2(h)} C ${r2(cx - sw)} ${r2(sy)} ${r2(cx - headR * 0.9)} ${r2(sy - headR * 0.2)} ${r2(cx)} ${r2(sy - headR * 0.25)}`,
  );
  g.line.push(
    `M ${r2(cx + sw)} ${r2(h)} C ${r2(cx + sw)} ${r2(sy)} ${r2(cx + headR * 0.9)} ${r2(sy - headR * 0.2)} ${r2(cx)} ${r2(sy - headR * 0.25)}`,
  );

  // Setting out: the thirds a portrait is composed on.
  g.hair.push(line(0, h / 3, w, h / 3), line(0, (h / 3) * 2, w, (h / 3) * 2));
  g.hair.push(line(w / 3, 0, w / 3, h), line((w / 3) * 2, 0, (w / 3) * 2, h));
  g.mark.push(circle(cx, headY, Math.min(w, h) * 0.012));

  return g;
}

/* --------------------------------------------------------------------------
   DOCUMENT
   A written page, seen from far enough away that the words are only rhythm.
   -------------------------------------------------------------------------- */
function drawDocument(w: number, h: number, rng: Rng): PlateGeometry {
  const g = empty();
  const pad = Math.min(w, h) * 0.14;
  const x = pad;
  const right = w - pad;
  let y = pad;
  const lh = Math.min(w, h) * 0.055;

  g.hair.push(rect(pad * 0.55, pad * 0.55, w - pad * 1.1, h - pad * 1.1));

  while (y < h - pad) {
    if (rng.chance(0.14)) {
      // A heading.
      g.fill.push(rect(x, y, (right - x) * rng.range(0.3, 0.55), lh * 0.42));
      y += lh * 1.5;
      continue;
    }
    if (rng.chance(0.1)) {
      // A break in the writing.
      y += lh;
      continue;
    }
    const lineWidth = (right - x) * rng.range(0.62, 1);
    g.line.push(line(x, y + lh * 0.5, x + lineWidth, y + lh * 0.5));
    y += lh;
  }

  return g;
}

/* --------------------------------------------------------------------------
   THE SWITCH
   -------------------------------------------------------------------------- */
export function drawPlate(
  register: ImageRegister,
  width: number,
  height: number,
  seed: string,
): PlateGeometry {
  const rng = seeded(`${register}:${seed}`);

  switch (register) {
    case 'plan':
      return drawPlan(width, height, rng);
    case 'section':
      return drawSection(width, height, rng);
    case 'elevation':
      return drawElevation(width, height, rng);
    case 'axonometric':
      return drawAxonometric(width, height, rng);
    case 'diagram':
      return drawDiagram(width, height, rng);
    case 'sketch':
      return drawSketch(width, height, rng);
    case 'model':
      return drawModel(width, height, rng);
    case 'detail':
      return drawDetail(width, height, rng);
    case 'texture':
      return drawTexture(width, height, rng);
    case 'portrait':
      return drawPortrait(width, height, rng);
    case 'document':
      return drawDocument(width, height, rng);
    case 'photograph':
    case 'render':
    default:
      return drawField(width, height, rng);
  }
}
