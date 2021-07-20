const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const fakeTransactions = [
	{ id: 1, text: 'Flower', amount: -20 },
	{ id: 2, text: 'Salary', amount: 300 },
	{ id: 3, text: 'Book', amount: -10 },
	{ id: 4, text: 'Camera', amount: 150 },
];

const localStorageTransactions = JSON.parse(
	localStorage.getItem('transactions')
);

// let transaction = fakeTransactions;

let transaction =
	localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add transaction
const addTransaction = function (ev) {
	ev.preventDefault();

	// Guard clause
	if (!text.value || !amount.value)
		return alert('Please enter text and amount');

	const tranx = {
		id: generateID(),
		text: text.value,
		amount: +amount.value,
	};

	transaction.push(tranx);
	addTransactionDOM(tranx);
	updateValues();
	updateLocalStorage();
	clearFields();
	console.log(tranx);
};

const clearFields = function () {
	text.value = '';
	amount.value = '';
};

const generateID = function () {
	if (transaction.length < 1) return 1;
	return transaction[transaction.length - 1].id * 4;
};

// console.log(generateID());

// Add transactions to DOM list
function addTransactionDOM(transaction) {
	// Get sign
	let sign = transaction.amount < 0 ? '-' : '+';

	const item = document.createElement('li');

	// add class based on value
	item.classList.add(sign == '+' ? 'plus' : 'minus');

	item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
		transaction.amount
	)}</span> <button class="delete-btn" data-transactionID="${
		transaction.id
	}">x</button>
    `;

	list.appendChild(item);
}

// Update balance, income and expense
const updateValues = function () {
	let amounts = transaction.map(transaction => transaction.amount);

	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	const income = amounts
		.filter(item => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	const expense = amounts
		.filter(item => item < 0)
		.reduce((acc, item) => (acc += Math.abs(item)), 0)
		.toFixed(2);

	balance.innerText = `$${total}`;
	moneyPlus.innerText = `$${income}`;
	moneyMinus.innerText = `$${expense}`;

	console.log(total, income);
};

// Delete transaction
const deleteTransaction = function (ev) {
	const deleteBtn = ev.target.closest('.delete-btn');
	if (!deleteBtn) return;
	const transactionID = +deleteBtn.dataset.transactionid;

	transaction = transaction.filter(trnx => trnx.id !== transactionID);

	updateLocalStorage();

	init();
};
// Init app
const init = () => {
	list.innerHTML = '';

	transaction.forEach(addTransactionDOM);

	updateValues();
};

// Update local storage
const updateLocalStorage = function () {
	localStorage.setItem('transactions', JSON.stringify(transaction));
};
// Event Listeners
form.addEventListener('submit', addTransaction);

// Delete items
list.addEventListener('click', deleteTransaction);

init();
