/*
* 1、String.fromCodePoint()
*  ES5提供了String.fromCharCode()方法，用于从Unicode码点返回对应字符，但是这个方法不能识别码点大于0xFFFF的字符。
*  如果Striing.fromCodePoint()方法有多个参数，则它们会被合并成一个字符串返回
* */

/*
* 2、String.raw()
*   ES6还为原生的String提供了一个raw()方法。该方法返回一个斜杠都能被转义（即斜杠前面再加一个斜杠）的字符串，往往会用于
*   模板字符串的处理方法。
* */
console.log(String.raw`Hi\n ${2+3}`)

/*
* String.raw()方法可以作为模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。
* */

/*
* String.raw()方法也可以作为正常的函数使用。这时，它的第一个参数应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。
* */
console.log(String.raw({raw: 'test'}, 0, 1, 2))
// 等同于
console.log(String.raw({raw:['t','e','s','t']}, 0,1,2))

/*
* 作为函数，String.raw()的代码实现基本如下
* */
String.raw = function (strings, ...values) {
  let output = ''
  let index
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index]
  }
  output += strings.raw[index]
  return output
}

/*
* 3、实例方法：codePointAt()
* codePointAt()方法能够正确处理4个字节存储的字符，返回一个字符的码点。chartCodeAt()只能处理两个字节的字符。
* */

/*
* 4、实例方法：normalize()
*   normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。
*     normalize方法可以接受一个参数来指定normalize的方式，参数的四个可选值如下：
*       NFC: 默认参数，表示标准等价合成，返回多个简单字符的合成字符。所谓标准等价指的是视觉和语义上的等价
*       NFD: 表示标准等价分解，即在标准等价的前提下，返回合成字符分解的多个简单字符。
*       NFKC，表示兼容等价合成。返回合成字符，所谓兼容等价，指的是语义上存在等价，但视觉上不等价，比如囍跟喜喜
*       NFKD，表示兼容等价分解。即在兼容等价的前提下，返回合成字符分解的多个简单字符。
* */

/*
* 5.实例方法：includes()、startsWith()、endsWith()
*   传统JS上只提供了indexOf()方法，可以用来确定一个字符串是否包含在另外一个字符串中。
*   ES6提供了新的三种方法：
*     includes():返回布尔值，表示是否找到了参数字符串
*     startWith():返回布尔值，表示参数字符串是否在原字符串的头部
*     endsWith():返回布尔值，表示参数字符串是否在原字符串的尾部
*   三个方法都支持第二个参数，表示开始搜索的位置。
* */
let s = 'hello world!'
console.log(s.startsWith('hello'))
console.log(s.endsWith('!'))
console.log(s.includes('o'))

let s1 = 'hello world!'
console.log(s1.startsWith('world', 6))
console.log(s1.endsWith('hello', 5))
console.log(s1.includes('hello', 5))


/*
* 在第二个参数中，endsWith的行为与其他两个方法有所不同，它针对前面n个字符，而其他两个方法针对从地n个位置直到字符串结束
* */


/*
* 实例方法：repeat()
*   repeat方法返回一个新字符串，表示将原字符串重复n次
*   参数如果是小数，会向下取整，如果参数是负数或者Infinty会报错。
* */

/*
* 实例方法：padStart()、padEnd()
*   ES2017引入字符串不全长度功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()
*   用于尾部补全。
* */
console.log('x'.padStart(5, 'ab'))
console.log('x'.padEnd(5, 'ab'))
console.log('11'.padStart(2, '0'))
/*
* padStart跟padEnd一共接收两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
* 如果原字符串长度大于或等于最大长度，则字符串不全不生效，返回原字符串。
* */

/*
* 8、实例方法：trimStart()，trimEnd()
*   ES2019对字符串实例新增了trimStrat和trimEnd这两个方法，它们的行为与trim()一致。
*   trimStart消除字符串头部空格
*   trimEnd消除字符串尾部空格
*
*   除了空格键，tab键，换行符等等不可见的空白符号都有效
*
*   浏览器还部署了trimLeft和trimRight两个方法，分别对应trimStart跟trimEnd。
* */


/*
* 实例方法：machAll()
*   machAll()方法返回一个正则表达式在当前字符串的所有匹配。
* */



























