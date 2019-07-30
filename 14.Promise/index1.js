/*
* 1.什么是Promise？
*     Promise是JS异步编程中的重要概念，异步抽象处理对象，是目前比较流行的JS异步编程解决方法之一
* */

/*
* 2.对于几种常见的异步编程方案
*     1、回调函数
*     2、事件监听
*     3、发布/订阅
*     4、Promise对象
* */

// 回调函数
/*
* $.get(url, (data) => {
* console.log(data)})
**/

/*
* 如果我们要发送多个异步请求，并且每个请求之间需要互相 依赖，那这时，我们只能 以嵌套的方式来解决。形成了回调地狱
* */
/*
$.get(url, (data) => {
  console.log(data)
  $.get(url, (data) => {
    console.log(data)
  })
})*/

/*
* 这样一来，在处理越多的异步逻辑时，就需要越深的回调嵌套，这种编码模式的问题主要有以下几个：
*     .代码逻辑书写顺序与执行顺序不一致，不利于阅读和维护
*     .异步操作的顺序变更时，需要大规模的代码重构
*     .回调函数基本都是匿名函数，bug追踪困难
*     .回调函数时被第三方库代码而非自己的业务代码所调用的，曹成了loC控制反转。
* */

/*
* Promise处理多个相互关联的异步请求
*   1、我们Promise可以更直观的解决回调地狱的问题
* */
/*const request = url => {
  return new Promise((resolve,  reject) => {
    $.get(url, data => {
      resolve(data)
    })
  })
}

request(url).then(data1 => {
  return request(data1.url)
}).then(data2 => {
  return request(data2.url)
}).catch(err => throw new Error(err))
*/


/*
*3.Promise使用
*   Promise是一个构造函数，new Promise返回一个promise对象，接收一个excutor执行函数作为参数，excutor有两个函数类型形参resolve, reject
* */
// const promise = new Promise(((resolve, reject) => {
  // 异步处理
  // 处理结束后、调用resolve或reject
// }))

/*
* 2.promise相当于一个状态机
*   promise的三种状态
*     .pending
*     .fulfilled
*     .rejected
*   1.promise对象初始化状态为pending
*   2.当调用resolved(成功),会由pending => fulfilled
*   3.当调用reject(失败),会由pending => rejected
*  注意promise状态 只能由pending => fulfilled/rejected，一旦修改就不能再变。
* */

/*
* promise对象方法
*   1.then方法注册，当resolve(成功)/reject(失败)的回调函数
*   2.resolve(成功)onFulfilled会被调用
*   3.reject(失败)onRejected会被调用
*   4.promise.catch:在链式写法中可以捕获前面then中发送的异常
*   5.promise chain promise.then方法每次调用都会返回有一个新的promise对象，所以可以用链式写法
* */

/*
* Promise的静态方法
*   1.Promise.resolve返回有一个fulfilled状态的promise对象
*   2.Promise.reject返回一个rejected状态的promise对象
*   3.Promise.all接收一个promise对象数组为参数
*   4.
*
* */


/*const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(()=> {
  console.log(3)
})
console.log(4)*/


/*const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)*/

/*
* promise有3中状态：pending，fulfilled或rejected.状态改变只能是pending->fulfilled或者pending->rejected，
* 状态一旦改变则不能再变，上面promise2并不是promise1，而是返回一个新的Promise实例。
* */


/*
const promise3 = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise3.then((res) => {
  console.log('then', res)
}).catch((err) => {
  console.log('catch', err)
})
*/

/*
* 解析：构造函数中的resolve或reject只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise状态一旦改变就
* 不能再变。
* */


/*Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })*/

/*
* promise可以链式调用，提起链式调用我们通常会想到通过return this实现，不过promise并不是这样实现的。promise每次调用
* .then或者.catch都会返回一个新的promise，从而实现链式调用。
* */


/*const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})*/

/*
* promise的.then或者.catch可以被调用多次，但这里Promise构造 函数只能执行一次。或者说promise内部状态已经改变
* 并且有了有一个值，那么后续调用.then或者.catch都会直接拿到该值
* */

/*Promise.resolve()
  .then(() => {
     return new Error('error!!!')
  })
  .then((res) => {
    console.log('then', res)
  })
  .catch((err) => {
    console.log('catch', err)
  })*/

/*
* .then或者.catch中return一个error对象并不会抛出错误，所以不会被后序的.catch捕获，需要改成其中一种
* */
/*
Promise.resolve()
  .then(() => {
    return Promise.reject(new Error('error!!!'))
    throw new Error ('error')
  })
  .catch((err) => {
    console.log('catch', err)
  })
*/


/*const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)*/
/*
* .then或者.catch返回的值不能是promise本身，否则会造成循环。类似于
* */


Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)








































