const Auction = require('../models/auction');
const User = require('../models/user');

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

const isUserBlocked = async (userid) => {
  try {
    const user = await User.findById(userid, 'id blocked');
    return user && user.blocked;
  } catch (err) {
    return err
  }
}

const autobid = async (req, res) => {
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
}

const bid = async (req, res) => {
  try {
    const userBlocked = await isUserBlocked(req.body.userid)

    if (userBlocked) {
      return res.send({
        success: false,
        message: "Your account has been blocked."
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err
    })
  }

  try {
    const auction = await Auction.findById(req.params.auction_id, 'name description start_date end_date start_amount current_bid countdown _id bids autobids')

    const updatedAuction = await auction.addBid({
      value: req.body.value,
      userid: req.body.userid,
      email: req.body.email
    })

    res.json({ auction: updatedAuction, success: true });
  } catch ({ message }) {
    res.send({
      success: false,
      message
    });
  }
}

module.exports = {
  list,
  create,
  view,
  update,
  bid,
  autobid
}
