import {Weather} from "../common/openweathermap";
let weather = new Weather();
export function getCurrentWeather(req, res) {
    console.log(req);
    weather.getCurrentWeather({
        q: req.query.q || '',
        id: req.query.id || '',
        lat: req.query.lat || '',
        lon: req.query.lon || '',
        zip: req.query.zip || '',
    }, res);
}