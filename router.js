const tzService = require('./services/timezone.service');

module.exports = function(app) {
  app.get('/api/locations', (req, res) => {
    let params = req.query;
    res.send(tzService.search(params))
  });

  app.all('*', (req, res) => {
    res.status(404).send('404 page not found')
  });
};

