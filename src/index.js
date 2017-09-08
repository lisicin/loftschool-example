
/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
 работа с исключениями и отладчиком */



/*
 Задача 2:

 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArr = [];

    for (var i = 0; i < array.length; i++) {
        newArr[i] = fn(array[i], i, array)
    }

    return newArr;

}

/*
 Задача 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var last = initial || array[0]

    for (var i = (initial === undefined) ? 1 : 0; i < array.length; i++) {
        last = fn(last, array[i], i, array)
    }

    return last
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return prop in obj;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {

    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var props = Object.keys(obj);
    
    return props.map(function(item) {
        return item.toUpperCase();
    });
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    var newArr = [],
        begin = (from === undefined) ? 0 : from,
        end = (to === undefined) ? array.length : to;

    if (begin < 0) {
        begin = array.length + from;
    }

    if (begin < -array.length) {
        begin = 0;
    }

    if (end < 0) {
        end = array.length + to;
    }

    if (end > array.length) {
        end = array.length;
    }

    for (var i = begin; i < end; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;
            
            return true;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
