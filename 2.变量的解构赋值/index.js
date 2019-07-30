/*
* 数组的解构赋值
* 基本用法
* ES6允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。
* */
// es5写法
// let a = 1
// let b = 2
// let c = 3

// es6写法
let [a, b, c] = [1, 2, 3]
console.log(a)
console.log(b)
console.log(c)

/*
* 上面代码表示，可以从数组中提取值，按照对应位置，对变量进行赋值。
* */

/*
* 本质上，这种写法属于模式匹配，只要等号两边的模式相同，左边的变量就会赋予对应的值。
* */
let [foo, [[bar], baz]] = [1, [[2], 3]]
console.log(foo)
console.log(bar)
console.log(baz)

let [,,third] = ['foo', 'baz', 'bar']
console.log(third)

let [head, ...tail] = [1,2,3,4]
console.log(head)
console.log(tail)

let [x, y, ...z] = ['a']
console.log(x)
console.log(y)
console.log(z)
// 如果解构不成功，变量的值就等于undefined
let [foo1] = []
let [bar1, foo2] = [1]
// foo 的值都等于undefined

/*
* 完全部结构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。
* */
let [x1, y1] = [1, 2, 3]
console.log(x1)
console.log(y1)

let [a1, [b1], d1] =  [1,[2,3], 4]
console.log(a1)
console.log(b1)
console.log(d1)

/*
* 如果等号右边不是数组，那将会报错
* */

/*
* 默认值
* */
let [foo3 = true] = []
console.log(foo3)
let [x2, y2 = 'b'] = ['a']
let [x3, y3 = 'b'] = ['a', undefined]
console.log(x2)
console.log(y2)
console.log(x3)
console.log(y3)
/*
* ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认才会生效。
* */


/*
* 对象的解构赋值
* 简介
* 解构不仅可以用于数组，还 可以用于对象。
* 对象的解构跟数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定。而对象的属性没有次序，变量必须与属性同名
* 才能取到正确的值。
* */
let { foo4, bar4} = { foo4: 'aaa', bar4: 'bbb'}
console.log(foo4)
console.log(bar4)
let {baz4} = { foo4: 'aaa', bar4: 'eee'}
console.log(baz4)

/*
* 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
* */
let {sin, cos } = Math

const { log } = console
log('hello')

// log === console.log

/*
* 如果变量名与属性名不一致，必须写成下面这样
* */
let { foo5: baz5 } = { foo5: 'aaa', bar5: 'bbb'}
console.log(baz5)

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l} = obj
console.log(f)
console.log(l)

/*
*
* 实际上说明，对象的解构赋值是下面形式的简写
* */
let {foo6: foo6, bar6:bar6 } = { foo6: 'aaaaaa', bar6: 'bbbbbb' }

/*
* 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者。
* */

/*
* 与数组一样，解构也可以用于嵌套结构的对象。
* */
let obj5 = {
  p: [
    'hello',
    {
      y5: 'world'
    }
  ]
}

let { p: [ x5, { y5 }]} = obj5
console.log(x5)
console.log(y5)



/*
* 默认值
* 对象的解构也可以指定默认值
* */
let { x6 = 3 } = {}
console.log(x6)

let { x7, y7 = 5 } = { x7: 1 }
console.log(x7)
console.log(y7)

/*
* 字符串解构赋值
* 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
* */

const [a8, b8, c8, d8, e8] = 'hello'
console.log(a8)
console.log(b8)
console.log(c8)
console.log(d8)
console.log(e8)

/*
* 类似于数组对象都有一个length属性，因此还可以对这个属性解构赋值
* */
let { length: len} = 'hello'
console.log(len)


/*
* 数值和布尔值的解构赋值
* 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
* */
// let { toString: s} = 123
// console.log(s === Number.prototype.toString)
//
// let { toString: s} = true
// console.log(s === Boolean.prototype.toString)


/*
* 函数参数的解构赋值
* 函数的参数也可以解构赋值
* 下面代码中，函数add的参数表面上市一个数组，但传入参数的那一刻，数组参数就被解构成
* x, y。对于函数内部的代码来说，它们能感受到参数就是x和y.
* */
function add([x, y]) {
  return x + y
}
console.log(add([1, 2])) // 3


console.log([[1,2], [3,4]].map(([a,b]) => a + b))


























