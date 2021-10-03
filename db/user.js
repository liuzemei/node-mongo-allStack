const { db } = require('./mongo')

exports.getAllSliders = () => {
  return db.find('sliders')
}