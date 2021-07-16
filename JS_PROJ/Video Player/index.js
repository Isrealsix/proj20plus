const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play / pause video
const toggleVideoStatus = () => {
	if (video.paused) return video.play();
	video.pause();
};

// Update play / pause Icon
const updatePlayIcon = () => {
	const updatedBtn = video.paused
		? '<i class="fa fa-play fa-2x"></i>'
		: '<i class="fa fa-pause fa-2x"></i>';
	play.innerHTML = updatedBtn;
};

// Update progress and timestamp
const updateProgress = () => {
	progress.value = (video.currentTime / video.duration) * 100;

	// Get Minutes
	let mins = Math.floor(video.currentTime / 60);
	if (mins < 10) mins = '0' + String(mins);

	// Get seconds
	let secs = Math.floor(video.currentTime % 60);
	if (secs < 10) secs = '0' + String(secs);

	timestamp.innerHTML = `${mins}:${secs}`;
};

// Set video progress position
const setVideoProgress = () => {
	video.currentTime = (+progress.value * video.duration) / 100;
};

// Stop video
const stopVideo = () => {
	video.currentTime = 0;
	video.pause();
};

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);

updateProgress();
