import React from 'react';
import './marker.css';
class CustomMarker extends React.Component {
    render() {
        let green_blue = 0;
        let width_heigth = 18;
        let frequency = this.props.frequency;
        if(frequency <= 9) {
            green_blue = 256 - frequency*26;                
        }
        if(frequency < 15) {
            width_heigth += 2 * frequency;
        }
        else {
            width_heigth = 50
        }
        return (
            <div className="marker"
            style={{ backgroundColor: `rgb(255,${green_blue}, 
                ${green_blue})`, 
                cursor: 'pointer', 
                width: `${width_heigth}px`,
                height: `${width_heigth}px`
            }}
        />)
    }
}

export default CustomMarker;