const defaultMovementList = [{movement: '', time: 20, roundNo: 0}];

function movementList(list = defaultMovementList, action) {
  switch (action.type) {
    case 'SET_MOVEMENT_LIST':
      return action.movementList;
    default:
      return list;
  }
}

function finalWorkout(workout = defaultMovementList, action) {
  switch (action.type) {
    case 'SET_WORKOUT':
      return action.workout;
    default:
      return workout;
  }
}

function numRounds(numRounds = 1, action) {
  switch (action.type) {
    case 'SET_NUM_ROUNDS':
      return action.numRounds;
    default:
      return numRounds;
  }
}

function currentMovementIndex(movementIndex = 0, action) {
  switch (action.type) {
    case 'CHANGE_MOVEMENT_INDEX':
      return action.movementIndex;
    default:
      return movementIndex;
  }
}

function isTimerView(isTimer = false, action) {
  switch (action.type) {
    case 'SWITCH_TO_FORM':
      return false;
    case 'SWITCH_TO_TIMER':
      return true;
    default:
      return isTimer;
  }
}

function highlightInvalidForms(highlight = false, action) {
  switch (action.type) {
    case 'HIGHLIGHT_INVALID_FORMS':
      return true;
    case 'UNHIGHLIGHT_INVALID_FORMS':
      return false;
    default:
      return highlight;
  }
}

export {
  movementList,
  finalWorkout,
  numRounds,
  currentMovementIndex,
  isTimerView,
  highlightInvalidForms,
};