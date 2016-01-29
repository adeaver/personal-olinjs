var mongoose = require('mongoose');
var Country = require('../models/country');

var home = function(req, res){

	Country.find(function(err, countries) {
		var data = []
		if (err === null) {
			data = countries;
		}

		res.render("home", {data:countries});
	});
};

module.exports.home = home;