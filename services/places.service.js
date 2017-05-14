const config = require('../config');
const googleMaps = require('@google/maps');
const googleClient = googleMaps.createClient({
  Promise: Promise,
  key: config.GOOGLE_API_KEY
});
const _ = require('lodash');
const PlaceModel = require('../models/place.model');

const PlacesService = {};

PlacesService.search = function(params) {
  // TODO: add validators
  let query = {
    input: params.q,
    type: '(cities)'
  };

  return googleClient.placesAutoComplete(query).asPromise()
    .then((response) => {
      let ids = response.json.predictions.map((place) => {
        return { placeid: place.place_id };
      });
      return Promise.all(_.map(ids, PlacesService.placeDetails));
    })
    .then(placesDetails => {
      return Promise.all(_.map(placesDetails, PlacesService.placeTimezone));
    })
    .catch(console.log);
};

PlacesService.placeDetails = function (query) {
  return googleClient.place(query).asPromise()
    .then(response => new PlaceModel(response.json.result));
};

PlacesService.placeTimezone = function (place) {
  console.log(place);
  let query = {
    location: place.location
  };
  return googleClient.timezone(query).asPromise()
    .then((response) => {
      place.timezone = response.json;
      return place;
    });
};

module.exports = PlacesService;