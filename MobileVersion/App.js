import React from 'react';
import { 
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
        <BottomTabNavigator/>
      </View>
    </Provider>
  );
}
