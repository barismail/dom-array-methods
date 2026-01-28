const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortRichest = document.getElementById('sort-richest');
const calculateWealth = document.getElementById('calculate-wealth');

let data = [];

const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        wealth: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

const addData = (obj) => {
    data.push(obj);

    updateDOM();
}

const updateDOM = (providedData = data) => {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.wealth)}`;
        main.appendChild(element);
    });
}

const formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const doubleWealth = () => {
    data = data.map(user => {
        return {...user, wealth: user.wealth * 2};
    });

    updateDOM();
}

const sortByRichest = () => {
    data.sort((a, b) => b.wealth - a.wealth);
    updateDOM();
}

const showOnlyMillionaires = () => {
    data = data.filter(user => user.wealth >= 1000000);
    updateDOM();
}

const calculateTotalWealth = () => {
    const total = data.reduce((acc, user) => (acc += user.wealth), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(wealthElement);
}

addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleWealth);
sortRichest.addEventListener('click', sortByRichest);
showMillionaires.addEventListener('click', showOnlyMillionaires);
calculateWealth.addEventListener('click', calculateTotalWealth);