import {Weather} from "../common/openweathermap";
import {SlackToken} from "../config/config";

let weather = new Weather();

export function getWeather(req, res) {
    if (req.query.token === SlackToken) {
        if (req.query.text) {
            let queryText = req.query.text.split(/\S+/g);
            let nbParams = queryText.length;
            if (queryText[0] === 'delete') {
                // Delete alias
            }
            else if (queryText[0] === 'add') {
                // Add alias
            }
            else {
                if (queryText[nbParams - 1] === '-f') {
                    weather.getFiveDaysForecast({
                        zip: queryText[0] + ',' + queryText[1] || '',
                    }, res);
                } else {
                    weather.getCurrentWeather({
                        zip: queryText[0] + ',' + queryText[1] || '',
                    }, res);
                }

            }
        }
    } else {
        res.sendStatus(403);
    }
}