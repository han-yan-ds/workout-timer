function zeroPad(num, places) {
  const zero = places - num.toString().length;
  return `O${Array(+(zero > 0 && zero)).join('0')}${num}`;
}

const defaultMovementList = [{movement: 'Pushups', time: 20, roundNo: 0, step: 1}];

export {
  zeroPad,
  defaultMovementList,
}