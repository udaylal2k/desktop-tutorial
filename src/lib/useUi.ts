import { useContext } from 'react';
import { UiContext, type UiState } from './ui-context';

/** Reaches the About panel and the search overlay from anywhere on the site. */
export function useUi(): UiState {
  const value = useContext(UiContext);
  if (!value) {
    throw new Error('useUi must be used inside <UiProvider>.');
  }
  return value;
}
