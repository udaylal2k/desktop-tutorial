/* ==========================================================================
   MAR - INTERESTS
   --------------------------------------------------------------------------
   Two worlds, one subject.

   FORMAL     the interests as a connected field, with a catalogue of codes
   INFORMAL   the same interests as things to play with

   The two readings look nothing like each other on purpose. The formal one
   explains how the interests relate; the informal one is what it is like to
   have them.
   ========================================================================== */

import { useState } from 'react';
import { Link } from 'react-router';
import { allInterests, interestsAreDemoContent } from '../content';
import type { ReadingMode } from '../content/types';
import { siteConfig } from '../config/site.config';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { ModeToggle } from '../components/shared/ModeToggle';
import { InterestNetwork } from '../components/interests/InterestNetwork';
import { InterestArtwork } from '../components/interests/InterestArtwork';
import './interests.css';

export default function Interests() {
  const [mode, setMode] = useState<ReadingMode>('formal');
  const showInformal = siteConfig.formalInformalMode && mode === 'informal';

  return (
    <>
      <PageMeta
        title="Interests"
        description="A connected field of interests, and the work that comes out of them."
      />

      <div className="page">
        <Breadcrumb trail={[{ label: 'Interests' }]} />
      </div>

      <section className="interests room room--open-top" aria-labelledby="interests-title">
        <div className="page">
          <header className="interests__head">
            <div className="interests__head-text">
              <h1 id="interests-title" className="interests__title display-2">
                Interests
              </h1>
              <p className="lead interests__standfirst">
                None of these are architecture. All of them are in the architecture.
              </p>
            </div>

            {siteConfig.formalInformalMode && (
              <ModeToggle mode={mode} onChange={setMode} label="How to read the interests" />
            )}
          </header>

          {interestsAreDemoContent && (
            <div className="demo-note interests__demo">
              <span className="demo-note__mark">Demo</span>
              <span>
                Seven interests with placeholder writing. The lines between them come from
                the `connections` lists in src/content/interests.ts.
              </span>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------- FORMAL */}
        {!showInformal && (
          <div className="page interests__formal">
            {siteConfig.interestNetwork ? (
              <InterestNetwork interests={allInterests} />
            ) : (
              <p className="interests__network-off">
                The connected field is switched off in src/config/site.config.ts. The
                catalogue below lists the same interests.
              </p>
            )}

            {/* The catalogue. Codes are archival identifiers and are always
                printed with the name they stand for. */}
            <section className="catalogue" aria-labelledby="catalogue-title">
              <h2 id="catalogue-title" className="catalogue__title">
                Catalogue
              </h2>
              <ul className="catalogue__list">
                {allInterests.map((interest) => (
                  <li key={interest.id} className="catalogue__item">
                    <Link to={`/interests/${interest.id}`} className="catalogue__link">
                      <span className="catalogue__code">{interest.code}</span>
                      <span className="catalogue__name">{interest.name}</span>
                      <span className="catalogue__description">{interest.description}</span>
                      <span className="catalogue__count">
                        {String(interest.connections.length).padStart(2, '0')}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* ----------------------------------------------------- INFORMAL */}
        {showInformal && (
          <div className="page interests__informal">
            <p className="interests__informal-note">
              Each of these has something to do before it opens. None of them makes you
              do it: every card also has a way straight through.
            </p>

            <div className="interests__artworks">
              {allInterests.map((interest) => (
                <InterestArtwork key={interest.id} interest={interest} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
