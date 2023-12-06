// self 代表子线程本身
self.addEventListener('message', function (event) {
  const n = event.data;
  if (typeof n !== "number") {
    self.postMessage('参数类型错误');
    return false;
  }
  const result = fibonacci(n);
  self.postMessage(result);
}, false);

function fibonacci(n) {
  if (n <= 1) {
    return 1;
  }
  return fibonacci(n -1) + fibonacci(n - 2);
}
