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

    addEventListeners()
} 

function dragStart() {
    // console.log('drag start');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    // console.log(dragStartIndex);
}

function dragEnter() {
    // console.log('drag enter');
    this.classList.add('over')
}

function dragLeave() {
    // console.log('drag leave');
    this.classList.remove('over')

}

function dragOver(ev) {
    // console.log('drag over');
    ev.preventDefault();
}

function dragDrop() {
    // console.log('drop');
    const dragEndIndex = +this.getAttribute('data-index');

    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over')
}


// Swap list items thet are draggable 
function swapItems(fromIdx, toIdx) {
    const itemOne = listItems[fromIdx].querySelector('.draggable');
    const itemTwo = listItems[toIdx].querySelector('.draggable');

    listItems[fromIdx].appendChild(itemTwo);
    listItems[toIdx].appendChild(itemOne);

}

// Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, idx) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[idx]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right')
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li')


    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);

    })
}


check.addEventListener('click', checkOrder)