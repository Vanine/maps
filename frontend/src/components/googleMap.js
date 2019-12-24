import React from 'react';
import GoogleMap from 'google-map-react';



export default class GoogleMap1 extends React.Component {
    handleClick = (e) => {
        // let latitude = e.latLng.lat();
        // let longtitude  = e.latLng.lng();
        let point = {
            lat: e['lat'],
            lng: e['lng']
        };
        this.props.handleClick(point);
    }
  render() {
    const mapStyle = {
      paddingTop: '20px',
      width: '100%',
      height: '70vh',
      paddingLeft: '20px',
      paddingRight: '20px',
    };
    
    return (   
      <div style={mapStyle}>
      <GoogleMap
      onClick = {this.handleClick}
      bootstrapURLKeys={{key: 'AIzaSyDPz11ka9meqi4YSy2gSSQEL3ZAWadNntg'}}
      zoom={15}
      center={{ lat: 40.807400, lng: 44.497028}}
      margin={[100, 100, 100, 200]}
      passive={true}
      yesIWantToUseGoogleMapApiInternals
      defaultOptions={{
        disableDefaultUI: true,
        keyboardShortcuts: false, 
        scaleControl: true, 
      }}
      >
      </GoogleMap>
      </div>
    )
  }
}


