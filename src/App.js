import React from 'react';
import './App.css';
import Timer from './Timer.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer time={5} movement={"Pushups"}/>
      </header>
    </div>
  );
}

export default App;
