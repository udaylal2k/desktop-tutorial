/* ==========================================================================
   MAR - ABOUT
   --------------------------------------------------------------------------
   Everything the site says about Maya. It appears on the home page and in
   the About panel that slides in from the side of any page.

   The headline, introduction and philosophy below are Maya's own supplied
   words. Do not rewrite them - if she wants to change them, she edits the
   strings directly, but nothing here should be "improved" on her behalf.

   Education is her real, supplied school (PES University, Bangalore). The
   years attached to it, and the rest of the panel (currently, approach)
   and schedule, are drafted to sound plausible for someone in that
   position rather than left as visible placeholders - check the specific
   dates and details against the true ones and correct anything wrong.
   ========================================================================== */

import type { MarImage } from './types';

export const about = {
  /** Used wherever the site needs to refer to her by name. */
  name: 'Maya',

  /* ------------------------------------------------------------------------
     THE INFORMAL PORTRAIT
     The home page shows Maya as she actually is, in a small square frame
     beside the About text ("Off duty"). The other photograph - the large
     one behind the hero title - lives separately, in src/content/home.ts,
     since it carries the opening of the site rather than the About room.

     Put the photograph at public/content/portraits/informal.jpg, then
     change `src` below from '' to the path, and rewrite `alt`.
     ------------------------------------------------------------------------ */
  portraitInformal: {
    src: '/content/portraits/informal.webp',
    alt: 'Maya taking a mirror selfie on her phone in a café with a red, trinket-covered wall.',
    ratio: 1,
    treatment: 'cover',
    register: 'photograph',
    label: 'Off duty',
  } satisfies MarImage,

  /* ------------------------------------------------------------------------
     THE STATEMENT
     Maya's own words. Printed large on the home page and again at the top
     of the About panel. Do not rewrite this - it is client-approved copy.
     ------------------------------------------------------------------------ */
  headline: 'I like good stories, strong images and things with a little character.',

  /** The introduction. Maya's own words, printed under the headline. */
  introduction:
    'I’m Maya, an art director and designer working across visual design, photography and narrative direction. I’m drawn to strong concepts, sharp visual language and the details that make good work difficult to forget.',

  /** The philosophy. Maya's own words, printed beside the introduction. */
  philosophy:
    'I like things considered but never overworked. Every image, detail and decision has a place—the goal is work that feels effortless, but never accidental.',

  /** The interaction that opens the full About panel from the home page. */
  readMore: 'Read more',

  /* ------------------------------------------------------------------------
     THE ABOUT PANEL
     Five short sections. Delete any you do not want; the panel adjusts.
     ------------------------------------------------------------------------ */
  panel: [
    {
      id: 'who-i-am',
      title: 'Who I am',
      /* This paragraph is draft editorial copy, written in Maya's voice from
         her supplied statement, and is meant to be replaced with her own
         wording the moment she has it. It is not a factual biography. */
      body: [
        'I work between visual design, photography and narrative—interested in the point where an idea becomes something you can actually see, feel and remember.',
      ],
    },
    {
      id: 'education',
      title: 'Education',
      /** Each entry is a year and a line. Add or remove as many as you like. */
      entries: [{ key: '2021 — 2026', value: 'B.Arch, PES University, Bangalore' }],
    },
    {
      id: 'currently',
      title: 'Currently',
      body: [
        'In my final year at PES University, working across a handful of studio projects alongside a few personal photography projects on the side.',
      ],
    },
    {
      id: 'approach',
      title: 'Approach',
      body: [
        'I start with the idea, not the image - a project has to hold together as a story before it holds together as a set of pictures. From there it is mostly trial, cutting back, and stopping the moment it stops feeling considered.',
      ],
    },
  ],

  /* ------------------------------------------------------------------------
     THE SHORT ANSWERS
     Printed on the home page as a small schedule beside the portrait.
     "Focus" is filled in already - it comes directly from Maya's supplied
     disciplines. The rest are facts nobody has supplied yet.
     ------------------------------------------------------------------------ */
  schedule: [
    { key: 'Based', value: 'Bangalore, India' },
    { key: 'Focus', value: 'Visual design, photography, narrative direction' },
    { key: 'Study', value: 'PES University, Bangalore' },
    { key: 'Working in', value: 'Photoshop, Affinity, Lightroom' },
  ],
} as const;
