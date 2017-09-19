/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

var cookies = {
    set: function(name, value, days) {
        var date = new Date(new Date().getTime() + (3600000 * 24) * (days || 1));
    
        document.cookie = `${name}=${value}; path=/; expires=${date}`;
    },

    get: function() {
        var obj = {};

        document.cookie.split('; ').map(function (cookie) {
            cookie.split('=').reduce(function (name, value) {
                obj[name] = value;
            });
        });
    
        return obj;
    },
    erase: function(name) {
        this.set(name, 'erase', -1);
    }    
}

function addToTable (name, value) {
    var tr = document.createElement('tr');

    tr.innerHTML = `<td>${name}</td><td>${value}</td><td><button data-delete=${name}>удалить</button></td>`;
    listTable.appendChild(tr);
}

function updateTable () {
    listTable.innerHTML = '';
    var cookie = cookies.get();
    var reg = RegExp(filterNameInput.value, 'gi');

    for (let key in cookie) {
        if (cookie.hasOwnProperty(key)) {
            if (filterNameInput.value !== '') {
                if (key.search(reg) !== -1 || cookie[key].search(reg) !== -1) {
                    addToTable(key, cookie[key]);
                }
            } else {
                addToTable(key, cookie[key]);
            }
        }
    }
}

filterNameInput.addEventListener('keyup', function() {
    updateTable();
});

addButton.addEventListener('click', () => {
    var name = addNameInput.value;
    var value = addValueInput.value;

    if (name !== '' && value !== '') {
        cookies.set(name, value, 1);
        updateTable();
        // addNameInput.value = '';
        // addValueInput.value = '';
    }
});

listTable.addEventListener('click', function (e) {
    var target = e.target;

    if (target.dataset.delete) {
        cookies.erase(target.dataset.delete);
        updateTable();
    }
});