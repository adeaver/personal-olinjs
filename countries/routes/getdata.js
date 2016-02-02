var mongoose = require('mongoose');
var Country = require('../models/country');

var getData = function(req, res) {
	
	Country.find(req.query, function(err, countries) {
		var data = {}
		if(err === null) {
			data = countries.length > 0 ? countries : "{message:'no data'}";
		}
		res.send(data);
	});
};

module.exports.getData = getData;