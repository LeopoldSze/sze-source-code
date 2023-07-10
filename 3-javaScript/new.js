/**
 * 手写new方法
 * @param Constructor
 * @param args
 * @returns {*}
 * @constructor
 */
function SzeNew(Constructor, ...args) {
  // 创建一个新对象，使其原型指向构造函数的原型
  const obj = Object.create(Constructor.prototype);
  
  // 执行构造函数，并将this绑定到对象上
  const result = Constructor.apply(obj, args);
  
  // 如果构造函数返回了一个对象，则直接返回该对象
  if (typeof result === 'object' && result !== null) {
    return result;
  }
  
  // 否则返回新对象
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = SzeNew(Person, 'sze', 18);
console.log('person:', person); // Person {name: 'sze', age: 18}

function Animal(sound) {
  this.sound = sound;
  return {
    name: 'doge',
    sound: 'wow'
  }
}
const animal = SzeNew(Animal, 'wang');
console.log('animal:', animal); // Animal {name: 'doge', sound: 'wow'}

/**
 * 手写继承
 * @param Child
 * @param Parent
 */
function inherit(Child, Parent) {
  // 继承原型
  Child.prototype = Object.create(Parent.prototype);
  
  // 修复constructor
  Child.prototype.constructor = Child;
  
  // 静态属性继承
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(Child, Parent);
  } else if (Child.__proto__) {
    Child.__proto__ = Parent;
  } else {
    // 兼容IE10等版本浏览器
    // 将Parent上的静态属性和方法拷贝一份到Child上，但不会覆盖Child上原有的方法
    for (const key in Parent) {
      if (Parent.hasOwnProperty(key) && !(key in Child)) {
        Child[key] = Parent[key];
      }
    }
  }
}


class People {
  constructor (name) {
    this.name = 'person';
  }
}
class Student extends People {
  constructor () {
    super()
  }
}
const stu = new Student();
console.log('stu:', stu);