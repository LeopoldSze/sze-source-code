import lookup from "./lookup";
import parseArray from "./parseArray";

/**
 * 函数的功能是让tokens数组变为DOM字符串
 * @param tokens
 * @param data
 */
export default function renderTemplate (tokens, data) {
  // 结果字符串
  let resultStr = '';
  
  // 遍历tokens
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    
    // 看类型
    if (token[0] === 'text') {
      // 拼起来
      resultStr += token[1];
    } else if (token[0] === 'name') {
      // 如果是name类型，那么直接使用它的值，注意多层对象lookup
      resultStr += lookup(data, token[1]);
    } else if (token[0] === '#') {
      // 循环递归处理下标为2的小数组
      resultStr += parseArray(token, data);
    }
  }
  
  return resultStr;
}