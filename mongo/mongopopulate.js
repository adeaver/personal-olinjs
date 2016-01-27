var mongoose = require('mongoose');
var fs = require('fs');

var db = mongoose.connection;

db.on('error', console.error);

mongoose.connect('mongodb://localhost/nodetest');

var popSchema = new mongoose.Schema({
	year:{type:String},
	population:{type:String},
	growth:{type:Number}
});

var countrySchema = new mongoose.Schema({
	name:{type:String},
	populations:{type:Array},
	type:{type:String},
	continent:{type:String}
});

var Population = mongoose.model('Population', popSchema);
var Country = mongoose.model('Country', countrySchema);
var continents = ["North America", "Central & South America", "Europe", "Eurasia", "Middle East", "Africa", "Asia & Oceania", "World"]
var continentsIndex = -1

var file = fs.readFile("populationbycountry19802010millions.csv", function callback(err, data) {
	var entries = data.toString().split("\r");
	var references = entries[0].split(",");

	for(var index = 1; index < entries.length; index++) {
		var popData = unpackLine(references, entries[index]);

		popData.save(function(err, popData) {
			if(err) { return console.error(err); }
		});
	}

	console.log("Complete");

});

function calcGrowth(newPop, oldPop) {
	if(newPop == "NA" || newPop == "--" || oldPop == "NA" || oldPop == "--") {
		return 0;
	}
	return (parseFloat(newPop)-parseFloat(oldPop))/oldPop * 100;
}

function unpackLine(ref, line) {
	var lineData = line.split(",")
	var pops = []

	for(var index = 1; index < lineData.length; index++) {
		var growth = index > 1 ? calcGrowth(lineData[index], pops[index-2].population) : 0;
		var info = {
			year:ref[index],
			population:lineData[index],
			growth:growth
		};
		pops.push(info);
	}

	console.log(pops.length);

	if(continents.indexOf(lineData[0]) != -1) {
		continentsIndex++;
		type = lineData[0] == "World" ? "world" : "continent";
	} else {
		type = "country";
	}

	var countryInfo = new Country({
		name:lineData[0],
		populations:pops,
		continent:continents[continentsIndex],
		type:type
	});

	return countryInfo;
}

// var Movie = mongoose.model('Movie', movieSchema);

// var thor = new Movie({
// 	_id:"Thor",
// 	rating:"PG-13",
// 	releaseYear:2011
// });

// thor.save(function(err, thor) {
// 	if(err) { return console.error(err); }
// 	console.log("Success");
// });