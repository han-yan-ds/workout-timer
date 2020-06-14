import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import FormEntry from './FormEntry.jsx';
import AddIcon from '@material-ui/icons/AddCircle';
import { setWorkout, setMovementList, setNumRounds, setRestTime, switchToTimer, updateTimeEstimate,
  changeMovementIndex, highlightInvalidFormsAction, unHighlightInvalidFormsAction } from '../../actions/actions';
import { zeroPad, defaultExerciseTime, removeEmptyMovementEntries, generateFinalWorkout, estimateTotalTime } from '../../util/util';

function mapStateToProps(state) {
  const { movementList, numRounds, restTime, totalTimeEstimate, isTimerView, currentMovementIndex } = state;
  return {
    movementList,
    numRounds,
    restTime,
    totalTimeEstimate,
    isTimerView,
    currentMovementIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFullWorkout: (movementList, numRounds, restTime) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds, restTime);
      dispatch(setWorkout(fullWorkout));
    },
    handleChangeMovement: (movementList, index, movement, numRounds, restTime) => {
      dispatch(changeMovementIndex(0));
      let newMovementList = movementList.slice();
      newMovementList[index].movement = movement;
      let fullWorkout = generateFinalWorkout(newMovementList, numRounds, restTime);
      dispatch(setMovementList(newMovementList));
      dispatch(setWorkout(fullWorkout));
      dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
    },
    handleChangeTime: (movementList, index, time, numRounds, restTime) => {
      dispatch(changeMovementIndex(0));
      let newMovementList = movementList.slice();
      newMovementList[index].time = time;
      let fullWorkout = generateFinalWorkout(newMovementList, numRounds, restTime);
      dispatch(setMovementList(newMovementList));
      dispatch(setWorkout(fullWorkout));
      dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
    },
    handleChangeNumRounds: async (numRounds, movementList, restTime, currentMovementIndex) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds, restTime);
      await (new Promise((res) => {
        if (currentMovementIndex >= fullWorkout.length) dispatch(changeMovementIndex(0));
        res();
      }));
      await (new Promise((res) => {
        dispatch(setNumRounds(numRounds));
        dispatch(setWorkout(fullWorkout));
        dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
        res();
      }));
    },
    handleChangeRestTime: (restTime, movementList, numRounds) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds, restTime);
      dispatch(setRestTime(restTime));
      dispatch(setWorkout(fullWorkout));
      dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
    },
    handleAddInput: (movementList) => {
      let newMovementList = movementList.slice();
      newMovementList.push({ movement: '', time: defaultExerciseTime });
      dispatch(setMovementList(newMovementList));
    },
    handleRemoveInput: (movementList, index, numRounds, restTime) => {
      if (movementList.length > 1) {
        dispatch(changeMovementIndex(0));
        let newMovementList = movementList.slice();
        newMovementList.splice(index, 1);
        let fullWorkout = generateFinalWorkout(newMovementList, numRounds, restTime);
        dispatch(setMovementList(newMovementList));
        dispatch(setWorkout(fullWorkout));
        dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
      }
    },
    switchToTimerView: () => {
      dispatch(switchToTimer());
    },
    highlightInvalidForms: () => {
      dispatch(highlightInvalidFormsAction());
    },
    unHighlightInvalidForms: () => {
      dispatch(unHighlightInvalidFormsAction());
    }
  }
}

function Form({
  movementList, numRounds, restTime, totalTimeEstimate, isTimerView,
  currentMovementIndex, handleChangeMovement, handleChangeTime, handleChangeNumRounds,
  handleChangeRestTime, handleAddInput, handleRemoveInput, 
  switchToTimerView, highlightInvalidForms, unHighlightInvalidForms,
}) {
  let hideClass = (isTimerView) ? 'hide' : 'show';
  return (
    <div id="form-view" className={hideClass}>
      <h3 data-test="form-title">
        CREATE WORKOUT
      </h3>
      <form>
        {movementList.map((movement, index) => {
          return (
            <FormEntry key={`movement${zeroPad(index, 3)}`}
              movementList={movementList}
              movement={movement}
              index={index}
              numRounds={numRounds}
              restTime={restTime}
              handleChangeMovement={handleChangeMovement}
              handleChangeTime={handleChangeTime}
              handleAddInput={() => handleAddInput(movementList)}
              handleRemoveInput={() => handleRemoveInput(movementList, index, numRounds, restTime)}
            />
          );
        })}

        <button 
          type="submit"
          onClick={(e) => {
          e.preventDefault();
          handleAddInput(movementList);
        }}
          id='add-exercise-button'
        >
          <AddIcon/>
        </button>

        <br /><br /><br />

        {/* START REST TIME INPUT SECTION */}
        <span id="rest-time-label">Rest Time:&nbsp;&nbsp;</span>
        <input type="number"
          min={0}
          onChange={(e) => {
            e.preventDefault();
            handleChangeRestTime(Number(e.target.value), movementList, numRounds);
          }}
          className="input-field-number"
          value={restTime}>
        </input>
        {/* END REST TIME INPUT SECTION */}
          <br/><br/>
        {/* START NUM ROUNDS INPUT SECTION */}
        <span id="num-rounds-label">#&nbsp;&nbsp;Rounds:&nbsp;&nbsp;</span>
        <input type="number"
          min={1}
          onChange={(e) => {
            e.preventDefault();
            handleChangeNumRounds(Number(e.target.value), movementList, restTime, currentMovementIndex);
          }}
          className="input-field-number"
          id="num-rounds-input"
          value={numRounds}>
        </input>
        {/* END NUM ROUNDS INPUT SECTION */}
        <br /><br />
        {/* START START-WORKOUT SECTION */}
        <button onClick={(e) => {
          e.preventDefault();
          if (removeEmptyMovementEntries(movementList).length > 0) {
            switchToTimerView();
            unHighlightInvalidForms();
          } else {
            highlightInvalidForms();
          }
        }}
          id='start-workout-button'
        >
          START WORKOUT
        </button>
        {/* END START-WORKOUT SECTION */}
        <br /><br />
        <p id="total-workout-time">
          Total Time:&nbsp;&nbsp;<span>{totalTimeEstimate}</span>
        </p>
      </form>
    </div>
  );
}

Form.propTypes = {
  movementList: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
  })).isRequired, 
  numRounds: PT.number.isRequired, 
  isTimerView: PT.bool.isRequired,
  setFullWorkout: PT.func.isRequired, 
  handleChangeMovement: PT.func.isRequired, 
  handleChangeTime: PT.func.isRequired, 
  handleChangeNumRounds: PT.func.isRequired,
  handleAddInput: PT.func.isRequired, 
  handleRemoveInput: PT.func.isRequired, 
  switchToTimerView: PT.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);