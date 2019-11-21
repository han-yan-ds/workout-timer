import { StyleSheet } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

export default StyleSheet.create({
  header: {
    fontSize: '1.7em',
    fontWeight: 'bold',
    color: 'orange',
  },
  formContainer: {
    flexDirection: 'column',
    paddingHorizontal: (vw(37)/3.5)
  },
  formEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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