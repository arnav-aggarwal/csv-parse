const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

const dataFolderPath = './city-crime-data/';
const fileNames = fs.readdirSync(dataFolderPath);
fileNames.forEach(fileName => {
	const filePath = dataFolderPath + fileName;
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const parsedContents = papa.parse(fileContents).data;

	const json = script(parsedContents);
	fs.writeFileSync(`./formatted-data/test-2017.json`, JSON.stringify(json, null, 2));

	const csv = papa.unparse(json);
	fs.writeFileSync(`./formatted-data/test-city-2017.csv`, csv);
});
