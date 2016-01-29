var mongoose = require('mongoose');
var Country = require('../models/country');

var getData = function(req, res) {
	
	Country.find(req.query, function(err, countries) {
		var data = []
		if(err === null) {
			data = countries;
		}
		res.render("home", {data:countries});
	});
};

module.exports.getData = getData;