/*
* Reflect
*   概述
*   Reflect对象与Proxy一样，也是ES6位操作对象提供的新API。
*   Reflect对象设计的目的有以下几个：
*     1.将Object对象的一些明显属于语言内部的方法(比如：Object.defineProperty),放到Reflect对象上。现阶段，某些方法同时在Object和
*     Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
*     2.修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误
*     而Reflect.defineProperty(obj, name, desc)则会返回false.
*     3.让Object操作都变成函数行为。某些Object操作是命令式的，比如 name in obj和delete obj[name],而Reflect.has(obj, name)和
*     Reflect.deleteProperty(obj, name)让它们编程了函数行为。
*     4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便
*     地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改，你总可以在Reflect上获得默认行为。
* */
let loggedObj = new Proxy(obj, {
  get(target, name){
    console.log('get', target, name)
    return Reflect.get(target, name)
  },
  deleteProperty(target, name) {
    console.log('delete' + name)
    return Reflect.deleteProperty(target, name)
  },
  has(target, name) {
    console.log('has' + name)
    return Reflect.has(target, name)
  }
})

/*
* 上面代码中，每一个Proxy对象的拦截操作(get, delete, has)，内部都调用对应的Reflect方法，保证原生行为能够正确的执行。添加工作，就是将
* 每个操作出书一行日志。
* 有了Reflect对象后，很多操作都会更易读
* */
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1


/*
* Reflect对象一共有13个静态方法，
*   1.Reflect.apply(target, thisArg, args)
*   2.Reflect.construct(target, args)
*   3.Reflect.get(target, name, receiver)
*   4.Reflect.set(target, name, value, receiver)
*   5.Reflect.defineProperty(target, name, desc)
*   6.Reflect.deleteProperty(target, name)
*   7.Reflect.has(target, name)
*   8.Reflect.ownKeys(target)
*   9.Reflect.isExtensible(target)
*   10.Reflect.prenventExtension(target)
*   11.Reflect.getOwnPropertyDescriptor(target, name)
*   12.Reflect.getPropertyOf(target)
*   13.Reflect.setPropertyOf(target, prototype)
*
* 上面这些方法的作用，跟Object,以及Proxy对象的方法是一一对应的。
* */
