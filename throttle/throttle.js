// 使用时间戳
function throttle1(func, wait) {
  let preTime = 0;
  
  return function () {
    let nowTime = +new Date();
    let context = this;
    let args = arguments;
    
    if (nowTime - preTime > wait) {
      func.apply(context, args);
      preTime = nowTime;
    }
  };
}

// 定时器实现
function throttle2(func, wait) {
  let timeout;
  
  return function () {
    let context = this;
    let args = arguments;
    
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

function throttle (fn, delay) {
  let timer = null
  let startTime = Date.now()
  
  return function () {
    let curTime = Date.now() // 当前时间
    let remaining = delay - (curTime - startTime)  // 从上一次到现在，还剩下多少多余时间
    let context = this
    let args = arguments
    clearTimeout(timer)
    
    if (remaining <= 0) {
      fn.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remaining);
    }
  }
}
