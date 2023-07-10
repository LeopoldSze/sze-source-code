const Stack = (function(){
  let items = new WeakMap()
  
  class Stack {
    constructor () {
      items.set(this, [])
    }
    
    /**
     * 出栈
     * @returns {*}
     */
    pop () {
      return items.get(this).pop()
    }
    
    /**
     * 入栈
     * @param v
     */
    push (v) {
      items.get(this).push(v)
    }
    
    /**
     * 获取当前栈顶
     * @returns {*}
     */
    peek () {
      return items.get(this).at(-1)
    }
    
    /**
     * 获取栈长度
     * @returns {*}
     */
    size () {
      return items.get(this).length
    }
    
    /**
     * 获取栈是否为空
     * @returns {boolean}
     */
    isEmpty () {
      return items.get(this).length === 0
    }
    
    /**
     * 清空栈
     */
    clear () {
      items.get(this).length = 0
    }
  }
  
  return Stack
})();

/**
 * 十进制转其他进制，默认转为二进制
 * @param number
 * @param base
 * @returns {string}
 */
function baseConverter(number, base = 2) {
  let remStack = new Stack()
  let baseResult = ''
  const baseString = '0123456789ABCDEF'
  
  while (number > 0) {
    remStack.push(number % base) // 将除余结果存入执行栈中
    number = Math.floor(number / base)
  }
  while (!remStack.isEmpty()) {
    baseResult += baseString[remStack.pop()] // 删除栈顶并存入字符串拼接
  }
  return baseResult
}

console.log('convert:', baseConverter(10)) // 1010
console.log('convert:', baseConverter(31, 16)) // 1F
const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(4)
console.log('peek:', stack.peek())
