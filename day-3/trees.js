const readFile = require('../lib/readFile');

function main() {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const map = readFile('day-3/trees.txt').split('\n');

  const sum = slopes
    .map((s) => countTrees(map, s))
    .reduce((acc, count) => acc * count);

  console.log(sum);
}

function countTrees(map, slope) {
  let pos = [0, 0]; // Start at the top left of the string
  let treeCount = 0;

  while (pos[1] < map.length) {
    // check if we have a tree, move to next position
    const curLocation = map[pos[1]][pos[0]];

    if (curLocation === '#') {
      treeCount += 1;
    }

    pos = nextPosition(pos, slope[0], slope[1]);
  }
  return treeCount;
}

function nextPosition(curr, x, y) {
  return [curr[0] + x, curr[1] + y];
}

main();
