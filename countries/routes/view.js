var http = require('http');
var bl = require('bl');

var view = function(req, res) {
	var year = req.query.year;
	var url = "http://127.0.0.1:3000/data?year=" + year;

	http.get(url, function callback(response) {
		response.pipe(bl(function(err, data) {
			var dataString = data.toString();

			var dataJson = JSON.parse(dataString);

			res.render("draw", {data:dataJson});
		}));
	});
};

module.exports.view = view;