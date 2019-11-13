import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import FormEntry from './FormEntry.jsx';
import { setWorkout, setMovementList, setNumRounds, setRestTime, switchToTimer, updateTimeEstimate,
  highlightInvalidFormsAction, unHighlightInvalidFormsAction } from '../../actions/actions';
import { zeroPad } from '../../util/util';
import moment from 'moment';

import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import formStyles from '../../styles/formStyles';
import AddIcon from '@material-ui/icons/AddCircle';

function removeEmptyMovementEntries(movementList) {
  return movementList.filter((movement) => {
    return (movement.movement !== '' && movement.time > 0);
  });
}

function generateFinalWorkout(movementList, numRounds, restTime = 0) {
  let result = [];
  movementList = removeEmptyMovementEntries(movementList);
  for (let i = 0; i < numRounds; i++) {
    let newMovementList = movementList.reduce((accum, movement, index) => {
      accum.push({
        movement: movement.movement.toUpperCase(),
        time: movement.time,
        roundNo: i,
        step: index+1,
      });
      if (restTime > 0) {
        accum.push({
          movement: 'REST',
          time: restTime,
          roundNo: i,
          step: index+1,
        })
      }
      return accum;
    }, []);
    result = result.concat(newMovementList);
  }
  if (restTime > 0) {
    result.pop()
  }
  return result;
}

function estimateTotalTime(movementList, numRounds, restTime = 0) {
  let finalWorkout = generateFinalWorkout(movementList, numRounds, restTime);
  let numSeconds = finalWorkout.reduce((accum, part) => {
    return accum + part.time;
  }, 0);
  return moment.utc(moment(numSeconds * 1000).diff(moment(0))).format('HH:mm:ss');
}

function mapStateToProps(state) {
  const { movementList, numRounds, restTime, totalTimeEstimate, isTimerView } = state;
  return {
    movementList,
    numRounds,
    restTime,
    totalTimeEstimate,
    isTimerView,
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
      dispatch(setMovementList(newMovementList));
      dispatch(updateTimeEstimate(estimateTotalTime(newMovementList, numRounds, restTime)));
    },
    handleChangeTime: (movementList, index, time, numRounds, restTime) => {
      let newMovementList = movementList.slice();
      newMovementList[index].time = time;
      dispatch(setMovementList(newMovementList));
      dispatch(updateTimeEstimate(estimateTotalTime(newMovementList, numRounds, restTime)));
    },
    handleChangeNumRounds: (numRounds, movementList, restTime) => {
      dispatch(setNumRounds(numRounds));
      dispatch(updateTimeEstimate(estimateTotalTime(movementList, numRounds, restTime)));
    },
    handleChangeRestTime: (restTime, movementList, numRounds) => {
      dispatch(setRestTime(restTime));
      dispatch(updateTimeEstimate(estimateTotalTime(movementList, numRounds, restTime)));
    },
    handleAddInput: (movementList) => {
      let newMovementList = movementList.slice();
      newMovementList.push({ movement: '', time: 20 });
      dispatch(setMovementList(newMovementList));
    },
    handleRemoveInput: (movementList, index, numRounds, restTime) => {
      if (movementList.length > 1) {
        let newMovementList = movementList.slice();
        newMovementList.splice(index, 1);
        dispatch(setMovementList(newMovementList));
        dispatch(updateTimeEstimate(estimateTotalTime(newMovementList, numRounds, restTime)));
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
  setFullWorkout, handleChangeMovement, handleChangeTime, handleChangeNumRounds,
  handleChangeRestTime, handleAddInput, handleRemoveInput, 
  switchToTimerView, highlightInvalidForms, unHighlightInvalidForms,
}) {
  let hideClass = (isTimerView) ? 'hide' : 'show';

  return (
    <View
      style={formStyles.formContainer}
    >

      <Text style={formStyles.header}>
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
              handleRemoveInput={handleRemoveInput}
            />
          )
        })}
      </View>

      <TouchableOpacity
        onPress={(e) => {
          handleAddInput(movementList);
        }}
      >
        <Text style={formStyles.addButton}><AddIcon/></Text>
      </TouchableOpacity>

      <View style={formStyles.formEntryContainer}>
        <View >
          <Text>REST TIME:  </Text>
          <TextInput
            keyboardType={"number-pad"}
            onChangeText={(val) => {
              console.log('printed rest time', val);
              handleChangeRestTime(Number(val), movementList, numRounds);
            }}
            placeholder={"Rest"}
            style={[formStyles.formGeneral, formStyles.formRestRounds]}
          />
        </View>
        <View >
          <Text># ROUNDS:  </Text>
          <TextInput
            keyboardType={"number-pad"}
            onChange={(val) => {
              console.log('printed num rounds', val);
              handleChangeNumRounds(Number(val), movementList, restTime);
            }}
            placeholder={"# Rounds"}
            style={[formStyles.formGeneral, formStyles.formRestRounds]}
          />
        </View>
      </View>

      <View>
        <Text>{`Total Time:  ${totalTimeEstimate}`}</Text>
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