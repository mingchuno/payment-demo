const orderCache = require('../../src/repository/orderCache')

afterAll(()=> {
  // clean Redis and shutdown
  orderCache.client.flushdb((err, res) => {
    orderCache.client.quit()
  })
})

describe('OrderCache', () => {
  test('should return null for non-exist key', async () => {
    const key = 'non-exist-key'
    const result = await orderCache.get(key)
    expect(result).toBe(null)
  })

  test('should be able to set and get string value', async () => {
    const obj = {obj: "obj"}
    const setRes = await orderCache.setex("key", obj)
    expect(await orderCache.get("key")).toEqual(obj)
  })
})
