const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay () {
    video.paused ? video.play() : video.pause();
}

function playPause () {
    toggle.textContent === '►' ? toggle.textContent = '❚ ❚' : toggle.textContent = '►';
}

function skip () {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate () {
    video[this.name] = this.value;
}

function progressBarFunc () {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let mousedown = false;

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', playPause);
video.addEventListener('pause', playPause);

skipButtons.forEach(element => {
    element.addEventListener('click', skip);
});

ranges.forEach(element => element.addEventListener('change', rangeUpdate));

video.addEventListener('timeupdate', progressBarFunc);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousdown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
