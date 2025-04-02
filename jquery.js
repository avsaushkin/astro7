let swiperinit = false;
let mobileswiper;

function swiperOn() {
    const screenWidth = window.innerWidth;
    const mslider = $('.mslider');

    if (screenWidth <= 767 && !swiperinit) {
        // Убедиться, что обертка swiper-wrapper добавляется только один раз
        if (!mslider.find('.swiper-wrapper').length) {
            mslider.wrapInner('<div class="swiper-wrapper"></div>');
        }

        // Убедиться, что пагинация добавляется только один раз
        if (!mslider.find('.swiper-pagination').length) {
            mslider.append('<div class="swiper-pagination"></div>');
        }

        // Инициализируем Swiper
        mobileswiper = new Swiper('.mslider', {
            slideClass: 'mslide',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            spaceBetween: 10,
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 }
            }
        });

        swiperinit = true;
    } else if (screenWidth > 767 && swiperinit) {
        // Уничтожаем Swiper
        if (mobileswiper) {
            mobileswiper.destroy(true, true);
            mobileswiper = null;
        }

        // Восстановление HTML к изначальному виду, удаляя обертку и пагинацию
        mslider.find('.swiper-wrapper').contents().unwrap();  // берет содержимое .swiper-wrapper и удаляет саму обертку
        mslider.find('.swiper-pagination').remove();

        swiperinit = false;
    }
}

// Запускаем функцию при загрузке страницы
$(document).ready(function(){
    swiperOn();
    $(window).resize(debounce(swiperOn, 200));
});

// Функция debounce, чтобы минимизировать количество вызовов функции resize
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}