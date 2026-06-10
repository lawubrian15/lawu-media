let activeVideo: HTMLVideoElement | null = null;

export function requestPlay(video: HTMLVideoElement): Promise<void> {
  if (activeVideo && activeVideo !== video && !activeVideo.paused) {
    activeVideo.pause();
  }
  activeVideo = video;
  return video.play().catch((err) => {
    if (activeVideo === video) activeVideo = null;
    throw err;
  });
}

export function pauseVideo(video: HTMLVideoElement) {
  video.pause();
  if (activeVideo === video) activeVideo = null;
}

export function releaseVideo(video: HTMLVideoElement) {
  if (activeVideo === video) activeVideo = null;
}
