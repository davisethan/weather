import async from 'async';
import axios from 'axios';
import ObjectSection from './ObjectsSection';

class SightseeingSection extends ObjectSection {
    constructor(props) {
        /**
         * Sightseeing section
         * @param props Parent inherited state
         * @returns None
         */
        super(props);
        this.mapSight = this.mapSight.bind(this);
        this.afterMapSights = this.afterMapSights.bind(this);
    }

    componentDidMount() {
        /**
         * Sightseeing section React component did mount set state
         * @returns None
         */
        this.setHeader('Best Oregon Sightseeing Historical Weather');
        const DOWNTOWN_PORTLAND_ZIPCODE = 97201;
        axios.post(process.env.REACT_APP_SIGHTSEEING_URL, { zipCode: DOWNTOWN_PORTLAND_ZIPCODE })
        .then(result => {
            const sights = result.data;
            async.map(sights, this.mapSight, this.afterMapSights);
        })
        .catch(error => {console.log(error)});
    }

    mapSight(sight, callback){
        /**
         * Map sight to historical weather
         * @param sight Sight
         * @param callback Map callback
         * @returns None
         */
        if(!sight){
            callback(null, null);
        }else{
            const HISTORICAL_WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${sight.latitude}&lon=${sight.longitude}&exclude=current,minutely,hourly,alert&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
            axios.get(HISTORICAL_WEATHER_URL)
            .then(result => callback(null, result))
            .catch(error => callback(error));
        }
    }

    afterMapSights(error, results){
        /**
         * After map sights to historical weather
         * @param error Error mapping sights to historical weather
         * @param results Mapped sights to historical weather
         * @returns None
         */
        if(!error){
            this.setState({
                objects: results.filter(result => result).map(result => this.newObject(result))
            });
        }
    }
}

export default SightseeingSection;
