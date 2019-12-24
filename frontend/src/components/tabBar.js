import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button} from 'antd';

class TabBar extends React.Component {
    render() {
        return(
            <span style={{display: 'flex', justifyContent: 'center', marginTop: '30px', }}>
                <Button style={{marginRight: '10px'}} type='primary'><Link to="/" >Add a new item</Link></Button>
                <Button type='primary'><Link to="/map" >View result on a map</Link></Button>
            </span>
        )
    }
}

let TabBarWithRouter = withRouter(TabBar);
export default TabBarWithRouter;