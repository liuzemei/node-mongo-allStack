const { MongoClient, ObjectId } = require('mongodb')
const config = require('../config.json')

class DB {
  constructor() {
    const uri = config.mongo.uri
    const client = new MongoClient(uri)
    client.connect().then(client => {
      this.database = client.db(config.mongo.db)
    })
  }

  async find(collection, query = {}, options = {}) {
    return this.database.collection(collection).find(query, options).toArray()
  }

  async findOne(collection, query = {}, options = {}) {
    return this.database.collection(collection).findOne(query, options)
  }

  async insertOne(collection, obj, pk) {
    if (pk && await this.isExist(collection, pk, obj[pk]))
      return console.log(`${collection} pk: ${pk} repeat...`, obj[pk])
    return this.database.collection(collection).insertOne(obj)
  }

  async insertOneOrUpdate(collection, obj, pk) {
    if (pk === '_id') obj[_id] = ObjectId(obj[_id])
    return this.database.collection(collection).
      updateOne(
        { [pk]: obj[pk] },
        { $set: obj },
        { upsert: true }
      )
  }

  async updateMany(collection, obj, pk) {
    return this.database.collection(collection).
      updateMany(
        { [pk]: obj[pk] },
        { $set: obj },
      )
  }

  async deleteOne(collection, k, v) {
    if (k === '_id') v = ObjectId(v)
    return this.database.collection(collection).
      deleteOne({ [k]: v })
  }

  async deleteMany(collection, k, v) {
    if (k === '_id') v = ObjectId(v)
    return this.database.collection(collection).
      deleteMany({ [k]: v })
  }

  async isExist(collection, k, v) {
    if (k === '_id') v = ObjectId(v)
    return !!(await this.findOne(collection, { [k]: v }))
  }
}

module.exports = {
  db: new DB()
}
