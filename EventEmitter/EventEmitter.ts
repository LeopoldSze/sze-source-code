export class EventEmitter {
  private _events: Record<string, Array<Function>>;
  
  constructor() {
    this._events = Object.create(null);
  }
  
  emit (evt: string, ...args: any[]) {
    if (!this._events[evt]) return false;
    
    const fns = [...this._events[evt]];
    fns.forEach(fn => fn.apply(this, args))
    
    return true;
  }
  
  on(evt: string, fn: Function) {
    if (typeof fn !== "function") {
      throw new TypeError("The evet-triggered callback must be a function");
    }
    if (!this._events[evt]) {
      this._events[evt] = [fn];
    } else {
      this._events[evt].push(fn);
    }
  }

  once(evt: string, fn: Function) {
    const execFn = () => {
      fn.apply(this);
      this.off(evt, execFn);
    };
    this.on(evt, execFn);
  }
  
  off(evt: string, fn?: Function) {
    if (!this._events[evt]) return;
    
    if (!fn) {
      this._events[evt] && (this._events[evt].length = 0);
    }
  
    let cb;
    const cbLen = this._events[evt].length;
    for (let i = 0; i < cbLen; i++) {
      cb = this._events[evt][i];
      if (cb === fn) {
        this._events[evt].splice(i, 1);
        break;
      }
    }
  }

  removeAllListeners(evt?: string) {
    if (evt) {
      this._events[evt] && (this._events[evt].length = 0);
    } else {
      this._events = Object.create(null);
    }
  }
}





