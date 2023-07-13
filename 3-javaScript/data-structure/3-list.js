/**
 * 单向链表
 * @type {LinkedList}
 */
const LinkedList = (function() {
  /**
   * 创建节点
   */
  class Node {
    constructor (element) {
      this.element = element
      this.next = null
    }
  }
  
  class LinkedList {
    /**
     * 初始化时候生成头节点 head 和链表长度 length
     */
    constructor () {
      this.head = null
      this.length = 0
    }
    
    /**
     * 从尾部添加节点
     * @param element
     */
    append (element) {
      let newNode = new Node(element)
      // 没有头节点，就将新节点设为头节点
      if (!this.head) {
        this.head = newNode
      } else {
        // 存在头节点，就在链表尾部添加新节点
        let current = this.head
        // 遍历找到链表尾部
        while (current.next) {
          current = current.next
        }
        current.next = newNode
      }
      this.length++
    }
    
    /**
     * 按位置插入节点
     * @param position
     * @param element
     * @returns {boolean}
     */
    insert (position, element) {
      // 边界判断
      if (position < 0 || position > this.length) {
        return false
      }
      
      let newNode = new Node(element)
      // 往链表首部添加新节点
      if (position === 0) {
        newNode.next = this.head
        this.head = newNode
      } else {
        // 非链表首部添加新节点
        // index 索引判断是否是当前 position
        let index = 0, previous , current = this.head
        // 如果 index 小于 position，递增并将变量移动到下一个节点
        while (index++ < position) {
          previous = current
          current = current.next
        }
        newNode.next = current
        previous.next = newNode
      }
      this.length++
      return true
    }
    
    /**
     * 按照位置删除节点
     * @param position
     * @returns {*|null}
     */
    removeAt (position) {
      // 处理边界情况
      if (position < 0 || position > this.length) {
        return false
      }
      let index = 0, previous , current = this.head
      // 如果是删除首部
      if (position === 0) {
        this.head = current.next
      } else {
        // 非首部遍历到索引位置
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      this.length--
      return current.element
    }
    
    /**
     * 将链表的值字符串化
     * @param symbol
     * @returns {string}
     */
    toStr (symbol) {
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
    
    /**
     * 找到值第一次出现的位置
     * @param element
     * @returns {number}
     */
    indexOf (element) {
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
    
    /**
     * 找到第一次出现该值的节点
     * @param element
     * @returns {boolean|null}
     */
    find (element) {
      let current = this.head
      while (current) {
        if (current.element === element) {
          return current
        }
        current = current.next
      }
      return false
    }
    
    /**
     * 判断链表是否为空
     * @returns {boolean}
     */
    isEmpty () {
      return this.length === 0
    }
    
    /**
     * 返回链表长度
     * @returns {number}
     */
    size () {
      return this.length
    }
    
    /**
     * 获取链表头节点
     * @returns {null}
     */
    getHead () {
      return this.head
    }
  }
  
  return LinkedList
})();
{
  const linkList = new LinkedList()
  linkList.append(10)
  linkList.append(20)
  linkList.insert(0, 5)
  linkList.insert(2, 15)
  console.log('linkList:', linkList.size(), linkList.toStr('-'), linkList.find(15), linkList.indexOf(15))
}

/**
 * 双向链表
 * @type {DoubleLinkedList}
 */
const DoubleLinkedList = (function(){
  /**
   * 创建节点
   */
  class Node {
    constructor (element) {
      this.element = element
      this.prev = this.next = null
    }
  }
  
  class DoubleLinkedList {
    constructor () {
      this.head = this.tail = null
      this.length = 0
    }
    
    /**
     * 往链表尾部添加节点
     * @param element
     */
    append (element) {
      let newNode = new Node(element)
      // 没有头节点则设置为头结点和尾结点
      if (!this.head) {
        this.head = this.tail = newNode
      } else {
        // 有头结点则遍历到尾节点
        let current = this.head
        while (current) {
          current = current.next
        }
        current = this.tail
        current.next = this.tail = newNode
        newNode.prev = current
      }
    }
    
    /**
     * 任意位置插入节点
     * @param position
     * @param element
     * @returns {boolean}
     */
    insert (position, element) {
      // 处理边界情况
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
    
    /**
     * 指定位置移除节点
     * @param position
     * @returns {*|boolean}
     */
    removeAt (position) {
      // 处理边界情况
      if (position < 0 || position >= this.length) {
        return false
      }
      
      let previous, current = this.head, index = 0
      if (position === 0) {
        this.head = current.next
        if (this.length === 1) {
          // 若只有一项，则 current.next 为 null ，所以只需要将尾部设为 null
          this.tail = null
        } else {
          this.head.prev = null
        }
      } else if (position === this.length - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
        current.next.prev = previous
      }
      this.length--
      return current.element
    }
    
    /**
     * 通过节点删除节点
     * @param node
     */
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
    
    /**
     * 将链表的值字符串化
     * @param symbol
     * @returns {string}
     */
    toStr (symbol) {
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
    
    /**
     * 找到值第一次出现的位置
     * @param element
     * @returns {number}
     */
    indexOf (element) {
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
    
    /**
     * 找到第一次出现该值的节点
     * @param element
     * @returns {boolean|null}
     */
    find (element) {
      let current = this.head
      while (current) {
        if (current.element === element) {
          return current
        }
        current = current.next
      }
      return false
    }
    
    /**
     * 判断链表是否为空
     * @returns {boolean}
     */
    isEmpty () {
      return this.length === 0
    }
    
    /**
     * 返回链表长度
     * @returns {number}
     */
    size () {
      return this.length
    }
    
    /**
     * 获取链表头节点
     * @returns {null}
     */
    getHead () {
      return this.head
    }
  }
  
  return DoubleLinkedList
})();
