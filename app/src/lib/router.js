import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const state = JSON.parse(localStorage.getItem('store'));

    if (state.user.token == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
    next()
  }
  next()
})

router.afterEach((to, from) => {
  if (to.meta && to.meta.pageTitle) {
    document.title = to.meta.pageTitle
  }
})

export {
  router
}
