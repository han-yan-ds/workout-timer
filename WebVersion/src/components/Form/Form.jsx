import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import FormEntry from './FormEntry.jsx';
import { setWorkout, setMovementList, setNumRounds, setRestTime, switchToTimer, updateTimeEstimate,
  highlightInvalidFormsAction, unHighlightInvalidFormsAction } from '../../actions/actions';
import { zeroPad } from '../../util/util';
import moment from 'moment';

function removeEmptyMovementEntries(movementList) {
  return movementList.filter((movement) => {
    return (movement.movement !== '' && movement.time > 0);
  });
}

function generateFinalWorkout(movementList, numRounds, restTime = 0) {
  let result = [];
  movementList = removeEmptyMovementEntries(movementList);
  for (let i = 0; i < numRounds; i++) {
    let newMovementList = movementList.reduce((accum, movement, index) => {
      accum.push({
        movement: movement.movement.toUpperCase(),
        time: movement.time,
        roundNo: i,
        step: index+1,
      });
      if (restTime > 0) {
        accum.push({
          movement: 'REST',
          time: restTime,
          roundNo: i,
          step: index+1,
        })
      }
      return accum;
    }, []);
    result = result.concat(newMovementList);
  }
  if (restTime > 0) {
    result.pop()
  }
  return result;
}

function estimateTotalTime(movementList, numRounds, restTime = 0) {
  let finalWorkout = generateFinalWorkout(movementList, numRounds, restTime);
  let numSeconds = finalWorkout.reduce((accum, part) => {
    return accum + part.time;
  }, 0);
  return moment.utc(moment(numSeconds * 1000).diff(moment(0))).format('HH:mm:ss');
}

function mapStateToProps(state) {
  const { movementList, numRounds, restTime, totalTimeEstimate, isTimerView } = state;
  return {
    movementList,
    numRounds,
    restTime,
    totalTimeEstimate,
    isTimerView,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFullWorkout: (movementList, numRounds, restTime) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds, restTime);
      dispatch(setWorkout(fullWorkout));
    },
    handleChangeMovement: (movementList, index, movement, numRounds, restTime) => {
      let newMovementList = movementList.slice();
      newMovementList[index].movement = movement;
      dispatch(setMovementList(newMovementList));
      dispatch(updateTimeEstimate(estimateTotalTime(newMovementList, numRounds, restTime)));
    },
    handleChangeTime: (movementList, index, time, numRounds, restTime) => {
      let newMovementList = movementList.slice();
      newMovementList[index].time = time;
      dispatch(setMovementList(newMovementList));
      dispatch(updateTimeEstimate(estimateTotalTime(newMovementList, numRounds, restTime)));
    },
    handleChangeNumRounds: (numRounds, movementList, restTime) => {
      dispatch(setNumRounds(numRounds));
      dispatch(updateTimeEstimate(estimateTotalTime(movementList, numRounds, restTime)));
    },
    handleChangeRestTime: (restTime, movementList, numRounds) => {
      dispatch(setRestTime(restTime));
      dispatch(updateTimeEstimate(estimateTotalTime(movementList, numRounds, restTime)));
    },
    handleAddInput: (movementList) => {
      let newMovementList = movementList.slice();
      newMovementList.push({ movement: '', time: 20 });
      dispatch(setMovementList(newMovementList));
    },
    handleRemoveInput: (movementList, index, numRounds, restTime) => {
      if (movementList.length > 1) {
        let newMovementList = movementList.slice();
        newMovementList.splice(index, 1);
        dispatch(setMovementList(newMovementList));
        dispatch(updateTimeEstimate(estimateTotalTime(newMovementList, numRounds, restTime)));
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
  setFullWorkout, handleChangeMovement, handleChangeTime, handleChangeNumRounds,
  handleChangeRestTime, handleAddInput, handleRemoveInput, 
  switchToTimerView, highlightInvalidForms, unHighlightInvalidForms,
}) {
  let hideClass = (isTimerView) ? 'hide' : 'show';
  return (
    <div id="form-view" className={hideClass}>
      <h3>
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
              handleRemoveInput={handleRemoveInput}
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
        >Add</button>

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
            handleChangeNumRounds(Number(e.target.value), movementList, restTime);
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
            setFullWorkout(movementList, numRounds, restTime);
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