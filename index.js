const fs = require('fs');
const papa = require('papaparse');

const contents = fs.readFileSync('./state-crime-data/2013.csv', 'utf8');
let data = papa.parse(contents).data;

// Remove unneeded rows
data.splice(0, 3);
data.splice(-12, 12);

const columnTitles = data.splice(0, 1);
data = data
	.map(arr => {
		// Remove legacy definition rape column, we will use new definition
		arr.splice(5, 1);

		// Change '\n' to '_'
		arr = arr.map(str => str.replace(/\n/g, '_'));
		return arr;
	})
	.filter(arr => arr[0] || arr.includes('State Total') || arr.includes('Rate per 100,000 inhabitants'));

console.log(columnTitles);
fs.writeFileSync('./test.json', JSON.stringify(data, null, 2));
