var verifyToken 	= require('../lib/verifytoken');
var requireAdmin 	= require('../lib/authorise.js');
var multer 			= require('multer');

// Routes
var auctionRoute 	= require('../routes/auctions');
var authRoute 		= require('../routes/authenticate');
var userRoute 		= require('../routes/users');

module.exports = function(app, express) {
	// get an instance of express router
	var apiRouter = express.Router();

	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message : "Yo, welcome to the auction API!" });
	});

	apiRouter.post('/users', userRoute.create);
	
	// Authentication route
	// This needs to be defined befroe verifyToken is called
	apiRouter.post('/authenticate', authRoute);

	// Middleware - Multer config
	// Used for image uploads
	app.use(multer({
		dest: './public/uploads/',
 		rename: function (fieldname, filename) {
			return filename.toLowerCase() + Date.now();
		}
	}).single('file'));

	// middleware to verify a token
	apiRouter.use(verifyToken);
	
	// ROUTES
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
};