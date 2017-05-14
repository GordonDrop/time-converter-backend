const _ = require('lodash');
// locality == city
const ADRESS_COMPONENTS = {
  city: 'locality',
  country: 'country'
};

/**
 * Example data:
 * {
 *   location: {
 *      lat: 55.755826,
 *      lng: 37.6173
 * },
 * city: "Moscow",
 * country: "Russia",
 * timezone: {
 *    dstOffset: 0,
 *    rawOffset: 10800, // utc_offset
 *    timeZoneId: "Europe/Moscow",
 *    timeZoneName: "Moscow Standard Time"
 *    }
 * }
 *
 * @type {{search: ((params))}}
 */

class Place {
  constructor(placeObj) {
    this.location = placeObj.geometry.location;

    _.keys(ADRESS_COMPONENTS).forEach(address => {
      this.setValueOfAddressComponent(address, placeObj.address_components)
    });
  }

  setValueOfAddressComponent(name, addressComponents) {
    let found = _.find(addressComponents, (addressComponent) => {
      return addressComponent.types.indexOf(ADRESS_COMPONENTS[name]) > -1;
    });

    this[name] = found ? found.long_name : '';
  }
}

module.exports = Place;