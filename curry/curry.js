// 多参数柯里化
function curry (fn) {
  return function curriedFn(...args) {
    console.log('l:', fn.length, args.length, fn, args)
    if (args.length < fn.length) {
      return function () {
        return curriedFn(...args.concat([...arguments]));
      }
    }
    return fn(...args);
  }
}
const fn = (x, y, z ,a) => x + y + z + a;
const myfn = curry(fn);
console.log(myfn(1)(2)(3)(1));

/**
 * 函数柯里化
 * @param fn
 * @param bindArgs
 * @returns {any}
 */
function currying(fn, ...bindArgs) {
  return (...args) => {
    const allArgs = [...bindArgs, ...args]
    console.log('参数：', bindArgs, args, allArgs)
    if (allArgs.length < fn.length) {
      return currying(fn, ...allArgs)
    } else {
      return fn(...allArgs)
    }
  }
}

const sum = (a, b, c, d) => a + b + c + d

console.log('currying:', currying(sum)(1)(2)(3)(4))
console.log('currying:', currying(sum, 1)(2, 3)(4))
console.log('currying:', currying(sum, 1, 2)(3)(4))
console.log('currying:', currying(sum, 1, 2)(3, 4))
console.log('currying:', currying(sum, 1, 2, 3)(4))