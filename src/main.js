import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/style.sass'
import { router } from '@/lib/router'
import { store } from '@/lib/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}).$mount('#app')
