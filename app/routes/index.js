const verifyToken = require('../middleware/verifytoken');
const requireAdmin = require('../middleware/authorise.js');

// Routes
const auctionRoute = require('../controllers/auctions');
const authRoute = require('../controllers/authenticate');
const homeRoute = require('../controllers/home');
const userRoute = require('../controllers/users');

const api = (app, express) => {
	// get an instance of express router
	let apiRouter = express.Router();

	// API Homepage
	apiRouter.get('/', homeRoute.index);

	// Create a new User
	apiRouter.post('/users', userRoute.create);

	// Authentication route
	apiRouter.post('/authenticate', authRoute);

	// Verify token
	// Routes defined beyond this point require a verified token
	apiRouter.use(verifyToken);

	// Get current user's details
	apiRouter.get('/me', userRoute.me);

	// Auction Routes (Users)
	apiRouter.get('/auctions', auctionRoute.list);
	apiRouter.get('/auctions/:auction_id', auctionRoute.view);
	apiRouter.put('/auctions/:auction_id/bid', auctionRoute.bid);
	apiRouter.put('/auctions/:auction_id/autobid', auctionRoute.autobid);

	// User Routes (Admin only)
	apiRouter.get('/users', requireAdmin, userRoute.list);
	apiRouter.get('/users/:user_id', requireAdmin, userRoute.view);
	apiRouter.put('/users/:user_id', requireAdmin, userRoute.update);
	apiRouter.post('/users/:user_id/upload', requireAdmin, userRoute.upload);

	// Auction Routes (Admin only)
	apiRouter.post('/auctions', requireAdmin, auctionRoute.create);
	apiRouter.put('/auctions/:auction_id', requireAdmin, auctionRoute.update);

	return apiRouter
}

module.exports = api;
