var mongoose = require('mongoose');
var Country = require('../models/country');

var addData = function(req, res) {
	// I'm assuming that type, name, and continent are all coming in as request variables
	// Population data should be csv format
	console.log(req.body);

	var countryName = req.body.name;
	var years = req.body.years.split(",");
	var populations = req.body.populations.split(",");

	var error = unpackLine(years, populations, countryName);

	if(error) {
		message = "error"
	} else {
		message = "successful"
	}

	res.render("home", {data:message});

};

function unpackLine(years, pops, countryName) {
	var errorOccurred = false;

	for(var index = 0; index < pops.length; index++) {
		var year = parseInt(years[index]);
		if(index > 0) {
			var oldPop = pops[index-1];
			var pop = pops[index];
			var growth = calcGrowth(pop, oldPop);
			pop = pop != "NA" && pop != "--" ? parseFloat(pop) : 0;
		} else {
			var pop = pops[index] != "NA" && pops[index] != "--" ? parseFloat(pops[index]) : 0;
			var growth = 0;
		}

		var country = new Country({
			year:year,
			growth:growth,
			country:countryName,
			population:pop
		});

		country.save(function(err, country) {
			if(err) {
				errorOccurred = true;
			}
		});
	}

	return errorOccurred;
}

function calcGrowth(newPop, oldPop) {
	if(newPop == "NA" || newPop == "--" || oldPop == "NA" || oldPop == "--") {
		return 0;
	}
	return (parseFloat(newPop)-parseFloat(oldPop))/oldPop * 100;
}

module.exports.addData = addData;