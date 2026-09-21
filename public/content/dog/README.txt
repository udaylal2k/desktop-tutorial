THE COMPANION
=============

Three to five pictures, if you want the companion to use photographs
instead of the drawn figure.

  dog/
    01.png
    02.png
    03.png

Pictures with the background already removed (a .png with transparency)
work best, because the companion stands on the page rather than in a box.

Then open src/content/companion.ts and list them:
    photographs: ['/content/dog/01.png', '/content/dog/02.png'],

To switch the companion off altogether, open src/config/site.config.ts and
change dogCompanion to false.
