import React from 'react';
import PT from 'prop-types';

function FormEntry({ 
  movementList, 
  movement, 
  index, 
  handleChangeMovement, 
  handleChangeTime, 
  handleRemoveInput 
}) {
  let alertInputTime = (movement.time === 0) ? 'red-input' : '';
  return (
    <React.Fragment>
      <input type="text"
        className="input-field-movement"
        onChange={(e) => {
          handleChangeMovement(movementList, index, e.target.value);
        }}
        placeholder="Name of Exercise"
        value={movement.movement}
      >
      </input>
      <input type="number"
        min={0}
        className={`input-field-number ${alertInputTime}`}
        onChange={(e) => {
          handleChangeTime(movementList, index, Number(e.target.value));
        }}
        placeholder="# sec"
        value={movement.time}
      >
      </input>
      <button onClick={(e) => {
        e.preventDefault();
        handleRemoveInput(movementList, index);
      }}
        className="remove-button">
        X
    </button>
      <br />
    </React.Fragment>
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
  handleRemoveInput: PT.func.isRequired, 
}

export default FormEntry;