/**
 * bind 函数
 * @desc 接受一个函数参数和一个上下文对象参数，返回一个可以返回改变this指向执行结果的函数
 * @param fn
 * @param thisArg
 * @returns {function(...[*]): *}
 */
export default function bind(fn, thisArg) {
  return function wrap(...args) {
    return fn.apply(thisArg, args);
  }
}
