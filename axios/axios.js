import Axios from "./core/Axios";
import bind from "./helpers/bind";
import utils from "./utils";

function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  
  // instance 为绑定了 context 实例的函数，函数内部调用了 Axios 原型上的 request 方法
  const instance = bind(Axios.prototype.request, context);
  
  // 将 Axios 原型上的方法扩展到 instance 上
  utils.extend(instance, Axios.prototype, context, { allOwnKeys: true })
  
  // 将 context 上的属性扩展到 instance 上
  utils.extend(instance, context, null, { allOwnKeys: true })
  
  // 提供一个工厂函数，用来生成 instance 实例
  instance.create = function create(instanceConfig) {
    return createInstance()
  }
}
