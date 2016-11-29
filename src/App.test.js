import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {testAddPlant } from './redux-tests';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('adds a plant to the state\'s plantDB', () => {
  testAddPlant();
});
