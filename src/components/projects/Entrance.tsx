/* ==========================================================================
   MAR - PROJECTS ENTRANCE
   --------------------------------------------------------------------------
   The threshold into the work. The building holds still while a day passes
   behind it: the sun rises across the sky, the light warms and then cools,
   the sun sets, the windows come on, and the moon takes its place.

   HOW IT IS BUILT
   The stage is held with `position: sticky` and the movement is read from
   the scroll position with motion values. Nothing listens to the scroll
   event, nothing re-renders while the page moves, and nothing has to be
   measured or refreshed when the window is resized.

   REDUCED MOTION
   The sequence collapses to a single composed view at dusk, with the same
   words and the same way through. Nothing is lost except the travelling.

   KEYBOARD
   The whole sequence is ordinary page scroll, so the space bar, the arrow
   keys and Page Down all move through it. A link at the top goes straight
   to the archive for anyone who would rather not.
   ========================================================================== */

import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { entrance } from '../../content/entrance';
import { Figure } from '../media/Figure';
import { EntranceArchitecture } from './EntranceArchitecture';
import { usePrefersReducedMotion, useIsMobile } from '../../lib/hooks';
import './entrance.css';

/* The four moments of the sequence, as fractions of the scroll through it. */
const HOURS = [0, 0.36, 0.68, 1];

/* The sky, at those four moments. Warm and open, then cool and closed. */
const SKY = ['#e8e2d2', '#f3f0e8', '#d8cfc0', '#1b1e1c'];
/* The band at the horizon. The one place the annotation red does any work. */
const HORIZON = ['#d9cdb4', '#e6e0d0', '#c98d72', '#2a2e2a'];
/* The mass of the building, which darkens as the light goes behind it. */
const MASS = ['#4a5340', '#526044', '#3d4433', '#0f1210'];

export function Entrance() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const trackRef = useRef<HTMLDivElement>(null);

  /* The still version has no scroll to read, so its light is simply on. */
  const stillLit = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  /* The sun travels an arc: across, and over. Two transforms, one value. */
  const bodyX = useTransform(scrollYProgress, HOURS, ['11%', '36%', '62%', '84%']);
  const bodyY = useTransform(scrollYProgress, HOURS, ['58%', '17%', '38%', '21%']);
  /* It contracts as it becomes the moon. */
  const bodyScale = useTransform(scrollYProgress, HOURS, [1.1, 1, 0.82, 0.66]);
  /* And cools from a warm disc to a pale one. */
  const bodyColor = useTransform(scrollYProgress, HOURS, [
    '#e4b785',
    '#f6f2e6',
    '#d98f6a',
    '#e9e6dc',
  ]);
  /* The shadow the moon carries and the sun does not. */
  const moonShadow = useTransform(scrollYProgress, [0.78, 1], [0, 1]);

  const skyColor = useTransform(scrollYProgress, HOURS, SKY);
  const horizonColor = useTransform(scrollYProgress, HOURS, HORIZON);
  const massColor = useTransform(scrollYProgress, HOURS, MASS);

  /* The architecture is the anchor. It grows, slowly, and never moves. */
  const architectureScale = useTransform(scrollYProgress, [0, 1], [1, mobile ? 1.12 : 1.2]);

  /* The stars, and the lit windows, arrive together at the end. */
  const night = useTransform(scrollYProgress, [0.66, 0.96], [0, 1]);

  /* The words are held at the start and released as the day opens. Written
     as a function of the progress rather than as keyframes, so the value is
     exactly what it says at every point of the sequence. */
  const titleOpacity = useTransform(scrollYProgress, (value) =>
    value <= 0.12 ? 1 : Math.max(0, 1 - (value - 0.12) / 0.14),
  );
  const titleY = useTransform(scrollYProgress, (value) => {
    const travel = Math.min(1, Math.max(0, value / 0.26));
    return `${(-18 * travel).toFixed(2)}%`;
  });

  /* The hour marks are printed on the sky, so they take their colour from
     it: ink while it is light, paper once it is dark. */
  const hourInk = useTransform(scrollYProgress, (value) =>
    value < 0.6 ? '#171717' : '#f3f0e8',
  );

  /* Which of the four hours is being shown, for the progress mark. */
  const hourIndex = useTransform(scrollYProgress, (value) =>
    Math.min(entrance.hours.length - 1, Math.floor(value * entrance.hours.length)),
  );

  /* ---------------------------------------------------------- REDUCED MOTION
     One composed view. No travelling, no pinning, no scroll linkage. */
  if (reduced) {
    return (
      <section className="entrance entrance--still" data-atmosphere="night">
        <a className="entrance__skip" href="#project-archive">
          Go to the archive
        </a>

        <div className="entrance__stage entrance__stage--still">
          <div className="entrance__sky" style={{ background: SKY[3] }} />
          <div className="entrance__horizon" style={{ background: HORIZON[3] }} />
          <div
            className="entrance__body"
            style={{ left: '76%', top: '22%', background: '#e9e6dc', color: '#e9e6dc' }}
          >
            <span className="entrance__body-shadow" style={{ background: SKY[3], opacity: 1 }} />
          </div>

          <div className="entrance__architecture" style={{ ['--mass' as string]: MASS[3] }}>
            {entrance.image.src ? (
              <Figure image={entrance.image} showCaption={false} priority />
            ) : (
              <EntranceArchitecture lit={stillLit} fit={mobile} />
            )}
          </div>

          <div className="entrance__words">
            <h1 className="entrance__headline display-2">{entrance.headline}</h1>
            <p className="entrance__standfirst">{entrance.standfirst}</p>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------- THE SEQUENCE
     The track is tall. The stage inside it is stuck to the top of the window
     and stays there for the whole of that height, which is what makes the
     building hold still while the day passes. */
  return (
    <section className="entrance" aria-label="Entrance to the projects">
      <a className="entrance__skip" href="#project-archive">
        Go to the archive
      </a>

      <div className="entrance__track" ref={trackRef}>
        <div className="entrance__stage">
          <motion.div className="entrance__sky" style={{ background: skyColor }} />

          {/* Stars, only at the end, and only ever faint. */}
          <motion.div className="entrance__stars" style={{ opacity: night }} aria-hidden="true">
            {STARS.map((star, i) => (
              <span
                key={i}
                style={{
                  left: `${star[0]}%`,
                  top: `${star[1]}%`,
                  opacity: star[2],
                  width: `${star[3]}px`,
                  height: `${star[3]}px`,
                }}
              />
            ))}
          </motion.div>

          {/* The sun, which becomes the moon. */}
          <motion.div
            className="entrance__body"
            style={{
              left: bodyX,
              top: bodyY,
              scale: bodyScale,
              background: bodyColor,
              color: bodyColor,
            }}
            aria-hidden="true"
          >
            <motion.span
              className="entrance__body-shadow"
              style={{ opacity: moonShadow, background: skyColor }}
            />
          </motion.div>

          <motion.div className="entrance__horizon" style={{ background: horizonColor }} />

          {/* The architecture. Anchored, growing, never moving. */}
          <motion.div
            className="entrance__architecture"
            style={{ scale: architectureScale, ['--mass' as string]: massColor }}
          >
            {entrance.image.src ? (
              <Figure image={entrance.image} showCaption={false} priority />
            ) : (
              <EntranceArchitecture lit={night} fit={mobile} />
            )}
          </motion.div>

          {/* The words, held and then released. */}
          <motion.div className="entrance__words" style={{ opacity: titleOpacity, y: titleY }}>
            <h1 className="entrance__headline display-2">{entrance.headline}</h1>
            <p className="entrance__standfirst">{entrance.standfirst}</p>
          </motion.div>

          {/* The hour. Four marks, the current one filled. */}
          <motion.div
            className="entrance__hours"
            aria-hidden="true"
            style={{ ['--hour-ink' as string]: hourInk }}
          >
            {entrance.hours.map((hour, index) => (
              <Hour key={hour} label={hour} index={index} current={hourIndex} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** One of the four hour marks. Fills when the sequence reaches it. */
function Hour({
  label,
  index,
  current,
}: {
  label: string;
  index: number;
  current: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(current, (value) => (value === index ? 1 : 0.35));

  return (
    <motion.span className="entrance__hour" style={{ opacity }}>
      <span className="entrance__hour-rule" />
      {label}
    </motion.span>
  );
}

/* A fixed set of stars: position across, position down, brightness, size.
   Written out rather than generated so the night sky is the same every
   time the page is entered. */
const STARS: [number, number, number, number][] = [
  [8, 12, 0.5, 2], [17, 28, 0.35, 1.5], [23, 8, 0.7, 2], [31, 20, 0.4, 1.5],
  [38, 34, 0.55, 2], [44, 11, 0.3, 1.5], [52, 25, 0.65, 2], [58, 6, 0.45, 1.5],
  [64, 31, 0.4, 2], [71, 14, 0.6, 1.5], [78, 27, 0.35, 2], [84, 9, 0.5, 1.5],
  [91, 22, 0.45, 2], [12, 41, 0.3, 1.5], [27, 45, 0.4, 1.5], [49, 40, 0.35, 1.5],
  [67, 44, 0.3, 1.5], [88, 38, 0.4, 1.5], [3, 30, 0.35, 1.5], [96, 16, 0.5, 2],
];
