import React from 'react';
import { createStore, Provider } from 'redux';
//import $ from 'jquery';
import { Panel } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import './App.css';

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

const App = React.createClass ({
  getInitialState(){
      return {
          nameField: '',
          descField: '',
          plantDB:   [],
        }
    },

  componentWillMount () {
    let that = this;
    fetch(plantApiURL)
      .then(status)
      .then(json)
      .then((data) => {
        that.setState({plantDB: data})
      }).catch((error) => {
        console.log("Request failed", error);
      });
  },

  handleChange(obj) {
    this.setState(obj);
    console.log(this.state);
  },
  handleSubmit(event) {
    event.preventDefault();
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

    this.setState({
      nameField: '',
      descField: '',
      plantDB: [...this.state.plantDB, newPlant]
    });

    /*
    this.setState({
      nameField: '',
      descField: '',
      plantDB: [...this.state.plantDB, {name:this.state.nameField, description: this.state.descField}]
    })
    */
    //alert('A plant was submitted:' + JSON.stringify(this.state));

    return false;
  },

  render() {
    console.log(this.state);
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
