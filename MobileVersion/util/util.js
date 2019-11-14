function zeroPad(num, places) {
  const zero = places - num.toString().length;
  return `O${Array(+(zero > 0 && zero)).join('0')}${num}`;
}

const defaultExerciseTime = 0;

const defaultMovementList = [{movement: 'Pushups', time: defaultExerciseTime, roundNo: 0, step: 1}];

export {
  zeroPad,
  defaultMovementList,
  defaultExerciseTime,
}