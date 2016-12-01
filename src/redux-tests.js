import React from 'react';
import { deletePlant, incorporateDB, replacePlant, addPlant } from './actions/plant_actions';

const deepFreeze = require('deep-freeze');
const expect = require('expect');
const createSpy = expect.createSpy;
const spyOn = expect.spyOn;
const isSpy = expect.isSpy;

const reducer = require('./reducers/plant_reducers');

const plantsFromDB = [
  {
    created_at:"2016-12-01T08:56:52.704Z",
    description:"red and thorny, just like my ex.",
    id:46,
    name:"Rose",
    updated_at:"2016-12-01T08:56:52.704Z",
  },
  {
    created_at:"2016-12-01T08:56:52.704Z",
    description:"blue and lovely.",
    id:20,
    name:"Violet",
    updated_at:"2016-12-01T08:56:52.704Z",
  }
];

exports.testAddPlant = () => {
  let currentId = new Date().valueOf();
  const stateBefore = {
    receivedData: false,
    lastAdded: currentId,
    nameField: 'Test',
    descField: 'Description',
    plantDB: []
  };

  const action = addPlant(currentId, stateBefore.nameField, stateBefore.descField);

  deepFreeze(stateBefore);

  const stateAfter = {
    receivedData: false,
    lastAdded: currentId,
    nameField: '',
    descField: '',
    plantDB:[
      {
        id: currentId,
        name: "Test",
        description: "Description"
      }
    ]
  };

  expect(
    reducer.plants(stateBefore, action)
  ).toEqual(stateAfter);

}

exports.testDeletePlant = () => {
  const stateBefore = {
    receivedData: false,
    lastAdded: 0,
    nameField: '',
    descField: '',
    plantDB: plantsFromDB
  }
  let plantIdToDelete = 46;
  const action = deletePlant(plantIdToDelete);

  deepFreeze(stateBefore);
  deepFreeze(action);

  const stateAfter = {
    receivedData: false,
    lastAdded: 0,
    nameField: '',
    descField: '',
    plantDB: plantsFromDB.slice(1)
  }

  expect(
    reducer.plants(stateBefore, action)
  ).toEqual(stateAfter);
}

exports.testReplacePlant = () => {
  let currentId = 2000;
  const stateBefore = {
      receivedData: false,
      lastAdded: currentId,
      nameField: '',
      descField: '',
      plantDB: [
        {
          id: currentId,
          name: "Rose",
          description: "red and thorny, just like my ex."
        }
      ]

  }
  const plantFromDB = {
    created_at:"2016-12-01T08:56:52.704Z",
    description:"red and thorny, just like my ex.",
    id:46,
    name:"Rose",
    updated_at:"2016-12-01T08:56:52.704Z",
  };

  const action = replacePlant(currentId, plantFromDB);

  deepFreeze(stateBefore);
  deepFreeze(plantFromDB);
  deepFreeze(action);


  const stateAfter = {
    receivedData: false,
    lastAdded: 2000,
    nameField: '',
    descField: '',
    plantDB: [
      plantFromDB
    ]
  }

  expect (
    reducer.plants(stateBefore, action)
  ).toEqual(stateAfter);
}

exports.testIncorporateDBPlants = () => {
  const stateBefore = {
    receivedData: false,
    lastAdded: 0,
    nameField: '',
    descField: '',
    plantDB: []
  };

  const action = incorporateDB(plantsFromDB);

  deepFreeze(stateBefore);
  deepFreeze(action);

  const stateAfter = {
    receivedData: false,
    lastAdded: 0,
    nameField: '',
    descField: '',
    plantDB: plantsFromDB
  };

  expect (
    reducer.plants(stateBefore, action)
  ).toEqual(stateAfter);
}
