import { BaseRouter } from "./baseRouter";

export class HashRouter extends BaseRouter {
  constructor(routes) {
    super(routes);
    this.handler();
    
    // 监听 hashchange 事件
    window.addEventListener('hashchange', e => {
      this.handler();
    });
  }
  
  /**
   * hash 改变时，重新渲染页面
   */
  handler() {
    this.render(this.getState());
  }
  
  /**
   * 获取 hash 值
   * @returns {string|string}
   */
  getState() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }
  
  /**
   * push 新的页面
   * @param path
   */
  push(path) {
    window.location.hash = path;
  }
  
  /**
   * 获取 默认页 url
   * @param path
   * @returns {string}
   */
  getUrl(path) {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return base +'#'+ path;
  }
  
  /**
   * 替换页面
   * @param path
   */
  replace(path) {
    window.location.replace(this.getUrl(path));
  }
  
  /**
   * 前进 or 后退浏览历史
   * @param n
   */
  go(n) {
    window.history.go(n);
  }
}
