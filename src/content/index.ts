/* ==========================================================================
   MAR - CONTENT INDEX
   --------------------------------------------------------------------------
   This file wires the content files together. It is the only place that
   knows how to turn a reference like { kind: 'project', id: 'p-001' } into a
   title and a web address, and it builds the list that search reads from.

   You do not need to edit this file to add content. Add it to projects.ts,
   journal.ts, interests.ts or archive.ts and it appears here automatically.
   ========================================================================== */

import { projects } from './projects';
import { journal } from './journal';
import { interests } from './interests';
import { archive } from './archive';
import type {
  ArchiveItem,
  Interest,
  JournalEntry,
  Project,
  RelatedRef,
  ResolvedRelation,
  SearchRecord,
} from './types';

export * from './types';
export { site } from './site';
export { about } from './about';
export { home } from './home';
export { contact } from './contact';
export { journalCategories, journalIsDemoContent } from './journal';
export { archiveKinds, archiveIsDemoContent } from './archive';
export { projectsAreDemoContent } from './projects';
export { interestsAreDemoContent } from './interests';

/* --------------------------------------------------------------------------
   PUBLISHED CONTENT
   Anything marked `draft: true` is kept in the file but left off the site.
   -------------------------------------------------------------------------- */
const published = <T extends { draft?: boolean }>(items: T[]): T[] =>
  items.filter((item) => !item.draft);

export const allProjects: Project[] = published(projects);

export const allJournal: JournalEntry[] = published(journal).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const allInterests: Interest[] = published(interests);

export const allArchive: ArchiveItem[] = published(archive).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const sketchbookItems: ArchiveItem[] = allArchive.filter((item) => item.sketchbook);

/* --------------------------------------------------------------------------
   LOOKUPS
   -------------------------------------------------------------------------- */
export const getProject = (id: string) => allProjects.find((p) => p.id === id);
export const getJournalEntry = (id: string) => allJournal.find((e) => e.id === id);
export const getInterest = (id: string) => allInterests.find((i) => i.id === id);
export const getArchiveItem = (id: string) => allArchive.find((a) => a.id === id);

/** Every archive item attached to a project, in date order. */
export const archiveForProject = (projectId: string) =>
  allArchive.filter((item) => item.project === projectId);

/** Every archive item attached to an interest. */
export const archiveForInterest = (interestId: string) =>
  allArchive.filter((item) => item.interest === interestId);

/** Journal entries in one category, newest first. */
export const journalByCategory = (category: JournalEntry['category']) =>
  allJournal.filter((entry) => entry.category === category);

/* --------------------------------------------------------------------------
   WEB ADDRESSES
   One function decides where every kind of content lives.
   -------------------------------------------------------------------------- */
export const hrefFor = (kind: RelatedRef['kind'], id: string): string => {
  switch (kind) {
    case 'project':
      return `/projects/${id}`;
    case 'journal':
      return `/journal/${id}`;
    case 'interest':
      return `/interests/${id}`;
    case 'archive':
      return `/archive?item=${id}`;
  }
};

/* --------------------------------------------------------------------------
   RELATIONSHIPS
   Turns a reference into something that can be printed and clicked. A
   reference pointing at content that has been deleted is quietly dropped,
   so removing a project never leaves a broken link behind it.
   -------------------------------------------------------------------------- */
export const resolveRelation = (ref: RelatedRef): ResolvedRelation | null => {
  const href = hrefFor(ref.kind, ref.id);

  switch (ref.kind) {
    case 'project': {
      const project = getProject(ref.id);
      if (!project) return null;
      return { kind: ref.kind, id: ref.id, title: project.title, label: project.number, href };
    }
    case 'journal': {
      const entry = getJournalEntry(ref.id);
      if (!entry) return null;
      return { kind: ref.kind, id: ref.id, title: entry.title, label: entry.category, href };
    }
    case 'interest': {
      const interest = getInterest(ref.id);
      if (!interest) return null;
      return { kind: ref.kind, id: ref.id, title: interest.name, label: interest.code, href };
    }
    case 'archive': {
      const item = getArchiveItem(ref.id);
      if (!item) return null;
      return { kind: ref.kind, id: ref.id, title: item.title, label: item.kind, href };
    }
  }
};

export const resolveRelations = (refs: RelatedRef[]): ResolvedRelation[] =>
  refs.map(resolveRelation).filter((r): r is ResolvedRelation => r !== null);

/**
 * Relationships run both ways. If a project names a journal entry, that
 * journal entry should show the project back, even though nobody wrote it
 * into the entry. This finds those return references.
 */
export const incomingRelations = (
  kind: RelatedRef['kind'],
  id: string,
): ResolvedRelation[] => {
  const found: RelatedRef[] = [];

  const scan = (
    sourceKind: RelatedRef['kind'],
    items: { id: string; related: RelatedRef[] }[],
  ) => {
    for (const item of items) {
      if (item.related.some((ref) => ref.kind === kind && ref.id === id)) {
        found.push({ kind: sourceKind, id: item.id });
      }
    }
  };

  scan('project', allProjects);
  scan('journal', allJournal);
  scan('interest', allInterests);
  scan('archive', allArchive);

  return resolveRelations(found).filter((r) => !(r.kind === kind && r.id === id));
};

/** Everything connected to a piece of content, in both directions, deduped. */
export const relationsFor = (
  kind: RelatedRef['kind'],
  id: string,
  declared: RelatedRef[],
): ResolvedRelation[] => {
  const out = [...resolveRelations(declared), ...incomingRelations(kind, id)];
  const seen = new Set<string>();
  return out.filter((r) => {
    const key = `${r.kind}:${r.id}`;
    if (seen.has(key) || (r.kind === kind && r.id === id)) return false;
    seen.add(key);
    return true;
  });
};

/* --------------------------------------------------------------------------
   SEARCH INDEX
   Built once from the content files, so anything you add becomes findable
   without any further work.
   -------------------------------------------------------------------------- */
const lower = (values: (string | undefined)[]) =>
  values.filter((v): v is string => Boolean(v)).map((v) => v.toLowerCase());

export const searchIndex: SearchRecord[] = [
  ...allProjects.map<SearchRecord>((p) => ({
    id: p.id,
    kind: 'project',
    title: p.title,
    summary: p.shortDescription,
    label: p.number,
    href: hrefFor('project', p.id),
    terms: lower([p.title, p.number, p.year, p.location, p.type, p.status, p.shortDescription, ...p.tools]),
  })),
  ...allJournal.map<SearchRecord>((e) => ({
    id: e.id,
    kind: 'journal',
    title: e.title,
    summary: e.description,
    label: e.category,
    href: hrefFor('journal', e.id),
    terms: lower([e.title, e.category, e.date, e.description, ...e.tags]),
  })),
  ...allInterests.map<SearchRecord>((i) => ({
    id: i.id,
    kind: 'interest',
    title: i.name,
    summary: i.description,
    label: i.code,
    href: hrefFor('interest', i.id),
    terms: lower([i.name, i.code, i.description, ...i.connections]),
  })),
  ...allArchive.map<SearchRecord>((a) => ({
    id: a.id,
    kind: 'archive',
    title: a.title,
    summary: a.description,
    label: a.kind,
    href: hrefFor('archive', a.id),
    terms: lower([a.title, a.kind, a.date, a.description, a.project, a.interest, ...a.tags]),
  })),
];
