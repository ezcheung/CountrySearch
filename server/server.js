let path = require('path');
var browserify = require('browserify-middleware');
var express = require('express');

var app = express();


app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require("babelify"), { presets: ["es2015", "react"] } ] ]
  })
);

var port = process.env.PORT || 4000;
/*
* Starts the server
*/
let startListening = function() {
	let listener = app.listen(port);
	console.log("Listening on port:" + port);

	process.on('SIGINT', function(){
		console.log("Shutting down");
	  	listener.close(); //make sure to close port
		process.exit(0);
	});
}

startListening()