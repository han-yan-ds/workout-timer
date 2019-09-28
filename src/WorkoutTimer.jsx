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

  moveToNext() {
    this.setState({
      movementIndex: Math.min(this.state.movementIndex + 1, this.props.workoutArr.length),
    });
  }

  render() {
    let thisMovement = this.props.workoutArr[this.state.movementIndex];
    return (
      <Timer 
        movement={thisMovement.movement} 
        time={thisMovement.time} 
        skipNext={this.moveToNext.bind(this)}
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