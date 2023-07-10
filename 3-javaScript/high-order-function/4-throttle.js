const throttle = function (fn, interval) {
  const __self = fn; // 保存需要被延时执行的函数引用
  let timer; // 定时器
  let firstTime = true; // 是否是第一次调用
  
  return function () {
    const args = arguments;
    const __me = this;
    
    // 如果是第一次调用，不需要延时执行
    if (firstTime) {
      __self.apply(__me, args);
      return firstTime = false;
    }
    
    // 如果定时器还在，说明前一次延迟执行还没有完成
    if (timer) return false;
    
    // 延长执行
    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);
    }, interval || 500);
  }
};

window.onresize = throttle(function (e) {
  console.log('窗口大小改变:', e);
}, 500);