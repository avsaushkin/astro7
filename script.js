// Звуковые сообщения
// Звуковые сообщения
$(document).ready(function() {
  let currentlyPlayingAudio = null; // Переменная для хранения текущего воспроизводимого аудио

  $(".audio-message").each(function() {
      const $player = $(this);
      const $audio = $player.find("audio")[0]; // Получаем DOM-элемент audio
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
          const progress = $audio.currentTime / $audio.duration;
          const activeBars = Math.floor($bars.length * progress);
          
          $bars.each(function(index) {
              $(this).css('opacity', index < activeBars ? '1' : '0.3');
          });

          const minutes = Math.floor($audio.currentTime / 60);
          let seconds = Math.floor($audio.currentTime % 60);
          seconds = seconds < 10 ? '0' + seconds : seconds;
          $timeDisplay.text(minutes + ':' + seconds);
      }

      // Воспроизведение / Пауза
      function toggleAudio() {
          // Если есть другое воспроизводимое аудио, останавливаем его
          if (currentlyPlayingAudio && currentlyPlayingAudio !== $audio) {
              currentlyPlayingAudio.pause();
              currentlyPlayingAudio.currentTime = 0;
              // Находим соответствующие элементы для предыдущего аудио и обновляем их
              const prevPlayer = $(currentlyPlayingAudio).closest('.audio-message');
              prevPlayer.find('.play-icon').show();
              prevPlayer.find('.pause-icon').hide();
          }

          if ($audio.paused) {
              $audio.play();
              currentlyPlayingAudio = $audio;
              $playIcon.hide();
              $pauseIcon.show();
          } else {
              $audio.pause();
              currentlyPlayingAudio = null;
              $playIcon.show();
              $pauseIcon.hide();
          }
      }

      // Событие завершения аудио
      $audio.addEventListener("ended", function() {
          currentlyPlayingAudio = null;
          $playIcon.show();
          $pauseIcon.hide();
      });

      // Назначение событий
      $audio.addEventListener("timeupdate", updateWaveform);
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