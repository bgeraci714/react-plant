const deepFreeze = require('deep-freeze');
const expect = require('expect');
const createSpy = expect.createSpy;
const spyOn = expect.spyOn;
const isSpy = expect.isSpy;

const reducer = require('./plant_reducer');

const testDelPlant = () => {
  const stateBEfore = {
    nameField: '',
    descField: '',
    plantDB: [

    ]
  }
}


const testAddPlant = () => {
  const stateBefore = {
    nameField: 'Test',
    descField: 'Description',
    plantDB: []
  };

  const action = {
    type: 'ADD_PLANT',
    name: stateBefore.nameField,
    description: stateBefore.descField
  }

  deepFreeze(stateBefore);

  const stateAfter = {
    nameField: '',
    descField: '',
    plantDB:[
      {
        id: 1;
        name: "Test",
        description: "Description"
      }
    ]
  };

  expect(
    reducer.plants(stateBefore, action)
  ).toEqual(stateAfter);

}

testAddPlant();
console.log("All tests passed!");
