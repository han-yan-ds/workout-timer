import { StyleSheet } from 'react-native';
import * as appStyles from './appStyles';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: appStyles.BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  screenText: {
    color: 'white',
    textAlign: 'center',
  }
})