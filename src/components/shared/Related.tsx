/* ==========================================================================
   MAR - RELATED
   --------------------------------------------------------------------------
   The site is one connected body of material, not a set of separate pages.
   A project points at an interest, an interest points back at the project,
   a note points at the drawing it was written beside.

   References run in both directions. If a project names a journal entry,
   that entry shows the project without anyone having written it in.
   ========================================================================== */

import { Link } from 'react-router';
import { relationsFor } from '../../content';
import type { RelatedKind, RelatedRef } from '../../content/types';
import './related.css';

const kindName: Record<RelatedKind, string> = {
  project: 'Project',
  journal: 'Journal',
  interest: 'Interest',
  archive: 'Archive',
};

interface RelatedProps {
  kind: RelatedKind;
  id: string;
  declared: RelatedRef[];
  /** The heading above the list. */
  title?: string;
}

export function Related({ kind, id, declared, title = 'Connected' }: RelatedProps) {
  const relations = relationsFor(kind, id, declared);
  if (relations.length === 0) return null;

  return (
    <section className="related" aria-labelledby={`related-${kind}-${id}`}>
      <h2 id={`related-${kind}-${id}`} className="related__title">
        {title}
      </h2>

      <ul className="related__list">
        {relations.map((relation) => (
          <li key={`${relation.kind}-${relation.id}`} className="related__item">
            <Link to={relation.href} className="related__link">
              <span className="related__kind">{kindName[relation.kind]}</span>
              <span className="related__name">{relation.title}</span>
              <span className="related__label">{relation.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
