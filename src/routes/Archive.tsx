/* ==========================================================================
   MAR - ARCHIVE
   --------------------------------------------------------------------------
   The whole body of material, not the selected work: drawings, sketches,
   photographs, process, notes, references, experiments, screenshots and
   models, whether or not they belong to a finished project.

   The archive is not in the primary navigation. It is reached from the mark
   beside a project's imagery, from an interest, and from the footer, which
   is how an archive should be found.

   An item opens in a sheet over the index, and the address bar follows, so
   a single item can be linked to directly: /archive?item=a-006
   ========================================================================== */

import { useCallback, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  allArchive,
  allProjects,
  archiveKinds,
  getArchiveItem,
  getInterest,
  getProject,
} from '../content';
import type { ArchiveKind } from '../content/types';
import { siteConfig } from '../config/site.config';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { Figure } from '../components/media/Figure';
import { Related } from '../components/shared/Related';
import { useFocusTrap, useScrollLock } from '../lib/hooks';
import './archive.css';

function printDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function Archive() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<ArchiveKind | null>(null);
  const [project, setProject] = useState<string | null>(null);

  const openId = params.get('item');
  const open = openId ? getArchiveItem(openId) : undefined;

  const close = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete('item');
    setParams(next, { replace: true });
  }, [params, setParams]);

  const panelRef = useFocusTrap(Boolean(open), close);
  useScrollLock(Boolean(open));

  const years = useMemo(
    () => Array.from(new Set(allArchive.map((item) => item.date.slice(0, 4)))).sort().reverse(),
    [],
  );
  const [year, setYear] = useState<string | null>(null);

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return allArchive.filter((item) => {
      if (kind && item.kind !== kind) return false;
      if (project && item.project !== project) return false;
      if (year && !item.date.startsWith(year)) return false;
      if (words.length === 0) return true;

      const haystack = [item.title, item.kind, item.description, item.date, ...item.tags]
        .join(' ')
        .toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [query, kind, project, year]);

  const activeCount =
    (query ? 1 : 0) + (kind ? 1 : 0) + (project ? 1 : 0) + (year ? 1 : 0);

  const clear = () => {
    setQuery('');
    setKind(null);
    setProject(null);
    setYear(null);
  };

  const kindsInUse = archiveKinds.filter((k) => allArchive.some((item) => item.kind === k));

  return (
    <>
      <PageMeta
        title="Archive"
        description="The wider body of material behind the work: drawings, sketches, photographs, process, notes and experiments."
      />

      <div className="page">
        <Breadcrumb trail={[{ label: 'Archive' }]} />
      </div>

      <section className="archive room room--open-top" aria-labelledby="archive-title">
        <div className="page">
          <header className="archive__head">
            <div>
              <h1 id="archive-title" className="archive__title display-2">
                Archive
              </h1>
              <p className="lead archive__standfirst">
                Everything that did not go on a board. Held by kind, by year and by the
                project it came out of.
              </p>
            </div>
            <p className="archive__count technical">
              {String(allArchive.length).padStart(3, '0')} items
            </p>
          </header>

          {/* ------------------------------------------------------ FINDING */}
          <div className="archive__finding">
            <div className="field archive__search">
              <label className="field__label" htmlFor="archive-search">
                Search the archive
              </label>
              <input
                id="archive-search"
                type="search"
                className="field__input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, tag or description"
                autoComplete="off"
              />
            </div>

            <fieldset className="archive__facet">
              <legend className="archive__facet-name">Kind</legend>
              <div className="tag-row">
                {kindsInUse.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="tag"
                    aria-pressed={kind === value}
                    onClick={() => setKind((current) => (current === value ? null : value))}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="archive__facet">
              <legend className="archive__facet-name">Project</legend>
              <div className="tag-row">
                {allProjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="tag"
                    aria-pressed={project === p.id}
                    onClick={() => setProject((current) => (current === p.id ? null : p.id))}
                  >
                    {p.number}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="archive__facet">
              <legend className="archive__facet-name">Year</legend>
              <div className="tag-row">
                {years.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="tag"
                    aria-pressed={year === value}
                    onClick={() => setYear((current) => (current === value ? null : value))}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>

            {activeCount > 0 && (
              <button type="button" className="link-technical archive__clear" onClick={clear}>
                Clear {activeCount === 1 ? 'the filter' : `all ${activeCount} filters`}
              </button>
            )}
          </div>

          <p className="visually-hidden" role="status" aria-live="polite">
            {results.length} items shown.
          </p>

          {/* ------------------------------------------------------ RESULTS */}
          {results.length === 0 ? (
            <div className="empty">
              <p className="empty__title">Nothing filed under that</p>
              <p className="empty__body">
                No item matches that combination. Clear the filters and start again.
              </p>
              <button type="button" className="button" onClick={clear}>
                Clear the filters
              </button>
            </div>
          ) : (
            <ul className="archive__grid">
              {results.map((item) => (
                <li key={item.id} className="archive__cell">
                  <Link
                    to={`/archive?item=${item.id}`}
                    className="archive__item"
                    replace
                  >
                    <Figure image={item.image} showCaption={false} seed={item.title} />
                    <span className="archive__item-text">
                      <span className="archive__item-meta">
                        {item.kind} / {printDate(item.date)}
                      </span>
                      <span className="archive__item-title">{item.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {siteConfig.sketchbook && (
            <div className="archive__sketchbook">
              <Link to="/sketchbook" className="link-technical">
                The sketchbook
                <span className="link-technical__arrow" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
              <p className="archive__sketchbook-note">
                The quieter part of the archive: margins, doodles, unfinished things.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------------- SHEET */}
      {open && (
        <div className="archive-sheet" role="presentation">
          <button
            type="button"
            className="archive-sheet__scrim"
            aria-label="Close the item"
            onClick={close}
          />
          <div
            ref={panelRef}
            className="archive-sheet__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="archive-sheet-title"
            tabIndex={-1}
          >
            <div className="archive-sheet__head">
              <p className="technical technical--micro">
                Archive / {open.kind} / {open.id.toUpperCase()}
              </p>
              <button type="button" className="archive-sheet__close" onClick={close}>
                Close
              </button>
            </div>

            <div className="archive-sheet__body">
              <Figure image={open.image} showCaption={false} seed={open.title} />

              <div className="archive-sheet__text">
                <h2 id="archive-sheet-title" className="archive-sheet__title">
                  {open.title}
                </h2>
                <p className="archive-sheet__description">{open.description}</p>

                <dl className="spec archive-sheet__spec">
                  <div className="spec__item">
                    <dt className="spec__key">Kind</dt>
                    <dd className="spec__value">{open.kind}</dd>
                  </div>
                  <div className="spec__item">
                    <dt className="spec__key">Dated</dt>
                    <dd className="spec__value">{printDate(open.date)}</dd>
                  </div>
                  {open.project && (
                    <div className="spec__item">
                      <dt className="spec__key">Project</dt>
                      <dd className="spec__value">
                        <Link to={`/projects/${open.project}`} className="archive-sheet__link">
                          {getProject(open.project)?.title ?? open.project}
                        </Link>
                      </dd>
                    </div>
                  )}
                  {open.interest && (
                    <div className="spec__item">
                      <dt className="spec__key">Interest</dt>
                      <dd className="spec__value">
                        <Link to={`/interests/${open.interest}`} className="archive-sheet__link">
                          {getInterest(open.interest)?.name ?? open.interest}
                        </Link>
                      </dd>
                    </div>
                  )}
                </dl>

                {open.tags.length > 0 && (
                  <div className="tag-row archive-sheet__tags">
                    {open.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Related kind="archive" id={open.id} declared={open.related} title="Also" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
