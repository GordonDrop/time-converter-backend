const express = require('express');
const app = express();
const config = require('./config');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Content-Type', 'application/json');
  next();
});

require('./router')(app);

app.listen(config.PORT, () => {
  console.log(`Example app listening on port! ${config.PORT}`);
});