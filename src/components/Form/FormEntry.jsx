import React from 'react';

function FormEntry({ 
  movementList, 
  movement, 
  index, 
  handleChangeMovement, 
  handleChangeTime, 
  handleRemoveInput 
}) {
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
        className="input-field-number"
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

export default FormEntry;