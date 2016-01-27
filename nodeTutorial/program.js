// Exercise #9

// var http = require('http');
// var bl = require('bl');

// http.get(process.argv[2], function callback(response) {
// 	response.pipe(bl(function(err, data) {
// 		console.log(data.toString());

// 		http.get(process.argv[3], function callback(response) {
// 			response.pipe(bl(function(err, data) {
// 				console.log(data.toString());

// 				http.get(process.argv[4], function callback(response) {
// 					response.pipe(bl(function(err, data) {
// 						console.log(data.toString());
// 					}));
// 				});
// 			}));
// 		});
// 	}));
// });

// var http = require('http');
// var bl = require('bl');
// var results = [];
// var count = 0;

// function printResults () {  
// for (var i = 0; i < 3; i++)  
//  console.log(results[i])  
// }  

// function httpGet(index) {
// 		http.get(process.argv[2+index], function callback(response) {
// 			response.pipe(bl(function(err, data) {
// 				if(err) {
// 					return console.error(err);
// 				}

// 				results[index] = data.toString();
// 				count++;

// 				if(count == 3) {
// 					for (var i = 0; i < 3; i++)  
//  						console.log(results[i])  
// 				}
// 			})
// 		);
// 	});
// }
 


// for(var i = 0; i < 3; i++) {
// 	httpGet(i);
// }

// Exercise #10

// var net = require('net');
// var server = net.createServer(function(socket) {
// 	var date = new Date();
// 	var monthOfYear = (date.getMonth()+1)<10 ? "0" + (date.getMonth()+1).toString() : (date.getMonth()+1).toString();
// 	var datetime = date.getFullYear().toString() + "-" + monthOfYear + "-" + date.getDate() + " ";
// 	datetime += date.getHours().toString() + ":" + date.getMinutes().toString() + "\n";
// 	socket.end(datetime);
// });

// server.listen(process.argv[2]);

// Exercise #11

// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function callback(request, response) {
// 	var src = fs.createReadStream(process.argv[3]);
// 	src.pipe(response);
// });
// server.listen(process.argv[2]);

// Exercise #12

// var http = require('http');
// var map = require('through2-map');

// var server = http.createServer(function callback(request, response) {
// 	if(request.method == "POST") {
// 		request.pipe(map(function(chunk) { return chunk.toString().toUpperCase(); })).pipe(response);
// 	}
// });
// server.listen(process.argv[2]);

// Exercise #13

// var http = require('http');

// var server = http.createServer(function callback(request, response) {
// 	var url = request.url.toString();
// 	var urlComponents = url.split("?");
// 	var responseText = "";

// 	if(urlComponents.length > 1) {
// 		var args = urlComponents[1].split("&");
// 		var date = null;

// 		for(var i = 0; i < args.length; i++) {
// 			var pair = args[i].split("=");
// 			if(pair[0] == "iso") {
// 				date = new Date(pair[1]);
// 				break;
// 			}
// 		}

// 		if(date !== null) {
// 			if(urlComponents[0] == "/api/parsetime") {
// 				responseText = JSON.stringify({"hour":date.getHours(), "minute":date.getMinutes(), "second":date.getSeconds()});
// 			} else if(urlComponents[0] == "/api/unixtime") {
// 				responseText = JSON.stringify({"unixtime":date.getTime()});
// 			}
// 		}

// 	}

// 	response.writeHead(200, {'Content-Type':'application/json'});
// 	response.write(responseText);
// 	response.end();
// });
// server.listen(process.argv[2]);