module.exports = function backfillLocation(data) {
	console.log('1st loop started...');
	console.time('1st loop');
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
	console.timeEnd('1st loop');

	console.time('2nd loop');
	for (let i = 0; i < data.length; i++) {
		const currentItem = data[i];

		if (currentItem.state_fips !== undefined) {
			continue;
		}

		// find an item that has the same state & city and these properties
		const missingDataObject = data.find(item => item.state === currentItem.state && item.state_fips !== undefined);

		if (missingDataObject === undefined) {
			continue;
		}

		currentItem.state_fips = missingDataObject.state_fips;
	}
	console.timeEnd('2nd loop');

	console.time('3rd loop');
	let noFips = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i].state_fips === undefined) {
			console.log(data[i]);
			noFips++;
		}
	}
	console.timeEnd('3rd loop');

	console.log('No fips count:', noFips);
};
