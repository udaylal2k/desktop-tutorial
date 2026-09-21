/* ==========================================================================
   MAR - COMPANION
   --------------------------------------------------------------------------
   The small companion that waits at the edge of the page.

   It is off or on in src/config/site.config.ts. Everything about how it
   behaves is here.

   TO USE PHOTOGRAPHS INSTEAD OF THE DRAWING
   Put three to five pictures in public/content/dog/ and list them below.
   The companion will use them instead of the drawn figure, cut out against
   the page, and will change which one it shows as you move through the site.
   Leave the list empty to keep the drawing.
   ========================================================================== */

export const companion = {
  /** Used in the control that switches the companion off, and by screen
   *  readers. Replace with the name, if there is one. */
  name: 'Companion',

  /** Photographs, if you have them. For example:
   *    ['/content/dog/01.png', '/content/dog/02.png', '/content/dog/03.png']
   *  Pictures with the background already removed work best. */
  photographs: [] as string[],

  /** Follows the cursor along the bottom of the window. Set to false and it
   *  stays where it is and only reacts to scrolling. */
  followsCursor: true,

  /** How far along the bottom edge it sits when it has nothing to follow,
   *  as a fraction of the window width. */
  restingPosition: 0.08,
} as const;
