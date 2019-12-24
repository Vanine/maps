import React from 'react';
import { connect } from "react-redux";
import { addPoint } from '../actions/addpoint';
import { setPoints } from '../actions/setpoints';
import GoogleMap from 'google-map-react';

import '../App.css';
import TabBarWithRouter from './tabBar';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
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
  .catch(error => {throw error}); 
}

displayMarkers = () => {
      let arr = this.props.points.map((point, index) => {
        return ({lat: point.latitude, lng: point.longitude})
      });
      return {
        positions: arr,
        options: {
          radius: 20,
          maxIntensity: 3,
          opacity: 0.9,
        }
      }
  }

  const 
  render() {
    const mapStyle = {
      paddingTop: '20px',
      width: '100%',
      height: '100vh',
      paddingLeft: '20px',
      paddingRight: '20px',
    };
    
    return (   
      <div>     
        <TabBarWithRouter />
      <div style={mapStyle}>
      <GoogleMap
      bootstrapURLKeys={{key: 'AIzaSyDPz11ka9meqi4YSy2gSSQEL3ZAWadNntg'}}
      zoom={15}
      center={{ lat: 40.807400, lng: 44.497028}}
      margin={[100, 100, 100, 200]}
      passive={true}
      heatmapLibrary={true}          
      heatmap={this.displayMarkers()}
      yesIWantToUseGoogleMapApiInternals
      defaultOptions={{
        disableDefaultUI: true,
        keyboardShortcuts: false, 
        scaleControl: true, 
      }}
      >
      </GoogleMap>
      </div>
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
}))(MapContainer)
