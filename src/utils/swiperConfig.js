import {  Pagination, Navigation, Keyboard, Scrollbar } from "swiper";

const swiperConfig = {
  slidesPerView: "auto",
  centeredSlides: false,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: true,
  grabCursor: true,
  keyboard: { enabled: true },
  scrollbar: true,
  navigation: true,
  modules: [Keyboard, Scrollbar, Navigation, Pagination],
  spaceBetween: 5,
  // cssMode:true,
  className: "mySwiper",
};

export default swiperConfig;
