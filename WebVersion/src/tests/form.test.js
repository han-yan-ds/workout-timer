import React from 'react';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { isMainThread } from 'worker_threads';
import { ExpansionPanelActions } from '@material-ui/core';

import Form from '../components/Form/Form.jsx';
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

describe('Form Functionality', () => {
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

describe('Updating total time', () => {
  const totalTimeDisplay = formWrapper.find('#total-workout-time').find('span');
  it('should initially display total time of 0 if no exercise is filled out', () => {
    expect(totalTimeDisplay.text()).toEqual('00:00:00');
  });
  it('should display total time of x seconds if the 1st exercise is filled out (with x seconds already in the time input', () => {
    // expect 1st item to be 20 seconds
    expect(formWrapper.find('.each-exercise-entry').at(0).find('.input-field-number').props().value).toEqual(20);
    // add exercise to the blank exercise field, should add time
    formWrapper.find('.each-exercise-entry').at(0).find('.input-field-movement').simulate('change', {target: {value: 'Pushups'}});
    expect(totalTimeDisplay.text()).toEqual('00:00:20');
    // change 1st item's time, should update total time
    formWrapper.find('.each-exercise-entry').at(0).find('.input-field-number').simulate('change', {target: {value: 30}});
    expect(totalTimeDisplay.text()).toEqual('00:00:30');
    // reset 1st item's time to 20s
    formWrapper.find('.each-exercise-entry').at(0).find('.input-field-number').simulate('change', {target: {value: 20}});
    expect(totalTimeDisplay.text()).toEqual('00:00:20');
  })
  it('should include rest time if there\'s multiple exercises', () => {
    // add exercise to 2nd blank exercise field, should add time AND add rest in between
    formWrapper.find('.each-exercise-entry').at(1).find('.input-field-movement').simulate('change', {target: {value: 'Squats'}});
    expect(totalTimeDisplay.text()).toEqual('00:00:50');
    // change 2nd exercise's time to 30s, should update total time
    formWrapper.find('.input-field-number').at(1).find('.input-field-number').simulate('change', {target: {value: 30}});
    expect(totalTimeDisplay.text()).toEqual('00:01:00');
    formWrapper.find('.input-field-number').at(1).find('.input-field-number').simulate('change', {target: {value: 20}});
    // reset 2nd exercise's time to 20s
    expect(totalTimeDisplay.text()).toEqual('00:00:50');
  });
  it('should properly calculate total time if there\'s multiple rounds', () => {
    formWrapper.find('#num-rounds-input').simulate('change', {target: {value: 2}});
    expect(totalTimeDisplay.text()).toEqual('00:01:50');
    formWrapper.find('#num-rounds-input').simulate('change', {target: {value: 3}});
    expect(totalTimeDisplay.text()).toEqual('00:02:50');
  });
  // at this point, it's 3 rounds, 20s Pushups, 20s Squats, 10s rest
});