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
 */
function boarding() {
  const boradingPasses = readFile('day-5/boarding-passes.txt').split('\n');
  const allSeatIds = computeAllPossibleSeatIds();
  const filledSeats = boradingPasses.map((bp) => {
    const row = computeRow(bp.slice(0, 7));
    const column = computeColumn(bp.slice(7));
    return row * 8 + column;
  });

  const yourSeat = findSeatId(allSeatIds, filledSeats);

  console.log('The max seatId is: ', Math.max(...filledSeats));
  console.log('Your seatIs is: ', yourSeat);
}

boarding();

// =============================================================================
// Helper Functions
// =============================================================================

function findSeatId(allSeatIds, filledSeats) {
  let difference = allSeatIds.filter((x) => !filledSeats.includes(x));
  let yourSeat = 0;
  for (let i = 0; i < difference.length; i++) {
    const seatId = difference[i];
    const nextSeatId = difference[i + 1];

    if (seatId + 1 === nextSeatId) {
      continue;
    } else {
      yourSeat = nextSeatId;
      break;
    }
  }

  return yourSeat;
}

function computeAllPossibleSeatIds() {
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
