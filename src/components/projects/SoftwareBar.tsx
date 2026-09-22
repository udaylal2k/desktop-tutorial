/* ==========================================================================
   MAR - SOFTWARE BAR
   --------------------------------------------------------------------------
   A compact strip of the software actually used on a project, sitting at
   the foot of the cover. This is project metadata, the same as a date or a
   site size, not a set of decorative skill badges - so it is set in the
   technical voice, on a ruled line, the way a specification sheet lists
   what a drawing was produced with.

   Reads a project's `tools`, which is typed against the six standardised
   names, so this component never has to guess how to label an unknown
   string - a project either used one of the six, or the bar leaves it out.
   ========================================================================== */

import type { ProjectTool } from '../../content/types';
import './software-bar.css';

export function SoftwareBar({ tools }: { tools: ProjectTool[] }) {
  return (
    <div className="software-bar" role="group" aria-label="Software used on this project">
      <span className="software-bar__label technical technical--micro">Tools</span>

      {tools.length === 0 ? (
        <span className="software-bar__empty technical technical--micro">[Add tools]</span>
      ) : (
        <ul className="software-bar__list">
          {tools.map((tool) => (
            <li key={tool} className="software-bar__item technical technical--micro">
              {tool}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
