const { Schema } = require('mongoose');
const db = require('../lib/db');
const Autobid = require('../models/autobid');
const Bid = require('../models/bid');
const differenceInSeconds = require('date-fns/differenceInSeconds')

const Auction = new Schema({
	name: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	description: {
		type: String
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	startAmount: {
		type: Number,
		required: true
	},
	featured: {
		type: Boolean,
		default: false
	},
	enabled: {
		type: Boolean,
		default: false
	},
	currentBid: {
		type: Bid.schema,
		required: false
	},
	countdown: { type: Number, default: 1 },
	bids: [Bid.schema],
	autobids: [Autobid.schema]
}, { timestamps: true });

Auction.set('toJSON', { virtuals: true })

Auction.virtual('hasStarted').get(function () {
	return differenceInSeconds(this.startDate, new Date()) < 0;
})

Auction.virtual('hasFinished').get(function () {
	return differenceInSeconds(this.endDate, new Date()) < 0;
})

Auction.methods.isValidStartDate = function isValidStartDate(cb) {
	return new Date() >= new Date(this.startDate);
}

Auction.methods.addBid = function (bid) {
	const auction = this;

	// Check for a valid start date
	const invalidStartDate = !auction.isValidStartDate()

	if (invalidStartDate) {
		throw new Error("Auction is yet to start, you cannot bid yet.")
	}

	// Check if the minimumBid value is met
	const minimumBid = auction.minimumBid();

	if (bid.value < minimumBid) {
		throw new Error(`The minimum bid is £${minimumBid}.`);
	}

	// Check if any autobids are in place to override this bid
	const autobid = auction.checkForAutobid(bid.value);

	// set currentBid to the auto bid amount
	if (autobid.value) {
		bid.value = autobid.value;
		bid.userid = autobid.userid;
		bid.name = autobid.name;

		auction.bids.push(bid);
		auction.currentBid = bid;
		auction.save();

		throw new Error('You have been outbid');
	}

	auction.bids.push(bid);
	auction.currentBid = bid;
	auction.save();

	// Remove these fields - don't need them on front-end
	auction.bids = undefined
	auction.autobids = undefined

	return auction;
}

Auction.methods.minimumBid = function () {
	return this.currentBid && this.currentBid.value ? this.currentBid.value + 1 : this.startAmount
}

Auction.methods.getOldestMatchingAutobid = function (autobidValue) {
	// sort by createdAt and filter by the autobid value
	var autobids = this.autobids
		.filter(function (obj) {
			return obj.value === autobidValue;
		})
		.sort(function (b1, b2) {
			return b1.createdAt - b2.createdAt;
		});

	return {
		userid: autobids[0].userid,
		name: autobids[0].name
	}
}

Auction.methods.checkForAutobid = function (bidValue) {
	var highestAutobid = { value: 0 };
	var autobidUser = '';
	var autobidEmail = '';
	var newBid = 0;

	// Check for existing autobids
	if (this.autobids.length === 0) {
		// There are no autobids so return an empty bid
		return {};
	}

	// Sort autobids
	this.sortField('autobids');

	// Get the highest current autobid
	highestAutobid = this.autobids[this.autobids.length - 1];
	autobidUser = this.autobids[this.autobids.length - 1].userid;
	autobidName = this.autobids[this.autobids.length - 1].name;

	// We also need the second highest to establish our minimum bid value
	if (this.autobids.length > 1) {
		var secondHighestAutobid = this.autobids[this.autobids.length - 2].value;

		newBid = this.autobids[this.autobids.length - 2].value + 1;

		// Check if the top 2 autobids are the same value
		if (highestAutobid.value === secondHighestAutobid) {
			// Values are the same, grab the userid of the oldest autobid
			var oldest = this.getOldestMatchingAutobid(highestAutobid.value);
			autobidUser = oldest.userid;
			autobidName = oldest.name;
		}
	}


	// Check the bidValue is not higher than the highest autobid
	if (bidValue > highestAutobid.value) {
		// The current bid is higher than the autobid
		// return an empty bid since we can't beat it with an autobid
		return {};
	}

	// Check if the bidValue is higher than the second autobid
	if (bidValue > newBid) {
		// This means the bidValue is in between the top 2 autobids
		// We need to add our minimum bid amount to the bidValue as the autobidder has had to outbid this bidder
		newBid = bidValue + 1;
	}

	// Check if the new bidValue is higher than the top autobid
	if (newBid > highestAutobid.value) {
		// we don't want to exceed the highest autobid due to the minimum bid amount so we set it to the top autobid
		newBid = highestAutobid.value;
	}

	return {
		userid: autobidUser,
		value: newBid,
		name: autobidName
	};
}

Auction.methods.sortField = function (field) {
	this[field].sort(function (b1, b2) { return b1.value - b2.value; });
}

module.exports = db.model('Auction', Auction);
