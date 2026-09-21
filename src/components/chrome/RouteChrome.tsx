/* ==========================================================================
   MAR - ROUTE CHROME
   --------------------------------------------------------------------------
   The two things that have to happen every time the visitor moves from one
   room to another: the page starts at the top, and the page announces
   itself to anyone using a screen reader.
   ========================================================================== */

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { site } from '../../content/site';

/** Sends the visitor to the top of a new page, unless they used the back
 *  button, in which case the browser restores their position itself. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

interface PageMetaProps {
  /** The page name. Becomes 'Projects - MAR' in the browser tab. */
  title?: string;
  /** What this page is, for search engines and shared links. */
  description?: string;
}

/**
 * Sets the document title and description for a page. Every route uses it,
 * so no page is ever left with the title of the page before it.
 */
export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = title ? `${title} - ${site.meta.titleSuffix}` : site.meta.titleSuffix;

    const content = description ?? site.meta.description;
    const set = (selector: string, attribute: string, value: string) => {
      const node = document.head.querySelector(selector);
      if (node) node.setAttribute(attribute, value);
    };

    set('meta[name="description"]', 'content', content);
    set('meta[property="og:title"]', 'content', document.title);
    set('meta[property="og:description"]', 'content', content);
    set('meta[name="twitter:title"]', 'content', document.title);
    set('meta[name="twitter:description"]', 'content', content);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${site.meta.url}${window.location.pathname}`);
    }
  }, [title, description]);

  return null;
}

/** Announces the new page to a screen reader after a route change. */
export function RouteAnnouncer({ label }: { label: string }) {
  return (
    <p className="visually-hidden" role="status" aria-live="polite">
      {label}
    </p>
  );
}
