var mongoose = require('mongoose');
var Country = require('../models/country');

var addData = function(req, res) {
	// I'm assuming that type, name, and continent are all coming in as request variables
	// Population data should be csv format
	console.log(req.body);

	var name = req.body.name;
	var type = req.body.type;
	var continent = req.body.continent;
	var pop = unpackLine(req.body.years, req.body.populations);

	var insert = new Country({
		name:name,
		continent:continent,
		type:type,
		populations:pop
	});

	insert.save(function(err, insert) {
		var message = err === null ? "successful" : "error occurred";
		res.render("home", {data:message});
	});

};

function unpackLine(yearLine, popLine) {
	var popData = popLine.split(",")
	var yearData = yearLine.split(",")
	var pops = []

	for(var index = 0; index < popData.length; index++) {
		var growth = index > 0 ? calcGrowth(popData[index], pops[index-1].population) : 0;
		var info = {
			year:yearData[index],
			population:popData[index],
			growth:growth
		};
		pops.push(info);
	}

	return pops;
}

function calcGrowth(newPop, oldPop) {
	if(newPop == "NA" || newPop == "--" || oldPop == "NA" || oldPop == "--") {
		return 0;
	}
	return (parseFloat(newPop)-parseFloat(oldPop))/oldPop * 100;
}

module.exports.addData = addData;