/*
* Class的继承
*  Class可以通过extends关键字实现继承，这比ES5通过修改原型链实现继承要清晰和方便很多。
* */
class Point {
}
class ColorPoint extends Point {
}

/*
* super关键字
*   super关键字，即可以当作函数使用，也可以当做对象使用。
*
* 第一种情况，super作为函数调用时，代表父类的构造函数。ES6要求，子类的构造函数必须执行一次super函数
* */

class A {}

class B extends A{
  constructor () {
    super()
  }
}

/*
* 子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则JS引擎会报错。
* super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于
* A.prototpye.constructor.call(this)
* */
