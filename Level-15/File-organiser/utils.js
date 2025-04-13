const categories = require('./categories');

function getCategory(ext) {
  for (let category in categories) {
    if (categories[category].includes(ext.toLowerCase())) {
      return category;
    }
  }
  return 'others';
}

module.exports = { getCategory };
