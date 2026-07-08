import { El } from '../../utils/el';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { router } from '../../utils/router';

export function OnBoarding() {

  const slide1 = El({
    element: "div",
    classList: "swiper-slide",
    children: [
      El({
        element: "div",
        className: "w-full h-screen flex items-center justify-center relative",
        children: [
          El({
            element: "img",
            src: "/images/shoea.png",
            className: "w-58"
          }),
          El({
            element: "div",
            className: "animate-spin rounded-full h-12 w-12 border-4 border-transparent border-b-black border-r-black absolute bottom-20"
          })
        ]
      }),
    ]
  });

  const slide2 = El({
    element: "div",
    className: "swiper-slide bg-[url(/images/Wallpaperfirst.png)] bg-no-repeat bg-cover bg-center h-screen relative",
    children: [
      El({
        element: "div",
        className: "absolute inset-0 bg-black/40"
      }),
      El({
        element: "div",
        className: "flex flex-col justify-start gap-5 p-2 absolute bottom-25 left-5",
        children: [
          El({
            element: "div",
            className: "flex gap-5",
            children: [
              El({
                element: "h3",
                className: "font-bold text-white text-4xl",
                innerText: "Welcome to"
              }),
              El({
                element: "img",
                src: "./images/hi.png"
              })
            ]
          }),
          El({
            element: "h1",
            className: "text-7xl text-white font-bold ",
            innerText: "Shoea"
          }),
          El({
            element: "p",
            className: "text-white font-semibold text-xl",
            innerText: "The best sneakers & shoes e-commerse app of the century for your fashion needs!"
          })
        ]
      })
    ]
  });

  const slide3 = El({
    element: "div",
    className: "swiper-slide flex flex-col items-center gap-2",
    children: [
      El({
        element: "div",
        className: "bg-[url(/images/Wallpaper1.png)] bg-no-repeat bg-cover bg-center w-full h-[70%]",
      }),
      El({
        element: "div",
        className: "flex flex-col p-5 gap-5",
        children: [
          El({
            element: "h5",
            className: "font-semibold text-3xl text-center",
            innerText: "We provide high quality products just for you"
          })
        ]
      })
    ]
  });

  const slide4 = El({
    element: "div",
    className: "swiper-slide flex flex-col items-center gap-2",
    children: [
      El({
        element: "div",
        className: "bg-[url(/images/Wallpaper2.png)] bg-no-repeat bg-cover bg-center w-full h-[70%]",
      }),
      El({
        element: "div",
        className: "flex flex-col p-5 gap-5",
        children: [
          El({
            element: "h5",
            className: "font-semibold text-3xl text-center",
            innerText: `Your satisfaction is our
                     number one priority`
          })
        ]
      })
    ]
  });

  const slide5 = El({
    element: "div",
    className: "swiper-slide flex flex-col items-center gap-2",
    children: [
      El({
        element: "div",
        className: "bg-[url(/images/Wallpaper3.png)] bg-no-repeat bg-cover bg-center w-full h-[70%]",
      }),
      El({
        element: "div",
        className: "flex flex-col p-5 gap-5",
        children: [
          El({
            element: "h5",
            className: "font-semibold text-3xl text-center",
            innerText: `Let’s fulfill your fashion 
                    needs with shoearight now!`
          })
        ]
      })
    ]
  });

  const paginationBox = El({
    element: "div",
    className: "absolute bottom-30 left-1/2 -translate-x-1/2 flex gap-2 hidden pagination-box !z-10",
    children: [
      El({
        element: "span",
        className: "paginate-bullet w-15 h-1 bg-black rounded-full transition-all duration-500 opacity-100",
        eventListener: [
          {
            event: "click",
            callback: () => {
              const distance = Math.abs(swiper.activeIndex - 2);
              if (distance === 1) swiper.slideTo(2);
            }
          }
        ]
      }),
      El({
        element: "span",
        className: "paginate-bullet w-15 h-1 bg-black rounded-full transition-all duration-500 opacity-30",
        eventListener: [
          {
            event: "click",
            callback: () => {
              const distance = Math.abs(swiper.activeIndex - 3);
              if (distance === 1) swiper.slideTo(3);
            }
          }
        ]
      }),
      El({
        element: "span",
        className: "paginate-bullet w-15 h-1 bg-black rounded-full transition-all duration-500 opacity-30",
        eventListener: [
          {
            event: "click",
            callback: () => {
              const distance = Math.abs(swiper.activeIndex - 4);
              if (distance === 1) swiper.slideTo(4);
            }
          }
        ]
      }),
    ]
  });

  const nextBtn = El({
    element: "div",
    className: "next-btn bg-black text-white text-center rounded-full w-[calc(100%-2.5rem)] absolute bottom-5 left-5 p-2 !z-10 hover:cursor-pointer hidden",
    innerText: "Next",
    eventListener: [
      {
        event: "click",
        callback: (e) => {
          if (swiper) {
            if (swiper.isEnd) {
              router.navigate("/login");
            }
            else {
              if (swiper.slideNext === swiper.isEnd) e.target.innerText = "Get Start"
              swiper.slideNext();
            }
          }
        }
      }
    ]
  });

  const swiperContainer = El({
    element: "div",
    className: "swiper h-screen w-full",
    children: [
      El({
        element: "div",
        className: "swiper-wrapper",
        children: [
          slide1,
          slide2,
          slide3,
          slide4,
          slide5
        ]
      }),
      paginationBox,
      nextBtn
    ]
  });

  const swiper = new Swiper(swiperContainer, {
    modules: [Navigation, Pagination, Autoplay],
    speed: 500,
    allowTouchMove: true,
    resistance: true,
    resistanceRatio: 0,
    longSwipes: false,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    on: {
      slideChange: function () {
        const nextBtn = swiperContainer.querySelector('.next-btn');
        const paginationBox = swiperContainer.querySelector('.pagination-box');
        const index = this.activeIndex;

        if (nextBtn) {
          if (this.isEnd) {
            nextBtn.innerText = "Get Started"
          }
          else {
            nextBtn.innerText = "Next"
          }
        }

        // lock return to previous pages
        if (index < 2 && !this.autoplay.running) {
          this.slideTo(2, 0);
          return;
        }

        if (index < 2) {
          if (nextBtn) nextBtn.classList.add('hidden');
          if (paginationBox) paginationBox.classList.add('hidden');

          if (index === 0) {
            this.params.autoplay.delay = 3000;
            this.autoplay.start();
          }

          if (index === 1) {
            this.params.autoplay.delay = 5000;
            this.autoplay.start();
          }

        }
        else {
          this.autoplay.stop();
          if (nextBtn) nextBtn.classList.remove('hidden');
          if (paginationBox) paginationBox.classList.remove('hidden');

          const bullets = paginationBox.querySelectorAll('.paginate-bullet');
          const bulletIndex = index - 2;

          bullets.forEach((bullet, bIndex) => {
            if (bIndex === bulletIndex) {
              //active bullet
              bullet.classList.replace('opacity-30', 'opacity-100');
            } else {
              //deactive bullet
              bullet.classList.replace('opacity-100', 'opacity-30');
            }

          })
        }
      }
    }
  });

  return swiperContainer
}

