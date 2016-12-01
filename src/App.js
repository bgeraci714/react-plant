import React from 'react';
import ReactDOM from 'react-dom';

// redux && middleware
import { createStore } from 'redux';
import { plants } from './reducers/plant_reducers';
import { deletePlant, incorporateDB, replacePlant, addPlant } from './actions/plant_actions';

// bootstrap && css
import { Panel } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import './App.css';

// local componenents
import Plant from './components/plant_component';
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

var store = createStore(plants, {
  receivedData: false,
  nameField: '',
  descField: '',
  plantDB: []
});

var currentId = new Date().valueOf();

const App = React.createClass ({
  getInitialState(){
      return {
          lastAdded: 0,
          nameField: '',
          descField: '',
          plantDB:   [],
        }
    },

  componentWillMount () {

    fetch(plantApiURL)
      .then(status)
      .then(json)
      .then((data) => {
        store.dispatch(incorporateDB(data));
      }).catch((error) => {
        console.log("Request failed", error);
      });

  },

  handleChange(obj) {
    this.setState(obj);
  },
  handleSubmit(event) {
    event.preventDefault();
    let newPlant = {
      name:this.state.nameField,
      description: this.state.descField
    };
    currentId = new Date().valueOf();

    store.dispatch(addPlant(currentId, this.state.nameField, this.state.descField));

    fetch(plantApiURL, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
    .then(json)
    .then((data) => {
      store.dispatch(replacePlant(currentId, data));

      console.log(store.getState());
    }).catch((error) => {
      console.log("Request failed during posting", error);
    });

    return false;
  },

  handleDelete: plantId => event => {
    event.preventDefault();
    store.dispatch(deletePlant(plantId));

    fetch(plantApiURL + plantId, {
      method: 'delete'
    })
    .then(status)
    .catch((error) => {
      console.log("Request failed during deletion", error);
    });

    return false;
  },

  render() {
    //console.log("Render just got called!");
    const myPlantContent = store.getState().plantDB.map((plant) => {
      return (
          <Plant key={plant.id} id={plant.id} name={plant.name} description={plant.description} handleDelete={this.handleDelete}/>
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


const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

store.subscribe(render);
//render();

export default App;
