const container = document.querySelector('.container');

container.addEventListener('click', ev => {

    const target = ev.target.closest('.panel');
    if(!target) return;
    Array.from(container.children).map(el => el.classList.remove('active'))
    target.classList.add('active')
})