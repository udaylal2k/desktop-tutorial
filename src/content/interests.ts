/* ==========================================================================
   MAR - INTERESTS
   --------------------------------------------------------------------------
   Seven demonstration interests.

   The FORMAL reading draws them as a connected network: each interest is a
   node, and `connections` draws the lines between them. Change the lists and
   the drawing changes. You never have to touch the drawing code.

   The INFORMAL reading gives each interest something to play with. The
   `artwork.mechanic` chooses which one:

     develop    a blank sheet develops into a picture as it is worked
     filmstrip  the frames of a strip are played by hand
     assemble   scattered pieces are dragged back into a composition
     postcard   a card turns over and there is writing on the back
     evasive    the picture steps away from the cursor until it is caught

   All the writing below is placeholder text. Nothing about the owner's
   actual interests, history or ability has been invented.
   ========================================================================== */

import type { Interest } from './types';

/** Set to false once your own writing has replaced these. */
export const interestsAreDemoContent = true;

export const interests: Interest[] = [
  {
    id: 'photography',
    code: 'PHO.',
    name: 'Photography',
    description: 'Looking at things for long enough to notice what they are doing.',
    connections: ['film', 'graphic-design', 'videography'],
    formalContent: [
      'Demonstration text for the considered account of an interest. This is where you explain what the interest is to you, and what it has to do with the rest of your work.',
      'Replace it with your own. Two or three paragraphs is enough.',
    ],
    informalContent: [
      'Demonstration text for the personal account. This one is allowed to be scrappier. What you actually do, how often, what you are bad at, and the one you would show somebody first.',
      'Replace it with your own.',
    ],
    artwork: {
      mechanic: 'develop',
      prompt: 'Work the sheet',
      reward: 'Demonstration image. Replace it with a photograph of your own.',
      image: {
        src: '',
        alt: 'Demonstration photograph standing in for a photograph of your own.',
        ratio: 4 / 5,
        treatment: 'cover',
        register: 'photograph',
      },
    },
    related: [
      { kind: 'project', id: 'campus-design' },
      { kind: 'journal', id: 'light-as-a-material' },
      { kind: 'archive', id: 'a-007' },
    ],
  },
  {
    id: 'videography',
    code: 'VID.',
    name: 'Videography',
    description: 'The same looking, but with the decision of when to stop taken away.',
    connections: ['film', 'music', 'photography'],
    formalContent: [
      'Demonstration text. Replace with your own account of this interest.',
      'A second paragraph, so that the page has the shape it will have once your writing is in it.',
    ],
    informalContent: [
      'Demonstration text for the personal account. Replace with your own.',
    ],
    artwork: {
      mechanic: 'filmstrip',
      prompt: 'Pull the strip',
      reward: 'Demonstration frames. Replace them with frames of your own.',
      image: {
        src: '',
        alt: 'Demonstration film frames standing in for frames of your own.',
        ratio: 16 / 9,
        treatment: 'cover',
        register: 'photograph',
      },
    },
    related: [
      { kind: 'project', id: 'multi-module-transport-hub' },
      { kind: 'interest', id: 'film' },
    ],
  },
  {
    id: 'graphic-design',
    code: 'GRA.',
    name: 'Graphic Design',
    description: 'Deciding what a thing looks like before deciding what it says.',
    connections: ['photography', 'music'],
    formalContent: [
      'Demonstration text. Replace with your own account of this interest.',
    ],
    informalContent: [
      'Demonstration text for the personal account. Replace with your own.',
    ],
    artwork: {
      mechanic: 'assemble',
      prompt: 'Put it back together',
      reward: 'Demonstration composition. Replace it with work of your own.',
      image: {
        src: '',
        alt: 'Demonstration graphic composition standing in for work of your own.',
        ratio: 1,
        treatment: 'contain',
        register: 'diagram',
      },
    },
    related: [
      { kind: 'journal', id: 'drawing-before-software' },
      { kind: 'project', id: 'library-that-tells-time' },
    ],
  },
  {
    id: 'music',
    code: 'MUS.',
    name: 'Music',
    description: 'Structure you can hear. The closest thing to a plan that is not drawn.',
    connections: ['film', 'singing', 'podcasting'],
    formalContent: [
      'Demonstration text. Replace with your own account of this interest.',
    ],
    informalContent: [
      'Demonstration text for the personal account. Replace with your own.',
    ],
    artwork: {
      mechanic: 'postcard',
      prompt: 'Turn it over',
      reward: 'Demonstration sleeve. Replace it with something of your own.',
      image: {
        src: '',
        alt: 'Demonstration record sleeve standing in for something of your own.',
        ratio: 1,
        treatment: 'cover',
        register: 'texture',
      },
    },
    related: [
      { kind: 'interest', id: 'singing' },
      { kind: 'interest', id: 'film' },
    ],
  },
  {
    id: 'film',
    code: 'FIL.',
    name: 'Film',
    description: 'Sequence, framing and duration, worked out by somebody else first.',
    connections: ['photography', 'music', 'videography'],
    formalContent: [
      'Demonstration text. Replace with your own account of this interest.',
    ],
    informalContent: [
      'Demonstration text for the personal account. Replace with your own.',
    ],
    artwork: {
      mechanic: 'evasive',
      prompt: 'Catch the frame',
      reward: 'Demonstration still. Replace it with a still of your own.',
      image: {
        src: '',
        alt: 'Demonstration film still standing in for a still of your own.',
        ratio: 21 / 9,
        treatment: 'cover',
        register: 'photograph',
      },
    },
    related: [
      { kind: 'interest', id: 'photography' },
      { kind: 'interest', id: 'videography' },
    ],
  },
  {
    id: 'singing',
    code: 'SIN.',
    name: 'Singing',
    description: 'The one interest with no equipment and nowhere to hide.',
    connections: ['music', 'podcasting'],
    formalContent: [
      'Demonstration text. Replace with your own account of this interest.',
    ],
    informalContent: [
      'Demonstration text for the personal account. Replace with your own.',
    ],
    artwork: {
      mechanic: 'postcard',
      prompt: 'Turn it over',
      reward: 'Demonstration card. Replace it with something of your own.',
      image: {
        src: '',
        alt: 'Demonstration card standing in for something of your own.',
        ratio: 3 / 2,
        treatment: 'cover',
        register: 'texture',
      },
    },
    related: [{ kind: 'interest', id: 'music' }],
  },
  {
    id: 'podcasting',
    code: 'POD.',
    name: 'Podcasting',
    description: 'Asking people questions and then having to edit the answers.',
    connections: ['music', 'singing'],
    formalContent: [
      'Demonstration text. Replace with your own account of this interest.',
    ],
    informalContent: [
      'Demonstration text for the personal account. Replace with your own.',
    ],
    artwork: {
      mechanic: 'assemble',
      prompt: 'Cut it together',
      reward: 'Demonstration edit. Replace it with something of your own.',
      image: {
        src: '',
        alt: 'Demonstration waveform standing in for something of your own.',
        ratio: 16 / 9,
        treatment: 'contain',
        register: 'diagram',
      },
    },
    related: [
      { kind: 'interest', id: 'music' },
      { kind: 'interest', id: 'singing' },
    ],
  },
];
