# Filling in your website

This guide is for you, not for a developer. It assumes you have never edited
a website before.

Everything you will ever need to change lives in **two folders**:

| Folder | What is in it |
| --- | --- |
| `src/content/` | All the words. Plain text files you open and type into. |
| `public/content/` | All the pictures. Drop your files in and they appear. |

You do not need to touch anything else. The design, the layout, the
animation, the colours and the typography are finished. Adding your work
will not break any of it.

---

## Before you start

### The five rules

1. **Only ever change the text between the quote marks.** Everything in a
   content file looks like `title: 'Campus Design',`. Change
   `Campus Design`. Leave the `title:`, the quote marks and the comma
   exactly as they are.
2. **Keep every comma.** Each line ends with a comma. If you delete one,
   the website will not load. If that happens, put it back.
3. **If your text contains an apostrophe**, put a backslash in front of it:
   `'It\'s a small house'`. Or just write around it.
4. **Save often, and look at the website.** It reloads by itself while you
   work, so you see the result immediately.
5. **Nothing is permanent.** If something looks wrong, undo it.

### Seeing your changes

Open a terminal in this folder and type:

```
npm install     (only the first time)
npm run dev
```

It prints a web address. Open it in a browser. Leave it running while you
work; every time you save a file the page updates itself.

---

## How to install Maya's real fonts

**Files:** `public/fonts/`, `src/styles/fonts.css`, `src/styles/tokens.css`

The two typefaces the website uses right now - Cabinet Grotesk for
headings, navigation and reading copy, and Newsreader for the occasional
pull quote - are **stand-ins**, chosen to match the weight and character
of the brief as closely as possible without inventing a font name that
was never supplied. They are not the final fonts. Replace them as soon
as the real ones are available.

1. Get the real font files (`.woff2` is best; ask whoever supplies them
   for it if they only have `.ttf` or `.otf`). Put them in
   `public/fonts/`.
2. Open `src/styles/fonts.css`. Near the top are two `@font-face` blocks
   for `'Cabinet Grotesk'` (the primary display/sans) and four for
   `'Newsreader'` (the secondary editorial serif, one per weight and
   style). Change each `src: url('/fonts/...')` line to point at the new
   file, and change the `font-family` name to match the real typeface.
3. Open `src/styles/tokens.css` and find `--font-display`,
   `--font-editorial` and `--font-serif-accent`. Change the font name in
   each to match what you set in step 2. `--font-technical` (the small
   monospace numbers and labels) is not part of this brief and can stay
   as it is.

Nothing else needs to change. Every component reads the font through
those three settings rather than naming a typeface itself, so updating
them updates the whole website at once.

If a real name is supplied but the file itself is not, do not substitute
a similar-looking system font in its place - leave the current stand-in
in use, and note in your own records which name is still owed.

---

## Pictures: the part that matters most

### Where they go

Put your files in `public/content/`, in the folder that matches. There is a
`README.txt` in each one telling you what belongs there.

### How to name them

Lower case letters, numbers and hyphens. Nothing else.

- Good: `courtyard-plan-ground.jpg`
- Bad: `Courtyard Plan (Ground).JPG`

### How to save them

- **Photographs and renders** → `.jpg`, about 2000 pixels on the long side.
- **Drawings and anything with flat colour** → `.png`.
- Keep each file under about 500 KB.

A 12 MB photograph will not look better on a screen. It will only make the
page slow.

### How to point at a picture

Every picture in a content file looks like this:

```js
{
  src: '',
  alt: 'Demonstration cover image for the courtyard dwelling project.',
  ratio: 3 / 2,
  treatment: 'cover',
  register: 'photograph',
  label: 'Cover',
}
```

You change two things:

```js
{
  src: '/content/projects/campus-design/cover.jpg',
  alt: 'The shared court seen from the main entrance, early morning.',
  ratio: 3 / 2,
  treatment: 'cover',
  register: 'photograph',
  label: 'Cover',
}
```

- **`src`** is the path to your file. It always starts with `/content/`.
  Note there is no `public` in the path.
- **`alt`** is what the picture shows, written for somebody who cannot see
  it. Write a real sentence. This is not optional; it is how a blind
  visitor reads your portfolio.

### The other three settings

You can leave these alone. When you want to change how a picture sits:

**`ratio`** is the shape of the picture: width divided by height.

| Write | You get |
| --- | --- |
| `1` | Square |
| `3 / 2` | Standard landscape photograph |
| `4 / 3` | Slightly squarer landscape |
| `16 / 9` | Wide |
| `21 / 9` | Very wide, cinematic |
| `4 / 5` | Standard portrait |
| `3 / 4` | Taller portrait |

**`treatment`** is how it fills its frame.

| Write | You get |
| --- | --- |
| `'cover'` | Fills the frame, crops whatever does not fit. Photographs. |
| `'contain'` | Nothing is cropped. Plans, sections, scans. |
| `'framed'` | Sits inside a drawn frame with paper around it. Sketches, documents. |
| `'bleed'` | Runs right across the page, edge to edge. |

**`register`** is what kind of drawing it is. It only matters while the
picture is missing, because it decides what the placeholder draws. Pick the
closest: `photograph`, `render`, `plan`, `section`, `elevation`,
`axonometric`, `diagram`, `sketch`, `model`, `detail`, `texture`,
`portrait`, `document`.

### While a picture is missing

Leave `src` as `''` and the website draws its own plate at exactly the
right shape. Nothing looks broken, and **nothing on the page moves** when
you put the real picture in. You can fill the site in slowly.

---

## How to add a project

**File:** `src/content/projects.ts`

Open it. You will see your five projects, each starting with `{` and
ending with `},`. Copy one whole block, paste it wherever you want it to
sit in the list, and change the values.

```js
{
  id: 'campus-design',
  number: 'P.001',
  title: 'Campus Design',
  year: '[Add year]',
  location: '[Add site location]',
  type: 'Campus',
  siteSize: '[Add site size]',
  program: '[Add program]',
  focus: 'A short line describing the central idea.',
  role: '[Add role]',
  status: 'unspecified',
  shortDescription: 'One line, printed in the index.',
  description: 'A longer paragraph, printed at the top of the page.',
  tools: ['AutoCAD', 'Revit'],
  coverImage: { ... },
  sections: [ ... ],
  archive: ['a-001', 'a-002'],
  related: [ ... ],
},
```

### How to change a project title

Change the `title` line. Nothing else needs to change - the web address
(`id`) and the archive number (`number`) can stay as they are, or you can
change them too as long as `id` stays unique and web-address-safe (lower
case, hyphens, no spaces).

### The information fields

These print in the panel of facts beside the title, and most of them
double as filters in the project archive. Leave any of them as the
bracketed placeholder shown above until you have the real answer - never
guess at a fact.

| Field | Printed as | What to write |
| --- | --- | --- |
| `year` | Year | A year, in quote marks, e.g. `'2025'`. **How to add a year.** |
| `location` | Site location | City, country, e.g. `'Berlin, Germany'`. Also a filter. **How to add site location.** |
| `siteSize` | Site size | An area, e.g. `'2,400 m²'`. **How to add site size.** |
| `program` | Program | What the project contains or was designed to accommodate. **How to add program.** |
| `focus` | Focus | The central idea the project investigates - one considered line, not a raw fact. Safe to write yourself. **How to add focus.** |
| `role` | Role | `Individual`, `Collaboration`, `Design`, `Documentation`, or your own. **How to add role.** |
| `status` | Status | One of exactly: `completed`, `in-progress`, `proposal`, `academic`, `competition`, `unspecified`. Use `unspecified` until you know - it prints as "To be confirmed" rather than a guess. |
| `type` | (not printed) | Anything you like: `Residential`, `Campus`, `Civic`. Used only to group and filter the archive. |
| `shortDescription` | (index only) | One line, printed in the project archive. |
| `description` | (page top) | A short paragraph, printed at the top of the project page. |

### How to select software

**Field:** `tools`, on the project itself.

```js
tools: ['AutoCAD', 'Revit', 'Rhino 3D'],
```

The website's software bar only understands six exact names - `'AutoCAD'`,
`'SketchUp'`, `'Revit'`, `'Rhino 3D'`, `'Photoshop'`, `'Affinity'` - so that
it can print a proper bar rather than guess at an unknown one. List only
the ones actually used on that project. Leave the list empty (`tools: []`)
until you know, rather than listing everything "just in case" - the bar
then shows `[Add tools]` instead of inventing a workflow.

**To hide a project without deleting it**, add `draft: true,` anywhere
inside its block. It stays in the file and disappears from the website.

### Building the project page

A project page is a **sequence of sections**, in the order you write them.
There is no fixed template: one project can be all drawings, the next all
photographs, the next mostly writing.

Each section is one block inside `sections: [ ... ]`.

**A paragraph or several**

```js
{
  id: 'intro',
  kind: 'text',
  label: 'Introduction',
  body: [
    'The first paragraph.',
    'The second paragraph.',
  ],
},
```

**One picture across the section**

```js
{
  id: 'site-plan',
  kind: 'plate',
  label: 'Site',
  image: { src: '...', alt: '...', ratio: 16 / 10, treatment: 'contain', register: 'plan' },
},
```

**Two, three or four pictures side by side**

```js
{
  id: 'plans',
  kind: 'series',
  title: 'Plans',
  images: [ { ... }, { ... } ],
},
```

**A picture with writing beside it**

```js
{
  id: 'the-court',
  kind: 'aside',
  title: 'The court',
  imageSide: 'right',
  image: { ... },
  body: ['One paragraph.', 'Another.'],
},
```

`imageSide` is `'left'` or `'right'`.

**One sentence that stops the page**

```js
{ id: 'statement', kind: 'statement', body: 'One line, set large.' },
```

**A list of facts**

```js
{
  id: 'schedule',
  kind: 'schedule',
  title: 'Particulars',
  items: [
    { key: 'Area', value: '148 square metres' },
    { key: 'Structure', value: 'Cross laminated timber' },
  ],
},
```

**A pause**

```js
{ id: 'break-1', kind: 'break' },
```

Every section needs an `id` that is different from the others in the same
project. To move a section, cut the whole block and paste it somewhere else
in the list. To remove one, delete the block. Nothing forces every project
to use every kind, or to use them in the same order - a project can skip
straight from an introduction to drawings with nothing in between, and the
next one can be built completely differently.

**A suggested numbering**, if you want one, is to put it in each section's
`label`: `01 — Introduction`, `02 — Concept`, `03 — Context`, `04 — Design
development`, `05 — Drawings`, `06 — Plans`, `07 — Sections`,
`08 — Elevations`, `09 — Visualisations`, `10 — Process`, `11 — Final
work`, `12 — Archive`. It is only text in a `label` field - the website
does not enforce it, so use as many or as few of the twelve as a project
actually needs, in whatever order tells that project's story, and reorder
or drop any of them at any time by editing the `label` and moving the
block.

### Adding drawings, plans and sections

They are just pictures with a different `register` and `treatment`:

```js
{
  src: '/content/projects/campus-design/section-long.jpg',
  alt: 'Long section cut through the shared hall, looking east.',
  ratio: 2 / 1,
  treatment: 'contain',
  register: 'section',
  caption: 'Long section',
  label: 'Drawing 04',
}
```

Use `'contain'` for anything measured, so nothing gets cropped off.

### Adding process material

Two places, and they do different jobs:

1. **Inside the project**, as an informal section (see below). This is
   process you want people to read.
2. **In the archive** (see further down). This is process you want people
   to be able to find.

---

## Formal and informal

Every project can be read two ways:

- **Formal**: what you made.
- **Informal**: the person who made it.

A visitor switches between them with the control at the top of the project.

Add `mode: 'informal'` to any section and it only appears under the second
reading. Sections without a `mode` line appear under both.

```js
{
  id: 'informal-start',
  kind: 'text',
  mode: 'informal',
  label: 'How it started',
  title: 'Where this came from',
  body: [
    'The thing that started it, the part that took three attempts, and the',
    'decision that turned out to be the whole project.',
  ],
},
```

The informal reading is where the rough sketches, the failed options, the
working photographs and the doubts belong. It does not have to be resolved.
That is the point of it.

**To switch the whole thing off**, open `src/config/site.config.ts` and set
`formalInformalMode` to `false`. Only the formal reading is then shown.

---

## How to add a journal entry

**File:** `src/content/journal.ts`

There are three kinds of writing, and they live in one place:

- **`research`**: papers, studies, investigations. The more structured of
  the three - state the question early, and be honest about how far it got.
- **`articles`**: writing made for publication, addressed to a reader
  outside the studio.
- **`notes`**: fragments, observations, things still moving. The most
  personal and the least finished of the three - a note does not have to
  resolve, or even to be kept once it stops being interesting.

The line under each category's name at the top of the Journal page (in
`journalCategories`, near the bottom of the same file) can be edited the
same way - the one for Notes is Maya's own supplied wording, so leave
that one as given.

Copy a block, paste it at the top, change the values.

```js
{
  id: 'threshold-and-passage',
  title: 'Threshold and Passage',
  category: 'research',
  date: '2026-04-18',
  description: 'One line, printed in the index.',
  content: [
    'The opening paragraph.',
    '## A heading',
    'The paragraph under it.',
  ],
  coverImage: { ... },
  tags: ['threshold', 'circulation'],
  related: [ ... ],
},
```

| Line | What to write |
| --- | --- |
| `id` | The web address. Lower case, hyphens. |
| `category` | Exactly one of: `research`, `articles`, `notes`. |
| `date` | Year, month, day, like this: `'2026-04-18'`. This sets the order. |
| `content` | A list of paragraphs. **Start a line with `## ` to make it a heading.** |
| `tags` | A list of words. They are searchable. |

The website works out the reading time from the words themselves.

### Adding a research entry, an article or a note

They are the same block. Only the `category` line is different. Put
`'research'`, `'articles'` or `'notes'` and the entry files itself.

---

## How to add an interest

**File:** `src/content/interests.ts`

```js
{
  id: 'photography',
  code: 'PHO.',
  name: 'Photography',
  description: 'One line.',
  connections: ['film', 'graphic-design'],
  formalContent: ['The considered account.'],
  informalContent: ['The personal account.'],
  artwork: { mechanic: 'develop', prompt: '...', reward: '...', image: { ... } },
  related: [ ... ],
},
```

| Line | What to write |
| --- | --- |
| `code` | Your archive code, three letters and a full stop: `PHO.`, `VID.`, `MUS.`. |
| `connections` | The `id`s of the other interests this one feeds into. **This is what draws the lines between them.** |
| `formalContent` | Paragraphs for the considered reading. |
| `informalContent` | Paragraphs for the personal reading. |

### Changing the map

The connected map on the Interests page is drawn entirely from the
`connections` lists. Add `'music'` to photography's list and a line appears
between them. Remove it and the line goes. **You never touch the drawing.**

The positions work themselves out from how many interests there are, so
adding an eighth one rearranges the map on its own.

### Choosing what an interest does when you play with it

`artwork.mechanic` is one of:

| Write | What happens |
| --- | --- |
| `'develop'` | A blank sheet develops into the picture as it is worked. |
| `'filmstrip'` | The frames of a strip are played by hand. |
| `'assemble'` | Scattered pieces are put back into place. |
| `'postcard'` | A card turns over and there is writing on the back. |
| `'evasive'` | The picture steps away until it is caught. |

`prompt` is the line shown before; `reward` is the line shown after. Several
interests can share a mechanic.

---

## How to add archive material

**File:** `src/content/archive.ts`

The archive is the wider body of material behind the finished work.

```js
{
  id: 'a-016',
  title: 'First plan, discarded',
  kind: 'sketch',
  date: '2024-02-11',
  project: 'campus-design',
  description: 'One or two lines.',
  image: { ... },
  tags: ['plan', 'discarded'],
  sketchbook: true,
  related: [],
},
```

| Line | What to write |
| --- | --- |
| `id` | Anything unique. Carrying on `a-016`, `a-017` keeps it tidy. |
| `kind` | One of: `drawing`, `sketch`, `photo`, `process`, `note`, `reference`, `experiment`, `screenshot`, `journal`, `model`. |
| `project` | The `id` of a project, if it belongs to one. Delete the line if it does not. |
| `interest` | The `id` of an interest, if it belongs to one. Delete the line if it does not. |
| `sketchbook` | `true` puts it in the sketchbook as well. Delete the line otherwise. |

**To attach material to a project**, add the archive item's `id` to that
project's `archive: [...]` list in `projects.ts`. It then opens from the
small **Archive +** mark beside the project's cover.

---

## How to connect things together

Every project, entry, interest and archive item has a `related` list:

```js
related: [
  { kind: 'interest', id: 'photography' },
  { kind: 'journal', id: 'light-as-a-material' },
  { kind: 'project', id: 'library-that-tells-time' },
],
```

`kind` is `project`, `journal`, `interest` or `archive`. `id` is the id of
the thing you are pointing at.

**You only have to write it once.** If a project points at a journal entry,
that entry shows the project back, automatically. And if you later delete
something, the links to it disappear quietly instead of breaking.

---

## How to replace the hero image

**Files:** `public/content/portraits/` and `src/content/home.ts`

This is the large photograph behind the opening title on the home page -
not the small "Off duty" one further down the page, which is covered
next.

1. Put a portrait or environmental photograph of Maya at
   `public/content/portraits/hero.jpg`. Choose one with room for large
   type over the top of it rather than one that is already busy edge to
   edge - the title sits directly on it.
2. Open `src/content/home.ts`.
3. Change `image.src: ''` to `image.src: '/content/portraits/hero.jpg'`.
4. Rewrite the `alt` line under it.

`disciplines`, `statement` and `titleLines` in that same file are Maya's
own supplied words. Leave them exactly as given unless she asks for a
change herself.

---

## How to change your portrait

**Files:** `public/content/portraits/` and `src/content/about.ts`

This is the small, square, informal photograph ("Off duty") beside the
About text further down the home page.

1. Put `informal.jpg` (square) in `public/content/portraits/`.
2. Open `src/content/about.ts`.
3. Change `src: ''` to `src: '/content/portraits/informal.jpg'`.
4. Rewrite the `alt` line under it.

While you are in that file, replace the five sections of the About panel
and the short `schedule` beside the portrait. `headline`, `introduction`
and `philosophy` are Maya's own supplied words - leave those as given.
Everything else in there is placeholder text written for you to overwrite.

Delete any panel section you do not want. The panel adjusts.

---

## How to change the entrance picture

**Files:** `public/content/hero/` and `src/content/entrance.ts`

This is the different, architectural cover at the entrance to the
**Projects** section (the one the day passes over as you scroll) - not
either of the two photographs above, which belong to the home page.

1. Put a wide photograph or render at
   `public/content/hero/entrance.jpg`. Something with open sky in the upper
   half works best, because the light of the page passes behind it.
2. In `src/content/entrance.ts`, change `src: ''` to
   `src: '/content/hero/entrance.jpg'`.
3. Rewrite `headline` and `standfirst` while you are there.

Leave it empty and the website keeps drawing its own building, whose
windows come on as the sun goes down.

---

## How to change your contact details

**File:** `src/content/contact.ts`

```js
links: [
  { label: 'Email', display: 'you@example.com', href: 'mailto:you@example.com' },
  { label: 'LinkedIn', display: 'Your Name', href: 'https://...', external: true },
],
```

- `label` is the word on the left.
- `display` is what the visitor reads.
- `href` is where it goes. For email, write `mailto:` and then the address.
- `external: true` makes the link open in a new tab. Use it for anything
  that leaves your website.

**To add a social link**, copy a whole line and change it. **To remove
one**, delete its line. The footer follows the same list, so you only do it
once.

Also replace `headline`, `body`, `location`, `availability` and `closing`
in the same file. To drop `location` or `availability`, set them to `''`.

---

## The companion

**Files:** `src/config/site.config.ts` and `src/content/companion.ts`

Maya's own dog, resting quietly at the edge of the window. It does
nothing until it is clicked (or, on a phone, tapped): a click wakes it,
and it follows along at a distance - not attached to the cursor, but
trailing it with a bit of a lag - until a second click settles it back
down to rest.

### How to enable/disable the dog

Open `src/config/site.config.ts` and change:

```js
dogCompanion: true,
```

to `false`. It leaves the whole website. Visitors can also switch it off
for themselves with the small control beside it, and the website
remembers their choice for their next visit.

### How to add dog assets

Once real photographs of the dog exist, put them in `public/content/dog/`
and list them in `src/content/companion.ts`, inside `assets`:

```js
assets: {
  idle: ['/content/dog/resting-01.png'],
  wake: ['/content/dog/alert-01.png'],
  follow: ['/content/dog/walking-01.png', '/content/dog/walking-02.png'],
  settle: ['/content/dog/sitting-01.png'],
},
```

There is one list per state, so the picture can change with what the dog
is doing. Every list is optional - leave any of them empty (`[]`) and
that state borrows a photograph from `idle` instead, and if `idle` is
empty too, the drawn placeholder figure is used throughout. List more
than one picture in a list and the website cycles between them as a
visitor moves from page to page. Pictures with the background already
removed (a `.png` with transparency) work best.

Other settings in that file: `name` (used in the on-screen "switch off"
control), `restingPosition` (where it waits, as a fraction across the
window), and, further down, the numbers that shape how it moves once
awake - `motion` (how much it lags and overshoots as it follows),
`pauseEvery`/`pauseFor` (how often, and for how long, it stops to sit and
look around), and `mobileWander` (how far and how often it wanders on a
phone, where there is no cursor for it to follow). Each one is commented
in the file; the numbers already in place are a reasonable starting
point.

---

## Switching parts of the website on and off

**File:** `src/config/site.config.ts`

```js
export const siteConfig = {
  dogCompanion: true,
  formalInformalMode: true,
  interestNetwork: true,
  journal: true,
  archive: true,
  sketchbook: true,
  search: true,
  projectsEntrance: true,
  loadingSequence: true,
  suppliedLogo: '',
};
```

Change any `true` to `false`. Nothing breaks: the navigation, the footer,
the search and the links all follow what is set here. A section that is
switched off cannot be reached by typing its address either.

| Setting | What `false` does |
| --- | --- |
| `dogCompanion` | Removes the companion. |
| `formalInformalMode` | Shows only the formal reading everywhere. |
| `interestNetwork` | Shows the interests as a plain catalogue instead of a map. |
| `journal` | Removes the Journal from the navigation and the site. |
| `archive` | Removes the archive and the marks that open it. |
| `sketchbook` | Removes the sketchbook. |
| `search` | Removes search and the keyboard shortcut. |
| `projectsEntrance` | Goes straight to the project archive, with no day passing. |
| `loadingSequence` | Removes the short opening. |

`suppliedLogo` is for later: when your final logo file arrives, put it at
`public/content/logo.svg` and set this to `'/content/logo.svg'`. Every
header, footer and loading screen picks it up at once.

---

## Changing the words the website uses about itself

**File:** `src/content/site.ts`

The name, the line under it, the identity statement, the five words of the
motto, and the description that appears in search results and when somebody
shares a link. Also `meta.url`, which you should set to your real web
address before the site goes live.

---

## If something goes wrong

**The page has gone white.**
You have almost certainly deleted a comma or a quote mark. Undo your last
change. The terminal running `npm run dev` prints the file and the line
number.

**A picture is not showing.**
Check three things:
1. The file really is in `public/content/...`.
2. The path in the content file starts with `/content/` and has **no**
   `public` in it.
3. The file name matches exactly, including the extension. `Cover.JPG` and
   `cover.jpg` are different files.

If a picture is missing the website quietly draws its placeholder instead,
so a wrong path never leaves a broken image on the page.

**A link goes to the dead end page.**
The `id` you pointed at does not exist. Check the spelling against the
content file it lives in.

**Everything is broken and you do not know why.**
If you are using git, `git checkout .` undoes every unsaved change. If you
are not, ask whoever set this up for you.

---

## Putting your changes on the web

The website publishes itself. Once you have saved your changes, send them to
GitHub and the live site updates on its own a couple of minutes later.

If you are using GitHub Desktop, which is probably how this got onto your
computer:

1. Open GitHub Desktop. Your changed files are listed down the left.
2. Type a short line in the **Summary** box saying what you changed, for
   example `Add the courtyard project photographs`.
3. Click **Commit to main**.
4. Click **Push origin** at the top.

That is it. Wait two or three minutes and reload the live site.

**To check it worked**, go to your repository on github.com and click the
**Actions** tab. A green tick means it published. A red cross means
something in the content files has a typo, and clicking into it will say
which file and which line. Fix it, commit, and push again; nothing is
broken in the meantime, because the live site only changes when a build
succeeds.

---

## A sensible order to work in

1. `src/content/site.ts` - the name and the description.
2. `src/content/about.ts` - who you are, and the two portraits.
3. `src/content/contact.ts` - how to reach you.
4. One project, all the way through, in `src/content/projects.ts`. Get one
   right before starting the next.
5. The rest of the projects.
6. `src/content/interests.ts` - the interests and the lines between them.
7. `src/content/journal.ts` - the writing.
8. `src/content/archive.ts` - the material behind the work.
9. `src/content/entrance.ts` - the picture at the entrance to Projects.

Then delete every demonstration block you have not replaced, and set the
four `...IsDemoContent` switches at the top of `projects.ts`,
`journal.ts`, `interests.ts` and `archive.ts` to `false`. The red
demonstration notices disappear from the website.
