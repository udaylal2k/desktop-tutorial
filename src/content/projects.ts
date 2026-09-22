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
   names she gave, not confirmed facts.

   Year, location, site size, program, role, status and tools are drafted
   to sound plausible for a final-year architecture student's studio work
   (she studies at PES University, Bangalore, her real, supplied school),
   not confirmed facts - check each one and correct anything wrong. The
   drawings and photographs themselves are still empty, since none exist
   yet; nothing has been invented there.

   `focus` is the one field allowed to be a considered editorial line
   rather than a raw fact - each one below is drawn directly from that
   project's own supplied description.
   ========================================================================== */

import type { Project } from './types';

export const projects: Project[] = [
  /* ======================================================================
     P.001 — CAMPUS DESIGN
     ====================================================================== */
  {
    id: 'campus-design',
    number: 'P.001',
    title: 'Campus Design',
    year: '2024',
    location: 'Bangalore, India',
    type: 'Campus',
    siteSize: '18,000 m²',
    program: 'Academic and shared campus facilities',
    focus: 'Movement, gathering and the smaller thresholds that make a place feel familiar.',
    role: 'Individual',
    status: 'academic',
    shortDescription:
      'A study of how a campus can hold movement, gathering and quieter moments at the same time.',
    description:
      'A study of how a campus can hold movement, gathering and quieter moments at the same time. The project looks at the relationship between shared spaces and the smaller thresholds that make a place feel familiar.',
    tools: ['SketchUp', 'AutoCAD', 'Photoshop'],
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
          caption: 'Concept diagram',
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
        body: [
          'Sited within an existing campus, working with the movement and scale of what is already there rather than against it.',
        ],
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
            caption: 'Plan',
          },
          {
            src: '',
            alt: 'Placeholder for a detailed plan of one shared space.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: 'Plan',
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
          caption: 'Elevation',
        },
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Structure', value: 'Reinforced concrete frame' },
          { key: 'Material', value: 'Concrete, brick and timber screening' },
          { key: 'Stage', value: 'Design development' },
        ],
      },
      /* ---- The informal reading. Only shown when INFORMAL is selected. ---- */
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Campus Design',
        body: [
          'Started from how people already moved through the site before any building was drawn - the early sketches are mostly about paths, not walls.',
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
            alt: 'Placeholder for an early working sketch for Campus Design.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: 'Sketch',
          },
          {
            src: '',
            alt: 'Placeholder for a study model for Campus Design.',
            ratio: 1,
            treatment: 'framed',
            register: 'model',
            caption: 'Model',
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
    year: '2024',
    location: 'Bangalore, India',
    type: 'Civic',
    siteSize: '4,500 m²',
    program: 'Reading rooms, stacks and shared study spaces',
    focus: 'Light, movement and changing patterns of occupation, registering the day.',
    role: 'Individual',
    status: 'academic',
    shortDescription: 'A library imagined through time rather than simply around it.',
    description:
      'A library imagined through time rather than simply around it. Light, movement and changing patterns of occupation become part of the architectural experience, allowing the building to register the day as much as the people inside it.',
    tools: ['Revit', 'SketchUp', 'Photoshop'],
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
          caption: 'Concept diagram',
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
        body: [
          'Set on a quiet edge of the site, oriented to let light move through the reading rooms across the day.',
        ],
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
            caption: 'Section',
          },
          {
            src: '',
            alt: 'Placeholder for a cross section showing changing light.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'section',
            caption: 'Section',
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
          caption: 'Visualisation',
        },
      },
      { id: 'break-1', kind: 'break' },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Structure', value: 'Steel and concrete composite frame' },
          { key: 'Material', value: 'Concrete, timber and glazing' },
          { key: 'Stage', value: 'Design development' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Library That Tells Time',
        body: [
          'Most of the early work was just watching how light moved through a room at different hours, before any of it touched a plan.',
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
            alt: 'Placeholder for an early working sketch for Library That Tells Time.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: 'Sketch',
          },
          {
            src: '',
            alt: 'Placeholder for a light study for Library That Tells Time.',
            ratio: 1,
            treatment: 'framed',
            register: 'diagram',
            caption: 'Light study',
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
    year: '2025',
    location: 'Bangalore, India',
    type: 'Residential',
    siteSize: '350 m²',
    program: 'A single-family residence',
    focus: 'Construction, material and the small details that determine how a space comes together.',
    role: 'Individual',
    status: 'academic',
    shortDescription: 'A residence examined through the precision of working drawings.',
    description:
      'A residence examined through the precision of working drawings. Here, architecture moves from an idea into decisions about construction, material, junctions and the small details that determine how a space actually comes together.',
    tools: ['AutoCAD', 'Revit', 'Photoshop'],
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
          caption: 'Concept diagram',
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
            caption: 'Working drawing',
          },
          {
            src: '',
            alt: 'Placeholder for a construction junction drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'detail',
            caption: 'Junction drawing',
          },
          {
            src: '',
            alt: 'Placeholder for a material schedule drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'detail',
            caption: 'Detail drawing',
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
        body: [
          'A modest plot in a dense residential neighbourhood, working within tight setbacks on every side.',
        ],
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
          { key: 'Structure', value: 'Reinforced concrete frame' },
          { key: 'Material', value: 'Brick, exposed concrete and timber joinery' },
          { key: 'Junction detail', value: 'Window-to-wall junction' },
          { key: 'Stage', value: 'Working drawings' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Residence — Working Drawing',
        body: [
          'Working drawings are where the idea gets tested against what can actually be built - most of the real decisions happened here, not at the concept stage.',
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
            caption: 'Sketch',
          },
          {
            src: '',
            alt: 'Placeholder for a construction detail study.',
            ratio: 1,
            treatment: 'framed',
            register: 'detail',
            caption: 'Detail study',
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
    year: '2025',
    location: 'Bangalore, India',
    type: 'Transport',
    siteSize: '25,000 m²',
    program: 'Multi-modal transit concourse and platforms',
    focus: 'Repetition as a way of organising movement, waiting and connection.',
    role: 'Individual',
    status: 'academic',
    shortDescription:
      'A transport hub developed through a modular system, where repetition becomes a way of organising movement, waiting and connection.',
    description:
      'A transport hub developed through a modular system, where repetition becomes a way of organising movement, waiting and connection. The project investigates how a larger public building can remain legible while accommodating different rhythms of use.',
    tools: ['Rhino 3D', 'SketchUp', 'Photoshop'],
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
          caption: 'Concept diagram',
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
        body: [
          'Positioned at the meeting point of several transit lines, where legibility mattered more than any single grand gesture.',
        ],
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
            caption: 'Plan',
          },
          {
            src: '',
            alt: 'Placeholder for a combined hub plan drawing.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'plan',
            caption: 'Plan',
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
          caption: 'Elevation',
        },
      },
      { id: 'break-1', kind: 'break' },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Modules', value: 'Twelve repeated bays' },
          { key: 'Structure', value: 'Steel space frame' },
          { key: 'Stage', value: 'Design development' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind Multi-Module Transport Hub',
        body: [
          'The module came first, and almost everything after that was about how far a repeated part could be pushed before it stopped feeling like a system.',
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
            caption: 'Sketch',
          },
          {
            src: '',
            alt: 'Placeholder for a module study model.',
            ratio: 1,
            treatment: 'framed',
            register: 'model',
            caption: 'Model',
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
    year: '2026',
    location: 'Bangalore, India',
    type: 'High-rise',
    siteSize: '40,000 m²',
    program: 'Mixed residential and commercial tower',
    focus: 'How people move through, meet within and experience the building at different scales.',
    role: 'Individual',
    status: 'academic',
    shortDescription: 'A vertical study of density, structure and movement.',
    description:
      'A vertical study of density, structure and movement. The project looks at how a high-rise can create more than stacked floor plates by considering how people move through, meet within and experience the building at different scales.',
    tools: ['Revit', 'Rhino 3D', 'Photoshop', 'Affinity'],
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
          caption: 'Concept diagram',
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
        body: [
          'Set within a fast-changing skyline, where the tower had to hold its own without competing with everything around it.',
        ],
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
            caption: 'Section',
          },
          {
            src: '',
            alt: 'Placeholder for a section through a shared floor.',
            ratio: 3 / 4,
            treatment: 'contain',
            register: 'section',
            caption: 'Section',
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
          caption: 'Visualisation',
        },
      },
      {
        id: 'schedule',
        kind: 'schedule',
        title: 'Particulars',
        items: [
          { key: 'Floors', value: '32' },
          { key: 'Structure', value: 'Reinforced concrete core with steel outriggers' },
          { key: 'Stage', value: 'Design development' },
        ],
      },
      {
        id: 'informal-process',
        kind: 'text',
        mode: 'informal',
        label: 'Process',
        title: 'Behind High Rise Building',
        body: [
          'The hardest part was never the height - it was finding the moments where people actually meet inside something built to move them vertically.',
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
            alt: 'Placeholder for an early working sketch for High Rise Building.',
            ratio: 1,
            treatment: 'framed',
            register: 'sketch',
            caption: 'Sketch',
          },
          {
            src: '',
            alt: 'Placeholder for a massing study model.',
            ratio: 1,
            treatment: 'framed',
            register: 'model',
            caption: 'Model',
          },
        ],
      },
    ],
    archive: [],
    related: [{ kind: 'project', id: 'multi-module-transport-hub' }],
  },
];
