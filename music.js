// Musik latar dari YouTube. Browser memblokir autoplay, jadi mulai di sentuhan pertama.
(function () {
  const url = (window.CONFIG && window.CONFIG.MUSIK_URL) || "";
  const btn = document.querySelector("#btn-music");
  if (!url || !btn) return;

  function videoId(u) {
    const m = u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : /^[\w-]{11}$/.test(u) ? u : null;
  }
  const id = videoId(url.trim());
  if (!id) {
    console.warn("MUSIK_URL bukan link YouTube yang valid.");
    return;
  }

  let player = null;
  let ready = false;
  let wantPlay = false; // sudah diminta main sebelum player siap
  let muted = false;

  btn.hidden = false;

  function setIcon() {
    btn.textContent = muted || !started ? "🔇" : "🎵";
    btn.classList.toggle("playing", started && !muted);
    btn.setAttribute("aria-label", muted || !started ? "nyalakan musik" : "matikan musik");
  }

  let started = false;

  function start() {
    if (started) return;
    started = true;
    muted = false;
    if (ready) player.playVideo();
    else wantPlay = true;
    setIcon();
  }

  // Tap pertama di mana saja = mulai musik
  const firstTap = () => {
    window.removeEventListener("pointerdown", firstTap, true);
    if (!started) start();
  };
  window.addEventListener("pointerdown", firstTap, true);

  btn.addEventListener("click", () => {
    if (!started) return start();
    muted = !muted;
    if (ready) muted ? player.pauseVideo() : player.playVideo();
    setIcon();
  });

  // Muat YouTube IFrame API
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("yt-player", {
      width: "200",
      height: "200",
      videoId: id,
      playerVars: { autoplay: 0, controls: 0, playsinline: 1, loop: 1, playlist: id, rel: 0 },
      events: {
        onReady() {
          ready = true;
          player.setVolume(60);
          if (wantPlay && !muted) player.playVideo();
        },
        onStateChange(e) {
          if (e.data === YT.PlayerState.ENDED) player.playVideo();
        },
      },
    });
  };
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  setIcon();
})();
