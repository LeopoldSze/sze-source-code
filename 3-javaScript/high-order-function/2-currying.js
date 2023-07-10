/**
 * 闭包实现
 * @type {(function(): (number|undefined))|*}
 */
const cost = (function () {
  const args = [];
  
  return function () {
    if (!arguments.length) {
      let money = 0;
      for (let i = 0; i < args.length; i++) {
        money += args[i];
      }
      return money;
    } else {
      Array.prototype.push.apply(args, arguments);
    }
  }
})();

cost(100);
cost(200);
cost(310);
console.log('cost:', cost());

/**
 * 柯里化实现
 * @param fn
 * @returns {(function(): (Function))|*}
 */
const currying = function (fn) {
  const args = [];
  
  return function () {
    if (arguments.length) {
      Array.prototype.push.apply(args, arguments);
      return arguments.callee;
    } else {
      return fn.apply(this, args);
    }
  }
}

const cost2 = (function () {
  let money = 0;
  
  return function () {
    for (let i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }
    return money;
  }
})();

const cost_currying = currying(cost2);
cost_currying(1);
cost_currying(2);
console.log('cost_currying:', cost_currying());