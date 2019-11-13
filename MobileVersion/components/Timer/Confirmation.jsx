import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import { changeMovementIndex } from '../../actions/actions';

import overlayStyles from '../../styles/overlayStyles';
import { View, Text, TouchableOpacity } from 'react-native';

function mapDispatchToProps (dispatch) {
  return {
    goToFirstMovement: () => dispatch(changeMovementIndex(0)),
  }
}

function Confirmation ({styleName, resetTimer, goToFirstMovement, exitConfirmation}) {
  return (
    <View id="confirmation-overlay" style={styleName}>
      <Text style={overlayStyles.overlayRestartPrompt}>
        Sure You Want To Restart The Entire Workout?
      </Text>

      <View id="confirmation-overlay-button-section"
        style={overlayStyles.overlayButtonContainer}
      >
        <TouchableOpacity 
          id="confirm-restart-button"
          style={[overlayStyles.overlayButton, overlayStyles.overlayButtonRestart]}
          onPress={() => {
            resetTimer();
            goToFirstMovement();
            exitConfirmation();
          }}
        >
          <Text>RESTART</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          id="decline-restart-button"
          style={[overlayStyles.overlayButton, overlayStyles.overlayButtonContinue]}
          onPress={exitConfirmation}
        >
          <Text>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Confirmation.propTypes = {
  // styleName: PT.object.isRequired,
  resetTimer: PT.func.isRequired,
  goToFirstMovement: PT.func.isRequired,
  exitConfirmation: PT.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Confirmation);