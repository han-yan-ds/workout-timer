import React from 'react';
import {
  Text,
  View
} from 'react-native';
import WorkoutTimer from '../components/Timer/WorkoutTimer';

import screenStyles from '../styles/screenStyles';

function TimerScreen() {
  return (
    <View style={screenStyles.screenContainer}>
      <WorkoutTimer />
    </View>
  );
}

export default TimerScreen;