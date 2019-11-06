import { StyleSheet } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default StyleSheet.create({
  translucent: {
    backgroundColor: 'rgba(40,44,52,0.9)',
    position: 'absolute',
    zIndex: 2,
    height: vh(100),
    width: vw(100),
  },
  overlayButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  overlayButton: {
    height: 100,
    width: 60,
  },
  overlayButtonRestart: {
    backgroundColor: 'red',
  },
  overlayButtonContinue: {
    backgroundColor: 'gray',
  },
});