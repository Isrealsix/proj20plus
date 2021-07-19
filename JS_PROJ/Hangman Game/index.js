const wordEl = document.getElementById('word');
const wrongLettersEl = document.querySelector('.wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

let words = ['application', 'programming', 'interface', 'wizard'];
const correctLetters = [];
const wrongLetters = [];

const selectRandomWord = () => words[Math.floor(Math.random() * words.length)];
let selectedWord = selectRandomWord();
console.log(selectedWord);
const displayWord = () => {
	wordEl.innerHTML = `
        ${selectedWord
					.split('')
					.map(
						letter =>
							`<span class="letter">${
								correctLetters.includes(letter) ? letter : ''
							}</span>`
					)
					.join('')}
    `;
	const innerWord = wordEl.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = "Congratulations, you've won 💪";
		popup.style.display = 'flex';
	}
};

const updateWrongLetterEl = () => {
	// Display errors
	wrongLettersEl.innerHTML = `
	    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
	    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// Check if lost

	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = `Sorry, you have failed 😢`;
		popup.style.display = 'flex';
	}
};

const showNotification = () => {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
};

// Keydown events
window.addEventListener('keydown', e => {
	const keyCode = e.keyCode;
	const letter = e.key;
	if (keyCode < 65 || keyCode > 90) return;
	if (selectedWord.includes(letter)) {
		if (!correctLetters.includes(letter)) {
			correctLetters.push(letter);

			displayWord();
		} else {
			showNotification();
		}
	} else {
		if (!wrongLetters.includes(letter)) {
			wrongLetters.push(letter);
			updateWrongLetterEl();
		} else {
			showNotification();
		}
	}
});

playAgainBtn.addEventListener('click', () => {
	wrongLetters.splice(0);
	correctLetters.length = 0;

	selectedWord = selectRandomWord();

	displayWord();
	updateWrongLetterEl();

	popup.style.display = 'none';
});

displayWord();
