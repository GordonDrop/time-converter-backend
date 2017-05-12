const helpers = {};

helpers.filter = function filter(array, predicate, limit) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      result.push(array[i]);
    }

    if (limit && result.length >= limit) {
      break;
    }
  }

  return result;
};

module.exports = helpers;