/**
 * 对小程序wx.request回调的promisify方法
 * @param fn
 * @returns {function(*): Promise}
 */
const promisify = fn => args =>
  new Promise((resolve, reject) => {
    args.success = function (res) {
      resolve(res)
    }
    args.fail = function (error) {
      reject(error)
    }
  })

// const wxRequest = promisify(wx.request);

/**
 * 一个运行微队列的任务函数
 * @param {Function} callback
 */
function runMicroTask (callback) {
  if (typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1) {
    Promise.resolve().then(callback)
  } else if (typeof MutationObserver !== 'undefined') {
    let observer = new MutationObserver(callback)
    let textNode = document.createTextNode('1')
    observer.observe(textNode, {
      characterData: true
    })
    textNode.data = '2'
  } else if (typeof setImmediate !== 'undefined') {
    setImmediate(callback)
  } else if (process && typeof process.nextTick === 'function') { // node环境
    process.nextTick(callback)
  } else {
    setTimeout(callback, 0)
  }
}

/**
 * 判断是否是Promise
 * @param value
 * @returns {boolean}
 */
function isPromise (value) {
  return !!(value && typeof value.then === 'function')
}

/**
 * Promise状态常量
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class SzeClassPromise {
  /**
   * Promise构造函数
   * @param {Function} executor，执行器函数，包含resolve和reject两个参数，分别是成功和失败的回调，new Promise时立即执行
   */
  constructor (executor) {
    this._status = PENDING
    this._value = undefined
    this.handlers = []
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (e) {
      this._reject(e)
    }
  }
  
  /**
   * 更改任务状态
   * @param {String} status，任务状态
   * @param {*} value，任务结果
   * @private
   */
  _changeStatus (status, value) {
    // 状态只能从pending改为fulfilled或rejected
    if (this._status !== PENDING) {
      return
    }
    
    this._status = status
    this._value = value
    this._runAllHandlers()
  }
  
  /**
   * Promise状态为fulfilled时的回调
   * @param {*} value
   * @private
   */
  _resolve (value) {
    this._changeStatus(FULFILLED, value)
  }
  
  /**
   * Promise状态为rejected时的回调
   * @param {*} value
   * @private
   */
  _reject (value) {
    this._changeStatus(REJECTED, value)
  }
  
  /**
   * 向微队列中添加任务
   * @param {Function} executor
   * @param {String} status
   * @param {Function} resolve
   * @param {Function} reject
   * @private
   */
  _pushHandler (executor, status, resolve, reject) {
    // 如果 executor 不是函数，直接执行 resolve 或 reject
    if (typeof executor !== 'function') {
      if (status === FULFILLED) {
        resolve(this._value)
      } else {
        reject(this._value)
      }
      return
    }
    
    this.handlers.push({
      executor,
      status,
      resolve,
      reject
    })
  }
  
  /**
   * 执行微队列中的所有任务
   * @private
   */
  _runAllHandlers () {
    console.log(this.handlers, 'this.handlers')
    // 如果状态还是pending，不执行
    if (this._status !== PENDING) {
      return
    }
    while (this.handlers[0]) {
      this._runOneHandler(this.handlers[0])
      this.handlers.shift()
    }
  }
  
  /**
   * 执行微队列中的一个任务
   * @param executor
   * @param status
   * @param resolve
   * @param reject
   * @private
   */
  _runOneHandler ({
    executor,
    status,
    resolve,
    reject
  }) {
    runMicroTask(() => {
      if (this._status !== status) {
        return false
      }
      
      if (typeof executor !== 'function') {
        if (status === FULFILLED) {
          resolve(this._value)
        } else {
          reject(this._value)
        }
        
        return false
      }
      
      try {
        const result = executor(this._value)
        if (isPromise(result)) {
          result.then(resolve, reject)
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  
  /**
   * 处理then方法传入的回调
   * @param {Function} onFulfilled
   * @param {Function | Null} onRejected
   * @returns {SzeClassPromise}
   */
  then (onFulfilled, onRejected = null) {
    return new SzeClassPromise((resolve, reject) => {
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject)
      this._pushHandler(onRejected, REJECTED, resolve, reject)
      this._runAllHandlers()
    })
  }
  
  /**
   * 处理catch方法传入的回调
   * @param {Function} onRejected
   * @returns {SzeClassPromise}
   */
  catch (onRejected) {
    return this.then(null, onRejected)
  }
  
  /**
   * 处理finally方法传入的回调
   * @param {Function} callback
   * @returns {SzeClassPromise}
   */
  finally (callback) {
    return this.then(data => {
      callback()
      return data
    }, reason => {
      callback()
      throw reason
    })
  }
  
  
  static resolve (value) {
    return new SzeClassPromise(resolve => {
      if (isPromise(value)) {
        value.then(resolve)
      } else {
        resolve(value)
      }
    })
  }
  
  
  static reject (value) {
    return new SzeClassPromise((_resolve, reject) => {
      reject(value)
    })
  }
}

const p1 = new SzeClassPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('吧啦啦啦')
  }, 10)
})
const p2 = p1.then(data => {
  console.log('data:', data)
  throw new Error('p2 error')
})
setTimeout(() => {
  console.log('p1:', p1)
  console.log('p2:', p2)
}, 50)

function delay (time) {
  return new SzeClassPromise(resolve => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}

// (async function () {
//   console.log('start')
//   const result = await delay(1000)
//   console.log('result:', result)
// })()