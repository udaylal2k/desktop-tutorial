/* ==========================================================================
   MAR - NAVIGATION
   --------------------------------------------------------------------------
   The primary navigation. Six places, and no more: the archive, the
   sketchbook and the record are deeper systems, reached from the material
   that leads to them and from the footer.

   Items whose feature has been switched off in site.config.ts drop out of
   the navigation automatically.
   ========================================================================== */

import { siteConfig } from '../../config/site.config';

export interface NavItem {
  label: string;
  href: string;
  /** About opens as a side panel rather than a page. */
  panel?: boolean;
}

const all: (NavItem & { requires?: keyof typeof siteConfig })[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', panel: true },
  { label: 'Projects', href: '/projects' },
  { label: 'Journal', href: '/journal', requires: 'journal' },
  { label: 'Interests', href: '/interests' },
  { label: 'Contact', href: '/contact' },
];

export const primaryNav: NavItem[] = all
  .filter((item) => !item.requires || siteConfig[item.requires])
  .map(({ label, href, panel }) => ({ label, href, panel }));
