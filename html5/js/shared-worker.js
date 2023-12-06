const connections = [];
self.addEventListener('connect', function (e) {
  const port = e.ports[0];
  connections.push(port);
  
  port.onmessage = function (ev) {
    for (let i = 0; i < connections.length; i++) {
      connections[i].postMessage(ev.data);
    }
  }
})
