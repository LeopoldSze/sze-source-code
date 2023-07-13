/**
 * 普通队列
 * @type {Queue}
 */
const CommonQueue = (function() {
  let items = new WeakMap()
  
  class Queue {
    constructor () {
      items.set(this, [])
    }
    
    /**
     * 入列
     * @param v
     */
    enqueue (v) {
      items.get(this).push(v)
    }
    
    /**
     * 出列
     * @returns {any[]}
     */
    dequeue () {
      return items.get(this).splice(0, 1)[0]
    }
    
    /**
     * 获取队首
     * @returns {*}
     */
    front () {
      return items.get(this)[0]
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
  
  return Queue;
})();

/**
 * 优先队列：该例level越小等级越高：0 > 1 > 2
 * @type {Queue}
 */
const PriorityQueue = (function() {
  let items = new WeakMap()
  
  /**
   * 队列元素
   */
  class QueueElement {
    constructor (value, level) {
      this.value = value
      this.level = level
    }
  }
  
  /**
   * 优先级队列
   */
  class PriorityQueue {
    constructor () {
      items.set(this, [])
    }
    
    /**
     * 入列
     * @param value
     * @param level
     */
    enqueue (value, level) {
      let queueElement = new QueueElement(value, level)
      const queue = items.get(this)
      const added = queue.some((item, index) => {
        // 如果要添加的元素的level低于item的，就添加到该节点之前
        if (level < item.level) {
          queue.splice(index, 0, queueElement)
          return true
        }
      })
      // 元素未添加，说明优先级较低，直接加入末尾
      if (!added) {
        queue.push(queueElement)
      }
    }
    
    /**
     * 出列
     * @returns {any}
     */
    dequeue () {
      return items.get(this).splice(0, 1)[0]
    }
    
    /**
     * 获取队首
     * @returns {*}
     */
    front () {
      return items.get(this)[0]
    }
    
    /**
     * 获取队列长度
     * @returns {*}
     */
    size () {
      return items.get(this).length
    }
    
    /**
     * 判断队列是否为空
     * @returns {boolean}
     */
    isEmpty () {
      return items.get(this).length === 0
    }
    
    /**
     * 清空队列
     */
    clear () {
      items.get(this).length = 0
    }
  }
  
  return PriorityQueue
})();
{
  const priorityList = new PriorityQueue()
  priorityList.enqueue('sze1', 5)
  priorityList.enqueue('sze2', 1)
  priorityList.enqueue('sze', 3)
  console.log('priorityList:', priorityList.dequeue(), priorityList.dequeue(), priorityList.dequeue())
}


/**
 * 击鼓传花
 * @param nameList
 * @param num
 * @returns {(function(*): (undefined|*))|*}
 */
function hotPotato (nameList, num) {
  let queue = new CommonQueue()
  nameList.forEach(name => queue.enqueue(name))
  
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    
    const outer = queue.dequeue()
    console.log(outer + '出局了')
  }
  return queue.front()
}
{
  let nameList = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  const winner = hotPotato(nameList, 7)
  console.log('获胜者：', winner)
}
