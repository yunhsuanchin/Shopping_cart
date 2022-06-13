const express = require('express')
const db = require('./models')
const app = express()
const PORT = 3000

app.get('/alive', (req, res, next) => {
  return res.status(200).json('alive')
})

app.listen(PORT, () => {
  db.sequelize.sync()
  console.log(`App is running on http://localhost:${PORT}`)
})
