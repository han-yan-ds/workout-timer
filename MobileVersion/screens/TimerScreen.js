import React from 'react';
import {
  Text,
  View
} from 'react-native';
import Timer from '../components/Timer/Timer.jsx'

import styles from '../styles/screenStyles';

function TimerScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>
        <Timer />
      </Text>
    </View>
  );
}

export default TimerScreen;