const { Server } = require('ws')

const wss = new Server({ port: 5566 }, () => {
  console.log('ws服务启动成功：5566')
})

wss.on('connection', (e) => {
  console.log('e:', e)
})