/* ==========================================================================
   MAR - PROJECTS
   --------------------------------------------------------------------------
   Maya's five projects, in the exact order and under the exact names she
   supplied. Do not rename them, do not add to them, and do not make the
   titles read more "architectural" than she gave them.

     P.001  Campus Design
     P.002  Library That Tells Time
     P.003  Residence — Working Drawing
     P.004  Multi-Module Transport Hub
     P.005  High Rise Building

   The short/long descriptions below are the client's own supplied draft
   copy for the project index - editorial drafts based only on the project
   names she gave, not confirmed facts. Everything else that would need a
   real fact (year, site location, site size, program, role, tools, the
   drawings and photographs themselves) is left as a bracketed placeholder
   or an empty array until Maya supplies it. Nothing has been invented.

   `focus` is the one field allowed to be a considered editorial line
   rather than a raw fact - each one below is drawn directly from that
   project's own supplied description.
   ========================================================================== */

import type { Project } from './types';

/** These are Maya's real five projects, not demonstration content. */
export const projectsAreDemoContent = false;

export const projects: Project[] = [
  /* ======================================================================
     P.001 — CAMPUS DESIGN
     ====================================================================== */
  {
    id: 'campus-design',
    number: 'P.001',
    title: 'Campus Design',
    year: '[Add year]',
    location: '[Add site location]',
    type: 'Campus',
    siteSize: '[Add site size]',
    program: '[Add program]',
    focus: 'Movement, gathering and the smaller thresholds that make a place feel familiar.',
    role: '[Add role]',
    status: 'unspecified',
    shortDescription:
      'A study of how a campus can hold movement, gathering and quieter moments at the same time.',
    description:
      'A study of how a campus can hold movement, gathering and quieter moments at the same time. The project looks at the relationship between shared spaces and the smaller thresholds that make a place feel familiar.',
    tools: [],
    coverImage: {
      src: '',
      alt: 'Placeholder for the cover image of Campus Design.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'render',
      label: 'Cover',
    },
    sections: [
      {
        id: 'concept',
        kind: 'plate',
        label: '02 — Concept',
        image: {
          src: '',
          alt: 'Placeholder for the concept diagram for Campus Design.',
          ratio: 16 / 10,
          treatment: 'contain',
          register: 'diagram',
          caption: '[Add concept diagram]',
        },
      },
      {
        id: 'context',
        kind: 'aside',
        title: 'Context',
        label: '03 — Context',
        imageSide: 'right',
        image: {
          src: '',
          alt: 'Placeholder for a site context photograph for Campus Design.',
          ratio: 4 / 5,
          treatment: 'cover',
          register: 'photograph',
          label: 'Site',
        },
        body: ['[Add the site and context material for Campus Design.]'],
      },
      {
        id: 'plans',
        kind: 'series',
        title: 'Plans',
        label: '06 — Plans',
        images: [
          {
            src: '',
            alt: 'Placeholder for a campus-level plan drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: '[Add plan]',
          },
          {
            src: '',
            alt: 'Placeholder for a detailed plan of one shared space.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: '[Add plan]',
          },
        ],
      },
      {
        id: 'statement',
        kind: 'statement',
        body: 'Movement, gathering and the smaller thresholds that make a place feel familiar.',
      },
      {
        id: 'elevations',
        kind: 'plate',
        label: '08 — Elevations',
        image: {
          src: '',
          alt: 'Placeholder for an elevation drawing for Campus Design.',
          ratio: 21 / 9,
          treatment: 'bleed',
          register: 'elevation',
          caption: '[Add elevation]',
        },
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Structure', value: '[Add structure]' },
          { key: 'Material', value: '[Add material]' },
          { key: 'Stage', value: '[Add stage]' },
        ],
      },
      /* ---- The informal reading. Only shown when INFORMAL is selected. ---- */
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Campus Design',
        body: ['[Add the sketches, false starts and working notes behind Campus Design.]'],
      },
      {
        id: 'informal-sketches',
        kind: 'series',
        mode: 'informal',
        title: 'Working sketches',
        images: [
          {
            src: '',
            alt: 'Placeholder for an early working sketch for Campus Design.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: '[Add sketch]',
          },
          {
            src: '',
            alt: 'Placeholder for a study model for Campus Design.',
            ratio: 1,
            treatment: 'framed',
            register: 'model',
            caption: '[Add model]',
          },
        ],
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
     P.002 — LIBRARY THAT TELLS TIME
     ====================================================================== */
  {
    id: 'library-that-tells-time',
    number: 'P.002',
    title: 'Library That Tells Time',
    year: '[Add year]',
    location: '[Add site location]',
    type: 'Civic',
    siteSize: '[Add site size]',
    program: '[Add program]',
    focus: 'Light, movement and changing patterns of occupation, registering the day.',
    role: '[Add role]',
    status: 'unspecified',
    shortDescription: 'A library imagined through time rather than simply around it.',
    description:
      'A library imagined through time rather than simply around it. Light, movement and changing patterns of occupation become part of the architectural experience, allowing the building to register the day as much as the people inside it.',
    tools: [],
    coverImage: {
      src: '',
      alt: 'Placeholder for the cover image of Library That Tells Time.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'render',
      label: 'Cover',
    },
    sections: [
      {
        id: 'concept',
        kind: 'plate',
        label: '02 — Concept',
        image: {
          src: '',
          alt: 'Placeholder for the concept diagram for Library That Tells Time.',
          ratio: 16 / 10,
          treatment: 'contain',
          register: 'diagram',
          caption: '[Add concept diagram]',
        },
      },
      {
        id: 'context',
        kind: 'aside',
        title: 'Context',
        label: '03 — Context',
        imageSide: 'left',
        image: {
          src: '',
          alt: 'Placeholder for a site context photograph for Library That Tells Time.',
          ratio: 4 / 5,
          treatment: 'cover',
          register: 'photograph',
          label: 'Site',
        },
        body: ['[Add the site and context material for Library That Tells Time.]'],
      },
      {
        id: 'sections',
        kind: 'series',
        title: 'Sections',
        label: '07 — Sections',
        images: [
          {
            src: '',
            alt: 'Placeholder for a long section through the reading rooms.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'section',
            caption: '[Add section]',
          },
          {
            src: '',
            alt: 'Placeholder for a cross section showing changing light.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'section',
            caption: '[Add section]',
          },
        ],
      },
      {
        id: 'statement',
        kind: 'statement',
        body: 'Light, movement and changing patterns of occupation, registering the day.',
      },
      {
        id: 'visualisations',
        kind: 'plate',
        label: '09 — Visualisations',
        image: {
          src: '',
          alt: 'Placeholder for an interior visualisation for Library That Tells Time.',
          ratio: 16 / 9,
          treatment: 'cover',
          register: 'render',
          caption: '[Add visualisation]',
        },
      },
      { id: 'break-1', kind: 'break' },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Structure', value: '[Add structure]' },
          { key: 'Material', value: '[Add material]' },
          { key: 'Stage', value: '[Add stage]' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Library That Tells Time',
        body: ['[Add the sketches, false starts and working notes behind Library That Tells Time.]'],
      },
      {
        id: 'informal-sketches',
        kind: 'series',
        mode: 'informal',
        title: 'Working sketches',
        images: [
          {
            src: '',
            alt: 'Placeholder for an early working sketch for Library That Tells Time.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: '[Add sketch]',
          },
          {
            src: '',
            alt: 'Placeholder for a light study for Library That Tells Time.',
            ratio: 1,
            treatment: 'framed',
            register: 'diagram',
            caption: '[Add light study]',
          },
        ],
      },
    ],
    archive: ['a-004', 'a-005', 'a-011'],
    related: [
      { kind: 'journal', id: 'light-as-a-material' },
      { kind: 'interest', id: 'graphic-design' },
      { kind: 'project', id: 'campus-design' },
    ],
  },

  /* ======================================================================
     P.003 — RESIDENCE — WORKING DRAWING
     ====================================================================== */
  {
    id: 'residence-working-drawing',
    number: 'P.003',
    title: 'Residence — Working Drawing',
    year: '[Add year]',
    location: '[Add site location]',
    type: 'Residential',
    siteSize: '[Add site size]',
    program: '[Add program]',
    focus: 'Construction, material and the small details that determine how a space comes together.',
    role: '[Add role]',
    status: 'unspecified',
    shortDescription: 'A residence examined through the precision of working drawings.',
    description:
      'A residence examined through the precision of working drawings. Here, architecture moves from an idea into decisions about construction, material, junctions and the small details that determine how a space actually comes together.',
    tools: [],
    coverImage: {
      src: '',
      alt: 'Placeholder for the cover image of Residence — Working Drawing.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'photograph',
      label: 'Cover',
    },
    sections: [
      {
        id: 'concept',
        kind: 'plate',
        label: '02 — Concept',
        image: {
          src: '',
          alt: 'Placeholder for the concept diagram for Residence — Working Drawing.',
          ratio: 16 / 10,
          treatment: 'contain',
          register: 'diagram',
          caption: '[Add concept diagram]',
        },
      },
      {
        id: 'drawings',
        kind: 'series',
        title: 'Working drawings',
        label: '05 — Drawings',
        images: [
          {
            src: '',
            alt: 'Placeholder for a ground floor working drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: '[Add working drawing]',
          },
          {
            src: '',
            alt: 'Placeholder for a construction junction drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'detail',
            caption: '[Add junction drawing]',
          },
          {
            src: '',
            alt: 'Placeholder for a material schedule drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'detail',
            caption: '[Add detail drawing]',
          },
        ],
      },
      {
        id: 'context',
        kind: 'aside',
        title: 'Context',
        label: '03 — Context',
        imageSide: 'right',
        image: {
          src: '',
          alt: 'Placeholder for a site context photograph for Residence — Working Drawing.',
          ratio: 4 / 5,
          treatment: 'cover',
          register: 'photograph',
          label: 'Site',
        },
        body: ['[Add the site and context material for Residence — Working Drawing.]'],
      },
      {
        id: 'statement',
        kind: 'statement',
        body: 'Construction, material and the small details that determine how a space comes together.',
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Structure', value: '[Add structure]' },
          { key: 'Material', value: '[Add material]' },
          { key: 'Junction detail', value: '[Add junction detail]' },
          { key: 'Stage', value: '[Add stage]' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Residence — Working Drawing',
        body: [
          '[Add the sketches, false starts and working notes behind Residence — Working Drawing.]',
        ],
      },
      {
        id: 'informal-sketches',
        kind: 'series',
        mode: 'informal',
        title: 'Working sketches',
        images: [
          {
            src: '',
            alt: 'Placeholder for an early working sketch for Residence — Working Drawing.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: '[Add sketch]',
          },
          {
            src: '',
            alt: 'Placeholder for a construction detail study.',
            ratio: 1,
            treatment: 'framed',
            register: 'detail',
            caption: '[Add detail study]',
          },
        ],
      },
    ],
    archive: ['a-001', 'a-002', 'a-003', 'a-010'],
    related: [
      { kind: 'interest', id: 'photography' },
      { kind: 'journal', id: 'threshold-and-passage' },
      { kind: 'project', id: 'library-that-tells-time' },
    ],
  },

  /* ======================================================================
     P.004 — MULTI-MODULE TRANSPORT HUB
     ====================================================================== */
  {
    id: 'multi-module-transport-hub',
    number: 'P.004',
    title: 'Multi-Module Transport Hub',
    year: '[Add year]',
    location: '[Add site location]',
    type: 'Transport',
    siteSize: '[Add site size]',
    program: '[Add program]',
    focus: 'Repetition as a way of organising movement, waiting and connection.',
    role: '[Add role]',
    status: 'unspecified',
    shortDescription:
      'A transport hub developed through a modular system, where repetition becomes a way of organising movement, waiting and connection.',
    description:
      'A transport hub developed through a modular system, where repetition becomes a way of organising movement, waiting and connection. The project investigates how a larger public building can remain legible while accommodating different rhythms of use.',
    tools: [],
    coverImage: {
      src: '',
      alt: 'Placeholder for the cover image of Multi-Module Transport Hub.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'render',
      label: 'Cover',
    },
    sections: [
      {
        id: 'concept',
        kind: 'plate',
        label: '02 — Concept',
        image: {
          src: '',
          alt: 'Placeholder for the concept diagram for Multi-Module Transport Hub.',
          ratio: 16 / 10,
          treatment: 'contain',
          register: 'diagram',
          caption: '[Add concept diagram]',
        },
      },
      {
        id: 'context',
        kind: 'aside',
        title: 'Context',
        label: '03 — Context',
        imageSide: 'left',
        image: {
          src: '',
          alt: 'Placeholder for a site context photograph for Multi-Module Transport Hub.',
          ratio: 4 / 5,
          treatment: 'cover',
          register: 'photograph',
          label: 'Site',
        },
        body: ['[Add the site and context material for Multi-Module Transport Hub.]'],
      },
      {
        id: 'plans',
        kind: 'series',
        title: 'Plans',
        label: '06 — Plans',
        images: [
          {
            src: '',
            alt: 'Placeholder for a module plan drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: '[Add plan]',
          },
          {
            src: '',
            alt: 'Placeholder for a combined hub plan drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: '[Add plan]',
          },
        ],
      },
      {
        id: 'statement',
        kind: 'statement',
        body: 'Repetition as a way of organising movement, waiting and connection.',
      },
      {
        id: 'elevations',
        kind: 'plate',
        label: '08 — Elevations',
        image: {
          src: '',
          alt: 'Placeholder for an elevation drawing for Multi-Module Transport Hub.',
          ratio: 21 / 9,
          treatment: 'bleed',
          register: 'elevation',
          caption: '[Add elevation]',
        },
      },
      { id: 'break-1', kind: 'break' },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Modules', value: '[Add number of modules]' },
          { key: 'Structure', value: '[Add structure]' },
          { key: 'Stage', value: '[Add stage]' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Multi-Module Transport Hub',
        body: [
          '[Add the sketches, false starts and working notes behind Multi-Module Transport Hub.]',
        ],
      },
      {
        id: 'informal-sketches',
        kind: 'series',
        mode: 'informal',
        title: 'Working sketches',
        images: [
          {
            src: '',
            alt: 'Placeholder for an early working sketch for Multi-Module Transport Hub.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: '[Add sketch]',
          },
          {
            src: '',
            alt: 'Placeholder for a module study model.',
            ratio: 1,
            treatment: 'framed',
            register: 'model',
            caption: '[Add model]',
          },
        ],
      },
    ],
    archive: ['a-008', 'a-009', 'a-013'],
    related: [
      { kind: 'interest', id: 'videography' },
      { kind: 'journal', id: 'walking-as-survey' },
      { kind: 'project', id: 'residence-working-drawing' },
    ],
  },

  /* ======================================================================
     P.005 — HIGH RISE BUILDING
     ====================================================================== */
  {
    id: 'high-rise-building',
    number: 'P.005',
    title: 'High Rise Building',
    year: '[Add year]',
    location: '[Add site location]',
    type: 'High-rise',
    siteSize: '[Add site size]',
    program: '[Add program]',
    focus: 'How people move through, meet within and experience the building at different scales.',
    role: '[Add role]',
    status: 'unspecified',
    shortDescription: 'A vertical study of density, structure and movement.',
    description:
      'A vertical study of density, structure and movement. The project looks at how a high-rise can create more than stacked floor plates by considering how people move through, meet within and experience the building at different scales.',
    tools: [],
    coverImage: {
      src: '',
      alt: 'Placeholder for the cover image of High Rise Building.',
      ratio: 3 / 2,
      treatment: 'cover',
      register: 'photograph',
      label: 'Cover',
    },
    sections: [
      {
        id: 'concept',
        kind: 'plate',
        label: '02 — Concept',
        image: {
          src: '',
          alt: 'Placeholder for the concept diagram for High Rise Building.',
          ratio: 16 / 10,
          treatment: 'contain',
          register: 'diagram',
          caption: '[Add concept diagram]',
        },
      },
      {
        id: 'context',
        kind: 'aside',
        title: 'Context',
        label: '03 — Context',
        imageSide: 'right',
        image: {
          src: '',
          alt: 'Placeholder for a site context photograph for High Rise Building.',
          ratio: 4 / 5,
          treatment: 'cover',
          register: 'photograph',
          label: 'Site',
        },
        body: ['[Add the site and context material for High Rise Building.]'],
      },
      {
        id: 'sections',
        kind: 'series',
        title: 'Sections',
        label: '07 — Sections',
        images: [
          {
            src: '',
            alt: 'Placeholder for a full-height section through the tower.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'section',
            caption: '[Add section]',
          },
          {
            src: '',
            alt: 'Placeholder for a section through a shared floor.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'section',
            caption: '[Add section]',
          },
        ],
      },
      {
        id: 'statement',
        kind: 'statement',
        body: 'How people move through, meet within and experience the building at different scales.',
      },
      {
        id: 'visualisations',
        kind: 'plate',
        label: '09 — Visualisations',
        image: {
          src: '',
          alt: 'Placeholder for a skyline visualisation for High Rise Building.',
          ratio: 16 / 9,
          treatment: 'cover',
          register: 'render',
          caption: '[Add visualisation]',
        },
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Floors', value: '[Add number of floors]' },
          { key: 'Structure', value: '[Add structure]' },
          { key: 'Stage', value: '[Add stage]' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind High Rise Building',
        body: ['[Add the sketches, false starts and working notes behind High Rise Building.]'],
      },
      {
        id: 'informal-sketches',
        kind: 'series',
        mode: 'informal',
        title: 'Working sketches',
        images: [
          {
            src: '',
            alt: 'Placeholder for an early working sketch for High Rise Building.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: '[Add sketch]',
          },
          {
            src: '',
            alt: 'Placeholder for a massing study model.',
            ratio: 1,
            treatment: 'framed',
            register: 'model',
            caption: '[Add model]',
          },
        ],
      },
    ],
    archive: [],
    related: [{ kind: 'project', id: 'multi-module-transport-hub' }],
  },
];
