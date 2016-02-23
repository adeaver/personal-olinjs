var mongoose = require('mongoose');
var Item = require('../models/item.js');

var home = function(req, res) {
	var incomplete = "false";
	var complete = "true";
	var data = {};

	Item.find({completed:incomplete}).sort({timestamp: -1}).exec(function(err, items) {
		data.incompleteItems = err ? {} : items;

		Item.find({completed:complete}).sort({timestamp: -1}).exec(function(err, cItems) {
			data.completeItems = err ? {} : cItems;

			res.render("home", data);
		});
	});
}

module.exports.home = home;