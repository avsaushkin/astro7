let swiperinit = false;
let mobileswiper;

function swiperOn() {
    if (window.innerWidth <= 767 && !swiperinit) {
        // Добавляем .swiper-wrapper, если его ещё нет
        if (!$('.mslider').find('.swiper-wrapper').length) {
            $('.mslider').wrapInner('<div class="swiper-wrapper"></div>');
        }
        
        // Добавляем пагинацию, если её ещё нет
        if (!$('.mslider').find('.swiper-pagination').length) {
            $('.mslider').append('<div class="swiper-pagination"></div>');
        }

        // Инициализируем Swiper
        mobileswiper = new Swiper('.mslider', {
            slideClass: 'mslide',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true, // Бесконечный режим
            spaceBetween: 10, // Отступ между слайдами
            breakpoints: {
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 }
            }
        });

        swiperinit = true;
    } else if (window.innerWidth > 767 && swiperinit) {
        // Уничтожаем Swiper, если он был создан
        if (mobileswiper) {
            mobileswiper.destroy(true, true);
        }
        swiperinit = false;

        // Корректно убираем обертку swiper-wrapper и пагинацию
        $('.mslider .swiper-wrapper').replaceWith($('.mslider .swiper-wrapper').html());
        $('.mslider .swiper-pagination').remove();
    }
}

// Запускаем функцию при загрузке страницы
swiperOn();

// Оптимизированный обработчик resize
let resizeTimer;
$(window).resize(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(swiperOn, 200);
});