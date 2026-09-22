/* ==========================================================================
   MAR - ARCHIVE
   --------------------------------------------------------------------------
   The wider body of material behind the finished work: drawings, sketches,
   photographs, process, notes, references, experiments and models.

   An item belongs to a project when it has a `project` id, and to an
   interest when it has an `interest` id. It can have neither.

   An item with `sketchbook: true` also appears in the sketchbook, which is
   the quieter, more personal room reached from the archive and from informal
   project content.

   The items below are drafted material, standing in for the real process
   work (drawings, models, site photographs) behind Maya's five projects,
   until the real files replace them.
   ========================================================================== */

import type { ArchiveItem } from './types';

export const archive: ArchiveItem[] = [
  {
    id: 'a-001',
    title: 'First plan, discarded',
    kind: 'sketch',
    date: '2024-02-11',
    project: 'residence-working-drawing',
    description:
      'The plan the project started from, before the court was opened.',
    image: {
      src: '',
      alt: 'Placeholder for a scan of a discarded plan sketch.',
      ratio: 3 / 4,
      treatment: 'framed',
      register: 'sketch',
    },
    tags: ['plan', 'discarded'],
    sketchbook: true,
    related: [{ kind: 'project', id: 'residence-working-drawing' }],
  },
  {
    id: 'a-002',
    title: 'Study model, cut in half',
    kind: 'model',
    date: '2024-03-04',
    project: 'residence-working-drawing',
    description: 'A model cut through to check the section.',
    image: {
      src: '',
      alt: 'Placeholder for a photograph of a study model cut in half.',
      ratio: 1,
      treatment: 'cover',
      register: 'model',
    },
    tags: ['model', 'section'],
    related: [{ kind: 'project', id: 'residence-working-drawing' }],
  },
  {
    id: 'a-003',
    title: 'Court, measured',
    kind: 'drawing',
    date: '2024-03-22',
    project: 'residence-working-drawing',
    description: 'A dimensioned drawing of the open room.',
    image: {
      src: '',
      alt: 'Placeholder for a dimensioned drawing of a courtyard.',
      ratio: 4 / 3,
      treatment: 'contain',
      register: 'plan',
    },
    tags: ['drawing', 'dimension'],
    related: [{ kind: 'project', id: 'residence-working-drawing' }],
  },
  {
    id: 'a-004',
    title: 'Room sizes, tested',
    kind: 'experiment',
    date: '2025-01-19',
    project: 'library-that-tells-time',
    description:
      'Seven rooms drawn at seven sizes on the same sheet.',
    image: {
      src: '',
      alt: 'Placeholder for a sheet of seven room plans at different sizes.',
      ratio: 16 / 10,
      treatment: 'contain',
      register: 'diagram',
    },
    tags: ['test', 'plan'],
    related: [{ kind: 'project', id: 'library-that-tells-time' }],
  },
  {
    id: 'a-005',
    title: 'Reference, unattributed',
    kind: 'reference',
    date: '2025-01-28',
    project: 'library-that-tells-time',
    description: 'A reference gathered during early research for the library, before its source was noted down.',
    image: {
      src: '',
      alt: 'Placeholder for a reference image.',
      ratio: 4 / 3,
      treatment: 'framed',
      register: 'document',
    },
    tags: ['reference'],
    related: [{ kind: 'project', id: 'library-that-tells-time' }],
  },
  {
    id: 'a-006',
    title: 'Shed, as found',
    kind: 'photo',
    date: '2026-01-08',
    project: 'campus-design',
    description: 'Survey photograph from the first visit.',
    image: {
      src: '',
      alt: 'Placeholder for a survey photograph of an industrial shed.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'photograph',
    },
    tags: ['survey', 'existing'],
    related: [
      { kind: 'project', id: 'campus-design' },
      { kind: 'journal', id: 'what-a-building-remembers' },
    ],
  },
  {
    id: 'a-007',
    title: 'Roof light, midday',
    kind: 'photo',
    date: '2026-01-08',
    project: 'campus-design',
    interest: 'photography',
    description: 'The reason the roof was kept.',
    image: {
      src: '',
      alt: 'Placeholder for a photograph of light falling through a roof.',
      ratio: 4 / 5,
      treatment: 'cover',
      register: 'photograph',
    },
    tags: ['light', 'existing'],
    related: [{ kind: 'interest', id: 'photography' }],
  },
  {
    id: 'a-008',
    title: 'Route, walked twice',
    kind: 'note',
    date: '2026-04-30',
    project: 'multi-module-transport-hub',
    description: 'A notebook page from the second walk.',
    image: {
      src: '',
      alt: 'Placeholder for a scan of a notebook page with a route drawn on it.',
      ratio: 3 / 4,
      treatment: 'framed',
      register: 'document',
    },
    tags: ['site', 'walking'],
    sketchbook: true,
    related: [{ kind: 'journal', id: 'walking-as-survey' }],
  },
  {
    id: 'a-009',
    title: 'Joint, five versions',
    kind: 'process',
    date: '2026-05-14',
    project: 'multi-module-transport-hub',
    description:
      'The same connection drawn five ways on one sheet.',
    image: {
      src: '',
      alt: 'Placeholder for a sheet showing five versions of a timber joint.',
      ratio: 16 / 10,
      treatment: 'contain',
      register: 'detail',
    },
    tags: ['detail', 'process'],
    related: [{ kind: 'project', id: 'multi-module-transport-hub' }],
  },
  {
    id: 'a-010',
    title: 'Margin drawings',
    kind: 'sketch',
    date: '2024-02-27',
    project: 'residence-working-drawing',
    description:
      'Drawings made in the margin of something else.',
    image: {
      src: '',
      alt: 'Placeholder for a scan of small drawings in a page margin.',
      ratio: 1,
      treatment: 'framed',
      register: 'sketch',
    },
    tags: ['margin', 'thinking'],
    sketchbook: true,
    related: [],
  },
  {
    id: 'a-011',
    title: 'Board layout, rejected',
    kind: 'screenshot',
    date: '2025-02-02',
    project: 'library-that-tells-time',
    interest: 'graphic-design',
    description: 'A competition board layout that was abandoned.',
    image: {
      src: '',
      alt: 'Placeholder for a screenshot of a competition board layout.',
      ratio: 16 / 9,
      treatment: 'contain',
      register: 'document',
    },
    tags: ['layout', 'discarded'],
    related: [{ kind: 'interest', id: 'graphic-design' }],
  },
  {
    id: 'a-012',
    title: 'Colour, sampled on site',
    kind: 'process',
    date: '2026-01-09',
    project: 'campus-design',
    description: 'Paint samples held against the existing wall.',
    image: {
      src: '',
      alt: 'Placeholder for a photograph of colour samples against a wall.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'texture',
    },
    tags: ['colour', 'material'],
    related: [],
  },
  {
    id: 'a-013',
    title: 'Dusk, from position three',
    kind: 'photo',
    date: '2026-05-01',
    project: 'multi-module-transport-hub',
    interest: 'photography',
    description: 'The view the third shelter was turned towards.',
    image: {
      src: '',
      alt: 'Placeholder for a photograph of a landscape at dusk.',
      ratio: 21 / 9,
      treatment: 'cover',
      register: 'photograph',
    },
    tags: ['site', 'light'],
    related: [{ kind: 'interest', id: 'photography' }],
  },
  {
    id: 'a-014',
    title: 'Things that are not buildings',
    kind: 'sketch',
    date: '2026-03-16',
    interest: 'graphic-design',
    description:
      'Archive material does not have to belong to a project.',
    image: {
      src: '',
      alt: 'Placeholder for a page of small unrelated drawings.',
      ratio: 4 / 3,
      treatment: 'framed',
      register: 'sketch',
    },
    tags: ['drawing', 'loose'],
    sketchbook: true,
    related: [],
  },
  {
    id: 'a-015',
    title: 'Sound, drawn',
    kind: 'experiment',
    date: '2026-02-21',
    interest: 'music',
    description:
      'An experiment that belongs to an interest rather than to a project.',
    image: {
      src: '',
      alt: 'Placeholder for a drawing made from a sound recording.',
      ratio: 16 / 9,
      treatment: 'contain',
      register: 'diagram',
    },
    tags: ['experiment', 'sound'],
    sketchbook: true,
    related: [{ kind: 'interest', id: 'music' }],
  },
];

/** The kinds shown as filters on the archive page, in this order. */
export const archiveKinds = [
  'drawing',
  'sketch',
  'photo',
  'process',
  'note',
  'reference',
  'experiment',
  'screenshot',
  'model',
] as const;
