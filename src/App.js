import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game';

class App extends Component {
  render() {
    const cells = ['', '', ''];

    return (
      <div>
        <h3>Here we go:</h3>
        <Game />
      </div>
    );
  }
}

export default App;
