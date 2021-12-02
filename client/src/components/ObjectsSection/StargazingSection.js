import async from 'async';
import axios from 'axios';
import ObjectSection from './ObjectsSection';

class StargazingSection extends ObjectSection {
    constructor(props) {
        /**
         * Stargazing section
         * @param props Parent inherited state
         * @returns None
         */
        super(props);
        this.mapSight = this.mapSight.bind(this);
        this.afterMapSights = this.afterMapSights.bind(this);
    }

    componentDidMount() {
        /**
         * Stargazing section React component did mount set state
         * @returns None
         */
        this.setHeader('Best Oregon Stargazing Historical Weather');
        axios.get(process.env.REACT_APP_STARTGAZING_URL)
            .then(result => {
                const sights = result.data;
                async.map(sights, this.mapSight, this.afterMapSights);
            })
            .catch(error => { });
    }

    mapSight(sight, callback) {
        /**
         * Map sight
         * @param sight Sight
         * @param callback Map callback
         * @returns None
         */
        if (!sight) {
            callback(null, null);
        } else {
            const HISTORICAL_WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?` +
                `lat=${sight.latitude}&` +
                `lon=${sight.longitude}&` +
                `exclude=current,minutely,hourly,alert&` +
                `units=imperial&` +
                `appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
            axios.get(HISTORICAL_WEATHER_URL)
                .then(result => callback(null, result))
                .catch(error => callback(error));
        }
    }

    afterMapSights(error, results) {
        /**
         * After map sights
         * @param error Error mapping sights
         * @param results Successful mapped sights
         * @returns None
         */
        if (!error) {
            this.setState({
                objects: results.filter(result => result).map(result => this.newObject(result))
            });
        }
    }
}

export default StargazingSection;
