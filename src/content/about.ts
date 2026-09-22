/* ==========================================================================
   MAR - ABOUT
   --------------------------------------------------------------------------
   Everything the site says about Maya. It appears on the home page and in
   the About panel that slides in from the side of any page.

   The headline, introduction and philosophy below are Maya's own supplied
   words. Do not rewrite them - if she wants to change them, she edits the
   strings directly, but nothing here should be "improved" on her behalf.

   Everything else (education, qualifications, currently, approach, the
   short schedule) is placeholder text written for Maya to replace. Nothing
   has been invented: no school, no employer, no award, no qualification.
   Replace each line with the true one and delete the rest.
   ========================================================================== */

import type { MarImage } from './types';

export const about = {
  /** Used wherever the site needs to refer to her by name. */
  name: 'Maya',

  /* ------------------------------------------------------------------------
     THE TWO PORTRAITS
     The home page shows Maya twice: once as she presents herself (the hero,
     full-bleed), once as she actually is (a smaller, informal frame beside
     the About text). Replace both files and keep the proportions.

     Put the photographs at:
       public/content/portraits/formal.jpg     (tall, roughly 4 wide by 5 tall)
       public/content/portraits/informal.jpg   (square)

     Then change `src` below from '' to the path, and rewrite `alt`.
     ------------------------------------------------------------------------ */
  portraitFormal: {
    src: '',
    alt: "Replace with a description of Maya's hero portrait.",
    ratio: 4 / 5,
    treatment: 'cover',
    register: 'portrait',
    label: 'Portrait',
  } satisfies MarImage,

  portraitInformal: {
    src: '',
    alt: "Replace with a description of Maya's informal photograph.",
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
      entries: [
        { key: 'Replace with year', value: 'Replace with the course and institution.' },
        { key: 'Replace with year', value: 'Replace with earlier study.' },
      ],
    },
    {
      id: 'qualifications',
      title: 'Qualifications',
      entries: [
        { key: 'Replace with year', value: 'Replace with a qualification or registration.' },
        { key: 'Replace with year', value: 'Replace with another, or delete this line.' },
      ],
    },
    {
      id: 'currently',
      title: 'Currently',
      body: [
        'Replace this with what Maya is working on now. One or two sentences. This is the part of the panel worth keeping up to date.',
      ],
    },
    {
      id: 'approach',
      title: 'Approach',
      body: [
        'Replace this with how Maya works. What she looks for first, what she cares about, what she is usually doing when a project starts to make sense.',
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
    { key: 'Based', value: 'Replace with where you are' },
    { key: 'Focus', value: 'Visual design, photography, narrative direction' },
    { key: 'Study', value: 'Replace with your education' },
    { key: 'Working in', value: 'Replace with your main tools' },
  ],
} as const;
