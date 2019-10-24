import React from 'react';
import { 
  Text, 
  View 
} from 'react-native';
import BottomTabNavigator from './navigation/Navigator';

import styles from './styles/appStyles';

export default function App() {
  return (
    <View style={styles.appContainer}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <BottomTabNavigator/>
    </View>
  );
}
