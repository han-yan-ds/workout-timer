const defaultMovementList = [{movement: '', time: 20, roundNo: 0}];

function setMovementList(movementList = defaultMovementList) {
  return {
    type: 'SET_MOVEMENT_LIST',
    movementList,
  }
}

function setWorkout(workout = defaultMovementList) {
  return {
    type: 'SET_WORKOUT',
    workout,
  }
}

function setNumRounds(numRounds = 1) {
  return {
    type: 'SET_NUM_ROUNDS',
    numRounds,
  }
}

function changeMovementIndex(movementIndex = 0) {
  return {
    type: 'CHANGE_MOVEMENT_INDEX',
    movementIndex
  }
}

function switchToForm() {
  return {
    type: 'SWITCH_TO_FORM',
  }
}

function switchToTimer() {
  return {
    type: 'SWITCH_TO_TIMER',
  }
}

export {
  setMovementList,
  setWorkout,
  setNumRounds,
  changeMovementIndex,
  switchToForm,
  switchToTimer,
};