const express = require('express');
const router = require('./router.js');

const app = express();
app.use(router);

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});