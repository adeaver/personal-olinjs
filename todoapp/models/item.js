var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	timestamp:{type:Date},
	text:{type:String},
	completed:{type:String}
});

module.exports = mongoose.model("Item", itemSchema);