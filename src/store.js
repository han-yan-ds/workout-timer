import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialData = {
  // REDUX REFACTOR: FILL THIS IN
  finalWorkout: [{movement: '', time: 20, roundNo: 0}]
};

export default function configureStore () {
  return createStore(rootReducer, 
    initialData, 
    composeWithDevTools(applyMiddleware(thunk))
  )
}