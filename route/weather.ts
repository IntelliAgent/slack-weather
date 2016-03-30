import {Weather} from "../common/openweathermap";
import {SlackToken} from "../config/config";

let weather = new Weather();

export function getCurrentWeather(req, res) {
    if (req.query.token !== SlackToken) {
        weather.getCurrentWeather({
            q: req.query.q || '',
            id: req.query.id || '',
            lat: req.query.lat || '',
            lon: req.query.lon || '',
            zip: req.query.zip || '',
        }, res);
    } else {
        res.sendStatus(403);
    }


}