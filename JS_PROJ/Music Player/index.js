const musicContainer = document.getElementById('music-container');

// Buttons
const playBtn = document.getElementById('play'),
	prevBtn = document.getElementById('prev'),
	nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keeping the track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
}

// Pause song
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');

	audio.pause();
}

// Previous song
function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}

// Previous song
function nextSong() {
	songIndex++;

	if (songIndex >= songs.length) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}

// update progress bars
function updateProgress(ev) {
	const { currentTime, duration } = ev.srcElement;
	const progressPercent = (currentTime / duration) * 100;

	progress.style.width = progressPercent + '%';
}

// Set progress bar
function setProgress(ev) {
	const width = this.clientWidth;
	const clickX = ev.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update Event
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
