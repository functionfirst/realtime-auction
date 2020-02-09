const verifyToken = require('../lib/verifytoken');
const requireAdmin = require('../lib/authorise.js');

// Routes
const auctionRoute = require('../routes/auctions');
const authRoute = require('../routes/authenticate');
const homeRoute = require('../routes/home');
const userRoute = require('../routes/users');

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
