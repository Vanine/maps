import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
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
     axios.get('/problems')
    .then(response => {
      this.props.setPoints({points: response.data.points})
    }).catch(error => {throw error});
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
        lat: point.latitude,
        lng: point.longitude,
        point: point
      })
    }
    else {
      this.setState({
        visible: !this.state.visible
      })
    }
};

showInfowindow = () => {
  if(this.state.visible && this.state.point) {
    return (
      <InfoWindow lat={this.state.lat} lng={this.state.lng} point={this.state.point}/> 
    )
  }
  else return null;
}
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
        {this.showInfowindow()} 
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
