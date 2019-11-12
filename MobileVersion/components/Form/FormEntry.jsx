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
  handleChangeMovement, 
  handleChangeTime,
  handleAddInput, 
  handleRemoveInput,
  handleUpdateTimeEstimate, 
}) {
  let alertInputMovement = (movement.movement === '' && highlightInvalidForms) ? 'red-input' : '';
  let alertInputTime = (movement.time === 0 && highlightInvalidForms) ? 'red-input' : '';
  return (
    <Formik
      initialValues={{exercise: ''}}
      onSubmit={values => console.log('Formik onSubmit', values)}
    >
      { () => (
        <View style={formStyles.formEntryContainer}>

          <TextInput // this is input for the name of the exercise
            onChangeText={(val) => {
              handleChangeMovement(movementList, index, val);
              handleUpdateTimeEstimate();
            }}
            onBlur={(val) => console.log('Blurred', val)}
            onFocus={(val) => console.log('Focused', val)}
            placeholder={"Exercise"}
            style={[formStyles.formGeneral, formStyles.formExercise]}
            // values=
          />
          
          <TextInput // this is input for the duration of the exercise
            keyboardType={"number-pad"}
            onChangeText={(val) => {
              handleChangeTime(movementList, index, Number(val));
              handleUpdateTimeEstimate();
            }}
            placeholder={"Time"}
            style={[formStyles.formGeneral, formStyles.formExerciseTime]}
          />

          <TouchableOpacity
            onPress={(e) => {
              e.preventDefault();
              handleRemoveInput(movementList, index);
              handleUpdateTimeEstimate();
            }}
          >
            <Text style={formStyles.closeButton}>
              <XIcon />
            </Text>
          </TouchableOpacity>

        </View>
      ) }
    </Formik>
  );
  // return (
    // <div className='each-exercise-entry'>
    //   <input type="text"
    //     className={`input-field-movement ${alertInputMovement}`}
    //     onChange={(e) => {
    //       handleChangeMovement(movementList, index, e.target.value);
    //       handleUpdateTimeEstimate();
    //     }}
    //     onKeyPress={(e) => {
    //       if (e.key === 'Enter' || e.which==13 || e.keyCode==13) {
    //         e.preventDefault(); // prevent Enter from removing field
    //         handleAddInput();
    //       }
    //     }}
    //     placeholder="Name of Exercise"
    //     value={movement.movement}
    //   >
    //   </input>
    //   <input type="number"
    //     min={0}
    //     className={`input-field-number ${alertInputTime}`}
    //     onChange={(e) => {
    //       handleChangeTime(movementList, index, Number(e.target.value));
    //       handleUpdateTimeEstimate();
    //     }}
    //     onKeyPress={(e) => {
    //       if (e.key === 'Enter' || e.which==13 || e.keyCode==13) {
    //         e.preventDefault(); // prevent Enter from removing field
    //         handleAddInput();
    //       }
    //     }}
    //     placeholder="# sec"
    //     value={movement.time}
    //   >
    //   </input>
    //   <button 
    //     onClick={(e) => {
    //       e.preventDefault();
    //       handleRemoveInput(movementList, index);
    //       handleUpdateTimeEstimate();
    //     }}
    //     className="remove-button">
    //     X
    //   </button>
    //   <br />
    // </div>
  // );
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