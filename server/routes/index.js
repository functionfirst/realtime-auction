const verifyToken = require('../middleware/verifytoken');
const requireAdmin = require('../middleware/authorise.js');

const { createAuction, createBid, createAutobid, listAuctions, updateAuction, viewAuction } = require('../controllers/auctions');
const { authenticateUser } = require('../controllers/authenticate');
const { apiHome } = require('../controllers/home');
const { createUser, listUsers, userDetails, updateUser, viewUser } = require('../controllers/users');

const api = (app, express) => {
	let apiRouter = express.Router();

	apiRouter.get('/', apiHome);
	apiRouter.post('/users', createUser);
	apiRouter.post('/authenticate', authenticateUser);

	// Routes now require a verified token
	apiRouter.use(verifyToken);

	apiRouter.get('/me', userDetails);
	apiRouter.get('/auctions', listAuctions);
	apiRouter.get('/auctions/:auction_id', viewAuction);
	apiRouter.put('/auctions/:auction_id/bid', createBid);
	apiRouter.put('/auctions/:auction_id/autobid', createAutobid);

	// Routes now require admin access
	apiRouter.use(requireAdmin);

	apiRouter.get('/users', listUsers);
	apiRouter.get('/users/:user_id', viewUser);
	apiRouter.put('/users/:user_id', updateUser);
	apiRouter.post('/auctions', createAuction);
	apiRouter.put('/auctions/:auction_id', updateAuction);

	return apiRouter
}

module.exports = api;
