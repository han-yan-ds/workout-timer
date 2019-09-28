import React, {Component} from 'react';
import PT from 'prop-types';
import {zeroPad} from '../util/util';
import exampleData from '../exampleData';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movementList: [{movement: '', time: 20}],
      numRounds: 1,
    }
  }

  generateMovementList() {
    // create the exampleData here and RETURN IT
    // will go into WOrkoutTimer as a prop
  }

  handleChangeMovement(index, movement) {
    let newMovementList = this.state.movementList.slice();
    newMovementList[index].movement = movement;
    this.setState({
      movementList: newMovementList
    })
    // console.log(this.state.movementList);
  }

  handleChangeTime(index, time) {
    let newMovementList = this.state.movementList.slice();
    newMovementList[index].time = time;
    this.setState({
      movementList: newMovementList
    })
    // console.log(this.state.movementList);
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
    // console.log(this.state.movementList);
  }

  render() {
    return (
      <div>
        <form>

          {this.state.movementList.map((movement, index) => {
            return (
              <React.Fragment key={`movement${zeroPad(index, 3)}`}>
                <input type="text" 
                  onChange={(e) => {
                    this.handleChangeMovement(index, e.target.value);
                  }}
                  placeholder="Name of Exercise"
                  value={movement.movement}
                >
                </input>
                <input type="number"
                  onChange={(e) => {
                    this.handleChangeTime(index, Number(e.target.value));
                  }}
                  placeholder="# sec"
                  value={movement.time}
                >
                </input>
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
            console.log(`WORKOUT STARTED: ${this.state.movementList} ${this.state.numRounds}`)
          }}>START WORKOUT</button>
        </form>
      </div>
    );
  }
}

export default Form;