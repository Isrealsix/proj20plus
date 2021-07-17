const currencyEl_1 = document.getElementById('currency-one');
const amountEl_1 = document.getElementById('amount-one');
const currencyEl_2 = document.getElementById('currency-two');
const amountEl_2 = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');


// Fetch exchange rate and update the DOM
const calculateRate = () => {
    const currency_1 = currencyEl_1.value;
    const currency_2 = currencyEl_2.value;

    console.log(currency_1, currency_2);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_1}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_2]
            console.log(rate);

            rateEl.innerText = `1 ${currency_1} = ${rate} ${currency_2}`;

            amountEl_2.value = (+amountEl_1.value * rate).toFixed(2)
        })
}

currencyEl_1.addEventListener('change', calculateRate);
amountEl_1.addEventListener('input', calculateRate);
currencyEl_2.addEventListener('change', calculateRate);
amountEl_2.addEventListener('input', calculateRate);
swapBtn.addEventListener('click', () => {
    const temp = currencyEl_1.value;
    currencyEl_1.value = currencyEl_2.value;
    currencyEl_2.value = temp;

    calculateRate();
})

calculateRate();