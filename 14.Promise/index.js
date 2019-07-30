/*
* Promise对象
*   Promise的含义
*   Promise是异步编程的一种解决方案，比传统的回调函数和事件，Promise更合理和更强大。
*
*   所谓的Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它
* 可以获取异步操作的消息。Promise提供统一的API,各种异步操作都可以用同样的方法进行处理。
*
* Promise对象有以下两个特点：
*   1.对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled(已成功)和rejected(已失败)。
*   只有异步操作的结果，可以决定当前是哪一种转改，任何操作都无法改变这个状态。
*   2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending到fulfilled或者从pending到
*   rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这是就成为resoled(已定型)。如果改变已经发生了，你再对
*   Promise对象添加回调函数，也会立即得到这个结果。
*
*   有了Promise对象，就可以将异步操作以公布操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作
*   更加容易。
*
*   Promise也有一些缺点。首先，无法取消Promise,一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部会抛出错误，
*   不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一阶段(是刚刚开始还是即将结束)
* */


/*
* 基本用法
*   ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
*   const promise = new Promise(function (resolve, reject) {
*       // ... some code
*       if( true {
*         resolve(value)
*       } else {
*         reject(error)
*       }
*     })
*   Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数。
*   resolve函数的作用是，将Promise对象状态从未完成变为成功。即从pending变成resolve
*   reject函数的作用是，将Promise对象的状态从未完成变为失败。即从pending变成rejected
*
* Promise实例生成后，可以用then方法分别指定resolved状态和rejected状态的回调函数
* */
/*let promise = new Promise()
promise.then(function (value) {
  // success
}, function (error) {
  // failure
})*/

/*
* then方法可以接受两个回调函数作为参数。第一个回调函数时Promise对象的状态变为resoled时调用，第二个回调函数时Promise对象的状态变为rejected
* 时调用。其中，第二个函数是可选的，不一定要提供，这两个函数都接受Promise对象传出的值作为参数
* */
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}
timeout(100).then((value) => {
  console.log(value)
})

/*
* 上面代码中，timeout方法返回一个Promise实例，表示一段时间后才会发生的结果。过了指定时间后，Promise实例的状态会变为resolved，就会触发
* then方法绑定的回调函数
* */
// Promise新建后就会立即执行
let promise = new Promise(function (resolve, reject) {
  console.log('Promise')
  resolve()
})
promise.then(function () {
  console.log('resolved')
})
console.log('hi')

/*
* 上面代码中，Promise在新建立后会立即执行，所以首先输出的是Promise。然后then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，
* 所以resolved最后输出。
*   下面是异步加载 图片的例子：
* */
function loadImageAsync(url) {
  return new Promise(function (resolve, reject) {
    const image = new Image()
    image.onload = function () {
      resolve(image)
    }
    image.onerror = function () {
      reject(new Error('Could not load image at' + url))
    }
    image.src = url
  })
}

/*
* 上面代码中，使用Promise包装了一个图片异步加载操作。如果加载陈宫，就调用resolve方法，否则就调用reject方法。
* */

/*
* 下面是一个用Promise对象实现的Ajax操作的例子
* */
const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if(this.readyState !== 4){
        return
      }
      if(this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
  return promise
}
/*
* 上面代码中，getJSON是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求，并且返回一个Promise对象。需要注意的是
* 在getJSON内部，resolve函数和reject函数调用时，都带有参数。
*
* 如果调用resolve函数和reject函数时带有参数，那么它们的参数会传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；
* resolve函数的参数除了正常值意外，还可能是另外一个Promise实例，比如像下面这样
* */
const p1 = new Promise((resolve, reject) => {
  // ...
})
const p2 = new Promise((resolve, reject) => {
  resolve(p1)
})

/*
* 上面代码中，p1和p2都是Promise实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
*
* 注意这样，p1的状态会传给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态时pending，那么p2的回调函数就会等待p1的状态改变，如果p1的状态
* 已经是resolved或者rejected，那么p2的回调函数将会立刻执行。
* */

const p3 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('faile')), 3000)
})
const p4 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p3), 1000)
})

/*p4.then(result => console.log(result))
p4.catch(error => console.log(error))*/ // Error: faile

/*
* 上面代码中，p3是一个Promise，3秒后变成rejected。p4的状态在1秒之后改变，resolve方法返回p3。由于p2返回的是一个Promise，导致p4的
* 状态无效了，由p3的状态决定p4的状态。所以后面then语句都变成了针对后者p3。
* */

/*
* Promise.prototype.then()
*   Promise实例具有then方法，也就是说，then方法定义在原型对象Promise.ptototype上。它的作用是为Promise实例添加状态改变时的回调函数。
*   前面说过then方法的第一个参数是resolved状态的回调函数，第二个参数(可选)是 rejected状态的回调函数。
*
*   then方法返回的是一个新的Promise实例（注意，不是原来的那个Promise实例）。因此可以采用链式写法，即then方法后面调用另外一个then方法
* */
// getJSON('/posts.json').then((json) => {
//   return json.post
// }).then((post) =>{
// })
/*
* 采用链式then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象(即有异步操作)，这时候一个回调函数
* 就会等待该Promise对象的状态发生变化，才会被调用。
* */



/*
* Promise.prototype.catch()
*   Promise.prototype.catch方法是.then(null, rejection)或.then(undefined， rejection)的别名，用于指定发生错误时的回调函数。
* */
// getJSON('post.json').then(function (post) {
//
// }).catch(function (error) {
//   // 处理getJSON和前一个回调函数运行时发生的错误
// })


/*
* Promise.prototype.finally()
*    finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。
* */
/*promise.then(result => {})
  .catch(error => {})
  .finally(() => {})*/

/*
* 上面代码中，不管promise最后的状态，在执行完then或者catch指定的回调函数以后，都会执行finally方法指定的回调函数。
*   finally方法的回调函数不接受任何参数，这意味着没办法直到，前面的promise状态到底是fulfilled还是rejected。这表明
*  finally方法里面的操作应该与状态无关，不依赖与Promise的结果。
*
*  finally方法本质上市then方法的特例。
* */
promise.finally(() => {

})

// 等同于
promise.then(result => {
  return result
}, error => {
  throw error
})


/*
* Promise.all()
*   Promise.all方法用于将多个Promise的实例，包装成一个新的Promise实例。
*     const p = Promise.all([p1, p2, p3])
*  上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise实例，如果不是，就会先调用下面讲到的Promise.resolve方法，
*  将参数转为Promise实例，再进一步处理。(Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每隔成员都是Promise实例)
*
*   p的状态由p1、p2、p3决定，分成两种情况。
*     1.只有p1、p2、p3的状态都编程fulfilled，p的状态才会编程fulfilled，此时p1、p2、p3的返回值都成一个数组，传递给p的回调函数。
*     2.只要p1、p2、p3之中有一个被rejected,p的状态就编程了rejected.此时，第一个被reject的实例的返回值，会传递给p的回调函数。
* */
/*
const promise = [2,3,5,7,11,13].map(function (id) {
  return getJSON(url + id + '.json')
})
Promise.all(promise).then(function (posts) {

}).catch(function (reason) {

})
*/




/*
* Promise.race()
*   Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。
*     const promise = Promise.race([p1,p2,p3])
*   上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
* */


/*
* Promise.resolve()
*   有时需要将现有对象转为Promise对象，Promise.resolve方法就是起到这个作用。
*     const jsPromise = Promise.resolve($.ajax(url))
*   上面代码将JQ生成的deferred对象，转为一个新的Promise对象。
*   Promise.resolve等价于下面的写法
*
*   Promise.resolve('foo')
*   new Promise(resolve => resolve('foo'))
*   1.参数是一个Promise实例
*     如果参数是一个Promise实例，那么Promise.resolve将不做任何修改、原封不动的返回这个实例
*   2.参数是一个thenable对象
*     thenabele对象指的是具有then方法的对象，比如下面这个对象
*       let thenable = {
*         then: function(resolve, reject) { resolve(42)}
*       }
*   3.参数不是具有then方法的对象，或根本就不是对象。
*   4.不带任何参数
* */


/*
* Promise.reject()
*   Promise.reject方法也会返回一个新的Promise实例，该实例的状态为rejected。
* */
const p = Promise.reject('出错了')
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
p.then(null, function (s) {
  console.log(s)
})















































