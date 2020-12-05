const readFile = require('../lib/readFile');

function main() {
  const passports = readFile('day-4/passports.txt').split('\n\n');

  return passports.reduce((acc, pass) => {
    if (passportIsValid(pass)) {
      return acc + 1;
    }

    return acc;
  }, 0);
}

function passportIsValid(passport) {
  const parts = passport.split(/\ |\n/gi);
  const entries = parts.map((p) => [p.split(':')[0], p.split(':')[1]]);
  const keys = entries.map((e) => e[0]);

  if (hasValidKeys(keys) && valuesAreValid(entries)) {
    return true;
  }
}

function hasValidKeys(keys) {
  return keys.length === 8 || (keys.length === 7 && !keys.includes('cid'));
}

function valuesAreValid(passportEntries) {
  for (const [key, value] of passportEntries) {
    switch (key) {
      case 'byr':
        if (!bryIsValid(value)) {
          return false;
        } else {
          break;
        }
      case 'iyr':
        if (!iyrIsValid(value)) {
          return false;
        } else {
          break;
        }
      case 'eyr':
        if (!eyrIsValid(value)) {
          return false;
        } else {
          break;
        }
      case 'hgt':
        if (!hgtIsValid(value)) {
          return false;
        } else {
          break;
        }
      case 'hcl':
        if (!hclIsValid(value)) {
          return false;
        } else {
          break;
        }
      case 'ecl':
        if (!eclIsValid(value)) {
          return false;
        } else {
          break;
        }
      case 'pid':
        if (!pidIsValid(value)) {
          return false;
        } else {
          break;
        }
      case 'cid':
        break;
    }
  }

  return true;
}

function bryIsValid(value) {
  return value.length === 4 && +value >= 1920 && +value <= 2020;
}

function iyrIsValid(value) {
  return value.length === 4 && +value >= 2010 && +value <= 2020;
}

function eyrIsValid(value) {
  return value.length === 4 && +value >= 2020 && +value <= 2030;
}

function hgtIsValid(value) {
  if (value.includes('cm')) {
    const stripped = value.replace('cm', '');
    return +stripped >= 150 && +stripped <= 193;
  }

  if (value.includes('in')) {
    const stripped = value.replace('in', '');
    return +stripped >= 59 && +stripped <= 76;
  }

  return false;
}

function hclIsValid(value) {
  return /#[a-f0-9]{6}/gi.test(value) && value.length === 7;
}

function eclIsValid(value) {
  const validColors = {
    amb: true,
    blu: true,
    brn: true,
    grn: true,
    gry: true,
    grn: true,
    hzl: true,
    oth: true,
  };

  return value in validColors;
}

function pidIsValid(value) {
  return /[0-9]{9}/gi && value.length === 9;
}

console.log(main());
