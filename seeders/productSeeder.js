const { faker } = require('@faker-js/faker')
const MARGIN_RATE = 0.5
const INVENTORY_MAX = 100

const getRandomNumber = max => {
  return Math.floor(Math.random() * max)
}

const getBalance = (num, limit) => {
  while (num > limit) {
    num = getRandomNumber(100)
  }
  return num
}

module.exports = Array.from({ length: 200 }).map(p => {
  const name = faker.commerce.productName()
  const cost = faker.commerce.price()
  const price = Math.ceil(cost / (1 - MARGIN_RATE))
  const inventory = getRandomNumber(INVENTORY_MAX)
  const balance = getBalance(INVENTORY_MAX, inventory)

  return { name, cost, price, inventory, balance }
})
