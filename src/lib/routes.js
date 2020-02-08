const Home = () => import('@/pages/Home')
const Auction = () => import('@/pages/Auction')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:name/:id',
    name: 'auction',
    component: Auction
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
  }
]

export {
  routes
}
