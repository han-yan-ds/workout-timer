import { combineReducers } from 'redux';
import {
  movementList, 
  finalWorkout, 
  numRounds,
  restTime,
  totalTimeEstimate,
  currentMovementIndex,
  isTimerView,
  highlightInvalidForms,
} from './reducers';
// import other reducers

export default combineReducers({
  //all those reducers that were imported
  movementList,
  finalWorkout,
  numRounds,
  restTime,
  totalTimeEstimate,
  currentMovementIndex,
  isTimerView,
  highlightInvalidForms,
});