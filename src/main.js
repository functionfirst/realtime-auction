import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

const Home = () => import('@/pages/Home')
const Auction = () => import('@/pages/Auction')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:name/:id',
      name: 'auction',
      component: Auction
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
