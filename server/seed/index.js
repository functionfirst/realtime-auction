const auction = require('./auction');
const user = require('./user');

console.log('START: Seed database.');

auction.seed();
user.seed();
