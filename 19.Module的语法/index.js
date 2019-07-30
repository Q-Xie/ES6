/*
* 在ES6之前，社区指定了一些模块加载的方案，最主要的有CommonJS和AMD两种，前者用于服务器，后者用于浏览器。
* ES6在语言标准的层面上，实现了模块的功能，而且实现的相当简单，完全 可以去掉CommonJS和AMD规范。成为通用的
* 解决方案
* */
// ES6模块
import { stat, exists, readFile } from 'fs'
/*
* 上面代码实质从fs模块中加载3个方法。其他方法不加载。这种加载成为编译时加载，或者静态加载。
* */

/*
* export命令
*   模块功能主要由两个命令构成: export和import.export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
*
* 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
* */
export var firstName = 'Michael'
export let lastName = 'Jackson'
export let year = 1999

/*
* 上面export命令对外输出了三个变量。export写法，还可以像下面这样写
* */
export { firstName, lastName, year }

/*
* 通常情况下，export输出的变量名就是本来的名字，但也可以通过as关键字来进行重命名
* */
function v1 (){}
function v2() {

}
export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
}

/*
* 重命名了函数v1和v2。重命名后，v2可以用不同的名字输出2次。
*
* 需要注意的是，export命令规定是对外接口，所以必须与模块内部的变量建议一一对应的关系。
* */

/*
* 模块的整体加载
* */
import * as cricle from './circle'
/*
* 除了指定加载某个输出值之外，还可以使用整体加载，即用星号指定一个对象，所有处处都加载在这个对象上面。
* */

/*
* export default 命令
* 为了给用户提供方面，指定模块的默认输出。
* */
// export-default.js
export default function () {
  console.log('foo')
}

import customName from  './export-default.js'

customName() // foo
