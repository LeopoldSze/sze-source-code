/**
 * 功能是可以在dataObj对象中，寻找用连续点符号的keyName属性
 * 比如：dataObj = { a: { b: { c: 100 } } }，
 * 那么lookup(dataObj, 'a.b.c')结果就是100
 * @param dataObj
 * @param keyName
 */
export default function lookup (dataObj, keyName) {
  // 查看keyName中有没有点符号，但是不能是.本身
  if (keyName.indexOf('.') !== -1 && keyName !== '.') {
    const keys = keyName.split('.');
    // 设置一个临时变量，用于周转，一层一层找下去
    let temp = dataObj;
    for (let i = 0; i < keys.length; i++) {
      // 每找一层，就把它设置为临时变量
      temp = temp[keys[i]];
    }
    
    return temp;
  }
  
  // 如何没有点符号
  return dataObj[keyName];
}