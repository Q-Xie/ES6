/*
* Promise的声明
*   1.由于new Promise((resolve, reject) => {}),所以传入的一个参数(函数)，executor，传入就执行。
*   2.executor里面有两个参数，一个是resolve,一个是reject。
*   3.由于resolve和reject可执行，所以都是函数，我们用let声明。
* */
class Promise {
  // 构造函数
  constructor(executor) {
    // 成功
    let resolve = () => {}
    // 失败
    let reject = () => {}
    // 立即执行
    executor(resolve, reject)
  }

}

/*
* 解决基本状态
*   Promise规定：
*     1.Promise存在三种状态(state)pending、fulfilled、rejected
*     2.pending(等待态)为初始状态，并可以转化为fulfilled(成功态)、rejected(失败态)
*     3.成功时，不可转为其他状态，且必须有一个不可改变的值(value)
*     4.失败时，不可转为其他状态，且必须有一个不可改变的原因(reason)
*     5.new Promise((resolve, reject) => {resolve(value)}) resolve为成功，接收参数value,状态改变为fulfilled。不可再次改变
*     6.new Promise((resolve, reject) => {reject(reason)}) reject为失败，接收参数reason，状态改变为rejected。不可再次改变
*     7.若是executor函数报错 直接执行reject()
* */
class Promise {
  constructor(executor) {
    // 初始化state为等待状态
    this.state = 'pending'
    // 成功值
    this.value = undefined
    // 失败值
    this.reason = undefined

    this.resolve = (value) => {
      // state改变，resolve调用就会失败
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态
        this.state = 'fulfilled'
        // 存储成功值
        this.value = value
      }
    }

    this.reject = (reason) => {
      // state改变，reject调用就会失败
      if(this.state === 'pending') {
        // reject调用后，state转化为失败态
        this.state = 'rejected'
        // 储存失败的原因
        this.reason = reason
      }
    }

    // 如果exexutor执行报错，直接reject
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
}


/*
* then方法
*   Promise规定：Promise有一个叫做then的方法，里面有两个参数：onFulfilled，onRejected，成功有成功的值，失败有失败的原因。
*     1.当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.reason
*     2.onFulfilled，onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数
* */
class Promise{
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
      }
    }

    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFufilled, onRejected) {
    // 状态
    if (this.state === 'fulfilled') {
      onFufilled(this.value)
    }
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }
  }
}


/*
* 解决异步实现
*   现在基本可以实现简单的同步代码，但是当resolve在setTimeout内执行，then时state还是pending等待状态 我们就需要在
* then调用的时候，将成功和失败存到个字的数组，一旦reject或者resolve，就调用它们。
*   类似于发布订阅，先将then里面的两个函数存储起来，由于promise可以有多个then，所以存在同一个数组内。
* */
class Promise {
  constructor(execcutor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined

    // 成功存放的数组
    this.onResolvedCallbacks = []

    // 失败存放的数组
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      if(this.state === 'pending') {
        this.value = value
        this.state = 'fulfilled'
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
      if(this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      execcutor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled'){
      onFulfilled(this.value)
    }
    if(this.state === 'rejected') {
      onRejected(this.reason)
    }

    // 当状态state为pending时
    if(this.state === 'pending') {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })

      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}



/*
* 解决链式调用
*   我们常常用到的new Promise().then().then()，这就是链式调用，用来解决回调地狱。
*
*     1.为了达成链式，我们默认在第一个then里返回一个promise。promise规定了一种方法，就是在then
*   里面返回一个新的promise，称为promise2，promise2 = new Promise((resolve, reject)=>{})
*       .将这个promise2返回的值传递到下一个then中
*       .如果返回一个普通的值，则将普通的值传递给下一个then中
*     2.当我们在第一个then中return了一个参数(参数未知，需判断)。这个return出来的新的promise就是
*   onFulfilled()或者onRejected()的值。
*
*   promise规则规定onFulfilled()或者onRejected()的值，即第一个then返回值，叫做x，判断x的函数叫做
*   resolvePromise
*      .首先，要看x是不是promise
*      .如果是promise，则取它的结果，作为新的promise2成功的结果
*      .如果是普通值，直接作为promise2成功的结果。
*      .所以要比较x和promise2
*      .resolvePromise的参数有promise2（默认返回的promise）、x(我们自己return的对象)、resolve、reject
*      .resolve和reject是promise2的
* */
class Promise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onRejectedCallbacks = []
    this.onResolvedCallbacks = []

    let resolve = value => {
      if(this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if(this.state === 'pending'){
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {

    let promise2 = new Promise(resolve, reject => {
      if(this.state === 'fulfilled') {
        let x = onFulfilled(this.value)
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2,x,resolve,reject)
      }

      if(this.state === 'rejected') {
        let x = onRejected(this.reason)
        resolvePromise(promise2, x, resolve, reject)
      }

      if(this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })

        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
    return promise2
  }
}


/*
* 完成resolvePromise函数
*   promise规定了一段代码，让不同的promise代码互相套用，叫做resolvePromise
*     .如果x === promise2，则会造成循环引用，自己等待自己完成，则报循环引用错误。
*       let p = new Promise(resolve => {resolve(0)})
*       let p2 = p.then(data => {return p2})
*    1.判断x
*         .Otherwise, if x is an object or functioin, Let then be x.then
*         .x不能是null
*         .x是普通值直接resolve(x)
*         .x是对象或函数(包括promise),let then = x.then 2、当x时对象或函数(默认是Promise)
*         .声明了then
*         .如果取then报错，则走reject()
*         .如果then是个函数，则用call执行then,第一个参数是this,后面是成功的回调和失败的回调。
*         .如果成功的回调还是promise,就递归继续解析 3、成功和失败只能调用一个所以设定一个called来防止多次调用。
* */

function resolvePromise(promis2, x, resolve, reject) {
  // 循环引用报错
  if(x === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cyclee detected for promise'))
  }
  // 防止多次调用
  let called
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then=x的then方法
      let then = x.then
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') {
        // 就让then执行 第一个参数是this, 后面是成功的回调 和 失败的回调
        then.call((x, y) => {
          // 成功和失败只能调用一个
          if (called) return
          called = true
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject)
        })
      }
    }
  }
}





































































