var mongoose = require('mongoose');
var Order = require('../models/order.js');

var home = function(req, res) {
	Order.find(function(err, orders) {
		var data = err ? [] : orders;
		res.render("kitchen", {data:data});
	});
}

module.exports.home = home;