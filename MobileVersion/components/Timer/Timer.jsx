import React, { Component } from 'react';
import moment from 'moment';
import PT from 'prop-types';

import Confirmation from './Confirmation.jsx';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import RestartIcon from '@material-ui/icons/Refresh';

// BEGIN MOBILE-SPECIFIC
import timerStyles from '../../styles/timerStyles';
import appStyles from '../../styles/appStyles';
import overlayStyles from '../../styles/overlayStyles';
import { View, Text, TouchableOpacity } from 'react-native';

import { Audio } from 'expo-av';
const beepTick = new Audio.Sound();
const beepTickFinish = new Audio.Sound();
const flickerTimeLeft = 5;
const beepTimeLeft = flickerTimeLeft;
// END MOBILE-SPECIFIC

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

  // BEGIN MOBILE-SPECIFIC
  async componentDidMount() {
    await beepTick.loadAsync(require('../../sounds/beep-02.mp3'));
    await beepTickFinish.loadAsync(require('../../sounds/beep-01a.mp3'));
  }
  // END MOBILE-SPECIFIC

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
          // BEGIN MOBILE-SPECIFIC
          if (updatedTimeLeft === 0) {
            beepTickFinish.playAsync();
          }
          else if (updatedTimeLeft < beepTimeLeft && updatedTimeLeft !== this.state.prevTimeLeft) {
            beepTick.playAsync();
          }
          // END MOBILE-SPECIFIC
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
    let isTickingCSS = (this.state.isTicking) ? timerStyles.timerRunning : timerStyles.timerPaused;
    let prevButtonStyle = (this.props.hasPrev) ? timerStyles.displayButton : timerStyles.hiddenButton;
    let nextButtonStyle = (this.props.hasNext) ? timerStyles.displayButton : timerStyles.hiddenButton;
    let restartButtonStyle = (!this.state.isTicking) ? timerStyles.displayButton : appStyles.hide;
    let pauseButtonStyle = (this.state.isTicking) ? timerStyles.displayButton : appStyles.hide;
    let isAlmostDone = (this.state.timerLeft < flickerTimeLeft && this.state.isTicking) ? timerStyles.flickerTimer : {};
    let confirmationOverlayStyle = (this.state.showConfirmationOverlay) ? overlayStyles.translucent : appStyles.hide;    
    return (
      <React.Fragment>
        <Confirmation 
          resetTimer={this.resetTimer.bind(this)}
          styleName={confirmationOverlayStyle}
          exitConfirmation={this.toggleConfirmationOverlay.bind(this)}
        />

        <View id="timer-area" style={isAlmostDone}>

          <Text>{this.props.movement}</Text>
          <Text style={isTickingCSS}>{moment(this.state.timerLeft * 1000).format('mm:ss')}</Text>
          
          <View style={timerStyles.buttonContainer}>
            <TouchableOpacity
              id="prev-button"
              style={timerStyles.button, prevButtonStyle}
              onPress={this.prevSection.bind(this, false)}>
                <SkipPreviousIcon />
            </TouchableOpacity>
            <TouchableOpacity 
              id="play-button"
              style={timerStyles.button, timerStyles.displayButton}
              onPress={this.startTimer.bind(this)}>
                <PlayArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity
              id="restart-button"
              style={timerStyles.button, restartButtonStyle}
              onPress={() => {
                this.toggleConfirmationOverlay();
              }}
            >
              <RestartIcon />
            </TouchableOpacity>
            <TouchableOpacity 
              id="pause-button"
              style={timerStyles.button, pauseButtonStyle}
              onPress={this.pauseTimer.bind(this)}>
                <PauseIcon />
            </TouchableOpacity>
            <TouchableOpacity
              id="next-button"
              style={timerStyles.button, nextButtonStyle}
              onPress={this.nextSection.bind(this, false)}>
                <SkipNextIcon />
            </TouchableOpacity>
          </View>
          
          {/* <br/><br/> */}
          <Text id="round-step-indicator">Round: {this.props.roundNo + 1}, Step: {this.props.step}</Text>
          <Text>{this.props.nextUp}</Text>
        </View>
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