/*function render () {
  console.log('模拟视图渲染')
}

let data = {
  name: '浪里行舟',
  location: { x: 100, y: 100 }
}

observe(data)

function observe (obj) { // 我们来用它使对象变成可观察的
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
  
  function defineReactive (obj, key, value) {
    // 递归子属性
    observe(value)
    Object.defineProperty(obj, key, {
      enumerable: true, //可枚举（可以遍历）
      configurable: true, //可配置（比如可以删除）
      get: function reactiveGetter () {
        console.log('get', value) // 监听
        return value
      },
      set: function reactiveSetter (newVal) {
        observe(newVal) //如果赋值是一个对象，也要递归子属性
        if (newVal !== value) {
          console.log('set', newVal) // 监听
          render()
          value = newVal
        }
      }
    })
  }
}

data.location = {
  x: 1000,
  y: 1000
} //set {x: 1000,y: 1000} 模拟视图渲染

data.name // get 浪里行舟*/


function render() {
  console.log('模拟视图渲染')
}

let obj = [1, 2, 3]
let methods = ['pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push']

// 先获取到原来的原型上的方法
let arrayProto = Array.prototype

// 创建一个自己的原型 并且重写methods这些方法
let proto = Object.create(arrayProto)

methods.forEach(method => {
  proto[method] = function() {
    // AOP
    arrayProto[method].call(this, ...arguments)
    render()
  }
})

function observer(obj) {
  // 把所有的属性定义成set/get的方式
  if (Array.isArray(obj)) {
    obj.__proto__ = proto
    return
  }
  if (typeof obj == 'object') {
    for (let key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}

function defineReactive(data, key, value) {
  observer(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      observer(newValue)
      if (newValue !== value) {
        render()
        value = newValue
      }
    }
  })
}

observer(obj)
function $set(data, key, value) {
  defineReactive(data, key, value)
}

obj.push(123, 55)
console.log(obj) //[1, 2, 3, 123, 55]


function createElement(vnode) {
  var tag = vnode.tag
  var attrs = vnode.attrs || {}
  var children = vnode.children || []
  
  if (!tag) {
    return null
  }
// 创建真实的 DOM 元素
  var elem = document.createElement(tag)
  // 属性
  var attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      // 给 elem 添加属性
      elem.setAttribute(attrName, attrs[attrName])
    }
  }
  // 子元素
  children.forEach(function (childVnode) {
    // 给 elem 添加子元素，如果还有子节点，则递归的生成子节点。
    elem.appendChild(createElement(childVnode))  // 递归
  })    // 返回真实的 DOM 元素
  return elem
}

function updateChildren(vnode, newVnode) {
  var children = vnode.children || []
  var newChildren = newVnode.children || []
  // 遍历现有的children
  children.forEach(function (childVnode, index) {
        var newChildVnode = newChildren[index]
        // 两者tag一样
        if (childVnode.tag === newChildVnode.tag) {
          // 深层次对比，递归
          updateChildren(childVnode, newChildVnode)
        } else {
          // 两者tag不一样
          replaceNode(childVnode, newChildVnode)
        }
      }
  )}

//定义检测数据类型的功能函数
function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

//实现深度克隆---对象/数组
function clone(target) {
  //判断拷贝的数据类型
  //初始化变量result 成为最终克隆的数据
  let result
  let targetType = checkedType(target)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return target
  }
  
  //遍历目标数据
  for (let i in target) {
    //获取遍历数据结构的每一项值。
    let value = target[i]
    //判断目标结构里的每一值是否存在对象/数组
    if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
      //对象/数组里嵌套了对象/数组
      //继续遍历获取到value值
      result[i] = clone(value)
    } else {
      //获取到value值是基本的数据类型或者是函数。
      result[i] = value
    }
  }
  return result
}