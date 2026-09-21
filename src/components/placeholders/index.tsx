/* ==========================================================================
   MAR - PLACEHOLDERS
   --------------------------------------------------------------------------
   The named placeholders. Each one is the same drawn plate, set to the
   proportion and register that part of the website expects.

   You should never have to use these directly. Put an image into a content
   file with an empty `src` and the website chooses the right placeholder for
   you. They are exported by name so that the system is legible, and so that
   a new page can reach for the right one without inventing a new size.
   ========================================================================== */

import { Plate } from './Plate';
import './placeholders.css';

export { Plate } from './Plate';

interface NamedPlaceholderProps {
  label?: string;
  className?: string;
}

/** The architectural cover at the entrance to Projects. Very wide. */
export const HeroPlaceholder = ({ label = 'Hero', className }: NamedPlaceholderProps) => (
  <Plate register="render" ratio={16 / 9} label={label} className={className} bare />
);

/** The formal portrait on the home page. Tall. */
export const PortraitPlaceholder = ({ label = 'Portrait', className }: NamedPlaceholderProps) => (
  <Plate register="portrait" ratio={4 / 5} label={label} className={className} />
);

/** A project cover, in the index and at the head of a project page. */
export const ProjectCoverPlaceholder = ({ label = 'Cover', className }: NamedPlaceholderProps) => (
  <Plate register="photograph" ratio={3 / 2} label={label} className={className} />
);

/** A wide image inside a page. */
export const LandscapeImagePlaceholder = ({ label = 'View', className }: NamedPlaceholderProps) => (
  <Plate register="photograph" ratio={3 / 2} label={label} className={className} />
);

/** A tall image inside a page. */
export const PortraitImagePlaceholder = ({ label = 'View', className }: NamedPlaceholderProps) => (
  <Plate register="photograph" ratio={4 / 5} label={label} className={className} />
);

/** A measured drawing: plan, section or elevation. */
export const DrawingPlaceholder = ({ label = 'Drawing', className }: NamedPlaceholderProps) => (
  <Plate register="plan" ratio={16 / 10} label={label} className={className} />
);

/** Working material: models, tests, things in progress. */
export const ProcessImagePlaceholder = ({ label = 'Process', className }: NamedPlaceholderProps) => (
  <Plate register="model" ratio={1} label={label} className={className} />
);

/** An item in the archive or the sketchbook. */
export const ArchiveImagePlaceholder = ({ label = 'Archive', className }: NamedPlaceholderProps) => (
  <Plate register="sketch" ratio={3 / 4} label={label} className={className} />
);

/** The cover of a journal entry. */
export const JournalImagePlaceholder = ({ label = 'Journal', className }: NamedPlaceholderProps) => (
  <Plate register="document" ratio={16 / 9} label={label} className={className} />
);

/** The artwork on an informal interest card. */
export const InterestArtworkPlaceholder = ({ label = 'Interest', className }: NamedPlaceholderProps) => (
  <Plate register="texture" ratio={1} label={label} className={className} />
);
