import React, { Component } from 'react';
import moment from 'moment';
import PT from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerResume: this.props.time,
      timerLeft: this.props.time,
      startingEpoch: 0, // 0 is meaningless placeholder here
      isTicking: false,
    }
  }


  startTimer() {
    if (!this.state.isTicking) {
      this.setState({
        startingEpoch: moment.now(),
        timerResume: this.state.timerLeft,
        isTicking: true,
      })
      this.timer = setInterval(() => {
        let updatedTimeLeft = this.state.timerResume - (moment.now() - this.state.startingEpoch) / 1000;
        if (updatedTimeLeft * 1000 < 1) {
          this.pauseTimer();
          this.nextSection();
        } else {
          this.setState({
            timerLeft: updatedTimeLeft,
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

  nextSection() {
    console.log("NEXT section, consolelogged for now")
  }

  render() {
    let isTickingCSS = (this.state.isTicking) ? 'timer-running' : 'timer-paused';
    return (
      <div>
        <h3>{this.props.movement}</h3>
        <h1 id={isTickingCSS}>{moment(this.state.timerLeft * 1000).format('mm:ss')}</h1>
        <button onClick={this.startTimer.bind(this)}>Start</button>
        <button onClick={this.pauseTimer.bind(this)}>Pause</button>
        <button onClick={this.nextSection.bind(this)}>Next</button>
      </div>
    );
  }
}

Timer.propTypes = {
  movement: PT.string.isRequired,
  time: PT.number.isRequired
}

export default Timer;