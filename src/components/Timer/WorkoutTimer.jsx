import React from 'react';
import { connect } from 'react-redux';
import { changeMovementIndex } from '../../actions/actions';
import Timer from "./Timer.jsx";
import PT from 'prop-types';

function mapStateToProps(state) {
  const {finalWorkout, numRounds, currentMovementIndex} = state;
  return {
    finalWorkout,
    numRounds,
    currentMovementIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    movePrev: (currentIndex) => {
      dispatch(changeMovementIndex(Math.max(currentIndex - 1, 0)));
    },
    moveNext: (currentIndex, finalWorkout) => {
      let hasNext = currentIndex !== finalWorkout.length-1;
      dispatch(changeMovementIndex((hasNext) ? currentIndex + 1 : 0));
    }
  }
}

function WorkoutTimer({ finalWorkout, numRounds, currentMovementIndex, movePrev, moveNext }) {
  let thisMovement = finalWorkout[currentMovementIndex];
  let hasPrev = currentMovementIndex !== 0;
  let hasNext = currentMovementIndex !== finalWorkout.length-1;
  let nextMovement = (hasNext) ? finalWorkout[currentMovementIndex+1] : null;
  let nextUp = (hasNext) ? `Next: ${nextMovement.movement} for ${nextMovement.time} seconds` : 'Last Exercise!'
  return (
    <Timer 
      movement={thisMovement.movement} 
      time={thisMovement.time} 
      roundNo={thisMovement.roundNo}
      movementNo={currentMovementIndex}
      skipPrev={() => movePrev(currentMovementIndex)}
      skipNext={() => moveNext(currentMovementIndex, finalWorkout)}
      hasPrev={hasPrev}
      hasNext={hasNext}
      nextUp={nextUp}
      numRounds={numRounds}
    />
  );

}

WorkoutTimer.propTypes = {
  workoutArr: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
    roundNo: PT.number.isRequired,
  })).isRequired,
  numRounds: PT.number.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTimer);