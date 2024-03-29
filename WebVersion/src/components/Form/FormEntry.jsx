import React from 'react';
import {connect} from 'react-redux';
import PT from 'prop-types';

function mapStateToProps(state) {
  const {highlightInvalidForms} = state;
  return {highlightInvalidForms};
}

function FormEntry({ 
  highlightInvalidForms,
  movementList, 
  movement, 
  index,
  numRounds,
  restTime, 
  handleChangeMovement, 
  handleChangeTime,
  handleAddInput, 
  handleRemoveInput,
}) {
  let alertInputMovement = (movement.movement === '' && highlightInvalidForms) ? 'red-input' : '';
  let alertInputTime = (movement.time === 0 && highlightInvalidForms) ? 'red-input' : '';
  return (
    <div className='each-exercise-entry'>
      <input type="text"
        className={`input-field-movement ${alertInputMovement}`}
        onChange={(e) => {
          handleChangeMovement(movementList, index, e.target.value, numRounds, restTime);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.which === 13 || e.keyCode === 13) {
            e.preventDefault(); // prevent Enter from removing field
            handleAddInput();
          }
        }}
        placeholder="Name of Exercise"
        value={movement.movement}
      >
      </input>
      <input type="number"
        min={0}
        className={`input-field-number ${alertInputTime}`}
        onChange={(e) => {
          handleChangeTime(movementList, index, Number(e.target.value), numRounds, restTime);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.which === 13 || e.keyCode === 13) {
            e.preventDefault(); // prevent Enter from removing field
            handleAddInput();
          }
        }}
        placeholder="# sec"
        value={movement.time}
      >
      </input>
      <button 
        onClick={(e) => {
          e.preventDefault();
          handleRemoveInput(movementList, index, numRounds, restTime);
        }}
        className="remove-button">
        X
      </button>
      <br />
    </div>
  );
}

FormEntry.propTypes = {
  movementList: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
  })).isRequired, 
  movement: PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
  }).isRequired,
  index: PT.number.isRequired,
  handleChangeMovement: PT.func.isRequired, 
  handleChangeTime: PT.func.isRequired, 
  handleAddInput: PT.func.isRequired, 
  handleRemoveInput: PT.func.isRequired, 
}

export default connect(mapStateToProps, null)(FormEntry);