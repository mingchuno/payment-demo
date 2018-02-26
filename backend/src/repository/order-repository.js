const MongoClient = require('mongodb').MongoClient

// since we only use 1 collection
const collection = MongoClient.connect('mongodb://localhost:27017').then(client => {
  return client.db('hk01').collection('payment')
})

async function insertOne(record) {
  return (await collection).insertOne(record)
}

async function findByRefCode(refCode) {
  return (await collection).findOne({'paymentRefCode': refCode})
}

module.exports = {
  insertOne,
  findByRefCode
}
