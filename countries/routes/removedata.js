var mongoose = require('mongoose');
var Country = require('../models/country');

var removeData = function (req, res) {
	Country.findOne(req.query, function(err, country) {
		var message = "error";

		if(err) {
			res.render("home", {data:message});
		} else {
			if(country) {
				Country.remove(req.query, function(err) {
					if(err === null) {
						message = "successful";
					}

					res.render("home", {data:message});
				});
			} else {
				message = "data did not exist in database";
				res.render("home", {data:message});
			}
		}
	});
};

module.exports.removeData = removeData;