/* ==========================================================================
   MAR - PROJECT ARCHIVE
   --------------------------------------------------------------------------
   The projects as an archive rather than a shop window: numbered, dated,
   located, searchable and filterable before any picture is shown.

   The filters are built from the projects themselves. Add a project with a
   new type or a new location and the filter for it appears on its own.
   ========================================================================== */

import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import type { Project } from '../../content/types';
import { Figure } from '../media/Figure';
import './project-index.css';

type FacetName = 'year' | 'type' | 'location' | 'status';

const facetLabels: Record<FacetName, string> = {
  year: 'Year',
  type: 'Type',
  location: 'Location',
  status: 'Status',
};

const statusNames: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  proposal: 'Proposal',
  academic: 'Academic',
  competition: 'Competition',
};

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<FacetName, string | null>>({
    year: null,
    type: null,
    location: null,
    status: null,
  });

  /** Every value that actually occurs, in the order it should be offered. */
  const facets = useMemo(() => {
    const collect = (get: (p: Project) => string) =>
      Array.from(new Set(projects.map(get))).sort();

    return {
      year: collect((p) => p.year).reverse(),
      type: collect((p) => p.type),
      location: collect((p) => p.location),
      status: collect((p) => p.status),
    } satisfies Record<FacetName, string[]>;
  }, [projects]);

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return projects.filter((project) => {
      if (filters.year && project.year !== filters.year) return false;
      if (filters.type && project.type !== filters.type) return false;
      if (filters.location && project.location !== filters.location) return false;
      if (filters.status && project.status !== filters.status) return false;
      if (words.length === 0) return true;

      const haystack = [
        project.title,
        project.number,
        project.year,
        project.location,
        project.type,
        project.shortDescription,
        ...project.tools,
      ]
        .join(' ')
        .toLowerCase();

      return words.every((word) => haystack.includes(word));
    });
  }, [projects, query, filters]);

  const active = Object.values(filters).filter(Boolean).length + (query ? 1 : 0);

  const clear = () => {
    setQuery('');
    setFilters({ year: null, type: null, location: null, status: null });
  };

  const toggle = (facet: FacetName, value: string) =>
    setFilters((current) => ({
      ...current,
      [facet]: current[facet] === value ? null : value,
    }));

  return (
    <div className="project-index" id="project-archive">
      <div className="page">
        <div className="room-head">
          <p className="room-head__index">
            {String(results.length).padStart(3, '0')} of {String(projects.length).padStart(3, '0')}
          </p>
          <h2 className="room-head__title">The archive</h2>
        </div>

        {/* ------------------------------------------------------ FINDING */}
        <div className="project-index__finding">
          <div className="field project-index__search">
            <label className="field__label" htmlFor="project-search">
              Search the projects
            </label>
            <input
              id="project-search"
              type="search"
              className="field__input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, place, type or tool"
              autoComplete="off"
            />
          </div>

          <div className="project-index__facets">
            {(Object.keys(facets) as FacetName[]).map((facet) => (
              <fieldset key={facet} className="project-index__facet">
                <legend className="project-index__facet-name">{facetLabels[facet]}</legend>
                <div className="tag-row">
                  {facets[facet].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="tag"
                      aria-pressed={filters[facet] === value}
                      onClick={() => toggle(facet, value)}
                    >
                      {facet === 'status' ? statusNames[value as Project['status']] : value}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          {active > 0 && (
            <button type="button" className="link-technical project-index__clear" onClick={clear}>
              Clear {active === 1 ? 'the filter' : `all ${active} filters`}
            </button>
          )}
        </div>

        {/* ------------------------------------------------------ RESULTS */}
        <p className="visually-hidden" role="status" aria-live="polite">
          {results.length} projects shown.
        </p>

        {results.length === 0 ? (
          <div className="empty project-index__empty">
            <p className="empty__title">Nothing under those terms</p>
            <p className="empty__body">
              No project matches that combination. Clear the filters and start again, or
              search on a single word.
            </p>
            <button type="button" className="button" onClick={clear}>
              Clear the filters
            </button>
          </div>
        ) : (
          <ol className="project-index__list">
            {results.map((project) => (
              <li key={project.id} className="project-index__item">
                <Link to={`/projects/${project.id}`} className="project-index__row">
                  <span className="project-index__cover">
                    <Figure
                      image={project.coverImage}
                      showCaption={false}
                      ratio={4 / 3}
                      seed={project.number}
                    />
                  </span>

                  <span className="project-index__text">
                    <span className="project-index__number">{project.number}</span>
                    <span className="project-index__title">{project.title}</span>
                    <span className="project-index__description">
                      {project.shortDescription}
                    </span>
                  </span>

                  <span className="project-index__meta">
                    <span className="project-index__meta-item">
                      <span className="project-index__meta-key">Year</span>
                      {project.year}
                    </span>
                    <span className="project-index__meta-item">
                      <span className="project-index__meta-key">Place</span>
                      {project.location}
                    </span>
                    <span className="project-index__meta-item">
                      <span className="project-index__meta-key">Type</span>
                      {project.type}
                    </span>
                    <span className="project-index__meta-item">
                      <span className="project-index__meta-key">Status</span>
                      {statusNames[project.status]}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
