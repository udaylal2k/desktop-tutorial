/* ==========================================================================
   MAR - HOME HERO
   --------------------------------------------------------------------------
   The home page went back to its earlier, simpler opening (headline,
   portrait, a short standfirst - see routes/Home.tsx) rather than the
   full-bleed photo hero this file was originally written for. `image` is
   still the portrait shown there.

   `disciplines`, `statement` and `titleLines` are Maya's own supplied
   words for the photo-led hero treatment and are kept here, unused for
   now, rather than deleted - nothing currently on the page reads them,
   but they are real client copy and may be wanted again. Do not rewrite
   them if they do come back into use.

   TO REPLACE THE PORTRAIT
   Put a photograph of Maya at public/content/portraits/hero.jpg and
   change `image.src` below to '/content/portraits/hero.jpg'.
   ========================================================================== */

import type { MarImage } from './types';

export const home = {
  hero: {
    /** Currently unused. See the file note above. */
    disciplines: ['Visual Design', 'Photography', 'Narrative Direction'],

    /** Currently unused. See the file note above. */
    statement:
      'I turn strong ideas into visual worlds — considered, characterful and never without a point of view.',

    /** Currently unused. See the file note above. */
    titleLines: ['ART DIRECTOR', '+', 'DESIGNER'],

    image: {
      src: '/content/portraits/hero.jpg',
      alt: 'Maya, laughing, holding up a glass Coca-Cola bottle in a warm, eclectically decorated room.',
      ratio: 4 / 5,
      treatment: 'cover',
      register: 'photograph',
      label: 'Hero',
    } satisfies MarImage,
  },
} as const;
