import React from 'react';
import {
  Text,
  View
} from 'react-native';

import styles from '../styles/screenStyles';

function TimerScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>
        This is the Timer Screen
      </Text>
    </View>
  );
}

export default TimerScreen;