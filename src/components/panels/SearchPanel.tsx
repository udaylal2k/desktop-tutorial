/* ==========================================================================
   MAR - SEARCH
   --------------------------------------------------------------------------
   One way in to everything: projects, journal entries, interests and archive
   material. Opened with Cmd and K on a Mac, Ctrl and K elsewhere, or from
   the header.

   The index is built from the content files, so anything added to the site
   becomes findable without any further work.
   ========================================================================== */

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { searchIndex } from '../../content';
import type { RelatedKind, SearchRecord } from '../../content/types';
import { useUi } from '../../lib/useUi';
import { useFocusTrap, usePrefersReducedMotion, useScrollLock } from '../../lib/hooks';
import './search-panel.css';

const kindName: Record<RelatedKind, string> = {
  project: 'Projects',
  journal: 'Journal',
  interest: 'Interests',
  archive: 'Archive',
};

const kindOrder: RelatedKind[] = ['project', 'journal', 'interest', 'archive'];

/**
 * Scores a record against what has been typed. A match on the title counts
 * for more than a match on a tag, and every word typed has to match
 * something, so two words narrow the results instead of widening them.
 */
function score(record: SearchRecord, words: string[]): number {
  const title = record.title.toLowerCase();
  const label = record.label.toLowerCase();
  let total = 0;

  for (const word of words) {
    let best = 0;
    if (title.startsWith(word)) best = 100;
    else if (title.includes(word)) best = 60;
    else if (label.includes(word)) best = 50;
    else if (record.terms.some((term) => term.startsWith(word))) best = 30;
    else if (record.terms.some((term) => term.includes(word))) best = 14;

    if (best === 0) return 0;
    total += best;
  }

  return total;
}

export function SearchPanel() {
  const { searchOpen, closeSearch } = useUi();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();
  const panelRef = useFocusTrap(searchOpen, closeSearch);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useScrollLock(searchOpen);

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return searchIndex.slice(0, 8);

    return searchIndex
      .map((record) => ({ record, value: score(record, words) }))
      .filter((entry) => entry.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 24)
      .map((entry) => entry.record);
  }, [query]);

  const grouped = useMemo(() => {
    const groups = new Map<RelatedKind, SearchRecord[]>();
    for (const record of results) {
      const list = groups.get(record.kind) ?? [];
      list.push(record);
      groups.set(record.kind, list);
    }
    return kindOrder
      .filter((kind) => groups.has(kind))
      .map((kind) => ({ kind, records: groups.get(kind)! }));
  }, [results]);

  /** The flat order the arrow keys move through, matching what is drawn. */
  const ordered = useMemo(() => grouped.flatMap((group) => group.records), [grouped]);

  // Reset when the overlay is opened.
  useEffect(() => {
    if (!searchOpen) return;
    setQuery('');
    setActive(0);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [searchOpen]);

  useEffect(() => setActive(0), [query]);

  // Keep the highlighted result in view as the arrow keys move down.
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    node?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (record: SearchRecord) => {
    closeSearch();
    navigate(record.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (ordered.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (index + 1) % ordered.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (index - 1 + ordered.length) % ordered.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      go(ordered[active]);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <div className="search" role="presentation">
          <motion.button
            type="button"
            className="search__scrim"
            aria-label="Close search"
            onClick={closeSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.26 }}
          />

          <motion.div
            ref={panelRef}
            className="search__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reduced ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="search__field">
              <label htmlFor="search-input" className="visually-hidden">
                Search projects, journal, interests and archive
              </label>
              <input
                ref={inputRef}
                id="search-input"
                type="search"
                className="search__input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search everything"
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded
                aria-controls="search-results"
                aria-activedescendant={
                  ordered.length > 0 ? `search-result-${ordered[active]?.id}` : undefined
                }
              />
              <button type="button" className="search__close" onClick={closeSearch}>
                Esc
              </button>
            </div>

            <div className="search__results" id="search-results">
              {ordered.length === 0 ? (
                <div className="search__empty">
                  <p className="search__empty-title">Nothing under that word</p>
                  <p className="search__empty-body">
                    Search reads the project titles, locations, types and tools, the journal
                    titles and tags, the interests and their codes, and every item in the
                    archive.
                  </p>
                </div>
              ) : (
                <ul className="search__list" ref={listRef}>
                  {grouped.map((group) => (
                    <li key={group.kind}>
                      <p className="search__group">{kindName[group.kind]}</p>
                      <ul>
                        {group.records.map((record) => {
                          const index = ordered.indexOf(record);
                          return (
                            <li key={`${record.kind}-${record.id}`}>
                              <button
                                type="button"
                                id={`search-result-${record.id}`}
                                className="search__result"
                                data-active={index === active}
                                onMouseEnter={() => setActive(index)}
                                onClick={() => go(record)}
                              >
                                <span className="search__result-label">{record.label}</span>
                                <span className="search__result-text">
                                  <span className="search__result-title">{record.title}</span>
                                  <span className="search__result-summary">{record.summary}</span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="search__hint">
              Move with the arrow keys. Open with Enter. Close with Escape.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
