/* ==========================================================================
   MAR - INTERFACE STATE
   --------------------------------------------------------------------------
   The two pieces of the interface that can be opened from anywhere: the
   About panel and the search overlay. Both are held here so that the header,
   the footer and a keyboard shortcut can all reach them without passing
   state through every page.
   ========================================================================== */

import { createContext } from 'react';

export interface UiState {
  aboutOpen: boolean;
  openAbout: () => void;
  closeAbout: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

export const UiContext = createContext<UiState | null>(null);
