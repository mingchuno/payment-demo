import axios from 'axios'

const axiosBase = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', // TODO: move to config later
  timeout: 10000
})

const axiosQuery = config => {
  return axiosBase(config).then(response => [null, response], err => [err, null])
}

export default {
  postPayment(req) {
    return axiosQuery({ url: 'payment', method: 'POST', data: req })
  },
  getPayment(refCode) {
    return axiosQuery({ url: `payment/${refCode}`, method: 'GET' })
  }
}
