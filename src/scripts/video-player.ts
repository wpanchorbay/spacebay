/**
 * Upgrades the docs videos to the Plyr player (about 33 KB gzipped).
 * The plain <video controls> markup stays as the no-JavaScript fallback, and
 * Plyr is only downloaded on pages that have a video.
 * @since 1.0.0
 */
const SELECTOR = ".sl-markdown-content .sb-video video";

async function init() {
  const videos = Array.from(
    document.querySelectorAll<HTMLVideoElement>(SELECTOR),
  ).filter((v) => !v.dataset.plyrReady);
  if (!videos.length) return;

  const [{ default: Plyr }, { default: iconUrl }] = await Promise.all([
    import("plyr"),
    import("plyr-dist/plyr.svg?url"),
    import("plyr-dist/plyr.css"),
  ]);

  for (const video of videos) {
    video.dataset.plyrReady = "true";
    new Plyr(video, {
      iconUrl,
      loadSprite: true,
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      settings: ["speed"],
      speed: { selected: 1, options: [0.75, 1, 1.25, 1.5, 2] },
      ratio: "16:9",
      tooltips: { controls: false, seek: true },
      keyboard: { focused: true, global: false },
      invertTime: false,
      clickToPlay: true,
      hideControls: true,
    });
  }
}

init();
