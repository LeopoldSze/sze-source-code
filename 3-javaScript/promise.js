/**
 * 对小程序wx.request回调的promisify方法
 * @param fn
 * @returns {function(*): Promise}
 */
const promisify = fn => args =>
  new Promise((resolve, reject) => {
    args.success = function (res) {
      resolve(res);
    };
    args.fail = function (error) {
      reject(error);
    }
  })
// const wxRequest = promisify(wx.request);

/**
 * 手写Promise构造函数
 * @param executor
 * @constructor
 */
function SzePromise(executor) {
  this.status = 'pending';
  this.value = null;
  this.reason = null;
  this.onFulfilledArray = [];
  this.onRejectedArray = [];
  
  const resolve = (value) => {
    if (value instanceof SzePromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
        this.onFulfilledArray.forEach(func => {
          func(value);
        })
      }
    })
  }
  
  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedArray.forEach(func => {
          func(reason);
        })
      }
    })
  }
  
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
  console.log('实例化')
}

/**
 * Promise原型then方法
 * @param onfulfilled
 * @param onrejected
 */
SzePromise.prototype.then = function (onfulfilled, onrejected) {
  onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data;
  onrejected = typeof onrejected === 'function' ? onrejected : error => { throw error };
  
  // promise2将作为then的返回值
  let promise2;
  
  if (this.status === 'fulfilled') {
    return promise2 = new SzePromise((resolve, reject) => {
      setTimeout(() => {
        try {
          // 这个新的promise2的经过resolve处理后的值为onfulfilled的执行结果
          let result = onfulfilled(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
  if (this.status === 'rejected') {
    return promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // 这个新的promise2的经过reject处理后的值为onrejected的执行结果
          let result = onrejected(this.reason);
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
  if (this.status === 'pending') {
    return promise2 = new Promise((resolve, reject) => {
      this.onFulfilledArray.push(() => {
        try {
          let result = onfulfilled(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectedArray.push(() => {
        try {
          let result = onrejected(this.value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    })
  }
  console.log('执行then');
}

/**
 * Promise原型catch方法
 * @param catchFunc
 * @returns {SzePromise|Promise}
 */
SzePromise.prototype.catch = function (catchFunc) {
  return this.then(null, catchFunc);
}

/**
 * Promise的resolve方法
 * @param value
 * @returns {SzePromise}
 */
SzePromise.resolve = function (value) {
  return new SzePromise((resolve, __reject) => {
    resolve(value);
  })
}

/**
 * Promise的reject方法
 * @param value
 * @returns {SzePromise}
 */
SzePromise.reject = function (value) {
  return new SzePromise((__resolve, reject) => {
    reject(value);
  })
}

const resolvePromise = (promise2, result, resolve, reject) => {
  // 当result和promise2相等时，也就是在onfulfilled返回promise2时，执行reject
  if (result === promise2) {
    reject(new TypeError('error due to circular reference'));
  }
  
  // 是否已经执行过onfulfilled或onrejected
  let consumed = false;
  let thenable;
  
  if (result instanceof SzePromise) {
    if (result.status === 'pending') {
      result.then(function (data) {
        resolvePromise(promise2, data, resolve, reject);
      }, reject)
    } else {
      result.then(resolve, reject)
    }
    return;
  }
  
  let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && (target !== null);
  
  // 如果返回的是疑似SzePromise类型
  if (isComplexResult(result)) {
    try {
      thenable = result.then;
      // 判断返回值是否是SzePromise类型
      if (typeof thenable === 'function') {
        thenable.call(result, function (data) {
          if (consumed) {
            return;
          }
          consumed = true;
          return resolvePromise(promise2, data, resolve, reject);
        }, function (error) {
          if (consumed) {
            return;
          }
          consumed = true;
          return reject(error);
        })
      } else {
        resolve(result);
      }
    } catch (e) {
      if  (consumed) {
        return;
      }
      consumed = true;
      reject(e);
    }
  } else {
    resolve(result);
  }
}

const szeP = new SzePromise((resolve, reject) => {
  setTimeout(() => {
    resolve('吧啦啦啦');
  }, 2000)
})
szeP.then(res => {
  console.log('szeP1:', res);
})
szeP.then(res => {
  console.log('szeP2:', res);
})
console.log('实例：', szeP);

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('lucas');
  }, 2000)
})
promise.then(data => {
  console.log('data:', data);
  return `${data} next then`;
}).then(data => {
  console.log('data2:', data);
})