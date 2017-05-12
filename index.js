const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Content-Type', 'application/json');
  next();
});

require('./router')(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});