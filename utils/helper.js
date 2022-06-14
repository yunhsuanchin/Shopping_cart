const _ = require('lodash')

module.exports = {
  snakeCaseTransformer (obj) {
    return _.mapKeys(obj, (value, key) => _.snakeCase(key))
  }
}
