var mongoose = require('mongoose');
var Country = require('../models/country');

var removeData = function (req, res) {
	Country.findOne(req.query, function(err, country) {
		var message = {message: "error"};

		if(err) {
			res.send(message)
		} else {
			if(country) {
				Country.remove(req.query, function(err) {
					if(err === null) {
						message.message = "successful";
					}

					res.send(message)
				});
			} else {
				message.message = "data did not exist in database";
				res.send(message);
			}
		}
	});
};

module.exports.removeData = removeData;