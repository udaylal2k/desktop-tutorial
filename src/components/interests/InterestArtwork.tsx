/* ==========================================================================
   MAR - INTEREST ARTWORKS
   --------------------------------------------------------------------------
   The informal reading of an interest is something to play with rather than
   something to read. Which mechanic an interest uses is one line in
   src/content/interests.ts.

     develop    a blank sheet develops into a picture as it is worked
     filmstrip  the frames of a strip are played by hand
     assemble   scattered pieces are dragged back into a composition
     postcard   a card turns over and there is writing on the back
     evasive    the picture steps away until it is caught

   EVERY ONE OF THEM IS OPERABLE FROM THE KEYBOARD, and none of them depends
   on hover. Each also carries a plain control that simply shows the work, so
   nobody is ever required to play a game to see the content. Under a reduced
   motion setting that control is the primary way in.
   ========================================================================== */

import { useCallback, useId, useRef, useState } from 'react';
import { Link } from 'react-router';
import type { Interest } from '../../content/types';
import { Figure } from '../media/Figure';
import { usePrefersReducedMotion } from '../../lib/hooks';
import './interest-artwork.css';

interface ArtworkProps {
  interest: Interest;
}

export function InterestArtwork({ interest }: ArtworkProps) {
  const [revealed, setRevealed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const reveal = useCallback(() => setRevealed(true), []);
  const { artwork } = interest;

  return (
    <article className="artwork" data-revealed={revealed} data-mechanic={artwork.mechanic}>
      <header className="artwork__head">
        <p className="artwork__code">{interest.code}</p>
        <h3 className="artwork__name">{interest.name}</h3>
      </header>

      <div className="artwork__stage">
        {revealed ? (
          <Revealed interest={interest} />
        ) : (
          <Mechanic interest={interest} reduced={reduced} onReveal={reveal} />
        )}
      </div>

      <footer className="artwork__foot">
        <p className="artwork__prompt">{revealed ? artwork.reward : artwork.prompt}</p>
        {!revealed && (
          <button type="button" className="artwork__skip" onClick={reveal}>
            Just show it
          </button>
        )}
        {revealed && (
          <Link to={`/interests/${interest.id}`} className="link-technical">
            Read
            <span className="link-technical__arrow" aria-hidden="true">
              &#8594;
            </span>
          </Link>
        )}
      </footer>
    </article>
  );
}

/** What is behind every one of them, once it has been worked out. */
function Revealed({ interest }: { interest: Interest }) {
  return (
    <div className="artwork__revealed">
      <Figure image={interest.artwork.image} showCaption={false} seed={interest.id} />
      <p className="artwork__revealed-text">{interest.informalContent[0]}</p>
    </div>
  );
}

/* ========================================================================== */

interface MechanicProps {
  interest: Interest;
  reduced: boolean;
  onReveal: () => void;
}

function Mechanic({ interest, reduced, onReveal }: MechanicProps) {
  switch (interest.artwork.mechanic) {
    case 'develop':
      return <Develop interest={interest} reduced={reduced} onReveal={onReveal} />;
    case 'filmstrip':
      return <Filmstrip interest={interest} reduced={reduced} onReveal={onReveal} />;
    case 'assemble':
      return <Assemble interest={interest} reduced={reduced} onReveal={onReveal} />;
    case 'postcard':
      return <Postcard interest={interest} reduced={reduced} onReveal={onReveal} />;
    case 'evasive':
      return <Evasive interest={interest} reduced={reduced} onReveal={onReveal} />;
  }
}

/* --------------------------------------------------------------------------
   DEVELOP
   A blank sheet in a tray. Working it brings the picture up.
   -------------------------------------------------------------------------- */
function Develop({ interest, reduced, onReveal }: MechanicProps) {
  const [strength, setStrength] = useState(0);
  const labelId = useId();

  const work = (amount: number) => {
    setStrength((current) => {
      const next = Math.min(1, current + amount);
      if (next >= 1) window.setTimeout(onReveal, 420);
      return next;
    });
  };

  return (
    <div className="develop">
      <div
        className="develop__tray"
        onPointerMove={reduced ? undefined : () => work(0.035)}
        aria-hidden="true"
      >
        <div className="develop__sheet" style={{ opacity: strength }}>
          <Figure image={interest.artwork.image} showCaption={false} seed={interest.id} />
        </div>
        <div className="develop__blank" style={{ opacity: 1 - strength * 0.85 }} />
      </div>

      <div className="develop__controls">
        <button
          type="button"
          className="button button--quiet"
          onClick={() => work(0.25)}
          aria-describedby={labelId}
        >
          Develop
        </button>
        <p id={labelId} className="develop__reading">
          {Math.round(strength * 100)} per cent
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   FILMSTRIP
   A strip pulled through by hand. The native range control is used because
   it is already operable by pointer, keyboard and screen reader.
   -------------------------------------------------------------------------- */
const FRAME_COUNT = 6;

function Filmstrip({ interest, onReveal }: MechanicProps) {
  const [frame, setFrame] = useState(0);
  const id = useId();

  const change = (value: number) => {
    setFrame(value);
    if (value >= FRAME_COUNT - 1) window.setTimeout(onReveal, 320);
  };

  return (
    <div className="filmstrip">
      <div className="filmstrip__window" aria-hidden="true">
        <div
          className="filmstrip__track"
          style={{ transform: `translateX(-${frame * (100 / FRAME_COUNT)}%)` }}
        >
          {Array.from({ length: FRAME_COUNT }, (_, i) => (
            <div key={i} className="filmstrip__frame" data-current={i === frame}>
              <span className="filmstrip__number">{String(i + 1).padStart(2, '0')}</span>
              <Figure
                image={interest.artwork.image}
                showCaption={false}
                seed={`${interest.id}-${i}`}
              />
            </div>
          ))}
        </div>
        {/* The sprocket holes, so the strip reads as film. */}
        <div className="filmstrip__sprockets" />
      </div>

      <div className="filmstrip__controls">
        <label htmlFor={id} className="filmstrip__label">
          Pull the strip to the end
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={FRAME_COUNT - 1}
          step={1}
          value={frame}
          className="filmstrip__range"
          onChange={(event) => change(Number(event.target.value))}
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   ASSEMBLE
   Six pieces of one composition, scattered. Each is a button: click it, or
   tab to it and press Enter, and it goes back where it belongs.
   -------------------------------------------------------------------------- */
const PIECES = 6;
const COLUMNS = 3;
const ROWS = 2;

/** Where each piece starts. Written out so the scatter is the same every
 *  time, and so no piece ever lands on top of the one beside it. */
const SCATTER: [number, number, number][] = [
  [-46, -28, -9],
  [38, -34, 7],
  [52, 26, -12],
  [-52, 30, 11],
  [14, 44, -6],
  [-18, -46, 8],
];

function Assemble({ interest, reduced, onReveal }: MechanicProps) {
  const [placed, setPlaced] = useState<boolean[]>(() => Array(PIECES).fill(false));

  const put = (index: number) => {
    setPlaced((current) => {
      if (current[index]) return current;
      const next = [...current];
      next[index] = true;
      if (next.every(Boolean)) window.setTimeout(onReveal, 460);
      return next;
    });
  };

  const done = placed.filter(Boolean).length;

  return (
    <div className="assemble">
      <div className="assemble__board">
        {Array.from({ length: PIECES }, (_, i) => {
          const column = i % COLUMNS;
          const row = Math.floor(i / COLUMNS);
          const [dx, dy, rotation] = SCATTER[i];
          const home = placed[i];

          return (
            <button
              key={i}
              type="button"
              className="assemble__piece"
              data-placed={home}
              onClick={() => put(i)}
              aria-label={`Piece ${i + 1} of ${PIECES}. ${home ? 'In place.' : 'Put it in place.'}`}
              style={{
                left: `${(column * 100) / COLUMNS}%`,
                top: `${(row * 100) / ROWS}%`,
                width: `${100 / COLUMNS}%`,
                height: `${100 / ROWS}%`,
                transform: home
                  ? 'none'
                  : reduced
                    ? 'none'
                    : `translate(${dx}%, ${dy}%) rotate(${rotation}deg)`,
              }}
            >
              <span className="assemble__piece-window">
                <span
                  className="assemble__piece-art"
                  style={{
                    width: `${COLUMNS * 100}%`,
                    height: `${ROWS * 100}%`,
                    left: `${-column * 100}%`,
                    top: `${-row * 100}%`,
                  }}
                >
                  <Figure
                    image={interest.artwork.image}
                    showCaption={false}
                    seed={interest.id}
                  />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="assemble__reading" aria-live="polite">
        {done} of {PIECES} in place
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   POSTCARD
   Front: the picture, with marks standing for the interests it touches.
   Back: the writing.
   -------------------------------------------------------------------------- */
function Postcard({ interest, onReveal }: MechanicProps) {
  const [turned, setTurned] = useState(false);

  const turn = () => {
    const next = !turned;
    setTurned(next);
    if (next) window.setTimeout(onReveal, 1400);
  };

  return (
    <div className="postcard">
      <button
        type="button"
        className="postcard__card"
        data-turned={turned}
        onClick={turn}
        aria-pressed={turned}
        aria-label={`${interest.name} postcard. ${turned ? 'Showing the back.' : 'Turn it over.'}`}
      >
        <span className="postcard__face postcard__face--front">
          <Figure image={interest.artwork.image} showCaption={false} seed={interest.id} />
          <span className="postcard__stamp" aria-hidden="true">
            {interest.code}
          </span>
        </span>

        <span className="postcard__face postcard__face--back">
          <span className="postcard__back-rules" aria-hidden="true" />
          <span className="postcard__back-text">{interest.informalContent[0]}</span>
          <span className="postcard__back-mark" aria-hidden="true">
            {interest.code}
          </span>
        </span>
      </button>
    </div>
  );
}

/* --------------------------------------------------------------------------
   EVASIVE
   The still will not be pinned down. Three attempts and it gives in.
   -------------------------------------------------------------------------- */
const ATTEMPTS = 3;

function Evasive({ interest, reduced, onReveal }: MechanicProps) {
  const [tries, setTries] = useState(0);
  const [spot, setSpot] = useState<[number, number]>([0, 0]);
  const moving = useRef(false);

  const dodge = () => {
    const next = tries + 1;
    setTries(next);

    if (next >= ATTEMPTS) {
      setSpot([0, 0]);
      window.setTimeout(onReveal, 380);
      return;
    }

    // Steps to a corner it has not just come from.
    const corners: [number, number][] = [
      [-26, -18],
      [26, -18],
      [26, 18],
      [-26, 18],
    ];
    setSpot(corners[next % corners.length]);
  };

  const graze = () => {
    if (reduced || moving.current) return;
    moving.current = true;
    dodge();
    window.setTimeout(() => {
      moving.current = false;
    }, 500);
  };

  return (
    <div className="evasive">
      <div className="evasive__area">
        <button
          type="button"
          className="evasive__target"
          onPointerEnter={graze}
          onClick={dodge}
          style={{
            transform: reduced ? 'none' : `translate(${spot[0]}%, ${spot[1]}%)`,
          }}
          aria-label={`Catch the frame. ${ATTEMPTS - tries} attempts left.`}
        >
          <Figure image={interest.artwork.image} showCaption={false} seed={interest.id} />
        </button>
      </div>

      <p className="evasive__reading" aria-live="polite">
        {tries === 0
          ? 'It has not been caught yet'
          : `${ATTEMPTS - tries} to go`}
      </p>
    </div>
  );
}
