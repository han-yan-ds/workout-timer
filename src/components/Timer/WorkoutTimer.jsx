import React from 'react';
import { connect } from 'react-redux';
import { changeMovementIndex, switchToForm } from '../../actions/actions';
import Timer from "./Timer.jsx";
import PT from 'prop-types';

function mapStateToProps(state) {
  const {finalWorkout, numRounds, currentMovementIndex, isTimerView} = state;
  return {
    finalWorkout,
    numRounds,
    currentMovementIndex,
    isTimerView,
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
    },
    switchToFormView: () => {
      dispatch(switchToForm());
    }
  }
}

function WorkoutTimer({ 
  finalWorkout, numRounds, currentMovementIndex, isTimerView,
  movePrev, moveNext, switchToFormView 
}) {
  let thisMovement = finalWorkout[currentMovementIndex];
  let hasPrev = currentMovementIndex !== 0;
  let hasNext = currentMovementIndex !== finalWorkout.length-1;
  let nextMovement = (hasNext) ? finalWorkout[currentMovementIndex+1] : null;
  let nextUp = (hasNext) ? `Next: ${nextMovement.movement} for ${nextMovement.time} seconds` : 'Last Exercise!';
  let hideClass = (isTimerView) ? 'show' : 'hide';
  return (
    <div id="timer-view" className={hideClass}>
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
        numMovesPerRound={finalWorkout.length/numRounds}
      />
      <button onClick={() => {
        // somehow pause the Timer from here
        switchToFormView();
      }}
      >
        Back To Form
      </button>
    </div>
  );

}

WorkoutTimer.propTypes = {
  finalWorkout: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
    roundNo: PT.number.isRequired,
  })).isRequired,
  numMovesPerRound: PT.number.isRequired,
  currentMovementIndex: PT.number.isRequired,
  isTimerView: PT.bool.isRequired,
  movePrev: PT.func.isRequired, 
  moveNext: PT.func.isRequired, 
  switchToFormView: PT.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTimer);