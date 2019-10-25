import React from 'react';
import {
  Text,
  View
} from 'react-native';
import WorkoutTimer from '../components/Timer/WorkoutTimer.jsx'

import styles from '../styles/screenStyles';

function TimerScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>
        <WorkoutTimer />
      </Text>
    </View>
  );
}

export default TimerScreen;