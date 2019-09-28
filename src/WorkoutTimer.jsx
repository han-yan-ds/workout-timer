import React, {Component} from 'react';
import Timer from "./Timer.jsx";
import PT from 'prop-types';

class WorkoutTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movementIndex: 0,
    }
  }

  movePrev() {
    this.setState({
      movementIndex: Math.max(this.state.movementIndex - 1, 0),
    });
  }

  moveNext() {
    this.setState({
      movementIndex: Math.min(this.state.movementIndex + 1, this.props.workoutArr.length-1),
    });
  }

  render() {
    let thisMovement = this.props.workoutArr[this.state.movementIndex];
    let hasPrev = this.state.movementIndex !== 0;
    let hasNext = this.state.movementIndex !== this.props.workoutArr.length-1;
    return (
      <Timer 
        movement={thisMovement.movement} 
        time={thisMovement.time} 
        skipPrev={this.movePrev.bind(this)}
        skipNext={this.moveNext.bind(this)}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    );
  }
}

WorkoutTimer.propTypes = {
  workoutArr: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
  })).isRequired,
}

export default WorkoutTimer;