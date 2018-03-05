function stringToNumber(numberString) {
	if (typeof numberString !== 'string') {
		return numberString;
	}

	return Number(numberString.replace(/,/g, ''));
}

function formatColumnTitle(title) {
	return title
		.replace(/\n|\s/g, '_') // newlines and whitespace -> single underscore
		.replace(/__/g, '_') // double underscores -> single underscore
		.replace(/\d|-/g, '') // digits, dashes -> empty
		.replace(/_$/, '') // trailing underscore -> empty
		.toLowerCase()
		.trim();
}

function capitalizeFirstLetter(str) {
	if (str.length === 0) {
		return str;
	}

	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function formatState(state) {
	return state
		.replace(/\d|,/g, '')
		.trim()
		.toUpperCase();
}

function formatCity(city) {
	city = city
		.replace(/\d|,/g, '')
		.trim()
		.toLowerCase();

	const split = city.split(' ').map(str => {
		if (['the', 'of'].includes(str)) {
			return str;
		}

		return capitalizeFirstLetter(str);
	});

	return split.join(' ');
}

function script(data, year) {
	// Remove unneeded rows & blank columns
	data.splice(0, 3);

	// Format all column titles
	const columnTitles = data
		.splice(0, 1)[0]
		.map(formatColumnTitle)
		.filter(Boolean);

	data = data.filter(arr => arr.filter(Boolean).length > 10);

	// This is a mess, but no good way to clean it up. Transforms data into a much more managable format.
	const formattedData = [];
	let lastState;
	for (let i = 0; i < data.length; i++) {
		if (data[i][0]) {
			lastState = formatState(data[i][0]);
		}

		const cityString = formatCity(data[i][1]);
		const thisCity = {
			state: lastState,
			city: cityString,
		};

		formattedData.push(thisCity);

		for (let j = 2; j < columnTitles.length; j++) {
			const dataString = data[i][j];
			if (!dataString) {
				continue;
			}

			const crimeType = columnTitles[j];
			const crimeData = stringToNumber(dataString);
			thisCity[crimeType] = crimeData;
		}
	}

	// Further formatting, getting property names perfect
	formattedData.forEach(city => {
		city.year = year;
		city.state_original = city.state;
		city.city_original = city.city;

		city.forcible_rape = city['rape_(revised_definition)'];
		delete city['rape_(revised_definition)'];

		city.violent_crimes = city.violent_crime;
		delete city.violent_crime;

		city.property_crimes = city.property_crime;
		delete city.property_crime;

		for (const item in city) {
			if (['year', 'population', 'state', 'city', 'state_original', 'city_original'].includes(item)) {
				continue;
			}

			city[item + '_per_capita'] = Number((city[item] / city.population * 1000).toFixed(4));
		}
	});

	return formattedData;
}

module.exports = script;
