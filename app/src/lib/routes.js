const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home')
  },
  {
    path: '/auctions/:filter',
    name: 'auctionsFiltered',
    component: () => import('@/pages/Auctions')
  },
  {
    path: '/auctions',
    name: 'auctions',
    component: () => import('@/pages/Auctions'),
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
    path: '/profile',
    name: 'Profile',
    meta: {
      pageTitle: 'Your Profile',
      requiresAuth: true
    },
    component: () => import('@/pages/Profile')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      pageTitle: 'Settings',
      requiresAuth: true
    },
    component: () => import('@/pages/Settings')
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
