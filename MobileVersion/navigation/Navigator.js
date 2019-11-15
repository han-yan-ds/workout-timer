import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import TabBarIcon from '../icons/TabBarIcon';
import TimerScreen from '../screens/TimerScreen';
import FormScreen from '../screens/FormScreen';

const config = Platform.select({
  web: {headerMode: 'none'},
  // web: {headerMode: 'screen'},
  default: {}
});

const TimerStack = createStackNavigator({
  Timer: TimerScreen,
}, config);

TimerStack.navigationOptions = {
  tabBarLabel: 'Timer',
  tabBarIcon: () => <TabBarIcon
    name='md-information-circle'
  />
}

const FormStack = createStackNavigator({
  Form: FormScreen,
}, config);

FormStack.navigationOptions = {
  tabBarLabel: 'Form',
  tabBarIcon: () => <TabBarIcon
    name='md-options'
  />
}

const BottomTabNavigator = createBottomTabNavigator({
  // different stack navigator objects
  FormStack,
  TimerStack,
});

export default createAppContainer(BottomTabNavigator);