const _ = require('lodash');
// locality == city
const ADRESS_COMPONENTS = {
  city: 'locality',
  country: 'country'
};

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