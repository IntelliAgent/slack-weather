/// <reference path='../typings/tsd.d.ts' />

import request = require('request');
import qs = require('querystring');
import weatherKey = require('../config/config');

declare module String {
    export var format:any;
}

var currentWeatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather?';
var forecastEndpoint = 'http://api.openweathermap.org/data/2.5/forecast?';
var dailyForecastEndpoint = 'http://api.openweathermap.org/data/2.5/forecast/daily?';


export class Weather {
    public getCurrentWeather(params, res) {
        this.queryOpenWeatherAPI(currentWeatherEndpoint + qs.stringify(params), res);
    }

    public getFiveDaysForecast(params, res) {
        this.queryOpenWeatherAPI(forecastEndpoint + qs.stringify(params), res);
    }

    private queryOpenWeatherAPI(url, res) {
        request({
                uri: url + '&units=metric&appid=' + weatherKey.WeatherKEY,
                method: 'GET'
            },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    if (body.list) {

                    } else {
                        body = JSON.parse(body);
                        var temp = body.main.temp;
                        var humidity = body.main.humidity;
                        var windSpeed = body.wind.speed;
                        res.status(200).send({
                            response_type: 'in_channel',
                            text: `It\'s ${temp}C with ${humidity}% humidity and ${windSpeed}meter/sec winds`,
                            attachments: [
                                {image_url: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png"}
                            ]
                        });
                    }

                } else {
                    console.error(error, body);
                    res.status(response.statusCode).send(body);
                }
            }
        );
    }
}
