/*
* async函数，相当于就是Generator函数的语法糖。
* */
const fs = require('fs')

const gen = function *() {
  const f1 = yield readFile('/etc/asdf0')
  const f2 = yield readFile('/etc/asdf1')
  console.log(f1.toString())
  console.log(f2.toString())
}

/*
* 上面代码写成async函数
* */
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/asdf0')
  const f2 = await readFile('/etc/asdf1')
  console.log(f1.toString())
  console.log(f2.toString())
}

/*
* 上面比较可以看的出来，async函数就是将Generator函数的星号(*)替换成async,将yield替换成await，仅此而已。
*   async函数对Generator函数的改进，体现在以下四点：
*     1、内置执行器
*     Generator函数必须靠执行器，所以才有了co模块，而async函数自带执行器，也就是说，async函数的执行，与普通函数一模一样，只要一行。
*     2.更好的语义
*     async和await，比起星号和yield,语义更清楚，async函数里有异步操作，await表示紧跟后面的表达式需要等待结果。
*     3.更广的适用性。
*     co模块约定，yield命令后面只能是Thunk函数或者是Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值
*     4.返回值是Promise
*     async函数的返回值是Promise对象，这比Generator函数的返回值是Iterator对象方便多了，你可以用then进行下一步操作。
*  进一步说，async函数完全可以看做多个异步操作，包装成一个Promise对象，而await命令就是那部then命令的语法糖。
* */


/*
* 基本用法
*   async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等异步操作完成，再接着执行
* 函数体内后面的语句
*
* 返回Promise对象
*   async函数返回一个Promise对象，async函数内部return语句返回的值，会成为then方法回调函数的参数。
* */
async function f() {
  return 'hello world'
}
f().then(v => console.log(v))

/*
* 上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。
*
* async函数内部抛出错误，会导致返回的Promise对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
* */
/*
  async function f2() {
    throw new Error('出错了')
  }
  f2().then(
    v => console.log(v),
    e => console.log(e)
  )
*/

/*
* Promise对象的状态变化
*    async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会发生状态改变，除非遇到return语句
* 或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
* */


/*
* await命令
*   await命令后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值。
* */
async function f() {
  // 等同于
  // return 123
  return await 123
}

f().then(v => console.log(v))
// 123


/*
* 使用注意点：
*   1.await命令后面的Promise对象，运行结果可能rejected，所以孔把await放在try..catch代码块中
*   2.多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时出发
*   3.await命令只能在asyn函数之中，如果用在普通函数之中，会报错。
*   4.async函数可以保留运行堆栈。
* */
async function f1(){
  let foo = await getFoo()
  let bar = await getBar()
}

// 上面代码中，getFoo以及getBar两个独立的异步操作(即互不依赖)，被写成激发关系，这样比较耗时。完全可以
// 让它们同时触发

// 写法一
async function f2(){
  let [foo, bar] = await Promise.all([getFoo(), getBar()])
}
// 写法二
async function f3() {
  let fooPromise = getFoo()
  let barPromise = getBar()
  let foo = await fooPromise
  let bar = await barPromise
}

/**/




/*
* async函数的实现原理
*   async函数的实现原理，就是将Generator函数和自动执行器，包装在一个函数里。
* */
async function fn(args) {
  // ...
}

// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  })
}


/*
* 所有的async 函数都可以写成上面的两种心事，其中spawn函数就是自动执行器。
* */
function spawn(getF) {
  return new Promise(function (resolve, reject) {
    const gen = genF()
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch (e) {
        return reject(e)
      }
      if(next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(function (v) {
        step(function () {
          return gen.next(v)
        })
      }, function (e) {
        step(function () {
          return gen.throw(e)
        })
      })
    }
    step(function () {
      return gen.next(undefined)
    })
  })
}















































