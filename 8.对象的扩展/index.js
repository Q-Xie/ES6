/*
* 对象的扩展
* */

/*
* 属性的简介表示法
* */
const foo = 'bar'
const baz = {foo}
console.log(baz)
// 等同于
// const baz = {foo: foo}
/*
* 这表明ES6允许在对象之中，直接写变量。这是属性名为变量名，属性值为变量的值。
* */


/*
* 属性名表达式
    js定义对象啊的属性有两种方法
* */
// 方法一
// obj.foo = true
// 方法二
// obj['a' + 'bc'] = 123

// ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
// let propKey = 'foo'
// let obj = {
//   [propKey]: true,
//   ['a' + 'bc']: 123
// }

/*
* 方法的name属性
*   函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
* */

/*
* 属性的可枚举和遍历
*   可枚举性
*  对象的每个属性都有一个描述对象，用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取
*  该属性的描述对象。
* */
let obj = { foo: 123 }
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'))
// value: 123
// writable: true
// enumerable: true
// configurable: true

/*
* 描述对象的enumerable属性，称为可枚举性，如果该属性为false,就表示某些操作会忽略当前属性。
*   目前，有四个操作会忽略enumerable为false属性
*       for...in循环：只遍历对象自身的和继承的可枚举的属性
*       Object.keys(): 返回对象自身的所有可枚举的属性的键名
*       JSON.stringify(): 只串行化对象自身的可枚举的属性
*       Object.assign(): 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性
* */




/*
* super关键字
*   this关键字总是指向函数所在的当前对象，ES6又新增了另一个类似的关键字super,指向当前对象的原型对象。
* */
const proto = {
  foo: 'hello'
}
const obj1 = {
  foo: 'world',
  find() {
    return super.foo
  }
}
Object.setPrototypeOf(obj1, proto)
console.log(obj1.find())

/*
* 注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方会报错。
* */



/*
* 对象的扩展运算符
*   解构赋值
*  对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的(enumerable)、但尚未读取的属性，分配到
* 指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
* */
let { x, y, ...z} = {x: 1, y: 2, a: 3, b: 4}
console.log(x)
console.log(y)
console.log(z)



/*
* 扩展运算符
*   对象的扩展运算符(...)用于去除参数对象的所有可遍历属性，拷贝到当前对象之中。
* */
let z1 = { a:3, b: 4}
let n = { ...z1 }
console.log(n)

let foo2 = { ...['a', 'b', 'c']}
console.log(foo2)





