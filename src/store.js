import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { defaultMovementList } from './util/util';

const initialData = {
  finalWorkout: defaultMovementList,
};

export default function configureStore () {
  return createStore(rootReducer, 
    initialData, 
    composeWithDevTools(applyMiddleware(thunk))
  )
}