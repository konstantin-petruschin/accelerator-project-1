import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';


export const initReviewsSlider = () => {
  const swiper = new Swiper('.reviews-swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 40,
    watchOverflow: true,
    simulateTouch: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};
