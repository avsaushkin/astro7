// Звуковые сообщения
$(document).ready(function() {
    $(".audio-message").each(function() {
        const $player = $(this);
        const $audio = $player.find("audio");
        const $waveform = $player.find(".waveform");
        const $timeDisplay = $player.find(".time");
        const $playButton = $player.find(".play-button");
        const $playIcon = $playButton.find(".play-icon");
        const $pauseIcon = $playButton.find(".pause-icon");

        // Создание волн
        function createBars() {
            $waveform.empty();
            const heights = [36, 34, 24, 16, 34, 30, 36, 28, 20, 14, 20, 36, 34, 24, 26, 34, 30, 36, 28, 20, 30, 20, 12, 20, 28, 36, 30, 36, 26, 24, 34, 36, 34, 30];
            
            $.each(heights, function(index, height) {
                $('<div>').addClass('bar')
                          .css('height', height + 'px')
                          .appendTo($waveform);
            });
        }
        createBars();

        // Обновление анимации волн и времени
        function updateWaveform() {
            const $bars = $waveform.find(".bar");
            const progress = $audio[0].currentTime / $audio[0].duration;
            const activeBars = Math.floor($bars.length * progress);
            
            $bars.each(function(index) {
                $(this).css('opacity', index < activeBars ? '1' : '0.3');
            });

            const minutes = Math.floor($audio[0].currentTime / 60);
            let seconds = Math.floor($audio[0].currentTime % 60);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            $timeDisplay.text(minutes + ':' + seconds);
        }

        // Воспроизведение / Пауза
        function toggleAudio() {
            if ($audio[0].paused) {
                $audio[0].play();
                $playIcon.hide();
                $pauseIcon.show();
            } else {
                $audio[0].pause();
                $playIcon.show();
                $pauseIcon.hide();
            }
        }

        // Событие завершения аудио
        $audio.on("ended", function() {
            $playIcon.show();
            $pauseIcon.hide();
        });

        // Назначение событий
        $audio.on("timeupdate", updateWaveform);
        $playButton.on("click", toggleAudio);
    });

    $('.consultation-cards').slick({
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              variableWidth: true
            }
          }
        ]
      });

      $('.tarot-cards').slick({
        dots: true,
        infinite: false,
        speed: 300,
        arrows: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerMode: true,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
        ]
      });
});