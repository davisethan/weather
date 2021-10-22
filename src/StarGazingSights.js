import React from 'react';

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
    /**
     * Client-server model
     * 1. Request star gazing sights from teammate star gazing service
     * 2. Request historical weather statistics from API for each star gazing sight
     */
    // Fake data
    this.setState({
      starGazingSights: [
        { latitude: 50, longitude: 100, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 55, longitude: 110, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 60, longitude: 120, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 65, longitude: 130, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { latitude: 70, longitude: 140, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 }
      ]
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
    /**
     * Client-server model
     * 1. Request historical weather statistics for new latitude and longitude from API
     * 2. Add new historical weather statistics to star gazing sights state
     */
    // Fake data
    const starGazingSights = this.state.starGazingSights;
    starGazingSights.push({
      latitude: this.state.newLatitude,
      longitude: this.state.newLongitude,
      lowTemperature: 50,
      highTemperature: 50,
      meanTemperature: 50,
      medianTemperature: 50
    });
    this.setState({
      starGazingSights: starGazingSights
    });
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
