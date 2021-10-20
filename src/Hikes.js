import React from 'react';

class Hikes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hikes: [],
      newLatitude: 0,
      newLongitude: 0
    };

    this.handleNewLatitudeChange = this.handleNewLatitudeChange.bind(this);
    this.handleNewLongitudeChange = this.handleNewLongitudeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    /**
     * Client-server model
     * 1. Request hikes from teammate hikes service
     * 2. Request historical weather statistics from API for each hike
     */

    // Fake data
    this.setState({
      hikes: [
        { name: "Hike #1", latitude: 0, longitude: 0, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { name: "Hike #2", latitude: 5, longitude: 10, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { name: "Hike #3", latitude: 10, longitude: 20, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { name: "Hike #4", latitude: 15, longitude: 30, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 },
        { name: "Hike #5", latitude: 20, longitude: 40, lowTemperature: 50, highTemperature: 50, meanTemperature: 50, medianTemperature: 50 }
      ]
    });
  }

  handleNewLatitudeChange(event){
    this.setState({
      newLatitude: event.target.value
    });
  }

  handleNewLongitudeChange(event){
    this.setState({
      newLongitude: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    /**
     * Client-server model
     * 1. Request historical weather statistics for new latitude and longitude from API
     * 2. Add new historical weather statistics to hikes state
     */
    // Fake data
    const hikes = this.state.hikes;
    hikes.push({
      name: `Hike #${this.state.newLatitude}+${this.state.newLongitude}`,
      lowTemperature: 50,
      highTemperature: 50,
      meanTemperature: 50,
      medianTemperature: 50
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
              <th>Name</th>
              <th>Low Temperature</th>
              <th>High Temperature</th>
              <th>Mean Temperature</th>
              <th>Median Temperature</th>
            </tr>
          </thead>
          <tbody>
            {this.state.hikes.map((hike, index) => {
              return (
                <tr key={`hikes-${index}`}>
                  <td>{hike.name}</td>
                  <td>{hike.lowTemperature}</td>
                  <td>{hike.highTemperature}</td>
                  <td>{hike.meanTemperature}</td>
                  <td>{hike.medianTemperature}</td>
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
