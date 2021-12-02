import async from 'async';
import axios from 'axios';
import ObjectSection from './ObjectsSection';

class CrimesSection extends ObjectSection {
    constructor(props) {
        /**
         * Crimes section
         * @param props Parent inherited state
         * @returns None
         */
        super(props);
        this.mapCrime = this.mapCrime.bind(this);
        this.afterMapCrimes = this.afterMapCrimes.bind(this);
    }

    componentDidMount() {
        /**
         * Crimes section React component did mount set state
         * @returns None
         */
        this.setHeader('Worst Oregon Cities by Crime Historical Weather');
        axios.get(process.env.REACT_APP_CRIMES_URL)
            .then(result => {
                const crimes = result.data;
                async.map(crimes, this.mapCrime, this.afterMapCrimes);
            })
            .catch(error => { });
    }

    mapCrime(crime, callback) {
        /**
         * Map crime
         * @param crime Crime
         * @param callback Map callback
         * @returns None
         */
        if (!crime) {
            callback(null, null);
        } else {
            const HISTORICAL_WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?` +
                `lat=${crime.latitude}&` +
                `lon=${crime.longitude}&` +
                `exclude=current,minutely,hourly,alert&` +
                `units=imperial&` +
                `appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
            axios.get(HISTORICAL_WEATHER_URL)
                .then(result => callback(null, result))
                .catch(error => callback(error));
        }
    }

    afterMapCrimes(error, results) {
        /**
         * After map crimes
         * @param error Error mapping crimes
         * @param results Successful mapped crimes
         * @returns None
         */
        if (!error) {
            this.setState({
                objects: results.filter(result => result).map(result => this.newObject(result))
            });
        }
    }
}

export default CrimesSection;
