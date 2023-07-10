const timeChunk = function (ary, fn, count) {
  let timer;
  const len = ary.length;
  
  const start = function () {
    for (let i = 0; i < Math.min(count || 1, len); i++) {
      const obj = ary.shift();
      fn(obj);
    }
  };
  
  return function () {
    timer = setInterval(function () {
      // 如果全部节点都已经被创建好
      if (!len) {
        return clearInterval(timer);
      }
      
      start();
    }, 200); // 分批执行的时间间隔，也可以用参数的形式传入
  };
};


const arg = [];
for (let i = 0; i < 200; i++) {
  arg.push(i);
}

const renderFriendList = timeChunk(arg, function (n) {
  const div = document.createElement('div');
  div.innerHTML = n;
  document.body.appendChild(div);
}, 8);

renderFriendList();

/**
 * 单例模式
 */
