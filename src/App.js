import React, { Component } from 'react';
import Nav from './components/nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav/>
        </header>
      </div>
    );
  }
}

export default App;
