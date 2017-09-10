/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 * 
 * https://jsfiddle.net/zbhmz4q0/15/
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
    div.setAttribute('draggable', true);
    div.setAttribute('id', (new Date()).getTime())
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
    document.addEventListener('dragstart', function(e) {
        if (e.target.className != 'draggable-div') {

            return;
        }
        var coords = e.target.getBoundingClientRect(),
            obj = {
                shiftX: e.clientX - coords.left + pageXOffset,
                shiftY: e.clientY - coords.top + pageYOffset,
                id: e.target.id
            };

        e.dataTransfer.setData('text/plain', JSON.stringify(obj));
    });
    document.addEventListener('dragover', event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    })
    document.addEventListener('drop', (event) => {
        event.preventDefault();
        let data = JSON.parse(event.dataTransfer.getData("text"));
        let element = document.getElementById(data.id)
        element.style.left = event.clientX - data.shiftX + 'px';
        element.style.top = event.clientY - data.shiftY + 'px';
    });

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addListeners();
addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    //addListeners(div); //<<<< закоментировано, поскольку не вижу смысла в обработчике на каждом div'е
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
