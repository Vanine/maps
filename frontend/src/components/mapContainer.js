import React from 'react';
import { connect } from "react-redux";
import { addPoint } from '../actions/addpoint';
import { setPoints } from '../actions/setpoints';
import GoogleMap from 'google-map-react';

import '../App.css';

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
  .catch(error => console.log('error:', error)); 
}
componentDidUpdate() {
  console.log("componentDidUpdate");
}

displayMarkers = () => {
      let arr = this.props.points.map((point, index) => {
        return ({lat: point.latitude, lng: point.longitude})
      });
      console.log(arr);
      return {
        positions: arr,
        options: {
          radius: 20,
          maxIntensity: 3,
          opacity: 0.9
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
      <div style={mapStyle}>
      <GoogleMap
      bootstrapURLKeys={{key: 'AIzaSyCR1rxt8xnpURsVA3bDm8eukPy4EmW9icQ'}}
      zoom={1}
      center={{ lat: 4, lng: 5}}
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
      {/* {this.displayMarkers()} */}
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
}))(MapContainer)
