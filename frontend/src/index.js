import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './components/App.vue'

Vue.config.productionTip = false
Vue.use(Element, {locale})

new Vue({
  el: '#app',
  render: h => h(App)
})
