const { MongoClient } = require('mongodb')

class DB {
  constructor() {
    const uri = 'mongodb://127.0.0.1:27017'
    const client = new MongoClient(uri)
    client.connect().then(client => {
      this.database = client.db('neo_ts_study')
    })
  }

  async find(collection, query = {}, options = {}) {
    const cursor = this.database.collection(collection).find(query, options)
    let res = []
    await cursor.forEach(v => res.push(v))
    return res
  }

  async findOne(collection, query = {}, options = {}) {
    const cursor = this.database.collection(collection).find(query, options)
    let res = []
    await cursor.forEach(v => res.push(v))
    return res
  }
}

module.exports = {
  db: new DB()
}
