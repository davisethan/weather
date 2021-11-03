import React from 'react';

class SightseeingSights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sightseeingSights: [],
      newLatitude: 0,
      newLongitude: 0
    };

    this.handleNewLatitudeChange = this.handleNewLatitudeChange.bind(this);
    this.handleNewLongitudeChange = this.handleNewLongitudeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    /**
     * Client-server model
     * 1. Request sightseeing sights from teammate sightseeing sights service
     * 2. Request historical weather statistics from API for each sightseeing sight
     */
    // Fake data
    this.setState({
      sightseeingSights: [
        { latitude: 25, longitude: 50, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 30, longitude: 60, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 35, longitude: 70, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 40, longitude: 80, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 45, longitude: 90, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 }
      ]
    });
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
    /**
     * Client-server model
     * 1. Request historical weather statistics for new latitude and longitude from API
     * 2. Add new historical weather statistics to sightseeing sight state
     */
    // Fake data
    const sightseeingSights = this.state.sightseeingSights;
    sightseeingSights.push({
      latitude: this.state.newLatitude,
      longitude: this.state.newLongitude,
      lowTemperature: 50,
      highTemperature: 50,
      meanTemperature: 50,
      medianTemperature: 50
    });
    this.setState({
      sightseeingSights: sightseeingSights
    });
  }

  handleDelete(event, deleteIndex) {
    event.preventDefault();
    const sightseeingSights = this.state.sightseeingSights.filter((sightseeingSight, index) => {
      return sightseeingSight ? deleteIndex !== index : null;
    });
    this.setState({
      sightseeingSights: sightseeingSights
    });
  }

  render() {
    return (
      <div className="sightseeing-sights">
        {/** Header */}
        <h2>Best Sightseeing Sights Historical Weather Statistics</h2>

        {/** New sightseeing sight form */}
        <form className="form-inline">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" className="form-control" id="latitude" onChange={this.handleNewLatitudeChange} />
          <label htmlFor="longitude">Longitude</label>
          <input type="number" className="form-control" id="longitude" onChange={this.handleNewLongitudeChange} />
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Search</button>
        </form>

        {/** Sightseeing sights historical weather statistics table */}
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
            {this.state.sightseeingSights.map((sightseeingSight, index) => {
              return (
                <tr key={`sightseeing-sight-${index}`}>
                  <td>{sightseeingSight.latitude}</td>
                  <td>{sightseeingSight.longitude}</td>
                  <td>{sightseeingSight.lowTemperature}</td>
                  <td>{sightseeingSight.highTemperature}</td>
                  <td>{sightseeingSight.meanTemperature}</td>
                  <td>{sightseeingSight.medianTemperature}</td>
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

export default SightseeingSights;
