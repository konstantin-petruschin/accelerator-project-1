// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

import { initVideo } from './video.js';
import { initPriceTabs } from './price-tabs.js';
import { initJuriSlider } from './swiper-juri.js';
import { initFaqTabsAccordions } from './faq-tabs-accordions.js';

initVideo(); // Инициализация видео
initPriceTabs(); // Инициализация табов в секции "Абонементы"
initJuriSlider(); // Инициализация слайдера в секции "Жюри"
initFaqTabsAccordions(); // Инициализация табов и аккордеонов в секции "FAQ"
