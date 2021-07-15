const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const isValidEmail = input => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
	}
};

const showError = (input, message) => {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
};

const showSuccess = input => {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
};

const checkRequired = inputArr => {
	inputArr.forEach(input => {
		const value = input.value.trim();
		if (!value) {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
};

const getFieldName = input => {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkLength = (input, min, max) => {
	const length = input.value.length;
	if (length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (length > max) {
		showError(
			input,
			`${getFieldName(input)} must be at most ${max} characters`
		);
	}
};

const checkPasswordMatch = (input1, input2) => {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not Match');
	}
};

form.addEventListener('submit', ev => {
	ev.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	isValidEmail(email);
	checkPasswordMatch(password, password2);
});
