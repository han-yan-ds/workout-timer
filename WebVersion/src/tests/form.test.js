import React from 'react';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { isMainThread } from 'worker_threads';
import { ExpansionPanelActions } from '@material-ui/core';

import Form from '../components/Form/Form.jsx';
import FormEntry from '../components/Form/FormEntry.jsx';
import { Provider } from 'react-redux';
import configureStore from '../store';

Enzyme.configure({ adapter: new Adapter() });

const formWrapper = mount(
  <Provider store={configureStore()}>
    <Form />
  </Provider>
);

afterAll(() => {
  formWrapper.unmount();
});

describe('Form Rendering', () => {
  it('should render form object', () => {
    expect(formWrapper.exists('#form-view')).toBeTruthy();
  });
  it('should render "Add" (Exercise) button', () => {
    expect(formWrapper.exists('#add-exercise-button')).toBeTruthy();
  });
  it('should render "Start Workout" button', () => {
    expect(formWrapper.exists('#start-workout-button')).toBeTruthy();
  });
});

describe('Adding/Subtracting Exercises', () => {
  it('should initially render 4 inputs (2 for exercise + time, 1 for rest, 1 for # rounds)', () => {
    expect(formWrapper.find('input')).toHaveLength(4);
  });
  it('should render 4 more inputs when "Add" is clicked twice more', () => {
    const addExerciseButton = formWrapper.find('#add-exercise-button');
    addExerciseButton.simulate('click');
    addExerciseButton.simulate('click');
    expect(formWrapper.find('input')).toHaveLength(8);
  });
  it('should render 2 fewer inputs when a red X is clicked', () => {
    const removeButtons = formWrapper.find('.remove-button');
    const lastRemoveButton = formWrapper.find('.remove-button').at(removeButtons.length - 1);
    lastRemoveButton.simulate('click');
    expect(formWrapper.find('input')).toHaveLength(6);
  });
});

