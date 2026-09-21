/* ==========================================================================
   MAR - INTEREST
   --------------------------------------------------------------------------
   One interest, read two ways, with everything it touches printed beside it.
   ========================================================================== */

import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { allInterests, archiveForInterest, getInterest } from '../content';
import type { ReadingMode } from '../content/types';
import { siteConfig } from '../config/site.config';
import { NotFound } from './NotFound';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { Figure } from '../components/media/Figure';
import { ModeToggle } from '../components/shared/ModeToggle';
import { Related } from '../components/shared/Related';
import { InterestArtwork } from '../components/interests/InterestArtwork';
import './interest-detail.css';

export default function InterestDetail() {
  const { id } = useParams();
  const interest = id ? getInterest(id) : undefined;
  const [mode, setMode] = useState<ReadingMode>('formal');

  if (!interest) return <NotFound />;

  const showInformal = siteConfig.formalInformalMode && mode === 'informal';
  const body = showInformal ? interest.informalContent : interest.formalContent;
  const material = archiveForInterest(interest.id);

  const connected = interest.connections
    .map((connectionId) => allInterests.find((i) => i.id === connectionId))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <>
      <PageMeta title={interest.name} description={interest.description} />

      <div className="page">
        <Breadcrumb
          trail={[
            { label: 'Interests', href: '/interests' },
            { label: interest.code },
          ]}
        />
      </div>

      <article className="interest room room--open-top">
        <div className="page">
          <header className="interest__head">
            <div className="interest__head-text">
              <p className="interest__code technical">{interest.code}</p>
              <h1 className="interest__name display-2">{interest.name}</h1>
              <p className="lead interest__description">{interest.description}</p>
            </div>

            {siteConfig.formalInformalMode && (
              <ModeToggle
                mode={mode}
                onChange={setMode}
                label={`How to read ${interest.name}`}
              />
            )}
          </header>

          <div className="interest__body">
            <div className="interest__text prose">
              {body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <aside className="interest__aside">
              <Figure
                image={interest.artwork.image}
                showCaption={false}
                seed={interest.id}
              />

              {connected.length > 0 && (
                <div className="interest__connections">
                  <h2 className="interest__connections-title">Feeds into</h2>
                  <ul className="interest__connections-list">
                    {connected.map((other) => (
                      <li key={other.id}>
                        <Link to={`/interests/${other.id}`} className="interest__connection">
                          <span className="interest__connection-code">{other.code}</span>
                          <span>{other.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>

          {/* The informal reading brings the artwork with it. */}
          {showInformal && (
            <div className="interest__play">
              <InterestArtwork interest={interest} />
            </div>
          )}

          {material.length > 0 && (
            <section className="interest__material" aria-labelledby="interest-material">
              <h2 id="interest-material" className="interest__material-title">
                In the archive
              </h2>
              <ul className="interest__material-list">
                {material.map((item) => (
                  <li key={item.id} className="interest__material-item">
                    <Link to={`/archive?item=${item.id}`} className="interest__material-link">
                      <Figure image={item.image} showCaption={false} seed={item.title} />
                      <span className="interest__material-text">
                        <span className="technical technical--micro">{item.kind}</span>
                        <span className="interest__material-name">{item.title}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="interest__close">
            <Related kind="interest" id={interest.id} declared={interest.related} />
          </div>
        </div>
      </article>
    </>
  );
}
