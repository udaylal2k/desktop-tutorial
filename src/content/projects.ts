/* ==========================================================================
   MAR - PROJECTS
   --------------------------------------------------------------------------
   Four complete demonstration projects. They exist so that you can see the
   whole system working before any of your own work is in it.

   Every one of them is marked as demonstration content on the website.
   Nothing here is presented as your work, and no client, award, employer or
   qualification has been invented.

   To add your own project, copy one of these blocks, change the values, and
   put it at the top of the list. CONTENT-GUIDE.md walks through it step by
   step, in plain language.
   ========================================================================== */

import type { Project } from './types';

/** Set to false once your own projects have replaced these four. */
export const projectsAreDemoContent = true;

export const projects: Project[] = [
  /* ======================================================================
     P.001
     ====================================================================== */
  {
    id: 'courtyard-dwelling',
    number: 'P.001',
    title: 'Courtyard Dwelling',
    year: '2024',
    location: 'Inland site',
    type: 'Residential',
    status: 'academic',
    shortDescription:
      'A small house arranged around one open room with no roof over it.',
    description:
      'A demonstration project. The house is organised so that every inhabited room borrows light and air from a single open court, and so that crossing the house always means crossing that court. Replace this text with the description of your own project.',
    tools: ['Rhino', 'AutoCAD', 'Illustrator', 'Physical model'],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for the courtyard dwelling project.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'photograph',
      label: 'Cover',
    },
    sections: [
      {
        id: 'intro',
        kind: 'text',
        label: 'Introduction',
        body: [
          'This is demonstration text. It stands in for the opening of a project description so that you can see how a paragraph sits on the page, how wide the column is, and how it reads against the drawings underneath.',
          'Replace it with the account of your own project. Two or three paragraphs is usually enough at the top of a page. The rest of the argument can be carried by the drawings.',
        ],
      },
      {
        id: 'site-plan',
        kind: 'plate',
        label: 'Site',
        image: {
          src: '',
          alt: 'Demonstration site plan showing the house set within its plot.',
          ratio: 16 / 10,
          treatment: 'contain',
          register: 'plan',
          caption: 'Site plan. Replace with your own drawing.',
          label: 'Drawing 01',
        },
      },
      {
        id: 'plans',
        kind: 'series',
        title: 'Plans',
        label: 'Drawings',
        images: [
          {
            src: '',
            alt: 'Demonstration ground floor plan.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: 'Ground floor',
            label: 'Drawing 02',
          },
          {
            src: '',
            alt: 'Demonstration first floor plan.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: 'First floor',
            label: 'Drawing 03',
          },
        ],
      },
      {
        id: 'court',
        kind: 'aside',
        title: 'The court',
        imageSide: 'right',
        image: {
          src: '',
          alt: 'Demonstration photograph looking into the open court.',
          ratio: 4 / 5,
          treatment: 'cover',
          register: 'photograph',
          label: 'View 01',
        },
        body: [
          'Demonstration text beside an image. This arrangement is useful when a single picture needs an argument next to it rather than a caption under it.',
          'Replace with your own writing. The image can sit on either side; the setting is one line in the content file.',
        ],
      },
      {
        id: 'statement',
        kind: 'statement',
        body: 'A demonstration statement. Use this section when one sentence should stop the page.',
      },
      {
        id: 'section-drawing',
        kind: 'plate',
        label: 'Section',
        image: {
          src: '',
          alt: 'Demonstration long section cut through the court.',
          ratio: 2 / 1,
          treatment: 'contain',
          register: 'section',
          caption: 'Long section. Replace with your own drawing.',
          label: 'Drawing 04',
        },
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Area', value: 'Replace with area' },
          { key: 'Structure', value: 'Replace with structure' },
          { key: 'Cladding', value: 'Replace with material' },
          { key: 'Stage', value: 'Replace with stage' },
        ],
      },
      /* ---- The informal reading. Only shown when INFORMAL is selected. ---- */
      {
        id: 'informal-start',
        kind: 'text',
        mode: 'informal',
        label: 'How it started',
        title: 'Where this came from',
        body: [
          'Demonstration text for the informal reading. This is the place for how the project actually happened rather than how it is presented: the thing that started it, the part that took three attempts, the decision that turned out to be the whole project.',
          'Nothing written here has to be resolved. That is the point of the second reading.',
        ],
      },
      {
        id: 'informal-sketches',
        kind: 'series',
        mode: 'informal',
        title: 'First attempts',
        images: [
          {
            src: '',
            alt: 'Demonstration early sketch of the plan.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: 'First plan. Wrong, but useful.',
          },
          {
            src: '',
            alt: 'Demonstration early sketch of the section.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: 'Second attempt.',
          },
          {
            src: '',
            alt: 'Demonstration study model photographed on a desk.',
            ratio: 1,
            treatment: 'framed',
            register: 'model',
            caption: 'The model that settled it.',
          },
        ],
      },
      {
        id: 'informal-doubt',
        kind: 'statement',
        mode: 'informal',
        body: 'A demonstration note. The informal reading is allowed to admit what the formal one cannot.',
      },
    ],
    archive: ['a-001', 'a-002', 'a-003', 'a-010'],
    related: [
      { kind: 'interest', id: 'photography' },
      { kind: 'journal', id: 'threshold-and-passage' },
      { kind: 'project', id: 'reading-rooms' },
    ],
  },

  /* ======================================================================
     P.002
     ====================================================================== */
  {
    id: 'reading-rooms',
    number: 'P.002',
    title: 'Reading Rooms',
    year: '2025',
    location: 'City edge',
    type: 'Public',
    status: 'competition',
    shortDescription:
      'A small library of separate rooms rather than one large hall.',
    description:
      'A demonstration project. Instead of a single reading hall the building is broken into rooms of different sizes and different light, so that a visitor chooses the room that suits how they want to read. Replace this text with your own.',
    tools: ['Rhino', 'Enscape', 'Illustrator', 'InDesign'],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for the reading rooms project.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'render',
      label: 'Cover',
    },
    sections: [
      {
        id: 'intro',
        kind: 'text',
        label: 'Introduction',
        body: [
          'Demonstration text. A competition entry usually needs its argument stated quickly, because the reader has thirty others to look at. One short paragraph, then the drawings.',
          'Replace this with your own opening.',
        ],
      },
      {
        id: 'elevation',
        kind: 'plate',
        label: 'Elevation',
        image: {
          src: '',
          alt: 'Demonstration street elevation of the library.',
          ratio: 21 / 9,
          treatment: 'bleed',
          register: 'elevation',
          caption: 'Street elevation. Replace with your own drawing.',
          label: 'Drawing 01',
        },
      },
      {
        id: 'rooms',
        kind: 'aside',
        title: 'Seven rooms',
        imageSide: 'left',
        image: {
          src: '',
          alt: 'Demonstration axonometric drawing of the seven rooms.',
          ratio: 4 / 5,
          treatment: 'contain',
          register: 'axonometric',
          label: 'Drawing 02',
        },
        body: [
          'Demonstration text. An axonometric with writing beside it is the clearest way to explain an arrangement of parts.',
          'Replace with your own description of how the pieces are put together.',
        ],
      },
      {
        id: 'views',
        kind: 'series',
        title: 'Interiors',
        images: [
          {
            src: '',
            alt: 'Demonstration interior render of the tall reading room.',
            ratio: 3 / 2,
            treatment: 'cover',
            register: 'render',
            caption: 'The tall room',
          },
          {
            src: '',
            alt: 'Demonstration interior render of the low reading room.',
            ratio: 3 / 2,
            treatment: 'cover',
            register: 'render',
            caption: 'The low room',
          },
        ],
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Brief', value: 'Replace with brief' },
          { key: 'Area', value: 'Replace with area' },
          { key: 'Structure', value: 'Replace with structure' },
          { key: 'Outcome', value: 'Replace with outcome' },
        ],
      },
      {
        id: 'informal-pace',
        kind: 'text',
        mode: 'informal',
        label: 'Working notes',
        title: 'Three weeks',
        body: [
          'Demonstration text for the informal reading. Competitions are short, and the interesting part is usually what got cut on the last weekend.',
          'Replace with your own account.',
        ],
      },
      {
        id: 'informal-cuts',
        kind: 'series',
        mode: 'informal',
        title: 'Cut from the entry',
        images: [
          {
            src: '',
            alt: 'Demonstration discarded plan option.',
            ratio: 4 / 3,
            treatment: 'framed',
            register: 'sketch',
            caption: 'Option that did not survive.',
          },
          {
            src: '',
            alt: 'Demonstration discarded facade study.',
            ratio: 4 / 3,
            treatment: 'framed',
            register: 'diagram',
            caption: 'Facade study, abandoned.',
          },
        ],
      },
    ],
    archive: ['a-004', 'a-005', 'a-011'],
    related: [
      { kind: 'journal', id: 'light-as-a-material' },
      { kind: 'interest', id: 'graphic-design' },
      { kind: 'project', id: 'foundry-conversion' },
    ],
  },

  /* ======================================================================
     P.003
     ====================================================================== */
  {
    id: 'foundry-conversion',
    number: 'P.003',
    title: 'Foundry Conversion',
    year: '2026',
    location: 'Riverside',
    type: 'Adaptive reuse',
    status: 'in-progress',
    shortDescription:
      'An industrial shed kept as it is, with new rooms set inside it.',
    description:
      'A demonstration project. The existing structure is repaired but not corrected. New accommodation is built as free standing rooms within the shed, touching the old fabric as little as possible. Replace this text with your own.',
    tools: ['Rhino', 'AutoCAD', 'Photoshop', 'Hand drawing'],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for the foundry conversion project.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'photograph',
      label: 'Cover',
    },
    sections: [
      {
        id: 'intro',
        kind: 'text',
        label: 'Introduction',
        body: [
          'Demonstration text. A reuse project usually needs two descriptions: what is already there, and what is being added. Keeping them separate on the page makes the argument easier to follow.',
          'Replace with your own writing.',
        ],
      },
      {
        id: 'existing',
        kind: 'series',
        title: 'As found',
        label: 'Survey',
        images: [
          {
            src: '',
            alt: 'Demonstration survey photograph of the existing shed.',
            ratio: 4 / 3,
            treatment: 'cover',
            register: 'photograph',
            caption: 'Looking along the shed',
          },
          {
            src: '',
            alt: 'Demonstration survey photograph of a roof detail.',
            ratio: 4 / 3,
            treatment: 'cover',
            register: 'detail',
            caption: 'Roof junction',
          },
          {
            src: '',
            alt: 'Demonstration survey photograph of the river elevation.',
            ratio: 4 / 3,
            treatment: 'cover',
            register: 'photograph',
            caption: 'River elevation',
          },
        ],
      },
      {
        id: 'break-1',
        kind: 'break',
      },
      {
        id: 'proposed-plan',
        kind: 'plate',
        label: 'Proposed',
        image: {
          src: '',
          alt: 'Demonstration proposed plan with new rooms inside the shed.',
          ratio: 16 / 9,
          treatment: 'contain',
          register: 'plan',
          caption: 'Proposed plan. Replace with your own drawing.',
          label: 'Drawing 01',
        },
      },
      {
        id: 'detail',
        kind: 'aside',
        title: 'Where old meets new',
        imageSide: 'right',
        image: {
          src: '',
          alt: 'Demonstration construction detail at the junction of old and new.',
          ratio: 1,
          treatment: 'contain',
          register: 'detail',
          label: 'Drawing 02',
        },
        body: [
          'Demonstration text. A detail drawing carries more of the argument in a reuse project than any render does.',
          'Replace with your own description.',
        ],
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Existing', value: 'Replace with description' },
          { key: 'Proposed', value: 'Replace with description' },
          { key: 'Structure', value: 'Replace with structure' },
          { key: 'Stage', value: 'Replace with stage' },
        ],
      },
      {
        id: 'informal-survey',
        kind: 'text',
        mode: 'informal',
        label: 'On site',
        title: 'The first visit',
        body: [
          'Demonstration text for the informal reading. Survey days are where reuse projects are actually decided, and the notes from them are usually more honest than the drawings that follow.',
          'Replace with your own account.',
        ],
      },
      {
        id: 'informal-notebook',
        kind: 'plate',
        mode: 'informal',
        title: 'Notebook',
        image: {
          src: '',
          alt: 'Demonstration scan of a notebook page from the site visit.',
          ratio: 3 / 4,
          treatment: 'framed',
          register: 'document',
          caption: 'Site notebook. Replace with your own scan.',
        },
      },
    ],
    archive: ['a-006', 'a-007', 'a-012'],
    related: [
      { kind: 'interest', id: 'photography' },
      { kind: 'journal', id: 'what-a-building-remembers' },
      { kind: 'archive', id: 'a-006' },
    ],
  },

  /* ======================================================================
     P.004
     ====================================================================== */
  {
    id: 'line-of-shelters',
    number: 'P.004',
    title: 'Line of Shelters',
    year: '2026',
    location: 'Upland',
    type: 'Landscape',
    status: 'proposal',
    shortDescription:
      'Five small structures along a walking route, each built the same way.',
    description:
      'A demonstration project. One construction is repeated five times along a path, and only the orientation changes. What the shelters frame is different each time. Replace this text with your own.',
    tools: ['Rhino', 'QGIS', 'Illustrator', 'Physical model'],
    coverImage: {
      src: '',
      alt: 'Demonstration cover image for the line of shelters project.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'photograph',
      label: 'Cover',
    },
    sections: [
      {
        id: 'intro',
        kind: 'text',
        label: 'Introduction',
        body: [
          'Demonstration text. When a project is a repeated element, the page works best if the element is explained once and then the variations are simply shown.',
          'Replace with your own writing.',
        ],
      },
      {
        id: 'route',
        kind: 'plate',
        label: 'Route',
        image: {
          src: '',
          alt: 'Demonstration mapping drawing of the walking route and the five positions.',
          ratio: 21 / 9,
          treatment: 'bleed',
          register: 'diagram',
          caption: 'The route and the five positions.',
          label: 'Drawing 01',
        },
      },
      {
        id: 'the-five',
        kind: 'series',
        title: 'The five',
        images: [
          {
            src: '',
            alt: 'Demonstration elevation of the first shelter.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'elevation',
            caption: 'One',
          },
          {
            src: '',
            alt: 'Demonstration elevation of the second shelter.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'elevation',
            caption: 'Two',
          },
          {
            src: '',
            alt: 'Demonstration elevation of the third shelter.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'elevation',
            caption: 'Three',
          },
        ],
      },
      {
        id: 'statement',
        kind: 'statement',
        body: 'Demonstration statement. The same structure, turned five times, is five different rooms.',
      },
      {
        id: 'construction',
        kind: 'aside',
        title: 'One construction',
        imageSide: 'left',
        image: {
          src: '',
          alt: 'Demonstration exploded axonometric of the shelter construction.',
          ratio: 4 / 5,
          treatment: 'contain',
          register: 'axonometric',
          label: 'Drawing 02',
        },
        body: [
          'Demonstration text. Replace with your own description of how the thing is actually built.',
        ],
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Number', value: 'Five' },
          { key: 'Material', value: 'Replace with material' },
          { key: 'Foundation', value: 'Replace with foundation' },
          { key: 'Stage', value: 'Replace with stage' },
        ],
      },
      {
        id: 'informal-walk',
        kind: 'text',
        mode: 'informal',
        label: 'Walking',
        title: 'Finding the positions',
        body: [
          'Demonstration text for the informal reading. The positions were found by walking, not by drawing, and the photographs from those walks are the real drawings of this project.',
          'Replace with your own account.',
        ],
      },
      {
        id: 'informal-walk-photos',
        kind: 'series',
        mode: 'informal',
        images: [
          {
            src: '',
            alt: 'Demonstration walking photograph looking back along the path.',
            ratio: 1,
            treatment: 'cover',
            register: 'photograph',
          },
          {
            src: '',
            alt: 'Demonstration walking photograph of the ground.',
            ratio: 1,
            treatment: 'cover',
            register: 'photograph',
          },
          {
            src: '',
            alt: 'Demonstration walking photograph of the ridge.',
            ratio: 1,
            treatment: 'cover',
            register: 'photograph',
          },
          {
            src: '',
            alt: 'Demonstration walking photograph at dusk.',
            ratio: 1,
            treatment: 'cover',
            register: 'photograph',
          },
        ],
      },
    ],
    archive: ['a-008', 'a-009', 'a-013'],
    related: [
      { kind: 'interest', id: 'videography' },
      { kind: 'journal', id: 'walking-as-survey' },
      { kind: 'project', id: 'courtyard-dwelling' },
    ],
  },
];
