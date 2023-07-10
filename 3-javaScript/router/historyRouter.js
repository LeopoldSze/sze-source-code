import { BaseRouter } from "./baseRouter";

export class HistoryRouter extends BaseRouter {
  constructor(routes) {
    super(routes);
    this.handler();
    
    // 监听 popstate 事件
    window.addEventListener('popstate', e => {
      console.log('触发 popstate。。。');
      this.handler();
    });
  }
  
  /**
   * 渲染页面
   */
  handler() {
    this.render(this.getState());
  }
  
  /**
   * 获取 url
    * @returns {string|string}
   */
  getState() {
    const path = window.location.pathname;
    return path ? path : '/';
  }
  
  /**
   * push 页面
   * @param path
   */
  push(path) {
    history.pushState(null, null, path);
    this.handler();
  }
  
  /**
   * replace 页面
   * @param path
   */
  replace(path) {
    history.replaceState(null, null, path);
    this.handler();
  }
  
  /**
   * 前进 or 后退浏览历史
   * @param n
   */
  go(n) {
    window.history.go(n);
  }
}
