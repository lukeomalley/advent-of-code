const readFile = require('../lib/readFile');

function customsPartOne() {
  const groups = readFile('day-6/customs.txt')
    .split('\n\n')
    .map((g) => [...new Set(g.replace(/\n/gi, '').split(''))])
    .reduce((acc, uniqueResponses) => {
      return acc + uniqueResponses.length;
    }, 0);

  console.log('Part One: ', groups);
}

customsPartOne();

function customsPartTwo() {
  const sum = readFile('day-6/customs.txt')
    .split('\n\n')
    .map((groups) =>
      groups
        .split('\n')
        .map((person) => person.split(''))
        .reduce((a, b) => a.filter((c) => b.includes(c)))
    )
    .reduce((acc, arr) => acc + arr.length, 0);

  console.log('Part Two: ', sum);
}

customsPartTwo();
