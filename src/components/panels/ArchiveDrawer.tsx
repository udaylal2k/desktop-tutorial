/* ==========================================================================
   MAR - ARCHIVE DRAWER
   --------------------------------------------------------------------------
   The deeper material behind a project. It opens the way a plan chest opens:
   from the bottom, holding the page it belongs to still behind it.

   The trigger sits quietly beside the project imagery as a small mark. It is
   a real button, so it is reachable by keyboard and announced properly, and
   it never depends on hover to be found.
   ========================================================================== */

import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import type { ArchiveItem } from '../../content/types';
import { Figure } from '../media/Figure';
import { useFocusTrap, usePrefersReducedMotion, useScrollLock } from '../../lib/hooks';
import './archive-drawer.css';

/* -------------------------------------------------------------------------- */

interface ArchiveTriggerProps {
  count: number;
  onOpen: () => void;
  /** Printed in the accessible name, for example 'P.003'. */
  context: string;
}

export function ArchiveTrigger({ count, onOpen, context }: ArchiveTriggerProps) {
  if (count === 0) return null;

  return (
    <button
      type="button"
      className="archive-trigger"
      onClick={onOpen}
      aria-label={`Open the archive for ${context}. ${count} items.`}
    >
      <span className="archive-trigger__mark" aria-hidden="true">
        +
      </span>
      <span className="archive-trigger__label">Archive</span>
      <span className="archive-trigger__count" aria-hidden="true">
        {String(count).padStart(2, '0')}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */

interface ArchiveDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** The location line printed at the top, for example 'Projects / P.003'. */
  context: string;
  items: ArchiveItem[];
}

export function ArchiveDrawer({ open, onClose, title, context, items }: ArchiveDrawerProps) {
  const reduced = usePrefersReducedMotion();
  const drawerRef = useFocusTrap(open, onClose);

  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <div className="archive-drawer" role="presentation">
          <motion.button
            type="button"
            className="archive-drawer__scrim"
            aria-label="Close the archive"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          />

          <motion.div
            ref={drawerRef}
            className="archive-drawer__body"
            role="dialog"
            aria-modal="true"
            aria-labelledby="archive-drawer-title"
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The pull: the drawn handle of the drawer. */}
            <div className="archive-drawer__pull" aria-hidden="true" />

            <div className="archive-drawer__head">
              <div>
                <p className="technical technical--micro">{context} / Archive</p>
                <h2 id="archive-drawer-title" className="archive-drawer__title">
                  {title}
                </h2>
              </div>
              <button type="button" className="archive-drawer__close" onClick={onClose}>
                Close
              </button>
            </div>

            <div className="archive-drawer__scroll">
              <ul className="archive-drawer__items">
                {items.map((item) => (
                  <li key={item.id} className="archive-drawer__item">
                    <Figure image={item.image} showCaption={false} seed={item.title} />
                    <div className="archive-drawer__item-text">
                      <p className="technical technical--micro">
                        {item.kind} / {item.date}
                      </p>
                      <h3 className="archive-drawer__item-title">{item.title}</h3>
                      <p className="archive-drawer__item-note">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="archive-drawer__foot">
                <Link to="/archive" className="link-technical">
                  The whole archive
                  <span className="link-technical__arrow" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
