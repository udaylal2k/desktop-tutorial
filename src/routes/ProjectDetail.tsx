/* ==========================================================================
   MAR - PROJECT
   --------------------------------------------------------------------------
   One project, read two ways.

     FORMAL     what was made
     INFORMAL   the person who made it

   Sections with no mode belong to both readings. Sections marked informal
   only appear under the second one. The chosen reading is remembered as you
   move between projects, so nobody has to switch it back every time.
   ========================================================================== */

import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { archiveForProject, getProject } from '../content';
import type { ReadingMode } from '../content/types';
import { siteConfig } from '../config/site.config';
import { NotFound } from './NotFound';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { Figure } from '../components/media/Figure';
import { ModeToggle } from '../components/shared/ModeToggle';
import { Related } from '../components/shared/Related';
import { ProjectSequence } from '../components/projects/ProjectSequence';
import { ArchiveDrawer, ArchiveTrigger } from '../components/panels/ArchiveDrawer';
import { allProjects } from '../content';
import './project-detail.css';

const MODE_KEY = 'mar.reading-mode';

const statusNames: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  proposal: 'Proposal',
  academic: 'Academic',
  competition: 'Competition',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? getProject(id) : undefined;

  const [mode, setMode] = useState<ReadingMode>(() => {
    try {
      const stored = window.localStorage.getItem(MODE_KEY);
      return stored === 'informal' ? 'informal' : 'formal';
    } catch {
      return 'formal';
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const archiveItems = useMemo(
    () => (project ? archiveForProject(project.id) : []),
    [project],
  );

  const sections = useMemo(() => {
    if (!project) return [];
    if (!siteConfig.formalInformalMode) {
      return project.sections.filter((section) => section.mode !== 'informal');
    }
    return project.sections.filter((section) => !section.mode || section.mode === mode);
  }, [project, mode]);

  /* The next project, so a visitor who reaches the end of one has somewhere
     to go other than back. */
  const next = useMemo(() => {
    if (!project) return undefined;
    const index = allProjects.findIndex((p) => p.id === project.id);
    return allProjects[(index + 1) % allProjects.length];
  }, [project]);

  if (!project) return <NotFound />;

  const changeMode = (value: ReadingMode) => {
    setMode(value);
    try {
      window.localStorage.setItem(MODE_KEY, value);
    } catch {
      // The choice simply does not persist. Nothing else changes.
    }
  };

  return (
    <>
      <PageMeta title={project.title} description={project.shortDescription} />

      <div className="page">
        <Breadcrumb
          trail={[
            { label: 'Projects', href: '/projects' },
            { label: project.number },
          ]}
        />
      </div>

      {/* ------------------------------------------------------------ HEAD */}
      <header className="project-head">
        <div className="page">
          <div className="project-head__grid">
            <div className="project-head__title-block">
              <p className="project-head__number technical">{project.number}</p>
              <h1 className="project-head__title display-2">{project.title}</h1>
              <p className="lead project-head__description">{project.description}</p>
            </div>

            <dl className="project-head__spec spec">
              <div className="spec__item">
                <dt className="spec__key">Year</dt>
                <dd className="spec__value">{project.year}</dd>
              </div>
              <div className="spec__item">
                <dt className="spec__key">Location</dt>
                <dd className="spec__value">{project.location}</dd>
              </div>
              <div className="spec__item">
                <dt className="spec__key">Type</dt>
                <dd className="spec__value">{project.type}</dd>
              </div>
              <div className="spec__item">
                <dt className="spec__key">Status</dt>
                <dd className="spec__value">{statusNames[project.status] ?? project.status}</dd>
              </div>
              <div className="spec__item project-head__tools">
                <dt className="spec__key">Tools</dt>
                <dd className="spec__value">{project.tools.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------- COVER */}
      <div className="project-cover">
        <div className="page">
          <div className="project-cover__frame">
            <Figure
              image={project.coverImage}
              priority
              showCaption={false}
              ratio={16 / 9}
              seed={project.number}
            />

            {/* The way into the material behind the project. It sits with the
                imagery, as a mark on it rather than a button under it. */}
            {siteConfig.archive && (
              <div className="project-cover__archive">
                <ArchiveTrigger
                  count={archiveItems.length}
                  context={`${project.number}, ${project.title}`}
                  onOpen={() => setDrawerOpen(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ MODE */}
      {siteConfig.formalInformalMode && (
        <div className="project-mode">
          <div className="page">
            <div className="project-mode__inner">
              <ModeToggle
                mode={mode}
                onChange={changeMode}
                label={`How to read ${project.title}`}
              />
              <p className="project-mode__note">
                {mode === 'formal'
                  ? 'The work as it is presented.'
                  : 'The same project, with the working shown.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- SEQUENCE */}
      <ProjectSequence sections={sections} />

      {/* ----------------------------------------------------------- CLOSE */}
      <div className="page project-close">
        <Related kind="project" id={project.id} declared={project.related} />

        {next && next.id !== project.id && (
          <Link to={`/projects/${next.id}`} className="project-next">
            <span className="project-next__label">Next</span>
            <span className="project-next__title">{next.title}</span>
            <span className="project-next__number">{next.number}</span>
          </Link>
        )}
      </div>

      {siteConfig.archive && (
        <ArchiveDrawer
          open={drawerOpen}
          onClose={closeDrawer}
          title={project.title}
          context={`Projects / ${project.number}`}
          items={archiveItems}
        />
      )}
    </>
  );
}
