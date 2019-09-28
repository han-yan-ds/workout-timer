import React, {Component} from 'react';
import moment from 'moment';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingTime: 30,
      timeLeft: 30,
      start: 0,
    }
  }


  startTimer() {
    this.setState({
      start: Date.now()
    })
    this.timer = setInterval(() => {
      this.setState({
        timeLeft: Math.round(this.state.startingTime - (Date.now() - this.state.start)/1000)
      })
    }, 1);
    // console.log("Start, consolelogged for now");
  }

  pauseTimer() {
    clearInterval(this.timer);
    console.log("Pause, consolelogged for now")
  }

  nextSection() {
    console.log("NEXT section, consolelogged for now")
  }

  render() {
    return (
      <div>
        <h3>timer: {this.state.timeLeft}</h3>
        <button onClick={this.startTimer.bind(this)}>Start</button>
        <button onClick={this.pauseTimer.bind(this)}>Pause</button>
        <button onClick={this.nextSection.bind(this)}>Next</button>
      </div>
    );
  }
}

export default Timer;