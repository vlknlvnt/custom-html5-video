/* Getting our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playerButton = document.querySelector('.player__button');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const body = document.getElementById('body');
const fullScreen = document.querySelector('.full_screen_btn');
const playerVideo = document.querySelector('.player__video');

/* Build our functions */
function togglePlay () {
    console.log('toggle play clicked');
    // paused, play and pause are each methods so we can call them
    if (video.paused) {
        video.play();
        playerButton.innerHTML = ('❚❚');
    } else {
        video.pause();
        playerButton.innerHTML = ('►');

    }
}

function skip () {
    console.log('skip btn');
    console.log(this.dataset.skip); // we can reach data set of the element
    video.currentTime += parseFloat(this.dataset.skip); // we apply the number in dataset to currentTime of video
    console.log(video.currentTime);
}

function handleRangeUpdate () {
    console.log(this.name);
    console.log(this.value);
    video[this.name] = this.value; // in here, we implemented values in progress bars to the values of video
}

function handleProgress () {
    const percent = (video.currentTime / video.duration * 100);
    progressBar.style.flexBasis = `${percent}%`; // flexBasis value changes every time timeupdate event triggers due to percent
    console.log(percent);
}

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth * video.duration);
    video.currentTime = scrubTime;
    console.log(progress.offsetX);
    console.log(progress.offsetWidth);
    console.log(scrubTime)
}

function fullScreenToggle () {
    player.classList.toggle('full');
    body.classList.toggle('black');
    playerVideo.classList.toggle('video_full');
    console.log('full screen toggle');
}



/* Hook the event listeners */
/* this two events toggle play/pause of video */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', handleProgress); // we used timeupdate method here

skipButtons.forEach(button => button.addEventListener('click', skip)); // skip buttons are selected
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); // we used change event on range items

progress.addEventListener('click', scrub);

fullScreen.addEventListener('click', fullScreenToggle);

// source: https://courses.wesbos.com/account/access/60424481b730de59f5dda2f5/view/194129583