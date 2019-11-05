import { StyleSheet } from 'react-native';
import { red, green } from '@material-ui/core/colors';
import { vh, vw } from 'react-native-expo-viewport-units';

export default StyleSheet.create({
  flickerTimer: {
    color: 'pink',// PLACEHOLDER
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: vh(20),
    width: vh(20),
  },
  displayButton: {
    backgroundColor: 'lightblue',
  },
  hiddenButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    opacity: 0,
  },
  timerRunning: {
    color: 'green',
  },
  timerPaused: {
    color: 'red',
  },
});