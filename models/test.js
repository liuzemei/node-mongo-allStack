const { ObjectId } = require('mongodb')
const { db } = require('./db')

exports.getAllTests = () =>
  db.find('test', {}, {
    sort: { _id: -1 },
    projection: { _id: 0, __v: 0 },
  })

exports.getTestByPageSize = ({ page, size }) => {
  if (!page) page = 1
  if (!size) size = 20
  return db.find('test', {}, {
    limit: size,
    skip: (page - 1) * size
  })
}

exports.getTestByID = id =>
  db.findOne('test', { _id: ObjectId(id) })

exports.getFirstTest = () =>
  db.findOne('test', {}, { sort: { createdAt: 1 } })

exports.insertTest = test =>
  db.insertOne('test', test, 'url')

exports.insertTestOrUpdate = test =>
  db.insertOneOrUpdate('test', test, 'url')

exports.deleteTestByID = id =>
  db.deleteOne('test', '_id', id)