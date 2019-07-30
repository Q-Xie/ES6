/*
* 概述
*   ES5的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法
*   (mixin模式)。新的方法名字就可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样
*   就从根本上防止属性名冲突。这就是ES6引入Symbol的原因。
* */

/*
* ES6引入一种新的原始数据类型Symbol，表示独一无二的值。它是JS语言的第七种数据类型，前六种是：undefined,null,Boolean,
* String,Number,Object
* */

/*
* Symbol值通过Symbol函数生成，这就是说，对象的属性名限制可以有两种类型，一种是原来就有的字符串，一种就是新增的Symbol类型。
* 凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
* */
let s = Symbol()
console.log(typeof s) // symbol


/*
* 注意Symbol函数前不能使用new命令，否则会报错。这是因为生成Symbol是原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以
* 不能添加属性。基本上它是一种类似于字符串的数据类型。
* */

/*
* Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
* */
let s1 = Symbol('foo')
let s2 = Symbol('bar')

console.log(s1)
console.log(s2)

console.log(s1.toString())
console.log(s2.toString())

let s3 = Symbol('foo')
let s4 = Symbol('foo')
console.log(s3 === s4) // false
/*
* s3和s4都是Symbol函数的返回值，而且参数相同，但是它们是不相等的
*
* Symbol值不能与其他类型的值进行运算，会报错。
* */

/*
* ES2019提供了一种属性description，直接返回symbol的描述
* const sym = Symbol('foo')
* sym.description  // // foo
* */


/*
* 作为属性名的Symbol
*   由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现相同的属性。
*   这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
* */
let mySymbol = Symbol()

// 第一种写法
let a = {}
s[mySymbol] = 'hello'

// 第二种写法
let b =  {
  [mySymbol]: 'hello'
}
// 第三种写法
let c = {}
Object.defineProperty(c, mySymbol, {value: 'hello'})

// 以上写法都得到相同的结果， a[mySymbol] // hello


/*
* 属性名的遍历。
*   Symbol作为属性名，该属性不会出现在for...in、for..of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、
*   JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有的
*   Symbol属性名。
* */


/*
* Symbol.for()、Symbol.keyFor()
*   有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数。然后所示有没有以该参数作为
*   名称的Symbol值，如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。
* */




























