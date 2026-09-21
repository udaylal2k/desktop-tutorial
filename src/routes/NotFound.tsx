/* ==========================================================================
   MAR - DEAD END
   --------------------------------------------------------------------------
   Not an apology. A room that turned out not to be there, drawn the way an
   unbuilt room is drawn, with the ways out clearly marked.
   ========================================================================== */

import { Link, useLocation } from 'react-router';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { primaryNav } from '../components/chrome/navigation';
import { useUi } from '../lib/useUi';
import './not-found.css';

export function NotFound() {
  const { pathname } = useLocation();
  const { openAbout, openSearch } = useUi();

  return (
    <>
      <PageMeta title="Not found" description="This address does not lead anywhere on MAR." />

      <div className="page">
        <Breadcrumb trail={[{ label: 'Not found' }]} />
      </div>

      <section className="not-found room" aria-labelledby="not-found-title">
        <div className="page">
          <div className="not-found__grid">
            <div className="not-found__text">
              <p className="technical technical--micro not-found__code">Error 404</p>
              <h1 id="not-found-title" className="not-found__title display-2">
                Nothing was built here.
              </h1>
              <p className="lead">
                The address exists on paper. The room it refers to does not. Take one of
                the doors below.
              </p>

              <p className="not-found__path technical technical--micro">
                Requested: {pathname}
              </p>
            </div>

            {/* The unbuilt room: a plan of an empty space, drawn in dashes. */}
            <div className="not-found__plan" aria-hidden="true">
              <svg viewBox="0 0 320 240" focusable="false">
                <rect x="20" y="20" width="280" height="200" className="not-found__wall" />
                <path d="M 20 140 L 110 140" className="not-found__wall" />
                <path d="M 190 20 L 190 100" className="not-found__wall" />
                <path
                  d="M 110 140 a 44 44 0 0 1 44 44"
                  className="not-found__swing"
                  fill="none"
                />
                <path d="M 110 140 L 110 184" className="not-found__wall" />
                <circle cx="230" cy="160" r="4" className="not-found__mark" />
                <path d="M 230 160 L 300 160" className="not-found__leader" />
              </svg>
            </div>
          </div>

          <nav className="not-found__ways" aria-label="Ways back">
            <h2 className="not-found__ways-title">Ways back</h2>
            <ul className="not-found__ways-list">
              {primaryNav.map((item) =>
                item.panel ? (
                  <li key={item.href}>
                    <button type="button" className="not-found__way" onClick={openAbout}>
                      {item.label}
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link to={item.href} className="not-found__way">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <button type="button" className="not-found__way" onClick={openSearch}>
                  Search
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
