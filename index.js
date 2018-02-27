const fs = require('fs');

const contents = fs.readFileSync('./state-crime-data/2013.csv', 'utf8');
console.log(contents);
