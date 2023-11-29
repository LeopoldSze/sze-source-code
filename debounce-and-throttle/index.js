/**
 * 对比 throttle 来理解 debounce：
 * 在throttle的逻辑里，“第一个人说了算”，它只为第一个乘客计时，时间到了就执行回调。
 * 而 debounce 认为，“最后一个人说了算”，debounce 会为每一个新乘客设定新的定时器，直到时间间隔内没有事件触发。
 */

/**
 * 节流 - 时间间隔实现
 * @param fn
 * @param interval
 * @returns {(function(...[*]): void)|*}
 */
function intervalThrottle(fn, interval) {
  // 上一次触发回调的时间
  let last = 0;
  
  // 将throttle处理结果当做函数返回
  return function (...args) {
    // 保留调用时的this上下文
    const context = this;
    // 记录本次触发回调的时间
    const now = Date.now();
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      last = now;
      fn.apply(context, args);
    }
  }
}

/**
 * 节流 - 定时器实现
 * @param fn
 * @param interval
 * @returns {(function(...[*]): void)|*}
 */
function timerThrottle(fn, interval) {
  // 定时器
  let timer = null;
  
  // 将throttle处理结果当做函数返回
  return function (...args) {
    // 保留调用时的this上下文
    const context = this;
    
    // 如果定时器不存在，说明此刻距离上一次触发回调时长已大于时间间隔阈值
    if (!timer) {
      timer = setTimeout(function () {
        // 回调触发时清空定时器任务
        timer = null;
        fn.apply(context, args);
      }, interval);
    }
  }
}

/**
 * 节流 - 优化版
 * @param fn
 * @param delay
 * @returns {(function(...[*]): void)|*}
 */
function bestThrottle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0, timer = null
  
  // 将throttle处理结果当作函数返回
  return function (...args) {
    // 保留调用时的this上下文
    let context = this
    // 记录本次触发回调的时间
    let now= Date.now();
    
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now;
      fn.apply(context, args);
    }
  }
}

/**
 * 节流
 * @param fn
 * @param interval
 * @param args
 * @returns {(function(...[*]): void)|*}
 */
function throttle(fn, interval, ...args) {
  if (args.length && args[0] === 'timer') {
    return timerThrottle(fn, interval);
  }
  
  if (args.length && args[0] === 'interval') {
    return intervalThrottle(fn, interval);
  }
  
  return bestThrottle(fn, interval);
}

/**
 * 防抖 - 基础版
 * @param fn
 * @param interval
 * @returns {(function(...[*]): void)|*}
 */
function baseDebounce(fn, interval) {
  // 定时器
  let timer = null;
  
  return function (...args) {
    // 保留调用时的this上下文
    const context = this;
    // 每次事件被触发时，都去清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }
    // 设置新的定时器
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, interval)
  }
}


export { intervalThrottle, timerThrottle, throttle, baseDebounce }
