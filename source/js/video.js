//  Модуль для работы с видео

const initVideo = () => {
  const videoContainer = document.querySelector('.video');
  const playButton = document.querySelector('.video__play-button');
  const videoIframe = document.querySelector('.video__iframe');

  if (videoContainer && playButton && videoIframe) {
    const videoSrc = videoContainer.dataset.src + '?autoplay=1';

    playButton.addEventListener('click', () => {
      if (videoContainer.classList.contains('video--loaded')) {
        return;
      }

      videoIframe.src = videoSrc;
      videoContainer.classList.add('video--loaded');
    });
  }
};

export { initVideo };
