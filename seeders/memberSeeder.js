const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

module.exports = Array.from({ length: 20 }).map(m => {
  const name = faker.name.findName()
  const account = faker.unique(faker.internet.userName)
  const plainPassword = faker.internet.password()
  const password = bcrypt.hashSync(plainPassword, SALT_ROUNDS)
  const tel = faker.phone.phoneNumber('+886#########')

  return { name, account, tel, password }
})
