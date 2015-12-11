var openWeather = require('../common/openweathermap');


exports.getCurrentWeather = function (req, res) {
    openWeather.getCurrentWeather({
        q: req.query.q || '',
        id: req.query.id || '',
        lat: req.query.lat || '',
        lon: req.query.lon || '',
        zip: req.query.zip || '',
    }, res);
};