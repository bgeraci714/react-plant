import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {testAddPlant, testReplacePlant, testIncorporateDBPlants, testDeletePlant } from './redux-tests';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('incorporates plants from database into the current state', () => {
  testIncorporateDBPlants();
});

it('adds a plant to the state\'s plantDB', () => {
  testAddPlant();
});

it('deletes a plant by its id from the database', () => {
  testDeletePlant();
});

it('updates the local state by replacing a local plant copy with its matching database object', () => {
  testReplacePlant();
});
