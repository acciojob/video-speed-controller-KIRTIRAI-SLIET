// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
// const video = document.querySelector(".viewer");
// const toggle = document.querySelector(".toggle");
// const skipButtons = document.querySelectorAll("[data-skip]");
// const ranges = document.querySelectorAll(".player__slider");
// const progress = document.querySelector(".progress");
// const progressBar = document.querySelector(".progress__filled");

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".player__video");
	const toggle = document.querySelector(".toggle");
	const skipButtons = document.querySelectorAll("[data-skip]");
	const ranges = document.querySelectorAll(".player__slider");
	const progress = document.querySelector(".progress");
	const progressBar = document.querySelector(".progress__filled");

	if (!video || !toggle || !progress || !progressBar) return;

	function togglePlay() {
		video.paused ? video.play() : video.pause();
	}

	function updateButton() {
		toggle.textContent = video.paused ? "►" : "❚ ❚";
	}

	function skip() {
		video.currentTime += parseFloat(this.dataset.skip);
	}

	function handleRangeUpdate() {
		video[this.name] = this.value;
	}

	function handleProgress() {
		const percent = (video.currentTime / video.duration) * 100;
		progressBar.style.flexBasis = `${percent}%`;
	}

	function scrub(e) {
		const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
		video.currentTime = scrubTime;
	}

	video.addEventListener("click", togglePlay);
	video.addEventListener("play", updateButton);
	video.addEventListener("pause", updateButton);

	toggle.addEventListener("click", togglePlay);

	skipButtons.forEach(btn => btn.addEventListener("click", skip));

	ranges.forEach(range => {
		range.addEventListener("change", handleRangeUpdate);
		range.addEventListener("mousemove", handleRangeUpdate);
	});

	video.addEventListener("timeupdate", handleProgress);

	progress.addEventListener("click", scrub);
});