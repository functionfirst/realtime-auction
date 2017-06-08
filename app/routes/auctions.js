var User 	    = require('../models/user');
var Auction   = require('../models/auction');
var auctions  = {};
var async     = require('async');
var filters   = require('../lib/filters.js');

// List all auctions
auctions.list = function(req, res) {
  var filter = {};

  // only show enabled auctions for non-admin
  if(!req.admin) {
    filter.enabled = true;
  }

  Auction.find(filter, null, { sort: 'start_date' }, function(err, auctions) {
    if(err) res.send(err);

    // // removed blocked bids/autobids
    auctions.forEach(function(item){
      item = filters.bids(item, 'blocked');
    });

    res.json(auctions);
  });
};

// Create a new auction (Admin only)
auctions.create = function(req, res) {
	var auction = new Auction();

	// set auction info
	auction.name = req.body.name;
	auction.start_date = req.body.start_date;
	auction.end_date = req.body.end_date;
	auction.description = req.body.description;
	auction.start_amount = req.body.start_amount;
	auction.enabled = req.body.enabled;
	auction.countdown = req.body.countdown;

	auction.save(function(err) {
		if(err) return res.send(err);

		res.json({ message : 'Auction created' });
	});
};

// View a specific auction (Users)
auctions.view = function(req, res) {
  var fields = '';

  // don't return bid/autobid username if not an admin
  if(!req.admin) {
    fields = '-bids.username -autobids.username';
  }

	Auction.findById(req.params.auction_id, fields, function(err, auction) {
		if (err) res.send(err)

		// sort by highest bid
    if(auction) {
		  auction.sortField('bids');
    }

    // ignore block from admin panel - we pass in blocked param to bypass this
    if(!req.query.blocked) {
      // filter blocked bids/autobids
      auction = filters.bids(auction, 'blocked');
    }

		res.json(auction);
	});
};

// Update a specific auction (Admin only);
auctions.update = function(req, res) {
	Auction.findById(req.params.auction_id, function(err, auction) {
		if(err) return res.send(err);

		// update auction info
		if(req.body.name) auction.name = req.body.name;
		if(req.body.start_date) auction.start_date = req.body.start_date;
		if(req.body.end_date) auction.end_date = req.body.end_date;
		if(req.body.description) auction.description = req.body.description;
		if(req.body.countdown) auction.countdown = req.body.countdown;
		auction.start_amount = req.body.start_amount;
		auction.enabled = req.body.enabled;

		// Check if we're resetting bids
		if(req.body.resetbids) {
			auction.bids = [];
		}

    // Check if we're resetting autobids
    if(req.body.resetautobids) {
      auction.autobids = [];
    }

		auction.save(function(err,auction) {
			if(err) return res.send(err);

			res.json({ message : 'Auction Updated' });
		})
	});
};

auctions.bid = function(req, res) {
	var msg;
	var msgResult = true;

  async.series({

    // Check if User is blocked
    isUserBlocked: function(next) {
      User.findById(req.body.userid, 'id blocked', function(err, user) {
        if(err) res.send(err);
        
        if(user) {
          if(user.isBlocked()) {
            return res.send({
              success: false,
              message : "Your account has been blocked."
            });
          }
        }
        next();
      });
    },

    processAuction: function(next) {
      Auction.findById(req.params.auction_id, 'id start_date start_amount bids autobids', function(err, auction) {
        if(err) res.send(err);

        // removed blocked bids
        auction = filters.bids(auction, 'blocked');

        // Initialise new standard bid
        var bid = {
          value: req.body.value,
          userid: req.body.userid,
          username: req.body.username
        };

        // Return an error if the auction hasn't started yet
        if(!auction.isValidStartDate()) {
          return res.send({
            success: false,
            message : "Auction is yet to start, you cannot bid yet."
          });
        }

        // Return an error if the minimumBid is not met
        var minimumBid = auction.minimumBid();
        if(req.body.value < minimumBid) {
          return res.send({
            success: false,
            message: 'The minimum bid is £' + minimumBid
          });
        }

        // Check if it's an autobid
        if(req.body.autobid && req.body.value) {
          // Check the autobid userid/value don't already exist
          var autobidExists = auction.autobids.filter(function(obj){
            return obj.value == req.body.value && obj.userid == req.body.userid
          });

          if(autobidExists.length === 0) {
            // Save the autobid
            auction.autobids.push({
              value: req.body.value,
              userid: req.body.userid,
              username: req.body.username
            });

            // Use the minimumBid value to create bid instead of the Users max bid (Autobid value)
            bid.value  = minimumBid;
            msgResult = true;
            msg = 'Your Autobid for £' + req.body.value + ' has been accepted.';
          } else {
            msgResult = false;
            msg = 'You have already Autobid this amount.';
          }
        }

        // Check if any autobids are in place to override this bid
        var autobid = auction.checkForAutobid(bid.value);
        if(autobid.value) {
          // There's an autobid which is higher than this bid
          bid.value   = autobid.value;
          bid.userid  = autobid.userid;
          bid.username = autobid.username;
          // msgResult = false;
          // msg = 'You have been outbid. Someone had a higher Autobid.'
        }

        // Check current winner is not this user before we place a bid...
        var currentWinner = auction.currentWinner() == req.body.userid;

        // Save the bid if not the current winner
        if(!currentWinner && bid.value > 0) {
          auction.bids.push(bid);
          // msg = 'You have the highest bid.';
        }

        // Save the auction data
        auction.save(function(err, auction) {
          if(err) return res.send(err);

          // return the highest bid
          var highestBid = auction.highestBid();

          res.json({ auction : highestBid, success : true, message: msg, result: msgResult  });
        });
      });
    }
  });
}

module.exports = auctions;