import moment from 'moment';

function zeroPad(num, places) {
  const zero = places - num.toString().length;
  return `O${Array(+(zero > 0 && zero)).join('0')}${num}`;
}

const defaultExerciseTime = 20;
const defaultMovementList = [{movement: '', time: defaultExerciseTime, roundNo: 0, step: 1}];

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


export {
  zeroPad,
  defaultMovementList,
  defaultExerciseTime,
  removeEmptyMovementEntries,
  generateFinalWorkout,
  estimateTotalTime,
}