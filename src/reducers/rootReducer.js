import { combineReducers } from 'redux';
import {
  movementList, 
  finalWorkout, 
  numRounds,
  currentMovementIndex,
  isTimerView,
} from './reducers';
// import other reducers

export default combineReducers({
  //all those reducers that were imported
  movementList,
  finalWorkout,
  numRounds,
  currentMovementIndex,
  isTimerView,
});