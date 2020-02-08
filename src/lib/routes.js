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
  }
]

export {
  routes
}
