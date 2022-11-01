import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './Map';
import './style.css';

function App() {
  return <Map />;
}

render(<App />, document.getElementById('root'));
