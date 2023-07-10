import lookup from "./lookup";
import renderTemplate from "./renderTemplate";

/**
 * 处理数组：结合renderTemplate实现递归
 * 注意：这个函数接收的参数是token！而不是tokens
 * token是什么：就是一个简单的['#', 'students', []]
 * 这个函数要递归调用renderTemplate函数，调用多少次由data决定
 * @param token
 * @param data
 */
export default function parseArray (token, data) {
  // 得到整体数据中这个数组要使用的部分
  const v = lookup(data, token[1]);
  
  // 结果字符串
  let resultStr = '';
  
  // 遍历v数组，v一定是数组
  for (let i = 0; i < v.length; i++) {
    resultStr += renderTemplate(token[2], {
      ...v[i],
      '.': v[i]
    });
  }
  
  return resultStr;
}