/*
* Promise基础知识
*   一、Promise对象有三种状态，它们分别是：
*     1，pending:等待中，或者进行中，表示还没有得到结果
*     2,resolved(fulfilled):已经完成，表示得到了我们想要的结果，可以继续往下执行。
*     3，rejected：也表示得到 结果，但是由于结果并非我们所愿，因此拒绝执行。
*   这三种状态不受外界影响，而且状态只能从pending改变为resolve或者rejected，并且不可逆。在Promise对象的构造函数中，将一个函数作为
*   第一个参数，而这个函数，就是用来处理Promise的状态变化
* */
/*new Promise(function (resolve, reject) {
  if(true){
    resolve()
  } else {
    reject()
  }
})*/

/*
*   二、Promise对象中then方法，可以接收构造函数中处理的状态变化，并分别对应执行。then方法有2个参数，第一个函数接收resolved状态的执行
*   第二个参数接收reject状态的执行
* */
/*function fn(num) {
  return new Promise(function (resolve, reject) {
    if (typeof num === 'number') {
      resolve()
    } else {
      reject()
    }
  }).then(function () {
    console.log('参数是一个number值')
  }, function () {
    console.log('参数不是一个number值')
  })
}

fn('hahha')
fn(1234)*/

/*
* then(null, function(){})就等同于catch(function(){})
* */

/*
*  三、Promise中的数据传递
* */
let fn = function (num) {
  return new Promise(function (resolve, reject) {
    if (typeof num === 'number') {
      resolve(num)
    } else {
      reject('TypeError')
    }
  })
}
fn(2).then(function (num) {
  console.log('first:' + num)
  return num + 1
})
  .then(function (num) {
    console.log('second:' + num)
    return num + 1
  })
  .then(function (num) {
    console.log('third:' + num)
  })




/*
* 利用Promise的知识，对最开始的ajax的例子尽心给一个简单的封装。看看会是什么样子
* */
let url = 'https:asdfasdfasdfa/kaldfa/adfasdf'
function getJSON(url) {
  return new Promise(function (resolve, reject) {
    let XHR = new XMLHttpRequest()
    XHR.open('GET', url, true)
    XHR.send()

    XHR.onreadystatechange = function () {
      if (XHR.readyState === 4) {
        if (XHR.status === 200) {
          try {
            let response = JSON.parse(XHR.responseText)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(new Error(XHR.statusText))
        }
      }
    }
  })
}
getJSON(url).then(resp => console.log(resp))

/*
* 现在所有库几乎都将ajax请求利用Promise进行了封装，因此我们在使用JQ等库中的ajax请求时，都可以利用Promise来让我们的代码更加优雅和简单
* 这也是Promise最常用的一个场景，因此我们一定要非常熟悉它，这样才能在应用的时候更加灵活。
* */


/*
* Promise.all
*   当有一个ajax请求，它的参数需要另外2个甚至更多请求都返回结果之后才能确定，那么这个时候，就需要用到Promise.all来帮助我们应对这个场景。
* Promise.all接收一个Promise对象组成的数组作为参数，当这个数组所有的Promise对象状态都编程resolved或者rejected的时候，它才会去调用
* then方法。
* */
/*
let url = 'https://asdlfkalsdf/alksjd/flaakl
let url2 = 'https://asdf/adf/adsf/adf/adfasdf'
function renderAll() {
  return Promise.all([getJSON(url), getJSON(url2)])
}
renderAll().then(function (value) {
  console.log(value)
})
*/

/*
* Promise.race
*   与Promise.all相似的是，Promise.race都是以一个Promise对象组成的数组作为参数，不同的是，只要当数组中的其中一个Promise状态
*   变成resolved或者rejected时，就可以调用.then方法了。而传递给then方法的值也会有所不同。
* */
/*function renderRace() {
  return Promise.race([getJSON(url), getJSON(url2)])
}

renderRace().then(function (val) {
  console.log(val)
})*/



/*
* 一、实现串行任务队列
*   任务队列是指A完成了调用B，B完成了调用C，以此类推~~以前的做法是嵌套回调。
* */
/*taskA(data1, function (res) {
  if(res.status === 'ok') {
    taskb(data2, function (res) {
      if(res.status === 'ok') {
        taskc(data3, function (res) {
          // ....
        })
      }
    })
  }
})*/

/*
* 期间，每一步都可能出错，错误处理也可能不同，代码结构就会变得非常臃肿。这就是网上常说的'回调地狱'
*
* Promise最明显的效果就是消除这种回调地狱，代码不会再横向发展：
* */
/*taskA(data1).then(taskB, errHandler1)
taskB(data2).then(taskC, errHandler2)
taskC(data3).then(() => {}, () =>{})*/




/*
* 三、实现串行任务管道
*   任务管道是指当前任务的输出可以作为下一个任务的输入，形成一条数据管道。
*   JQ代码类似于
* */
/*$.post(url1, data, function (res) {
  if (res.status === 'ok') {
    $.post(url2, res.data, function (res) {
      if (res.status === 'ok') {
        $.post(url3, res.data, function (res) {

        })
      }
    })
  }
})*/

/*
* 上面代码用Promise可以这样实现
* */

/*new Promise(function (resolve, reject) {
  resolve(1)
}).then(function (res) {
  return new Promise(function (resolve, reject) {
    resolve(res+1)
  })
}).then(function (res) {
  return new Promise(function (resolve, reject) {
    resolve(res + 1)
  })
}).then(function (res) {
  console.log(res)
})*/









































