Function.prototype.before = function (beforeFn) {
  const __self = this;
  console.log('before this:', this);
  
  return function () {
    beforeFn.apply(this, arguments); // 执行新函数，修正 this
    return __self.apply(this, arguments); // 执行原函数
  }
}

Function.prototype.after = function (afterFn) {
  const __self = this;
  console.log('after this:', this);
  
  return function () {
    const ret = __self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}

function fuc () {
  console.log(2);
}

fuc = fuc.before(function () {
  console.log(1)
}).after(function () {
  console.log(3);
})

fuc();