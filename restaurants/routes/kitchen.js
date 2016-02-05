var mongoose = require('mongoose');
var Order = require('../models/order.js');

var home = function(req, res) {
	res.render("kitchen");
}

module.exports.home = home;