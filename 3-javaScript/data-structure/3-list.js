/**
 * 单向链表
 * @type {LinkedList}
 */
const LinkedList = (function() {
  // 创建节点
  function Node(element) {
    this.element = element
    this.next = null
  }
  
  class LinkedList {
    constructor () { // 初始化时候生成头节点 head 和链表长度 length
      this.head = null
      this.length = 0
    }
    append (element) { // 从尾部添加节点
      let newNode = new Node(element)
      if (!this.head) { // 没有头节点，就将新节点设为头节点
        this.head = newNode
      } else { // 存在头节点，就在链表尾部添加新节点
        let current = this.head
        while (current.next) { // 遍历找到链表尾部
          current = current.next
        }
        current.next = newNode
      }
      this.length++
    }
    
    insert (position, element) { // 按位置插入节点
      if (position < 0 || position > this.length) { // 边界判断
        return false
      }
      let newNode = new Node(element)
      if (position === 0) { // 往链表首部添加新节点
        newNode.next = this.head
        this.head = newNode
      } else { // 非链表首部添加新节点
        let index = 0, previous , current = this.head // index 索引判断是否是当前 position
        while (index++ < position) { // 如果 index 小于 position，递增并将变量移动到下一个节点
          previous = current
          current = current.next
        }
        newNode.next = current
        previous.next = newNode
      }
      this.length++
      return true
    }
    
    removeAt (position) { // 按照位置删除节点
      if (position < 0 || position > this.length) {
        return null
      }
      let index = 0, previous , current = this.head
      if (position === 0) {
        this.head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      this.length--
      return current.element
    }
    
    toString (symbol) { // 将链表的值字符串化
      let current = this.head, str = ''
      while (current) {
        str += current.element
        current = current.next
        if (current) {
          str += symbol ? symbol : ','
        }
      }
      return str
    }
    
    indexOf (element) { // 找到值第一次出现的位置
      let current = this.head, index = 0
      while (current) {
        if (current.element === element) {
          return index
        }
        current = current.next
        index++
      }
      return -1
    }
    
    find (element) { // 找到第一次出现该值的节点
      let current = this.head
      while (current) {
        if (current.element === element) {
          return current
        }
        current = current.next
      }
      return false
    }
    
    isEmpty () { // 判断链表是否为空
      return this.length === 0
    }
    
    size () { // 返回链表长度
      return this.length
    }
    
    getHead () { // 获取链表头节点
      return this.head
    }
  }
  
  return LinkedList
})();

/**
 * 双向链表
 * @type {DoubleLinkedList}
 */
const DoubleLinkedList = (function(){
  let Node = function (element) {
    this.element = element
    this.prev = this.next = null
  }
  class DoubleLinkedList {
    constructor () {
      this.head = this.tail = null
      this.length = 0
    }
    append (element) {
      let newNode = new Node(element)
      if (!this.head) {
        this.head = this.tail = newNode
      } else {
        let current = this.head
        while (current) {
          current = current.next
        }
        current = this.tail
        current.next = this.tail = newNode
        newNode.prev = current
      }
    }
    insert (position, element) {
      if (position < 0 || position > this.length) {
        return false
      }
      let newNode = new Node(element)
      let previous, current = this.head, index = 0
      if (position === 0) {
        if (!this.head) {
          this.head = this.tail = newNode
        } else {
          newNode.next = current
          current.prev = newNode
          this.head = newNode
        }
      } else if (position === this.length) {
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
      } else {
        while (index++ < position) {
          previous = current
          current = newNode
        }
        previous.next = newNode
        newNode.prev = previous
        newNode.next = current
        current.prev = newNode
      }
      this.length++
      return true
    }
    removeAt (position) {
      if (position < 0 || position >= this.length) {
        return false
      }
      let previous, current = this.head, index = 0
      if (position === 0) {
        this.head = current.next
        if (this.length === 1) {
          this.tail = null // 若只有一项，则 current.next 为 null ，所以只需要将尾部设为 null
        } else {
          this.head.prev = null
        }
      } else if (position === this.length - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = null
      } else {
        while (index++ < positon) {
          previous = current
          current = current.next
        }
        previous.next = current.next
        current.next.prev = previous
      }
      this.length--
      return current.element
    }
    // 删除指定节点
    removeByNode (node) {
      if (!node.prev) {
        this.head = node.next
        this.head.prev = null
        return
      }
      if (!node.next) {
        return
      }
      let prev = node.prev
      let next = node.next
      prev.next = next
      next.prev = prev
    }
    // 其他方法实现和单向链表相同
  }
  return DoubleLinkedList
})();
