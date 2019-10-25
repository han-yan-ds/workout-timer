import React from 'react';
import { 
  Text, 
  View 
} from 'react-native';
import BottomTabNavigator from './navigation/Navigator';
import { Provider } from 'react-redux';
import configureStore from './store';

import styles from './styles/appStyles';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <View style={styles.appContainer}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <BottomTabNavigator/>
      </View>
    </Provider>
  );
}
