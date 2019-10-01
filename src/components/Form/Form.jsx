import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import FormEntry from './FormEntry.jsx';
import { setWorkout, setMovementList, setNumRounds, switchToTimer } from '../../actions/actions';
import { zeroPad } from '../../util/util';

function generateFinalWorkout(movementList, numRounds) {
  let result = [];
  movementList = movementList.filter((movement) => {
    return (movement.movement !== '' && movement.time > 0);
  });
  for (let i = 0; i < numRounds; i++) {
    let newMovementList = movementList.reduce((accum, movement) => {
      accum.push({
        movement: movement.movement.toUpperCase(),
        time: movement.time,
        roundNo: i,
      });
      return accum;
    }, []);
    result = result.concat(newMovementList);
  }
  return result;
}

function mapStateToProps(state) {
  const { movementList, numRounds, isTimerView } = state;
  return {
    movementList,
    numRounds,
    isTimerView,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFullWorkout: (movementList, numRounds) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds);
      dispatch(setWorkout(fullWorkout));
    },
    handleChangeMovement: (movementList, index, movement) => {
      let newMovementList = movementList.slice();
      newMovementList[index].movement = movement;
      dispatch(setMovementList(newMovementList));
    },
    handleChangeTime: (movementList, index, time) => {
      let newMovementList = movementList.slice();
      newMovementList[index].time = time;
      dispatch(setMovementList(newMovementList));
    },
    handleChangeNumRounds: (numRounds) => {
      dispatch(setNumRounds(numRounds));
    },
    handleAddInput: (movementList) => {
      let newMovementList = movementList.slice();
      newMovementList.push({ movement: '', time: 20 });
      dispatch(setMovementList(newMovementList));
    },
    handleRemoveInput: (movementList, index) => {
      let newMovementList = movementList.slice();
      newMovementList.splice(index, 1);
      dispatch(setMovementList(newMovementList));
    },
    switchToTimerView: () => {
      dispatch(switchToTimer());
    }
  }
}

function Form({
  movementList, numRounds, isTimerView,
  setFullWorkout, handleChangeMovement, handleChangeTime, handleChangeNumRounds,
  handleAddInput, handleRemoveInput, switchToTimerView
}) {
  let hideClass = (isTimerView) ? 'hide' : 'show';
  return (
    <div id="form-view" className={hideClass}>
      <p>
        CREATE WORKOUT:
      </p>
      <form>
        {movementList.map((movement, index) => {
          return (
            <FormEntry key={`movement${zeroPad(index, 3)}`}
              movementList={movementList}
              movement={movement}
              index={index}
              handleChangeMovement={handleChangeMovement}
              handleChangeTime={handleChangeTime}
              handleRemoveInput={handleRemoveInput}
            />
          );
        })}

        <button onClick={(e) => {
          e.preventDefault();
          handleAddInput(movementList);
        }}>Add</button>

        <br /><br /><br />

        {/* START NUM ROUNDS INPUT SECTION */}
        <span>Number of Rounds:&nbsp;&nbsp;</span>
        <input type="number"
          onChange={(e) => {
            e.preventDefault();
            handleChangeNumRounds(Number(e.target.value));
          }}
          className="input-field-number"
          value={numRounds}>
        </input>
        {/* END NUM ROUNDS INPUT SECTION */}
        <br /><br />
        {/* START START-WORKOUT SECTION */}
        <button onClick={(e) => {
          e.preventDefault();
          switchToTimerView();
          setFullWorkout(movementList, numRounds);
        }}>
          START WORKOUT
        </button>
        {/* END START-WORKOUT SECTION */}
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