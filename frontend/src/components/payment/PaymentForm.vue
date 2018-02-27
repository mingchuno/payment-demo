<template>
<el-form v-loading="loading" ref="request" :model="request" label-width="180px">
  <el-form-item label="Full name">
    <el-input v-model="request.order.fullname" placeholder="John Doe"></el-input>
  </el-form-item>
  <el-form-item label="Phone number">
    <el-input v-model="request.order.phoneNumber" placeholder="852 12345678"></el-input>
  </el-form-item>
  <el-form-item label="Currency">
    <el-select v-model="request.order.currency" placeholder="please select your currency">
      <el-option label="USD" value="USD"></el-option>
      <el-option label="HKD" value="HKD"></el-option>
      <el-option label="AUD" value="AUD"></el-option>
      <el-option label="EUR" value="EUR"></el-option>
      <el-option label="JPY" value="JPY"></el-option>
      <el-option label="CNY" value="CNY"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Price">
    <el-input v-model="request.order.price" placeholder="1.00"></el-input>
  </el-form-item>

  <el-form-item label="Card holder name">
    <el-input v-model="request.payment.ccHolderName" placeholder="John Doe"></el-input>
  </el-form-item>
  <el-form-item label="Card number">
    <el-input v-model="request.payment.ccNumber" placeholder="4111 1111 1111 1111"></el-input>
  </el-form-item>
  <el-form-item label="Card expire year">
    <el-input v-model="request.payment.ccExpire.year" placeholder="2020"></el-input>
  </el-form-item>
  <el-form-item label="Card expire month">
    <el-input v-model="request.payment.ccExpire.month" placeholder="2"></el-input>
  </el-form-item>
  <el-form-item label="Card CCV">
    <el-input v-model="request.payment.ccCCV" placeholder="123"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import api from '../../api/api.js'

export default {
  data() {
    return {
      loading: false,
      request: {
        order: {
          fullname: 'John Doe',
          phoneNumber: '852 21800000',
          currency: 'USD',
          price: '1.00'
        },
        payment: {
          ccHolderName: 'John Doe',
          ccNumber: '4111 1111 1111 1111',
          ccExpire: {
            year: 2020,
            month: 2
          },
          ccCCV: 123
        }
      }
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      const [err, resp] = await api.postPayment(this.request)
      this.loading = false
      if (err) {
        const data = err.response.data
        this.$message.error(`request error: statusCode=${data.statusCode}, errorCode=${data.errorCode}`)
      } else {
        this.$alert(`Payment reference code: ${resp.data.paymentRefCode}`, 'Payment success!', {
          confirmButtonText: 'OK'
        })
      }
    }
  }
}
</script>
