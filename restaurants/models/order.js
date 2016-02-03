var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
	contents:[{ingredient:Schema.Types.ObjectId, 
		amount:{type:Number}
	}]
});

module.exports = mongoose.model("Order", orderSchema);