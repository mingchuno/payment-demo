jest.mock('../../src/services/stripeService')
const paymentService = require('../../src/services/paymentService')

describe('PaymentService', () => {
  test('paymentService should work', async () => {
    const req = {
      order: {
        fullname: 'John Doe',
        phoneNumber: '85212ssdsdd345678',
        currency: 'USD',
        price: '1',
      },
      payment: {
        ccHolderName: 'John Doe',
        ccNumber: '4111 1111 1111 1111',
        ccExpire: {
          year: 2020,
          month: 2,
        },
        ccCCV: 123,
      },
    }
    const result = await paymentService.createPayment(req)
    console.log(result)
    expect(result.customerName).toBe(req.order.fullname)
    expect(result.phoneNumber).toBe(req.order.phoneNumber)
    expect(result.currency).toBe(req.order.currency)
    expect(result.price).toBe(req.order.price)
    expect(result.gateway).toBe('gateway_a')
    expect(result.rawResponse).toBeDefined()
  })
})
