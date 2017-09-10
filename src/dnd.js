/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    var div = document.createElement('div'),
        width = Math.floor(Math.random() * 200 + 50),
        height = Math.floor(Math.random() * 200 + 50);

    div.className = 'draggable-div';
    div.style.position = 'absolute';
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.top = Math.floor(Math.random() * (window.innerHeight - height)) + 'px';
    div.style.left = Math.floor(Math.random() * (window.innerWidth - width)) + 'px';
    div.style.backgroundColor = '#' + ('00' + Math.floor(Math.random() * 4096).toString(16)).substr(-3);

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.addEventListener('dragstart', function(e) {
        e.preventDefault();
    })
    target.addEventListener('mousedown', function(e) {
        if (e.target.className != 'draggable-div') {

            return;
        }
        var coords,
            shiftX, 
            shiftY,
            move,
            stop,
            element = e.target;

        element.style.zIndex = 9999;
        coords = e.target.getBoundingClientRect();
        shiftX = e.pageX - coords.left + pageXOffset;
        shiftY = e.pageY - coords.top + pageYOffset;
        move = (event) => {
            element.style.left = event.pageX - shiftX + 'px';
            element.style.top = event.pageY - shiftY + 'px';
        },
        stop = () => {
            element.style.zIndex = 'auto';
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', stop)
        };
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', stop);
        
    });
}
addListeners(homeworkContainer);// вместо обработчика на строке 88
let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    // addListeners(div); //<<<< закоментировано, поскольку не вижу смысла в обработчике на каждом div'е
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
