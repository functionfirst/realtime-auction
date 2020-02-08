var auction = require('./auction');
var user = require('./user');

console.log('START: Starting to seed database');

auction.seed();
user.seed();
