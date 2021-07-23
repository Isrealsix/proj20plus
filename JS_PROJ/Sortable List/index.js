const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
'Jeff Bezos',
'Elon Musk',
'Bernard Arnault',
'Carlos Slim Helu',
'Amancio Ortega',
'Bill Gates',
'Mark Zuckerberg',
'Warren Buffett',
'Larry Ellison',
'Larry Page'
]

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM

function createList() {
    [...richestPeople]
    .map(value => ({value, rand: Math.random()}))
    .sort((a,b) => a.rand - b.rand)
    .map(a => a.value)
    .forEach((person, idx) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', idx);

        listItem.innerHTML = `
            <span class="number">${idx + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">
                    ${person}
                </p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem);
        draggableList.appendChild(listItem)
    });
}