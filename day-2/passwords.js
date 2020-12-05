const fs = require('fs');

function main() {
  const passwords = fs
    .readFileSync('./passwords.txt', {
      encoding: 'utf-8',
    })
    .split('\n');

  return passwords.reduce((acc, password) => {
    if (isPasswordValidUpdated(password)) {
      return acc + 1;
    }

    return acc;
  }, 0);
}

function isPasswordValid(password) {
  const [repeat, char, passwordContent] = password.split(' ');
  const [min, max] = repeat.split('-').map((num) => parseInt(num, 10));
  const charCount = countCharacterOccurances(passwordContent, char[0]);
  return charCount >= min && charCount <= max;
}

function isPasswordValidUpdated(password) {
  const [repeat, char, passwordContent] = password.split(' ');
  const [i, j] = repeat.split('-').map((num) => parseInt(num, 10));
  const matchChar = char[0];
  const charOneMatch = passwordContent[i - 1] === matchChar;
  const charTwoMatch = passwordContent[j - 1] === matchChar;

  return (charOneMatch && !charTwoMatch) || (!charOneMatch && charTwoMatch);
}

function countCharacterOccurances(string, matchChar) {
  return string.split('').reduce((acc, c) => {
    if (c === matchChar) {
      return acc + 1;
    }

    return acc;
  }, 0);
}

console.log(main());
