const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [];

// API Call to get random words
async function getDem() {
	const res = await fetch('https://random-words-api.vercel.app/word');
	let data = await res.json();
	let word = data[0].word;

	return word;
}

// Push fetched words to the words array;
const getWords = async function (count) {
	for (let i = 0; i < count; i++) {
		let fetched = await getDem();
		words.push(fetched);
	}
};

getWords(50);

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in localStorage or medium
let difficulty =
	localStorage.getItem('difficulty') !== null
		? localStorage.getItem('difficulty')
		: 'medium';

// Set difficulty select value
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word
async function getRandomWord() {
	let promisedWord = await new Promise((resolve, reject) => {
		setTimeout(() => {
			let word;
			word = words[Math.floor(Math.random() * words.length)];
			resolve(word);
		}, 900);
	});
	return promisedWord;
}

// Add random word to DOM
async function addWordToDOM() {
	randomWord = await getRandomWord();
	word.innerHTML = randomWord;
}

// Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}
addWordToDOM();

// Update time
function updateTime() {
	time--;
	timeEl.innerHTML = time + 's';
	if (time === 0) {
		clearInterval(timeInterval);
		// End Game
		gameOver();
	}
}

// Game over, show end screen
function gameOver() {
	endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="window.location.reload()">Play again</button>
    `;

	endGameEl.style.display = 'flex';
}

// Event Listeners

// Typing
text.addEventListener('input', ev => {
	let insertedText = ev.target.value;
	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();
		text.value = '';

		if (difficulty === 'easy') {
			time += 10;
		} else if (difficulty === 'medium') {
			time += 6;
		} else {
			time += 4;
		}
		updateTime();
	}
	// console.log(insertedText);
});

// Settings button click

settingsBtn.addEventListener('click', () => {
	settings.classList.toggle('hide');
});

// Settings select
settingsForm.addEventListener('change', ev => {
	difficulty = ev.target.value;
	localStorage.setItem('difficulty', difficulty);
});
