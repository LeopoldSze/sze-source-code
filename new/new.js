/**
 * myNew
 * @param context
 * @param args
 * @returns {*|Object}
 */
function myNew(context, ...args) {
  const obj = {};
  obj.__proto__ = context.prototype;
  const res = context.apply(obj, args.slice(1));
  return typeof res === "object" ? res : obj;
}


function T (name) {
  this.name = name;
}

const t1 = new T('Sze');
console.log(t1);

const t2 = myNew(T, 'sze')
console.log(t2);