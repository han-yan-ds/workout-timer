import { StyleSheet } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

export default StyleSheet.create({
  formEntryContainer: {
    flexDirection: 'row',
  },
  formGeneral: {
    backgroundColor: 'white',
    display: 'inline-block',
    margin: vw(1.5),
    textAlign: 'center',
  },
  formExercise: {
    width: vw(50),
  },
  formExerciseTime: {
    width: vw(25),
  },
  closeButton: {
    color: 'red',
  },
});