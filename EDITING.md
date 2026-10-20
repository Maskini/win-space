# Project page

The home and demo pages are generated from shared components in `src/`.

Run `npm run build` after editing those components or `site.config.mjs`.
The generated `index.html` and `demo/index.html` are published directly by GitHub Pages.
Styles live in `assets/site.css`; the accessible video controls are in `assets/demo-player.js`.

## Replace the demo

Replace `media/win-space-demo.mp4` with your new MP4 recording. Keep the filename and the site uses it automatically.
For a different filename or an externally hosted video, update `demo.src` in `site.config.mjs` and run `npm run build`.
The source is resolved relative to the project page, including on GitHub Pages.
For best compatibility, export an H.264 MP4 with AAC audio and web-optimized/fast-start metadata.
Replace `assets/demo-cover.jpg` to update the still shown before playback. The cover title and wordmark are real text in `DemoPlayer` in `src/components.mjs`; the play button and duration are interactive interface elements, not part of the image.

The player never autoplays. It supports the central play button, native playback controls and inline mobile playback.
