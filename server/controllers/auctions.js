const Auction = require('../models/auction');
const User = require('../models/user');

const excludeFields = '-bids -autobids -enabled -currentBid.createdAt -currentBid.blocked -currentBid.updatedAt -currentBid._id';

const listAuctions = async (req, res) => {
  const filter = {
    enabled: true
  };

  try {
    const auctions = await Auction
      .find(filter, null, { sort: 'startDate' })
      .select(excludeFields)

    res.json(auctions);
  } catch (err) {
    res.send(err)
  }
};

// Create a new auction (Admin only)
function createAuction(req, res) {
  var auction = new Auction();

  // set auction info
  auction.name = req.body.name;
  auction.startDate = req.body.startDate;
  auction.endDate = req.body.endDate;
  auction.description = req.body.description;
  auction.startAmount = req.body.startAmount;
  auction.enabled = req.body.enabled;
  auction.countdown = req.body.countdown;

  auction.save(function (err) {
    if (err) return res.send(err);

    res.json({ message: 'Auction created' });
  });
};

// View a specific auction (Users)
const viewAuction = async (req, res) => {
  const id = req.params.auction_id

  try {
    const auction = await Auction
      .findById(id, excludeFields)

    res.json(auction);
  } catch (err) {
    res.send(err)
  }
};

// Update a specific auction (Admin only);
function updateAuction(req, res) {
  Auction.findById(req.params.auction_id, function (err, auction) {
    if (err) return res.send(err);

    // update auction info
    if (req.body.name) auction.name = req.body.name;
    if (req.body.startDate) auction.startDate = req.body.startDate;
    if (req.body.endDate) auction.endDate = req.body.endDate;
    if (req.body.description) auction.description = req.body.description;
    if (req.body.countdown) auction.countdown = req.body.countdown;
    auction.startAmount = req.body.startAmount;
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

const createAutobid = async (req, res) => {
  // Check if it's an autobid
  if (req.body.autobid && req.body.value) {
    // Check the autobid userid/value don't already exist
    var autobidExists = auction.autobids.filter(function (obj) {
      return obj.value == req.body.value && obj.userid == req.decoded._id
    });

    if (autobidExists.length === 0) {
      // Save the autobid
      auction.autobids.push({
        value: req.body.value,
        userid: req.decoded._id,
        name: req.decoded.name
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

const createBid = async (req, res) => {
  try {
    const userBlocked = await isUserBlocked(req.decoded._id)

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
    const auction = await Auction.findById(req.params.auction_id, 'name description startDate endDate startAmount currentBid countdown _id bids autobids')

    const updatedAuction = await auction.addBid({
      value: req.body.value,
      userid: req.decoded._id,
      name: req.decoded.name
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
  createAuction,
  createBid,
  createAutobid,
  listAuctions,
  updateAuction,
  viewAuction
}
