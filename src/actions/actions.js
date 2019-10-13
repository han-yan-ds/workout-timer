import { defaultMovementList } from '../util/util';

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

function setRestTime(restTime = 10) {
  return {
    type: 'SET_REST_TIME',
    restTime,
  }
}

function updateTimeEstimate(totalTimeEstimate) {
  return {
    type: 'UPDATE_TOTAL_TIME_ESTIMATE',
    totalTimeEstimate,
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

function highlightInvalidFormsAction() {
  return {
    type: 'HIGHLIGHT_INVALID_FORMS',
  }
}

function unHighlightInvalidFormsAction() {
  return {
    type: 'UNHIGHLIGHT_INVALID_FORMS',
  }
}

export {
  setMovementList,
  setWorkout,
  setNumRounds,
  setRestTime,
  updateTimeEstimate,
  changeMovementIndex,
  switchToForm,
  switchToTimer,
  highlightInvalidFormsAction,
  unHighlightInvalidFormsAction,
};