export class BaseRouter {
  constructor(routes) {
    this.routes = routes; // 路由表
  }
  
  render(path) {
    let ele = this.routes.find(ele => ele.path === path);
    ele = ele ? ele : this.routes.find(ele => ele.path === '*');
    document.body.innerText = ele.component;
  }
}
