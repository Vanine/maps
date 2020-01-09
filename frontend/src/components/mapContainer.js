import React from 'react';
import { connect } from "react-redux";
import { addPoint } from '../actions/addpoint';
import { setPoints } from '../actions/setpoints';
import GoogleMap from 'google-map-react';
import {Select} from 'antd';
import '../App.css';
import TabBarWithRouter from './tabBar';
import Marker from './marker';
import InfoWindow from './infoWindow';
const { Option } = Select;

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleFetch();
    this.state = {
      selectedCategory: undefined,
      visible: false,
      lat: undefined,
      lng: undefined,
      point: undefined
    }
  }
  handleFetch = () => {
    fetch(`http://${process.env.HOST || "localhost"}:${process.env.PORT || 3001}/problems`,  {
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
handleChange = (value) => {
  this.setState({
    selectedCategory: value,
    point: undefined,
    visible: false,
    lat: undefined,
    lng: undefined,
  })
};
handleClick = (point) => {
  if(this.state.point !== point) {
    this.setState({
      visible: true,
      lat: point ? point.latitude : 0,
      lng: point ? point.longitude : 0,
      point: point ? point : undefined
    })
  }
  else {
    this.setState({
      visible: !this.state.visible,
      lat: point ? point.latitude : 0,
      lng: point ? point.longitude : 0,
      point: point ? point : undefined
    })
  }
};
handleClickOnMap = (value) => {
  this.setState({
    point: undefined,
    visible: false,
    lat: undefined,
    lng: undefined,
  })
}
displayMarkers = () => {
  let arr = [];
      if(!this.state.selectedCategory) {
        for(let i = 0; i < this.props.points.length; i++) {
            arr.push({lat: this.props.points[i].latitude, lng: this.props.points[i].longitude});
      }
    }
      else {
        for(let i = 0; i < this.props.points.length; i++) {
          if(this.props.points[i].category === this.state.selectedCategory) {
            arr.push({lat: this.props.points[i].latitude, lng: this.props.points[i].longitude});
          }
        }
      }
      return {
        positions: arr,
        options: {
          radius: 20,
          maxIntensity: 3,
          opacity: 0.9,
        }
      }
  }
  setMarkers = () => {
    if(!this.state.selectedCategory) {
      return (this.props.points.map((point, index) => {
        return <Marker visible={false} key={index+1} lat={point.latitude} lng={point.longitude} onClick={this.handleClick} point={point}/>
      }))
  }
    else {
      for(let i = 0; i < this.props.points.length; i++) {
        return (this.props.points.map((point, index) => {
          if(point.category === this.state.selectedCategory) {
            return <Marker key={index+1} lat={point.latitude} lng={point.longitude} visible={false} point={point} onClick={this.handleClick}/>
          }
        }))
      }
    }
  }
  render() {
    const mapStyle = {
      marginTop: '20px',
      width: '100%',
      height: `${window.innerHeight*0.8}px`,
      paddingLeft: '2%',
      paddingRight: '2%',
    };
    
    return (   
      <div style={{overflowY: 'auto'}}>     
        <TabBarWithRouter />
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
       <div>
         Filter by category:
       </div>
        <Select style={{ width: '20%', marginLeft: '10px' }} onChange={this.handleChange}>
                 <Option value="0">Garbage disposal is not done on time</Option>
                 <Option value="1">Trash has no lid</Option>
                 <Option value="2">Trash is placed in the wrong place</Option>
        </Select>
      </div>
      
      <div style={mapStyle}>
      <GoogleMap
      bootstrapURLKeys={{key: 'AIzaSyDPz11ka9meqi4YSy2gSSQEL3ZAWadNntg'}}
      zoom={15}
      center={{lat: 40.807400, lng: 44.497028}}
      margin={[100, 100, 100, 200]}
      passive={true}
      heatmapLibrary={true} 
      onClick={this.handleClickOnMap}         
      heatmap={this.displayMarkers()}
      yesIWantToUseGoogleMapApiInternals
      defaultOptions={{
        disableDefaultUI: true,
        keyboardShortcuts: false, 
        scaleControl: true, 
      }}
      >
        <InfoWindow visible={this.state.visible} lat={this.state.lat || 40} lng={this.state.lng || 40} point={this.state.point}/>
        {this.setMarkers()}
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
