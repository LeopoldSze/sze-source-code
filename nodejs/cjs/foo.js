function foo1() {
  console.log('foo1');
}

// ################## 建议使用 module.exports 统一导出，同时使用时 exports 属性导出无效 ##################################
/**
 * exports 属性导出
 * @type {string}
 */
// exports.name2 = 'foo1-2';
// exports.foo1 = foo1;

/**
 * module.exports 统一导出
 * @type {{foo1: foo1}}
 */
module.exports = {
  foo1
}
/**
 * module.exports 属性导出
 * @type {string}
 */
module.exports.name = 'foo1';
