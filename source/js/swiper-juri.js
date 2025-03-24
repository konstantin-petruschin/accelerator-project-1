import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';


export const initJuriSlider = () => {
  const swiper = new Swiper('.juri__swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    watchOverflow: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1366: {
        slidesPerView: 4,
      },
    },
  });
};
