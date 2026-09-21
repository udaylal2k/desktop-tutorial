THE ENTRANCE PICTURE
====================

  entrance.jpg   Wide, about 16 by 9. A photograph or a render of a
                 building, with open sky in the upper half.

The light of the page passes behind this picture as the visitor scrolls, so
something with sky in it reads best.

Then open src/content/entrance.ts and change:
    src: ''
to
    src: '/content/hero/entrance.jpg'

Leave it empty and the website keeps drawing its own building, whose
windows come on as the sun goes down.
