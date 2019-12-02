import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// GoogleApiWrapper is HOC
class MapContainer extends Component {
  

  render() {
    const mapStyles = {
      width: '80%',
      height: '80%',
    };
    return (
      <>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 37.7749, lng: -122.4194}}>
        <Marker position={{ lat: 37.7749, lng: -122.4194}} />

        </Map>
        

      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAy20xZaymj9nDt1RWZP2G2B2O7dmLT6P8'
})(MapContainer);
