/* ==========================================================================
   MAR - BREADCRUMB
   --------------------------------------------------------------------------
   Where you are, written the way a drawing sheet is referenced:
     MAR / PROJECTS / P.003
     MAR / PROJECTS / P.003 / ARCHIVE
     MAR / JOURNAL / RESEARCH
     MAR / INTERESTS / PHO.
   Used sparingly, and never on the home page.
   ========================================================================== */

import { Link } from 'react-router';
import './breadcrumb.css';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Location">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link to="/" className="breadcrumb__link">
            MAR
          </Link>
        </li>
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="breadcrumb__item">
              <span className="breadcrumb__divider" aria-hidden="true">
                /
              </span>
              {crumb.href && !last ? (
                <Link to={crumb.href} className="breadcrumb__link">
                  {crumb.label}
                </Link>
              ) : (
                <span className="breadcrumb__current" aria-current={last ? 'page' : undefined}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
