import React from 'react';
import async from 'async';
import axios from 'axios';
import stats from 'stats-lite';

const API_KEY = '92bd8db205c74ef3dfbe55b1a2fb71f6';

class Hikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hikes: [],
      newLatitude: 0,
      newLongitude: 0
    };

    this.handleNewLatitudeChange = this.handleNewLatitudeChange.bind(this);
    this.handleNewLongitudeChange = this.handleNewLongitudeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const HIKE_URL = 'http://localhost:3000/retrieve?topFive=yes';
    axios.get(HIKE_URL)
      .then(result => {
        const hikes = result.data;
        // Convert zipcodes to latitude/longitude
        async.map(hikes, (item, callback) => {
          const GEO_URL = `http://api.openweathermap.org/geo/1.0/zip?zip=${item.zipcode},us&appid=${API_KEY}`;
          axios.get(GEO_URL)
            .then(result => {
              callback(null, {
                latitude: result.data.lat,
                longitude: result.data.lon
              })
            })
            .catch(error => {
              callback(error)
            })
        }, (error, results) => {
          if(error){
            console.log(error);
            return;
          }
          // Get historical weather data
          async.map(results, (item, callback) => {
            const HISTORY_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${item.latitude}&lon=${item.longitude}&exclude=current,minutely,hourly,alert&units=imperial&appid=${API_KEY}`;
            axios.get(HISTORY_URL)
              .then(result => {
                callback(null, result)
              })
              .catch(error => {
                callback(error)
              })
          }, (error, results) => {
            if(error){
              console.log(error);
              return;
            }
            // Set state
            this.setState({
              hikes: results.map(result => {
                return {
                  latitude: result.data.lat,
                  longitude: result.data.lon,
                  lowTemperature: Math.min(...result.data.daily.map(day => day.temp.min)),
                  highTemperature: Math.max(...result.data.daily.map(day => day.temp.max)),
                  meanTemperature: stats.mean(result.data.daily.map(day => day.temp.day)),
                  medianTemperature: stats.median(result.data.daily.map(day => day.temp.day))
                };
              })
            })
          });
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleNewLatitudeChange(event) {
    this.setState({
      newLatitude: event.target.value
    });
  }

  handleNewLongitudeChange(event) {
    this.setState({
      newLongitude: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const HISTORY_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.newLatitude}&lon=${this.state.newLongitude}&exclude=current,minutely,hourly,alert&units=imperial&appid=${API_KEY}`;
    axios.get(HISTORY_URL)
      .then(result => {
        const hikes = this.state.hikes;
        hikes.push({
          latitude: result.data.lat,
          longitude: result.data.lon,
          lowTemperature: Math.min(...result.data.daily.map(day => day.temp.min)),
          highTemperature: Math.max(...result.data.daily.map(day => day.temp.max)),
          meanTemperature: stats.mean(result.data.daily.map(day => day.temp.day)),
          medianTemperature: stats.median(result.data.daily.map(day => day.temp.day))
        });
        this.setState({
          hikes: hikes
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleDelete(event, deleteIndex) {
    event.preventDefault();
    const hikes = this.state.hikes.filter((hike, index) => {
      return hike ? deleteIndex !== index : null;
    });
    this.setState({
      hikes: hikes
    });
  }

  render() {
    return (
      <div className="hikes">
        {/** Header */}
        <h2>Best Hikes Historical Weather Statistics</h2>

        {/** New hike form */}
        <form className="form-inline">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" className="form-control" id="latitude" onChange={this.handleNewLatitudeChange} />
          <label htmlFor="longitude">Longitude</label>
          <input type="number" className="form-control" id="longitude" onChange={this.handleNewLongitudeChange} />
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
        </form>

        {/** Hikes historical weather statistics table */}
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Low Temperature</th>
              <th>High Temperature</th>
              <th>Mean Temperature</th>
              <th>Median Temperature</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.hikes.map((hike, index) => {
              return (
                <tr key={`hikes-${index}`}>
                  <td>{hike.latitude}</td>
                  <td>{hike.longitude}</td>
                  <td>{hike.lowTemperature}</td>
                  <td>{hike.highTemperature}</td>
                  <td>{hike.meanTemperature}</td>
                  <td>{hike.medianTemperature}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown">Delete</button>
                      <div className="dropdown-menu">
                        <button type="button" className="btn dropdown-item" onClick={(event) => {
                          this.handleDelete(event, index);
                        }}>Confirm</button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Hikes;
