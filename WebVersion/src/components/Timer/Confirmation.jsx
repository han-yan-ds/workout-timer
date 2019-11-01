import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import { changeMovementIndex } from '../../actions/actions';

function mapDispatchToProps (dispatch) {
  return {
    goToFirstMovement: () => dispatch(changeMovementIndex(0)),
  }
}

function Confirmation ({className, resetTimer, goToFirstMovement, exitConfirmation}) {
  return (
    <div id="confirmation-overlay" className={className}>
      <p>
        Sure You Want To Restart The Entire Workout?
      </p>

      <div id="confirmation-overlay-button-section">
        <button 
          id="confirm-restart-button"
          className="overlay-button"
          onClick={() => {
            resetTimer();
            goToFirstMovement();
            exitConfirmation();
          }}
        >RESTART</button>
        <button 
          id="decline-restart-button"
          className="overlay-button"
          onClick={exitConfirmation}
        >CONTINUE</button>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Confirmation);