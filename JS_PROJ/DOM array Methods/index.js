const main = document.getElementById('main');

const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const sumWealthBtn = document.getElementById('sum-wealth');


getRandomUser();
getRandomUser();
getRandomUser();

let data = [];

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();


    const user = data.results[0];

    // console.log(user.name.first);
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: (Math.floor(Math.random()* 1000000))
    }

    addData(newUser);
}

function showMillionaires() {
    data = data.filter(item => item.money > 1000000)
    updateDom();
}

function sumWealth() {
    const sum = data.reduce((acc, num) => acc += num.money, 0)

    const sumEl = document.createElement('div');
    sumEl.innerHTML = `<h3>Total Money: <strong>${formatNumber(sum)}</strong></h3>`;

    main.appendChild(sumEl)
}

function doubleMoney() {
    data = data.map(item => {
        return {
            ...item, money: item.money *2
        }
    })

    updateDom()
}

function sortRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDom();
}

function addData(userData) {
    data.push(userData);
    updateDom();
}

// (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

function updateDom(providedData = data) {
    main.innerHTML = `<h3><strong>Person</strong> Wealth</h3>`;

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');

        element.innerHTML = `<strong>${item.name}</strong> ${formatNumber(item.money)}`;

        main.appendChild(element)
    })
}

function formatNumber(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}


// EventListeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
sumWealthBtn.addEventListener('click', sumWealth);