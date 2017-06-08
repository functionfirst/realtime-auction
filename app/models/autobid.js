var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var AutobidSchema = new Schema({
	userid : {
		type : ObjectId
	},
	username: {
		type: String
	},
	value : {
		type : Number,
		min : 0
	},
	blocked : {
		type: Boolean,
		default : false
	},
	created_at : {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('Autobid', AutobidSchema);