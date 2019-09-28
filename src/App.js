import React from 'react';
import './App.css';
import WorkoutTimer from "./WorkoutTimer.jsx"
import exampleData from "./exampleData";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WorkoutTimer workoutArr={exampleData}/>
      </header>
    </div>
  );
}

export default App;
