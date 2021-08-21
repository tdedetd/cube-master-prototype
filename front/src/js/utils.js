/**
 * @param {any[]} list
 * @param {Function} checkEmpty
 * @returns {boolean}
 */
export function fall(list, checkEmpty) {
  let emptyCount = 0;

  for (let i = list.length - 1; i >= 0; i--) {
    if (checkEmpty ? checkEmpty(list[i]) : list[i]) {
      const temp = list[i];
      list[i] = list[i + emptyCount];
      list[i + emptyCount] = temp;
    } else {
      emptyCount++;
    }
  }
  return false;
}
