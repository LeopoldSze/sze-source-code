/**
 * 方法1
 * @returns {function(): any}
 */
Function.prototype.uncurrying = function () {
  const __self = this;
  
  return function () {
    const obj = Array.prototype.shift.call(arguments);
    return __self.apply(obj, arguments);
  }
}

/**
 * 方法2
 * @returns {function(): any}
 */
Function.prototype.uncurrying2 = function () {
  const __self = this;
  
  return function () {
    return Function.prototype.call.apply(__self, arguments);
  }
}

const push = Array.prototype.push.uncurrying();

(function () {
  push(arguments, 4);
  console.log('arg:', arguments); // [1, 2, 3, 4]
})(1, 2, 3);