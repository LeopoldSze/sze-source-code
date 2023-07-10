class Mvvm {
  constructor (options) {
    this.$options = options;
    this.$data = options.data;
    
    // 对data选项做响应式处理
    observe(this.$data);
    
    // 代理data到vm上
    proxy(this);
    
    // 执行编译
    new Compile(options.el, this);
  }
}

function observe (obj) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  new Observer(obj);
}

class Observer {
  constructor (value) {
    this.value = value;
    this.walk(value);
  }
  
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);  // 获取dom
    if (this.$el) {
      this.compile(this.$el);
    }
  }
  
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => { // 遍历子元素
      if (this.isElement(node)) {   // 判断是否为节点
        console.log("编译元素" + node.nodeName);
      } else if (this.isInterpolation(node)) {
        console.log("编译插值⽂本" + node.textContent);  // 判断是否为插值文本 {{}}
      }
      if (node.childNodes && node.childNodes.length) {  // 判断是否有子元素
        this.compile(node);  // 对子元素进行递归遍历
      }
    });
  }
  
  isElement(node) {
    return node.nodeType === 1;
  }
  
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
}