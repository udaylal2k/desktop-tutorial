/* ==========================================================================
   MAR - INTERESTS
   --------------------------------------------------------------------------
   Seven interests.

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

   The writing below is drafted in Maya's voice, general enough to be true
   of most people with these interests, rather than invented specifics
   (no real project, credit, publication or performance is claimed).
   Replace any of it with her own account the moment she has it.
   ========================================================================== */

import type { Interest } from './types';

export const interests: Interest[] = [
  {
    id: 'photography',
    code: 'PHO.',
    name: 'Photography',
    description: 'Looking at things for long enough to notice what they are doing.',
    connections: ['film', 'graphic-design', 'videography'],
    formalContent: [
      'Started as a way of paying attention properly, and turned into the habit that everything else runs on. A lot of what ends up in a project - how a material catches light, how a space reads at a particular hour - starts as something noticed through a camera first.',
      'It sits closest to the narrative side of the work: photography is where the looking happens before anything gets designed.',
    ],
    informalContent: [
      'Mostly phone photos and a lot of them never go anywhere - the point is the noticing, not the archive. Still drawn to the same things every time: warm interiors, reflections, a bit of clutter with a story in it.',
    ],
    artwork: {
      mechanic: 'develop',
      prompt: 'Work the sheet',
      reward: 'A photograph, developed.',
      image: {
        src: '',
        alt: 'Placeholder standing in for one of her own photographs.',
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
      'The same instinct as photography, but with the decision of when to stop taken away - a sequence has to hold together across time, not just in a single frame, which changes what you notice while shooting.',
      'Mostly short, mostly handheld, mostly about movement through a space rather than a fixed view of it.',
    ],
    informalContent: [
      'Nothing formal - short clips, mostly of places rather than people, kept more for the record than to show anyone.',
    ],
    artwork: {
      mechanic: 'filmstrip',
      prompt: 'Pull the strip',
      reward: 'A few frames, in sequence.',
      image: {
        src: '',
        alt: 'Placeholder standing in for a set of her own film frames.',
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
      'Deciding what a thing looks like before deciding what it says - layout, type and colour as their own argument, separate from whatever text ends up sitting inside them.',
      'Closer to a design language than to illustration: grids, spacing and a restrained palette, carried over from how the architectural work gets presented as much as how it gets designed.',
    ],
    informalContent: [
      'A lot of it happens in the margins of other work - laying out a set of boards, choosing a typeface, deciding how much white space is too much.',
    ],
    artwork: {
      mechanic: 'assemble',
      prompt: 'Put it back together',
      reward: 'A composition, assembled.',
      image: {
        src: '',
        alt: 'Placeholder standing in for one of her own graphic compositions.',
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
      'Structure you can hear rather than draw - the closest thing to a plan that is not made of lines. A lot of the same instincts apply: repetition, proportion, knowing when to leave something out.',
    ],
    informalContent: [
      'Mostly listening rather than making - whatever is on while working usually ends up shaping the mood of the work itself.',
    ],
    artwork: {
      mechanic: 'postcard',
      prompt: 'Turn it over',
      reward: 'A sleeve, turned over.',
      image: {
        src: '',
        alt: 'Placeholder standing in for a record sleeve of her own.',
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
      'Sequence, framing and duration, worked out by somebody else first - watching closely is its own kind of study, one step removed from making anything directly.',
    ],
    informalContent: [
      'Not particular about genre, more about pace - drawn to films that trust a shot to hold for longer than feels comfortable.',
    ],
    artwork: {
      mechanic: 'evasive',
      prompt: 'Catch the frame',
      reward: 'A still, caught.',
      image: {
        src: '',
        alt: 'Placeholder standing in for a film still of her own.',
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
      'The one interest with no equipment and nowhere to hide - no drawing, no camera, no software between the decision and the result.',
    ],
    informalContent: [
      'Strictly for herself, not for an audience - the appeal is exactly that nothing about it can be redone or edited afterwards.',
    ],
    artwork: {
      mechanic: 'postcard',
      prompt: 'Turn it over',
      reward: 'A card, turned over.',
      image: {
        src: '',
        alt: 'Placeholder standing in for a card of her own.',
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
      'Asking people questions and then having to edit the answers into something worth listening to - closer to narrative direction than it looks, all shape and pacing decided after the fact.',
    ],
    informalContent: [
      'More listener than maker so far, though the appeal of piecing a conversation together afterwards is obvious.',
    ],
    artwork: {
      mechanic: 'assemble',
      prompt: 'Cut it together',
      reward: 'An edit, cut together.',
      image: {
        src: '',
        alt: 'Placeholder standing in for a waveform of her own.',
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
