import {Weather} from "../common/openweathermap";
import {SlackToken} from "../config/config";
import {Alias} from "../common/alias";

let weather = new Weather();
let alias = new Alias();

export function getWeather(req, res) {
    if (req.body.token === SlackToken) {
        if (req.body.text) {
            let queryText = req.body.text.split(/\s+/g);
            let nbParams = queryText.length;
            if (queryText[0] === 'delete') {
                alias.deleteAlias({
                    aliasName: queryText[1]
                }, res);
            }
            else if (queryText[0] === 'add') {
                alias.addAlias({
                    aliasName: queryText[1],
                    zip: queryText[2],
                    country: queryText[3],
                    forecast: queryText[4] || ''
                }, res);
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