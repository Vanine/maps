import React from 'react';
import {Line, Pie, Bar} from 'react-chartjs-2';
import TabBar from './tabBar';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import { addPoint } from '../actions/addpoint';
import { setPoints } from '../actions/setpoints';

class ChartsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }
    componentDidMount() {
        this.handleFetch();
        window.addEventListener('resize', this.updateWindowDimensions)
      }
    componentWillUnmount() {
        window.removeEventListener('resize', this);
      }
    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
      }
    handleFetch = () => {
        axios.get('/problems')
       .then(response => {
         this.props.setPoints({points: response.data.points})
       }).catch(error => {throw error});
    }
    getLabels = () => {
        let options = {
            labels: [],
            data: [],
        };
        for(let i = 0; i < this.props.points.length; i++) {
            let j = 0;
            let bool;
            let date = new Date(this.props.points[i].date);
            for(j = 0; j < options.labels.length; j++) {
                if(options.labels[j].getMonth() == date.getMonth() && options.labels[j].getDay() == date.getDay()) {
                    options.data[j]++;
                    bool = true;
                    break;
                }
            }
            if(bool === undefined) {
                options.labels.push(date);
                options.data.push(1);
            }
        }
        return options;
    }
    getPieData = () => {
        let pieData = {
            firstTypeData: 0,
            secondTypeData: 0,
            thirdTypeData: 0
        };
        for(let i = 0; i < this.props.points.length; i++) {
            switch (this.props.points[i].category) {
                case '0':
                    pieData.firstTypeData++
                    break;
                case '1':
                    pieData.secondTypeData++
                    break;
                case '2':
                    pieData.thirdTypeData++
                    break;
                default:
                    break;
            }
        }
        return pieData;
    }
    render() {
        let options = this.getLabels();
        const pieLabels = ['Garbage disposal is not done on time', 'Trash has no lid', 'Trash is placed in wrong place'];
        const pieData = this.getPieData();
        let data = options.labels.map((value, index) => {
            return ({x: `${value.getDate()}/${value.getMonth()+1}`, y: options.data[index]})
        })
        // data.push({x: "18/1", y: 4});
        // data.push({x: "20/1", y: 10});
        const lineData = {
            datasets: [
              {
                label: 'Count',
                fill: true,
                fullWidth: false,
                backgroundColor: 'rgba(70,130,180,0.8)',
                borderColor: 'rgb(70,130,180)',
                pointBorderColor: 'rgb(70,130,180)',
                pointBackgroundColor: 'rgb(70,130,180)',
                pointRadius: 5,
                data: data
              }
            ]
          }
          const lineChartStyle = {
            width: this.state.width > 900 ? '45%' : '80%'
          }
          const pieChartStyle = {
            width: this.state.width > 900 ? '45%' : '100%'
          }
          const chartsStyle = {

          }
        return(
            <div style={{overflow: 'auto'}}>
                <TabBar />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={lineChartStyle}>
                    <Bar 
                    options={
                        {                        
                        scales: {xAxes: [{
                        type: 'time',
                        stacked:true,
                        time: {
                            parser: "DD/MM",
                            unit: 'day',
                            unitStepSize: '1'
                        },
                        ticks: {
                            stepSize: 10000
                          },
                       }],
                        yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]}}}
                    data={lineData}/>
                </div>
                <div style={pieChartStyle}>
                    <Pie 
                        data={{
                            labels: pieLabels,
                            datasets: [{
                                data: [pieData.firstTypeData, pieData.secondTypeData, pieData.thirdTypeData],
                                backgroundColor: ['rgb(70, 130, 180)', 'rgb(95, 158, 160)', 'rgb(162, 195, 233)'] 
                            }]
                        }}
                        />
                </div>
                </div>
            </div>
        )
    }
}

const ChartsContainerWithRouter = withRouter(ChartsContainer);

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
  }))(ChartsContainerWithRouter);