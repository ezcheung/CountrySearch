let path = require('path');
let browserify = require('browserify-middleware');
let express = require('express');
let fetch = require('node-fetch');

let app = express();


app.use(express.static(path.join(__dirname, "../client/public")));

/**
* Country lookup endpoint helpers
*/
let getRestEndpoint = function(input,searchOpt){
	if(!input) return null;

	if(searchOpt === "name") return `https://restcountries.eu/rest/v2/name/${input}`;
	else if(searchOpt === "fullname") return `https://restcountries.eu/rest/v2/name/${input}?fullText=true`;
	else if(searchOpt === "code") return `https://restcountries.eu/rest/v2/alpha/${input}`;
	else return null;
}

let buildCountriesResponse = function(data) {
	
}

/**
* Endpoints
*/
app.get('/bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require("babelify"), { presets: ["es2015", "react"] } ] ]
  })
);

app.get('/countries/:searchOpt',
	(req,res) => {
		let endpoint = getRestEndpoint(req.query.q,req.params.searchOpt);
		if(endpoint == null) res.status(400).send("Invalid search parameters")
		else {
			fetch(endpoint)
			.then(data => data.json())
			.then(data => {
				console.log("Data: ", data);
				if((data.status == undefined)||(data.status < 300)) {
					return res.status(200).send(data);
				}
				else return res.status(data.status).send(data);
			})
			.catch(err => {
				console.log("Error: ", err.message);
				res.status(500).send({error: err.message, ok: false});
			})
		}
	})

let port = process.env.PORT || 4000;

/**
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

	process.on('SIGTERM', function(){
		console.log("Shutting down");
	  	listener.close(); //make sure to close port
		process.exit(0);
	});
}

startListening()