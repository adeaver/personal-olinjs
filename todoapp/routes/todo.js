var mongoose = require('mongoose')
var Item = require('../models/item.js');

var addItem = function(req, res) {
	var text = req.body.todo;
	var date = new Date();

	var item = new Item({
		text:text,
		timestamp:date
	});

	item.save(function(err, item) {
		if(err) {
			res.send({});
		} else {
			res.send(item);
		}
	});
};

var removeItem = function(req, res) {
	var deleteId = req.params.id;

	Item.findOne({_id:deleteId}, function(err, item) {
		if(err) {
			res.send({});
		} else {
			Item.remove({_id:deleteId}, function(err) {
				if(err) {
					res.send({});
				} else {
					res.send(item);
				}
			});
		}
	});
};

var editItem = function(req, res) {
	var id = req.body.id;
	var newText = req.body.todo;

	Item.findOneAndUpdate({_id:id}, {'$set':{text:newText}}, {new:true}, function(err, item) {
		if(err) {
			res.send({});
		} else {
			res.send(item);
		}
	});
}

module.exports.addItem = addItem;
module.exports.removeItem = removeItem;
module.exports.editItem = editItem;