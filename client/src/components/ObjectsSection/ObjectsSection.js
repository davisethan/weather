import React from 'react';
import axios from 'axios';
import stats from 'stats-lite';
import ObjectsSectionForm from './ObjectsSectionForm';
import ObjectsSectionTable from './ObjectsSectionTable';

class ObjectsSection extends React.Component {
    constructor(props) {
        /**
         * Object section
         * @param props Parent inherited state
         * @returns None
         */
        super(props);
        this.state = {
            header: '',
            objects: [],
            latitude: 0,
            longitude: 0
        };
        this.setHeader = this.setHeader.bind(this);
        this.latitudeInputChange = this.latitudeInputChange.bind(this);
        this.longitudeInputChange = this.longitudeInputChange.bind(this);
        this.coordinateFormSubmit = this.coordinateFormSubmit.bind(this);
        this.historicalWeatherURLSuccess = this.historicalWeatherURLSuccess.bind(this);
        this.newObject = this.newObject.bind(this);
        this.rowDelete = this.rowDelete.bind(this);
    }

    setHeader(header) {
        /**
         * Set state header
         * @param header New header
         * @returns None
         */
        this.setState({
            header: header
        });
    }

    latitudeInputChange(event) {
        /**
         * Latitude input change
         * @param event Latitude input change event
         * @returns None
         */
        this.setState({
            latitude: event.target.value
        });
    }

    longitudeInputChange(event) {
        /**
         * Longitude input change
         * @param event Longitude input change event
         * @retutns None
         */
        this.setState({
            longitude: event.target.value
        });
    }

    coordinateFormSubmit(event) {
        /**
         * Coordinate form submit
         * @param event Coordinate form submit event
         * @returns None
         */
        event.preventDefault();
        const HISTORICAL_WEATHER_URL = `https://api.openweathermap.org/data/2.5/onecall?` +
            `lat=${this.state.latitude}&` +
            `lon=${this.state.longitude}&` +
            `exclude=current,minutely,hourly,alert&` +
            `units=imperial&` +
            `appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
        axios.get(HISTORICAL_WEATHER_URL)
            .then(result => this.historicalWeatherURLSuccess(result))
            .catch(error => { });
    }

    historicalWeatherURLSuccess(result) {
        /**
         * Historical weather URL success
         * @param result Historical weather
         * @returns None
         */
        const objects = this.state.objects;
        objects.push(this.newObject(result));
        this.setState({
            objects: objects
        });
    }

    newObject(result) {
        /**
         * New object from historical weather
         * @param result Historical weather
         * @returns New object
         */
        return {
            latitude: result.data.lat,
            longitude: result.data.lon,
            lowTemperature: Math.min(...result.data.daily.map(day => day.temp.min)).toFixed(2),
            highTemperature: Math.max(...result.data.daily.map(day => day.temp.max)).toFixed(2),
            meanTemperature: stats.mean(result.data.daily.map(day => day.temp.day)).toFixed(2),
            medianTemperature: stats.median(result.data.daily.map(day => day.temp.day)).toFixed(2)
        };
    }

    rowDelete(event, rowIndex) {
        /**
         * Row delete
         * @param event Row delete event
         * @param rowIndex Row index
         * @returns None
         */
        event.preventDefault();
        const objects = this.state.objects.filter((object, index) => {
            return object ? rowIndex !== index : null;
        });
        this.setState({
            objects: objects
        });
    }

    render() {
        /**
         * Render objects section
         * @returns Crimes section React component
         */
        return (
            <div className="objects-section">
                <h2>{this.state.header}</h2>
                <ObjectsSectionForm
                    latitudeInputChange={this.latitudeInputChange}
                    longitudeInputChange={this.longitudeInputChange}
                    coordinateFormSubmit={this.coordinateFormSubmit} />
                <ObjectsSectionTable objects={this.state.objects} rowDelete={this.rowDelete} />
            </div>
        );
    }
}

export default ObjectsSection;
