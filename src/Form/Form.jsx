import React, {Component} from 'react';
import PT from 'prop-types';
import {zeroPad} from '../util/util';
import exampleData from '../exampleData';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movementList: exampleData,
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
    console.log(this.state.movementList);
  }

  handleChangeTime(index, time) {
    let newMovementList = this.state.movementList.slice();
    newMovementList[index].time = time;
    this.setState({
      movementList: newMovementList
    })
    console.log(this.state.movementList);
  }

  addInput() {
    // let newMovementList = this.state.movementList.slice();
    // newMovementList.push({
    //   movement: '',
    //   time: ''
    // })
    // this.setState({
    //   movementList: newMovementList,
    // })
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
                  className="movement-input"
                  placeholder="Name of Exercise"
                  name={`m${zeroPad(index, 3)}`}
                  value={movement.movement}
                >
                </input>
                <input type="number"
                  onChange={(e) => {
                    this.handleChangeTime(index, e.target.value);
                  }}
                  className="movement-duration"
                  placeholder="# sec"
                  name={`d${zeroPad(index, 3)}`}
                  value={movement.time}
                >
                </input>
              </React.Fragment>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Form;