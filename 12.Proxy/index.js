/*
* Proxy
*   概述
*   Proxy用于修改某些操作的默认行为，等同于在语言层面上做出修改，所以术语一种"元编程"，即对编程语言进行编程。
* Proxy可以理解成，在目标对象之前架设一层"拦截"，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，
* 可以对外界的访问进行过滤和改写。
* */
let obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting${key}!`)
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, value, receiver) {
    console.log(`setting${key}!`)
    return Reflect.set(target, key, value, receiver)
  }
})
obj.count = 1
++obj.count

/*
* 上面代码说明，Proxy实际上重载了点运算符，即用自己的定义覆盖了语言的原始定义
* ES6原生提供Proxy构造函数，用来生成Proxy实例
*   let proxy = new Proxy(target, handler)
* Proxy对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，
* target参数表示所要拦截的目标对象，handler对象也是一个对象，用来定制拦截行为。
* */

let proxy = new Proxy({}, {
  get: function (target, property) {
    return 35
  }
})

console.log(proxy.time)
console.log(proxy.name)
console.log(proxy.title)

/*
* 上面代码中，作为构造函数，Proxy接受两个参数。第一个参数是索要代理的目标对象（如果没有Proxy的介入，操作原来访问的就是这个对象）
* 第二个参数，是一个配置对象，对于每一个被代理的操作，都需要提供一个对应的处理函数，该函数将拦截对应的操作。
* */

/*
* 同一个拦截器函数，可以设置拦截多个操作
* */
var handler = {
  get: function (target, name) {
    if(name === 'prototype') {
      return Object.prototype
    }
    return 'Hello,' + name
  },
  apply: function (target, thisBinding, args) {
    return args[0]
  },
  construct: function (target, args) {
    return {value: args[1]}
  }
}
var fproxy = new Proxy(function (x, y) {
  return x + y
}, handler)
console.log(fproxy.prototype === Object.prototype)

/*
* Proxy支持的拦截操作一共有13种
*   1. get(target, propKey, receiver): 拦截对象属性的读取，比如proxy.foo和proxy['foo']
*   2. set(target, propKey, value, recevier): 拦截对象属性的设置。返回布尔值
*   3. has(target, propKey):拦截propKey in proxy的操作，返回布尔值
*   4. deleteProperty(target, propKey):拦截 delete proxy[propKey]的操作返回布尔值
*   5. ownKeys(target):拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys、
*   for...in循环，返回一个数组。
*   6. getOwnPropertyDescriptor(target, propKey): 拦截Object.getOwnPropertyDescriptor(proxy, propKey)。返回属性描述对象
*   7. defineProperty(target, propKey, propDesc):拦截Object.defineProperty(),Object.definedProperties,返回一个布尔值。
*   8. preventExtensions(tarfget): 拦截Object.preventExtensions(proxy),返回布尔值
*   9. getPrototypeOf(TARGET): 拦截Object.getPrototypeOf(proxy),
*   10.isExtensible(target)
*   11.setPrototypeOf(target, proto)
*   12.apply(target, object, args)
*   13.construct(target, args)
* */



















