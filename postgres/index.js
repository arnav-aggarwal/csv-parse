const fs = require('fs');
const papa = require('papaparse');
const script = require('./script');

function backfillLocation(data) {
	for (let i = 0; i < data.length; i++) {
		const currentItem = data[i];
		const { county, county_source, state_fips, county_fips, lat, lng, zips } = currentItem;
		const props = [county, county_source, state_fips, county_fips, lat, lng, zips];
		const missingData = props.every(x => x === undefined);

		if (!missingData) {
			continue;
		}

		// find an item that has the same state & city and these properties
		const missingDataObject = data.find(item => item.state === currentItem.state && item.city === currentItem.city && item.county !== undefined);

		if (missingDataObject === undefined) {
			continue;
		}
		
		currentItem.county = missingDataObject.county;
		currentItem.county_source = missingDataObject.county_source;
		currentItem.state_fips = missingDataObject.state_fips;
		currentItem.county_fips = missingDataObject.county_fips;
		currentItem.lat = missingDataObject.lat;
		currentItem.lng = missingDataObject.lng;
		currentItem.zips = missingDataObject.zips;
	}
}

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

backfillLocation(data);

fs.writeFileSync(`./formatted-data/test.json`, JSON.stringify(data, null, 2));

const csv = papa.unparse(data);
fs.writeFileSync(`./formatted-data/test.csv`, csv);
