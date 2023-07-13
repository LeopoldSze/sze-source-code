const express = require('express')
const cors = require('cors')
const { data, sseStr } = require('./data')

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))

/**
 * jsonp请求
 */
app.get('/api/jsonp', (req, res) => {
  const { callback = 'callback' } = req.query
  res.send(`${callback}('hello, jsonp')`)
})

/**
 * 普通请求
 */
app.get('/api/json', (req, res) => {
  res.send({ "name": "sze" })
})

/**
 * cors请求
 */
app.get('/api/cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342')
  res.send({ "method": "cors" })
})

/**
 * Nginx代理
 */
app.get('/api/nginx', (req, res) => {
  res.send({ "hello": "nginx" })
})

/**
 * xhr-get
 */
app.get('/xhr/get', (req, res) => {
  console.log('xhr-get:', req.query)
  res.send(data)
})

/**
 * xhr-post
 */
app.post('/xhr/post', (req, res) => {
  console.log('xhr-post:', req.body)
  res.json({
    data: 'sze',
    code: 200
  })
})

/**
 * xhr-upload
 */
app.post('/xhr/upload', (req, res) => {
  console.log('xhr-upload:', req.body)
  res.json({
    code: 200,
    data: 'upload success'
  })
})

/**
 * fetch-get
 */
app.get('/fetch/get', (req, res) => {
  console.log('fetch-get:', req.query)
  res.send(data)
})

/**
 * fetch-post
 */
app.post('/fetch/post', (req, res) => {
  console.log('fetch-post:', req.body)
  res.json({
    data: 'sze',
    code: 200
  })
})

/**
 * sse
 */
app.get('/api/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream'
  })
  const arr = sseStr.split('')
  let current = 0
  let timer = setInterval(() => {
    if (current < arr.length) {
      res.write(`data: ${arr[current]}\n\n`)
      current++
    } else {
      clearInterval(timer)
    }
  }, 300)
})

/**
 * sendBeacon请求:只接受POST
 */
app.post('/api/beacon', (req, res) => {
  console.log('beacon:', req.query)
  res.send('beacon~')
})

/**
 * 监听端口
 */
app.listen(3000, () => {
  console.log('server is running on port 3000')
})
