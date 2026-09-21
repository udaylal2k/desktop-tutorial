/* ==========================================================================
   MAR - SKETCHBOOK
   --------------------------------------------------------------------------
   The private part of the archive. Margins, doodles, notes, unfinished
   things. Anything in src/content/archive.ts marked `sketchbook: true`
   appears here as well as in the archive proper.

   It is not in the primary navigation, and it is not meant to be. It is
   found through the archive, through informal project content, and through
   the footer, which is how a sketchbook is found on a shelf.
   ========================================================================== */

import { Link } from 'react-router';
import { sketchbookItems } from '../content';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { Figure } from '../components/media/Figure';
import './sketchbook.css';

export default function Sketchbook() {
  return (
    <>
      <PageMeta
        title="Sketchbook"
        description="The quieter part of the archive: margins, notes and unfinished things."
      />

      <div className="page">
        <Breadcrumb trail={[{ label: 'Archive', href: '/archive' }, { label: 'Sketchbook' }]} />
      </div>

      <section className="sketchbook room room--open-top" aria-labelledby="sketchbook-title">
        <div className="page">
          <header className="sketchbook__head">
            <h1 id="sketchbook-title" className="sketchbook__title display-2">
              Sketchbook
            </h1>
            <p className="lead sketchbook__standfirst">
              Pages that were never for anyone. Kept because the thinking is in them.
            </p>
          </header>

          {sketchbookItems.length === 0 ? (
            <div className="empty">
              <p className="empty__title">The sketchbook is empty</p>
              <p className="empty__body">
                Mark any item in src/content/archive.ts with sketchbook: true and it
                appears here as well as in the archive.
              </p>
              <Link to="/archive" className="button">
                The archive
              </Link>
            </div>
          ) : (
            <ul className="sketchbook__pages">
              {sketchbookItems.map((item, index) => (
                <li
                  key={item.id}
                  className="sketchbook__page"
                  style={{ ['--i' as string]: index }}
                >
                  <Link to={`/archive?item=${item.id}`} className="sketchbook__link">
                    <Figure image={item.image} showCaption={false} seed={item.title} />
                    <span className="sketchbook__note">
                      <span className="technical technical--micro">{item.date}</span>
                      <span className="sketchbook__note-title">{item.title}</span>
                      <span className="sketchbook__note-body">{item.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
