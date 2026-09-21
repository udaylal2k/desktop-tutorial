/* ==========================================================================
   MAR - FORMAL / INFORMAL
   --------------------------------------------------------------------------
   The switch between the two readings of a project or an interest.

       FORMAL     what was made
       INFORMAL   the person who made it

   This is not a light and dark switch. It changes which content is shown,
   not which colours are used. The marker that travels between the two
   positions is the companion's mark, which is where the idea came from.
   ========================================================================== */

import type { ReadingMode } from '../../content/types';
import { site } from '../../content/site';
import { siteConfig } from '../../config/site.config';
import './mode-toggle.css';

interface ModeToggleProps {
  mode: ReadingMode;
  onChange: (mode: ReadingMode) => void;
  /** Describes what is being switched, for a screen reader. */
  label: string;
}

export function ModeToggle({ mode, onChange, label }: ModeToggleProps) {
  const options: { value: ReadingMode; name: string; hint: string }[] = [
    { value: 'formal', name: site.copy.formalLabel, hint: site.copy.formalHint },
    { value: 'informal', name: site.copy.informalLabel, hint: site.copy.informalHint },
  ];

  return (
    <div className="mode-toggle" role="group" aria-label={label}>
      <div className="mode-toggle__track" data-mode={mode}>
        {/* The travelling marker, drawn behind the two labels. */}
        <span className="mode-toggle__marker" aria-hidden="true">
          {siteConfig.dogCompanion && (
            <svg viewBox="0 0 24 16" className="mode-toggle__companion" focusable="false">
              {/* The companion, at rest: a body, a head, a raised ear, a tail. */}
              <path
                d="M 4 13 L 4 8 Q 4 6 7 6 L 15 6 Q 18 6 18 8 L 18 10 L 20 8 L 20 13"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M 4 8 L 2 4 L 6 6" fill="none" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          )}
        </span>

        {options.map((option) => {
          const selected = option.value === mode;
          return (
            <button
              key={option.value}
              type="button"
              className="mode-toggle__option"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
            >
              <span className="mode-toggle__name">{option.name}</span>
              <span className="mode-toggle__hint">{option.hint}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
