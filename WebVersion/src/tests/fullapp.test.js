import React from 'react';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../components/App';
import { Provider } from 'react-redux';
import configureStore from '../store';
import { ExpansionPanelActions, jssPreset } from '@material-ui/core';
import { doesNotReject } from 'assert';

Enzyme.configure({ adapter: new Adapter() });

const appWrapper = mount(
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

afterAll(() => {
  appWrapper.unmount();
});

describe('App Behavior', () => {
  it('should generate the correct finalWorkout given what\'s entered on the form', () => {});
  it('should properly move to next/previous exercise', () => {});
  it('should render 00:00, WAIT a second, THEN move onto the next exercise', () => {});
  it('should pause automatically when moving onto previous and next', () => {});
  it('should move back to Form screen when the button is clicked', () => {});
  it('should pause automatically when moving back to Form screen', () => {});
})