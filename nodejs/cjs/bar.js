// const foo = require('./foo'); // 统一导入
const { name, foo1: foo } = require('./foo'); // 解构导入、重命名解构导入

foo();
console.log('name:', name);
