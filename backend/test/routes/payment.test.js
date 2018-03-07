jest.mock('../../src/services/stripeService')
const request = require('supertest')
const app = require('../../src/app')

const CORRECT_REQ = {
  order: {
    fullname: 'John Doe',
    phoneNumber: '85212345678',
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

describe('payment controller', () => {
  test('create payment should fail when no payload', async () => {
    return request(app)
      .post('/api/v1/payment')
      .expect(400)
  })

  test('create payment should work for correct payload', async () => {
    return request(app)
      .post('/api/v1/payment')
      .send(CORRECT_REQ)
      .set('accept', 'json')
      .expect(200)
  })

  test('create payment should fail for incorrect name', async () => {
    return request(app)
      .post('/api/v1/payment')
      .send(Object.assign({}, CORRECT_REQ, {order: {fullname: 'May'}}))
      .set('accept', 'json')
      .expect(400)
  })
})

describe('general controller', () => {
  test('get some non-exist path should fail', () => {
    return request(app)
    .get('/haha')
    .expect(404)
  })
})
