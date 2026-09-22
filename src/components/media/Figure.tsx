/* ==========================================================================
   MAR - FIGURE
   --------------------------------------------------------------------------
   Every picture on the website goes through here.

   If the image has a file, it is shown. If it does not, a drawn plate takes
   its place at exactly the same proportion. If the file is missing or fails
   to load, the plate takes over again, so a broken image icon never appears
   on the site.

   The `treatment` on the image decides how it sits in its frame. There is no
   single treatment applied everywhere: a plan is contained, a photograph is
   cropped, a scan is framed, and an elevation can run to the edges.
   ========================================================================== */

import { useState } from 'react';
import type { MarImage } from '../../content/types';
import { Plate } from '../placeholders/Plate';
import { assetPath } from '../../lib/assetPath';
import './figure.css';

interface FigureProps {
  image: MarImage;
  /** Show the caption under the frame. Defaults to true when there is one. */
  showCaption?: boolean;
  /** Load without waiting for the frame to come into view. Covers only. */
  priority?: boolean;
  /** Overrides the ratio declared on the image. Used by cropped layouts. */
  ratio?: number;
  className?: string;
  /** Used to seed the placeholder drawing when the image has no label. */
  seed?: string;
  /** Hides the placeholder plate's own small corner caption. Used where the
   *  frame already carries its own typographic system (the home hero), so
   *  the plate's technical label does not compete with it. */
  bare?: boolean;
}

export function Figure({
  image,
  showCaption = true,
  priority = false,
  ratio,
  className,
  seed,
  bare = false,
}: FigureProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const effectiveRatio = ratio ?? image.ratio;
  const usePlate = !image.src || failed;
  const label = image.label ?? image.caption ?? seed ?? image.register;

  return (
    <figure
      className={['figure', `figure--${image.treatment}`, className].filter(Boolean).join(' ')}
    >
      <div
        className="figure__frame"
        style={{ aspectRatio: String(effectiveRatio) }}
        data-loaded={usePlate || loaded ? 'true' : 'false'}
      >
        {usePlate ? (
          <Plate register={image.register} ratio={effectiveRatio} label={label} bare={bare} />
        ) : (
          <img
            className="figure__image"
            src={assetPath(image.src)}
            alt={image.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {showCaption && image.caption && (
        <figcaption className="figure__caption">
          {image.label && <span className="figure__caption-label">{image.label}</span>}
          <span className="figure__caption-text">{image.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
