const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
	{
		image: './img/drink.jpg',
		text: "I'm Thirsty",
	},
	{
		image: './img/food.jpg',
		text: "I'm Hungry",
	},
	{
		image: './img/hurt.jpg',
		text: "I'm Hurt",
	},
	{
		image: './img/tired.jpg',
		text: "I'm tired",
	},
	{
		image: './img/happy.jpg',
		text: "I'm Happy",
	},
	{
		image: './img/angry.jpg',
		text: "I'm angry",
	},
	{
		image: './img/sad.jpg',
		text: "I'm Sad",
	},
	{
		image: './img/scared.jpg',
		text: "I'm Scared",
	},
	{
		image: './img/outside.jpg',
		text: 'I Want to Go Outside',
	},
	{
		image: './img/home.jpg',
		text: 'I Want To Go Home',
	},
	{
		image: './img/school.jpg',
		text: 'I Want To Go To School',
	},
	{
		image: './img/grandma.jpg',
		text: 'I Want To Go To Grandmas',
	},
];

data.forEach(createBox);

// create speech boxes

function createBox(item) {
	const box = document.createElement('div');

	const { image, text } = item;

	box.classList.add('box');
	box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

	box.addEventListener('click', () => {
		setTextMessage(text);
		speakText();

		// Add active class
		box.classList.add('active');
		setTimeout(() => box.classList.remove('active'), 800);
	});

	main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
	let id;
	let speech = speechSynthesis;
	id = setInterval(() => {
		voices = speech.getVoices();
		if (voices.length !== 0) {
			clearInterval(id);
			addVoice();
		}
	}, 10);
}

// Add voices to the DOM
function addVoice() {
	voices.forEach(voice => {
		const option = document.createElement('option');

		option.value = voice.name;
		option.innerText = `${voice.name} ${voice.lang}`;

		voicesSelect.appendChild(option);
	});
}

// Set Text
function setTextMessage(text) {
	message.text = text;
}

// Speak text
function speakText() {
	speechSynthesis.speak(message);
}

// Set voice
function setVoice(ev) {
	message.voice = voices.find(voice => voice.name === ev.target.value);
}

// Event Listeners

// Toggle text box
toggleBtn.addEventListener('click', () =>
	document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
	document.getElementById('text-box').classList.remove('show')
);

speechSynthesis.addEventListener('voiceschanged', getVoices);

// Read Text Button
readBtn.addEventListener('click', () => {
	setTextMessage(textarea.value);
	speakText();
});
// Change voice
voicesSelect.addEventListener('change', setVoice);
getVoices();
