const readFile = require('../lib/readFile');

/**
 * First 7 chars F B - represent front or back of the remaining rows
 * Last 3 chars L R
 *
 * 128 rows on the plane
 * 8 columns on the plane
 *
 * Every seat has a unique seat ID:
 *  row * 8 + column = seatId
 *
 *
 * 0000 0000
 * 0000 00X0
 * 0000 0000
 *
 * for each seat compute the seatId
 *
 */

function boarding() {
  const boradingPasses = readFile('day-5/boarding-passes.txt').split('\n');

  const allSeatIds = computeSeatIds();

  const seatIds = boradingPasses.map((bp) => {
    const row = computeRow(bp.slice(0, 7));
    const column = computeColumn(bp.slice(7));

    return row * 8 + column;
  });

  let difference = allSeatIds.filter((x) => !seatIds.includes(x));
  console.log(difference);

  // console.log(Math.max(...seatIds));
}

function computeSeatIds() {
  const seatIds = [];
  for (let row = 0; row <= 127; row++) {
    for (let col = 0; col <= 7; col++) {
      seatIds.push(row * 8 + col);
    }
  }

  return seatIds;
}

function computeRow(directions) {
  let startRow = 0;
  let endRow = 127;
  directions.split('').forEach((d) => {
    const half = (endRow - startRow + 1) / 2;
    if (d === 'F') {
      endRow -= half;
    } else {
      startRow += half;
    }
  });

  return startRow;
}

function computeColumn(directions) {
  let startCol = 0;
  let endCol = 7;

  directions.split('').forEach((d) => {
    const half = (endCol - startCol + 1) / 2;
    if (d === 'L') {
      endCol -= half;
    } else {
      startCol += half;
    }
  });

  return startCol;
}

boarding();
