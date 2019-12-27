import React from 'react';
import "./infowindowstyle.css"
export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
    }
    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    componentWillReceiveProps() {
        this.setState({
            width: document.getElementById('infoWindow').clientWidth,
            height: document.getElementById('infoWindow').clientHeight
        })
    }
    render() {
        return (
            <div  id='infoWindow' style={{display : this.props.visible ? 'inherit' : 'none'}}>
             {this.props.point ? 
             (<React.Fragment>
               <div>
                    {this.props.point.category === '0' ? "Garbage disposal isn't done on time" : this.props.point.category === '1' ?
                    "Trash has no lid" : this.props.point.category === '2' ? "Trash is placed in the wrong place" : ""}
               </div>
               <div>
                    Latitude: {this.props.point.latitude}
               </div>
               <div>
                    Longitude: {this.props.point.longitude}
               </div>
               <div>
                  {this.props.point && this.props.point.img.data.length > 0 ? <img style={{height: '80px', width: '100px', marginTop: '5px'}} 
                  src={`data:image/jpeg;base64, ${this.arrayBufferToBase64(this.props.point.img.data[0].data)}`} 
                  alt='Helpful alt text'/> : null} 
               </div>
             </React.Fragment>
             ) : null }  
            </div>
        )
    }
}