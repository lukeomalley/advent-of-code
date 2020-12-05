const fs = require('fs');

function readFile(path) {
  return fs.readFileSync(`${__dirname}/../${path}`, {
    encoding: 'utf-8',
  });
}

module.exports = readFile;
