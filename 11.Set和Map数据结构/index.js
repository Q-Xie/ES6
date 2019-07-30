/*
* Set 和 Map 数据结构
* */
/*
* 1.Set
*   基本用法
*     ES6提供了新的数据结构Set.类似于数组，但是成员的值都是唯一的，没有重复的值。
*   Set本身是一个构造函数，用来生成Set数据结构。
*
* Set实例的属性和方法
*   - Set.prototype.constructor: 构造函数，默认就是Set函数
*   - Set.prototype.size：返回Set实例的成员总数
*   - Set.prototype.add(value): 添加某个值，返回Set结构本身。
*   - Set.prototype.delete(value): 删除某个值，返回一个布尔值，表示删除是否成功
*   - Set.prototype.has(value): 返回一个布尔值，表示该值是否为set的成员。
*   - Set.prototype.clear():清除所有成员，没有返回值。
* */
let s = new Set()
s.add(1).add(2).add(2)
console.log(s)
console.log(s.size)
console.log(s.has(1))
console.log(s.has(2))
console.log(s.has(3))
console.log(s.delete(2))
console.log(s.has(2))

/*
* Array.from方法可以将Set结构转为数组。
* */
const items = new Set([1,2,3,4,5])
const array = Array.from(items)
console.log(array.length)

/*
* 遍历操作
*   Set结构的实例有四种遍历方法，可以用于遍历成员
*     -- Set.prototype.keys(): 返回键名的遍历器
*     -- Set.prototype.values(): 返回键值的遍历器
*     -- Set.prototype.entries(): 返回键值对的遍历器
*     -- Set.prototype.forEach(): 使用回调函数遍历每个成员
*  需要特别指出的是，Set的遍历顺序就是插入顺序。
* */
let set1 = new Set(['red', 'green', 'blue'])
for(let item of set1.keys()) {
  console.log(item)
}
for (let item of set1.values()) {
  console.log(item)
}
for(let item of set1.entries()) {
  console.log(item)
}
set1.forEach((value,key) => console.log(key + ':' + value))


/*
* WeakSet
*   WeakSet结构与Set类型，也是不重复的值的集合。它与Set有两个区别。
*     首先，WeakSet的成员只能是对象，而不能是其他类型的值。
*     其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不引用该对象，那么垃圾回收机制
*  会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。
* */




/*
* Map
*   js的对象，本质上就是键值对的集合(Hash结构)，但是传统上只能用字符串当键，这给它的使用带来了很大的限制。
* */












