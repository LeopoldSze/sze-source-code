const dialog = document.querySelector('#dialog');
const msg = document.querySelector('#msg');

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

/**
 * 提示
 * @param toast
 * @param delay
 */
function showToast(toast, delay = 3000) {
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
