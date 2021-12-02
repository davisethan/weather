var superagent = require('superagent');

exports.currentWeatherJSONByCityName = async function (cityName) {
    /**
     * Current weather JSON by city name
     * :param cityName: City name
     * :return: Current weather JSON
     */
    const URLByCitName = `${process.env.WEATHER_URL}?` +
        `q=${cityName},or,us&` +
        `units=imperial&` +
        `appid=${process.env.WEATHER_API_KEY}`;
    try {
        var result = await superagent.get(URLByCitName);
        return currentWeatherJSON(result);
    } catch (err) {
        return { error: 'Bad third party API' };
    }
}

exports.currentWeatherJSONByZipCode = async function (zipCode) {
    /**
     * Current weather JSON by zip code
     * :param zipCode: Zip code
     * :return: Current weather JSON
     */
    var URLByZipCode = `${process.env.WEATHER_URL}?` +
        `zip=${zipCode},us&` +
        `units=imperial&` +
        `appid=${process.env.WEATHER_API_KEY}`;
    try {
        var result = await superagent.get(URLByZipCode);
        return currentWeatherJSON(result);
    } catch (err) {
        return { error: 'Bad third party API' };
    }
}

exports.currentWeatherJSONByCoordinate = async function (coordinate) {
    /**
     * Current weather JSON by coordinate latitude and longitude
     * :param coordinate: Coordinate latitude and longitude
     * :return: current weather JSON
     */
    var URLByCoordinate = `${process.env.WEATHER_URL}?` +
        `lat=${coordinate.latitude}&` +
        `lon=${coordinate.longitude}&` +
        `units=imperial&` +
        `appid=${process.env.WEATHER_API_KEY}`;
    try {
        var result = await superagent.get(URLByCoordinate);
        return currentWeatherJSON(result);
    } catch (err) {
        return { error: 'Bad third party API' };
    }
}

function currentWeatherJSON(result) {
    /**
     * Current weather JSON
     * :param result: Third party API weather response
     * :return: Current weather JSON
     */
    const weather = result.body;
    return {
        temperature: weather.main.temp,
        cityName: weather.name,
        latitude: weather.coord.lat,
        longitude: weather.coord.lon,
        weather: weather.weather[0].main,
        weatherIconURL: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    };
}
