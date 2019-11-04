import React from 'react';
import '../styles/App.css';
import WorkoutTimer from "./Timer/WorkoutTimer.jsx"
import Form from "./Form/Form.jsx"

function App({ finalWorkout, numRounds }) {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
        <WorkoutTimer/>
      </header>
    </div>
  );
}

export default App;
