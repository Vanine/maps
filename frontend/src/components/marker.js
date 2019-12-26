import React from 'react';

export default class Marker extends React.Component {
    render() {
        return (
        <div style={{
        background: 'red',
        padding: '10px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
      }}>
      </div>
        )
    }
}