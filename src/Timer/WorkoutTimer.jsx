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
    let hasNext = this.state.movementIndex !== this.props.workoutArr.length-1;
    this.setState({
      movementIndex: (hasNext) ? this.state.movementIndex + 1 : 0,
    });
  }

  render() {
    let thisMovement = this.props.workoutArr[this.state.movementIndex];
    let hasPrev = this.state.movementIndex !== 0;
    let hasNext = this.state.movementIndex !== this.props.workoutArr.length-1;
    let nextMovement = (hasNext) ? this.props.workoutArr[this.state.movementIndex+1] : null;
    let nextUp = (hasNext) ? `Next: ${nextMovement.movement} for ${nextMovement.time} seconds` : 'Last Exercise!'
    return (
      <Timer 
        movement={thisMovement.movement} 
        time={thisMovement.time} 
        roundNo={thisMovement.roundNo}
        movementNo={this.state.movementIndex}
        skipPrev={this.movePrev.bind(this)}
        skipNext={this.moveNext.bind(this)}
        hasPrev={hasPrev}
        hasNext={hasNext}
        nextUp={nextUp}
        numRounds={this.props.numRounds}
      />
    );
  }
}

WorkoutTimer.propTypes = {
  workoutArr: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
    roundNo: PT.number.isRequired,
  })).isRequired,
  numRounds: PT.number.isRequired
}

export default WorkoutTimer;