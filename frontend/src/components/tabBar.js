import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button} from 'antd';

class TabBar extends React.Component {
    render() {
        return(
            <span style={{display: 'flex', justifyContent: 'center', marginTop: '15px', 
             marginBottom: '10px', marginLeft: window.innerWidth>900 ? '25%' : '0%', marginRight: window.innerWidth>900 ? '25%' : '0%'}}>
                <Button style={{marginRight: '5px', width: window.innerWidth>900 ? '25%':'30%'}} type='primary'><Link to="/" >Add a new item</Link></Button>
                <Button style={{marginRight: '5px', width: window.innerWidth>900 ? '25%' : '30%'}} type='primary'><Link to="/map" >View result on a map</Link></Button>
                <Button style={{width: window.innerWidth>900 ? '25%' : '30%', wordWrap:'normal'}} type='primary'><Link to="/charts" >View charts</Link></Button>
            </span>
        )
    }
}

let TabBarWithRouter = withRouter(TabBar);
export default TabBarWithRouter;