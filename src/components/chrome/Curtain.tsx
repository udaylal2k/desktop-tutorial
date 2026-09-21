/* ==========================================================================
   MAR - CURTAIN
   --------------------------------------------------------------------------
   The opening. Not a spinner: three rules draw themselves across the page,
   the wordmark is set, and the curtain lifts.

   It waits for the typefaces and no longer. If they are already cached it
   is gone in a few hundred milliseconds, and under a reduced motion setting
   it does not appear at all.
   ========================================================================== */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MarLogo } from '../identity/MarLogo';
import { site } from '../../content/site';
import { siteConfig } from '../../config/site.config';
import { usePrefersReducedMotion } from '../../lib/hooks';
import './curtain.css';

/** The shortest time the curtain is allowed to be up, so it never flickers. */
const MINIMUM = 420;
/** The longest, so a slow network never holds the site hostage. */
const MAXIMUM = 1600;

export function Curtain() {
  const reduced = usePrefersReducedMotion();
  const [up, setUp] = useState<boolean>(() => siteConfig.loadingSequence);

  useEffect(() => {
    if (!up) return;

    if (reduced) {
      setUp(false);
      return;
    }

    const started = Date.now();
    let timer = 0;
    let cancelled = false;

    const lift = () => {
      if (cancelled) return;
      const waited = Date.now() - started;
      timer = window.setTimeout(() => !cancelled && setUp(false), Math.max(0, MINIMUM - waited));
    };

    const ceiling = window.setTimeout(lift, MAXIMUM);

    // The typefaces are the only asset the first view genuinely needs.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) {
      fonts.ready.then(lift).catch(lift);
    } else {
      lift();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(ceiling);
    };
  }, [reduced, up]);

  return (
    <AnimatePresence>
      {up && (
        <motion.div
          className="curtain"
          // The curtain lifts upward, which is the direction the page
          // arrives from. Movement on the site is always directional.
          exit={{ y: '-100%' }}
          transition={{ duration: 0.72, ease: [0.7, 0, 0.84, 0] }}
          aria-hidden="true"
        >
          <div className="curtain__inner">
            <MarLogo size="clamp(3rem, 12vw, 7rem)" tone="olive" title="" />
            <p className="curtain__statement">{site.statement}</p>
          </div>

          <div className="curtain__rules" aria-hidden="true">
            <span style={{ '--d': '0ms' } as React.CSSProperties} />
            <span style={{ '--d': '90ms' } as React.CSSProperties} />
            <span style={{ '--d': '180ms' } as React.CSSProperties} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
