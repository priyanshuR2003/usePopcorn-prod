export const average = (arr) =>
  arr.reduce((acc, cur, _i, array) => acc + cur / array.length, 0);
