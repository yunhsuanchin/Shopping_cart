const express = require('express')
const app = express()
const PORT = 3000

app.get('/alive', (req, res, next) => {
  return res.status(200).json('alive')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
