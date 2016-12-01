import React from 'react';

const deepFreeze = require('deep-freeze');
const expect = require('expect');
const createSpy = expect.createSpy;
const spyOn = expect.spyOn;
const isSpy = expect.isSpy;

const reducer = require('./reducers/plant');

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

  const action = {
    type: 'ADD_PLANT',
    lastAdded: currentId,
    name: stateBefore.nameField,
    description: stateBefore.descField
  }

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

  const action = {
    type: 'DELETE_PLANT',
    id: 46
  }

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

  const action = {
    type:'REPLACE_PLANT_WITH_DB',
    lastAdded: currentId,
    plant: plantFromDB
  }

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

  const action = {
    type: 'INCORPORATE_DB_PLANTS',
    plants: plantsFromDB
  };

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
