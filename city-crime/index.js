const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

const dataFolderPath = './city-crime-data/';
const fileNames = fs.readdirSync(dataFolderPath);
fileNames.forEach(fileName => {
	const filePath = dataFolderPath + fileName;
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const parsedContents = papa.parse(fileContents).data;
	const year = fileName.slice(0, 4);

	const json = script(parsedContents, year);
	fs.writeFileSync(`./formatted-data/test-${year}.json`, JSON.stringify(json, null, 2));

	const csv = papa.unparse(json);
	fs.writeFileSync(`./formatted-data/test-${year}.csv`, csv);
});
