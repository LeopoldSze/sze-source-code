/**
 * 函数的功能是折叠tokens，将#和/之间的tokens能够整合起来，作为它的下标为3的项
 * @param tokens
 */
export default function nestTokens (tokens) {
  // 结果数据
  const nestTokens = []
  // 栈结构，存放小tokens，栈顶（最新进入的）的tokens数组中当前操作的这个tokens小数组
  const sections = []
  // 收集器，天生指向nestTokens结果数组，引用类型值，所以指向的是同一个数组
  // 收集器的指向会变化，当遇见#的时候，收集器会指向这个token的下标为2的新数组
  let collector = nestTokens;
  
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    
    switch (token[0]) {
      case '#':
        // 收集器中放入这个token
        collector.push(token);
        // 入栈
        sections.push(token);
        // 收集器要换人，给token添加下标为2的项，并且让收集器指向他
        collector = token[2] = [];
        break
      case '/':
        // 出栈，pop（）会返回刚刚弹出的项
        let section_pop = sections.pop();
        // 改变收集器为栈结构队尾（队尾是栈顶那项的下标为2的数组
        collector = sections.length ? sections[sections.length - 1][2] : nestTokens;
        break
      default:
        // 不管当前的collector是谁，可能是结果nestTokens，也可能是某个token的下标为2的数组，不管是谁，推入collector即可。
        collector.push(token);
    }
  }
  
  return nestTokens
}