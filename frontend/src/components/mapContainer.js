import React from 'react';
import CustomMarker from './marker';
import { connect } from "react-redux";
import { addPoint } from '../actions/addpoint';
import { setPoints } from '../actions/setpoints';
import { updatePoint } from '../actions/updatepoint';
import GoogleMap from 'google-map-react';

import '../App.css';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
    this.handleFetch();
  }
  
  handleFetch = () => {
    fetch("http://localhost:3001/points",  {
      method: 'GET',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
  }).then(response => response.json())
  .then(response => {
    this.props.setPoints({points: response.points});
  })
  .catch(error => console.log('error:', error)); 
}
componentDidUpdate() {
  this.displayMarkers();
}

displayMarkers = () => {
    return this.props.points.map((point, index) => {
    return  <CustomMarker
    lat={point.latitude}
    lng={point.longitude}
    frequency={point.frequency}
    text="My Marker"
  />})}
  render() {
    const mapStyle = {
      paddingTop: '20px',
      width: '100%',
      height: '100vh',
      paddingLeft: '20px',
      paddingRight: '20px',
    };
    
    return (
      <div style={mapStyle}>
      <GoogleMap
      bootstrapURLKeys={{key: 'AIzaSyDPz11ka9meqi4YSy2gSSQEL3ZAWadNntg', v: '3.32',}}
      zoom={1}
      center={{ lat: 4, lng: 5}}
      margin={[100, 100, 100, 200]}
      passive={true}
      yesIWantToUseGoogleMapApiInternals
      defaultOptions={{
        disableDefaultUI: true,
        keyboardShortcuts: false, 
        scaleControl: true, 
      }}
      >
      {this.displayMarkers()}
      </GoogleMap>
      </div>
     
    )
  }
}

export default connect(
  state => ({
    points: state.points,
    }),
  dispatch => ({
    addPoint: (data => {
      dispatch(addPoint(data))
    }),
    setPoints: ((data) => {
      dispatch(setPoints(data))
    }),
    updatePoint: ((data) => {
      dispatch(updatePoint(data))
    }),
}))(MapContainer)
