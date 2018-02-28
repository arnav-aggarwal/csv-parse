const fs = require('fs');
const papa = require('papaparse');

const contents = fs.readFileSync('./state-crime-data/2013.csv', 'utf8');
let data = papa.parse(contents).data;

// Remove unneeded rows
data.splice(0, 3);
data.splice(-12, 12);

let columnTitles = data.splice(0, 1)[0];

// Change '\n' to '_'
columnTitles = columnTitles.map(str => str.replace(/\n/g, '_').replace(/\d/g, ''));

data = data.filter(arr => arr[0] || arr.includes('State Total') || arr.includes('Rate per 100,000 inhabitants'));

const formattedData = {};
let lastState;
for (let i = 0; i < data.length; i++) {
	if (data[i][0]) {
		lastState = data[i][0].replace(/\d/g, '');
		formattedData[lastState] = [];
	} else {
		formattedData[lastState].push(data[i]);
	}
}

console.log(columnTitles);
fs.writeFileSync('./test.json', JSON.stringify(formattedData, null, 2));
