/* ==========================================================================
   MAR - JOURNAL
   --------------------------------------------------------------------------
   Six entries across the three categories.

     research  - papers, studies, academic work, investigations
     articles  - published or publishable writing, features
     notes     - observations, fragments, ideas that are still moving

   The writing itself is drafted, in Maya's voice, around themes her real
   projects naturally raise - not a real publication, conference or paper.
   Replace any entry with her own writing the moment she has it.

   To add your own entry, copy a block, change the values, and put it at the
   top of the list. Any paragraph beginning with '## ' becomes a heading.
   ========================================================================== */

import type { JournalEntry } from './types';

export const journal: JournalEntry[] = [
  /* ---------------------------------------------------------------- RESEARCH */
  {
    id: 'threshold-and-passage',
    title: 'Threshold and Passage',
    category: 'research',
    date: '2026-04-18',
    description:
      'A study of the space between rooms, and of what happens when it is given a size of its own.',
    content: [
      'A threshold is usually drawn as a line - a door, a gate, a change of floor material - but it rarely behaves like one. Given a few extra centimetres of depth, it starts to hold things: a pause, a conversation, a place to put down what you are carrying before you go further in.',
      '## The question',
      'What happens to the space between two rooms when it is given a size of its own, rather than being left as the leftover width of a wall? This came directly out of working through the residence, where every internal junction ended up mattering more than the rooms either side of it.',
      'The working drawings for that project are full of these moments - thresholds that grew from a line into a room in their own right once they were drawn at full scale rather than sketched.',
      '## Method',
      'Mostly by drawing the same junction at increasing levels of detail until it stopped being abstract: plan, then section, then a full-size detail, checking at each stage whether the threshold still did anything once it had real thickness.',
      '## What it suggests',
      'That circulation is not really the space left over after the rooms are placed - it is worth designing first, sometimes.',
    ],
    coverImage: {
      src: '',
      alt: 'Placeholder cover image for the threshold and passage entry.',
      ratio: 16 / 9,
      treatment: 'cover',
      register: 'diagram',
      label: 'Research',
    },
    tags: ['threshold', 'circulation', 'plan'],
    related: [
      { kind: 'project', id: 'residence-working-drawing' },
      { kind: 'interest', id: 'photography' },
    ],
  },
  {
    id: 'what-a-building-remembers',
    title: 'What a Building Remembers',
    category: 'research',
    date: '2026-02-09',
    description:
      'On repair, on visible correction, and on the argument for leaving a mark where it is.',
    content: [
      'Older buildings tend to be repaired quietly - patched to match, so the correction disappears back into the original fabric. It is worth asking what is lost when a repair is made invisible on purpose.',
      '## Position',
      'A visible correction is more honest than an invisible one, and often more interesting to look at: it lets a building keep a record of what has happened to it, rather than presenting itself as finished and unchanged.',
      'This sat behind a lot of the early thinking on the campus project, where several of the shared buildings already carry decades of small additions - the brief was never really about erasing them.',
      '## Evidence',
      'Site photographs of existing junctions, patched brickwork and added service runs across the campus, plus a set of comparative sketches testing how a new addition might sit alongside the old work rather than over it.',
    ],
    coverImage: {
      src: '',
      alt: 'Placeholder cover image for the what a building remembers entry.',
      ratio: 16 / 9,
      treatment: 'cover',
      register: 'photograph',
      label: 'Research',
    },
    tags: ['repair', 'reuse', 'material'],
    related: [
      { kind: 'project', id: 'campus-design' },
      { kind: 'archive', id: 'a-006' },
    ],
  },

  /* ---------------------------------------------------------------- ARTICLES */
  {
    id: 'light-as-a-material',
    title: 'Light as a Material',
    category: 'articles',
    date: '2026-03-27',
    description:
      'Written for a general reader. Why architects talk about light as though it were something you could hold.',
    content: [
      'Architects talk about light the way other people talk about a material - something with weight, direction, a grain you can work with or against. It sounds like a stretch until you spend enough time in a room that changes completely between ten in the morning and four in the afternoon.',
      'The library project made this unavoidable. A reading room is really only interesting once you accept that its main furniture, in a sense, is daylight, and that it rearranges the room on a schedule nobody drew.',
      '## An example',
      'One reading room on the library\'s east face was designed around a single tall opening rather than several smaller ones, specifically so the light would move across the floor as a single visible band through the day - a kind of clock nobody has to wind.',
    ],
    coverImage: {
      src: '',
      alt: 'Placeholder cover image for the light as a material entry.',
      ratio: 16 / 9,
      treatment: 'cover',
      register: 'photograph',
      label: 'Article',
    },
    tags: ['light', 'writing', 'public'],
    related: [
      { kind: 'project', id: 'library-that-tells-time' },
      { kind: 'interest', id: 'photography' },
    ],
  },
  {
    id: 'drawing-before-software',
    title: 'Drawing Before Software',
    category: 'articles',
    date: '2026-01-15',
    description:
      'What a hand drawing still does that a model does not, and when it stops being worth the time.',
    content: [
      'A model tells you almost everything about a design except what it is like to have made a decision by hand - and a hand drawing, slower and less forgiving, still does some things a model quietly skips over.',
      '## The case for it',
      'A hand-drawn section forces a decision at the point of drawing it: a wall either meets a floor in a way that makes sense or it does not, and there is no undo to hide the moment you noticed. That pressure produces better junctions than a model, where the software resolves the geometry whether or not you have actually thought about it.',
      '## The case against',
      'It is slow, and slowness is not free - past a certain point in a project, redrawing everything by hand to "feel it properly" is a way of avoiding decisions rather than making them. The two are worth telling apart.',
    ],
    coverImage: {
      src: '',
      alt: 'Placeholder cover image for the drawing before software entry.',
      ratio: 16 / 9,
      treatment: 'cover',
      register: 'sketch',
      label: 'Article',
    },
    tags: ['drawing', 'tools', 'process'],
    related: [
      { kind: 'interest', id: 'graphic-design' },
      { kind: 'project', id: 'multi-module-transport-hub' },
    ],
  },

  /* ------------------------------------------------------------------- NOTES */
  {
    id: 'walking-as-survey',
    title: 'Walking as Survey',
    category: 'notes',
    date: '2026-05-02',
    description: 'A short note. Some sites only give themselves up at walking pace.',
    content: [
      'Some sites only give themselves up at walking pace. Driving past the transport hub site, or seeing it on a map, it reads as a junction. Walking it, twice, at different times of day, it reads as a sequence of waits.',
      'Not sure yet whether that distinction belongs in the project or just in a notebook. Writing it down before it is lost either way.',
    ],
    coverImage: {
      src: '',
      alt: 'Placeholder cover image for the walking as survey entry.',
      ratio: 4 / 3,
      treatment: 'cover',
      register: 'photograph',
      label: 'Note',
    },
    tags: ['site', 'walking', 'method'],
    related: [{ kind: 'project', id: 'multi-module-transport-hub' }],
  },
  {
    id: 'on-keeping-an-archive',
    title: 'On Keeping an Archive',
    category: 'notes',
    date: '2026-04-05',
    description:
      'A note on why the discarded drawings turn out to be the ones worth filing.',
    content: [
      'The drawings that get kept are usually the finished ones. The discarded plan, the option that did not survive, the sketch with the wrong idea crossed out - these tend to get thrown away precisely because they read as failures.',
      'Which is backwards, a little. The discarded drawing is often the only record of why the surviving one looks the way it does.',
    ],
    coverImage: {
      src: '',
      alt: 'Placeholder cover image for the on keeping an archive entry.',
      ratio: 4 / 3,
      treatment: 'cover',
      register: 'document',
      label: 'Note',
    },
    tags: ['archive', 'process'],
    related: [
      { kind: 'archive', id: 'a-002' },
      { kind: 'interest', id: 'photography' },
    ],
  },
];

/** Printed at the top of each category on the Journal page.
 *  The Notes description below is Maya's own supplied line - keep it as
 *  given. Research and Articles are placeholder copy written to the tone
 *  she asked for (Research more structured, Articles more publication-
 *  oriented) and can be replaced the same way. */
export const journalCategories = [
  {
    id: 'research' as const,
    name: 'Research',
    description: 'Structured investigations: visual research, references and the studies behind a piece of work.',
  },
  {
    id: 'articles' as const,
    name: 'Articles',
    description: 'Writing made for publication - pieces addressed to a reader outside the studio.',
  },
  {
    id: 'notes' as const,
    name: 'Notes',
    /* Maya's own supplied line. Do not rewrite it. */
    description:
      'A collection of things still being figured out — observations, references, images and ideas that are not quite finished enough to call conclusions.',
  },
];
