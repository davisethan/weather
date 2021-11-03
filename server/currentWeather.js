var express = require('express');
var superagent = require('superagent');

// Constants
var URL = 'api.openweathermap.org/data/2.5/weather';
var API_KEY = '92bd8db205c74ef3dfbe55b1a2fb71f6';

// Create router
var router = express.Router();

router.post('/current-weather/city-name', function(req, res){
    /**
     * Get current weather by city name
     */
    var cityName = req.body.cityName;
    if(!cityName){
        res.json({
            error: 'Invalid city name'
        });
    }else{
        superagent
            .get(`${URL}?q=${cityName},or,us&units=imperial&appid=${API_KEY}`)
            .end(function(err, result){
                if(err){
                    console.log(err);
                    res.json({
                        error: "Bad 3rd party API"
                    });
                }else{
                    var body = result.body;
                    res.json({
                        temperature: body.main.temp,
                        cityName: body.name,
                        latitude: body.coord.lat,
                        longitude: body.coord.lon,
                        weather: body.weather[0].main,
                        weatherIconURL: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`
                    });
                }
            });
    }
});

router.post('/current-weather/zip-code', function(req, res){
    /**
     * Get current weather by zip code
     */
    var zipCode = req.body.zipCode;
    if(!zipCode){
        res.json({
            error: 'Invalid zip code'
        });
    }else{
        superagent
            .get(`${URL}?zip=${zipCode},us&units=imperial&appid=${API_KEY}`)
            .end(function(err, result){
                if(err){
                    console.log(err);
                    res.json({
                        error: "Bad 3rd party API"
                    });
                }else{
                    var body = result.body;
                    res.json({
                        temperature: body.main.temp,
                        cityName: body.name,
                        latitude: body.coord.lat,
                        longitude: body.coord.lon,
                        weather: body.weather[0].main,
                        weatherIconURL: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`
                    });
                }
            });
    }
});

router.post('/current-weather/latitude-longitude', function(req, res){
    /**
     * Get current weather by latitude and longitude
     */
    var latitude = req.body.latitude;
    var longitude = req.body.longitude
    if(!latitude || !longitude){
        res.json({
            error: 'Invalid latitude or longitude'
        });
    }else{
        superagent
            .get(`${URL}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`)
            .end(function(err, result){
                if(err){
                    console.log(err);
                    res.json({
                        error: "Bad 3rd party API"
                    });
                }else{
                    var body = result.body;
                    res.json({
                        temperature: body.main.temp,
                        cityName: body.name,
                        latitude: body.coord.lat,
                        longitude: body.coord.lon,
                        weather: body.weather[0].main,
                        weatherIconURL: `http://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`
                    });
                }
            });
    }
});

module.exports = router;
