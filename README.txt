Drop these files into this /assets folder, using these exact names,
and the site will pick them up automatically:

IMAGES
  doodle-1.png     small doodle sticker (start + wishes slides)
  doodle-2.png     small doodle sticker (start + wishes slides)
  doodle-3.png     small doodle sticker (wishes slide)
  flower.png       single flower/petal graphic, transparent background
                    (this is what falls when "Start" is clicked)
  image1.png ... image5.png   your 5 photo-booth pictures
  cake.png         the birthday cake image (transparent background looks best)

AUDIO
  song-wishes.mp3  plays automatically on the wishes slide (chapter one)
  hbd.mp3          plays automatically on the cake slide (chapter three) —
                    when it finishes, the site auto-advances to the letter.
                    There is also a "Continue" button on that slide, so the
                    site never gets stuck even if this file is missing.

VIDEO
  video1.mp4       your video for the 6th and final slide. It sits inside a
                    framed box over an animated pink heart-particle canvas
                    background. It has visible controls (play/pause/volume)
                    rather than autoplay, since browsers block autoplay
                    video-with-sound anyway. Swap the filename in
                    index.html (<video id="finalVideo" src="...">) if you
                    want to name it something else.

TEXT YOU CAN EDIT LATER
  - Wish paragraph: index.html -> <p class="wish-text">...</p>
  - 5 photo captions: index.html -> each <figcaption>...</figcaption>
  - Her name under the cake: index.html -> <p class="cake-name">...</p>
  - The final letter: script.js -> the `letterLines` array at the top

SLIDE ORDER (6 total)
  1. Start          -> click Start, petals fall
  2. Wishes          -> doodles + song-wishes.mp3 autoplay
  3. Photo booth     -> 5 photos with captions
  4. Cake            -> heart field + cake.png + her name + hbd.mp3
  5. Letter          -> typed-in fade lines
  6. Video           -> pink heart-particle canvas + framed video1.mp4

TESTING LOCALLY
  Double-clicking index.html works for layout/click-through, but some
  browsers restrict audio/fonts on file://. If audio doesn't autoplay
  locally, run a quick local server instead, e.g. from this folder:
    python3 -m http.server 8000
  then open http://localhost:8000 in your browser. On GitHub Pages this
  isn't an issue since it's served over https.
