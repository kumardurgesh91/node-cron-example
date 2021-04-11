const parser = require('xml2json');
const path = require('path');
const fs = require('fs');

function getSetting() {
  return new Promise((res, rej) => {
    fs.readFile(path.join(__dirname, '../settings.xml'), (err, fileContent) => {
      if (err) {
        return rej(err);
      }
      const json = parser.toJson(fileContent);
      return res(JSON.parse(json));
    });
  });
}

module.exports = { getSetting };
