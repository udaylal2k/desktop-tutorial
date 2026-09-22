/* ==========================================================================
   MAR - PROJECTS
   --------------------------------------------------------------------------
   The entrance, and then the archive behind it.
   ========================================================================== */

import { allProjects } from '../content';
import { siteConfig } from '../config/site.config';
import { Entrance } from '../components/projects/Entrance';
import { ProjectIndex } from '../components/projects/ProjectIndex';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';

export default function Projects() {
  return (
    <>
      <PageMeta
        title="Projects"
        description="The project archive: numbered, dated and located, with the drawings and the process behind each one."
      />

      {siteConfig.projectsEntrance && <Entrance />}

      {!siteConfig.projectsEntrance && (
        <div className="page">
          <Breadcrumb trail={[{ label: 'Projects' }]} />
        </div>
      )}

      <ProjectIndex projects={allProjects} />
    </>
  );
}
