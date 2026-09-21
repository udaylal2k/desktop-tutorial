import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { siteConfig } from '../config/site.config';
import { UiContext, type UiState } from './ui-context';

export function UiProvider({ children }: { children: ReactNode }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const closeAbout = useCallback(() => setAboutOpen(false), []);
  const openAbout = useCallback(() => {
    setSearchOpen(false);
    setAboutOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openSearch = useCallback(() => {
    if (!siteConfig.search) return;
    setAboutOpen(false);
    setSearchOpen(true);
  }, []);

  // Moving to another page closes whatever was open over it. The first run
  // is skipped, so a page that asks for a panel on arrival (the /about
  // address, which opens the panel over the home page) keeps it open.
  const settled = useRef(false);
  useEffect(() => {
    if (!settled.current) {
      settled.current = true;
      return;
    }
    setAboutOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Cmd+K on a Mac, Ctrl+K elsewhere.
  useEffect(() => {
    if (!siteConfig.search) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const value = useMemo<UiState>(
    () => ({ aboutOpen, openAbout, closeAbout, searchOpen, openSearch, closeSearch }),
    [aboutOpen, openAbout, closeAbout, searchOpen, openSearch, closeSearch],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
