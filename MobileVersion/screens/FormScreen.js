import React from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from '../styles/screenStyles';

function FormScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>
        This is the Form Screen
      </Text>
    </View>
  );
}

export default FormScreen;