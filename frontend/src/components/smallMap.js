import React from 'react';
import GoogleMap from 'google-map-react';
import Marker from './marker';

export default class SmallMap extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       point: undefined,
     }
   }
    handleClick = (e) => {
        let point = {
            lat: e['lat'],
            lng: e['lng']
        };
        this.props.handleClick(point);
        this.setState({
          point: point,
        })
    }
    setMarker = () => {
      if(this.state.point && this.props.isVisible) {
        return (<Marker visible={true}
          lat={this.state.point.lat} 
          lng={this.state.point.lng} />)
      }
      else return null;
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
        {this.setMarker()}
      </GoogleMap>
      </div>
    )
  }
}


