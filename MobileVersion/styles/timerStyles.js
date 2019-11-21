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
    fontSize: 24,
    paddingBottom: vmax(4),
  },
  timerExerciseText: {
    fontSize: 40,
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
    fontSize: 64,
    fontWeight: 'bold',
  },
  timerRunning: {
    color: 'limegreen',
  },
  timerPaused: {
    color: 'red',
  },
});