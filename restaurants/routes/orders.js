var mongoose = require('mongoose');
var Ingredient = require('../models/ingredient.js');
var Order = require('../models/order.js');

var home = function(req, res) {
	res.render("order");
};

var add = function(req, res) {
	var price = parseFloat(req.query.price);
	var names = req.query.names.split(",");
	var amounts = req.query.amounts.split(",");
	var errorOccurred = false;

	var data = [];

	console.log(names);
	console.log(amounts);

	for(var index = 0; index < names.length; index++) {
		var obj = {};

		obj.ingredient = names[index];
		obj.amount = parseInt(amounts[index]);

		if(names[index] != "") {
			data.push(obj);
		}
	}

	var order = new Order({
		contents:data,
		price:price
	});

	order.save(function(err, order) {
		if(err) {
			errorOccurred = true;
		}
	});

	res.send({"message":errorOccurred ? "failed" : "successful"});
}

var remove = function(req, res) {
	var id = req.query.id;
	var objId = mongoose.Types.ObjectId(id);

	Order.remove({_id:objId}, function(err) {
		res.send({"message":err ? "failed" : "successful"});
	});
}

var getData = function(req, res) {
		Order.find(function(err, orders) {
		var data = err ? [] : orders;
		res.send(data);
	});
}

module.exports.home = home;
module.exports.add = add;
module.exports.remove = remove;
module.exports.getData = getData;