import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/style.sass'
import { router } from '@/lib/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
