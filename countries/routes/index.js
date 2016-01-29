var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodetest');

var countrySchema = new mongoose.Schema({
	name:{type:String},
	populations:{type:Array},
	type:{type:String},
	continent:{type:String}
});

var Country = mongoose.model('Country', countrySchema);

var home = function(req, res){

	Country.find(function(err, countries) {
		var data = []
		if (err === null) {
			data = countries;
		}

		res.render("home", {data:countries});
	});
};

var getData = function(req, res) {
	
	Country.find(req.query, function(err, countries) {
		var data = []
		if(err === null) {
			data = countries;
		}
		res.render("home", {data:countries});
	});
};

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

module.exports.home = home;
module.exports.getData = getData;
module.exports.removeData = removeData;
module.exports.addData = addData;