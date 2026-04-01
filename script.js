const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
const video = document.querySelector(".viewer");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player__slider");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

// ▶️ Play / Pause
function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

// Update button icon
function updateButton() {
	toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// ⏩ Skip
function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

// 🔊 Volume & Speed
function handleRangeUpdate() {
	video[this.name] = this.value;
}

// 📊 Progress bar update
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

// 🎯 Click to seek
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(btn => btn.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

video.addEventListener("timeupdate", handleProgress);

progress.addEventListener("click", scrub);