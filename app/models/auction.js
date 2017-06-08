var mongoose 			= require('mongoose');
var AutobidSchema = require('../models/autobid');
var BidSchema 		= require('../models/bid');
var Schema 				= mongoose.Schema;


// Auction Schema
var AuctionSchema = new Schema({
	name : {
		type: String,
		required : true,
		index : {
			unique : true
		}
	},
	description : {
		type : String
	},
	start_date : {
		type: Date,
		required: true
	},
	end_date : {
		type: Date,
		required: true
	},
	start_amount : {
		type : Number,
		required: true
	},
	enabled : {
		type : Boolean,
		default : false
	},
	countdown : { type: Number, default : 1 },
	bids : [BidSchema.schema],
	autobids : [AutobidSchema.schema]
});

AuctionSchema.methods.isValidStartDate = function isValidStartDate(cb){
	return new Date() >= new Date(this.start_date);
}

// Establish the minimum bid
// Either the highest current bid + 1
// OR the auction start amount
AuctionSchema.methods.minimumBid = function() {
	var minBid = this.start_amount;

	if(this.bids.length > 0) {
		this.sortField('bids');
		minBid = this.bids[this.bids.length-1].value + 1;
	}

	return minBid;
}

AuctionSchema.methods.currentWinner = function() {
  var userid = '';
  
  if(this.bids.length > 0) {
    this.sortField('bids');
    userid = this.bids[this.bids.length-1].userid; 
  }
	return userid;
}

AuctionSchema.methods.getOldestMatchingAutobid = function(autobidValue){
  // sort by created_at and filter by the autobid value
  var autobids = this.autobids
    .filter(function(obj){
      return obj.value === autobidValue;
    })
    .sort(function(b1,b2){
      return b1.created_at - b2.created_at;
    });

  return {
    userid: autobids[0].userid,
    username: autobids[0].username
  }
}

AuctionSchema.methods.checkForAutobid = function(bidValue){
	var highestAutobid   = { value: 0 };
	var autobidUser      = '';
	var autobidUsername	 = '';
	var newBid 			     = 0;

	// Check for existing autobids
	if(this.autobids.length === 0) {
		// There are no autobids so return an empty bid
    return {};	
	}

	// Sort autobids
	this.sortField('autobids');

	// Get the highest current autobid
	highestAutobid   = this.autobids[this.autobids.length-1];
	autobidUser      = this.autobids[this.autobids.length-1].userid;
  autobidUsername  = this.autobids[this.autobids.length-1].username;

  // We also need the second highest to establish our minimum bid value
  if(this.autobids.length > 1) {
    var secondHighestAutobid = this.autobids[this.autobids.length-2].value;

    newBid = this.autobids[this.autobids.length-2].value + 1;

    // Check if the top 2 autobids are the same value
    if(highestAutobid.value === secondHighestAutobid) {
      // Values are the same, grab the userid of the oldest autobid
      var oldest      = this.getOldestMatchingAutobid(highestAutobid.value);
      autobidUser     = oldest.userid;
      autobidUsername = oldest.username;
    }
  }


	// Check the bidValue is not higher than the highest autobid
	if(bidValue > highestAutobid.value) {
		// The current bid is higher than the autobid
		// return an empty bid since we can't beat it with an autobid
		return {};
	}

	// Check if the bidValue is higher than the second autobid
	if(bidValue > newBid) {
		// This means the bidValue is in between the top 2 autobids
    // We need to add our minimum bid amount to the bidValue as the autobidder has had to outbid this bidder
		newBid = bidValue + 1;
	}

	// Check if the new bidValue is higher than the top autobid
	if(newBid > highestAutobid.value) {
		// we don't want to exceed the highest autobid due to the minimum bid amount so we set it to the top autobid
		newBid = highestAutobid.value;
	}

	return {
		userid: autobidUser,
		value: newBid,
		username: autobidUsername
	};
}

AuctionSchema.methods.sortField = function(field){
	this[field].sort(function(b1,b2){ return b1.value - b2.value; });
}

AuctionSchema.methods.highestBid = function(){
	this.sortField('bids');

	return {
		bid: this.bids[this.bids.length-1],
		auction_id: this._id
	}
}

// return model
module.exports = mongoose.model('Auction', AuctionSchema);