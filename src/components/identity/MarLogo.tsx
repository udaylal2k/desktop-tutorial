/* ==========================================================================
   MAR - LOGO SYSTEM
   --------------------------------------------------------------------------
   The wordmark is set live in the display typeface rather than saved as a
   picture, so it stays perfectly sharp at every size and in every colour.

   REPLACING THE LOGO
   When your final logo file arrives, put it at public/content/logo.svg and
   set `useSuppliedLogo` to true in src/config/site.config.ts. Nothing else
   on the website has to change: every header, footer, favicon and loading
   screen reads the logo through this one component.
   ========================================================================== */

import { siteConfig } from '../../config/site.config';
import { assetPath } from '../../lib/assetPath';
import './logo.css';

type LogoTone =
  /** Ink on paper. The default, used almost everywhere. */
  | 'ink'
  /** The identity accent. Used on the loading screen and the footer mark. */
  | 'olive'
  /** Paper on a dark ground. Used inside inverted rooms. */
  | 'inverted'
  /** Takes whatever colour its surroundings are set to. */
  | 'current';

interface MarLogoProps {
  tone?: LogoTone;
  /** Font size of the wordmark. Any CSS length. */
  size?: string;
  /** Rendered as the accessible name. Set to '' when a label sits beside it. */
  title?: string;
  className?: string;
}

/**
 * The primary wordmark: M a R.
 * Capital M, lowercase a, capital R, set tight in the display face.
 */
export function MarLogo({
  tone = 'ink',
  size,
  title = 'MAR',
  className,
}: MarLogoProps) {
  if (siteConfig.suppliedLogo) {
    return (
      <img
        src={assetPath(siteConfig.suppliedLogo)}
        alt={title || ''}
        className={['mar-logo', 'mar-logo--supplied', className].filter(Boolean).join(' ')}
        style={size ? { height: size } : undefined}
      />
    );
  }

  return (
    <span
      className={['mar-logo', `mar-logo--${tone}`, className].filter(Boolean).join(' ')}
      style={size ? { fontSize: size } : undefined}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
    >
      <span className="mar-logo__m" aria-hidden="true">
        M
      </span>
      <span className="mar-logo__a" aria-hidden="true">
        a
      </span>
      <span className="mar-logo__r" aria-hidden="true">
        R
      </span>
    </span>
  );
}

/**
 * The mark: the wave taken out of the R, drawn as a single geometric figure.
 * Used where the full wordmark will not fit, and as the favicon.
 */
export function MarMark({
  tone = 'ink',
  size = '2rem',
  title = 'MAR',
  className,
}: MarLogoProps) {
  return (
    <svg
      className={['mar-mark', `mar-mark--${tone}`, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      viewBox="0 0 64 64"
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <rect width="64" height="64" className="mar-mark__ground" />
      {/* The wave: one continuous stroke, rising and falling once. */}
      <path
        d="M 12 42 C 12 22 22 18 30 26 C 36 32 34 44 42 44 C 48 44 52 38 52 30"
        className="mar-mark__wave"
        fill="none"
        strokeWidth="7"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * The wave on its own, used as the site's divider motif: in the footer, on
 * the loading screen, and at the close of a project sequence.
 */
export function MarWave({
  className,
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      className={['mar-wave', className].filter(Boolean).join(' ')}
      viewBox="0 0 240 24"
      preserveAspectRatio="none"
      aria-hidden={ariaHidden}
      focusable="false"
    >
      <path
        d="M 0 18 C 40 18 44 6 80 6 C 116 6 120 18 160 18 C 200 18 204 6 240 6"
        fill="none"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
