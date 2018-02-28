const fs = require('fs');
const papa = require('papaparse');

function stringToNumber(numberString) {
	return Number(numberString.replace(/,/g, ''));
}

const contents = fs.readFileSync('./state-crime-data/2013.csv', 'utf8');
let data = papa.parse(contents).data;

// Remove unneeded rows
data.splice(0, 3);
data.splice(-12, 12);

let columnTitles = data.splice(0, 1)[0];

// Change '\n' to '_', numbers and '-' to empty string
columnTitles = columnTitles.map(str => str.replace(/\n/g, '_').replace(/\d|-/g, ''));

data = data.filter(arr => arr[0] || arr.includes('State Total') || arr.includes('Rate per 100,000 inhabitants'));

const formattedData = {};
let lastState;
for (let i = 0; i < data.length; i++) {
	if (data[i][0]) {
		lastState = data[i][0].replace(/\d/g, '');
		formattedData[lastState] = {};
	} else {
		const stateData = formattedData[lastState];
		for (let j = 0; j < columnTitles.length; j++) {
			const crimeType = columnTitles[j];
			const crimeData = stringToNumber(data[i][j]);
			if (stateData[crimeType]) {
				stateData[crimeType].rate = crimeData;
				stateData[crimeType].perCapita = crimeData / 100;
			} else {
				stateData[crimeType] = { total: crimeData };
			}
		}
	}
}

for (const stateString in formattedData) {
	const state = formattedData[stateString];

	state.Rape = state['Rape_(revised_definition)'];
	delete state['Rape_(revised_definition)'];

	delete state.State;
	delete state.Area;
	delete state[''];
	delete state['Rape_(legacy_definition)'];

	state.Population = state.Population.total;
}

fs.writeFileSync('./test.json', JSON.stringify(formattedData, null, 2));
