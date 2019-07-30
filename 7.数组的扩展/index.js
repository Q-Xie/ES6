/*
* 数组的扩展
* */
/*
*   1.扩展运算符
*     含义：扩展运算符是三个点(...)。它好比rest参数的逆运算，将有一个数组转为用逗号分隔的参数序列。
* */
console.log(...[1,2,3])
console.log(1, ...[2,3,4], 5)

/*
* 该运算符主要用于函数调用
* */
function push(array, ...items) {
  array.push(...item)
}
function add(x, y) {
  return x + y
}
const numbers = [4, 38]
console.log(add(...numbers))

/*
* 替代函数的apply方法
*   由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了
* */
function f(x, y, z) {
  // ...
}

let args = [0,1,2]
// ES5的写法
f.apply(null, args)

//ES6的写法
f(...args)

/*
* 应用Math.max方法，简化求出一个数组最大元素的写法。
* */
// ES5的写法
Math.max.apply(null, [14,3,77])
// ES6的写法
Math.max(...[14,3,77])
// 等同于
Math.max(14,3,7)

/*
* 利用push函数，将一个数组添加到另一个数组尾部。
* */
// ES5的写法
let arr1 = [0, 1, 2]
let arr2 = [3, 4, 5]
Array.prototype.push.apply(arr1, arr2)

// ES6写法
arr1.push(...arr2)


/*
* 扩展运算符的应用
* */

/*
* 1，复制数组
* */
const a1 = [2, 3]
const [a2] = [...a1]

/*
* 合并数组
* */
const arr1 = [2,3]
const arr2 = [3,4]
const arr3 = [5,6]
const arr4 = [...arr1, ...arr2, ...arr3]

/*
* 与解构赋值结合
*   扩展运算符可以与解构赋值结合起来，用于生成数组。
* */
const [first,  ...reset ] = [1,2,3,4,5]
console.log(first)
console.log(reset)


/*
* 字符串
* */
console.log([ ...'hello' ]) // ['h', 'e', 'l', 'l', 'o']



/*
* Array.from()
*   Array.from方法用于将两类对象转为真正的数组，类似数组的对象和可遍历的对象。(Set和Map)
* */
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  'length': 3
}
// ES5写法
let arr1 = [].slice.call(arrayLike)

// ES6写法
let arr2 = Array.from(arrayLike)

/*
* 实际应用中，常见的类似于数组的对象就是DOM操作返回的NodeList集合，以及函数内部的arguments对象。
* */


/*
* Array.of()
*   Array.of方法用于将一组值，转换为数组。
* */
Array.of(3, 11, 8) // [3,11,8]

/*
* Array.of方法基本上可以用来替换Array()或者new Array()，并且不存在由于参数不同而导致的重载，它的行为非常统一
* */
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1,2) // [1,2]

/*
* Array.of总是返回参数值组成的数组，如果没有参数，就返回一个空数组。
* */

function ArrayOf() {
  return [].slice.call(arguments)
}
/*
* 模拟Array.of方法
* */


/*
* 数组实例的copyWithin()
*   数组实例的copyWithin()方法，在当前数组内部，将制定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。
* 也就是说，使用这个方法，会修改当前数组。
* */
Array.prototype.copyWithin(target, start = 0, end = this.length)
/*
* 它接受三个参数：
*   --target(必需):从该位置开始替换数据，如果为负值，则表示倒数
*   --start(可选):从该位置开始读取数据，默认为0。如果为负值，表示从末尾开始计算
*   --end(可选): 到该位置前停止读取数据，默认等于数组刹那高度。如果为负值，表示从末尾开始计算。
*
* 这三个参数都应该是数值，如果不是，会自动转为数值。
*
* */
console.log([1,2,3,4,5].copyWithin(0,3)) // [4,5,3,4,5]
// 将3号位负值到0号位
console.log([1,2,3,4,5].copyWithin(0,3,4)) // [4,2,3,4,5]


/*
* 数组实例的find()和findIndex()
*     数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员一次执行该回调函数，直到找出第一个返回为true的成员。
*  然后返回该成员。如果没有符合条件的成员，则返回undefined
* */
[1,4,-5,10].find((n) => n < 0) // -5

[1,5,10,15].find((value, iindex, arr) => {
  return value > 9
}) // 10

/*
* 上面代码中，find方法的回调函数可以接受三个参数，一次为当前值，当前的位置，和原数组。
* */



/*
* findIndex()方法的用法跟find方法非常类似，返回第一个符合条件的数组成员的位置，如果成员都不符合则返回-1
*
* 这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
* */



/*
* 数组实例的fill()
*   fill方法使用给定值，填充一个数组。
* */
['a', 'b', 'c'].fill(7) // [7,7,7]

/*
* fill方法可以接受第二和第三个参数，用于指定填充的起始位置和结束位置。
* */
['a', 'b', 'c'].fill(7,1,2) // ['a', 7, 'c']

/*
* 数组实例的entries()、keys()和values()
*   ES6提供三个新的方法 --- entries()，keys()，values()，用于遍历数组。它们都会返回一个遍历器对象。
*
*   可以用for..of循环进行遍历，唯一的区别是keys()是对键名的遍历，values()是对键值的遍历，entries()
* 是对键值对的遍历。
* */
for (let index of ['a', 'b'].keys()){
  console.log(index) // 0, 1
}
for(let elem of ['a', 'b'].values()){
  console.log(elem) // a, b
}
for(let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem)
}


/*
* 数组实例的includes()
*   includes()方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016引入了该方法。
*
*   includes()方法可以判断NaN值，
* */


/*
* 数组实例的flat()，flatMap()
*   数组的成员有时还是数组，Array.prototype.flat()用于嵌套的数组拉平，变成一维数组，该方法返回一个新数组，对原数据
*  没有影响。
* */
[1,2,[3,4]].flat() // [1,2,3,4]

/*
* flat()默认只会降一维，如果想要降多维，需要传入参数，默认为1，flat(2)，则表示要拉平两层嵌套数组。
* Infinity则表示不管嵌套多少层都要转成一维数组。
* */

/*
* flatMap()方法对原数组的每个成员执行一个函数(相当于执行Array.prototype.map())，然后对返回值组成的数组执行flat()方法。
*   该方法返回一个新数组，不改变原数组。
* */
[2,3,4].flatMap((x) => [x, x * 2]) // [2,4,3,6,4,8]
[1,2,3,4].flatMap(x => [[x * 2]]) // [[2], [4], [6], [8]]
/*
* flatMap方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置，原数组。
* */

/*
* 数组的空位
*     数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
* */
Array(3) // ['','','']

/*
* 空位不是undefined，一个位置的值等于undefined，依然是有值的，空位是没有任何值的，in运算符可以说明这一点。
* */
0 in [undefined, undefined, undefined]  // true
0 in ['','',''] / false

/*
* ES5中，
*   - forEach(),filter(),reduce(),every()和some()都会跳过空位。
*   - map()会跳过空位，但会保留这个值
*   - join()和toString()会将空位视为undefined,而undefined和null都会处理成空字符串
*
* ES6则是明确将空位转为undefined
*   Array.from方法会将数组的空位，转为undefined,也就是说，这个方法不会忽略空位。
*   (...)扩展运算符，也会将空位转为undefined.
*   copyWithin()会连空位一起拷贝。
*   fill()，会将空位视为正常的数组位置。
*   for...of循环也会遍历空位
* */




















