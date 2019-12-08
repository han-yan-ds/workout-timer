import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import FormEntry from './FormEntry';
import { setWorkout, setMovementList, setNumRounds, setRestTime, switchToTimer, updateTimeEstimate,
  changeMovementIndex, highlightInvalidFormsAction, unHighlightInvalidFormsAction } from '../../actions/actions';
import { zeroPad, defaultExerciseTime, removeEmptyMovementEntries, generateFinalWorkout, estimateTotalTime } from '../../util/util';

import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import formStyles from '../../styles/formStyles';
import screenStyles from '../../styles/screenStyles';
import AddIcon from '@material-ui/icons/AddCircle';

function mapStateToProps(state) {
  const { movementList, numRounds, restTime, totalTimeEstimate, isTimerView, currentMovementIndex } = state;
  return {
    movementList,
    numRounds,
    restTime,
    totalTimeEstimate,
    isTimerView,
    currentMovementIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFullWorkout: (movementList, numRounds, restTime) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds, restTime);
      dispatch(setWorkout(fullWorkout));
    },
    handleChangeMovement: (movementList, index, movement, numRounds, restTime) => {
      let newMovementList = movementList.slice();
      newMovementList[index].movement = movement;
      let fullWorkout = generateFinalWorkout(newMovementList, numRounds, restTime);
      dispatch(setMovementList(newMovementList));
      dispatch(setWorkout(fullWorkout));
      dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
    },
    handleChangeTime: (movementList, index, time, numRounds, restTime) => {
      let newMovementList = movementList.slice();
      newMovementList[index].time = time;
      let fullWorkout = generateFinalWorkout(newMovementList, numRounds, restTime);
      dispatch(setMovementList(newMovementList));
      dispatch(setWorkout(fullWorkout));
      dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
    },
    handleChangeNumRounds: async (numRounds, movementList, restTime, currentMovementIndex) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds, restTime);
      await (new Promise((res) => {
        if (currentMovementIndex >= fullWorkout.length) dispatch(changeMovementIndex(0));
        res();
      }));
      await (new Promise((res) => {
        dispatch(setNumRounds(numRounds));
        dispatch(setWorkout(fullWorkout));
        dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
        res();
      }));
    },
    handleChangeRestTime: (restTime, movementList, numRounds) => {
      let fullWorkout = generateFinalWorkout(movementList, numRounds, restTime);
      dispatch(setRestTime(restTime));
      dispatch(setWorkout(fullWorkout));
      dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
    },
    handleAddInput: (movementList) => {
      let newMovementList = movementList.slice();
      newMovementList.push({ movement: '', time: defaultExerciseTime });
      dispatch(setMovementList(newMovementList));
    },
    handleRemoveInput: (movementList, index, numRounds, restTime) => {
      if (movementList.length > 1) {
        dispatch(changeMovementIndex(0));
        let newMovementList = movementList.slice();
        newMovementList.splice(index, 1);
        let fullWorkout = generateFinalWorkout(newMovementList, numRounds, restTime);
        dispatch(setMovementList(newMovementList));
        dispatch(setWorkout(fullWorkout));
        dispatch(updateTimeEstimate(estimateTotalTime(fullWorkout)));
      }
    },
    switchToTimerView: () => {
      dispatch(switchToTimer());
    },
    highlightInvalidForms: () => {
      dispatch(highlightInvalidFormsAction());
    },
    unHighlightInvalidForms: () => {
      dispatch(unHighlightInvalidFormsAction());
    }
  }
}

function Form({
  movementList, numRounds, restTime, totalTimeEstimate, isTimerView,
  currentMovementIndex, handleChangeMovement, handleChangeTime, handleChangeNumRounds,
  handleChangeRestTime, handleAddInput, handleRemoveInput, 
  switchToTimerView, highlightInvalidForms, unHighlightInvalidForms,
}) {
  let hideClass = (isTimerView) ? 'hide' : 'show';
  return (
    <View
      style={formStyles.formContainer}
    >

      <Text style={[screenStyles.screenText, formStyles.header]}>
        CREATE WORKOUT
      </Text>

      <View>
        {movementList.map((movement, index) => {
          return (
            <FormEntry key={`movement${zeroPad(index, 3)}`}
              movementList={movementList}
              movement={movement}
              index={index}
              numRounds={numRounds}
              restTime={restTime}
              handleChangeMovement={handleChangeMovement}
              handleChangeTime={handleChangeTime}
              handleAddInput={() => handleAddInput(movementList)}
              handleRemoveInput={() => handleRemoveInput(movementList, index, numRounds, restTime)}
            />
          )
        })}

        <TouchableOpacity
          onPress={(e) => {
            handleAddInput(movementList);
          }}
        >
          <Text style={[screenStyles.screenText, formStyles.addButton]}><AddIcon/></Text>
        </TouchableOpacity>
      </View>


      <View style={formStyles.formEntryContainer}>
        <View >
          <Text style={screenStyles.screenText}>REST TIME:  </Text>
          <TextInput
            keyboardType={"number-pad"}
            onChangeText={(val) => {
              handleChangeRestTime(Number(val), movementList, numRounds);
            }}
            placeholder={"Rest"}
            style={[formStyles.formGeneral, formStyles.formRestRounds]}
            value={String(restTime)}
          />
        </View>
        <View >
          <Text style={screenStyles.screenText}># ROUNDS:  </Text>
          <TextInput
            keyboardType={"number-pad"}
            onChangeText={(val) => {
              handleChangeNumRounds(Number(val), movementList, restTime, currentMovementIndex);
            }}
            placeholder={"# Rounds"}
            style={[formStyles.formGeneral, formStyles.formRestRounds]}
            value={String(numRounds)}
          />
        </View>
      </View>

      <View>
        <Text style={screenStyles.screenText}>{`Total Time:  ${totalTimeEstimate}`}</Text>
      </View>

    </View>
  );
}

Form.propTypes = {
  movementList: PT.arrayOf(PT.shape({
    movement: PT.string.isRequired,
    time: PT.number.isRequired,
  })).isRequired, 
  numRounds: PT.number.isRequired, 
  isTimerView: PT.bool.isRequired,
  setFullWorkout: PT.func.isRequired, 
  handleChangeMovement: PT.func.isRequired, 
  handleChangeTime: PT.func.isRequired, 
  handleChangeNumRounds: PT.func.isRequired,
  handleAddInput: PT.func.isRequired, 
  handleRemoveInput: PT.func.isRequired, 
  switchToTimerView: PT.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);