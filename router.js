const tzService = require('./services/timezone.service');
const placesService = require('./services/places.service');

module.exports = function(app) {
  app.get('/api/timezones', (req, res) => {
    let params = req.query;
    res.send(tzService.search(params))
  });

  app.get('/api/locations', (req, res) => {
    let params = req.query;

    return placesService.search(params)
      .then(places => res.send(places))
  });

  app.all('*', (req, res) => {
    res.status(404).send('404 page not found')
  });
};

