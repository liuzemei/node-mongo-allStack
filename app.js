const express = require('express')
const bodyParser = require('body-parser')
const { initRouter } = require('./routers')
let config
try {
  config = require('./config.json')
} catch {
  config = { port: 7001 }
}


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

initRouter(app)

app.listen(config.port, () => {
  console.log('server start on ' + config.port)
})

