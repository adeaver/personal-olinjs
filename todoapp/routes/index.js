var mongoose = require('mongoose');
var Item = require('../models/item.js');

var home = function(req, res) {
	Item.find({}).sort({timestamp: -1}).exec(function(err, items) {
		if(err) {
			res.render("home", {'data':[]});
		} else {
			res.render("home", {'data':items});
		}
	});
}

module.exports.home = home;