import InterceptorManager from "./InterceptorManager";

class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }
}

export default Axios;
