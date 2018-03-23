<template>
  <div id="app">
    <el-container>
      <el-header height="5rem"><h2>Payment Demo</h2></el-header>
      <el-main>
        <payment></payment>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
  import Payment from './payment/Payment.vue'
  export default {
    name: 'app',
    components: {
      Payment
    }
  }
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>
html {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
