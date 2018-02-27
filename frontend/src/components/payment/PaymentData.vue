<template>
<div>
  <el-form :model="form">
    <el-form-item label="Reference Code">
      <el-input v-model="form.refCode" placeholder="ch_1C01EYDRnInxf5s5EyU6z2Aj"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
  <el-table v-loading="loading" :show-header="false" :data="tableData">
    <el-table-column prop="key" label="Key"></el-table-column>
    <el-table-column prop="value" label="Value"></el-table-column>
  </el-table>
</div>
</template>

<script>
import api from '../../api/api.js'

export default {
  data() {
    return {
      loading: false,
      form: {
        refCode: 'ch_1C05m2DRnInxf5s5vfXXsdxj'
      },
      tableData: []
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      const [err, resp] = await api.getPayment(this.form.refCode)
      this.loading = false
      if (err) {
        const data = err.response.data
        this.$message.error(`request error: statusCode=${data.statusCode}, errorCode=${data.errorCode}`)
      } else {
        this.tableData = []
        // show data, hacky
        const data = resp.data
        delete data['_id']
        delete data['rawResponse']
        for (const prop in data) {
          if (data.hasOwnProperty(prop)) {
            this.tableData.push({
              key: prop,
              value: data[prop]
            })
          }
        }
      }
    }
  }
}
</script>
