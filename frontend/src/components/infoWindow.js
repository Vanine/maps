import React from 'react';
import "./infowindowstyle.css"
export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgURL: this.props.point.img.data
        }
    }
    componentDidUpdate() {
        if(this.props.point && this.props.point.img.data != this.state.imgURL) {
            this.setState({
                imgURL: this.props.point.img.data
            })
        }
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
                  {this.props.point && this.props.point.img && this.props.point.img.data ? <img style={{height: '80px', width: '100px', marginTop: '5px'}} 
                  src={`${this.state.imgURL}`} 
                  alt='Helpful alt text'/> : null} 
               </div>
             </React.Fragment>
             ) : null }  
            </div>
        )
    }
}