const async = require('async');
const Auction = require('../models/auction');
const User = require('../models/user');
const filters = require('../lib/filters.js');

const list = async (req, res) => {
  const fields = 'name description start_date end_date start_amount current_bid countdown _id';
  const filter = {
    enabled: true
  };

  try {
    const auctions = await Auction
      .find(filter, null, { sort: 'start_date' })
      .select(fields)

    res.json(auctions);
  } catch (err) {
    res.send(err)
  }
};

// Create a new auction (Admin only)
function create(req, res) {
  var auction = new Auction();

  // set auction info
  auction.name = req.body.name;
  auction.start_date = req.body.start_date;
  auction.end_date = req.body.end_date;
  auction.description = req.body.description;
  auction.start_amount = req.body.start_amount;
  auction.enabled = req.body.enabled;
  auction.countdown = req.body.countdown;

  auction.save(function (err) {
    if (err) return res.send(err);

    res.json({ message: 'Auction created' });
  });
};

// View a specific auction (Users)
const view = async (req, res) => {
  const id = req.params.auction_id
  const fields = 'name description start_date end_date start_amount current_bid countdown _id';

  try {
    const auction = await Auction
      .findById(id, fields)

    res.json(auction);
  } catch (err) {
    res.send(err)
  }
};

// Update a specific auction (Admin only);
function update(req, res) {
  Auction.findById(req.params.auction_id, function (err, auction) {
    if (err) return res.send(err);

    // update auction info
    if (req.body.name) auction.name = req.body.name;
    if (req.body.start_date) auction.start_date = req.body.start_date;
    if (req.body.end_date) auction.end_date = req.body.end_date;
    if (req.body.description) auction.description = req.body.description;
    if (req.body.countdown) auction.countdown = req.body.countdown;
    auction.start_amount = req.body.start_amount;
    auction.enabled = req.body.enabled;

    // Check if we're resetting bids
    if (req.body.resetbids) {
      auction.bids = [];
    }

    // Check if we're resetting autobids
    if (req.body.resetautobids) {
      auction.autobids = [];
    }

    auction.save(function (err, auction) {
      if (err) return res.send(err);

      res.json({ message: 'Auction Updated' });
    })
  });
};

function bid(req, res) {
  var msg,
    msgResult = true;

  async.series({

    // Check if User is blocked
    isUserBlocked: function (next) {
      User.findById(req.body.userid, 'id blocked', function (err, user) {
        if (err) res.send(err);

        if (user) {
          if (user.isBlocked()) {
            return res.send({
              success: false,
              message: "Your account has been blocked."
            });
          }
        }
        next();
      });
    },

    processAuction: function (next) {
      Auction.findById(req.params.auction_id, 'id start_date start_amount bids autobids', function (err, auction) {
        if (err) res.send(err);

        // removed blocked bids
        auction = filters.bids(auction, 'blocked');

        // Initialise new standard bid
        var bid = {
          value: req.body.value,
          userid: req.body.userid,
          email: req.body.email
        };

        // Return an error if the auction hasn't started yet
        if (!auction.isValidStartDate()) {
          return res.send({
            success: false,
            message: "Auction is yet to start, you cannot bid yet."
          });
        }

        // Return an error if the minimumBid is not met
        var minimumBid = auction.minimumBid();
        if (req.body.value < minimumBid) {
          return res.send({
            success: false,
            message: 'The minimum bid is £' + minimumBid
          });
        }

        // Check if it's an autobid
        if (req.body.autobid && req.body.value) {
          // Check the autobid userid/value don't already exist
          var autobidExists = auction.autobids.filter(function (obj) {
            return obj.value == req.body.value && obj.userid == req.body.userid
          });

          if (autobidExists.length === 0) {
            // Save the autobid
            auction.autobids.push({
              value: req.body.value,
              userid: req.body.userid,
              email: req.body.email
            });

            // Use the minimumBid value to create bid instead of the Users max bid (Autobid value)
            bid.value = minimumBid;
            msgResult = true;
            msg = 'Your Autobid for £' + req.body.value + ' has been accepted.';
          } else {
            msgResult = false;
            msg = 'You have already Autobid this amount.';
          }
        }

        // Check if any autobids are in place to override this bid
        var autobid = auction.checkForAutobid(bid.value);
        if (autobid.value) {
          // There's an autobid which is higher than this bid
          bid.value = autobid.value;
          bid.userid = autobid.userid;
          bid.email = autobid.email;
          // msgResult = false;
          // msg = 'You have been outbid. Someone had a higher Autobid.'
        }

        // Check current winner is not this user before we place a bid...
        var currentWinner = auction.currentWinner() == req.body.userid;

        // Save the bid if not the current winner
        if (!currentWinner && bid.value > 0) {
          auction.bids.push(bid);
          // msg = 'You have the highest bid.';
        }

        // Save the auction data
        auction.save(function (err, auction) {
          if (err) return res.send(err);

          // return the highest bid
          var highestBid = auction.highestBid();

          res.json({ auction: highestBid, success: true, message: msg, result: msgResult });
        });
      });
    }
  });
}

module.exports = {
  list: list,
  create: create,
  view: view,
  update: update,
  bid: bid
};
