const dialog = document.querySelector('#dialog');
const msg = document.querySelector('#msg');

/**
 * 打开提示
 * @param toast
 * @param delay
 */
function showToast(toast, delay = 2000) {
  msg.innerText = toast;
  dialog.showModal();
  setTimeout(() => {
    dialog.close();
  }, delay)
}

/**
 * 关闭提示框
 */
dialog.addEventListener('close', () => {
  msg.innerText = '';
})



// ######################## 地理位置 #####################
/**
 * 获取地理位置，超时时间10s
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      showToast('获取位置成功', 1000);
      const { latitude, longitude, accuracy } = position?.coords;
      const locationInfo = document.querySelector('#location__info');
      locationInfo.innerText = `您的位置是： 经度：${longitude}，纬度：${latitude}，精度：${accuracy}米`;
    }, dealError, { timeout: 10000 })
  } else {
    showToast('您的浏览器暂不支持geolocation API');
  }
}

/**
 * 处理位置获取失败
 * @param error
 */
function dealError(error) {
  switch(error.code) {
      // 用户拒绝了地理定位请求
    case error.PERMISSION_DENIED:
      showToast("用户拒绝了地理定位请求");
      break;
      // 地理位置信息不可用
    case error.POSITION_UNAVAILABLE:
      showToast("地理位置信息不可用");
      break;
      // 获取位置信息超时
    case error.TIMEOUT:
      showToast("获取位置信息超时");
      break;
      // 其他未知错误
    default:
      showToast("发生其他未知错误");
      break;
  }
}


// ################### web worker ####################
const num = document.querySelector('#num');
const result = document.querySelector('#result');
const calcBtn = document.querySelector('#calc-button');
const stopBtn = document.querySelector('#stop-button');
let workerTerminate = false; // 是否停止worker
/**
 * dedicated worker
 * @type {Worker}
 */
const worker = new Worker('js/dedicated-worker.js');
/**
 * 主线程接收子线程传递回的结果
 */
worker.addEventListener('message', function (e) {
  result.textContent = e.data;
}, false);
calcBtn.addEventListener('click', function () {
  const n = parseInt(num.value, 10);
  // 主线程向子线程传递数据
  worker.postMessage(n);
}, false);
stopBtn.addEventListener('click', function () {
  workerTerminate = true;
  result.textContent = '已停止';
  // 终止worker对象
  worker.terminate();
}, false);

/**
 * shared worker
 * @type {SharedWorker}
 */
const sharedWorker = new SharedWorker('js/shared-worker.js');
const port = sharedWorker.port;
const sendMsg = document.querySelector('#send-msg');
const sendBtn = document.querySelector('#send-btn');
const sharedResult = document.querySelector('#shared-result');
port.onmessage = function (e){
  const msg = document.createElement('p');
  msg.textContent = `在主页面收到消息:${e.data}`;
  sharedResult.appendChild(msg);
};
port.start();
sendBtn.addEventListener('click', function () {
  if (!sendMsg.value) {
    return false;
  }
  port.postMessage(sendMsg.value);
})



// ################## SSE ##########################
/**
 * SSE
 * @type {EventSource}
 */
const eventSource = new EventSource('http://localhost:22024/sse');
const sseMsg = document.querySelector('#sse-msg');
eventSource.onopen = function (event) {
  console.log('Connection Opened!', event);
}
eventSource.onmessage = function(event) {
  console.log("Received data: " + event);
  sseMsg.innerText = event.data;
};
eventSource.onerror = function(event) {
  console.log("Error occurred: " + event);
};
