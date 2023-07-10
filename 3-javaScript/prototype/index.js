/**
 * 原型链继承
 */
{
  function Parent() {
    this.color = ['red', 'green', 'blue']
  }
  Parent.prototype.getColor = function (index) {
    return this.color[index]
  }
  
  function Child() {}
  Child.prototype = new Parent()
  
  const child = new Child()
  child.color.push('yellow')
  const parent = new Child()
  console.log('data1:', child.color, parent.color)
}

/**
 * 构造函数继承
 */
{
  function Parent() {
    this.color = ['red', 'green', 'blue']
    
    this.add = function () {
      console.log('this is parent add method')
    }
  }
  Parent.prototype.getColor = function (index) {
    return this.color[index]
  }
  
  function Child() {
    Parent.call(this)
  }
  
  const child = new Child()
  child.color.push('yellow')
  const child2 = new Child()
  console.log('data2:', child, child2)
}


/**
 * 组合继承
 */
{
  function Parent(name) {
    this.name = name;
    this.color = ['red', 'green', 'blue']
    
    this.add = function () {
      console.log('this is parent add method')
    }
  }
  Parent.prototype.getColor = function (index) {
    return this.color[index]
  }
  
  function Child(name, age) {
    // 继承属性: 第二次调用 Parent()
    Parent.call(this, name)
    this.age = age
  }
  
  // 继承方法: 构建原型链，第一次调用 Parent()
  Child.prototype = new Parent()
  // 重写 Child.prototype.constructor 属性，指向自己的构造函数
  Child.prototype.constructor = Child
  Child.prototype.getAge = function () {
    console.log('age:', this.age)
  }
  
  const child1 = new Child('child1', 18)
  child1.color.pop()
  console.log('color1:', child1.color)
  child1.add()
  child1.getAge()
  const child2 = new Child('child2', 28)
  console.log('color2:', child2.color)
  child2.add()
  child2.getAge()
  console.log('child:', child1, child2)
}


/**
 * 原型式继承
 */
{
  function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
  }
  
  const person = {
    name: 'leopold',
    friends: ['sze', 'ou']
  }
  const another = create(person)
  another.name = 'another'
  another.friends.push('another')
  
  const third = create(person)
  third.name = 'third'
  third.friends.push('third')
  console.log('data:', person, another, third)
}


/**
 * 寄生式继承
 */
{
  function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
  }
  
  function createAnother(origin) {
    const clone = create(origin) // 通过调用 create() 创建一个新对象
    clone.sayHi = function () { // 以某种方式来增强对象
      console.log('hi:', this.name)
    }
    const presentList = ['cake', 'duck-neck', 'pizza', 'milk-tea', 'cold-nuddle']
    return clone
  }
  
  const person = {
    name: 'sze',
    friends: ['sze', 'ou']
  }
  const another = createAnother(person)
  another.name = 'another'
  another.friends.push('another')
  another.sayHi()
  
  const third = createAnother(person)
  third.name = 'third'
  third.friends.push('third')
  third.sayHi()
  console.log('data:', person, another, third)
}
