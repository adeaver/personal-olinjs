var fs = require('fs');

module.exports = function(dir, ext, callback) {
	var directory = fs.readdir(dir, function fsCallback(err, data) {
		if(err) { return callback(err, null); }

		var rData = [];

		for(var i = 0; i < data.length; i++) {
			var ending = data[i].split(".")[1];
			if(ending == ext) {
				rData.push(data[i]);
			}
		}
		return callback(null, rData);
	});
};