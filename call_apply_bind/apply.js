/**
 * myApply
 * @param context
 * @returns {*}
 */
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  
  let result = null;
  context = context || window;
  // 与上面代码相比，我们使用 Symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  
  // 执行要被调用的方法
  if (arguments[1]) {
    if (
        arguments[1] instanceof Array ||
        // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
        Object.prototype.toString(arguments[1]) === "[object Array]"
    ) {
      result = context[fnSymbol](...arguments[1]);
    } else {
      throw new Error('参数类型错误')
    }
  } else {
    result = context[fnSymbol]();
  }
  delete context[fnSymbol];
  return result;
};

const obj = {
  name: 'Sze'
}

function t () {
  console.log('name:', this.name, arguments);
}

t.myApply(obj, [1, 2]);