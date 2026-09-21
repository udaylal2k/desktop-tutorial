/* ==========================================================================
   MAR - CONTENT TYPES
   --------------------------------------------------------------------------
   These are the shapes every piece of content on the website must fit.
   You do not normally need to read this file. It exists so that your editor
   tells you when something is missing from a project, a journal entry or an
   interest, instead of the website quietly breaking.

   Read CONTENT-GUIDE.md instead. It explains all of this in plain language.
   ========================================================================== */

/* --------------------------------------------------------------------------
   IMAGES
   Every image on the site is described, not just pointed at. `src` may be
   left empty: the website then draws a MAR placeholder at exactly the right
   proportion, so the layout never moves when you add the real picture.
   -------------------------------------------------------------------------- */

/** How an image is meant to sit in its frame. */
export type ImageTreatment =
  /** Fills its frame completely, cropping whatever does not fit. Photographs. */
  | 'cover'
  /** Sits inside its frame with nothing cropped. Drawings, plans, scans. */
  | 'contain'
  /** Breaks out of the page margins and runs edge to edge. */
  | 'bleed'
  /** Sits inside a drawn hairline frame with paper showing around it. */
  | 'framed'
  /** A tall narrow crop. Portraits, details. */
  | 'portrait'
  /** A wide cinematic crop. Landscapes, elevations. */
  | 'panorama';

/** The kind of drawing or picture this is. Drives the placeholder artwork. */
export type ImageRegister =
  | 'photograph'
  | 'render'
  | 'plan'
  | 'section'
  | 'elevation'
  | 'axonometric'
  | 'diagram'
  | 'sketch'
  | 'model'
  | 'detail'
  | 'texture'
  | 'portrait'
  | 'document';

export interface MarImage {
  /** Path inside /public, for example '/content/projects/p001/cover.jpg'.
   *  Leave as an empty string to show the MAR placeholder instead. */
  src: string;
  /** What the picture shows, for people using a screen reader. Always write this. */
  alt: string;
  /** Optional caption printed under the image. Keep it factual and short. */
  caption?: string;
  /** Width to height, for example 3 / 2. Reserves the space before the file loads. */
  ratio: number;
  treatment: ImageTreatment;
  register: ImageRegister;
  /** Optional short label printed in the technical voice, for example 'GROUND FLOOR'. */
  label?: string;
}

/* --------------------------------------------------------------------------
   FORMAL AND INFORMAL
   Every project, and every interest, can be read two ways.
     FORMAL   - what was made.
     INFORMAL - the person who made it.
   -------------------------------------------------------------------------- */
export type ReadingMode = 'formal' | 'informal';

/* --------------------------------------------------------------------------
   PROJECT SEQUENCE
   A project is not a template. It is an ordered sequence of sections, and
   you choose which sections it has and in what order.
   -------------------------------------------------------------------------- */

export type ProjectSectionKind =
  /** A paragraph or several, in the editorial voice. */
  | 'text'
  /** One image at full section width. */
  | 'plate'
  /** Two or three images side by side. */
  | 'series'
  /** An image with text beside it. */
  | 'aside'
  /** A pulled quotation or a single emphasised line. */
  | 'statement'
  /** A labelled list of facts, for example materials or dimensions. */
  | 'schedule'
  /** A drawn rule and a change of pace. */
  | 'break';

interface ProjectSectionBase {
  id: string;
  kind: ProjectSectionKind;
  /** Which reading this section belongs to. Omit to show it in both. */
  mode?: ReadingMode;
  /** Optional heading printed above the section. */
  title?: string;
  /** Optional small label printed in the technical voice. */
  label?: string;
}

export interface TextSection extends ProjectSectionBase {
  kind: 'text';
  /** Each string is one paragraph. */
  body: string[];
}

export interface PlateSection extends ProjectSectionBase {
  kind: 'plate';
  image: MarImage;
}

export interface SeriesSection extends ProjectSectionBase {
  kind: 'series';
  images: MarImage[];
}

export interface AsideSection extends ProjectSectionBase {
  kind: 'aside';
  image: MarImage;
  body: string[];
  /** Which side the image sits on. Defaults to 'left'. */
  imageSide?: 'left' | 'right';
}

export interface StatementSection extends ProjectSectionBase {
  kind: 'statement';
  body: string;
  attribution?: string;
}

export interface ScheduleSection extends ProjectSectionBase {
  kind: 'schedule';
  items: { key: string; value: string }[];
}

export interface BreakSection extends ProjectSectionBase {
  kind: 'break';
}

export type ProjectSection =
  | TextSection
  | PlateSection
  | SeriesSection
  | AsideSection
  | StatementSection
  | ScheduleSection
  | BreakSection;

/* --------------------------------------------------------------------------
   PROJECT
   -------------------------------------------------------------------------- */
export type ProjectStatus = 'completed' | 'in-progress' | 'proposal' | 'academic' | 'competition';

export interface Project {
  /** Used in the web address, for example '/projects/threshold-house'. */
  id: string;
  /** Archive number, for example 'P.001'. */
  number: string;
  title: string;
  year: string;
  location: string;
  /** For example 'Residential', 'Public', 'Adaptive reuse'. */
  type: string;
  status: ProjectStatus;
  /** One line. Printed in the project index. */
  shortDescription: string;
  /** A short paragraph. Printed at the top of the project page. */
  description: string;
  /** Software and methods used. Printed as project metadata. */
  tools: string[];
  coverImage: MarImage;
  /** The ordered sequence that makes up the project page. */
  sections: ProjectSection[];
  /** Material behind the project, opened from the archive trigger. */
  archive: string[];
  /** Ids of related journal entries, interests and other projects. */
  related: RelatedRef[];
  /** Set to true to hide a project without deleting it. */
  draft?: boolean;
}

/* --------------------------------------------------------------------------
   JOURNAL
   -------------------------------------------------------------------------- */
export type JournalCategory = 'research' | 'articles' | 'notes';

export interface JournalEntry {
  id: string;
  title: string;
  category: JournalCategory;
  /** ISO date, for example '2026-03-14'. Controls the ordering. */
  date: string;
  /** One line, printed in the journal index. */
  description: string;
  /** Each string is one paragraph. Lines beginning with '## ' become headings. */
  content: string[];
  coverImage: MarImage;
  tags: string[];
  related: RelatedRef[];
  draft?: boolean;
}

/* --------------------------------------------------------------------------
   INTERESTS
   -------------------------------------------------------------------------- */

/** The playable form the informal reading of an interest takes. */
export type ArtworkMechanic =
  /** The picture steps away from the cursor until it is caught. */
  | 'evasive'
  /** Scattered fragments are dragged back into a composition. */
  | 'assemble'
  /** A blank sheet develops into an image as it is worked. */
  | 'develop'
  /** Frames of a strip are played by hand. */
  | 'filmstrip'
  /** A postcard turns over to reveal writing on the back. */
  | 'postcard';

export interface InterestArtwork {
  mechanic: ArtworkMechanic;
  /** The line shown before the visitor interacts. */
  prompt: string;
  /** The line shown once they have finished. */
  reward: string;
  image: MarImage;
}

export interface Interest {
  id: string;
  /** Archival identifier, for example 'PHO.'. Always shown with the name. */
  code: string;
  name: string;
  /** One line. */
  description: string;
  /** Ids of the other interests this one feeds into. Draws the network. */
  connections: string[];
  /** The considered account. Each string is one paragraph. */
  formalContent: string[];
  /** The personal account, in the owner's own voice. */
  informalContent: string[];
  artwork: InterestArtwork;
  related: RelatedRef[];
  draft?: boolean;
}

/* --------------------------------------------------------------------------
   ARCHIVE
   -------------------------------------------------------------------------- */
export type ArchiveKind =
  | 'drawing'
  | 'sketch'
  | 'photo'
  | 'process'
  | 'note'
  | 'reference'
  | 'experiment'
  | 'screenshot'
  | 'journal'
  | 'model';

export interface ArchiveItem {
  id: string;
  title: string;
  kind: ArchiveKind;
  /** ISO date, for example '2026-01-22'. */
  date: string;
  /** Id of the project this belongs to, if any. */
  project?: string;
  /** Id of the interest this belongs to, if any. */
  interest?: string;
  description: string;
  image: MarImage;
  tags: string[];
  /** Set to true for material that belongs in the sketchbook. */
  sketchbook?: boolean;
  related: RelatedRef[];
  draft?: boolean;
}

/* --------------------------------------------------------------------------
   RELATIONSHIPS
   The site behaves as one connected body of material rather than a set of
   separate pages. A reference is a kind plus an id.
   -------------------------------------------------------------------------- */
export type RelatedKind = 'project' | 'journal' | 'interest' | 'archive';

export interface RelatedRef {
  kind: RelatedKind;
  id: string;
}

/** What a resolved reference looks like once the website has found it. */
export interface ResolvedRelation {
  kind: RelatedKind;
  id: string;
  title: string;
  label: string;
  href: string;
}

/* --------------------------------------------------------------------------
   SEARCH
   -------------------------------------------------------------------------- */
export interface SearchRecord {
  id: string;
  kind: RelatedKind;
  title: string;
  /** The line shown under the title in the results. */
  summary: string;
  /** The small label shown to the left, for example 'P.002' or 'RESEARCH'. */
  label: string;
  href: string;
  /** Everything the record can be found by. Lower cased on build. */
  terms: string[];
}
