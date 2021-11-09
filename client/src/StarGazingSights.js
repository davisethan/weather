import React from 'react';
import async from 'async';
import axios from 'axios';
import stats from 'stats-lite';

const API_KEY = '92bd8db205c74ef3dfbe55b1a2fb71f6';

class StarGazingSights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starGazingSights: [],
      newLatitude: 0,
      newLongitude: 0
    };

    this.handleNewLatitudeChange = this.handleNewLatitudeChange.bind(this);
    this.handleNewLongitudeChange = this.handleNewLongitudeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const STARGAZING_URL = 'http://localhost:5000/top5';
    axios.get(STARGAZING_URL)
      .then(result => {
        const sights = result.data;
        // Get historical weather data
        async.map(sights, (item, callback) => {
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
            starGazingSights: results.map(result => {
              if(!result){
                return null;
              }else{
                return {
                  latitude: result.data.lat,
                  longitude: result.data.lon,
                  lowTemperature: Math.min(...result.data.daily.map(day => day.temp.min)),
                  highTemperature: Math.max(...result.data.daily.map(day => day.temp.max)),
                  meanTemperature: stats.mean(result.data.daily.map(day => day.temp.day)),
                  medianTemperature: stats.median(result.data.daily.map(day => day.temp.day))
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
        const starGazingSights = this.state.starGazingSights;
        starGazingSights.push({
          latitude: result.data.lat,
          longitude: result.data.lon,
          lowTemperature: Math.min(...result.data.daily.map(day => day.temp.min)),
          highTemperature: Math.max(...result.data.daily.map(day => day.temp.max)),
          meanTemperature: stats.mean(result.data.daily.map(day => day.temp.day)),
          medianTemperature: stats.median(result.data.daily.map(day => day.temp.day))
        });
        this.setState({
          starGazingSights: starGazingSights
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleDelete(event, deleteIndex) {
    event.preventDefault();
    const starGazingSights = this.state.starGazingSights.filter((starGazingSight, index) => {
      return starGazingSight ? deleteIndex !== index : null;
    });
    this.setState({
      starGazingSights: starGazingSights
    });
  }

  render() {
    return (
      <div className="star-gazing-sights">
        {/** Header */}
        <h2>Best Star Gazing Sights Historical Weather Statistics</h2>

        {/** New star gazing sight form */}
        <form className="form-inline">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" className="form-control" id="latitude" onChange={this.handleNewLatitudeChange} />
          <label htmlFor="longitude">Longitude</label>
          <input type="number" className="form-control" id="longitude" onChange={this.handleNewLongitudeChange} />
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
        </form>

        {/** Star gazing sights historical weather statistics table */}
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
            {this.state.starGazingSights.map((starGazingSight, index) => {
              return (
                <tr key={`star-gazing-sights-${index}`}>
                  <td>{starGazingSight.latitude}</td>
                  <td>{starGazingSight.longitude}</td>
                  <td>{starGazingSight.lowTemperature}</td>
                  <td>{starGazingSight.highTemperature}</td>
                  <td>{starGazingSight.meanTemperature}</td>
                  <td>{starGazingSight.medianTemperature}</td>
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

export default StarGazingSights;
