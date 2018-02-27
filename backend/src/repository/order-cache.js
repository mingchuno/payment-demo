const {promisify} = require('util')
const redis = require('redis')

const client = redis.createClient()

function get(key) {
  return promisify(client.get).bind(client)(getKey(key))
}

function setex(key, ttl = 3000, value) {
  if (key && value) {
    return promisify(client.setex).bind(client)(getKey(key), ttl, value)
  } else {
    return Promise.resolve(null)
  }
}

function getKey(key) {
  return `hk01:order:${key}`
}

module.exports = {
  get,
  setex,
}
