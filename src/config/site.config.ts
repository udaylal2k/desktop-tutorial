/* ==========================================================================
   MAR - SITE CONFIGURATION
   --------------------------------------------------------------------------
   The one place where the website's optional features are switched on and
   off. Change `true` to `false` to remove a feature. Nothing else breaks:
   the navigation, the footer and the search all follow what is set here.
   ========================================================================== */

export const siteConfig = {
  /** The small companion that waits at the edge of the page.
   *  Set to false and it is gone from the whole website. */
  dogCompanion: true,

  /** The FORMAL / INFORMAL switch on projects and interests.
   *  Set to false and only the formal reading is shown. */
  formalInformalMode: true,

  /** The connected map of interests on the Interests page.
   *  Set to false and the interests are shown as a plain catalogue. */
  interestNetwork: true,

  /** The Journal section. Set to false and it leaves the navigation. */
  journal: true,

  /** The global archive, reached from the footer and from projects.
   *  Set to false and the archive triggers disappear too. */
  archive: true,

  /** The sketchbook, reached from the archive and from informal content. */
  sketchbook: true,

  /** Universal search on Cmd+K or Ctrl+K. */
  search: true,

  /** The slow day-to-night sequence at the entrance to Projects.
   *  Set to false to go straight to the project archive. */
  projectsEntrance: true,

  /** The short MAR assembly shown while the site loads for the first time. */
  loadingSequence: true,

  /** Your final logo file, once you have one.
   *  Put the file at public/content/logo.svg and change this to
   *  '/content/logo.svg'. Leave it as '' to use the built in wordmark.
   *  Every header, footer and loading screen picks the change up at once. */
  suppliedLogo: '',
} as const;

export type SiteConfig = typeof siteConfig;
