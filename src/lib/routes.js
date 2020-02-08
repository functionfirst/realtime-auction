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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login')
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
