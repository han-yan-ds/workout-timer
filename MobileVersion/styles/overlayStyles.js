import { StyleSheet } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';

export default StyleSheet.create({
  translucent: {
    justifyContent: 'center',
    backgroundColor: 'rgba(40,44,52,0.92)',
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    maxWidth: '100%',
  },
  overlayRestartPrompt: {
    fontSize: '1.5em',
  },
  overlayButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: vh(6),
  },
  overlayButton: {
    minHeight: vh(7.5),
    minWidth: vw(20),
    padding: 10,
    justifyContent: 'center',
    borderRadius: 6,
  },
  overlayButtonRestart: {
    backgroundColor: 'red',
  },
  overlayButtonContinue: {
    backgroundColor: 'gray',
  },
});