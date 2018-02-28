const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

fs.readdirSync('./state-crime-data').forEach(fileName => {
	const filePath = './state-crime-data/' + fileName;
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const parsedContents = papa.parse(fileContents).data;
	const data = script(parsedContents);

	const year = fileName.slice(0, 4);
	fs.writeFileSync(`./formatted-data/test-${year}.json`, JSON.stringify(data, null, 2));
});

