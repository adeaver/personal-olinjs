var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	price:{type:Number},
	contents:[{ingredient:{type:String}, 
		amount:{type:Number}
	}]
});

module.exports = mongoose.model("Order", orderSchema);