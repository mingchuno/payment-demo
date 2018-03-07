// @flow
const {promisify} = require('util')
const redis = require('redis')
const _ = require('lodash')

const client = redis.createClient()

/**
 * get cached object from redis
 * @param  {string} key string key value which will be expend into `hk01:order:${key}`
 * @return {object} object parsed from the string cached value
 */
function get(key: string) {
  return promisify(client.get).bind(client)(getKey(key)).then(value => {
    return JSON.parse(value)
  })
}

/**
 * set object into cache
 * @param  {string} key string key value which will be expend into `hk01:order:${key}`
 * @param  {object} value object to be saved into redis
 * @param  {number} [ttl=3000] ttl in second
 * @return {string|null} string "OK" or null
 */
function setex(key: string, value: ?Object, ttl: number = 3000) {
  if (key && value && _.isObject(value)) {
    return promisify(client.setex).bind(client)(getKey(key), ttl, JSON.stringify(value))
  } else {
    return Promise.resolve(null)
  }
}

function getKey(key: string) {
  return `hk01:order:${key}`
}

module.exports = {
  get,
  setex,
}
