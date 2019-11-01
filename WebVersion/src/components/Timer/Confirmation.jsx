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
      Are You Sure You Want To Restart The Entire Workout?
      {className}
      {/*NOTES
        Yes button calls goToFirstMovement()
        Yes button ALSO calls resetTimer()... which is passed as prop from Parent (Timer)

        BOTH buttons remove this overlay (exitConfirmation())
      */}
      <div>YES</div>
      <div>NO</div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Confirmation);