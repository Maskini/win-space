function mountDemoPlayer(player) {
  const video = player.querySelector('video');
  const playButton = player.querySelector('.video-play');
  const errorMessage = document.querySelector('.video-error');

  function syncPlayback() {
    const paused = video.paused || video.ended;
    player.dataset.paused = String(paused);
    playButton.hidden = !paused;
    playButton.setAttribute('aria-label', video.ended ? 'Replay the WIN Space demo' : 'Play the WIN Space demo');
  }

  playButton.addEventListener('click', async () => {
    try {
      await video.play();
      video.focus({ preventScroll: true });
    } catch {
      syncPlayback();
      errorMessage.hidden = false;
    }
  });
  video.addEventListener('play', () => {
    errorMessage.hidden = true;
    syncPlayback();
  });
  video.addEventListener('pause', syncPlayback);
  video.addEventListener('ended', syncPlayback);
  const showError = () => {
    playButton.hidden = true;
    delete player.dataset.paused;
    errorMessage.hidden = false;
  };
  video.addEventListener('error', showError);
  video.querySelector('source').addEventListener('error', showError);
  syncPlayback();
}

document.querySelectorAll('[data-demo-player]').forEach(mountDemoPlayer);
