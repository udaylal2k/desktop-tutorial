/* ==========================================================================
   MAR - HEADER
   --------------------------------------------------------------------------
   One line on every screen size. The wordmark sits on the left, the six
   places sit on the right, and search sits at the end.

   Below the tablet breakpoint the six places move into a full height sheet
   that slides down from the header, because a row of six will not fit on a
   phone without shrinking the type past reading size.
   ========================================================================== */

import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { MarLogo } from '../identity/MarLogo';
import { primaryNav } from './navigation';
import { siteConfig } from '../../config/site.config';
import { useUi } from '../../lib/useUi';
import { useScrollLock } from '../../lib/hooks';
import './header.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openAbout, openSearch } = useUi();
  const location = useLocation();

  /* The command glyph is not in the latin subset of the technical face, so
     the shortcut is named in words rather than drawn as a symbol. */
  const shortcut = useMemo(() => {
    if (typeof navigator === 'undefined') return 'Ctrl K';
    return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
      ? 'Cmd K'
      : 'Ctrl K';
  }, []);

  useScrollLock(menuOpen);

  // Changing page closes the phone menu.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Escape closes it too.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const renderItem = (item: (typeof primaryNav)[number], onNavigate?: () => void) => {
    if (item.panel) {
      return (
        <button
          key={item.href}
          type="button"
          className="header__link"
          onClick={() => {
            onNavigate?.();
            openAbout();
          }}
        >
          {item.label}
        </button>
      );
    }
    return (
      <NavLink
        key={item.href}
        to={item.href}
        end={item.href === '/'}
        className={({ isActive }) =>
          ['header__link', isActive ? 'header__link--current' : ''].filter(Boolean).join(' ')
        }
        onClick={onNavigate}
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <header className="header" data-open={menuOpen}>
      <div className="header__bar">
        <Link to="/" className="header__logo" aria-label="MAR, home">
          <MarLogo title="" size="1.35rem" />
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {primaryNav.map((item) => renderItem(item))}
        </nav>

        <div className="header__tools">
          {siteConfig.search && (
            <button
              type="button"
              className="header__search"
              onClick={openSearch}
              aria-label="Search the site"
            >
              <span className="header__search-label">Search</span>
              <kbd className="header__key" aria-hidden="true">
                {shortcut}
              </kbd>
            </button>
          )}

          <button
            type="button"
            className="header__toggle"
            aria-expanded={menuOpen}
            aria-controls="header-sheet"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="header__toggle-rules" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* The phone sheet. Present in the document at all sizes so that its
          state is announced correctly, hidden from view above 768px. */}
      <div className="header__sheet" id="header-sheet" hidden={!menuOpen}>
        <nav className="header__sheet-nav" aria-label="Primary, phone">
          {primaryNav.map((item, index) => (
            <span
              key={item.href}
              className="header__sheet-item"
              style={{ '--i': index } as React.CSSProperties}
            >
              <span className="header__sheet-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {renderItem(item, () => setMenuOpen(false))}
            </span>
          ))}
        </nav>

        {siteConfig.search && (
          <button
            type="button"
            className="header__sheet-search"
            onClick={() => {
              setMenuOpen(false);
              openSearch();
            }}
          >
            Search everything
          </button>
        )}
      </div>
    </header>
  );
}
