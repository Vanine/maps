import React from 'react';
import './App.css';
import MapContainer from './components/mapContainer';
import AddProblem from './components/addProblem';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import  pointsList  from './reducers/reducer';

var store = createStore(pointsList, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends React.Component {
  
  render() {
    return (
    <Provider store={store}>
      <AddProblem />
      <MapContainer />
    </Provider>
      )}
}

export default App;
