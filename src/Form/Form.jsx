import React, {Component} from 'react';
import {zeroPad} from '../util/util';
import WorkoutTimer from '../Timer/WorkoutTimer.jsx'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movementList: [{movement: '', time: 20, roundNo: 0}],
      finalWorkout: [{movement: '', time: 20, roundNo: 0}],
      numRounds: 1,
    }
  }

  generateMovementList() {
    let result = [];
    for (let i = 0; i < this.state.numRounds; i++) {
      let newMovementList = this.state.movementList.reduce((accum, movement) => {
        accum.push({
            movement: movement.movement.toUpperCase(),
            time: movement.time,
            roundNo: i,
        });
        return accum;
      }, []);
      result = result.concat(newMovementList);
    }
    this.setState({
      finalWorkout: result
    })
  }

  handleChangeMovement(index, movement) {
    let newMovementList = this.state.movementList.slice();
    newMovementList[index].movement = movement;
    this.setState({
      movementList: newMovementList
    })
  }

  handleChangeTime(index, time) {
    let newMovementList = this.state.movementList.slice();
    newMovementList[index].time = time;
    this.setState({
      movementList: newMovementList
    })
  }

  handleChangeNumRounds(newNum) {
    this.setState({
      numRounds: newNum
    })
  }

  addInput() {
    let newMovementList = this.state.movementList.slice();
    newMovementList.push({
      movement: '',
      time: 20
    })
    this.setState({
      movementList: newMovementList,
    })
  }

  render() {
    return (
      <React.Fragment>

        <div id="form">
          <form>
            {this.state.movementList.map((movement, index) => {
              return (
                <React.Fragment key={`movement${zeroPad(index, 3)}`}>
                  <input type="text" 
                    className="input-button-movement"
                    onChange={(e) => {
                      this.handleChangeMovement(index, e.target.value);
                    }}
                    placeholder="Name of Exercise"
                    value={movement.movement}
                  >
                  </input>
                  <input type="number"
                    className="input-button-time"
                    onChange={(e) => {
                      this.handleChangeTime(index, Number(e.target.value));
                    }}
                    placeholder="# sec"
                    value={movement.time}
                  >
                  </input>
                  {/* <button onClick={(e) => {
                    
                  }}>
                    X
                  </button> */}
                </React.Fragment>
              );
            })}
            <br/>
            <button onClick={(e) => {
              e.preventDefault();
              this.addInput();
            }}>Add</button>
            <br/>
            <br/>
            <span>Number of Rounds:</span>
            <input type="number"
              onChange={(e) => {
                e.preventDefault();
                this.handleChangeNumRounds(Number(e.target.value));
              }}
              value={this.state.numRounds}>
            </input>
            <br/>
            <br/>
            <button onClick={(e) => {
              e.preventDefault();
              this.generateMovementList();
            }}>START WORKOUT</button>
          </form>
        </div>
        

        <div id="timer">
          <WorkoutTimer workoutArr={this.state.finalWorkout} numRounds={this.state.numRounds}/>
        </div>

      </React.Fragment>
    );
  }
}

export default Form;