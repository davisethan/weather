var express = require('express');
var utility = require('./currentWeatherUtility');

// Create router
var router = express.Router();

router.post('/current-weather/city-name', async function(req, res){
    /**
     * Current weather by city name
     * :param req: Current weather web request
     * :param res: Current weather web response
     * :return: None
     */
    var cityName = req.body.cityName;
    if(!cityName){
        res.json({error: 'Invalid city name'});
    }else{
        var currentWeatherJSON = await utility.currentWeatherJSONByCityName(cityName);
        res.json(currentWeatherJSON);
    }
});

router.post('/current-weather/zip-code', async function(req, res){
    /**
     * Current weather by zip code
     * :param req: Current weather web request
     * :param req: Current weather web response
     * :return: None
     */
    var zipCode = req.body.zipCode;
    if(!zipCode){
        res.json({error: 'Invalid zip code'});
    }else{
        var currentWeatherJSON = await utility.currentWeatherJSONByZipCode(zipCode);
        res.json(currentWeatherJSON);
    }
});

router.post('/current-weather/latitude-longitude', async function(req, res){
    /**
     * Current weather by latitude and longitude
     * :param req: Current weather web request
     * :param res: Current weather web response
     * :return: None
     */
    var coordinate = {
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };
    if(!coordinate.latitude || !coordinate.longitude){
        res.json({error: 'Invalid latitude or longitude'});
    }else{
        var currentWeatherJSON = await utility.currentWeatherJSONByCoordinate(coordinate);
        res.json(currentWeatherJSON);
    }
});

module.exports = router;
