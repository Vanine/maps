import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import { connect } from "react-redux";
import { addPoint } from '../actions/addpoint';
import { setPoints } from '../actions/setpoints';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;
const { TextArea } = Input;

class AddProblemForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedFile: null,
    };
    constructor(props) {
      super(props);
      this.fileInput = React.createRef();
    }
    onChangeHandler = event => {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let data;
          if(this.state.selectedFile) {
            console.log("ka filey: ",this.state.selectedFile.name);
            data = new FormData();
            data.append('file', this.state.selectedFile);
          }
          const newProblem = {
            category: values.category,
            longitude: values.longitude,
            latitude: values.latitude,
            description: values.description,
            image: data
        };
          const newPoint = {
            latitude: values.latitude,
            longitude: values.longitude
          }        

        fetch("http://localhost:3001/add_problem", {
            method: 'POST',
            body: JSON.stringify(newProblem),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
        }).then(response => response.json())
        .then(resp => {
          if(this.state.selectedFile !== null) {
            console.log("mtav uremn data ka");
            console.log('data: ', data);
            axios({
              method: 'post',
              url: `http://localhost:3001/upload_file/${resp.id}`,
              data: data,
            }).then(() => this.setState({selectedFile: null}))
          }
      })
        .then(() => {
          this.setState({selectedFile: null});
          this.props.addPoint(newPoint);
      })
        .catch(error => console.log('error:', error));
      }
      this.props.form.resetFields();
      })};

    handleChange = (value) => {
        console.log(`Selected ${value}`);
    };

    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    render() {
      const { getFieldDecorator } = this.props.form;
      const formStyle = {
          marginLeft: '20%',
          marginTop: '3%',
          width: '50%'
      }
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='form' style={formStyle}>
             <Form.Item label={<span>Category</span>}>
             {getFieldDecorator('category', {
                initialValue: '0'
            })(<Select style={{ width: '100%' }} onChange={this.handleChange}>
                <Option value="0">Garbage disposal is not done on time</Option>
                <Option value="1">Trash has no lid</Option>
                <Option value="2">Trash is placed in the wrong place</Option>
            </Select>)}
          </Form.Item>
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
                    if(typeof(value) !== 'number') {
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
                    if(typeof(value) !== 'number') {
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
          {getFieldDecorator('file', {
            })(<Input type='file' name = 'file' onChange={this.onChangeHandler} ref={this.fileInput} style={{width: '60%', marginLeft: '33%'}}/>)}          
            </FormItem>   
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
const WrappedAddProblemForm = Form.create({ name: 'register' })(AddProblemForm);
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
}))(WrappedAddProblemForm);