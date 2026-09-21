/* ==========================================================================
   MAR - JOURNAL ENTRY
   --------------------------------------------------------------------------
   One piece of writing, set as a reading column with the technical
   information held out in the margin beside it.

   Any paragraph in the content that begins with '## ' becomes a heading, so
   a long piece can be broken up without learning any markup.
   ========================================================================== */

import { useParams, Link } from 'react-router';
import { allJournal, getJournalEntry } from '../content';
import { NotFound } from './NotFound';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { Figure } from '../components/media/Figure';
import { Related } from '../components/shared/Related';
import './journal-entry.css';

function printDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

/** Roughly how long the piece takes to read, from its own word count. */
function readingLength(paragraphs: readonly string[]): string {
  const words = paragraphs.join(' ').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}

export default function JournalEntryPage() {
  const { id } = useParams();
  const entry = id ? getJournalEntry(id) : undefined;

  if (!entry) return <NotFound />;

  const siblings = allJournal.filter((e) => e.category === entry.category);
  const index = siblings.findIndex((e) => e.id === entry.id);
  const next = siblings[index + 1] ?? siblings[0];

  return (
    <>
      <PageMeta title={entry.title} description={entry.description} />

      <div className="page">
        <Breadcrumb
          trail={[
            { label: 'Journal', href: '/journal' },
            { label: entry.category, href: '/journal' },
            { label: entry.title },
          ]}
        />
      </div>

      <article className="entry">
        <header className="entry__head page">
          <div className="entry__head-grid">
            <div className="entry__head-text">
              <p className="technical technical--micro entry__category">{entry.category}</p>
              <h1 className="entry__title display-2">{entry.title}</h1>
              <p className="lead entry__standfirst">{entry.description}</p>
            </div>

            <dl className="entry__facts">
              <div className="entry__fact">
                <dt>Written</dt>
                <dd>{printDate(entry.date)}</dd>
              </div>
              <div className="entry__fact">
                <dt>Length</dt>
                <dd>{readingLength(entry.content)}</dd>
              </div>
              <div className="entry__fact">
                <dt>Filed under</dt>
                <dd>{entry.tags.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="page entry__cover">
          <Figure image={entry.coverImage} priority showCaption={false} seed={entry.id} />
        </div>

        <div className="page">
          <div className="entry__body prose">
            {entry.content.map((paragraph, i) =>
              paragraph.startsWith('## ') ? (
                <h2 key={i} className="entry__heading">
                  {paragraph.slice(3)}
                </h2>
              ) : (
                <p key={i}>{paragraph}</p>
              ),
            )}
          </div>

          <div className="entry__close">
            <Related kind="journal" id={entry.id} declared={entry.related} />

            {next && next.id !== entry.id && (
              <Link to={`/journal/${next.id}`} className="entry__next">
                <span className="entry__next-label">Next in {entry.category}</span>
                <span className="entry__next-title">{next.title}</span>
              </Link>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
