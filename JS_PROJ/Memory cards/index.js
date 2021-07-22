const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = [
	{
		question: 'Where am I?',
		answer: 'Earth',
	},
	{
		question: 'What is a variable?',
		answer: 'A container for a piece of data',
	},
	{
		question: 'Example of a camel case naming convention?',
		answer: 'getKeysFromDatabase',
	},
];

// Create all cards

function createCards() {
	cardsData.forEach((data, index) => createCard(data, index));
}

// Create card
function createCard(data, index) {
	const card = document.createElement('div');
	card.classList.add('card');
	if (index === 0) card.classList.add('active');

	card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>
                ${data.answer}
            </p>
        </div>
    </div>
    `;

	card.addEventListener('click', () => {
		card.classList.toggle('show-answer');
	});
	// Add to DOM cards
	cardsEl.push(card);
	cardsContainer.appendChild(card);
	updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
	currentEl.innerText = ` ${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards();

// Event listeners
nextBtn.addEventListener('click', () => {
	cardsEl[currentActiveCard].className = 'card left';

	currentActiveCard += 1;
	const lastEl = cardsEl.length - 1;
	if (currentActiveCard > lastEl) currentActiveCard = lastEl;

	cardsEl[currentActiveCard].className = 'card active';

	updateCurrentText();
});

prevBtn.addEventListener('click', () => {
	cardsEl[currentActiveCard].className = 'card right';

	currentActiveCard -= 1;
	const firstEl = 0;
	if (currentActiveCard < firstEl) currentActiveCard = firstEl;

	cardsEl[currentActiveCard].className = 'card active';

	updateCurrentText();
});
