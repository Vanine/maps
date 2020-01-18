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
import * as XLSX from 'xlsx';
import { json } from 'body-parser';
const { Option } = Select;
const { TextArea } = Input;
class AddProblemForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      selectedFiles: [],
      point: undefined,
      width: window.innerWidth,
      xlsxFile: undefined
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
    componentDidMount() {
      window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }
    onDropImage = (files) => {
        this.setState({
          selectedFiles: [...this.state.selectedFiles, ...files],
          loaded: 0,
        })
    }
    onDropXlsxFile = (files) => {
      this.setState({
        xlsxFile: files[0],
        loaded: 0,
      })
  }
    updateWindowDimensions () {
      this.setState({ width: window.innerWidth });
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
          let data = new FormData();
          let url = '';
          if(this.state.selectedFiles.length > 0) {
            for(let x = 0; x < this.state.selectedFiles.length; x++) {
                data.append('files', this.state.selectedFiles[x]);
            }  
            url = this.state.selectedFiles[0].name;       
         }
          const newProblem = {
            category: values.category,
            longitude: values.longitude,
            latitude: values.latitude,
            description: values.description,
            title: values.title,
            image: url,
        };  
        fetch(`/add_problem`, {
            method: 'POST',
            body: JSON.stringify(newProblem),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
        }).then(response => response.json())
        .then(resp => {
          if(this.state.selectedFiles.length > 0) {
            axios.post(`/upload_file`, data)
            .then(() => {
              this.setState({selectedFiles: []})})
          }
      })
      .then(() => {
        if(this.state.xlsxFile) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            workbook.SheetNames.forEach((sheetName) => {
              var XL_Row_Object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              var jsonObject = JSON.stringify(XL_Row_Object);
              axios.post('/add_problems', XL_Row_Object).then((response) => {
              })
            })
          }
          reader.readAsBinaryString(this.state.xlsxFile);
        }
      })
        .then(() => {
          this.props.addPoint(newProblem);
          this.props.form.resetFields();
          message.info(this.state.xlsxFile ? "Problems added" : "Problem added");
          this.setState({selectedFiles: [], xlsxFile: undefined});
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
          marginLeft: this.state.width > 575 ? '24%' : '10%',
          marginTop: '1%',
          width: this.state.width > 575 ? '40%' : '80%'
      }
      const dropzoneStyle = {
        width  : "100%",
        height : "100%",
        border : "1px solid black",
    };
    const divStyle = {
      width: this.state.width > 575 ? '65%' : '100%', 
      marginLeft: this.state.width > 575 ? '34%' : '0px', 
      border: '1px solid black', 
      borderStyle: 'dashed', 
      minHeight: this.state.width > 575 ? '120px' : '10p%', 
      background: 'rgb(162, 195, 233)', 
      display: 'table',
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
         <div style={{overflowY: 'auto'}}>
        <TabBar /> 
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className='form' style={formStyle}>
       <Form.Item label={
       <React.Fragment>
       <span>Category</span><span style={{color: 'red'}}></span>
       </React.Fragment>}>
             {getFieldDecorator('category', {
                initialValue: '0'
            })(<Select style={{ width: '100%' }} onChange={this.handleChange}>
                <Option value="0">Garbage disposal isn't done on time</Option>
                <Option value="1">Trash has no lid</Option>
                <Option value="2">Trash is placed in the wrong place</Option>
            </Select>)}
          </Form.Item>
          <Form.Item label={
       <React.Fragment>
       <span>Title</span><span style={{color: 'red'}}>*</span>
       </React.Fragment>}>
            {getFieldDecorator('title', {
              rules: [
                {
                  validator(rule, value, callback) {
                    if(!value) {
                      callback('Title is required!');
                      return;
                    }
                    if(value.length > 50) {
                      callback('Must contain at most 50 letters!');
                      return;
                    }
                    else {
                      callback();
                    }
                  } 
                },
              ],
            })(<Input style={{width: '100%'}}/>)}
          </Form.Item> 
          <ModalWithMap handleSelect={this.handleSelect}/>
          <Form.Item label={
       <React.Fragment>
       <span>Latitude</span><span style={{color: 'red'}}>*</span>
       </React.Fragment>}>
            {getFieldDecorator('latitude', {
              rules: [
                {
                  validator(rule, value, callback) {
                    if(!value) {
                      callback('Latitude is required!');
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
          <Form.Item label={
       <React.Fragment>
       <span>Longitude</span><span style={{color: 'red'}}>*</span>
       </React.Fragment>}>
            {getFieldDecorator('longitude', {
              rules: [
                {
                  validator(rule, value, callback) {
                    if(!value) {
                      callback('Longitude is required!');
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
        <Dropzone onDrop={this.onDropImage} style={dropzoneStyle}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} style={divStyle}>
                  <input {...getInputProps()} />
                  {
            <ul style={{marginLeft: this.state.selectedFiles.length > 0 ? '-70px' : '-30px', marginRight:'20px'}}> {
            this.state.selectedFiles.length > 0 ? this.state.selectedFiles.map((file, index) => {
              return (<ol key={index} style={{marginBottom: '-18px'}}>
                  {file.name}
                </ol>)
            }) : <p style={{textAlign: 'center', marginTop: '5%', fontSize: this.state.width > 575 ? '17px' : '14px'
          }}>
            <Icon type="upload" style={{fontSize: '200%'}} /> <br />
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
            <FormItem >
         <div >
        <Dropzone onDrop={this.onDropXlsxFile} style={dropzoneStyle}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} style={divStyle}>
                  <input {...getInputProps()} />
                  {
            this.state.xlsxFile ? 
               (<p style={{marginLeft: this.state.xlsxFile ? '10px' : '0px', marginRight:'20px', marginBottom: '-18px'}}>
                  {this.state.xlsxFile.name}
                </p>)
             : <p style={{textAlign: 'center', marginTop: '5%', fontSize: this.state.width > 575 ? '17px' : '14px'
          }}>
            <Icon type="upload" style={{fontSize: '200%'}} /> <br />
             <span style={{fontWeight: 'bolder'}}>Choose an xlsx file </span> 
             <span>or drag it here</span> 
            </p>
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

