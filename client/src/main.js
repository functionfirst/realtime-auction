import Vue from 'vue'
import { apiHost } from '@/lib/env'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Palette from '@/plugins/palette';

import '@/assets/css/style.sass'
import { router } from '@/lib/router'
import { store } from '@/lib/store'

const socket = io(apiHost);
Vue.use(VueSocketIO, socket, { store });
Vue.use(Palette);

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
