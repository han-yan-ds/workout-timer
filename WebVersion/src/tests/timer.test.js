import React from 'react';
import Enzyme, {shallow, render, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Timer from '../components/Timer/Timer.jsx'

Enzyme.configure({ adapter: new Adapter() });

const timerWrapper = mount(
  <Timer 
    movement={"thisexercise"}
    time={100}
    roundNo={12}
    step={144}
    movementNo={2}
    skipPrev={() => {}}
    skipNext={() => {}}
    hasPrev={true}
    hasNext={true}
    nextUp={"nextexercise"}
  />
);

afterAll(() => {
  timerWrapper.unmount();
});

describe('Timer Rendering', () => {
  it('displays the correct format for time', () => {
    expect(timerWrapper.find('#timer-area').find('h1').text()).toEqual('01:40');
  });
  it('displays the correct exercise', () => {
    expect(timerWrapper.find('#timer-area').find('h3').text()).toEqual('thisexercise');

  });
  let roundStepString = timerWrapper.find('#round-step-indicator').text();
  it('displays the current round #', () => {
    expect(roundStepString.includes(`13,`)).toBeTruthy();
  });
  it('displays the current step in this round', () => {
    // this will need to be tested again later when the full workout is generated
    expect(roundStepString.includes(`144`)).toBeTruthy();
  });
  it('displays the play button', () => {
    expect(timerWrapper.exists('#play-button')).toBeTruthy();
  });
  it('displays the pause button', () => {
    expect(timerWrapper.exists('#pause-button')).toBeTruthy();
  });
  it('displays/hides the previous button if there is/isn\'t a previous exercise', () => {
    expect(timerWrapper.find('#prev-button').props().className.includes('hid')).toBeFalsy();
    timerWrapper.setProps({ hasPrev: false });
    expect(timerWrapper.find('#prev-button').props().className.includes('hid')).toBeTruthy();
  });
  it('displays/hides the next button if there is/isn\'t a next exercise', () => {
    expect(timerWrapper.find('#next-button').props().className.includes('hid')).toBeFalsy();
    timerWrapper.setProps({ hasNext: false });
    expect(timerWrapper.find('#next-button').props().className.includes('hid')).toBeTruthy();
  });
});

describe('Timer Functionality', () => {
  
  it('should start off NOT counting down', async (done) => {
    let delay = new Promise((res, rej) => {
      setTimeout(() => res(timerWrapper.find('#timer-area').find('h1').text()), 2000);
    });
    let delayedText = await delay;
    expect(delayedText).toEqual('01:40');
    done();
  });

  test('should count seconds properly when Play is pressed', async (done) => {
    timerWrapper.find('#play-button').simulate('click');
    let delay = new Promise((res, rej) => {
      setTimeout(() => res(timerWrapper.find('#timer-area').find('h1').text()), 4000);
    });
    let delayedText = await delay;
    expect(delayedText).toEqual('01:36');
    done();
  });

  it('should pause properly when Pause is pressed', async (done) => {
    timerWrapper.find('#pause-button').simulate('click');
    let delay = new Promise((res, rej) => {
      setTimeout(() => res(timerWrapper.find('#timer-area').find('h1').text()), 2000);
    });
    let delayedText = await delay;
    expect(delayedText).toEqual('01:36');
    done();
  });

})

