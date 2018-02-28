const fs = require('fs');
const papa = require('papaparse');

const contents = fs.readFileSync('./state-crime-data/2013.csv', 'utf8');
const parsedContents = papa.parse(contents);

console.log(parsedContents.data);

for (const item in parsedContents) {
	console.log(item)
}

fs.writeFileSync('./test.json', JSON.stringify(parsedContents.data, null, 2))