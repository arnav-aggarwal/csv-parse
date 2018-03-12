const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

const fileContents = fs.readFileSync('/Users/arnav/TCG/csv-parse/national-crime/data.csv', 'utf8');
const parsedContents = papa.parse(fileContents).data;

const json = script(parsedContents);
fs.writeFileSync(`./formatted-data/test.json`, JSON.stringify(json, null, 2));

const csv = papa.unparse(json);
fs.writeFileSync(`./formatted-data/test-2.csv`, csv);
