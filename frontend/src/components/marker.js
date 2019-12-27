import React from 'react';

export default class Marker extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.point)
  }
    render() {
        return (
        <div onClick={this.handleClick} style={{
        background: 'red',
        padding: '10px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)',
        opacity: this.props.visible ? 1 : 0
      }}>
      </div>
        )
    }
}