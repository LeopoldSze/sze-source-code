const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
})

router.get('/index', (req, res) => {
  const query = req.query;
  res.send('Hello, this is index page!')
})

router.post('/index', (req, res) => {
  const body = req;
  console.log(body);
  res.send('Hello, this is post index!')
})

module.exports = router;