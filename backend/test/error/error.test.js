const error = require('../../src/error/error')

describe('Error class', () => {
  test('error toJson should work', () => {
    const json = new error.UnknownServerError('error').toJson()
    expect(json.statusCode).toBe(500)
    expect(json.errorCode).toBe(10101)
    expect(json.message).toBe('error')
  })
})
