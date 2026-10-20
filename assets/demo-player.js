function mountDemoPlayer(player) {
  const video = player.querySelector('video');
  const playButton = player.querySelector('.video-cover');
  const durationLabel = player.querySelector('.video-duration');
  const errorMessage = document.querySelector('.video-error');
  let hasStarted = false;
  let hasError = false;

  function syncDuration() {
    if (!Number.isFinite(video.duration)) return;
    const seconds = Math.round(video.duration);
    durationLabel.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    durationLabel.hidden = false;
  }

  function syncPlayback() {
    const showCover = !hasError && (!hasStarted || video.ended);
    playButton.hidden = !showCover;
    video.controls = !showCover;
    video.tabIndex = showCover ? -1 : 0;
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
    hasStarted = true;
    hasError = false;
    errorMessage.hidden = true;
    syncPlayback();
  });
  video.addEventListener('pause', syncPlayback);
  video.addEventListener('ended', syncPlayback);
  const showError = () => {
    hasError = true;
    syncPlayback();
    errorMessage.hidden = false;
  };
  video.addEventListener('error', showError);
  video.querySelector('source').addEventListener('error', showError);
  video.addEventListener('loadedmetadata', syncDuration);
  syncDuration();
  if (video.error) return showError();
  syncPlayback();
}

document.querySelectorAll('[data-demo-player]').forEach(mountDemoPlayer);
