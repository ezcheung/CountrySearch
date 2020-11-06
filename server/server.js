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
app.listen(port);
console.log("Listening on port", port);