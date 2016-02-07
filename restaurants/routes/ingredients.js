var mongoose = require('mongoose');
var Ingredient = require('../models/ingredient.js');

// This function should render template for ingredients
var home = function(req, res) {
	Ingredient.find(function(err, ingredients) {
		var data = err ? [] : ingredients;
		res.render("ingredients", {data:data});
	})
}

// This function should get a list of all the available ingredients for display
var getData = function(req, res) {
	Ingredient.find(function(err, ingredients) {
		var data = err ? [] : ingredients;
		res.send(data);
	});
}

// This function should add or update an item
var create = function(req, res) {
	Ingredient.update({name:req.query.name}, req.query, {upsert:true}, function(err) {
		if(err) {
			res.send([]);
		} else {
			Ingredient.findOne({name:req.query.name}, function(err, ingredient) {
				var data = err ? [] : ingredient;
				res.send(ingredient);
			});
		}
	});
}


// Exports for functions
module.exports.home = home;
module.exports.getData = getData;
module.exports.create = create;