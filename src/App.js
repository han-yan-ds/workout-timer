import React from 'react';
import './App.css';
import WorkoutTimer from "./Timer/WorkoutTimer.jsx"
import Form from "./Form/Form.jsx"
import exampleData from "./exampleData";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
        {/* <WorkoutTimer workoutArr={exampleData}/> */}
      </header>
    </div>
  );
}

export default App;
