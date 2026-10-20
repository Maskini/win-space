import { site } from '../site.config.mjs';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const styleVersion = createHash('sha256').update(readFileSync(new URL('../assets/site.css', import.meta.url))).digest('hex').slice(0, 12);
const playerVersion = createHash('sha256').update(readFileSync(new URL('../assets/demo-player.js', import.meta.url))).digest('hex').slice(0, 12);

export const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export function Icon(name, className = '') {
  const paths = {
    arrow: '<path d="M5 19 19 5M5 5h14v14"/>',
    back: '<path d="m10 5-7 7 7 7M3 12h18"/>',
    playCircle: '<circle cx="12" cy="12" r="10"/><path d="m10 7 7 5-7 5z" fill="currentColor" stroke="none"/>',
    play: '<path d="M6 4 18 12 6 20Z" fill="currentColor" stroke="none"/>',
  };
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

// Preserve the existing site's stacked wordmark and its proportions.
export function Logo(base) {
  return `<a class="logo" href="${base}" aria-label="WIN Space home"><strong>WIN</strong><span>SPACE</span></a>`;
}

export function Header(base) {
  return `<header class="site-header page-shell inset">${Logo(base)}<span class="platform-label">Interactive event platform</span></header>`;
}

export function OpenAppButton() {
  return `<a class="button" href="${site.appUrl}">Open WIN Space ${Icon('arrow')}</a>`;
}

export function FeatureStrip() {
  return `<section class="features inset" aria-label="The WIN Space experience">
    <div><h2>Join from your phone</h2><p>A shared room. Your own device.</p></div>
    <div><h2>Play together</h2><p>Teams, quizzes and shared activities.</p></div>
    <div><h2>Organiser-led</h2><p>Rooms, scoring and result review.</p></div>
  </section>`;
}

export function Footer() {
  return `<footer class="site-footer page-shell"><span>WIN Space · Copyright 2026</span><a href="${site.creditsUrl}">Photo credits</a></footer>`;
}

export function DemoPlayer(base) {
  const assetUrl = path => escape(/^(https?:)?\/\//.test(path) || path.startsWith('/') ? path : `${base}${path}`);
  const source = assetUrl(site.demo.src);
  const poster = assetUrl(site.demo.poster);
  return `<div class="video-player" data-demo-player>
    <video id="demo-video" controls playsinline preload="metadata" poster="${poster}" aria-label="WIN Space demonstration" aria-describedby="video-description" tabindex="0">
      <source src="${source}" type="${escape(site.demo.type)}">
      <p>Your browser cannot play this video. <a href="${source}">Open the demo video</a>.</p>
    </video>
    <button class="video-cover" type="button" aria-label="Play the WIN Space demo" aria-controls="demo-video" hidden>
      <img class="video-cover-photo" src="${poster}" alt="" width="1280" height="720" fetchpriority="high">
      <span class="video-cover-shade" aria-hidden="true"></span>
      <span class="video-cover-brand" aria-hidden="true"><strong>WIN</strong><span>SPACE</span></span>
      <span class="video-duration" aria-hidden="true" hidden></span>
      <span class="video-play" aria-hidden="true">${Icon('play')}</span>
      <span class="video-cover-caption" aria-hidden="true">A little friendly rivalry.</span>
    </button>
  </div>
  <p id="video-description" class="visually-hidden">A demonstration of joining rooms, team quizzes, live polls, Campus Guessr and moderator-controlled results. The video contains music and on-screen text, with no spoken dialogue.</p>
  <p class="video-error" role="status" hidden>Unable to play the video. <a href="${source}">Open the video directly</a>.</p>`;
}

export function Document({ title, description, base, route, content, demo = false }) {
  const canonical = new URL(route, site.url).href;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0d7350">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="WIN Space">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escape(title)}">
  <meta name="twitter:description" content="${escape(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}assets/site.css?v=${styleVersion}">
${demo ? `  <script type="module" src="${base}assets/demo-player.js?v=${playerVersion}"></script>` : ''}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${Header(base)}
  <main id="main" class="page-shell ${demo ? 'demo-page' : 'home-page'}">
    ${content}
    ${FeatureStrip()}
  </main>
  ${Footer()}
</body>
</html>
`;
}
