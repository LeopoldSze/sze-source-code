/**
 * 原型模式
 * @constructor
 */
function Plane() {
  this.blood = 100;
  this.attackLevel = 1;
  this.defenseLevel = 1;
}
const plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 5;

const clonePlane = Object.create(plane);
clonePlane.defenseLevel = 20;
clonePlane.blood = 5;
console.log('clonePlane:', clonePlane, plane);

/**
 * this指向
 */
// 1. 作为对象的方法调用
const a = {
  name: 'sze',
  getName1() {
    console.log(this === a) // true
  },
  getName2() {
    console.log(this === a) // true
  }
}
a.getName1();
a.getName2();

// 2. 作为普通函数调用
function b1() {
  console.log(this === window) // true
}
b1();
// export function b2() {
//   console.log(this) // undefined
// }


/**
 * 用代理实现单例模式
 * @param html
 * @constructor
 */
function CreateDiv(html) {
  this.html = html;
  this.init();
}
CreateDiv.prototype.init = function () {
  const div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
}
const ProxySingleton = (function () {
  let instance = null;
  return function (html) {
    if (instance) {
      return instance;
    }
    
    return instance = new CreateDiv(html);
  }
})();
const div1 = new ProxySingleton('div1');
const div2 = new ProxySingleton('div2');
console.log(div1 === div2); // true


/**
 * 惰性单例
 * @param fn
 * @returns {function()}
 */
function getSingle(fn) {
  let result = null;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
}
/**
 * 创建登录弹窗
 * @returns {HTMLDivElement}
 */
function createLoginLayer() {
  const div = document.createElement('div');
  div.innerHTML = '我是登录弹窗';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}
const createSingleLoginLayer = getSingle(createLoginLayer);
const btn = document.createElement('button');
btn.innerText = '登录';
document.body.appendChild(btn);

btn.onclick = function () {
  const loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
}

/**
 * js版本策略模式
 * @param level
 * @param salary
 * @returns {*}
 */
// context委托
function calculateBonus(level, salary) {
  return strategies[level](salary);
}
// 策略对象
const strategies = {
  S(salary) {
    return salary * 4;
  },
  A(salary) {
    return salary * 3;
  },
  B(salary) {
    return salary * 2;
  }
}
console.log(calculateBonus('S', 10000)); // 40000
console.log(calculateBonus('A', 8000)); // 24000


/**
 * 表单验证-策略模式
 */
class Validator {
  constructor () {
    this.cache = [];
  }
  add(dom, rules) {
    const len = rules.length;
    for(let i = 0; i < len; i++ ) {
      const rule = rules[i];
      const strategyArr = rule.strategy.split(':');
      const errorMsg = rule.errorMsg;
      function handler() {
        const strategy = strategyArr.shift();
        strategyArr.unshift(dom.value);
        strategyArr.push(errorMsg);
        return formStrategies[strategy].apply(dom, strategyArr);
      }
      
      this.cache.push(handler)
    }
  }
  
  start() {
    for (let i = 0; i < this.cache.length; i++) {
      const errorMsg = this.cache[i]();
      if (errorMsg) {
        return errorMsg;
      }
    }
  }
}

/**
 * 策略对象
 * @type {{minLength(*, *, *): (*|undefined), isNonEmpty(*, *): (*|undefined), isMobile(*, *): (*|undefined)}}
 */
const formStrategies = {
  isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile(value, errorMsg) {
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    if (!reg.test(value)) {
      return errorMsg;
    }
  }
}
const registerForm = document.getElementById('registerForm');
function validate() {
  const validator = new Validator();
  validator.add(registerForm.username, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空'
    },
    {
      strategy: 'minLength:10',
      errorMsg: '用户名长度不能小于10位'
    }
  ])
  validator.add(registerForm.password, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '密码不能为空'
    },
    {
      strategy: 'minLength:8',
      errorMsg: '密码长度不能小于8位'
    }
  ])
  validator.add(registerForm.phone, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '手机号不能为空'
    },
    {
      strategy: 'isMobile',
      errorMsg: '手机号格式不正确'
    }
  ])

  return validator.start();
}
registerForm.onsubmit = function () {
  const errorMsg = validate();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
  alert('提交成功');
}

/**
 * 代理模式
 */
function mult(...args) {
  let a = 1;
  args.forEach(item => {
    a *= item;
  })
  return a;
}
function add(...args) {
  let a = 0;
  args.forEach(item => {
    a += item;
  })
  return a;
}

/**
 * 缓存代理工厂函数
 * @param fn
 * @returns {(function(...[*]): (*))|*}
 */
function proxyFactory(fn) {
  const cache = {};
  return function (...args) {
    const key = args.join(',');
    if (cache[key]) {
      return cache[key];
    }
    
    return cache[key] = fn.apply(this, args);
  }
}
const proxyMult = proxyFactory(mult);
const proxyAdd = proxyFactory(add);
console.log(proxyMult(1, 2, 3, 4)); // 24
console.log(proxyMult(1, 2, 3, 4)); // 24
console.log(proxyAdd(1, 2, 3, 4)); // 10
console.log(proxyAdd(1, 2, 3, 4)); // 10


/**
 * 迭代器模式
 * @param obj
 * @returns {{next: (function(): number), getCurrentItem: (function(): *), isDone: (function(): boolean)}}
 */
function iterator(obj) {
  let current = 0;
  
  const next = () => current += 1;
  
  const isDone = () => current >= obj.length;
  
  const getCurrentItem = () => obj[current];
  
  return {
    next,
    isDone,
    getCurrentItem
  }
}
function compare(iterator1, iterator2) {
  if (iterator1.length !== iterator2.length) {
    throw new TypeError('iterator1和iterator2不相等');
  }
  
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      throw new TypeError('iterator1和iterator2不相等');
    }
    iterator1.next();
    iterator2.next();
  }
  
  console.log('iterator1和iterator2相等');
}
compare(iterator([1, 2, 3]), iterator([1, 2, 3])); // 相等

/**
 * 发布-订阅模式
 * @type {{clientList: {}, trigger(...[*]): (boolean|undefined), listen(*, *): void}}
 */
const event = {
  clientList: {},
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    // 订阅的消息添加进缓存列表
    this.clientList[key].push(fn);
  },
  trigger(...args) {
    const key = args.shift();
    const fns = this.clientList[key];
    
    // 没有绑定对应的消息
    if (!fns || fns.length === 0) {
      return false;
    }
    
    for(let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.apply(this, args);
    }
  },
  remove(key, fn) {
    const fns = this.clientList[key];
    
    // 如果key对应的消息没有被人订阅，则直接返回
    if (!fns) {
      return false;
    }
    
    // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      // 反向遍历订阅的回调函数列表
      for (let i = fns.length - 1; i >= 0; i--) {
        const _fn = fns[i];
        if (_fn === fn || _fn.toString() === fn.toString()) {
          fns.splice(i, 1);
        }
      }
    }
  }
}
function installEvent(obj) {
  for (const key in event) {
    obj[key] = event[key];
  }
}
const saleOffices = {};
installEvent(saleOffices);
saleOffices.listen('sm88', (price, time) => {
  console.log('价格是：', price, time);
})
saleOffices.listen('sm88', (price, time, size) => {
  console.log('价格2是：', price, time, size);
})
const fn100 = (price, time) => {
  console.log('价格是：', price, time);
}
saleOffices.listen('sm100', fn100);
saleOffices.remove('sm100', fn100);
saleOffices.trigger('sm88', 100, '2023-06-09', 'big');
saleOffices.trigger('sm100', 200, '2023-06-12', 'huge');
saleOffices.trigger('sm100', 200, '2023-06-30', 'large');
// 价格是： 100 2023-06-09
// 价格2是： 100 2023-06-09 big


/**
 * 宏命令 - 组合模式
 * @type {{execute(): void}}
 */
const closeDoorCommand = {
  execute() {
    console.log('关门');
  }
}
const openPcCommand = {
  execute() {
    console.log('开电脑');
  }
}
const openQQCommand = {
  execute() {
    console.log('登录QQ');
  }
}
class MacroCommand {
  constructor () {
    this.commandList = [];
  }
  
  add(command) {
    this.commandList.push(command);
  }
  
  execute() {
    this.commandList.forEach(command => command.execute())
  }
}
const macroCommand = new MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();
// 关门
// 开电脑
// 登录QQ


/**
 * 对象池
 * @param createObjFn
 * @returns {{recover(*): void, create(...[*]): *}|*}
 */
function objectPoolFactory(createObjFn) {
  const objectPool = [];
  
  return {
    create(...args) {
      return objectPool.length === 0 ? createObjFn.apply(this, args) : objectPool.shift();
    },
    recover(obj) {
      objectPool.push(obj)
    }
  }
}
const iframeFactory = objectPoolFactory(function () {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  
  iframe.onload = function () {
    iframe.onload = null; // 防止iframe重复加载的bug
    iframeFactory.recover(iframe); // iframe加载完成之后回收节点
  }
  
  return iframe;
});
// const iframe1 = iframeFactory.create();
// iframe1.src = 'https://www.google.com';
// const iframe2 = iframeFactory.create();
// iframe2.src = 'https://www.bilibili.com';
// setTimeout(function () {
//   const iframe3 = iframeFactory.create();
//   iframe3.src = 'https://movie.douban.com/';
// }, 3000);



/**
 * 职责链模式
 * @param orderType
 * @param pay
 * @param stock
 * @returns {string}
 */
function order500(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，得到100优惠券');
  } else {
    return 'nextSuccessor';
  }
}
function order200(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到50优惠券');
  } else {
    return 'nextSuccessor';
  }
}
function orderNormal(orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
}
class Chain {
  constructor (fn) {
    this.fn = fn;
    this.successor = null;
  }
  
  setNextSuccessor(successor) {
    return this.successor = successor;
  }
  
  passReq(...args) {
    const result = this.fn.apply(this, args);
    
    if (result === 'nextSuccessor') {
      return this.successor && this.successor.passReq.apply(this.successor, args);
    }
    
    return result;
  }
}
// 定义职责链的节点
const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);
// 指定节点在职责链的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
// 传递请求给第二个节点
chainOrder200.passReq(2, false, 0); // 手机库存不足



/**
 * 中介者模式
 */
class Player {
  constructor (name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive';
  }
  
  win() {
    console.log(`${this.name} win`);
  }
  
  lose() {
    console.log(`${this.name} lose`);
  }
  
  die() {
    this.state = 'dead';
    playDirector.ReceiveMessage('playerDead', this); // 给中介者发消息，玩家死亡
  }
  
  remove() {
    playDirector.ReceiveMessage('removePlayer', this); // 给中介者发消息，移除玩家
  }
  
  changeTeam(color) {
    playDirector.ReceiveMessage('changeTeam', this, color); // 给中介者发消息，玩家换队
  }
}

/**
 * 新增玩家工厂函数
 * @param name
 * @param teamColor
 * @returns {Player}
 */
function playerFactory(name, teamColor) {
  const newPlayer = new Player(name, teamColor);
  playDirector.ReceiveMessage('addPlayer', newPlayer); // 给中介者发消息，新增玩家
  
  return newPlayer;
}

const playDirector = (function () {
  const players = {}, operations = {};
  
  // 新增玩家
  operations.addPlayer = function (player) {
    const teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍
    players[teamColor].push(player);
  }
  
  // 移除玩家
  operations.removePlayer = function (player) {
    const teamColor = player.teamColor;
    players[teamColor] = players[teamColor].filter(item => item !== player);
  }
  
  // 玩家换队
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player); // 从原队伍中删除
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer(player); // 添加到新队伍
  }
  
  // 玩家死亡
  operations.playerDead = function (player) {
    const teamColor = player.teamColor;
    let teamPlayers = players[teamColor] || [];
    let ALL_DEAD = true;
    for (let i = 0; i < teamPlayers.length; i++) {
      if (teamPlayers[i].state !== 'dead') {
        ALL_DEAD = false;
        break;
      }
    }
    
    // 全部死亡
    if (ALL_DEAD) {
      // 本队所有玩家死亡
      teamPlayers.forEach(item => {
        item.lose();
      })
      
      for (const color in players) {
        if (color !== teamColor) {
          const winTeam = players[color];
          winTeam.forEach(item => {
            item.win();
          })
        }
      }
    }
  }
  
  // 接收消息
  function ReceiveMessage(...args) {
    const message = args[0] || '';
    operations[message].apply(this, args.slice(1));
  }
  
  return {
    ReceiveMessage
  }
})();

// 红队
const player1 = playerFactory('红队1号', 'red');
const player2 = playerFactory('红队2号', 'red');
const player3 = playerFactory('红队3号', 'red');
const player4 = playerFactory('红队4号', 'red');
// 蓝队
const player5 = playerFactory('蓝队1号', 'blue');
const player6 = playerFactory('蓝队2号', 'blue');
const player7 = playerFactory('蓝队3号', 'blue');
const player8 = playerFactory('蓝队4号', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();



/**
 * 状态模式
 */
// 上传插件
const plugin = (function () {
  const plugin = document.createElement('embed');
  plugin.style.display = 'none';
  plugin.type = 'application/txftn-webkit';
  
  plugin.sign = function () {
    console.log('开始文件扫描');
  }
  plugin.pause = function () {
    console.log('暂停文件上传');
  }
  plugin.uploading = function () {
    console.log('开始文件上传');
  }
  plugin.del = function () {
    console.log('删除文件上传');
  }
  plugin.done = function () {
    console.log('文件上传完成');
  }
  document.body.appendChild(plugin);
  
  return plugin;
})();

class Upload {
  constructor (fileName) {
    this.plugin = plugin;
    this.fileName = fileName;
    this.button1 = null;
    this.button2 = null;
    this.signState = new SignState(this); // 设置初始状态为waiting
    this.uploadingState = new UploadingState(this);
    this.pauseState = new PauseState(this);
    this.doneState = new DoneState(this);
    this.errorState = new ErrorState(this);
    this.currentState = this.signState; // 设置当前状态
  }
  
  init() {
    this.dom = document.createElement('div');
    this.dom.innerHTML = `<span>文件名称:${this.fileName}</span>
                          <button data-action="button1">扫描中</button>
                          <button data-action="button2">删除</button>`;
    document.body.appendChild(this.dom);
    this.button1 = this.dom.querySelector('[data-action="button1"]');
    this.button2 = this.dom.querySelector('[data-action="button2"]');
    this.bindEvent();
  }
  
  bindEvent() {
    const self = this;
    this.button1.onclick = function () {
      self.currentState.clickHandler1();
    }
    this.button2.onclick = function () {
      self.currentState.clickHandler2();
    }
  }
  
  sign() {
    this.plugin.sign();
    this.currentState = this.signState;
  }
  
  uploading() {
    this.button1.innerHTML = '正在上传，点击暂停';
    this.plugin.uploading();
    this.currentState = this.uploadingState;
  }
  
  pause() {
    this.button1.innerHTML = '已暂停，点击继续上传';
    this.plugin.pause();
    this.currentState = this.pauseState;
  }
  
  done() {
    this.button1.innerHTML = '上传完成';
    this.plugin.done();
    this.currentState = this.doneState;
  }
  
  error() {
    this.button1.innerHTML = '上传失败';
    this.currentState = this.errorState;
  }
  
  del() {
    this.plugin.del();
    this.dom.parentNode.removeChild(this.dom);
  }
}

const StateFactory = (function () {
  class State {
    clickHandler1() {
      throw new Error('子类必须重写父类的clickHandler1方法');
    }
    clickHandler2() {
      throw new Error('子类必须重写父类的clickHandler2方法');
    }
  }
  
  return function (param) {
    function F (uploadObj) {
      this.uploadObj = uploadObj;
    }
    
    F.prototype = new State();
    
    for (const key in param) {
      F.prototype[key] = param[key];
    }
    
    return F;
  }
})();

const SignState = StateFactory({
  clickHandler1() {
    console.log('扫描中，点击无效...');
  },
  clickHandler2() {
    console.log('文件正在上传中，不能删除');
  }
});
const UploadingState = StateFactory({
  clickHandler1() {
    this.uploadObj.pause();
  },
  clickHandler2() {
    console.log('文件正在上传中，不能删除');
  }
});
const PauseState = StateFactory({
  clickHandler1() {
    this.uploadObj.uploading();
  },
  clickHandler2() {
    this.uploadObj.del();
  }
});
const DoneState = StateFactory({
  clickHandler1() {
    console.log('文件已完成上传，点击无效');
  },
  clickHandler2() {
    this.uploadObj.del();
  }
});
const ErrorState = StateFactory({
  clickHandler1() {
    console.log('文件上传失败，点击无效');
  },
  clickHandler2() {
    this.uploadObj.del();
  }
});
const uploadObj = new Upload('javascript 设计模式与开发实践');
uploadObj.init();
window.external.upload = function (state) {
  console.log(state); // 可能为sign uploading done error
  uploadObj[state]();
};
window.external.upload('sign');
setTimeout(() => {
  window.external.upload('uploading');
}, 1000);
setTimeout(() => {
  window.external.upload('done');
}, 5000);



/**
 * 对象属性版-状态机
 */
class Light1 {
  constructor () {
    this.currentState = FSM.off; // 设置当前状态
    this.button = null;
  }
  
  init() {
    const button = document.createElement('button');
    const self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function () {
      self.currentState.buttonWasPressed.call(self);
    }
  }
}

const FSM = {
  off: {
    buttonWasPressed() {
      console.log('关灯');
      this.button.innerHTML = '下一次按我是开灯';
      this.currentState = FSM.on;
    }
  },
  on: {
    buttonWasPressed() {
      console.log('开灯');
      this.button.innerHTML = '下一次按我是关灯';
      this.currentState = FSM.off;
    }
  }
}
const light1 = new Light1();
light1.init();

/**
 * 闭包版-状态机
 */
function delegate(client, delegation) {
  return {
    buttonWasPressed(...args) {
      return delegation.buttonWasPressed.apply(client, args);
    }
  }
}
class Light2 {
  constructor () {
    this.offState = delegate(this, FSM.off);
    this.onState = delegate(this, FSM.on);
    this.currentState = FSM.off; // 设置当前状态
    this.button = null;
  }
  
  init() {
    const button = document.createElement('button');
    const self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function () {
      self.currentState.buttonWasPressed.call(self);
    }
  }
}
const light2 = new Light2();
light2.init();



function Person() {}
function Ninja() {}
Ninja.prototype = new Person();
const ninja = new Ninja();
console.log('ninja:', ninja);


const html = '<div class="test"><b>Hello</b> <i>world!</i></div>'
const reg = /<(\/?)(\w+)([^>]*?)/
const reg2 = /<(\/?)(\w+)([^>]*?)/g
const result1 = html.match(reg)
const result2 = html.match(reg2)
console.log('re:', result1, result2);