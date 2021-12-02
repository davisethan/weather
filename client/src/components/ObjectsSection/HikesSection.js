import async from 'async';
import axios from 'axios';
import ObjectSection from './ObjectsSection';

class HikesSection extends ObjectSection {
    constructor(props) {
        /**
         * Hikes section
         * @param props Parent inherited state
         * @returns None
         */
        super(props);
        this.mapZipCodesToCoordinates = this.mapZipCodesToCoordinates.bind(this);
        this.zipCodeToCoordinate = this.zipCodeToCoordinate.bind(this);
        this.afterZipCodesToCoordinates = this.afterZipCodesToCoordinates.bind(this);
        this.coordinateToHistoricalWeather = this.coordinateToHistoricalWeather.bind(this);
        this.afterCoordinatesToHistoricalWeather =
            this.afterCoordinatesToHistoricalWeather.bind(this);
    }

    componentDidMount() {
        /**
         * Hikes section React component did mount set state
         * @returns None
         */
        this.setHeader('Best Oregon Hikes Historical Weather');
        axios.get(process.env.REACT_APP_HIKES_URL)
            .then(result => {
                const hikes = result.data;
                this.mapZipCodesToCoordinates(hikes);
            })
            .catch(error => { });
    }

    mapZipCodesToCoordinates(hikes) {
        /**
         * Map zip codes to coordinates
         * @param hikes Hikes
         * @returns None
         */
        async.map(hikes, this.zipCodeToCoordinate, this.afterZipCodesToCoordinates);
    }

    zipCodeToCoordinate(hike, callback) {
        /**
         * Zip code to coordinate
         * @param hike Hike with zip code
         * @param callback Zip code to coordinate callback
         * @returns None
         */
        const ZIP_CODE_TO_COORDINATE_URL = `http://api.openweathermap.org/geo/1.0/zip?` +
            `zip=${hike.zipcode},us&` +
            `appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
        axios.get(ZIP_CODE_TO_COORDINATE_URL)
            .then(result => {
                const coordinate = {
                    latitude: result.data.lat,
                    longitude: result.data.lon
                };
                callback(null, coordinate);
            })
            .catch(error => callback(error));
    }

    afterZipCodesToCoordinates(error, coordinates) {
        /**
         * After zip codes to coordinates
         * @param error Error mapping zip codes to coordinates
         * @param coordinates Coordinates
         * @returns None
         */
        if (!error) {
            async.map(coordinates,
                this.coordinateToHistoricalWeather,
                this.afterCoordinatesToHistoricalWeather);
        }
    }

    coordinateToHistoricalWeather(coordinate, callback) {
        /**
         * Coordinate to historical weather
         * @param coordinate Coordinate with latitude and longitude
         * @param callback Map callback
         * @returns None
         */
        const HISTORICAL_WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?` +
            `lat=${coordinate.latitude}&` +
            `lon=${coordinate.longitude}&` +
            `exclude=current,minutely,hourly,alert&` +
            `units=imperial&` +
            `appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
        axios.get(HISTORICAL_WEATHER_URL)
            .then(result => callback(null, result))
            .catch(error => callback(error));
    }

    afterCoordinatesToHistoricalWeather(error, results) {
        /**
         * After mapping coordinates to historical weather
         * @param error Error mapping coordinates to historical weather
         * @param results Successful mapped coordinates to historical weather
         * @retusn None
         */
        if (!error) {
            this.setState({
                objects: results.filter(result => result).map(result => this.newObject(result))
            });
        }
    }
}

export default HikesSection;
