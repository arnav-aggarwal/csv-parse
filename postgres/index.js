const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

const dataFolderPath = './data/';
const fileNames = fs.readdirSync(dataFolderPath);

// const data = [];
// fileNames.forEach(fileName => {
// 	const filePath = dataFolderPath + fileName;
// 	const fileContents = fs.readFileSync(filePath, 'utf8');
// 	const parsedContents = papa.parse(fileContents).data;
// 	const year = fileName.slice(0, 4);

// 	const json = script(parsedContents, year);
// 	data.push(...json);
// 	fs.writeFileSync(`./formatted-data/test-${year}.json`, JSON.stringify(json, null, 2));

// 	const csv = papa.unparse(json);
// 	fs.writeFileSync(`./formatted-data/test-city-${year}.csv`, csv);
// });

// const finalCsv = papa.unparse(data);
// fs.writeFileSync(`./formatted-data/test-city-2013-2016.csv`, finalCsv);
