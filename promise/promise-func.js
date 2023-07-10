/**
 * 构造函数版
 * @param executor -- 函数参数，包含resolve & reject 方法
 * @constructor
 */
function Promise (executor) {
  // 添加属性
  this.PromiseState = 'pending'
  this.PromiseResult = null
  this.callbacks = []
  
  // resolve函数
  const resolve = (data) => {
    // 判断状态
    if (this.PromiseState !== 'pending') return
    
    // 1.修改对象的状态（PromiseState）
    this.PromiseState = 'fulfilled' // resolved
    // 2.设置对象结果值（PromiseResult）
    this.PromiseResult = data
    // 调用成功的回调函数
    setTimeout(() => {
      this.callbacks.forEach(item => item.onResolved(data))
    })
  }
  
  // reject函数
  const reject = (data) => {
    // 判断状态
    if (this.PromiseState !== 'pending') return
    
    // 1.修改对象的状态（PromiseState）
    this.PromiseState = 'rejected' // resolved
    // 2.设置对象结果值（PromiseResult）
    this.PromiseResult = data
    // 调用失败的回调函数
    setTimeout(() => {
      this.callbacks.forEach(item => item.onRejected(data))
    })
  }
  
  try {
    // 同步调用 【执行器函数】
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  
  // 判断回调函数参数
  if (typeof onResolved !== 'function') {
    onResolved = value => value
  }
  if (typeof onRejected !== 'function') {
    onRejected = reason => throw reason
  }
  
  return new Promise((resolve, reject) => {
    // 封装函数
    function callback (kind) {
      try {
        // 获取回调函数的执行结果
        let result = kind(self.PromiseResult)
        // 判断
        if (result instanceof Promise) {
          result.then(res => {
            resolve(res)
          }, rej => {
            reject(rej)
          })
        } else {
          // 结果的对象状态为【成功】
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    
    // 调用回调函数
    if (this.PromiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved)
      })
    }
    
    if (this.PromiseState === 'rejected') {
      setTimeout(() => {
        callback(onRejected)
      })
    }
    
    // 判断pending状态
    if (this.PromiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        },
      })
    }
  })
}

// 添加 catch 方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

// 添加 resolve 方法
Promise.resolve = function (value) {
  // 返回Promise对象
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(res => {
        resolve(res)
      }, rej => {
        reject(rej)
      })
    } else {
      // 状态设置为成功
      resolve(value)
    }
  })
}

// 添加 reject 方法
Promise.reject = function (reason) {
  // 返回Promise对象
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// 添加 all 方法
Promise.all = function (promises) {
  // 返回结果为promise对象
  return new Promise((resolve, reject) => {
    // 声明变量
    let count = 0
    let arr = []
    
    // 遍历
    for (let i = 0; i < promises.length; i++) {
      //
      promises[i].then(res => {
        // 得知对象的状态是成功
        count++
        // 将当前promise对象成功的结果，存入到数组中
        arr[i] = res
        // 判断每个promise对象都成功
        if (count === promises.length) {
          // 修改状态
          resolve(arr)
        }
      }, rej => {
        reject(rej)
      })
    }
  })
}

// 添加 race 方法
Promise.race = function (promises) {
  // 返回结果为promise对象
  return new Promise((resolve, reject) => {
    // 遍历
    for (let i = 0; i < promises.length; i++) {
      //
      promises[i].then(res => {
        // 修改返回对象的状态为【成功】
        resolve(res)
      }, rej => {
        reject(rej)
      })
    }
  })
}

// 添加 allSettled 方法
Promise.allSettled = function (promises) {

}

// 添加 any 方法
Promise.any = function () {

}

// 添加 try 方法
Promise.try = function () {

}
