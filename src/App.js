import React from 'react';
import './App.scss';

import CalendarContainer from './assets/javascripts/components/CalendarContainer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <CalendarContainer />
      </header>
    </div>
  );
}

export default App;
