const path = require('path');

console.log('join:', path.join(__dirname, 'a', 'b'));
console.log('join2:', path.join('a', 'b'));
console.log('resolve:', path.resolve('a', 'b'));
console.log('resolve2:', path.resolve('/hello', 'a', 'b'));
