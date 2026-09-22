/* ==========================================================================
   MAR - JOURNAL
   --------------------------------------------------------------------------
   Six demonstration entries across the three categories.

     research  - papers, studies, academic work, investigations
     articles  - published or publishable writing, features
     notes     - observations, fragments, ideas that are still moving

   Every entry below is marked as demonstration content on the website. No
   real publication, journal, conference or paper has been invented.

   To add your own entry, copy a block, change the values, and put it at the
   top of the list. Any paragraph beginning with '## ' becomes a heading.
   ========================================================================== */

import type { JournalEntry } from './types';

/** Set to false once your own writing has replaced these six. */
export const journalIsDemoContent = true;

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
      'This is demonstration text. It stands in for a research entry so that you can see how a long piece of writing reads on this page: the width of the column, the space between paragraphs, and the way a heading breaks the argument.',
      '## The question',
      'Replace this section with the question your research actually asks. Research entries work best when the question is stated plainly in the first hundred words and then tested for the rest of the piece.',
      'A second paragraph of demonstration text. The column is set to a comfortable reading measure rather than to the full width of the page, because a line of text that is too long is difficult to return from at the end of each line.',
      '## Method',
      'Replace this section with how you went about it. What you looked at, how many, over what period, and what you were prepared to have proved wrong.',
      '## What it suggests',
      'Replace this section with what you found. A research entry does not have to conclude. It has to be honest about how far it got.',
    ],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for a research entry on thresholds.',
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
      'Demonstration text for a second research entry. Two entries in the same category are enough to show how the index groups and orders them, newest first.',
      '## Position',
      'Replace this with your own position. Research writing is allowed to have one, provided it says so.',
      'A further paragraph of demonstration text, so that the page has enough length to show how the reading column behaves when it is scrolled.',
      '## Evidence',
      'Replace this with what you looked at. Photographs, surveys, drawings, and anything you measured yourself.',
    ],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for a research entry on repair.',
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
      'Demonstration text for an article. Articles are written for somebody who does not already agree with you, which usually means shorter sentences and fewer terms that need explaining.',
      'Replace this with your own writing. The category exists for pieces you have published, pieces you would like to publish, and pieces written for a publication rather than for a tutor.',
      '## An example',
      'Replace this section with a worked example. Articles carry better with one specific case than with three general claims.',
      'A closing paragraph of demonstration text.',
    ],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for an article about light.',
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
      'Demonstration text for a second article. Replace it with your own.',
      '## The case for it',
      'Replace this section. An article that argues for something should also say where the argument stops holding.',
      '## The case against',
      'Replace this section too. Articles that only argue one way read as advertising.',
    ],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for an article about hand drawing.',
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
      'Demonstration text for a note. Notes are short. One idea, unfinished, written down before it is lost.',
      'Replace this with your own. There is no obligation to conclude a note, and no obligation to keep it if it stops being interesting.',
    ],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for a note about walking.',
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
      'Demonstration text for a second note. Replace it with your own.',
      'A note can be two paragraphs and still earn its place. The index prints the date beside it, so a note that is never finished still records when the thought arrived.',
    ],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for a note about archives.',
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

/** Printed at the top of each category on the Journal page. */
export const journalCategories = [
  {
    id: 'research' as const,
    name: 'Research',
    description: 'Papers, studies and investigations. Longer, and slower to write.',
  },
  {
    id: 'articles' as const,
    name: 'Articles',
    description: 'Writing addressed to a reader outside the discipline.',
  },
  {
    id: 'notes' as const,
    name: 'Notes',
    description: 'Fragments. Ideas that have not finished moving.',
  },
];
