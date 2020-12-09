import express from 'express'

import verifyToken from '../middleware/verifytoken.js'
import requireAdmin from '../middleware/authorise.js'

import { createAuction, createBid, createAutobid, listAuctions, updateAuction, viewAuction } from '../controllers/auctions.js'
import { authenticateUser } from '../controllers/authenticate.js'
import { apiHome } from '../controllers/home.js'
import { createUser, listUsers, userDetails, updateUser, viewUser } from '../controllers/users.js'

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

export default api
