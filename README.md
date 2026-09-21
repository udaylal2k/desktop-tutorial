# MAR

An architecture portfolio, an editorial publication and a digital archive,
built as one connected environment.

**If you own this website and want to put your work into it, you do not
need this file. Read [CONTENT-GUIDE.md](./CONTENT-GUIDE.md) instead.** This
one is for whoever maintains or deploys it.

---

## What this is

The site is finished apart from its content. The identity, the type system,
the colour system, the grid, the motion language, the responsive behaviour,
the archive logic, the navigation and the accessibility work are all built.
What remains is photographs, drawings, writing and contact details, and all
of that is added by editing plain text files and dropping images into a
folder. No component is ever edited to add content.

Until real pictures arrive, every image slot draws a MAR placeholder at
exactly the proportion the real picture will have, so the layout you see now
is the layout you get later. Nothing moves when the content lands.

---

## Running it

```
npm install
npm run dev        # development server, reloads as you save
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # TypeScript
npm run lint       # ESLint
```

Node 20 or newer.

---

## Deploying

### GitHub Pages (set up in this repository)

A workflow at `.github/workflows/deploy.yml` builds and publishes the site on
every push, and turns Pages on by itself the first time it runs.

**Pages has to be available for the repository first.** It is free for public
repositories. For a private one it needs GitHub Pro or above. If this
repository is private and the account is on the free plan the workflow will
fail at the "Configure Pages" step, and the options are: make the repository
public, upgrade the plan, or use one of the hosts below instead.

Once it can run, the site is live at
`https://<username>.github.io/<repository-name>/` and every push republishes
it. Adding a project or a photograph and pushing is the whole deploy process.

The workflow runs the typecheck and the lint before it builds, so a change
that breaks the site is caught before it is published rather than after.

**Why there is a `404.html`.** GitHub Pages cannot rewrite unknown paths to
`index.html`, so a visitor opening `/projects/courtyard-dwelling` directly
would get a dead end. The build writes a `404.html` that hands the requested
address to the app through the query string; a short script in `index.html`
unpacks it and restores the real address before React starts. Deep links,
reloads and shared links all work, and the address bar stays clean. The
build works this out from `base`, so nothing needs changing if the
repository is renamed.

### Any other host

`npm run build` writes a static site to `dist/`. It needs no server and no
database. Netlify, Vercel, Cloudflare Pages or a plain web server all work.

Netlify and Vercel publish from a **private** repository on their free plans,
which GitHub Pages does not, and both connect to a GitHub repository in a few
clicks and rebuild on every push exactly as the workflow here does.

Those hosts *can* rewrite, which is tidier than the `404.html` route, so give
them the rule:

- **Netlify** and **Cloudflare Pages**: `public/_redirects` is already in the
  repository and contains what is needed.
- **Vercel**: detects a Vite single page app and does this by itself.
- **Apache**: a `.htaccess` with `FallbackResource /index.html`
- **nginx**: `try_files $uri $uri/ /index.html;`

### Serving from a sub-path

The build reads `VITE_BASE`. It defaults to `/`, which is right for a normal
host and for a custom domain. The Pages workflow sets it to
`/<repository-name>/` because a project site is served from a sub-path. The
router and every asset path follow it automatically.

```
VITE_BASE=/some/sub/path/ npm run build
```

### Before going live

Set `meta.url` in `src/content/site.ts` to the real address. It is used for
canonical links.

---

## Project structure

```
public/
  fonts/              the three typefaces, self hosted
  content/            every picture, in folders by kind, each with a README
  favicon.svg

src/
  config/
    site.config.ts    the switches: companion, journal, archive, search, ...
  content/            ALL the words. This is what the owner edits.
    types.ts          the shape every piece of content has to fit
    site.ts           name, motto, page titles, sharing description
    about.ts          the two portraits and the About panel
    entrance.ts       the picture and words at the entrance to Projects
    projects.ts       the projects
    journal.ts        research, articles and notes
    interests.ts      the interests and the lines between them
    archive.ts        drawings, sketches, process, notes, references
    contact.ts        addresses and links
    companion.ts      the companion's photographs and behaviour
    index.ts          relationships and the search index, built from the above
  lib/                hooks, the seeded generator, interface state
  styles/
    tokens.css        every colour, size, rhythm, rule and easing
    base.css          reset, the three typographic voices, focus
    layout.css        the grid, the rooms, the shared controls
    fonts.css         the self hosted faces
  components/
    identity/         the wordmark, the mark, the wave
    placeholders/     the drawn plates that stand in for pictures
    media/            Figure: the one route every picture takes
    chrome/           header, footer, breadcrumb, curtain, route chrome
    panels/           About, search, the project archive drawer
    projects/         the entrance sequence, the index, the sequence renderer
    interests/        the connected map and the five artwork mechanics
    shared/           the formal and informal switch, related content
    companion/        the companion
  routes/             one file per page
```

---

## The design system

### Colour

Five materials, declared once in `src/styles/tokens.css`:

| Token | Value | Role |
| --- | --- | --- |
| `--mar-paper` | `#f3f0e8` | The page |
| `--mar-ink` | `#171717` | Text and mass |
| `--mar-olive` | `#526044` | The single interactive accent |
| `--mar-red` | `#b83a32` | Annotation marks only |
| `--mar-grey` | `#8a8a83` | Technical metadata |

Paper and ink carry everything. Olive is the only accent that ever marks an
interactive state. Red is never a surface and never a large field: it is
reserved for annotation, which means the archive trigger, the current
location in the breadcrumb, the project number, the demonstration notices,
and one mark on each drawn plate. That division is a rule, not a preference.

The site is a single locked light theme, because it is a print emulating
editorial environment. There is exactly one deliberate inversion: the
entrance to Projects, where a day passes over the work. It is scoped to
`[data-atmosphere='night']` and never applied to the page root.

### Typography

Three voices, self hosted, no third party request at runtime:

- **Display**: Syne, 700 and 800. Large, architectural, slightly playful.
- **Editorial**: Schibsted Grotesk. Drawn for newspaper reading.
- **Technical**: IBM Plex Mono. Project numbers, dates, codes, metadata.

Technical type is always tracked out and set in capitals. Editorial type
never is. The two are never mixed within a line.

### Shape

Radius is zero on every surface: cards, panels, inputs, buttons, images.
The only round things on the site are true circles, meaning registration
marks, network nodes, the sun and the moon, and the companion's eye.

### Motion

Slow, spatial, directional. Entry, transition, discovery, opening, closing.
Nothing bounces, nothing spins, nothing loops without a reason.

`prefers-reduced-motion` is honoured everywhere, and not by freezing things
mid transition: the entrance collapses to a single composed night view with
the same words and the same way through, reveals become static, the
companion sits still, and the interest artworks fall back to their plain
controls.

---

## Notes on the implementation

### Why there is no GSAP

The entrance sequence is a pinned, scrubbed scroll composition, which is
usually GSAP ScrollTrigger territory. It is built here with
`position: sticky` and Motion's `useScroll` instead. Sticky positioning does
the pinning natively, so there is nothing to measure, nothing to refresh on
resize, and no pin spacing to go wrong. It also saves a dependency the rest
of the site would not use.

No continuous value is ever held in React state. Scroll progress, the sun's
position, the companion's position and its presence are all motion values,
so moving the cursor or the page does not re-render the tree.

`window.addEventListener('scroll')` is not used anywhere. Scroll linked work
goes through `useScroll`; reveals go through `IntersectionObserver`.

### Why the placeholders are drawn

The site has to look finished before any content exists. Grey boxes and
`IMAGE HERE` labels would make it read as a wireframe, so
`src/components/placeholders/drawPlate.ts` generates architectural linework
instead: plans are subdivided and poched, sections are cut and hatched,
elevations are punctured, axonometrics are projected, documents are ruled.

Each drawing is generated from a seed made of its own label, so it is
identical on every visit and on every machine, and no two placeholders on a
page look alike.

### Why pictures never break

Every image goes through `src/components/media/Figure.tsx`. If `src` is
empty, a plate is drawn. If the file is missing or fails to load, the plate
takes over again. A broken image icon cannot appear on this site.

### Relationships

`src/content/index.ts` resolves references and finds the return references
nobody wrote. If a project names a journal entry, that entry shows the
project back. A reference pointing at deleted content is dropped rather than
rendered, so removing a project never leaves a dead link behind it.

### Search

The index is built from the content files at module load. Anything added to
a content file becomes findable with no further work. Cmd and K on a Mac,
Ctrl and K elsewhere.

---

## Accessibility

- Semantic HTML throughout, with one `h1` per page and a logical heading
  order under it.
- One focus ring for the whole site, never removed.
- Panels, drawers and the search overlay trap focus, close on Escape, lock
  the page behind them, and return focus to whatever opened them.
- No interaction depends on hover. The interest artworks are all operable
  from the keyboard, and each also carries a plain control that simply shows
  the content, so nobody has to play a game to read the site.
- The entrance sequence is ordinary page scroll, so the space bar, the arrow
  keys and Page Down all move through it, and a link at the top goes
  straight to the archive.
- Result counts and panel state are announced with live regions.
- Every image in the content model has a required `alt` field.
- Contrast is held at WCAG AA or better, including the placeholder captions
  and every form control.

---

## Performance

- Fonts are self hosted and subset to latin, and the two the first view
  needs are preloaded with the document.
- Routes are code split; the first view loads the shell and the home page.
- Motion and the router are split into their own chunks.
- Images below the fold are lazy loaded; covers are marked high priority.
- Every image slot reserves its space with `aspect-ratio`, so there is no
  layout shift when a picture lands.
- Every effect that observes or listens cleans up after itself.

---

## What was deliberately not invented

No award, client, employer, degree, qualification, publication, competition
result, location or professional claim appears anywhere in this repository.
Everything that would be a personal fact is placeholder text that says so,
and every block of demonstration content is marked as such on the website
itself. The four `...IsDemoContent` switches at the top of `projects.ts`,
`journal.ts`, `interests.ts` and `archive.ts` remove those notices once the
real content is in.
