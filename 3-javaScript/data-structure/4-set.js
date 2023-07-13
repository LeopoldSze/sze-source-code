/**
 * 集合
 */
class MySet extends Set {
  
  constructor (args) {
    super(args)
  }
  
  /**
   * 并集
   * @param otherSet
   * @returns {MySet}
   */
  union (otherSet) {
    return new MySet([...this, ...otherSet])
  }
  
  /**
   * 交集
   * @param otherSet
   * @returns {MySet}
   */
  intersection (otherSet) {
    // return new Set([...this].filter(x => otherSet.has(x))) // 标记 aa
    let newSet = new MySet()
    for (let a of this) {
      if (otherSet.has(a)) {
        newSet.add(a)
      }
    }
    return newSet
  }
  
  /**
   * 差集
   * @param otherSet
   * @returns {MySet}
   */
  difference (otherSet) {
    // return new Set([...this].filter(x => !otherSet.has(x))) // 标记 bb
    let newSet = new MySet()
    for (let x of this) {
      if (!otherSet.has(x)) {
        newSet.add(x)
      }
    }
    return newSet
  }
  
  /**
   * 判断当前集合是否是另外集合的子集
   * @param otherSet
   * @returns {boolean}
   */
  isSubOf (otherSet) {
    if (this.size > otherSet.size) {
      return false
    } else {
      // return [...this].every(item => otherSet.has(item)) // 标记 cc
      for (let x of this) {
        if (!otherSet.has(x)) {
          return false
        }
      }
      return true
    }
  }
}

const a = new MySet([1, 2, 3, 4])
const b = new MySet([3, 4, 5, 6])
const c = new MySet([1,2])
console.log(a.intersection(b)) // Set(2) {3, 4}
console.log(a.difference(b)) // Set(2) {1, 2}
console.log(a.union(b)) // Set(6) {1, 2, 3, 4, 5, 6}
console.log(c.isSubOf(a)) // true
console.log(c.isSubOf(b)) // false
