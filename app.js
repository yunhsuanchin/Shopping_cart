const path = require('path')

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './config/env/.env.prod' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './config/env/.env.dev' })
} else {
  // development and release
  require('dotenv').config({
    path: path.resolve(__dirname, './config/env/.env.dev')
  })
}

const express = require('express')
const db = require('./models')
const routers = require('./routes')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const PORT = 3000

app.use(cors())
app.get('/alive', (req, res, next) => {
  return res.status(200).json('alive')
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routers)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

module.exports = app
