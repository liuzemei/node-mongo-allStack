const fs = require('fs')
const path = require('path')

function initRouter(app) {
  fs.readdirSync(path.resolve(__dirname, '.'))
    .filter(v => v !== 'index.js')
    .forEach(r => require(path.resolve(__dirname, '.', r))(app))
}

module.exports = { initRouter }
