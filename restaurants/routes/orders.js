var mongoose = require('mongoose');
var Ingredient = require('../models/ingredient.js');
var Order = require('../models/order.js');

var home = function(req, res) {
	res.render("order");
};

var add = function(req, res) {
	var price = parseFloat(req.query.price);
	var names = req.query.names.split(",");
	var amounts = req.query.amounts.split(",");
	var errorOccurred = false;

	var data = [];

	/* You could have used a functional tool like Array.prototype.map here -- though it's
	   a little less convenient because you're looping through both names and amounts.

	   The add function assumes that names and amounts are the same length, yes? Maybe good to
	   check for that & throw an error (or otherwise handle it) if that's not the case
	 */
	for(var index = 0; index < names.length; index++) {
		// can declare an object inline, like this, instead of setting attributes individually
		var obj = {ingredient: names[index], amount: parseInt(amounts[index])};

		Ingredient.update({"name":obj.ingredient}, {"$inc":{"quantity":-1*obj.amount}}, {}, function(err) {
			if(err) {
				console.log("Error occurred updating " + obj.ingredient);
			}
		});

		if(names[index] != "") {
			data.push(obj);
		}
	}

	var order = new Order({
		contents: data,
		price: price
	});

	/* You're adding each obj to data *outside* the Ingredient.update callback, so one of
		 the updates could fail and you'd still add it to the order and save the order... and you
		 can't just move the data.push inside the callback, because Ingredient.update is async...

		 This is a pretty good way of dealing with the problem because failing to update the quantity
		 of an ingredient isn't a) likely or b) that bad.

		 Just so you're aware in the future, though, promises are a way to wait for a bunch of async
		 operations to finish before doing another operation. "Promise" is a JavaScript built-in, and
		 there are also a bunch of libraries which work a little differently, depending on what you
		 need/prefer.

		 In this case, you could make a list of promises associated with each of the Ingredient.update
		 operations, then create the order and save it after all of those promises have been resolved.
	 */
	order.save(function(err, order) {
		if(err) {
			errorOccurred = true;
		}
	});

	res.send({message: errorOccurred ? "failed" : "successful"}); // don't need quotes for object keys
}; // when you declare functions as variables, convention is to end with a semicolon

var remove = function(req, res) {
	var id = req.query.id;
	var objId = mongoose.Types.ObjectId(id);

	Order.remove({_id:objId}, function(err) {
		res.send({"message":err ? "failed" : "successful"});
	});
}

module.exports.home = home;
module.exports.add = add;
module.exports.remove = remove;
/* If you don't like typing out all of the module.exports at the bottom, you can
	 declare a `var routes = {};` object at the top, then declare each method as
	 routes.whatever = function() {...};, then at the end `module.exports = routes;`
	 -- or you can even declare each function directly as `module.exports.whatever = function() {...};
 */
