const tzService = require('./services/timezone.service');
const placesService = require('./services/places.service');
const _ = require('lodash');

module.exports = function(app) {
  // TODO: finish it
  app.get('/api/timezones', (req, res) => {
    let params = req.query;
    res.send(tzService.search(params))
  });

  // GET list of locations by names
  app.get('/api/locations', (req, res) => {
    // TODO: real array
    let locationsList = req.query.q.replace('+', ' ').split(',');

    placesService.locationsByTimezone(locationsList)
      .then(locations => res.send(locations));
  });

  // GET search location by timezoneId
  // return list PlacesModels{json}
  app.get('/api/locations-search', (req, res) => {
    return placesService.locationsSearch(req.query)
      .then(places => res.send(places))
  });

  app.all('*', (req, res) => {
    res.status(404).send('404 page not found')
  });
};

