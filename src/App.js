import React from 'react';
import './App.scss';

import Calendar from './assets/javascripts/components/Calendar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Calendar />
      </header>
    </div>
  );
}

export default App;
