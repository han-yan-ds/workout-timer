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

  removeInput(index) {
    let newMovementList = this.state.movementList.slice();
    newMovementList.splice(index, 1);
    this.setState({
      movementList: newMovementList,
    })
  }

  render() {
    return (
      <React.Fragment>

        <div id="form">
          <form>
            {/* START EDITING MOVEMENTS SECTION */}
            {/* START EACH INPUT FIELDS FOR MOVEMENTS */}
            {this.state.movementList.map((movement, index) => {
              return (
                <React.Fragment key={`movement${zeroPad(index, 3)}`}>
                  <input type="text" 
                    className="input-field-movement"
                    onChange={(e) => {
                      this.handleChangeMovement(index, e.target.value);
                    }}
                    placeholder="Name of Exercise"
                    value={movement.movement}
                  >
                  </input>
                  <input type="number"
                    className="input-field-number"
                    onChange={(e) => {
                      this.handleChangeTime(index, Number(e.target.value));
                    }}
                    placeholder="# sec"
                    value={movement.time}
                  >
                  </input>
                  <button onClick={(e) => {
                    e.preventDefault();
                    this.removeInput(index);
                  }}
                  className="remove-button">
                    X
                  </button>
                </React.Fragment>
              );
            })}
            {/* END EACH INPUT FIELDS FOR MOVEMENTS */} 
            <br/>
            <button onClick={(e) => {
              e.preventDefault();
              this.addInput();
            }}>Add</button>
            {/* END EDITING MOVEMENTS SECTION */}
            <br/><br/><br/>
            {/* START NUM ROUNDS INPUT SECTION */}
            <span>Number of Rounds:&nbsp;&nbsp;</span>
            <input type="number"
              onChange={(e) => {
                e.preventDefault();
                this.handleChangeNumRounds(Number(e.target.value));
              }}
              className="input-field-number"
              value={this.state.numRounds}>
            </input>
            {/* END NUM ROUNDS INPUT SECTION */}
            <br/><br/>
            {/* START START-WORKOUT SECTION */}
            <button onClick={(e) => {
              e.preventDefault();
              this.generateMovementList();
            }}>START WORKOUT</button>
            {/* END START-WORKOUT SECTION */}
          </form>
        </div>
        
        {/* START TIMER SECTION */}
        <div id="timer">
          <WorkoutTimer workoutArr={this.state.finalWorkout} numRounds={this.state.numRounds}/>
        </div>
        {/* END TIMER SECTION */}
      </React.Fragment>
    );
  }
}

export default Form;