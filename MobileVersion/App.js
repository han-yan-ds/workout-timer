import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigator from './navigation/Navigator';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <BottomTabNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    // width: '100%',
  },
});
