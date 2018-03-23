// @flow
const MongoClient = require('mongodb').MongoClient
const orderCache = require('./orderCache')
const {logger} = require('../util/logger')

// since we only use 1 collection
const collection = MongoClient.connect('mongodb://localhost:27017').then(client => {
  return client.db('payment-db').collection('payment')
})

async function insertOne(record: Object) {
  return (await collection).insertOne(record)
}

async function findByRefCode(refCode: string) {
  const cache = await orderCache.get(refCode)
  if (cache) return cache
  const dbRecord = await (await collection).findOne({'paymentRefCode': refCode})
  if (dbRecord) {
    orderCache.setex(refCode, dbRecord)
  }
  return dbRecord
}

// init code
(async function () {
  (await collection).createIndex('paymentRefCode', {unique: true}, (err, name) => {
    if (err) {
      logger.warn(`error when create index:${err}`)
    } else {
      logger.info(`create index success with name:${name}`)
    }
  })
})()

module.exports = {
  insertOne,
  findByRefCode,
  collection,
}
