import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Palette from '@/plugins/palette';

import '@/assets/css/style.sass'
import { router } from '@/lib/router'
import { store } from '@/lib/store'

const socket = io('http://localhost:8888');
Vue.use(VueSocketIO, socket, { store });
Vue.use(Palette);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}).$mount('#app')
