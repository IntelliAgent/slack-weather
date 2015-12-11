var request = require('request');
var qs = require('querystring');

var currentWeatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather?';
var forecastEndpoint = 'http://api.openweathermap.org/data/2.5/forecast?';
var dailyForecastEndpoint = 'http://api.openweathermap.org/data/2.5/forecast/daily?';


exports.getCurrentWeather = function (parameters, res) {
    queryOpenWeatherAPI(currentWeatherEndpoint + qs.stringify(parameters), res);
};


function queryOpenWeatherAPI(url, res, amount) {
    request({
            uri: url + '&appid=APPID',
            method: 'GET'
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                successCallback(res, JSON.parse(body), amount);
            } else {
                errorCallback(res, error, response, body);
            }
        }
    );
}

function successCallback(res, body, amount) {
        res.status(200).send(body);
}

function errorCallback(res, error, response, body) {
    console.error(error, body);
    res.status(response.statusCode).send(body);
}