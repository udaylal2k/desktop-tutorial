/* ==========================================================================
   MAR - PROJECTS ENTRANCE
   --------------------------------------------------------------------------
   The architectural cover at the entrance to the projects. A day passes over
   it as the visitor scrolls.

   TO USE YOUR OWN PICTURE
   Put a wide photograph or render at public/content/hero/entrance.jpg and
   change `src` below to '/content/hero/entrance.jpg'. Choose something with
   sky in the upper half: the light of the page falls behind it, so a picture
   with an open sky reads best.

   Leave `src` empty and the website draws its own building instead, whose
   windows light as the sun goes down.
   ========================================================================== */

import type { MarImage } from './types';

export const entrance = {
  /** The line held over the cover. Two lines at most. */
  headline: 'The work, over a day.',

  /** One short sentence under it. */
  standfirst:
    'Replace this line with how you want the work introduced. The archive begins below.',

  image: {
    src: '',
    alt: 'The architectural cover at the entrance to the projects.',
    ratio: 16 / 9,
    treatment: 'cover',
    register: 'render',
    label: 'Entrance',
  } satisfies MarImage,

  /** What the four moments of the sequence are called, in order. */
  hours: ['Morning', 'Midday', 'Evening', 'Night'],
} as const;
