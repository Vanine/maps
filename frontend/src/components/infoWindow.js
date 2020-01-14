import React from 'react';
import "./infowindowstyle.css"
export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgURL: this.props.point.img.data
        }
    }
    componentWillReceiveProps() {
        this.setState({
            imgURL: ''
        })
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
            <div  id='infoWindow' style={this.props.point.description ? {minWidth: '350px'} : {minWidth: '200px'}}>
             {this.props.point ? 
             (<React.Fragment>
               <div style={{fontSize: '95%', fontStyle: 'italic', fontWeight: '700'}}> 
                    {this.props.point.title}
               </div>
               {this.props.point.description ? <div style={{fontSize: '85%', textAlign: 'justify'}}> 
                    {this.props.point.description}
               </div> : null} <div>
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