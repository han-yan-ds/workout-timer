import React from 'react';
import {connect} from 'react-redux';
import PT from 'prop-types';
import { Formik } from 'formik';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import formStyles from '../../styles/formStyles';

import XIcon from '@material-ui/icons/Close';

function mapStateToProps(state) {
  const {highlightInvalidForms} = state;
  return {highlightInvalidForms};
}

function FormEntry({ 
  highlightInvalidForms,
  movementList, 
  movement, 
  index, 
  numRounds,
  restTime,
  handleChangeMovement, 
  handleChangeTime,
  handleAddInput, 
  handleRemoveInput,
  handleUpdateTimeEstimate, 
}) {
  let alertInputMovement = (movement.movement === '' && highlightInvalidForms) ? 'red-input' : '';
  let alertInputTime = (movement.time === 0 && highlightInvalidForms) ? 'red-input' : '';
  return (
    <React.Fragment>
        <View style={formStyles.formEntryContainer}>

          <TextInput // this is input for the name of the exercise
            onChangeText={(val) => {
              handleChangeMovement(movementList, index, val, numRounds, restTime);
            }}
            onBlur={(val) => console.log('Blurred', val)}
            onFocus={(val) => console.log('Focused', val)}
            placeholder={"Exercise"}
            style={[formStyles.formGeneral, formStyles.formExercise]}
            value={movementList[index].movement}
          />
          
          <TextInput // this is input for the duration of the exercise
            keyboardType={"number-pad"}
            onChangeText={(val) => {
              handleChangeTime(movementList, index, Number(val));
              handleUpdateTimeEstimate();
            }}
            placeholder={"Time"}
            style={[formStyles.formGeneral, formStyles.formExerciseTime]}
            value={String(movementList[index].time)}
          />

          <TouchableOpacity
            onPress={(e) => {
              // e.preventDefault();
              handleRemoveInput(movementList, index);
              handleUpdateTimeEstimate();
            }}
          >
            <Text style={formStyles.closeButton}>
              <XIcon />
            </Text>
          </TouchableOpacity>

        </View>
    </React.Fragment>
  );

}

FormEntry.propTypes = {
  movementList: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
  })).isRequired, 
  movement: PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
  }).isRequired,
  index: PT.number.isRequired,
  handleChangeMovement: PT.func.isRequired, 
  handleChangeTime: PT.func.isRequired, 
  handleAddInput: PT.func.isRequired, 
  handleRemoveInput: PT.func.isRequired, 
  handleUpdateTimeEstimate: PT.func.isRequired,
}

export default connect(mapStateToProps, null)(FormEntry);