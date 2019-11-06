import { StyleSheet } from 'react-native';
import { vmax } from 'react-native-expo-viewport-units';
import * as appStyles from './appStyles';

export default StyleSheet.create({
  timerArea: {
    
  },
  flickerTimer: {
    color: 'pink',// PLACEHOLDER
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
    borderWidth: 1.25,
  },
  buttonIcon: {
    color: appStyles.BACKGROUNDCOLOR,
    fontSize: '2.0em',
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
    color: 'green',
  },
  timerPaused: {
    color: 'red',
  },
});