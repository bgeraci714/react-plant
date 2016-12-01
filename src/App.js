import React from 'react';

// redux && middleware
import { createStore } from 'redux';
//import * as asyncInitialState from 'redux-async-initial-state';
import { plants } from './reducers/plant';

// bootstrap && css
import { Panel } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import './App.css';

// local componenents
import Plant from './components/plant';
import PlantForm from './components/plant_form';
import Header from './components/header';

const plantApiURL = "https://rails-plant-api.herokuapp.com/api/plants/";

const status = ( response ) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  else {
    return Promise.reject(new Error(response.statusText));
  }
}

const json = ( response ) => {
  return response.json()
}

/*const getCurrentPlantDB = (plantApiURL, status, json) => {
  fetch(plantApiURL)
    .then(status)
    .then(json)
    .then((data) => {
      console.log(data);
      return {plantDB: data};
    }).catch((error) => {
      console.log("Request failed", error);
    });
}
*/
const resolve = (data) => {
  console.log(data);
  return {
    nameField: '',
    descField: '',
    plantDB: data}
}

const loadStore = () => {
  return new Promise(resolve => {
    fetch(plantApiURL)
      .then(status)
      .then(json)
      .then(resolve)
      .catch((error) => {
        console.log("Request failed", error);
      });
  });
}

console.log(loadStore()["promiseValue"]);
console.log(5);
//const storeCreator = applyMiddleware(asyncInitialState.middleware(loadStore));
const store = createStore(plants);


console.log(store.getState());

const App = React.createClass ({
  getInitialState(){
      return {
          nameField: '',
          descField: '',
          plantDB:   [],
        }
    },

  componentWillMount () {

    console.log(store.getState());
    let that = this;
    fetch(plantApiURL)
      .then(status)
      .then(json)
      .then((data) => {
        //console.log(data);
        that.setState({plantDB: data})
      }).catch((error) => {
        console.log("Request failed", error);
      });

  },

  handleChange(obj) {
    // dispatch here!!!
    this.setState(obj);
    console.log(this.state);
  },
  handleSubmit(event) {
    event.preventDefault();
    // action creator here!!
    let newPlant = {
      name:this.state.nameField,
      description: this.state.descField
    };


    fetch(plantApiURL, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
    .then(json)
    .then((data) => {
      console.log("Request succeeded with JSON response", data);
    }).catch((error) => {
      console.log("Request failed during posting", error);
    });

    // possible dispatch here!!
    this.setState({
      nameField: '',
      descField: '',
      plantDB: [...this.state.plantDB, newPlant]
    });

    return false;
  },

  render() {
    //console.log(this.state);
    const myPlantContent = this.state.plantDB.map(function(plant) {
      return (
          <Plant key={plant.id} name={plant.name} description={plant.description}/>
    )});

    const databaseTitle = (
        <h4>Plant Database</h4>
    );

    const panelsInstance = (
      <div>
        <Panel collapsible defaultExpanded header={databaseTitle} bsStyle="success" >
          <ListGroup>
            {myPlantContent}
          </ListGroup>
        </Panel>
      </div>
    );

    return (
      <div className="App">

          <Header />
          <div className="container">
          <br />
            <PlantForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}
            nameText={this.state.nameField} descText={this.state.descField} />
            {panelsInstance}

        </div>
      </div>
    );
  },
})

export default App;
