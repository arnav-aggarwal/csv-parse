const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

const dataFolderPath = './data/';
const fileNames = ['old.csv', 'new.csv'];
const data = [];

fileNames.forEach(fileName => {
	const filePath = dataFolderPath + fileName;
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const parsedContents = papa.parse(fileContents).data;
	const json = script(parsedContents);
	data.push(...json);
});

fs.writeFileSync(`./formatted-data/test.json`, JSON.stringify(data, null, 2));

const csv = papa.unparse(data);
fs.writeFileSync(`./formatted-data/test.csv`, csv);
