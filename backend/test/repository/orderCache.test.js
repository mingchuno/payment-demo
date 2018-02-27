const orderCache = require('../../src/repository/orderCache')

describe('OrderCache', () => {
  test('should work for get/set', async () => {
    const key = 'haha'
    const result = await orderCache.get(key)
    expect(result).toBe(null)
  })
})
