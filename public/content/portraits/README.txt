THE TWO PICTURES OF YOU
=======================

  formal.jpg     Tall, about 4 wide by 5 tall. The one that goes on an
                 application. Plain background, good light.

  informal.jpg   Square. The one that explains the work. Anything that is
                 actually you.

Then open src/content/about.ts and change:
    src: ''
to
    src: '/content/portraits/formal.jpg'
and do the same for the informal one. Rewrite the `alt` line underneath to
describe what the picture shows.
