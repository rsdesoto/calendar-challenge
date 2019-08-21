import React from 'react';
import './App.scss';

import CalendarContainer from './assets/javascripts/components/CalendarContainer'

function App() {
  return (
    <div className="App">
      <div className="calendar-description">
        <p>
          To create an appointment, click on a day.
        </p>
        <p>
          Please note -- you cannot make appointments prior to today.
        </p>
      </div>
        <CalendarContainer />
    </div>
  );
}

export default App;
