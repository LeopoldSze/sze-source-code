/**
 * 手写forEach
 * @param callback
 * @constructor
 */
Array.prototype.szeForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    typeof callback === 'function' && callback(this[i], i, this)
  }
}
{
  const a = [1, 2, 3]
  a.szeForEach((item, index, arr) => {
    console.log('forEach:', item, index, arr)
  })
}

/**
 * 手写map函数
 * @param callback
 * @returns {*[]}
 */
Array.prototype.szeMap = function (callback) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    if (typeof callback === 'function') {
      result.push(callback(this[i], i, this))
    }
  }
  
  return result
}
{
  const a = [1, 2, 3]
  const b = a.szeMap((item, index, arr) => {
    console.log('map:', item, index, arr)
    return item * 2
  })
  console.log('b:', b)
}

/**
 * 手写reduce函数
 * @param callback
 * @param total
 * @returns {*}
 */
Array.prototype.szeReduce = function (callback, total) {
  let i = 0
  if (typeof total === 'undefined') {
    total = this[0]
    i = 1
  }
  for (; i < this.length; i++) {
    total = callback(total, this[i], i, this)
  }
  
  return total
}
{
  const a = [1, 2, 3]
  const c = a.szeReduce((prev, cur, index, arr) => {
    console.log('reduce:', prev, cur, index, arr)
    return prev + cur
  }, 1)
  console.log('c:', c)
}

/**
 * 手写every函数
 * @param callback
 * @returns {boolean}
 */
Array.prototype.szeEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (typeof callback === 'function' && !callback(this[i], i, this)) {
      return false
    }
  }
  
  return true
}
{
  const a = [1, 2, 3, 4, 5]
  const d = a.szeEvery((item, index, arr) => {
    console.log('every:', item, index, arr)
    return item > 1
  })
  console.log('d:', d)
}

/**
 * 手写some函数
 * @param callback
 * @returns {boolean}
 */
Array.prototype.szeSome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (typeof callback === 'function' && callback(this[i], i, this)) {
      return true
    }
  }
  
  return false
}
{
  const a = [1, 2, 3, 4, 5]
  const e = a.szeSome((item, index, arr) => {
    console.log('some:', item, index, arr)
    return item < 1
  })
  console.log('e:', e)
}

/**
 * 手写filter函数
 * @param callback
 * @returns {*[]}
 */
Array.prototype.szeFilter = function (callback) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    if (typeof callback === 'function' && callback(this[i], i, this)) {
      result.push(this[i])
    }
  }
  
  return result
}
{
  const a = [1, 2, 3, 4, 5]
  const f = a.szeFilter((item, index, arr) => {
    console.log('filter:', item, index, arr)
    return item < 3
  })
  console.log('f:', f)
}

/**
 * 手写flat函数
 * @returns {*[]}
 * @param arr
 */
function szeFlat (arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? szeFlat(cur) : cur)
  }, [])
}
{
  const a = [1, [2, [3, [4, [5]]]]]
  console.log('g:', a.flat(Infinity))
  const h = szeFlat(a)
  console.log('h:', h)
}

/**
 * 防抖：多次触发，只执行一次
 * @param fn
 * @param delay
 * @returns {(function(...[*]): void)|*}
 */
function debounce(fn, delay = 1000) {
  let timer = null
  
  return function (...args) {
    timer && clearTimeout(timer)
    
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流：多次触发，按时间执行
 * @param fn
 * @param delay
 * @returns {(function(...[*]): void)|*}
 */
function throttle(fn, delay = 1000) {
  let last = 0, timer = null
  
  return function (...args) {
    const now = Date.now()
    if (last && now < last + delay) {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      })
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}