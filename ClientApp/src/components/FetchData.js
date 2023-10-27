import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { cars: [], locations: [], loading: true };
  }

  componentDidMount() {
    this.populateCarsData();
    this.populateLocationsData();
  }

  static renderCarsTable(cars) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Model</th>
            <th>RegistrationNo</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car =>
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.modelName}</td>
              <td>{car.registrationNo}</td>
              <td>{car.pricePerDay}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  static renderLocationsTable(locations) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location =>
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>{location.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contentsCars = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderCarsTable(this.state.cars);

    let contentsLocations = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderLocationsTable(this.state.locations);

    return (
      <div>
        <h1 id="tabelLabel" >Cars data</h1>
        {contentsCars}
        <br />
        <h1 id="tabelLabel" >Locations</h1>
        {contentsLocations}
      </div>
    );
  }

  async populateCarsData() {
    const response = await fetch('https://localhost:7292/api/cars');
    const data = await response.json();
    this.setState({ cars: data, loading: false });
  }

  async populateLocationsData() {
    const response = await fetch('https://localhost:7292/api/locations');
    const data = await response.json();
    this.setState({ locations: data, loading: false });
  }
}
