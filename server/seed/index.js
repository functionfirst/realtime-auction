import auction from './auction.js'
import user from './user.js'

console.log('START: Seed database.')

auction.seed()
user.seed()
