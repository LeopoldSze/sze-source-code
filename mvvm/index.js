/**
 * 将对象的属性用 Object.defineProperty() 进行设置
 */
function defineReactive(data, key, val) {
  const dep = new Dep()
  
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置/删除
    
    get: function getter () {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    
    set: function setter (newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      dep.notify()
    }
  })
}


/**
 * 监听器 - 循环遍历数据对象的每个属性
 */
function observable(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  
  let keys = Object.keys(obj)
  keys.forEach(key => {
    defineReactive(obj, key, obj[key])
  })
  
  return obj
}

/**
 * 订阅器 - 依赖收集容器
 * @type {*}
 */
function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  
  notify() {
    this.subs.forEach(function(sub) {
      sub.update()
    })
  }
}
Dep.target = null

/**
 * 订阅者 - 
 * @type {*}
 */
function Watcher(vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
  update: function() {
    this.run()
  },
  
  run: function() {
    const value = this.vm.data[this.exp]
    const oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  },
  
  get: function() {
    Dep.target = this // 全局变量 订阅者 赋值
    const value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
    Dep.target = null // 全局变量 订阅者 释放
    return value
  }
}

let person = observable({
  name: 'tom',
  age: 15
})

console.log('p:', person.name, person.age)
