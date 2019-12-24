import { Modal, Button } from 'antd';
import React from 'react';
import GoogleMap1 from './googleMap';
export default class Modal1 extends React.Component {
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
    return (
      <div>
        <Button style={{marginLeft: '33.5%', marginBottom: '20px'}} type='ghost' onClick={this.showModal}>
          Find a place
        </Button>
        <Modal
        width='60%'
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
          {this.state.point ? 
          <div>
           <div>
           Latitude: {this.state.point.lat} 
           </div>
           <div>
           Longitude: {this.state.point.lng}
           </div>  
          </div> : null
        }
          
          <GoogleMap1 handleClick={this.handleClick}/>
        </Modal>
      </div>
    );
  }
}

