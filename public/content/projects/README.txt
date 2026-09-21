PROJECT PICTURES
================

Make one folder per project, named the same as the project's id in
src/content/projects.ts. For example:

  projects/
    courtyard-dwelling/
      cover.jpg
      plan-ground.jpg
      plan-first.jpg
      section-long.jpg
      view-court.jpg

Then point at them from src/content/projects.ts:
    src: '/content/projects/courtyard-dwelling/cover.jpg'

You can use any names you like. Keeping the drawing type at the front
(plan-, section-, view-, model-) makes the folder easy to read later.
