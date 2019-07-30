/*
* JS语言，生成实例对象的传统方法是通过构造函数。例如：
* */
function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')'
}

var p = new Point(1, 2)

/*
* ES6提供婆娘个了更接近传统语言的写法，通过class关键字，可以定义类。
*
* 基本上，ES6的class可以看做只是一个语法糖，它的绝大多数功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰，更像面向对象编程
* 的语法而已。
* */
class Point1 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}


class Point2 {
  constructor() {
  }
  toString(){
  }
  toValue(){
  }
}
// 等同于
/*Point3.prototype = {
  constructor(){
  },
  toString(){
  },
  toValue(){}
}*/

/*
* 注意点：
*   1.严格模式
*     类与模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
*   2.不存在变量提升
*     类不存在变量提升
*   3.name属性
*     由于本质上，ES6的类知识ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性
*   4.Generator方法
*     如果某个方法之前加上星号(*)，就表示该方法是一个Generator函数。
*   5.this指向
*     类的方法内部如果含有this,它默认指向类的实例。
*
* */



/*
* 静态方法
*     类相当于实例的原型，所有的类中定义的方法，都会被实例继承。如果一个方法前，加上static关键字，就表示该方法不会被实例继承，
* 而是直接通过类来调用，这就称为'静态方法'。
* */
class Foo5 {
  static classMethod() {
    return 'hello'
  }
}

console.log(Foo5.classMethod())

let foo5 = new Foo5
console.log(foo5.classMethod)






















































