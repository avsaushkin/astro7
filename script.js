document.querySelectorAll(".audio-message").forEach(player => {
    const audio = player.querySelector("audio");
    const waveform = player.querySelector(".waveform");
    const timeDisplay = player.querySelector(".time");
    const playButton = player.querySelector(".play-button");

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

    function toggleAudio() {
        if (audio.paused) {
            audio.play();
            playButton.style.background = "#4caf50";
        } else {
            audio.pause();
            playButton.style.background = "#f55e5e";
        }
    }

    audio.addEventListener("timeupdate", updateWaveform);
    playButton.addEventListener("click", toggleAudio);
});


