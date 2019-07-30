/*
* Iterator和for...of循环
* */

/*
* 1.Iterator(遍历器)的概念
*   JS原有的表示集合的数据结构，主要是数组(Array)和对象(Object)，ES6又添加了Map和Set。这样就有四种是数据集合。用户还可以组合使用他们。
*   定义自己的数据结构，比如数组的成员是Map,Map的成员是对象等等~这就需要一种统一的接口机制
* */
/*
* 遍历器是这样一种机制，它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署了Iterator接口，就可以完成遍历操作
* (即一次处理该数据结构的所有成员)
*
* Iterator的作用有三个：一是为各种数据结构，提供一个统一的，简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了新的
* 遍历命令for...of循环。Iterator接口主要供for...of消费。
*
*
* Iterator的遍历过程是这样的：
*   1、创建有一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上就是一个指针对象。
*   2、第一次调用指针对象的next方法，可以将指针指向数据结构的第一成员。
*   3、第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
*   4、不断调用指针对象的next方法，直到它指向数据结构的结束为止。
* 每一次调用next方法，都会返回数据结构的当前成员信息。具体来说，就是返回一个包含value和key两个属性的对象。
*
* */

/*
* 默认Iterator接口
*   Iterator接口的目的，就是为了所有数据结构，提供一种统一的访问机制，即for...of循环。当使用for..of循环遍历某种数据结构时，该循环会自动
* 去寻找Iteraotr接口。
*
*   一种数据结构只要部署了Iterator接口，我们就称这种数据结构时可遍历的。
*
*   原生具备Iterator接口的数据接口如下：
*     Array
*     Map
*     Set
*     String
*     TypedArray
*     函数的arguments对象
*     NodeList对象
* */

/*
* 调用Iterator接口的场合
*   1、解构赋值
* */
let set = new Set().add('a').add('b').add('c')
let [x, y] = set
let [firist, ...rest] = set
console.log(firist)
console.log(rest)


/*
* for...of循环
*    JS原有for...in循环，只能获得对象的键名，不能直接获取键值，ES6提供for...of循环，允许遍历获得键值。
*
* */

/*
* JS几种循环遍历语法
*  1.for循环
*     for(let index = 0l index < myArray.length; index++) {
*       console.log(index)
*     }
*   2.这种写法比较麻烦，因此数组提供了内置的forEach方法
*     myArray.forEach(function(value){
*       console.log(value)
*     })
*   这种写法问题在于无法中途跳出forEach循环，break命令或return命令都不能奏效
*   3.for...in循环可以遍历数组的键名
*     for(let index in myArray) {
*       console.log(myArray[index])
*     }
*   for..in循环有几个缺点。1.数组的键名是数组，但for...in循环以字符串作为键名'1'，'2' '3'。。。
*     2.for...in循环不仅遍历数字简明，还会遍历手动添加的其他键，包括原型链上的键
*     3.某些情况下，for...in循环会以任意顺序遍历键名。
*   总之for...in是为遍历对象Object设计的，不适合用于遍历数组。
*
*   4.for...of循环 相比上面几种做法，有一些显著优点：
*       for(let value of myArray) {
*         console.log(value)
*       }
*       --有着同for...in一样简介的语法，但是没有for...in那样的缺点
*       --不同于forEach方法，它可以与break、continue和return配合使用
*       --提供了遍历所有数据结构的同一操作接口
* */
let arr1 = new Array()
arr1.length = 100000000
console.time()
for(let i = 0; i < arr1; i++) {

}
console.timeEnd()
let arr = new Array()
arr.length = 100000000
console.time()
for(let value of arr) {

}
console.timeEnd()

/*
* 上面例子中可以发现，for循环的效率比for...of效率是要高很多的~
* */















































