/*
* 对象新增方法
* */
/*
* Object.is()
*   ES5比较两个值是否相等，只有两个运算符：相等运算符(==)和严格相等运算符(===).
* 它们都有缺点，前者会自动转换数据类型，后者NaN不等于自身，以及+0等于-0.
* JS缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
*   ES6提出同值相等算法，用来解决这个问题。Object.is就是部署了这个算法的新方法。
*  它用来比较两个值是否严格相等，与严格比较运算符(===)的行为基本一致。
* */
console.log(Object.is('foo', 'foo')) // true
console.log(Object.is({},{})) // false

// 与严格比较运算符不同的地方有两个，一个是+0不等于-0，二是NaN等于自身
console.log(+0 === -0)
console.log(NaN === NaN)
console.log(Object.is(+0, -0))
console.log(Object.is(NaN, NaN))


/*
* Object.assign()
*
* 基本用法
*   Object.assign方法用于对象的合并，将源对象的所有可枚举的属性，复制到目标对象
* */
const target = { a: 1 }
const source1 = { b: 2 }
const source2 = { c: 3 }
Object.assign(target, source1, source2)
console.log(target)
/*
* Object.assign()第一个参数是目标对象，后面的参数都是源对象
*
*   由于undefined和null无法转成对象，所以如果它们作为参数，就会报错
*  Object.assign(null) // 报错
*  Object.assign(undefined) // 报错
*
* 如果undefined和null作为源对象，因为无法转换成对象，所以会跳过。
* */

/*
* Object.assign注意点：
*   1.浅拷贝：Object.assign属于浅拷贝，而不是深拷贝。
*   2.同名属性的替换：Object.assign()遇到同名属性，会替换原有属性
*   3.数组的处理:Object.assign()可以用来处理数组，但会把数组视为对象。
*   4.取值函数的处理:Object.assign()只能进行值复制，如果要复制的值是一个取值函数，那么将求值后再赋值。
*
* */

/*
* Object.getOwnPropertyDescriptors()
*   ES5的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象。
*   ES7引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性(非继承属性)的描述对象
* */



/*
* Object.keys()、Object.entries()、Object.values()
* */
/*
* Object.keys()
*   ES5引入了Object.keys方法，返回一个数组，成员是参数对象自身(不含继承的)所有可遍历(enumerable)属性的键名
* */
let obj3 = { foo: 'bar', baz: 42}
console.log(Object.keys(obj3))

/*
* ES2017引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。
* */
let {keys, values, entries} = Object
let obj4 = { a: 1, b:2, c:3}
for (let key of keys(obj4)) {
  console.log(key)
}
for (let value of values(obj4)) {
  console.log(value)
}
for(let [key, value] of entries(obj4)){
  console.log(key + '=' + value)
}

/*
* Object.fromEntries()
*   Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
* */
// console.log(Object.fromEntries())
// console.log(Object.fromEntries([
//   ['foo', 'bar'],
//   ['baz', 42]
// ]))




































