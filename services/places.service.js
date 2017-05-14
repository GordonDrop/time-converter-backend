const config = require('../config');
const googleMaps = require('@google/maps');
const googleClient = googleMaps.createClient({
  Promise: Promise,
  key: config.GOOGLE_API_KEY
});
const _ = require('lodash');
const PlaceModel = require('../models/place.model');

const PlacesService = {};

/**
 * Search locations by query
 * @param params
 * @returns {Promise.<TResult>} Array of Places Models
 */
PlacesService.locationsSearch = function(params) {
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
      return Promise.all(_.map(ids, placeDetails));
    })
    .catch(console.log);
};

/**
 * Get listo of locations by timezoneId
 * @param params
 * @returns {Promise.<TResult>} Array of Places Models
 */
PlacesService.locationsByTimezone = function(timezonesList) {
  return Promise.all(_.map(timezonesList, firstRelativeLocation))
};

function placeDetails(query) {
  return googleClient.place(query).asPromise()
    .then(response => new PlaceModel(response.json.result))
    .then(place => placeTimezone(place));
}

function placeTimezone(place) {
  let query = {
    location: place.location
  };
  return googleClient.timezone(query).asPromise()
    .then((response) => {
      place.timezone = response.json;
      return place;
    });
}

function firstRelativeLocation(timezoneName) {
  let query = {
    input: timezoneName.split('/')[1],
    type: '(cities)'
  };

  return googleClient.placesAutoComplete(query).asPromise()
    .then((response) => {
      let params = {
        placeid: response.json.predictions[0].place_id
      };

      return placeDetails(params);
    })

}

module.exports = PlacesService;