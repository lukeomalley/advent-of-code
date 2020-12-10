const readFile = require('../lib/readFile');

function bagsPartOne() {
  const bags = readFile('day-7/bags.txt').split('\n');
  const bagContents = generateBagMap(bags, false);

  let currentPos = 0;
  return Object.keys(bagContents).reduce((acc, bagName) => {
    currentPos += 1;
    console.log(
      `Currently working on bag ${currentPos} of ${bags.length}: ${bagName}`
    );

    if (bagTreeContainsShinyGold(bagContents, bagName)) {
      return acc + 1;
    }

    return acc;
  }, 0);
}

// console.log(bagsPartOne() + ' bags can possibly contain a shiny gold bag');

function bagsPartTwo() {
  const bags = readFile('day-7/testbags.txt').split('\n');
  const bagContents = generateBagMap(bags, true);
  return countBagsWithinShinyGold(bagContents);
}

console.log(bagsPartTwo() + ' bags can be nested inside of the shiny gold bag');

// =============================================================================
// Helper Functions
// =============================================================================

function countBagsWithinShinyGold(bagMap) {
  const count = totalBagsUnder('shiny gold', bagMap);
  return count;
}

// ['5 drab red', '3 bright green'] ...
// total bags = 5 * totalBagsUnder('drab red') + 3 * totalBagsUnder('bright green')

function totalBagsUnder(bagName, bagMap) {
  const currentBagContents = bagMap[bagName];

  return Object.keys(currentBagContents).reduce((acc, b) => {
    const bagCount = b.slice(0, 2);
    const bagName = b.slice(2);

    console.log(+bagCount);
    if (!bagCount) {
      return acc;
    }

    return acc + +bagCount * totalBagsUnder(bagName, bagMap);
  }, 0);
}

function generateBagMap(bags, shouldSplitWithCounts) {
  const bagContents = {};
  bags.forEach((b) => {
    const [bagColor, contents] = b.split(' bags contain ');
    const containedBags = shouldSplitWithCounts
      ? splitBagContentsWithCounts(contents)
      : splitBagContents(contents);

    bagContents[bagColor] = containedBags.reduce((acc, b) => {
      if (b.includes(' other')) {
        return acc;
      }

      return { ...acc, [b]: true };
    }, {});
  });

  return bagContents;
}

function splitBagContents(contents) {
  return contents
    .slice(2) // remove the first number
    .split(/ bags?[,|\.] ?[0-9]? ?/gi)
    .slice(0, -1); // remove the final empty string in the array produced by the split
}

function splitBagContentsWithCounts(contents) {
  return contents.split(/ bags?[,|\.] ?/gi).slice(0, -1); // remove the final empty string in the array produced by the split
}

// BFS on the bags nested below the current bag
function bagTreeContainsShinyGold(bagMap, bagName) {
  const nodesToVisit = [bagName, ...Object.keys(bagMap[bagName])];

  while (nodesToVisit.length) {
    const currentBagContents = bagMap[nodesToVisit.shift()];
    if ('shiny gold' in currentBagContents) {
      return true;
    }

    nodesToVisit.push(...Object.keys(currentBagContents));
  }

  return false;
}
