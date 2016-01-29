var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
	name:{type:String},
	populations:{type:Array},
	type:{type:String},
	continent:{type:String}
});

module.exports = mongoose.model('Country', countrySchema);