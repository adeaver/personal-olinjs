var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
	country:{type:String},
	growth:{type:Number},
	year:{type:Number},
	population:{type:Number}
});

module.exports = mongoose.model('Country', countrySchema);