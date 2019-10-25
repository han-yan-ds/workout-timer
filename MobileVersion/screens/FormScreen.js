import React from 'react';
import {
  Text,
  View
} from 'react-native';
import Form from '../components/Form/Form.jsx'

import styles from '../styles/screenStyles';

function FormScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>
        <Form />
      </Text>
    </View>
  );
}

export default FormScreen;