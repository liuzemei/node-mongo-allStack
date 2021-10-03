const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/mongo')
const { getAllSliders } = require('./db/user')


const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use((req, res, next) => {
  next()
})


app.get('/', async (req, res) => {
  const data = await getAllSliders()
  res.json({ data })
})


app.listen(7001)

