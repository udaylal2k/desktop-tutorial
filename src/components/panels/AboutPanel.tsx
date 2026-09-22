/* ==========================================================================
   MAR - ABOUT PANEL
   --------------------------------------------------------------------------
   About is not a page you have to leave for. It arrives as a sheet over
   whatever you were reading, and when it closes you are exactly where you
   were, at the same scroll position, with focus back on the control that
   opened it.
   ========================================================================== */

import { AnimatePresence, motion } from 'motion/react';
import { about } from '../../content/about';
import { site } from '../../content/site';
import { useUi } from '../../lib/useUi';
import { useFocusTrap, usePrefersReducedMotion, useScrollLock } from '../../lib/hooks';
import { MarWave } from '../identity/MarLogo';
import './about-panel.css';

export function AboutPanel() {
  const { aboutOpen, closeAbout } = useUi();
  const reduced = usePrefersReducedMotion();
  const panelRef = useFocusTrap(aboutOpen, closeAbout);

  useScrollLock(aboutOpen);

  return (
    <AnimatePresence>
      {aboutOpen && (
        <div className="about-panel" role="presentation">
          <motion.button
            type="button"
            className="about-panel__scrim"
            aria-label="Close about"
            onClick={closeAbout}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            ref={panelRef}
            className="about-panel__sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-panel-title"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { x: '100%' }}
            animate={reduced ? { opacity: 1 } : { x: 0 }}
            exit={reduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: reduced ? 0 : 0.56, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-panel__head">
              <p className="technical technical--micro">About</p>
              <button type="button" className="about-panel__close" onClick={closeAbout}>
                Close
                <span className="about-panel__close-mark" aria-hidden="true" />
              </button>
            </div>

            <div className="about-panel__body">
              <h2 id="about-panel-title" className="about-panel__title display-3">
                {about.headline}
              </h2>
              <p className="lead about-panel__standfirst">{about.introduction}</p>
              <p className="lead about-panel__standfirst">{about.philosophy}</p>

              <div className="demo-note">
                <span className="demo-note__mark">Demo</span>
                <span>
                  The statement above is Maya's own. Everything below it (education,
                  qualifications, currently, approach) is placeholder text. Edit
                  src/content/about.ts.
                </span>
              </div>

              {about.panel.map((section) => (
                <section key={section.id} className="about-panel__section">
                  <h3 className="about-panel__section-title">{section.title}</h3>

                  {'body' in section &&
                    section.body.map((paragraph, index) => (
                      <p key={index} className="about-panel__paragraph">
                        {paragraph}
                      </p>
                    ))}

                  {'entries' in section && (
                    <dl className="about-panel__entries">
                      {section.entries.map((entry, index) => (
                        <div key={index} className="about-panel__entry">
                          <dt className="about-panel__entry-key">{entry.key}</dt>
                          <dd className="about-panel__entry-value">{entry.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              ))}

              <footer className="about-panel__foot">
                <MarWave className="mar-wave--faint" />
                <p className="technical technical--micro">{site.statement}</p>
              </footer>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
