const orderCache = require('../../src/repository/orderCache')

describe('Order cache', () => {
  test('should return null for non-exist key', async () => {
    const key = 'non-exist-key'
    const result = await orderCache.get(key)
    expect(result).toBe(null)
  })

  test('should be able to set and get string value', async () => {
    const obj = {obj: 'obj'}
    const setRes = await orderCache.setex('key', obj)
    expect(setRes).toBe('OK')
    expect(await orderCache.get('key')).toEqual(obj)
  })
})
