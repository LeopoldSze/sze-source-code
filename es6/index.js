/**
 * 没有块级作用域
 */
// 1.内层变量覆盖外层变量
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world'; // 这里会有变量提升
  }
}
f(); // undefined

// 2.计数变量泄露为全局变量
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
// for循环外面打印
console.log(i); // 5


/**
 * es6块级作用域
 */
{
  let a = 10;
  var b = 1;
}
console.log(b); // 1
// console.log(a); // Uncaught ReferenceError: a is not defined


/**
 * 解构赋值
 */
{
  const names = ['leopold', 'sze']
  const [first, last] = names
  console.log('数组解构：', first, last)
}


/**
 * 对象拓展
 */
{
  console.log('对象拓展：', Object.is(NaN, NaN))
  console.log('对象拓展：', Object.is(0, '0'))
  console.log('对象拓展：', Object.is(0, -0))
  const a = { name: 'sze' }
  console.log('对象拓展：', Object.is(a, a))
}
{
  const source = {
    name: 'sze',
    age:  20
  }
  
  const target = Object.assign({}, {
    ...source,
    addMethod() {
      console.log('this is target addMethod')
    }
  })
  
  console.log('target:', target)
  target.addMethod()
}


/**
 * 数组扩展
 */
// Array.from
{
  const arrLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
  }
  
  // ES5
  const arr1 = [].slice.call(arrLike)
  // ES6
  const arr2 = Array.from(arrLike)
  const arr3 = Array.from(arrLike, item => `${item} - hello`)
  console.log('数组扩展：', arr1, arr2, arr3)
}

// for - of
{
  const arr = [11, 22, 33]
  for (const item of arr) {
    console.log('item:', item)
  }
}

// flat
{
  const arr1 = [0, 1, 2, [3, 4]];
  console.log(arr1.flat());  //  [0, 1, 2, 3, 4]
  const arr2 = [0, 1, 2, [[[3, [4]], 5], 6]];
  console.log(arr2.flat(2));  //  [0, 1, 2, [3, 4]]

//使用 Infinity，可展开任意深度的嵌套数组
  const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
  console.log(arr4.flat(Infinity)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// flat()方法会移除数组中的空项:
  const arr5 = [1, 2, , 4, 5];
  console.log(arr5.flat()); // [1, 2, 4, 5]
}


/**
 * for await of
 */
{
  function TimeOut(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(time)
      }, time)
    })
  }
  
  async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for await (let item of arr) {
      console.log(Date.now(), item)
    }
  }
  test()
}


/**
 * URLSearchParams
 */
{
  const queryString = "?name=jimmy&age=18&height=1.88"
  const params = new URLSearchParams(queryString)
  const arr = Object.fromEntries(params)
  console.log('params:', arr)
}


/**
 * try catch
 */
{
  try {
    throw new Error()
  } catch {
    console.log('错了')
  }
}

/**
 * globalThis
 */
{
  console.log('globalThis:', globalThis)
}


/**
 * ES2021
 */
{
  let a = 1
  let b = 0
  a &&= 2
  b &&= 3
  console.log('a:', a, b)
}
