const orderRepository = require('../../src/repository/orderRepository')
const uuidv4 = require('uuid/v4')

afterAll(async function () {
  // clean mongo
  return await (await orderRepository.collection).drop()
})

// easy to gen diff record with same UUID
function genRecord(uuid) {
  return {
    paymentRefCode: uuid,
    data: uuidv4(),
  }
}

describe('Order repository', () => {
  const uuid = uuidv4()
  const record = genRecord(uuid)

  test('insert deplicate record should fail with MongoError', async () => {
    const result = await orderRepository.insertOne(record)
    expect(result.insertedCount).toBe(1)
    expect(orderRepository.insertOne(genRecord(uuid))).rejects.toThrow(/E11000 duplicate key error/)
  })

  test('get the document back should work from Mongo or Redis', async () => {
    for (let i = 0; i < 10; i++) {
      const result = await orderRepository.findByRefCode(uuid)
      expect(result.paymentRefCode).toBe(uuid)
      expect(result.data).toBe(record.data)
    }
  })
})
