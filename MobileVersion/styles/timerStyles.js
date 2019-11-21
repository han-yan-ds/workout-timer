import { StyleSheet } from 'react-native';
import { vmax, vw } from 'react-native-expo-viewport-units';
import * as appStyles from './appStyles';

export default StyleSheet.create({
  timerMasterContainer: {
    position: 'relative',
  },
  timerSubArea: {
    paddingVertical: vmax(4),
  },
  timerInfoText: {
    fontSize: '1.5em',
    paddingBottom: vmax(4),
  },
  timerExerciseText: {
    fontSize: '2.5em',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: vmax(8),
    width: vmax(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.3,
    padding: 0,
  },
  buttonIcon: {
    color: appStyles.BACKGROUNDCOLOR,
    transform: [{scale: 1}],
  },
  displayButton: {
    backgroundColor: 'lightblue',
    borderColor: 'gray',
  },
  hiddenButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    opacity: 0,
  },
  timerTimeText: {
    fontSize: '4em',
    fontWeight: 'bolder',
  },
  timerRunning: {
    color: 'limegreen',
  },
  timerPaused: {
    color: 'red',
  },
});