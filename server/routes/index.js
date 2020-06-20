const express = require('express');

const verifyToken = require('../middleware/verifytoken');
const requireAdmin = require('../middleware/authorise.js');

const { createAuction, createBid, createAutobid, listAuctions, updateAuction, viewAuction } = require('../controllers/auctions');
const { authenticateUser } = require('../controllers/authenticate');
const { apiHome } = require('../controllers/home');
const { createUser, listUsers, userDetails, updateUser, viewUser } = require('../controllers/users');

const router = express.Router();

const api = () => {
	router.get('/', apiHome);
	router.post('/users', createUser);
	router.post('/authenticate', authenticateUser);

	router.get('/auctions', listAuctions);
	router.get('/auctions/:auction_id', viewAuction);

	// Routes now require a verified token
	router.use(verifyToken);

	router.get('/me', userDetails);
	router.put('/auctions/:auction_id/bid', createBid);
	router.put('/auctions/:auction_id/autobid', createAutobid);

	// Routes now require admin access
	router.use(requireAdmin);

	router.get('/users', listUsers);
	router.get('/users/:user_id', viewUser);
	router.put('/users/:user_id', updateUser);
	router.post('/auctions', createAuction);
	router.put('/auctions/:auction_id', updateAuction);

	return router
}

module.exports = api;
