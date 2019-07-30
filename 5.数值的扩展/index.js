/*
* 二进制和八进制表示法
*   ES6提供了二进制和八进制的新的写法，分别用前缀0b(或者0B)和0o(或0O)表示。
* */


/*
* Number.isFinite()、Number.isNaN()
*   ES6在Number对象上，提供了新的Number.isFinite()和Number.isNaN()两个方法。
*   Number.isFinite()用来检查一个数值是否为有限的，即不是Infinity。
* 如果参数类型不是数值，Number.isFinite()一律返回false.
*
* Number.isNaN()用来检查一个值是否为NaN。
*   如果参数类型不是NaN，Number.isNaN一律返回false。
*
*  它们与传统的全局方法isFinite和isNaN的区别在于，传统方法先调用Number()将非数值转为数值，再进行判断。
*  而这两个方法是只对数值有效，Number.isFinite对于非数值一律返回false,Number.isNan只有对NaN才返回
*  true,非NaN一律返回false。
* */

/*
* Number.parseInt()、Number.parseFloat()
*   es6将全局方法parseInt跟parseFloat移植到Number对象上，行为保持不变
* */

/*
* Number.isInteger()
*   Number.isInteger()用来判断一个数值是否为整数。
* */
console.log(Number.isInteger(3))
console.log(Number.isInteger(2.3))
/*
* 整数和浮点数采用同样的存储方法，所以25和25.0被视为同一个值
* */
console.log(Number.isInteger(25))
console.log(Number.isInteger(25.0))

/*
* Number.EPSILON
*   ES6在Number对象上面，新增一个极小的常量Number.EPSILON.根据规格，它表示1与大于1的最小浮点数之间的差。
*   Number.EPSILON实际上是JS能够表示的最小精度，误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
* */

/*
* 安全整数和Number.isSafeInteger()
*   js能够准确表示的整数范围在-2^53到2^53之间超过这两个范围，无法精确表示这个值。
*
* ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量用来表示这个范围的上限跟下限。
* */

/*
* Math.trunc():表示去除一个数的小数部分，只留整数。
* Math.sign():方法用来判断一个数到底是正数、负数还是零。对于非数值，会先将其转换为数值。
* Math.cbrt():方法用于计算 一个数的立方根。
* Math.clz32():方法将参数转为32位无符号整数形式，然后返回这个32位值里面有多少个前导0
* Math.imul():方法返回两个数以32位带符号整数形式相乘的结果。Math.imul(2,4) = 8
* Math.fround():方法返回一个数的32位单精度浮点数形式。
* Math.hypot():方法返回所有参数的平方和平方跟
* */

