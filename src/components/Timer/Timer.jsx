import React, { Component } from 'react';
import moment from 'moment';
import PT from 'prop-types';

const beepTick = new Audio('./sounds/beep-02.mp3');
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
          if (updatedTimeLeft < beepTimeLeft && updatedTimeLeft !== this.state.prevTimeLeft) {
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

  render() {
    let isTickingCSS = (this.state.isTicking) ? 'timer-running' : 'timer-paused';
    let prevClass = (this.props.hasPrev) ? 'display-button' : 'hidden-button';
    let nextClass = (this.props.hasNext) ? 'display-button' : 'hidden-button';
    let isAlmostDone = (this.state.timerLeft < flickerTimeLeft && this.state.isTicking) ? 'flicker' : 'no-flicker';
    return (
      <div id="timer-area" className={isAlmostDone}>
        <h3>{this.props.movement}</h3>
        <h1 id={isTickingCSS}>{moment(this.state.timerLeft * 1000).format('mm:ss')}</h1>

        <button
          className={prevClass}
          onClick={this.prevSection.bind(this, false)}>
          <i className="material-icons">skip_previous</i>
        </button>
        <button 
          className="display-button"
          onClick={this.startTimer.bind(this)}>
          <i className="material-icons">play_arrow</i>
        </button>
        <button 
          className="display-button"
          onClick={this.pauseTimer.bind(this)}>
          <i className="material-icons">pause</i>
        </button>
        {/* <button onClick={this.resetTimer.bind(this)}>Reset</button> */}
        <button
          className={nextClass}
          onClick={this.nextSection.bind(this, false)}>
            <i className="material-icons">skip_next</i>
          </button>
        <br/><br/>
        <p>Round: {this.props.roundNo + 1}, Step: {(this.props.movementNo%this.props.numMovesPerRound)+1}</p>
        <p>{this.props.nextUp}</p>
      </div>
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
  numMovesPerRound: PT.number.isRequired,
}

export default Timer;