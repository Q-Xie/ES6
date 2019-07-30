/*
* Generator函数的语法
*   1.基本概念
*     Generator函数时ES6提供的一种异步编程解决方案，语法行为与传统的函数完全不同。
*   Generator函数有多种理解角度。语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。
*
*   执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数，返回的遍历器对象，可以一次遍历
*   Generator函数内部的每一个状态。
*
*   形式上，Generator函数时一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号。二是，函数体内部使用yield表达式，定义
*   不同的内部状态(yield在英语中的意思就是产出。)
* */
function * helloGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}

let hw = helloGenerator()
console.log(hw.next()) // {value: 'hello', done: false}
console.log(hw.next()) // {value: 'world', done: false}
console.log(hw.next()) // {value: 'ending', done: true}
console.log(hw.next()) // {value: undefined, done: true}

/*
* 上面代码一共调用了四次next方法
*     第一次调用，Generator函数开始执行，直到遇到第一个yield表达式。next方法返回一个对象，它的value属性就是当前yield表达式的值hello,
*   done属性值为false,表示遍历还没有结束
*     第二次调用，Generator函数从上一次yield表达式停下来的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield
*   的值，done属性值为false，表示遍历还没结束
*     第三次调用，Generator函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return，就执行到函数结束）。next方法返回的对象
*   的value属性。done属性值为true.表示遍历已经结束
*     第四次调用。此时Generator属性已经运行完毕，next方法返回对象的value属性为undefined,done属性为true。以后调用next方法，返回的都是
*   这个值。
* */

/*
* 调用Generator函数，返回一个遍历器对象。代表Generator函数的内部指针。以后，每次调用遍历器对象的next方法，都会返回一个有着value跟done
* 两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值。done属性是一个布尔值，表示是否遍历结束。
*   ES6没有规定function关键字与函数名之间的星号，写在哪个位置。所以*号怎么写都可以，但一般认一般采用星号紧随function关键字后面：
*     function* foo(){}
* */


/*
* yield表达式
*   由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停
*  标志。
*   遍历器对象的next方法的运行逻辑如下：
*     1.遇到yield表达式，就暂停执行后面操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
*     2.下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
*     3如果没有再遇到yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值作为返回对象的value属性值。
*
*  需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为JS提供了手动惰性求值的语法功能。
* */



/*
* next方法的参数
*   yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当做上一个yield表达式的返回值。
* */
function * f() {
  for(let i = 0; true; i++) {
    let rest = yield i
    if(rest){i = -1}
  }
}
let g = f()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next(true))

/*
* 从上面代码中可以看出，next如果没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就
* 被重置为这个参数(即true),因此i会等于-1，下一轮循环就会从-1开始递增。
*
*   这个功能有很重要的语法意义。Generator函数从暂停状态恢复到运行。它的上下文状态时不变的。通过next方法的参数，就有办法在Generator函数
* 开始运行之后，继续向函数体内部注入值。也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数的行为。
* */

function* foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}

let a = foo(5)
console.log(a.next())
console.log(a.next())
console.log(a.next())

let b = foo(5)
console.log(b.next())
console.log(b.next(12))
console.log(b.next(13))


/*
* Generator.prototpye.throw()
*   Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。
* */
let g1 = function* () {
  try {
    yield
  } catch (e) {
    console.log('内部捕获', e)
  }
}

let i = g1()
console.log(i.next())


try {
  i.throw('a')
  i.throw('b')
} catch (e) {
  console.log('外部捕获', e)
}



/*
* 5. Generator.prototype.return()
*   Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且中介遍历Generator函数。
* */
function * gen() {
  yield 1
  yield 2
  yield 3
}
let g2 = gen()

console.log(g2.next())
console.log(g2.return('foo'))
console.log(g2.next())


/*
* 如果return方法调用时，不提供参数，则返回值value属性为undefined。
* */



/*
* next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让Generator函数恢复执行，并且使用不同的语句替换
* yield表达式。
*   next()是将yield表达式替换成一个值
*   throw()是将yield表达式替换成一个throw语句
*   return()是将yield表达式替换成一个return语句。
* */


/*
* yield* 表达式
*   如果Generator函数内部，调用另外一个Generator函数。需要在前者的函数体内部，自己手动完成遍历。
* */
function* foo1() {
  yield 'a'
  yield 'b'
}
function* bar1() {
  yield 'x'
  for(let i of foo1()) {
    console.log(i)
  }
  yield 'y'
}

for(let v of bar1()) {
  console.log(v)
}

/*
* 上面代码中，在foo1和bar1都是Generator函数，在bar里面调用foo,就需要手动遍历foo.如果有多个Generator函数嵌套，写起来就非常麻烦。
*
* ES6提供了yield*表达式，作为解决办法。用来在一个Generator函数里面执行另一个Generator函数。
* */

function* bar2() {
  yield 'x'
  yield* foo1()
  yield 'y'
}

for(let v of bar2()) {
  console.log(v)
}


/*
* Generator函数的this
*   Generator函数总是返回一个遍历器。ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法。
* */
function* g3() {}
g3.prototype.hello = function () {
  return 'hi!'
}
let obj = g3()
console.log(obj instanceof g3)
console.log(obj.hello())
/*
* 上面代码表明，Generator函数g3返回的遍历器obj,是g3的实例，而且继承了g.prototype。但是，如果把g3当做普通的构造函数，并不会生效。因为g3
*   总是遍历对象，而不是this对象。
* Generator函数也不能跟new命令一起用，会报错。
* */














