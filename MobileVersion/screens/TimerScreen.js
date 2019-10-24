import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

function TimerScreen() {
  return (
    <View style={styles.container}>
      <Text>
        This is the Timer Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
  }
})

export default TimerScreen;