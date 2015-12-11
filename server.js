var express = require('express');
var app = express();

// One project for each or multiple route?
// One project per thingy, of course
// Let's start with weather then
// These comment stay in code forever
// For sure
var weather = require('./route/weather');

app.get('/', function(request, response){
    response.send('You made it to the home page.')
  });

app.get('/slack/weather', weather.getCurrentWeather);

var port = process.env.PORT || 3000;
app.listen(port);