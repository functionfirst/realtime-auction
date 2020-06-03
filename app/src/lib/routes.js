const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home')
  },
  {
    path: '/:name/:id',
    name: 'auction',
    component: () => import('@/pages/Auction'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register')
  },
  {
    path: '/register/success',
    name: 'Success',
    component: () => import('@/pages/Success')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/pages/Logout')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/404')
  }
]

export {
  routes
}
