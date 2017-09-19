/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        xhr.responseType = 'json'
        xhr.addEventListener('load', () => {
            let list = xhr.response

            list.sort((curr, next) => +(curr.name > next.name) || +(curr.name === next.name) - 1)
            resolve(list)
        })
        xhr.addEventListener('error', () => {
            reject()
        })
        xhr.addEventListener('timeout', () => {
            reject()
        })
        xhr.send();
    })
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    if (chunk === '') {
        return false
    }

    return (full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0);
}

function failure() {
    if (document.querySelector('#fail')) {
        return
    }
    let fail = document.createElement('div'),
        restart = document.createElement('button')

    loadingBlock.style.display = 'none'
    restart.innerText = 'Повторить'
    restart.addEventListener('click', () => {
        homeworkContainer.removeChild(fail)
        loadingBlock.style.display = 'block'
        filterInput.dispatchEvent(new KeyboardEvent('keyup'));
    })
    fail.id = 'fail'
    fail.innerText = 'Не удалось загрузить города'
    fail.appendChild(restart)
    homeworkContainer.appendChild(fail)
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;

filterInput.addEventListener('keyup', function() {
    filterResult.innerHTML = ''
    loadTowns()
    .then(list => {
        loadingBlock.style.display = 'none'
        filterBlock.style.display = 'block'
        list.forEach((town) => {
            if (isMatching(town.name, filterInput.value)) {
                let el = document.createElement('div')
                
                el.innerText = town.name
                filterResult.appendChild(el)
            }
        })
    }, () => {
        failure()
    })
    .catch(() => {
        failure()
    })
});

export {
    loadTowns,
    isMatching
};
