const fs = require('fs');
const papa = require('papaparse');

const contents = fs.readFileSync('./state-crime-data/2013.csv', 'utf8');
const parsedContents = papa.parse(contents);
parsedContents.data.splice(0, 3);

fs.writeFileSync('./test.json', JSON.stringify(parsedContents.data, null, 2))