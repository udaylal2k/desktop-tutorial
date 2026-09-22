/* ==========================================================================
   MAR - JOURNAL
   --------------------------------------------------------------------------
   One room, three registers of writing.

     RESEARCH   papers, studies, investigations
     ARTICLES   writing addressed outside the discipline
     NOTES      fragments that have not finished moving

   The categories are a filter across one index rather than three separate
   pages, so the writing reads as one body of work.
   ========================================================================== */

import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { allJournal, journalCategories } from '../content';
import type { JournalCategory } from '../content/types';
import { PageMeta } from '../components/chrome/RouteChrome';
import { Breadcrumb } from '../components/chrome/Breadcrumb';
import { Figure } from '../components/media/Figure';
import './journal.css';

/** Prints an ISO date the way the archive prints it. */
function printDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function Journal() {
  const [category, setCategory] = useState<JournalCategory | null>(null);

  const entries = useMemo(
    () => (category ? allJournal.filter((entry) => entry.category === category) : allJournal),
    [category],
  );

  const current = journalCategories.find((c) => c.id === category);

  return (
    <>
      <PageMeta
        title="Journal"
        description="Research, articles and notes. Writing that runs alongside the work."
      />

      <div className="page">
        <Breadcrumb
          trail={
            current
              ? [{ label: 'Journal', href: '/journal' }, { label: current.name }]
              : [{ label: 'Journal' }]
          }
        />
      </div>

      <section className="journal room room--open-top" aria-labelledby="journal-title">
        <div className="page">
          <header className="journal__head">
            <h1 id="journal-title" className="journal__title display-2">
              Journal
            </h1>
            <p className="lead journal__standfirst">
              Writing that runs alongside the drawing. Some of it finishes.
            </p>
          </header>

          {/* The three registers, as a filter rather than as three pages. */}
          <nav className="journal__registers" aria-label="Kinds of writing">
            <button
              type="button"
              className="journal__register"
              aria-pressed={category === null}
              onClick={() => setCategory(null)}
            >
              <span className="journal__register-name">Everything</span>
              <span className="journal__register-count">
                {String(allJournal.length).padStart(2, '0')}
              </span>
            </button>

            {journalCategories.map((entry) => {
              const count = allJournal.filter((e) => e.category === entry.id).length;
              return (
                <button
                  key={entry.id}
                  type="button"
                  className="journal__register"
                  aria-pressed={category === entry.id}
                  onClick={() => setCategory(entry.id)}
                >
                  <span className="journal__register-name">{entry.name}</span>
                  <span className="journal__register-count">
                    {String(count).padStart(2, '0')}
                  </span>
                  <span className="journal__register-note">{entry.description}</span>
                </button>
              );
            })}
          </nav>

          <p className="visually-hidden" role="status" aria-live="polite">
            {entries.length} entries shown.
          </p>

          {entries.length === 0 ? (
            <div className="empty">
              <p className="empty__title">Nothing filed under that yet</p>
              <p className="empty__body">
                Add an entry to src/content/journal.ts with this category and it appears here.
              </p>
            </div>
          ) : (
            <ol className="journal__list">
              {entries.map((entry, index) => (
                <li key={entry.id} className="journal__item">
                  <Link to={`/journal/${entry.id}`} className="journal__row">
                    <span className="journal__row-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="journal__row-text">
                      <span className="journal__row-meta">
                        {entry.category} / {printDate(entry.date)}
                      </span>
                      <span className="journal__row-title">{entry.title}</span>
                      <span className="journal__row-body">{entry.description}</span>
                      <span className="tag-row journal__row-tags">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="journal__row-cover" aria-hidden="true">
                      <Figure
                        image={entry.coverImage}
                        showCaption={false}
                        ratio={4 / 3}
                        seed={entry.id}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
