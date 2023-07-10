import parseTemplate2Tokens from "./parseTemplate2Tokens";
import renderTemplate from "./renderTemplate";

// 全局提供 SSG_TemplateEngine 对象
window.SSG_TemplateEngine = {
  render(templateStr, data) {
    /*
    // Scanner 单元测试
    // 实例化一个扫描器，构造时候提供一个参数，这个参数就是模板字符串
    // 也就是说这个扫描器就是针对这个模板字符串工作的
    const scanner = new Scanner(templateStr);
    
    let word = ''
    
    // 当scanner指针没有到头
    while (!scanner.eos()) {
      let word = scanner.scanUntil('{{')
      console.log(word)
      scanner.scan('{{')
      word = scanner.scanUntil('}}')
      console.log(word);
      scanner.scan('}}')
    }*/
    
    
    // 调用 parseTemplate2Tokens 函数，让模板字符串能够变为tokens数组
    const tokens = parseTemplate2Tokens(templateStr, data);
    
    // 调用 renderTemplate 函数，让tokens数组变为DOM字符串
    return renderTemplate(tokens, data);
  }
}