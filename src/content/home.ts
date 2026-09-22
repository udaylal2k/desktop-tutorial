/* ==========================================================================
   MAR - HOME HERO
   --------------------------------------------------------------------------
   The opening of the site: Maya's own photograph with her own words set
   directly into it. Every string here except the image is Maya's supplied
   copy - do not rewrite it. If she wants a different hero line later, she
   edits the string; nothing here should be "improved" on her behalf.

   TO REPLACE THE HERO PHOTOGRAPH
   Put a portrait or environmental photograph of Maya at
   public/content/portraits/hero.jpg and change `image.src` below to
   '/content/portraits/hero.jpg'. It should be strong enough to carry the
   whole opening screen: the title sits over it, large, so choose a picture
   with room for type rather than one that is already busy edge to edge.
   ========================================================================== */

import type { MarImage } from './types';

export const home = {
  hero: {
    /** The small eyebrow set over the top of the photograph. */
    disciplines: ['Visual Design', 'Photography', 'Narrative Direction'],

    /** The supporting line set over the photograph, opposite the eyebrow. */
    statement:
      'I turn strong ideas into visual worlds — considered, characterful and never without a point of view.',

    /** The dominant typographic statement. Each string is its own line. */
    titleLines: ['ART DIRECTOR', '+', 'DESIGNER'],

    image: {
      src: '',
      alt: 'Replace with a description of the hero photograph of Maya.',
      ratio: 16 / 10,
      treatment: 'cover',
      /* 'photograph' rather than 'portrait': this frame is wide and
         environmental (Maya in a place, not a tight headshot), and the
         portrait register's head-and-shoulders drawing was built for a
         tall frame. 'photograph' draws a field/horizon composition that
         holds its shape at any ratio. */
      register: 'photograph',
      label: 'Hero',
    } satisfies MarImage,
  },

  /* ------------------------------------------------------------------------
     THE SECOND ROOM
     Immediately after the hero: the editorial "About Us" structure - a
     section number, a context label and a year, then Maya's statement,
     introduction and philosophy (all three live in about.ts, since the
     About panel repeats them). This object only holds the marks around
     them.
     ------------------------------------------------------------------------ */
  intro: {
    index: '02',
    label: '(About Us)',
    year: '© 2026',
  },
} as const;
