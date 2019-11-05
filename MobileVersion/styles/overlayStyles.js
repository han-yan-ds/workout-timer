import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  translucent: {
    backgroundColor: 'rgba(40,44,52,0.9)'
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