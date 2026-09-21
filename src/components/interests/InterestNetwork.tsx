/* ==========================================================================
   MAR - INTEREST NETWORK
   --------------------------------------------------------------------------
   The interests as a connected field rather than a list, because that is
   what they are: photography feeds film, film feeds videography, music
   feeds all three.

   The drawing comes entirely from the `connections` written in
   src/content/interests.ts. Change a list there and the lines redraw. The
   positions are worked out from the number of interests, so adding an
   eighth one rearranges the field on its own.

   KEYBOARD
   Every node is a real button in a list, in content order. Tab moves
   between them, Enter opens one. The lines are decoration and are hidden
   from assistive technology.

   PHONES
   A field of nodes cannot be read or hit accurately on a phone, so below
   the tablet breakpoint the same relationships are printed as a catalogue:
   each interest with its connections listed beside it. It is a different
   drawing of the same data, not a shrunken one.
   ========================================================================== */

import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import type { Interest } from '../../content/types';
import { seeded, r2 } from '../../lib/seed';
import { useIsMobile } from '../../lib/hooks';
import './interest-network.css';

interface Placed {
  interest: Interest;
  x: number;
  y: number;
  /** Relative size, from how many other interests this one touches. */
  weight: number;
}

/**
 * Places the interests around an ellipse, with a measured amount of
 * irregularity so the field reads as a drawing rather than as a clock face.
 */
function place(interests: Interest[]): Placed[] {
  const rng = seeded(interests.map((i) => i.id).join('|'));
  const count = interests.length;
  const degrees = interests.map((i) => i.connections.length);
  const most = Math.max(1, ...degrees);

  return interests.map((interest, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    // The irregularity: each node sits a little nearer or further out.
    const radius = 0.355 + rng.range(-0.05, 0.065);
    return {
      interest,
      x: r2(50 + Math.cos(angle) * radius * 112),
      y: r2(50 + Math.sin(angle) * radius * 132),
      weight: 0.72 + (interest.connections.length / most) * 0.55,
    };
  });
}

export function InterestNetwork({ interests }: { interests: Interest[] }) {
  const mobile = useIsMobile();
  const [active, setActive] = useState<string | null>(null);

  const placed = useMemo(() => place(interests), [interests]);
  const byId = useMemo(
    () => new Map(placed.map((node) => [node.interest.id, node])),
    [placed],
  );

  /** Every connection, written once, so a line is never drawn twice. */
  const edges = useMemo(() => {
    const seen = new Set<string>();
    const out: { a: Placed; b: Placed; key: string }[] = [];

    for (const node of placed) {
      for (const otherId of node.interest.connections) {
        const other = byId.get(otherId);
        if (!other) continue;
        const key = [node.interest.id, otherId].sort().join('~');
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ a: node, b: other, key });
      }
    }
    return out;
  }, [placed, byId]);

  const activeNode = active ? byId.get(active) : null;
  const related = activeNode ? new Set(activeNode.interest.connections) : null;

  const isDimmed = (id: string) =>
    Boolean(active) && id !== active && !related?.has(id);

  /* -------------------------------------------------------------- PHONES */
  if (mobile) {
    return (
      <div className="network-list">
        <p className="network-list__note">
          Each interest, and what it feeds into.
        </p>
        <ul>
          {interests.map((interest) => (
            <li key={interest.id} className="network-list__item">
              <Link to={`/interests/${interest.id}`} className="network-list__link">
                <span className="network-list__code">{interest.code}</span>
                <span className="network-list__name">{interest.name}</span>
                <span className="network-list__description">{interest.description}</span>
              </Link>
              {interest.connections.length > 0 && (
                <p className="network-list__links">
                  <span className="network-list__links-key">Feeds</span>
                  {interest.connections.map((id) => {
                    const other = interests.find((i) => i.id === id);
                    if (!other) return null;
                    return (
                      <Link key={id} to={`/interests/${id}`} className="tag">
                        {other.name}
                      </Link>
                    );
                  })}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ------------------------------------------------------------- THE FIELD */
  return (
    <div className="network">
      <div
        className="network__field"
        data-has-active={Boolean(active)}
        onMouseLeave={() => setActive(null)}
      >
        {/* The lines. Decoration: the relationships are also written out in
            each node's accessible name. */}
        <svg
          className="network__lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {edges.map(({ a, b, key }) => {
            const lit =
              active !== null &&
              (a.interest.id === active ||
                b.interest.id === active);
            const dim = active !== null && !lit;
            return (
              <line
                key={key}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className="network__line"
                data-lit={lit}
                data-dim={dim}
              />
            );
          })}
        </svg>

        <ul className="network__nodes">
          {placed.map(({ interest, x, y, weight }) => (
            <li
              key={interest.id}
              className="network__node-slot"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <Link
                to={`/interests/${interest.id}`}
                className="network__node"
                data-active={active === interest.id}
                data-dim={isDimmed(interest.id)}
                style={{ ['--weight' as string]: weight }}
                onMouseEnter={() => setActive(interest.id)}
                onFocus={() => setActive(interest.id)}
                onBlur={() => setActive(null)}
              >
                <span className="network__node-mark" aria-hidden="true" />
                <span className="network__node-code">{interest.code}</span>
                <span className="network__node-name">{interest.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* What is currently under the cursor or the focus ring. The space is
          held whether or not anything is selected, so the page never jumps. */}
      <div className="network__readout" aria-live="polite">
        {activeNode ? (
          <>
            <p className="network__readout-code">{activeNode.interest.code}</p>
            <p className="network__readout-name">{activeNode.interest.name}</p>
            <p className="network__readout-description">
              {activeNode.interest.description}
            </p>
            <p className="network__readout-links">
              <span className="network__readout-key">Feeds</span>
              {activeNode.interest.connections
                .map((id) => byId.get(id)?.interest.name)
                .filter(Boolean)
                .join(', ') || 'Nothing yet'}
            </p>
          </>
        ) : (
          <p className="network__readout-rest">
            Move over an interest, or tab through them, to see what it touches.
          </p>
        )}
      </div>
    </div>
  );
}
