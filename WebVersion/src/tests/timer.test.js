import React from 'react';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WorkoutTimer from '../components/Timer/WorkoutTimer'
import { Provider } from 'react-redux';
import configureStore from '../store';

Enzyme.configure({ adapter: new Adapter() });

const timerWrapper = mount(
  <Provider store={configureStore()}>
    <WorkoutTimer />
  </Provider>
);

afterAll(() => {
  timerWrapper.unmount();
})

