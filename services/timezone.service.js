const _ = require('lodash');
const helpers = require('../helpers');
const moment = require('moment-timezone');
const zones = _.values(moment.tz._zones);

const DEFAULT_LIMIT = 5;

const TimeZoneService = {
  search(req) {
    // TODO: req.query should be required param
    let query = req.q;
    let limit = req.limit || DEFAULT_LIMIT;

    let callback = zone => zone.indexOf(query) > -1;
    let foundZones = helpers.filter(zones, callback, limit);

    return foundZones.map(zoneString => new moment.tz.Zone(zoneString));
  }
};

module.exports = TimeZoneService;