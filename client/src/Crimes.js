import React from 'react';
import async from 'async';
import axios from 'axios';
import stats from 'stats-lite';

const API_KEY = '92bd8db205c74ef3dfbe55b1a2fb71f6';

class Crimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crimes: [],
      newLatitude: 0,
      newLongitude: 0
    };

    this.handleNewLatitudeChange = this.handleNewLatitudeChange.bind(this);
    this.handleNewLongitudeChange = this.handleNewLongitudeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const CRIMES_URL = 'http://localhost:2000/api/top5';
    axios.get(CRIMES_URL)
      .then(result => {
        const crimes = result.data;
        // Get historical weather data
        async.map(crimes, (item, callback) => {
          if(!item){
            callback(null,null);
            return;
          }
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
            crimes: results.map(result => {
              if(!result){
                return null;
              }else{
                return {
                  latitude: result.data.lat,
                  longitude: result.data.lon,
                  lowTemperature: Math.min(...result.data.daily.map(day => day.temp.min)).toFixed(2),
                  highTemperature: Math.max(...result.data.daily.map(day => day.temp.max)).toFixed(2),
                  meanTemperature: stats.mean(result.data.daily.map(day => day.temp.day)).toFixed(2),
                  medianTemperature: stats.median(result.data.daily.map(day => day.temp.day)).toFixed(2)
                };
              }
            }).filter(result => result)
          })
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
        const crimes = this.state.crimes;
        crimes.push({
          latitude: result.data.lat,
          longitude: result.data.lon,
          lowTemperature: Math.min(...result.data.daily.map(day => day.temp.min)).toFixed(2),
          highTemperature: Math.max(...result.data.daily.map(day => day.temp.max)).toFixed(2),
          meanTemperature: stats.mean(result.data.daily.map(day => day.temp.day)).toFixed(2),
          medianTemperature: stats.median(result.data.daily.map(day => day.temp.day)).toFixed(2)
        });
        this.setState({
          crimes: crimes
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleDelete(event, deleteIndex) {
    event.preventDefault();
    const crimes = this.state.crimes.filter((crime, index) => {
      return crime ? deleteIndex !== index : null;
    });
    this.setState({
      crimes: crimes
    });
  }

  render() {
    return (
      <div className="crime-sights">
        {/** Header */}
        <h2>Worst Oregon Cities by Crime Historical Weather Statistics</h2>

        {/** New crime form */}
        <form className="form-inline">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" className="form-control" id="latitude" onChange={this.handleNewLatitudeChange} />
          <label htmlFor="longitude">Longitude</label>
          <input type="number" className="form-control" id="longitude" onChange={this.handleNewLongitudeChange} />
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
        </form>

        {/** Crimes historical weather statistics table */}
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
            {this.state.crimes.map((crime, index) => {
              return (
                <tr key={`crime-${index}`}>
                  <td>{crime.latitude}</td>
                  <td>{crime.longitude}</td>
                  <td>{crime.lowTemperature}</td>
                  <td>{crime.highTemperature}</td>
                  <td>{crime.meanTemperature}</td>
                  <td>{crime.medianTemperature}</td>
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

export default Crimes;
