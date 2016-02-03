var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
	price:{type:Number},
	quantity:{type:Number},
	name:{type:String}
});

module.exports = mongoose.model("Ingredient", ingredientSchema);