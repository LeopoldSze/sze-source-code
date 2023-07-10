/**
 * 代理缓存函数
 * @param fn
 * @returns {(function(): (any | undefined))|*}
 */
function funcCache(fn) {
  const cache = new Map();
  
  return function () {
    const args = Array.prototype.join.call(arguments, ',');
    if (cache.has(args)) return cache.get(args);
    
    const val = fn.apply(this, arguments);
    cache.set(args, val);
    return val;
  }
}

/**
 * 执行函数
 * @returns {number}
 */
function sum() {
  let s = 0;
  const args = Array.from(arguments);
  args.forEach(item => {
    s += item;
  })
  return s;
}

const sum_cache = funcCache(sum);
const a = sum_cache(11, 22, 33);
const b = sum_cache(11, 22, 33);
console.log('a & b:', a, b);
