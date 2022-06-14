const _ = require('lodash')

module.exports = {
  snakeCaseTransformer (obj) {
    return _.mapKeys(obj, (value, key) => _.snakeCase(key))
  },

  generateRandomAlphanumeric (length) {
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    let result = ''
    for (let i = 0; i < length; i++) {
      let randomNum = Math.floor(Math.random() * charactersLength)
      result += characters[randomNum]
    }

    return result
  }
}
