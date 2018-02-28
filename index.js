const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

const dataFolderPath = './state-crime-data/';
const fileNames = fs.readdirSync(dataFolderPath);
fileNames.forEach(fileName => {
	const filePath = dataFolderPath + fileName;
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const parsedContents = papa.parse(fileContents).data;

	const data = script(parsedContents);
	const year = fileName.slice(0, 4);
	fs.writeFileSync(`./formatted-data/test-${year}.json`, JSON.stringify(data, null, 2));

	const csv = papa.unparse(data);
	fs.writeFileSync(`./formatted-data/test-${year}.csv`, csv);
});
