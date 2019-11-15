import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Form from '../components/Form/Form.jsx'
import { withNavigationFocus } from 'react-navigation';

import styles from '../styles/screenStyles';

class FormScreen extends Component {
  
  componentDidUpdate(prevProps) {
    if (!this.props.isFocused && prevProps.isFocused) { // change to Timer focus
      // generate finalWorkout to timer
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>
          <Form />
        </Text>
      </View>
    );
  }
}

export default withNavigationFocus(FormScreen);