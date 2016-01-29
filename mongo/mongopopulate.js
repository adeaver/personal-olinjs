var mongoose = require('mongoose');
var fs = require('fs');

var db = mongoose.connection;

db.on('error', console.error);

mongoose.connect('mongodb://localhost/nodetest');

var countrySchema = new mongoose.Schema({
	country:{type:String},
	growth:{type:Number},
	year:{type:Number},
	population:{type:Number}
});

var Country = mongoose.model("Country", countrySchema);

var continents = ["North America", "Central & South America", "Europe", "Eurasia", "Middle East", "Africa", "Asia & Oceania", "World"]
var continentsIndex = -1

var file = fs.readFile("populationbycountry19802010millions.csv", function callback(err, data) {
	var entries = data.toString().split("\r");
	var references = entries[0].split(",");

	for(var index = 1; index < entries.length; index++) {
		unpackLine(references, entries[index]);
	}

	console.log("Complete");

});

function calcGrowth(newPop, oldPop) {
	if(newPop == "NA" || newPop == "--" || oldPop == "NA" || oldPop == "--") {
		return 0;
	}
	return (parseFloat(newPop)-parseFloat(oldPop))/oldPop * 100;
}

function unpackLine(references, line) {
	var lineData = line.split(",")
	var countryName = lineData[0];

	for(var index = 1; index < lineData.length; index++) {
		if(continents.indexOf(countryName) == -1) {
			var year = parseInt(references[index]);
			if(index > 1) {
				var oldPop = lineData[index-1];
				console.log(index-1);
				var pop = lineData[index];
				var growth = calcGrowth(pop, oldPop);
				pop = pop != "NA" && pop != "--" ? parseFloat(pop) : 0;
			} else {
				var pop = lineData[index] != "NA" && lineData[index] != "--" ? parseFloat(lineData[index]) : 0;
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
					return console.error(err);
				}
			});
		}
	}
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