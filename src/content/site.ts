/* ==========================================================================
   MAR - SITE
   --------------------------------------------------------------------------
   The identity, the words in the page titles, and the wording used around
   the edges of the website. Change anything here freely.
   ========================================================================== */

export const site = {
  /** The name. Shown in the header, the footer and every page title. */
  name: 'MAR',

  /** The line printed under the name in the footer and on the home page. */
  descriptor: 'A personal identity',

  /** The identity line. Five words, one idea. */
  motto: ['ideas', 'people', 'places', 'in motion'],

  /** The identity statement. Printed in the footer and on the about panel. */
  statement: 'Same letters. A deeper language.',

  /** The disciplines listed beside the logo. */
  disciplines: ['architecture', 'design', 'ideas', 'people', 'places'],

  /* ------------------------------------------------------------------------
     SEARCH ENGINE AND SOCIAL SHARING
     Replace the description and the URL when the site goes live.
     ------------------------------------------------------------------------ */
  meta: {
    /** Appended to every page title, for example 'Projects - MAR'. */
    titleSuffix: 'MAR',
    /** Shown in search results and when a link is shared. Under 160 characters. */
    description:
      'MAR. Architecture, design and a personal archive of projects, writing and interests.',
    /** The address the site lives at. Used for canonical links.
     *  Change this if you move to your own domain. */
    url: 'https://udaylal2k.github.io/desktop-tutorial',
    /** The colour of the browser chrome on mobile. Matches the paper ground. */
    themeColor: '#f3f0e8',
    /** Picture used when a link is shared. Put a 1200x630 image at this path. */
    shareImage: '/content/share-card.jpg',
  },

  /* ------------------------------------------------------------------------
     WORDING
     The short pieces of text the website uses to describe its own parts.
     ------------------------------------------------------------------------ */
  copy: {
    projectsEntrance: 'A day passes over the work.',
    archiveTrigger: 'Archive',
    formalLabel: 'Formal',
    informalLabel: 'Informal',
    formalHint: 'What was made',
    informalHint: 'The person who made it',
  },
} as const;
