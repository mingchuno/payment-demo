<template>
<el-row :gutter="20">
  <el-col :span="9" :offset="3">
    <payment-form></payment-form>
  </el-col>
  <el-col :span="9">
    <payment-data></payment-data>
  </el-col>
</el-row>
</template>

<script>
import PaymentForm from './PaymentForm.vue'
import PaymentData from './PaymentData.vue'

export default {
  components: {
    PaymentForm,
    PaymentData
  }
}
</script>
