import React, { Component } from 'react';
import moment from 'moment';
import PT from 'prop-types';

import Confirmation from './Confirmation.jsx';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import RestartIcon from '@material-ui/icons/Refresh';

const beepTick = new Audio('./sounds/beep-02.mp3');
const beepTickFinish = new Audio('./sounds/beep-01a.mp3');
const flickerTimeLeft = 5;
const beepTimeLeft = flickerTimeLeft;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerResume: this.props.time,
      timerLeft: this.props.time,
      startingEpoch: 0, // 0 is meaningless placeholder here
      isTicking: false,
      prevTimeLeft: 0, // 0 is meaningless placeholder here
      showConfirmationOverlay: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.time !== prevProps.time) {
      this.setState({
        timerLeft: this.props.time,
        timerResume: this.props.time,
      })
    }
  }

  startTimer() {
    if (!this.state.isTicking) {
      this.setState({
        startingEpoch: moment.now(),
        timerResume: this.state.timerLeft,
        isTicking: true,
      });
      this.timer = setInterval(() => {
        let updatedTimeLeft = Math.ceil(
          this.state.timerResume - (moment.now() - this.state.startingEpoch) / 1000);
        if (updatedTimeLeft * 1000 < 0) {
          this.pauseTimer();
          if (this.props.hasNext) {
            this.nextSection();
          }
        } else {
          if (updatedTimeLeft === 0) {
            beepTickFinish.play();
          }
          else if (updatedTimeLeft < beepTimeLeft && updatedTimeLeft !== this.state.prevTimeLeft) {
            beepTick.play();
          }
          this.setState({
            timerLeft: updatedTimeLeft,
            prevTimeLeft: updatedTimeLeft,
          });
        }
      }, 1);
    }
  }

  pauseTimer() {
    if (this.state.isTicking) {
      clearInterval(this.timer);
      this.setState({
        isTicking: false,
      })
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({
      timerResume: this.props.time,
      timerLeft: this.props.time,
      isTicking: false,
    });
  }

  prevSection(autoStart = true) {
    this.props.skipPrev();
    this.resetTimer();
    if (autoStart) {
      this.startTimer();
    }
  }

  nextSection(autoStart = true) {
    this.props.skipNext();
    this.resetTimer();
    if (autoStart) {
      this.startTimer();
    }
  }

  toggleConfirmationOverlay() {
    this.setState({
      showConfirmationOverlay: !this.state.showConfirmationOverlay,
    });
  }

  render() {
    let isTickingCSS = (this.state.isTicking) ? 'timer-running' : 'timer-paused';
    let prevClass = (this.props.hasPrev) ? 'display-button' : 'hidden-button';
    let nextClass = (this.props.hasNext) ? 'display-button' : 'hidden-button';
    let restartClass = (!this.state.isTicking) ? 'display-button' : 'hide';
    let pauseClass = (this.state.isTicking) ? 'display-button' : 'hide';
    let isAlmostDone = (this.state.timerLeft < flickerTimeLeft && this.state.isTicking) ? 'flicker' : 'no-flicker';
    let confirmationOverlayClass = (this.state.showConfirmationOverlay) ? 'translucent' : 'hide';
    return (
      <React.Fragment>
        <Confirmation 
          resetTimer={this.resetTimer.bind(this)}
          className={confirmationOverlayClass}
          exitConfirmation={this.toggleConfirmationOverlay.bind(this)}
        />

        <div id="timer-area" className={isAlmostDone}>

          <h3>{this.props.movement}</h3>
          <h1 id={isTickingCSS}>{moment(this.state.timerLeft * 1000).format('mm:ss')}</h1>

          <button
            id="prev-button"
            className={prevClass}
            onClick={this.prevSection.bind(this, false)}>
              <SkipPreviousIcon />
          </button>
          <button 
            id="play-button"
            className="display-button"
            onClick={this.startTimer.bind(this)}>
              <PlayArrowIcon />
          </button>
          {/* Begin Restart Button */}
          <button
            id="restart-button"
            className={restartClass}
            onClick={() => {
              this.toggleConfirmationOverlay();
              // this.pauseTimer();
            }}
          >
            <RestartIcon />
          </button>
          {/* End Restart Button */}
          <button 
            id="pause-button"
            className={pauseClass}
            onClick={this.pauseTimer.bind(this)}>
              <PauseIcon />
          </button>
          {/* <button onClick={this.resetTimer.bind(this)}>Reset</button> */}
          <button
            id="next-button"
            className={nextClass}
            onClick={this.nextSection.bind(this, false)}>
              <SkipNextIcon />
          </button>
          <br/><br/>
          <p id="round-step-indicator">Round: {this.props.roundNo + 1}, Step: {this.props.step}</p>
          <p>{this.props.nextUp}</p>
        </div>
      </React.Fragment>
    );
  }
}

Timer.propTypes = {
  movement: PT.string.isRequired,
  time: PT.number.isRequired,
  roundNo: PT.number.isRequired,
  movementNo: PT.number.isRequired,
  skipPrev: PT.func.isRequired,
  skipNext: PT.func.isRequired,
  hasPrev: PT.bool.isRequired,
  hasNext: PT.bool.isRequired,
  nextUp: PT.string.isRequired,
  step: PT.number.isRequired,
}

export default Timer;