/* ==========================================================================
   MAR - ABOUT
   --------------------------------------------------------------------------
   Everything the website says about you. It appears on the home page and in
   the About panel that slides in from the side of any page.

   Every line below is placeholder text written for you to replace. Nothing
   here has been invented about you: no school, no employer, no award, no
   qualification. Replace each line with the true one and delete the rest.
   ========================================================================== */

import type { MarImage } from './types';

export const about = {
  /* ------------------------------------------------------------------------
     THE TWO PORTRAITS
     The home page shows you twice: once as you present yourself, once as you
     actually are. Replace both files and keep the proportions.

     Put your photographs at:
       public/content/portraits/formal.jpg     (tall, roughly 4 wide by 5 tall)
       public/content/portraits/informal.jpg   (square)

     Then change `src` below from '' to the path, and rewrite `alt`.
     ------------------------------------------------------------------------ */
  portraitFormal: {
    src: '',
    alt: 'Replace with a description of your formal portrait.',
    ratio: 4 / 5,
    treatment: 'cover',
    register: 'portrait',
    label: 'Portrait',
  } satisfies MarImage,

  portraitInformal: {
    src: '',
    alt: 'Replace with a description of your informal photograph.',
    ratio: 1,
    treatment: 'cover',
    register: 'photograph',
    label: 'Off duty',
  } satisfies MarImage,

  /* ------------------------------------------------------------------------
     THE OPENING
     The first thing a visitor reads. Keep it short. Two lines at most.
     ------------------------------------------------------------------------ */
  headline: 'Replace this with who you are.',
  standfirst:
    'Replace this paragraph with two or three sentences about what you do and how you work. Write it as you would say it out loud.',

  /* ------------------------------------------------------------------------
     THE ABOUT PANEL
     Five short sections. Delete any you do not want; the panel adjusts.
     ------------------------------------------------------------------------ */
  panel: [
    {
      id: 'who-i-am',
      title: 'Who I am',
      body: [
        'Replace this with a short account of who you are. A paragraph is enough. The panel is not a curriculum vitae, it is an introduction.',
        'A second paragraph is optional. Delete this line if you do not need it.',
      ],
    },
    {
      id: 'education',
      title: 'Education',
      /** Each entry is a year and a line. Add or remove as many as you like. */
      entries: [
        { key: 'Replace with year', value: 'Replace with your course and institution.' },
        { key: 'Replace with year', value: 'Replace with your earlier study.' },
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
        'Replace this with what you are working on now. One or two sentences. This is the part of the panel worth keeping up to date.',
      ],
    },
    {
      id: 'approach',
      title: 'Approach',
      body: [
        'Replace this with how you work. What you look for first, what you care about, what you are usually doing when a project starts to make sense.',
      ],
    },
  ],

  /* ------------------------------------------------------------------------
     THE SHORT ANSWERS
     Printed on the home page as a small schedule beside the portraits.
     ------------------------------------------------------------------------ */
  schedule: [
    { key: 'Based', value: 'Replace with where you are' },
    { key: 'Focus', value: 'Replace with your current focus' },
    { key: 'Study', value: 'Replace with your education' },
    { key: 'Working in', value: 'Replace with your main tools' },
  ],
} as const;
