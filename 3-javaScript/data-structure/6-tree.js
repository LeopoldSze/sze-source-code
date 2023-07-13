/**
 * 二叉搜索树
 * @type {BinarySearchTree}
 */
const BinarySearchTree = (function(){
  /**
   * 创建节点
   */
  class Node {
    constructor (key) {
      this.key = key
      this.left = null
      this.right = null
    }
  }
  
  /**
   * 插入节点辅助函数
   * @param node
   * @param newNode
   */
  const insertNode = (node, newNode) => {
    if (newNode.key < node.key) {
      if (node.left) {
        insertNode(node.left, newNode)
      } else {
        node.left = newNode
      }
    } else {
      if (node.right) {
        insertNode(node.right, newNode)
      } else {
        node.right = newNode
      }
    }
  }
  
  /**
   * 搜索节点辅助函数
   * @param node
   * @param key
   * @returns {boolean|boolean|*}
   */
  const searchNode = (node, key) => {
    if (!node) {
      return false
    }
    if (key < node.key) {
      return searchNode(node.left, key)
    } else if (key > node.key) {
      return searchNode(node.right, key)
    } else {
      return true
    }
  }
  
  /**
   * 找到最小节点并返回key
   * @param node
   * @returns {*|null}
   */
  const minNode = (node) => {
    if (!node) {
      return null
    }
    if (node.left) {
      return minNode(node.left)
    } else {
      return node.key
    }
  }
  
  /**
   * 找到最大节点并返回key
   * @param node
   * @returns {*|null}
   */
  const maxNode = (node) => {
    if (!node) {
      return null
    }
    if (node.right) {
      return maxNode(node.right)
    } else {
      return node.key
    }
  }
  
  /**
   * 找到最小节点并返回node对象
   * @param node
   * @returns {*|null}
   */
  const findMinNode = (node) => {
    if (!node) {
      return null
    }
    if (node.left) {
      return findMinNode(node.left)
    } else {
      return node
    }
  }
  
  /**
   * 移除节点并返回传入的 node
   * @param node
   * @param key
   * @returns {*|null}
   */
  const removeNode = (node, key) => {
    if (node === null) {
      return null
    }
    
    // 这种情况需要更新node.left，然后返回更新了node.left的新的node
    if (key < node.key) {
      node.left = removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      // 这种情况需要更新node.right，然后返回更新了node.right的新的node
      node.right = removeNode(node.right, key)
      return node
    } else {
      // 这种情况需要更新node.key或者其他更新手段(包括直接将node变为null, 或更新node.right)，返回的也是更新后的node
      // 情况1，被移除的是叶子节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      // 情况2，被移除的是只有一个子节点的节点
      if (node.left === null) { // 只有右子节点
        node = node.right
        return node
      } else if (node.right === null) {//只有左子节点
        node = node.left
        return node
      }
      // 情况3，被移除的是有两个子节点的节点
      const aux = findMinNode(node.right) // 找到子树中的最小节点，它肯定是一个叶子节点
      node.key = aux.key // 将node的key设置为aux的key，达到删除效果，但此时有两个一样的key
      node.right = removeNode(node.right, aux.key) // 移除以node.right为root的树上的重复的叶子节点aux.key
      return node
    }
  }
  
  class BinarySearchTree {
    constructor () {
      this.root = null
    }
    
    /**
     * 插入节点
     * @param key
     */
    insert (key) {
      let newNode = new Node(key)
      if (!this.root) {
        this.root = newNode
      } else {
        insertNode(this.root, newNode)
      }
    }
    
    /**
     * 搜索节点，返回布尔值
     * @param key
     * @returns {boolean|*}
     */
    search (key) {
      return searchNode(this.root, key)
    }
    
    /**
     * 获取最小节点
     * @returns {*|null}
     */
    min () {
      return minNode(this.root)
    }
    
    /**
     * 获取最大节点
     * @returns {*|null}
     */
    max () {
      return maxNode(this.root)
    }
    
    /**
     * 删除节点
     * @param key
     */
    remove (key) {
      this.root = removeNode(this.root, key)
    }
  }
  
  return BinarySearchTree
})()
