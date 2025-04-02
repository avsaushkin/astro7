document.querySelectorAll(".audio-message").forEach(player => {
    const audio = player.querySelector("audio");
    const waveform = player.querySelector(".waveform");
    const timeDisplay = player.querySelector(".time");
    const playButton = player.querySelector(".play-button");
    const playIcon = playButton.querySelector(".play-icon");
    const pauseIcon = playButton.querySelector(".pause-icon");

    // Создание волн
    function createBars() {
        waveform.innerHTML = "";
        const heights = [36, 34, 24, 16, 34, 30, 36, 28, 20, 14, 20, 36, 34, 24, 26, 34, 30, 36, 28, 20, 30, 20, 12, 20, 28, 36, 30, 36, 26, 24, 34, 36, 34, 30];
        heights.forEach(height => {
            let bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${height}px`;
            waveform.appendChild(bar);
        });
    }
    createBars();

    // Обновление анимации волн и времени
    function updateWaveform() {
        let bars = waveform.querySelectorAll(".bar");
        let progress = audio.currentTime / audio.duration;
        let activeBars = Math.floor(bars.length * progress);
        bars.forEach((bar, index) => {
            bar.style.opacity = index < activeBars ? "1" : "0.3";
        });

        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Воспроизведение / Пауза
    function toggleAudio() {
        if (audio.paused) {
            audio.play();
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
        } else {
            audio.pause();
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
        }
    }

    // Событие завершения аудио — возвращаем кнопку в состояние Play
    audio.addEventListener("ended", () => {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    });

    // События
    audio.addEventListener("timeupdate", updateWaveform);
    playButton.addEventListener("click", toggleAudio);
});
