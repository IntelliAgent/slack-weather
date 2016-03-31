/// <reference path='./typings/tsd.d.ts' />

import weather = require('./route/weather');
import express = require('express');
import http = require('http');

let app = express();

app.get('/slack/weather', weather.getWeather);

app.set('port', process.env.PORT || 8080);

http.createServer(app).listen(app.get('port'), '0.0.0.0', function () {
    console.log('Slack Weather server listening on port ' + app.get('port'));
});

