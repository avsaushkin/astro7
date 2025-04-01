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
        // Уничтожаем Swiper, если он уже был создан
        mobileswiper.destroy(true, true);
        swiperinit = false;

        // Убираем обертку swiper-wrapper и пагинацию
        $('.mslider .swiper-wrapper').contents().unwrap();
        $('.mslider .swiper-pagination').remove();
    }
}

// Запускаем функцию при загрузке страницы и изменении размера окна
swiperOn();
$(window).resize(swiperOn);