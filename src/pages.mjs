import { Document, DemoPlayer, OpenAppButton, Icon } from './components.mjs';

export function HomePage() {
  return Document({
    title: 'WIN Space — Interactive Event Platform',
    description: 'Make every answer count. Quizzes, votes and friendly competition. One place to bring your people together.',
    base: './', route: '',
    content: `<section class="hero inset" aria-labelledby="title">
      <div class="hero-copy">
        <p class="eyebrow">Your gathering. Your rules.</p>
        <h1 id="title">Make every<br>answer count.</h1>
        <p class="intro">Quizzes, votes and friendly competition. One place to bring your people together.</p>
        <div class="hero-actions">
          ${OpenAppButton()}
          <a class="watch-link" href="./demo/">${Icon('playCircle')}<span>Watch the demo</span></a>
        </div>
      </div>
      <figure class="app-frame">
        <div class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="app-screen"><img src="./app-preview.png" alt="The WIN Space homepage, with room-code entry and activity selection." width="810" height="1615" fetchpriority="high"></div>
        <figcaption>A look inside WIN Space</figcaption>
      </figure>
    </section>`,
  });
}

export function DemoPage() {
  return Document({
    title: 'See WIN Space in action — WIN Space',
    description: 'A quick look at WIN Space: shared rooms, team quizzes and interactive event activities.',
    base: '../', route: 'demo/', demo: true,
    content: `<section class="demo-content inset" aria-labelledby="title">
      <div class="demo-intro">
        <a class="back-link" href="../">${Icon('back')}<span>Back to home</span></a>
        <h1 id="title">See WIN Space in action.</h1>
        <p>A quick look at how it works.</p>
      </div>
      <div class="video-wrap">${DemoPlayer('../')}</div>
      <div class="demo-action">${OpenAppButton()}</div>
    </section>`,
  });
}
