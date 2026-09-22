/* ==========================================================================
   MAR - HOME
   --------------------------------------------------------------------------
   Home is about the person, not about the work. The work has its own
   entrance.

   Two portraits: one as you present yourself, one as you actually are. The
   About panel opens over this page rather than replacing it, so nobody has
   to leave in order to find out who they are reading.
   ========================================================================== */

import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { about } from '../content/about';
import { home } from '../content/home';
import { site } from '../content/site';
import { allInterests, allJournal, allProjects } from '../content';
import { siteConfig } from '../config/site.config';
import { Figure } from '../components/media/Figure';
import { PageMeta } from '../components/chrome/RouteChrome';
import { MarWave } from '../components/identity/MarLogo';
import { useUi } from '../lib/useUi';
import { usePrefersReducedMotion, useReveal } from '../lib/hooks';
import './home.css';

/** A section that rises a little as it comes into view. */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = usePrefersReducedMotion();
  const { ref, revealed } = useReveal<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className="reveal"
      data-revealed={reduced ? true : revealed}
      style={{ transitionDelay: reduced ? '0ms' : `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Home({ openAbout: shouldOpen = false }: { openAbout?: boolean }) {
  const { openAbout } = useUi();
  const reduced = usePrefersReducedMotion();

  // Arriving at /about opens the panel over this page.
  useEffect(() => {
    if (shouldOpen) openAbout();
  }, [shouldOpen, openAbout]);

  const selected = allProjects.slice(0, 3);
  const recent = allJournal.slice(0, 2);

  return (
    <>
      <PageMeta
        title={undefined}
        description={`${site.name}. ${about.headline}`}
      />

      {/* ---------------------------------------------------------- OPENING */}
      <section className="home-opening" aria-labelledby="home-title">
        <div className="page">
          <div className="home-opening__grid">
            <motion.div
              className="home-opening__text"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h1 id="home-title" className="home-opening__headline display-1">
                {about.headline}
              </h1>
              <p className="lead home-opening__standfirst">{about.introduction}</p>

              <div className="home-opening__actions">
                <button type="button" className="button button--primary" onClick={openAbout}>
                  About
                </button>
                <Link to="/projects" className="button">
                  Projects
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="home-opening__portrait"
              initial={reduced ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            >
              <Figure image={home.hero.image} priority showCaption={false} seed="formal" />
              <p className="home-opening__portrait-note technical technical--micro">
                Portrait
              </p>
            </motion.div>

            <p className="home-opening__motto technical technical--micro">
              {site.motto.join(' / ')}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ THE RECORD */}
      <section className="home-record room" aria-labelledby="home-record-title">
        <div className="page">
          <Reveal>
            <div className="home-record__grid">
              <div className="home-record__informal">
                <Figure image={about.portraitInformal} showCaption={false} seed="informal" />
                <p className="technical technical--micro">Informal</p>
              </div>

              <div className="home-record__facts">
                <h2 id="home-record-title" className="home-record__title display-3">
                  The same person, twice.
                </h2>
                <p className="home-record__body">{about.philosophy}</p>

                <dl className="spec home-record__spec">
                  {about.schedule.map((item) => (
                    <div key={item.key} className="spec__item">
                      <dt className="spec__key">{item.key}</dt>
                      <dd className="spec__value">{item.value}</dd>
                    </div>
                  ))}
                </dl>

                <button type="button" className="link-technical" onClick={openAbout}>
                  Read the full account
                  <span className="link-technical__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- SELECTED WORK */}
      <section className="home-work room room--ruled" aria-labelledby="home-work-title">
        <div className="page">
          <div className="room-head">
            <p className="room-head__index">
              {String(allProjects.length).padStart(3, '0')} in the archive
            </p>
            <h2 id="home-work-title" className="room-head__title">
              Work
            </h2>
          </div>

          <ol className="home-work__list">
            {selected.map((project, index) => (
              <li key={project.id}>
                <Reveal delay={index * 70}>
                  <Link to={`/projects/${project.id}`} className="home-work__row">
                    <span className="home-work__number">{project.number}</span>
                    <span className="home-work__title">{project.title}</span>
                    <span className="home-work__meta">
                      {project.year} / {project.type}
                    </span>
                    <span className="home-work__line" aria-hidden="true" />
                    <span className="home-work__preview" aria-hidden="true">
                      <Figure
                        image={project.coverImage}
                        showCaption={false}
                        ratio={4 / 3}
                        seed={project.number}
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>

          <Link to="/projects" className="button home-work__all">
            Enter the projects
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------- JOURNAL */}
      {siteConfig.journal && recent.length > 0 && (
        <section className="home-journal room" aria-labelledby="home-journal-title">
          <div className="page">
            <div className="home-journal__grid">
              <div className="home-journal__intro">
                <h2 id="home-journal-title" className="display-3">
                  Writing
                </h2>
                <p className="home-journal__note">
                  Research, articles and notes. The notes are the ones still moving.
                </p>
                <Link to="/journal" className="link-technical">
                  All writing
                  <span className="link-technical__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>

              <ul className="home-journal__list">
                {recent.map((entry) => (
                  <li key={entry.id} className="home-journal__item">
                    <Link to={`/journal/${entry.id}`} className="home-journal__link">
                      <p className="technical technical--micro">
                        {entry.category} / {entry.date}
                      </p>
                      <h3 className="home-journal__item-title">{entry.title}</h3>
                      <p className="home-journal__item-body">{entry.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- INTERESTS */}
      <section className="home-interests room room--sunk" aria-labelledby="home-interests-title">
        <div className="page">
          <h2 id="home-interests-title" className="home-interests__title display-2">
            Everything else
          </h2>
          <p className="home-interests__body lead">
            The work does not come from the work. It comes from the other things.
          </p>

          <ul className="home-interests__codes">
            {allInterests.map((interest) => (
              <li key={interest.id}>
                <Link to={`/interests/${interest.id}`} className="home-interests__code">
                  <span className="home-interests__code-mark">{interest.code}</span>
                  <span className="home-interests__code-name">{interest.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <MarWave className="home-interests__wave mar-wave--faint" />
        </div>
      </section>
    </>
  );
}
