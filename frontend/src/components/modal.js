import { Modal, Button } from 'antd';
import React from 'react';
import SmallMap from './smallMap';
export default class ModalWithMap extends React.Component {
  state = {
    point: undefined,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  
  handleCancel = () => {
    this.setState({ visible: false, value: '' , point: undefined});
  };
  handleClick = (point) => {
    this.setState({point: point});
  };
  handleSelect = () => {
    this.props.handleSelect(this.state.point);
    this.setState({ visible: false, point: undefined});
  };
  render() {
    const { visible } = this.state;
    const modalStyle = {
      width: '50%',
      paddingLeft: '0%',
      paddingRigth: '0%'
    }
    const buttonStyle = {
      marginLeft: window.innerWidth > 575 ? '33.5%' : '0%',
      marginBottom: '20px'
    }
    return (
      <span>
        <Button type='ghost' onClick={this.showModal} style={buttonStyle}>
          Find a place
        </Button>
        <Modal
        width= {window.innerWidth > 575 ? '60%' : '100%'}
        style={modalStyle}
          visible={visible}
          title="Map"
          onOk={this.handleSelect}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type='primary' onClick={this.handleSelect}>
              Ok
            </Button>
          ]}
        >
          <div style={{display: 'flex'}}>
           <div style={{width: '48%', marginLeft: '2%'}}>
           Latitude: {this.state.point ? this.state.point.lat : ""} 
           </div>
           <div style={{width: '48%', marginLeft: '2%'}}>
           Longitude: {this.state.point ? this.state.point.lng : ""}
           </div>  
          </div> 
          <SmallMap handleClick={this.handleClick} isVisible={this.state.visible && this.state.point} />
        </Modal>
      </span>
    );
  }
}

