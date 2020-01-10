import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Form, Input, Button, Select, InputNumber, message, Icon } from 'antd';
import { connect } from "react-redux";
import { addPoint } from '../actions/addpoint';
import { setPoints } from '../actions/setpoints';
import FormItem from 'antd/lib/form/FormItem';
import TabBar from './tabBar';
import {withRouter} from 'react-router-dom';
import ModalWithMap from './modal';
import Dropzone from 'react-dropzone';
import {useDropzone} from 'react-dropzone';
const { Option } = Select;
const { TextArea } = Input;

class AddProblemForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedFiles: [],
      point: undefined,
    };
    constructor(props) {
      super(props);
      this.fileInput = React.createRef();
    }
    onChangeHandler = event => {
        this.setState({
          selectedFiles: [...this.state.selectedFiles, event.target.files[0]],
          loaded: 0,
        })
    }
    onDrop = (files) => {
        this.setState({
          selectedFiles: [...this.state.selectedFiles, ...files],
          loaded: 0,
        })
    }
    handleSelect = (point) => {
      if(point) {
        this.setState({point: point});
        this.props.form.setFieldsValue({
          'latitude': Number(point.lat),
          'longitude':  Number(point.lng),
      });
      }
    }
   Basic(props) {
      const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
      
      const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
    
      return (
        <section className="container">
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
      );
    }
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data = new FormData()
          if(this.state.selectedFiles) {
            for(let x = 0; x < this.state.selectedFiles.length; x++) {
                data.append('files', this.state.selectedFiles[x])
            }         
         }
          const newProblem = {
            category: values.category,
            longitude: values.longitude,
            latitude: values.latitude,
            description: values.description,
            image: data
        };  
        fetch(`/add_problem`, {
            method: 'POST',
            body: JSON.stringify(newProblem),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
        }).then(response => response.json())
        .then(resp => {
          if(this.state.selectedFiles) {
            axios({
              method: 'post',
              url: `/upload_file/${resp.id}`,
              data: data,
            }).then(() => this.setState({selectedFiles: []}))
          }
      })
        .then(() => {
          this.setState({selectedFiles: []});
          this.props.addPoint(newProblem);
          this.props.form.resetFields();
          message.info("Problem added");
      })
        .catch(error => {message.error("Something went wrong")});
      }
      })};

    handleChange = (value) => {
    };

    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    render() {
      const { getFieldDecorator } = this.props.form;
      const formStyle = {
          marginLeft: '24%',
          marginTop: '1%',
          width: '40%'
      }
      const dropzoneStyle = {
        width  : "100%",
        height : "20%",
        border : "1px solid black",
        marginLeft : '30%'
    };
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
       return (
         <div style={{overflowY: 'auto'}}>
        <TabBar />
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='form' style={formStyle}>
             <Form.Item label={<span>Category</span>}>
             {getFieldDecorator('category', {
                initialValue: '0'
            })(<Select style={{ width: '100%' }} onChange={this.handleChange}>
                <Option value="0">Garbage disposal isn't done on time</Option>
                <Option value="1">Trash has no lid</Option>
                <Option value="2">Trash is placed in the wrong place</Option>
            </Select>)}
          </Form.Item>
          <ModalWithMap handleSelect={this.handleSelect}/>
          <Form.Item label="Latitude">
            {getFieldDecorator('latitude', {
              rules: [
                {
                  validator(rule, value, callback) {
                    if(!value) {
                      callback('Latitude is required');
                      return;
                    }
                    if(value > 85 || value < -85) {
                      callback('Invalid value!');
                      return;
                    }
                    if(typeof(value) != 'number') {
                      callback('Latitude is not a number');
                      return;
                    }
                    else {
                      callback();
                    }
                  } 
                },
              ],
            })(<InputNumber style={{width: '100%'}} />)}
          </Form.Item>
          <Form.Item label="Longitude">
            {getFieldDecorator('longitude', {
              rules: [
                {
                  validator(rule, value, callback) {
                    if(!value) {
                      callback('Longitude is required');
                      return;
                    }
                    if(value > 180 || value < -180) {
                      callback('Invalid value!');
                      return;
                    }
                    if(typeof(value) != 'number') {
                      callback('Longitude is not a number');
                      return;
                    }
                    else {
                      callback();
                    }
                  } 
                },
              ],
            })(<InputNumber style={{width: '100%'}}/>)}
          </Form.Item>   
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              rules: [
                {
                  type: 'string',
                },
                {
                  min: 20,
                  message: 'Must contain at least 20 letters!',
                },
                {
                  max: 300,
                  message: 'Must contain at most 300 letters!',
                }
              ],
            })(<TextArea rows={3} />)}
          </Form.Item>  
          <FormItem >
         <div >
        <Dropzone onDrop={this.onDrop} style={dropzoneStyle}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} style={{width: '65%', marginLeft: '34%', border: '1px solid black', borderStyle: 'dashed', height: '150px', overflow: 'scroll',
                background: 'rgb(162, 195, 233)', display: 'table'}}>
                  <input {...getInputProps()} />
                  {
            <ul style={{marginLeft: this.state.selectedFiles.length > 0 ? '-70px' : '-30px', marginRight:'20px'}}> {
            this.state.selectedFiles.length > 0 ? this.state.selectedFiles.map((file, index) => {
              return (<ol key={index} style={{marginBottom: '-18px'}}>
                  {file.name}
                </ol>)
            }) : <p style={{textAlign: 'center', marginTop: '10%', fontSize: '17px'
          }}>
            <Icon type="upload" style={{fontSize: '55px'}} /> <br />
             <span style={{fontWeight: 'bolder'}}>Choose an image </span> 
             <span>or drag it here</span> 
            </p>
           } </ul>
          } </div>
              </section>
            )}
          </Dropzone>
        </div>        
            </FormItem>   
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
          
        </Form>
        </div>
      );
    }
  }
  
const WrappedAddProblemForm = Form.create({ name: 'register' })(AddProblemForm);
const WrappedAddProblemFormWithRouter = withRouter(WrappedAddProblemForm);
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
}))(WrappedAddProblemFormWithRouter);
