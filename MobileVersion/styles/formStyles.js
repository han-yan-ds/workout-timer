import { StyleSheet } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

export default StyleSheet.create({
  header: {
    fontSize: '1.7em',
    fontWeight: 'bold',
  },
  formContainer: {
    flexDirection: 'column',
  },
  formEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formGeneral: {
    backgroundColor: 'white',
    margin: vw(1.5),
    textAlign: 'center',
  },
  formExercise: {
    width: vw(40),
  },
  formExerciseTime: {
    width: vw(23),
  },
  formRestRounds: {
    width: vw(23),
  },
  closeButton: {
    color: 'red',
  },
  addButton: {
    color: 'limegreen',
    textAlign: 'left',
  },
});